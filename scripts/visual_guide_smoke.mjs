import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const playwrightModule = await import('playwright');
const { chromium } = playwrightModule.default ?? playwrightModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, '_site');
const python = process.env.PYTHON || 'python';
const locales = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
const expectedHero = {
  en: 'See the method before you read the detail.',
  zh: '先看懂方法，再读具体内容。',
  es: 'Mira el método antes de leer el detalle.',
  ja: '細部を読む前に、方法の全体像を見る。',
  ko: '세부 내용을 읽기 전에 방법을 먼저 보세요.',
  de: 'Erst die Methode sehen, dann ins Detail gehen.',
  'zh-tw': '先看懂方法，再閱讀細節。',
  fr: 'Voyez la méthode avant d’entrer dans le détail.',
};
const expectedCounts = {
  route: 11,
  goal: 4,
  journey: 4,
  capability: 7,
  maturity: 5,
  concept: 6,
  evidence: 5,
  receipt: 5,
  readingLoop: 6,
  actionBoundary: 5,
  triage: 4,
  cards: 20,
};

const build = spawnSync(python, ['-X', 'utf8', 'scripts/build_pages_artifact.py', '--output', artifact], {
  cwd: root,
  encoding: 'utf8',
});
assert.equal(build.status, 0, `Pages candidate build failed:\n${build.stdout}\n${build.stderr}`);

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
  const relative = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const filePath = path.resolve(artifact, relative);
  if (!filePath.startsWith(`${artifact}${path.sep}`)) {
    response.writeHead(400).end();
    return;
  }
  readFile(filePath)
    .then((body) => {
      const contentType = filePath.endsWith('.html') ? 'text/html; charset=utf-8'
        : filePath.endsWith('.js') ? 'text/javascript; charset=utf-8'
          : filePath.endsWith('.css') ? 'text/css; charset=utf-8'
            : filePath.endsWith('.svg') ? 'image/svg+xml'
              : 'application/octet-stream';
      response.writeHead(200, { 'content-type': contentType });
      response.end(body);
    })
    .catch(() => response.writeHead(404).end());
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();

const count = async (selector) => page.locator(selector).count();
const noHorizontalOverflow = async (label) => {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(metrics.scrollWidth <= metrics.innerWidth, `${label} has horizontal overflow: ${JSON.stringify(metrics)}`);
};

