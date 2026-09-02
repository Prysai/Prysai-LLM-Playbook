import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const playwrightModule = await import('playwright');
const { chromium } = playwrightModule.default ?? playwrightModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Each smoke process gets its own Pages artifact. The builder uses a sibling
// `._site-previous` backup while swapping artifacts; sharing `_site` across
// concurrent visual checks lets one process delete another process's files.
const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'prysai-visual-guide-'));
const artifact = path.join(temporaryRoot, '_site');
const python = process.env.PYTHON || 'python';
const locales = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
const localizedVisualAssets = new Set([
  'llm-six-terms-to-one-check.svg', 'foundation-first-visit-route-red-black.svg',
  'llm-foundation-core-path-red-black.svg', 'playbook-learning-journey-red-black.svg',
  'reader-page-reading-loop-red-black.svg', 'first-task-evidence-bridge-red-black.svg',
  'recovery-decision-tree-red-black.svg', 'skill-trigger-boundary-decision-map.svg',
  'skill-to-observable-output.svg',
  'evidence-recovery-ladder.svg',
  'evidence-maturity-ladder-red-black.svg',
]);
const visualSrc = (locale, asset) => locale !== 'en' && localizedVisualAssets.has(asset)
  ? `../assets/teaching/locales/${locale}/${asset}`
  : `../assets/teaching/${asset}`;
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
const expectedEntryTitle = {
  en: 'Four ways in, one route to a checked attempt.',
  zh: '四种入口，通向一次可检查的尝试。',
  es: 'Cuatro entradas, un recorrido hacia un intento comprobable.',
  ja: '4つの入口から、確認できる試行へ進む。',
  ko: '네 가지 입구에서 확인 가능한 시도 하나로.',
  de: 'Vier Einstiege, ein Weg zu einem prüfbaren Versuch.',
  'zh-tw': '四種入口，通往一次可檢查的嘗試。',
  fr: 'Quatre entrées, un parcours vers un essai vérifiable.',
};
const expectedEntryAria = {
  en: 'Choose a visual guide starting point',
  zh: '选择视觉导览的起点',
  es: 'Elegir un punto de entrada a la guía visual',
  ja: 'ビジュアルガイドの開始地点を選ぶ',
  ko: '시각 안내서 시작점 선택',
  de: 'Startpunkt des visuellen Leitfadens wählen',
  'zh-tw': '選擇視覺導覽的起點',
  fr: 'Choisir un point de départ dans le guide visuel',
};
const expectedTopLevelOrder = [
  'visual-hero', 'visual-entry', 'visual-route', 'visual-goal', 'visual-journey',
  'visual-gallery', 'visual-capability', 'visual-concept', 'visual-action-boundary',
  'visual-triage', 'visual-map', 'visual-evidence', 'visual-reading-loop',
  'visual-receipt', 'visual-how', 'visual-maturity',
];
const expectedEntryHrefs = ['#visual-route', '#visual-goal', '#visual-journey', '#visual-gallery'];
const expectedReadingNavHrefs = expectedEntryHrefs;
const expectedSkillBoundaryCard = {
  en: 'Decide whether a Skill should act',
  zh: '先判断 Skill 是否应该行动',
  es: 'Decide si un Skill debe actuar',
  ja: 'Skill を動かすべきか判断する',
  ko: 'Skill이 실행되어야 하는지 판단하기',
  de: 'Entscheiden, ob ein Skill handeln darf',
  'zh-tw': '先判斷 Skill 是否應該執行',
  fr: 'Décider si un Skill doit agir',
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
  cards: 22,
};

const build = spawnSync(python, ['-X', 'utf8', 'scripts/build_pages_artifact.py', '--output', artifact], {
  cwd: root,
  encoding: 'utf8',
});
if (build.status !== 0) {
  await rm(temporaryRoot, { recursive: true, force: true });
}
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
const waitForImagePixels = async (locator, label) => {
  await locator.scrollIntoViewIfNeeded();
  const loaded = await locator.evaluate((image) => image.complete && image.naturalWidth > 0 ? true : new Promise((resolve) => {
    image.addEventListener('load', () => resolve(true), { once: true });
    image.addEventListener('error', () => resolve(false), { once: true });
  }));
  assert.equal(loaded, true, `${label} did not load`);
};

