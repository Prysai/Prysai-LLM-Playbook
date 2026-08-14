import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { get as httpGet } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const playwrightModule = process.env.PLAYWRIGHT_MODULE
  ? await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
  : await import('playwright');
const { chromium } = playwrightModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, '_site');
const evidenceDirectory = path.join(root, '.work', 'browser-smoke');
const python = process.env.PYTHON || process.env.PYTHON_PATH || 'python';
const testTimeoutMs = 90_000;
const testTimeout = setTimeout(() => {
  console.error(`BROWSER_SMOKE_FAILED timeout_ms=${testTimeoutMs}`);
  process.exit(2);
}, testTimeoutMs);
testTimeout.unref();

process.on('unhandledRejection', (reason) => {
  console.error('BROWSER_SMOKE_UNHANDLED_REJECTION', reason);
});

const build = spawnSync(python, ['scripts/build_pages_artifact.py', '--output', artifact], {
  cwd: root,
  encoding: 'utf8',
});
if (build.status !== 0) {
  throw new Error(`Pages candidate build failed:\n${build.stdout}\n${build.stderr}`);
}

const freePort = () => new Promise((resolve, reject) => {
  const server = createServer();
  server.unref();
  server.on('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    server.close(() => resolve(address.port));
  });
});

const waitForHttp = async (url, attempts = 50) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const status = await new Promise((resolve, reject) => {
        const request = httpGet(url, (response) => {
          response.resume();
          response.once('end', () => resolve(response.statusCode || 0));
        });
        request.once('error', reject);
        request.setTimeout(1_000, () => request.destroy(new Error('HTTP readiness timeout')));
      });
      if (status >= 200 && status < 400) return;
    } catch (_) {
      // The local server may still be binding.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Local server did not become ready: ${url}`);
};

const noHorizontalOverflow = async (page, label) => {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(metrics.scrollWidth <= metrics.innerWidth, `${label} has horizontal overflow: ${JSON.stringify(metrics)}`);
};