try {
  for (const locale of locales) {
    await page.goto(`${origin}/site/visuals.html?lang=${locale}`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('lang'), locale, `${locale} document language changed`);
    assert.equal(await page.locator('h1').innerText(), expectedHero[locale], `${locale} hero copy changed`);
    const selectors = {
      route: '[data-visual-route-nodes] button',
      goal: '[data-visual-goal-nodes] button',
      journey: '[data-visual-journey-nodes] button',
      capability: '[data-visual-capability-nodes] button',
      maturity: '[data-visual-maturity-nodes] button',
      concept: '[data-visual-concept-nodes] button',
      evidence: '[data-visual-evidence-nodes] button',
      receipt: '[data-visual-receipt-nodes] button',
      readingLoop: '[data-visual-reading-loop-nodes] button',
      actionBoundary: '[data-visual-action-boundary-nodes] button',
      triage: '[data-visual-triage-nodes] button',
      cards: '.visual-card',
    };
    for (const [name, selector] of Object.entries(selectors)) {
      assert.equal(await count(selector), expectedCounts[name], `${locale} ${name} visual contract changed`);
    }
    await page.locator('[data-visual-maturity-nodes] button').last().click();
    assert.equal(await page.locator('[data-visual-maturity-nodes] button').last().getAttribute('aria-pressed'), 'true', `${locale} maturity selection is not exposed`);
    assert.match(await page.locator('[data-visual-maturity-link]').getAttribute('href'), new RegExp(`15-research-track-[A-Z]+\\.md&lang=${locale}$`), `${locale} maturity route lost its locale`);
    await noHorizontalOverflow(`${locale} 390px visual guide`);
  }

  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(`${origin}/site/visuals.html?lang=fr`, { waitUntil: 'networkidle' });
  await noHorizontalOverflow('fr 360px visual guide');
  assert.equal(await count('.visual-card'), expectedCounts.cards, 'fr 360px gallery lost teaching boards');

  // Board links open the project-owned responsive viewer rather than a raw
  // SVG. Verify one localized route, the zoom contract, and the invalid-asset
  // boundary so a broken link cannot look like a successful visual page.
  await page.goto(`${origin}/site/visuals.html?lang=fr`, { waitUntil: 'networkidle' });
  const routeVisualHref = await page.locator('[data-visual-goal-image-link]').getAttribute('href');
  assert.match(routeVisualHref || '', /^visual\.html\?asset=[^&]+&lang=fr(?:&label=|$)/, 'visual guide goal board does not use the localized responsive viewer');
  await page.goto(`${origin}/site/visual.html?asset=prompt-contract-six-fields-red-black.svg&lang=fr&label=Contrat%20de%20prompt`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-viewer-title]').innerText(), 'Contrat de prompt', 'viewer did not preserve the localized board label');
  assert.equal(await page.locator('[data-viewer-error]').isHidden(), true, 'viewer rejected an approved teaching board');
  assert.equal(await page.locator('[data-viewer-image]').evaluate((image) => image.complete && image.naturalWidth > 0), true, 'viewer image did not load');
  assert.equal(await page.locator('[data-viewer-zoom-value]').innerText(), '100%', 'viewer did not expose its initial zoom');
  await page.locator('[data-viewer-zoom-in]').click();
  assert.equal(await page.locator('[data-viewer-zoom-value]').innerText(), '125%', 'viewer zoom control did not update');
  await noHorizontalOverflow('fr 360px visual viewer');
  await page.locator('#viewer-language').selectOption('zh-tw');
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-tw', 'viewer language switch did not update document language');
  assert.match(await page.locator('[data-viewer-home]').first().getAttribute('href') || '', /visuals\.html\?lang=zh-tw$/, 'viewer language switch lost the localized guide route');
  await page.goto(`${origin}/site/visual.html?asset=not-a-teaching-board.svg&lang=fr`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.viewer-stage').isHidden(), true, 'viewer kept the stage for an unapproved asset');
  assert.equal(await page.locator('[data-viewer-error]').isHidden(), false, 'viewer did not expose the invalid-asset error');
  await page.goto(`${origin}/site/visuals.html?lang=en`, { waitUntil: 'networkidle' });

  const noScriptContext = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(`${origin}/site/visuals.html?lang=en`, { waitUntil: 'domcontentloaded' });
  for (const [name, selector] of Object.entries({
    route: '[data-visual-route-fallback] li',
    goal: '[data-visual-goal-fallback] li',
    journey: '[data-visual-journey-fallback] li',
    capability: '[data-visual-capability-fallback] li',
    maturity: '[data-visual-maturity-fallback] li',
    concept: '[data-visual-concept-fallback] li',
    evidence: '[data-visual-evidence-fallback] li',
    receipt: '[data-visual-receipt-fallback] li',
    readingLoop: '[data-visual-reading-loop-fallback] li',
    actionBoundary: '[data-visual-action-boundary-fallback] li',
    triage: '[data-visual-triage-fallback] li',
  })) {
    assert.equal(await noScriptPage.locator(selector).count(), expectedCounts[name], `no-script ${name} fallback changed`);
  }
  // The interactive guide owns the first explanation in each section. The
  // remaining ordered lists are progressive-enhancement fallbacks: they must
  // stay available without scripts, but should not duplicate every map on the
  // default page or turn a mobile visit into one very long scroll.
  for (const selector of [
    '.visual-goal-fallback',
    '.visual-journey-fallback',
    '.visual-capability-fallback',
    '.visual-maturity-fallback',
    '.visual-concept-fallback',
    '.visual-action-boundary-fallback',
    '.visual-triage-fallback',
    '.visual-map-fallback',
    '.visual-evidence-fallback',
    '.visual-reading-loop-fallback',
    '.visual-receipt-fallback',
    '.visual-board-explorer-fallback',
  ]) {
    assert.equal(await noScriptPage.locator(selector).evaluate((details) => details.open), false, `default visual guide keeps ${selector} expanded`);
  }
  await noScriptContext.close();
  console.log(`VISUAL_GUIDE_SMOKE_OK locales=${locales.length} cards=${expectedCounts.cards} mobile=390,360 no_script=1`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