try {
  for (const locale of locales) {
    await page.goto(`${origin}/site/visuals.html?lang=${locale}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.equal(await page.locator('html').getAttribute('lang'), locale, `${locale} document language changed`);
    assert.equal(await page.locator('h1').innerText(), expectedHero[locale], `${locale} hero copy changed`);
    assert.deepEqual(
      await page.locator('#visual-main > [id]').evaluateAll((nodes) => nodes.map((node) => node.id)),
      expectedTopLevelOrder,
      `${locale} visual guide section order changed`,
    );
    assert.equal(await page.locator('#visual-entry').getAttribute('aria-label'), expectedEntryAria[locale], `${locale} visual entry navigation label is not localized`);
    assert.equal(await page.locator('#visual-entry-title').innerText(), expectedEntryTitle[locale], `${locale} visual entry title is not localized`);
    assert.deepEqual(
      await page.locator('[data-visual-reading-link]').evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
      expectedReadingNavHrefs,
      `${locale} reading navigation targets changed`,
    );
    assert.notEqual((await page.locator('.visual-reading-nav-label').innerText()).trim(), '', `${locale} reading navigation label is empty`);
    assert.deepEqual(
      await page.locator('#visual-entry .visual-entry-card').evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
      expectedEntryHrefs,
      `${locale} visual entry targets changed`,
    );
    for (const card of await page.locator('#visual-entry .visual-entry-card').all()) {
      assert.notEqual((await card.innerText()).trim(), '', `${locale} visual entry card is empty`);
    }
    const firstScreen = await page.evaluate(() => {
      const entry = document.querySelector('#visual-entry');
      const firstCard = document.querySelector('#visual-entry .visual-entry-card');
      const action = document.querySelector('.visual-hero-action');
      const entryTitle = document.querySelector('#visual-entry-title');
      const cardTitle = firstCard?.querySelector('strong');
      const cardAction = firstCard?.querySelector('em');
      const box = (node) => node?.getBoundingClientRect();
      const visible = (node) => {
        const rect = box(node);
        return rect && rect.top < window.innerHeight && rect.bottom > 0;
      };
      return {
        viewport: window.innerHeight,
        entryTop: box(entry)?.top,
        firstCardTop: box(firstCard)?.top,
        actionTop: box(action)?.top,
        actionVisible: visible(action),
        entryVisible: visible(entry),
        entryTitleVisible: visible(entryTitle),
        firstCardTitleVisible: visible(cardTitle),
        firstCardActionVisible: visible(cardAction),
      };
    });
    assert.ok(firstScreen.entryTop < firstScreen.viewport, `${locale} visual entry is not in the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.equal(firstScreen.entryVisible, true, `${locale} visual entry is not visible in the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.equal(firstScreen.entryTitleVisible, true, `${locale} visual entry title is not visible in the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.ok(firstScreen.firstCardTop < firstScreen.viewport, `${locale} first visual entry card does not enter the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.equal(firstScreen.firstCardTitleVisible, true, `${locale} first visual entry card title is not visible in the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.equal(firstScreen.actionVisible, true, `${locale} primary visual action is not visible in the first viewport: ${JSON.stringify(firstScreen)}`);
    assert.equal(await page.locator('.visual-header').evaluate((header) => getComputedStyle(header).position), 'sticky', `${locale} visual header is not sticky`);
    assert.equal(await page.locator('[data-visual-reading-link="route"]').getAttribute('aria-current'), 'location', `${locale} reading navigation has no initial location`);
    assert.match(
      await page.locator('[data-visual-goal-fallback] li').first().locator('a').getAttribute('href'),
      new RegExp(`02-first-safe-task-${locale === 'zh-tw' ? 'ZHTW' : locale.toUpperCase()}\\.md&lang=${locale}$`),
      `${locale} text fallback points to the first safe task`,
    );
    for (const selector of ['#visual-entry', '#visual-route', '#visual-goal', '#visual-journey', '#visual-gallery']) {
      assert.notEqual(await page.locator(selector).evaluate((section) => getComputedStyle(section).scrollMarginTop), '0px', `${locale} ${selector} has no anchor offset`);
    }
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
    const officialSite = page.locator('.visual-footer-site');
    assert.equal(await officialSite.count(), 1, `${locale} visual footer is missing the official-site link`);
    assert.equal(await officialSite.getAttribute('href'), 'https://prysai.com/', `${locale} visual footer official-site URL changed`);
    assert.notEqual((await officialSite.textContent() || '').trim(), '', `${locale} visual footer official-site label is empty`);
    assert.equal(await count('.visual-card img[src*="first-task-evidence-bridge-red-black.svg"]'), 1, `${locale} first-task evidence bridge is missing from the visual gallery`);
    const skillBoundaryCard = page.locator('.visual-card:has(img[src*="skill-trigger-boundary-decision-map.svg"])');
    assert.equal(await skillBoundaryCard.count(), 1, `${locale} Skill boundary card is missing from the visual gallery`);
    assert.equal((await skillBoundaryCard.locator('h3').textContent() || '').trim(), expectedSkillBoundaryCard[locale], `${locale} Skill boundary card title is not localized`);
    assert.notEqual((await skillBoundaryCard.locator('img').getAttribute('alt') || '').trim(), '', `${locale} Skill boundary card has no alternative text`);
    assert.notEqual((await skillBoundaryCard.locator('p').textContent() || '').trim(), '', `${locale} Skill boundary card has no localized explanation`);
    const capabilityLocaleState = await page.locator('[data-visual-capability-image]').evaluate((image) => {
      const note = image.closest('a')?.querySelector('.visual-locale-note');
      return { status: image.dataset.visualLocaleStatus, note: note?.textContent || '', hidden: note?.hidden ?? true };
    });
    assert.equal(capabilityLocaleState.status, locale === 'en' ? 'source' : 'english-fallback', `${locale} fallback visual status is not explicit`);
    assert.equal(capabilityLocaleState.hidden, locale === 'en', `${locale} fallback note visibility is incorrect`);
    if (locale !== 'en') assert.notEqual(capabilityLocaleState.note.trim(), '', `${locale} fallback visual has no localized disclosure`);
    const goalLocaleState = await page.locator('[data-visual-goal-image]').evaluate((image) => ({
      status: image.dataset.visualLocaleStatus,
      note: image.closest('a')?.querySelector('.visual-locale-note')?.hidden ?? true,
    }));
    assert.equal(goalLocaleState.status, locale === 'en' ? 'source' : 'localized', `${locale} localized visual status changed`);
    assert.equal(goalLocaleState.note, true, `${locale} localized visual unexpectedly shows fallback disclosure`);
    await waitForImagePixels(page.locator('[data-visual-maturity-image]'), `${locale} evidence maturity image`);
    const maturityLocaleState = await page.locator('[data-visual-maturity-image]').evaluate((image) => ({
      src: image.getAttribute('src'),
      status: image.dataset.visualLocaleStatus,
      locale: image.dataset.visualLocale,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    }));
    assert.equal(maturityLocaleState.src, visualSrc(locale, 'evidence-maturity-ladder-red-black.svg'), `${locale} evidence maturity image did not resolve to the selected locale`);
    assert.equal(maturityLocaleState.status, locale === 'en' ? 'source' : 'localized', `${locale} evidence maturity image status is not explicit`);
    assert.equal(maturityLocaleState.locale, locale, `${locale} evidence maturity image reports the wrong locale`);
    assert.equal(maturityLocaleState.complete, true, `${locale} evidence maturity image did not finish loading`);
    assert.ok(maturityLocaleState.naturalWidth > 0, `${locale} evidence maturity image has no rendered pixels`);
    await page.locator('[data-visual-maturity-nodes] button').last().click();
    assert.equal(await page.locator('[data-visual-maturity-nodes] button').last().getAttribute('aria-pressed'), 'true', `${locale} maturity selection is not exposed`);
    assert.match(await page.locator('[data-visual-maturity-link]').getAttribute('href'), new RegExp(`15-research-track-[A-Z]+\\.md&lang=${locale}$`), `${locale} maturity route lost its locale`);
    await noHorizontalOverflow(`${locale} 390px visual guide`);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${origin}/site/visuals.html?lang=en`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 0));
  const desktopFirstScreen = await page.evaluate(() => {
    const entry = document.querySelector('#visual-entry').getBoundingClientRect();
    const card = document.querySelector('#visual-entry .visual-entry-card').getBoundingClientRect();
    const cardTitle = document.querySelector('#visual-entry .visual-entry-card strong').getBoundingClientRect();
    const cardAction = document.querySelector('#visual-entry .visual-entry-card em').getBoundingClientRect();
    return { viewport: window.innerHeight, entryTop: entry.top, cardTop: card.top, cardTitleBottom: cardTitle.bottom, cardActionBottom: cardAction.bottom };
  });
  assert.ok(desktopFirstScreen.entryTop < desktopFirstScreen.viewport, `desktop visual entry is not in the first viewport: ${JSON.stringify(desktopFirstScreen)}`);
  assert.ok(desktopFirstScreen.cardTitleBottom < desktopFirstScreen.viewport, `desktop first visual entry card title is not in the first viewport: ${JSON.stringify(desktopFirstScreen)}`);
  assert.ok(desktopFirstScreen.cardActionBottom <= desktopFirstScreen.viewport - 16, `desktop first visual entry card action has no visible first-screen margin: ${JSON.stringify(desktopFirstScreen)}`);

  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(`${origin}/site/visuals.html?lang=fr`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await noHorizontalOverflow('fr 360px visual guide');
  assert.equal(await count('.visual-card'), expectedCounts.cards, 'fr 360px gallery lost teaching boards');
  assert.equal(await page.locator('.visual-footer-site').getAttribute('href'), 'https://prysai.com/', 'fr 360px footer lost the official-site link');
  const narrowFirstCard = await page.locator('#visual-entry .visual-entry-card').first().evaluate((card) => {
    const title = card.querySelector('strong')?.getBoundingClientRect();
    const action = card.querySelector('em')?.getBoundingClientRect();
    return { viewport: window.innerHeight, titleTop: title?.top, titleBottom: title?.bottom, actionTop: action?.top, actionBottom: action?.bottom };
  });
  assert.ok(narrowFirstCard.titleBottom <= narrowFirstCard.viewport - 8, `fr 360px first visual entry title is not usable in the first viewport: ${JSON.stringify(narrowFirstCard)}`);
  assert.ok(narrowFirstCard.actionBottom <= narrowFirstCard.viewport - 8, `fr 360px first visual entry action is not usable in the first viewport: ${JSON.stringify(narrowFirstCard)}`);
  await page.locator('#visual-entry .visual-entry-card').first().focus();
  const focusState = await page.locator('#visual-entry .visual-entry-card').first().evaluate((link) => {
    const style = getComputedStyle(link);
    return { active: document.activeElement === link, outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  assert.equal(focusState.active, true, 'visual entry card did not receive keyboard focus');
  assert.notEqual(focusState.outlineStyle, 'none', 'visual entry card has no visible focus style');
  assert.notEqual(focusState.outlineWidth, '0px', 'visual entry card focus style has no width');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reducedMotion = await page.evaluate(() => ({ scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, transitionDuration: getComputedStyle(document.querySelector('.visual-entry-card')).transitionDuration }));
  assert.equal(reducedMotion.scrollBehavior, 'auto', 'visual guide did not disable smooth scrolling for reduced motion');
  assert.notEqual(reducedMotion.transitionDuration, '0s', 'visual guide reduced-motion transition rule was not applied');
  await page.emulateMedia({ reducedMotion: null });

  // Board links open the project-owned responsive viewer rather than a raw
  // SVG. Verify one localized route, the zoom contract, and the invalid-asset
  // boundary so a broken link cannot look like a successful visual page.
  await page.goto(`${origin}/site/visuals.html?lang=fr`, { waitUntil: 'networkidle' });
  const routeVisualHref = await page.locator('[data-visual-goal-image-link]').getAttribute('href');
  assert.match(routeVisualHref || '', /^visual\.html\?asset=[^&]+&lang=fr(?:&label=|$)/, 'visual guide goal board does not use the localized responsive viewer');
  // Switching more than once must keep the original asset name. A localized
  // path is an implementation detail, not a new asset identifier.
  await page.locator('#visual-language').selectOption('zh');
  assert.equal(await page.locator('[data-visual-goal-image]').getAttribute('src'), visualSrc('zh', 'foundation-first-visit-route-red-black.svg'), 'visual guide lost the Chinese board after the first language switch');
  await page.locator('#visual-language').selectOption('de');
  assert.equal(await page.locator('[data-visual-goal-image]').getAttribute('src'), visualSrc('de', 'foundation-first-visit-route-red-black.svg'), 'visual guide lost the German board after a second language switch');
  await page.locator('#visual-language').selectOption('fr');
  assert.equal(await page.locator('[data-visual-goal-image]').getAttribute('src'), visualSrc('fr', 'foundation-first-visit-route-red-black.svg'), 'visual guide did not restore the French board after repeated switching');
  await page.goto(`${origin}/site/visual.html?asset=prompt-contract-six-fields-red-black.svg&lang=fr&label=Contrat%20de%20prompt`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-viewer-title]').innerText(), 'Contrat de prompt', 'viewer did not preserve the localized board label');
  assert.equal(await page.locator('[data-viewer-error]').isHidden(), true, 'viewer rejected an approved teaching board');
  assert.equal(await page.locator('[data-viewer-image]').evaluate((image) => image.complete && image.naturalWidth > 0), true, 'viewer image did not load');
  assert.equal(await page.locator('[data-viewer-zoom-value]').innerText(), '100%', 'viewer did not expose its initial zoom');
  const viewerOfficialSite = page.locator('.viewer-footer-site');
  assert.equal(await viewerOfficialSite.count(), 1, 'visual viewer footer is missing the official-site link');
  assert.equal(await viewerOfficialSite.getAttribute('href'), 'https://prysai.com/', 'visual viewer footer official-site URL changed');
  assert.equal((await viewerOfficialSite.textContent() || '').trim(), 'Site officiel de Prysai', 'visual viewer footer official-site label is not localized');
  await page.locator('[data-viewer-zoom-in]').click();
  assert.equal(await page.locator('[data-viewer-zoom-value]').innerText(), '125%', 'viewer zoom control did not update');
  await noHorizontalOverflow('fr 360px visual viewer');
  await page.locator('#viewer-language').selectOption('zh-tw');
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-tw', 'viewer language switch did not update document language');
  assert.match(await page.locator('[data-viewer-home]').first().getAttribute('href') || '', /visuals\.html\?lang=zh-tw$/, 'viewer language switch lost the localized guide route');
  assert.equal((await page.locator('.viewer-footer-site').textContent() || '').trim(), 'Prysai 官方網站', 'viewer footer language switch did not localize the official-site label');
  await page.goto(`${origin}/site/visual.html?asset=not-a-teaching-board.svg&lang=fr`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.viewer-stage').isHidden(), true, 'viewer kept the stage for an unapproved asset');
  assert.equal(await page.locator('[data-viewer-error]').isHidden(), false, 'viewer did not expose the invalid-asset error');
  assert.equal((await page.locator('.viewer-footer-site').textContent() || '').trim(), 'Site officiel de Prysai', 'invalid-asset viewer did not localize the official-site footer');
  await page.goto(`${origin}/site/visuals.html?lang=en`, { waitUntil: 'networkidle' });

  const noScriptContext = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(`${origin}/site/visuals.html?lang=en`, { waitUntil: 'domcontentloaded' });
  assert.equal(await noScriptPage.locator('#visual-entry').count(), 1, 'no-script visual entry navigation is missing');
  assert.equal(await noScriptPage.locator('#visual-entry .visual-entry-card').count(), 4, 'no-script visual entry navigation changed');
  assert.deepEqual(
    await noScriptPage.locator('#visual-entry .visual-entry-card').evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
    expectedEntryHrefs,
    'no-script visual entry targets changed',
  );
  assert.notEqual((await noScriptPage.locator('#visual-entry-title').innerText()).trim(), '', 'no-script visual entry title is empty');
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
  await rm(temporaryRoot, { recursive: true, force: true });
}
