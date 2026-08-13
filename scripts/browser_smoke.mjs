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

  await page.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(page, 'mobile showcase');
  assert.equal(await page.getByRole('button', { name: 'Copy rescue prompt' }).isVisible(), true, 'mobile rescue control is hidden');

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
  console.log('BROWSER_SMOKE_OK initial_search_requests=0 lazy_search_requests=1 desktop=1280 mobile=390 reader=chapter-02 invalid_path=blocked');
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