const port = await freePort();
const origin = `http://127.0.0.1:${port}`;
const server = spawn(python, ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', artifact], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverError = '';
server.stderr.on('data', (chunk) => { serverError += chunk.toString(); });

let browser;
let context;
let page;
try {
  await waitForHttp(`${origin}/`);
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const searchRequests = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('request', (request) => { if (request.url().includes('search-index.js')) searchRequests.push(request.url()); });
  let delayedSearchRequest = true;
  await page.route('**/search-index.js*', async (route) => {
    if (delayedSearchRequest) {
      delayedSearchRequest = false;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    await route.continue();
  });

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  assert.equal(searchRequests.length, 0, 'initial page load fetched the full search index');
  await noHorizontalOverflow(page, 'desktop showcase');
  assert.equal(await page.getByRole('button', { name: 'Compare with one acceptable shape' }).isDisabled(), true, 'First Win comparison is available before all three judgments');
  assert.match(await page.locator('[data-first-win-receipt]').innerText(), /judgment_state: incomplete/i, 'First Win does not expose an incomplete local record before checks');
  await page.locator('[data-first-win-check="facts_kept"][value="FAIL"]').check();
  await page.locator('[data-first-win-check="action_kept"][value="PASS"]').check();
  await page.locator('[data-first-win-check="nothing_invented"][value="PASS"]').check();
  assert.equal(await page.getByRole('button', { name: 'Compare with one acceptable shape' }).isEnabled(), true, 'First Win comparison remains disabled after three judgments');
  assert.match(await page.locator('[data-first-win-receipt]').innerText(), /first_nonpass: facts_kept[\s\S]*judgment_state: not_all_checks_marked_pass/i, 'First Win does not retain a recovery-needed local record');
  const firstWinRecoveryHref = await page.getByRole('link', { name: 'Open recovery handoff', exact: true }).getAttribute('href');
  assert.match(firstWinRecoveryHref, /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#recovery-route$/, 'First Win recovery handoff is not a direct bounded route');
  await page.getByRole('button', { name: 'Copy my local check record' }).click();
  await page.locator('[data-first-win-record-status]').getByText(/statuses only, not your answer/i).waitFor();
  await page.getByRole('button', { name: 'Compare with one acceptable shape' }).click();
  assert.equal(await page.locator('[data-first-win-comparison]').isVisible(), true, 'First Win comparison does not reveal after three judgments');
  await page.locator('[data-first-win-check="facts_kept"][value="PASS"]').check();
  assert.match(await page.locator('[data-first-win-receipt]').innerText(), /first_nonpass: none[\s\S]*judgment_state: all_checks_marked_pass/i, 'First Win does not distinguish an all-pass local check');
  const firstWinFinalState = await page.evaluate(() => ({
    checks: [...document.querySelectorAll('[data-first-win-check]')].map((input) => ({ name: input.name, value: input.value, checked: input.checked })),
    recoveryHidden: document.querySelector('[data-first-win-recovery-link]')?.hidden,
    receipt: document.querySelector('[data-first-win-receipt]')?.textContent,
  }));
  assert.equal(firstWinFinalState.recoveryHidden, true, `First Win recovery handoff remains visible after all-pass check: ${JSON.stringify(firstWinFinalState)}`);
  await page.getByRole('button', { name: 'Copy first prompt' }).click();
  await page.locator('[data-copy-starter-status]').getByText('First prompt copied.', { exact: false }).waitFor();
  await page.getByRole('button', { name: 'Copy rescue prompt' }).click();
  await page.locator('[data-copy-starter-status]').getByText('Rescue prompt copied.', { exact: false }).waitFor();

  const searchInput = page.getByRole('searchbox', { name: 'Search the Field Guide' });
  await searchInput.focus();
  await page.waitForTimeout(100);
  assert.equal(searchRequests.length, 0, 'keyboard focus fetched the full search index');
  const searchIndexResponse = page.waitForResponse((response) => response.url().includes('search-index.js') && response.ok());
  await searchInput.fill('verification');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'Clear' }).click();
  await searchIndexResponse;
  assert.equal(searchRequests.length, 1, 'search index was not loaded exactly once on first search intent');
  assert.equal(await searchInput.inputValue(), '', 'clearing during index load restored a stale query');
  assert.equal(await page.locator('[data-search-results] .search-result').count(), 0, 'clearing during index load restored stale results');
  await searchInput.fill('verification');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-results] .search-result').first().waitFor();
  assert.ok(await page.locator('[data-search-results] .search-result').count() > 0, 'search returned no results for verification');
  await searchInput.fill('research checkpoint');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-results] .search-result').filter({ hasText: 'AI safety field signals' }).first().waitFor();
  await page.getByRole('button', { name: 'Clear' }).click();

  const fieldSignalsHref = await page.getByRole('link', { name: 'Read the AI safety field signals' }).getAttribute('href');
  assert.match(fieldSignalsHref, /reader\.html\?path=docs%2Fresearch%2Fai-safety-field-signals-and-research-receipts-2026-08-13\.md&lang=en$/, 'AI safety field-signals link does not open its canonical Reader route');
  const fieldSignalsPage = await context.newPage();
  await fieldSignalsPage.goto(new URL(fieldSignalsHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await fieldSignalsPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await fieldSignalsPage.locator('[data-reader-article] h1').innerText(), /AI safety field signals/i, 'Reader did not render the AI safety field-signals record');
  assert.equal(await fieldSignalsPage.getByRole('heading', { name: /a research checkpoint that survives a long task/i }).isVisible(), true, 'AI safety field-signals record does not expose its research checkpoint');
  assert.match(await fieldSignalsPage.locator('[data-reader-article]').innerText(), /not a security log, audit certificate, chain-of-thought record, or proof that the research is complete/i, 'research checkpoint is missing its evidence boundary');
  await fieldSignalsPage.close();

  const retryPage = await context.newPage();
  let retryRequests = 0;
  await retryPage.route('**/search-index.js*', async (route) => {
    retryRequests += 1;
    if (retryRequests <= 2) await route.abort('failed');
    else await route.continue();
  });
  await retryPage.goto(`${origin}/`, { waitUntil: 'networkidle' });
  const retryInput = retryPage.getByRole('searchbox', { name: 'Search the Field Guide' });
  await retryInput.fill('verification');
  await retryPage.getByRole('button', { name: 'Search', exact: true }).click();
  await retryPage.getByText(/submit again to retry/i).waitFor();
  await retryPage.getByRole('button', { name: 'Search', exact: true }).click();
  await retryPage.locator('[data-search-results] .search-result').first().waitFor();
  assert.equal(retryRequests, 3, 'search failure did not retry after input prefetch and submitted search');
  await retryPage.close();

  const desktopRecoveryHref = await page.locator('.problem-card-practice[data-source-href$="#recovery-route"]').getAttribute('href');
  assert.match(desktopRecoveryHref, /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#recovery-route$/, 'Showcase recovery card does not preserve the Reader fragment');
  const desktopRecoveryPage = await context.newPage();
  await desktopRecoveryPage.goto(new URL(desktopRecoveryHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await desktopRecoveryPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
  const desktopRecoveryTop = await desktopRecoveryPage.locator('#recovery-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(desktopRecoveryTop >= 0 && desktopRecoveryTop < 260, `Desktop Reader did not restore the recovery fragment: ${desktopRecoveryTop}`);
  await desktopRecoveryPage.close();

  await page.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(page, 'mobile showcase');
  assert.match(await page.getByRole('link', { name: 'Open every problem route' }).getAttribute('href'), /reader\.html\?path=README-EN\.md&lang=en#choose-your-starting-point$/, 'mobile route index link does not target the canonical English README route section');
  assert.equal(await page.getByRole('button', { name: 'Copy rescue prompt' }).isVisible(), true, 'mobile rescue control is hidden');
  assert.equal(await page.getByRole('button', { name: 'Copy my local check record' }).isVisible(), true, 'mobile local record control is hidden');

  await page.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F02-first-safe-task-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await page.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.match(await page.locator('[data-reader-article] h1').innerText(), /first safe, verifiable task/i, 'Reader did not render Chapter 2');
  assert.match(await page.locator('.reader-article-context').innerText(), /editorial order/i, 'chapter number implies progress without an editorial-order boundary');
  const mobileReadingOrder = await page.evaluate(() => {
    const heading = document.querySelector('[data-reader-article] h1');
    const opening = document.querySelector('[data-reader-article] > p');
    const orientation = document.querySelector('[data-reader-orientation]');
    const toc = document.querySelector('[data-reader-mobile-page-toc]');
    return {
      headingBeforeOrientation: Boolean(heading.compareDocumentPosition(orientation) & Node.DOCUMENT_POSITION_FOLLOWING),
      openingBeforeOrientation: Boolean(opening.compareDocumentPosition(orientation) & Node.DOCUMENT_POSITION_FOLLOWING),
      orientationBeforeToc: Boolean(orientation.compareDocumentPosition(toc) & Node.DOCUMENT_POSITION_FOLLOWING),
      headingTop: heading.getBoundingClientRect().top,
      openingTop: opening.getBoundingClientRect().top,
      headingLines: Math.round(heading.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(heading).lineHeight)),
      headerPosition: getComputedStyle(document.querySelector('.reader-header')).position,
    };
  });
  assert.equal(mobileReadingOrder.headingBeforeOrientation, true, 'mobile orientation appears before the article title');
  assert.equal(mobileReadingOrder.openingBeforeOrientation, true, 'mobile orientation interrupts the article before its opening paragraph');
  assert.equal(mobileReadingOrder.orientationBeforeToc, true, 'mobile page contents appear before chapter orientation');
  assert.ok(mobileReadingOrder.headingTop < 420, `mobile article title starts too late: ${mobileReadingOrder.headingTop}`);
  assert.ok(mobileReadingOrder.openingTop < 720, `mobile opening paragraph starts too late: ${mobileReadingOrder.openingTop}`);
  assert.ok(mobileReadingOrder.headingLines <= 3, `mobile chapter title uses too many lines: ${mobileReadingOrder.headingLines}`);
  assert.equal(mobileReadingOrder.headerPosition, 'static', 'mobile header persistently obstructs the reading viewport');
  assert.equal(await page.locator('[data-reader-previous]').isVisible(), true, 'Reader previous chapter link is hidden');
  assert.equal(await page.locator('[data-reader-next]').isVisible(), true, 'Reader next chapter link is hidden');
  await noHorizontalOverflow(page, 'mobile Reader');
  await page.getByText('Evidence note for this page').click();
  assert.equal(await page.locator('[data-reader-trust-reviewed]').getAttribute('datetime'), '2026-08-12', 'Reader omits the last actual evidence review date');
  assert.match(await page.locator('.reader-trust-boundary').innerText(), /not a freshness guarantee/i, 'Reader does not bound the scheduled review date');

  await page.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#recovery-route`, { waitUntil: 'networkidle' });
  await page.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.match(await page.locator('[data-reader-article] h1').innerText(), /beginner practice pack/i, 'Reader did not render the public Beginner Practice Pack name');
  assert.match(await page.locator('[data-reader-article]').innerText(), /learner-outcome evidence:\s*none/i, 'Beginner Practice Pack does not expose its learner-evidence boundary');
  assert.equal(await page.getByRole('heading', { name: /recovery route — when the reply already missed/i }).isVisible(), true, 'Post-failure recovery route is not discoverable');
  assert.equal(await page.locator('#recovery-route').count(), 1, 'Reader did not preserve the recovery-route fragment target');
  const recoveryFragmentPosition = await page.locator('#recovery-route').evaluate((target) => ({
    top: target.getBoundingClientRect().top,
    scrollY: window.scrollY,
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
  }));
  assert.ok(recoveryFragmentPosition.top >= 0 && recoveryFragmentPosition.top < 260, `Reader did not restore the recovery-route fragment into the first visible reading band: ${JSON.stringify(recoveryFragmentPosition)}`);
  assert.match(await page.locator('[data-reader-article]').innerText(), /improved_on_this_case \| unchanged \| regressed \| not_comparable/i, 'Recovery route omits comparable rerun statuses');
  assert.equal(await page.getByRole('link', { name: /communication failure triage skill/i }).isVisible(), true, 'Recovery route does not expose the project-owned triage Skill');
  const recoveryVisual = page.locator('img[alt*="Preserve the failed interaction"]');
  assert.match(await recoveryVisual.getAttribute('src'), /assets\/teaching\/failed-interaction-recovery-red-black\.svg$/, 'Recovery teaching visual does not retain its original full-size asset');
  const recoveryVisualLink = page.locator('.reader-image-link').filter({ has: recoveryVisual });
  assert.equal(await recoveryVisualLink.getAttribute('target'), '_blank', 'Teaching visual does not offer a full-size reading route');
  assert.match(await recoveryVisualLink.getAttribute('href'), /assets\/teaching\/failed-interaction-recovery-red-black\.svg$/, 'Teaching visual full-size route is not the original asset');
  assert.equal(await recoveryVisualLink.evaluate((link) => link.classList.contains('reader-teaching-visual')), true, 'Teaching visual is not rendered as a deliberate visual break');
  assert.match(await recoveryVisualLink.locator('.reader-visual-thesis').innerText(), /Preserve the failed interaction/i, 'Teaching visual does not expose a readable thesis before the full board');
  assert.equal(await page.getByRole('link', { name: /open full-size visual: preserve the failed interaction/i }).isVisible(), true, 'Teaching visual full-size route has no accessible name');
  assert.equal(await recoveryVisual.isVisible(), false, 'Mobile Reader shrinks an information-dense teaching board instead of offering its focused full-size route');
  assert.equal(await page.getByRole('link', { name: /coaching-process evaluation candidate/i }).isVisible(), true, 'Related coaching-process evaluation is not discoverable');
  assert.equal(await page.getByRole('link', { name: /task-contract availability and channel study/i }).isVisible(), true, 'Separate task-contract study is not discoverable');
  await noHorizontalOverflow(page, 'mobile Beginner Practice Pack');

  const stalledImagePage = await context.newPage();
  await stalledImagePage.route('**/assets/teaching/failed-interaction-recovery-red-black.svg', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    await route.continue().catch(() => {});
  });
  await stalledImagePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#recovery-route`, { waitUntil: 'domcontentloaded' });
  await stalledImagePage.locator('[data-reader-language]:not([disabled])').waitFor({ timeout: 1_200 });
  assert.equal(await stalledImagePage.locator('[data-reader-article]').getAttribute('aria-busy'), 'false', 'A stalled teaching image blocked Reader initialization');
  await stalledImagePage.close();

  const trustPage = await context.newPage();
  await trustPage.addInitScript(() => { window.CODEX_READER_FETCH_TIMEOUT_MS = 200; });
  await trustPage.route('**/docs/governance/page-trust-registry.yaml', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.continue();
  });
  await trustPage.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F02-first-safe-task-EN.md&lang=en`, { waitUntil: 'domcontentloaded' });
  await trustPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor({ timeout: 800 });
  await trustPage.locator('[data-reader-trust-card]').waitFor({ state: 'visible' });
  await trustPage.getByText('Evidence note for this page').click();
  assert.match(await trustPage.locator('[data-reader-trust-scope]').innerText(), /unavailable/i, 'trust timeout did not degrade independently');
  await trustPage.close();

  const readerRetryPage = await context.newPage();
  await readerRetryPage.addInitScript(() => { window.CODEX_READER_FETCH_TIMEOUT_MS = 200; });
  let readerSourceRequests = 0;
  await readerRetryPage.route('**/book/chapters/02-first-safe-task-EN.md', async (route) => {
    readerSourceRequests += 1;
    if (readerSourceRequests === 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await route.continue();
  });
  await readerRetryPage.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F02-first-safe-task-EN.md&lang=en`, { waitUntil: 'domcontentloaded' });
  await readerRetryPage.getByRole('alert').getByText(/took too long to respond/i).waitFor();
  await readerRetryPage.getByRole('button', { name: 'Try loading again' }).click();
  await readerRetryPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(readerSourceRequests, 2, 'Reader retry did not issue one fresh source request');
  await readerRetryPage.close();

  await page.goto(`${origin}/site/reader.html?path=private%2Fsecret.md&lang=en`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('alert').waitFor();
  assert.equal(await page.getByRole('alert').count(), 1, 'Reader announces one error through multiple assertive regions');
  assert.equal(await page.getByRole('alert').getAttribute('aria-live'), 'assertive', 'Reader error is not an assertive live region');
  assert.match(await page.getByRole('alert').innerText(), /does not name an allowed project source file/i, 'Reader invalid-path failure is not explicit');

  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(' | ')}`);
  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  await context.tracing.stop();
  console.log('BROWSER_SMOKE_OK initial_search_requests=0 lazy_search_requests=1 desktop=1280 mobile=390 readers=chapter-02,beginner-practice-pack,ai-safety-field-signals invalid_path=blocked');
} catch (error) {
  await fs.mkdir(evidenceDirectory, { recursive: true });
  if (page) await page.screenshot({ path: path.join(evidenceDirectory, 'failure.png'), fullPage: true }).catch(() => {});
  if (context) await context.tracing.stop({ path: path.join(evidenceDirectory, 'trace.zip') }).catch(() => {});
  await fs.writeFile(path.join(evidenceDirectory, 'failure.txt'), `${error.stack || error}\n${serverError}`, 'utf8');
  throw error;
} finally {
  clearTimeout(testTimeout);
  if (browser) await browser.close();
  if (server.exitCode === null) {
    server.kill();
    await new Promise((resolve) => server.once('exit', resolve));
  }
  if (server.exitCode && server.exitCode !== 0) throw new Error(`Local server failed (${server.exitCode}): ${serverError}`);
}
