import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { get as httpGet } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import os from 'node:os';
import path from 'node:path';

const playwrightModule = process.env.PLAYWRIGHT_MODULE
  ? await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
  : await import('playwright');
// `import()` wraps CommonJS Playwright packages under `default`; native ESM
// packages expose `chromium` directly. Support both so this check stays
// portable across the project's bundled and contributor-installed runtimes.
const { chromium } = playwrightModule.default ?? playwrightModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, '_site');
const evidenceDirectory = path.join(root, '.work', 'browser-smoke');
const visualEvidenceDirectory = path.join(root, 'output', 'playwright');
const contentStatus = JSON.parse(await fs.readFile(path.join(root, 'docs', 'governance', 'content-status.yaml'), 'utf8'));
const governedSkillCount = contentStatus?.skills?.count;
assert.equal(Number.isInteger(governedSkillCount) && governedSkillCount > 0, true, 'content-status does not provide a positive Skill inventory count');
const bundledPython = path.join(
  os.homedir(),
  '.cache',
  'codex-runtimes',
  'codex-primary-runtime',
  'dependencies',
  'python',
  process.platform === 'win32' ? 'python.exe' : 'python',
);
const python = process.env.PYTHON || process.env.PYTHON_PATH || (existsSync(bundledPython) ? bundledPython : 'python');
// This smoke covers every locale, multiple full Reader routes, visual
// screenshots, and mobile navigation. Keep the guard above normal CI jitter
// without hiding a genuinely stalled run.
const testTimeoutMs = 180_000;
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
  // Shared URLs must be deterministic. A previous visitor's preference must
  // not turn the unparameterized English entry or Reader into Chinese.
  await context.addInitScript(() => {
    localStorage.setItem('prysai-llm-playbook-language', 'zh');
    localStorage.setItem('codex-field-guide-language', 'zh');
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
  assert.equal(await page.locator('html').getAttribute('lang'), 'en', 'unparameterized English entry inherits a browser language preference');
  assert.equal(await page.locator('h1').innerText(), 'Understand LLMs before you ask them to work.', 'unparameterized English entry does not render English content');
  assert.equal(searchRequests.length, 0, 'initial page load fetched the full search index');
  assert.equal(
    await page.locator('#start').evaluate((section) => section.previousElementSibling?.id),
    'top',
    'the project catalogue appears before the first useful result instead of after it',
  );
  assert.match(await page.locator('[data-hero-primary]').getAttribute('href'), /reader\.html\?path=book%2Froutes%2Fllm-foundation-core-v1-EN\.md&lang=en$/, 'hero primary action does not lead to the LLM Foundation Core');
  assert.match(await page.locator('[data-hero-primary]').innerText(), /^Start the LLM Foundation Core/, 'hero primary action does not name the required foundation');
  assert.match(await page.locator('.hero-route-kicker').innerText(), /one required foundation route/i, 'foundation route is not clearly required before application practice');
  assert.match(await page.locator('.hero-route-kicker').innerText(), /1.*2.*3.*4.*5/, 'foundation route preview does not name all five units');
  assert.equal(await page.locator('.hero-route-continuation-list li').count(), 2, 'foundation route preview omits its final continuation nodes');
  assert.match(await page.locator('.hero-route-continuation').innerText(), /visible failures/i, 'foundation route preview omits the visible-failures unit');
  assert.match(await page.locator('.hero-route-continuation').innerText(), /check, repair, and transfer/i, 'foundation route preview omits the check-and-transfer units');
  assert.equal(
    await page.locator('.site-header .wordmark').getAttribute('href'),
    'https://docs.prysai.com/llm-playbook/',
    'the Playbook logo does not point to the canonical Docs site',
  );
  assert.equal(await page.locator('.site-header .wordmark').getAttribute('target'), '_top', 'the Playbook logo does not return the top-level window to the canonical Docs site');
  assert.equal(await page.locator('.site-header .wordmark').getAttribute('rel'), null, 'the Playbook logo carries an unexpected external-link relationship');
  assert.equal(await page.locator('.site-footer .wordmark').getAttribute('href'), 'https://docs.prysai.com/llm-playbook/', 'the footer logo does not point to the canonical Docs site');
  assert.equal(await page.locator('.site-footer .wordmark').getAttribute('target'), '_top', 'the footer logo does not return the top-level window to the canonical Docs site');
  assert.equal(await page.locator('.site-footer .wordmark').getAttribute('rel'), null, 'the footer logo carries an unexpected external-link relationship');
  // Hugging Face Static Spaces wrap the site in a sandboxed iframe that does
  // not allow top-level navigation. Verify the hosted fallback changes only
  // the brand links to a user-initiated, escaped popup and that the popup is
  // the canonical Docs URL.
  const hostedWrapperPage = await context.newPage();
  await hostedWrapperPage.setContent(`<iframe data-test-hosted-wrapper sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" src="${origin}/site/index.html"></iframe>`);
  const hostedFrame = hostedWrapperPage.frameLocator('iframe[data-test-hosted-wrapper]');
  await hostedFrame.locator('.site-header .wordmark').waitFor();
  assert.equal(await hostedFrame.locator('.site-header .wordmark').getAttribute('target'), '_blank', 'embedded Logo does not use the hosted navigation fallback');
  assert.equal(await hostedFrame.locator('.site-header .wordmark').getAttribute('rel'), 'noopener', 'embedded Logo fallback is missing noopener');
  assert.equal(await hostedFrame.locator('.site-header .wordmark').getAttribute('data-hosted-navigation'), 'new-tab', 'embedded Logo fallback is not marked');
  const hostedPopupPromise = context.waitForEvent('page');
  await hostedFrame.locator('.site-header .wordmark').click();
  const hostedPopup = await hostedPopupPromise;
  assert.equal(hostedPopup.url(), 'https://docs.prysai.com/llm-playbook/', 'embedded Logo popup does not target the canonical Docs URL');
  await hostedPopup.close();
  const hostedNavigationTargets = {
    navStart: '#start',
    navPath: '#path',
    navRoutes: '#chapters',
    navIndex: '#project-map',
  };
  for (const [translationKey, hash] of Object.entries(hostedNavigationTargets)) {
    const hostedLink = hostedFrame.locator(`.site-nav a[data-i18n="${translationKey}"]`);
    assert.equal(await hostedLink.getAttribute('href'), `https://docs.prysai.com/llm-playbook/${hash}`, `${translationKey} does not target the canonical Docs route when hosted`);
    assert.equal(await hostedLink.getAttribute('target'), '_blank', `${translationKey} does not escape the hosted iframe`);
    assert.equal(await hostedLink.getAttribute('rel'), 'noopener', `${translationKey} hosted navigation is missing noopener`);
    assert.equal(await hostedLink.getAttribute('data-hosted-navigation'), 'new-tab', `${translationKey} hosted navigation is not marked`);
  }
  await hostedWrapperPage.close();
  const homepageMenuTargets = {
    'Start here': '#start',
    'Learning path': '#path',
    'Reading routes': '#chapters',
    'Project index': '#project-map',
  };
  for (const [label, hash] of Object.entries(homepageMenuTargets)) {
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
    const menuLink = page.getByRole('link', { name: label, exact: true });
    assert.equal(await menuLink.getAttribute('href'), `index.html${hash}`, `${label} menu link does not use an explicit site document`);
    assert.equal(
      new URL(await menuLink.evaluate((link) => link.href)).pathname,
      '/site/index.html',
      `${label} menu link resolves through a directory route instead of the site document`,
    );
    await menuLink.click();
    await page.waitForURL(`${origin}/site/index.html${hash}`);
  }
  await noHorizontalOverflow(page, 'desktop showcase');
  // Every homepage Reader link with a fragment promises a concrete landing
  // point. Check the rendered Markdown document, not just the shell URL: a
  // typo in an authored anchor otherwise degrades to a plausible page top.
  const homepageReaderFragments = await page.locator('a[href*="reader.html"][href*="#"]').evaluateAll((links) => (
    [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))]
  ));
  assert.ok(homepageReaderFragments.length > 0, 'homepage has no fragment-bearing Reader links to verify');
  const fragmentPage = await context.newPage();
  for (const href of homepageReaderFragments) {
    await fragmentPage.goto(new URL(href, `${origin}/site/`).href, { waitUntil: 'networkidle' });
    await fragmentPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    const fragment = new URL(fragmentPage.url()).hash.slice(1);
    assert.ok(fragment, `homepage Reader link has an empty fragment: ${href}`);
    const targetMetrics = await fragmentPage.locator('[data-reader-article]').evaluate((article, id) => {
      const target = article.ownerDocument.getElementById(id);
      if (!target || !article.contains(target)) return { count: 0 };
      return { count: 1 };
    }, decodeURIComponent(fragment));
    assert.equal(targetMetrics.count, 1, `homepage Reader link lands on a missing anchor: ${href}`);
  }
  await fragmentPage.close();
  assert.deepEqual(
    homepageReaderFragments.filter((href) => href.includes('route-b--one-observable-non-language-skill')),
    [],
    'homepage contains the retired double-hyphen Route B fragment',
  );
  // A new reader must see the actual first action without having to discover
  // it by scrolling past the opening explanation. Use a short desktop height
  // because browser chrome commonly leaves less than a full 900px viewport.
  await page.setViewportSize({ width: 1280, height: 720 });
  const firstActionBounds = await page.locator('[data-hero-primary]').evaluate((link) => link.getBoundingClientRect().toJSON());
  assert.ok(firstActionBounds.bottom <= 720, `desktop first action starts below the initial viewport: ${JSON.stringify(firstActionBounds)}`);
  await page.setViewportSize({ width: 1280, height: 900 });
  await fs.mkdir(visualEvidenceDirectory, { recursive: true });
  await page.locator('.hero').screenshot({ path: path.join(visualEvidenceDirectory, 'hero-routes-desktop.png') });
  // The product entry must give an unsure visitor one concrete outcome, not
  // make them decode the curriculum before trying anything.
  const goalWizard = page.locator('[data-goal-wizard]');
  await goalWizard.scrollIntoViewIfNeeded();
  assert.equal(await goalWizard.locator('[data-goal-key]').count(), 6, 'goal wizard does not offer six concrete starting purposes');
  assert.match(
    await goalWizard.locator('[data-goal-key="research"]').innerText(),
    /source-check prompt that separates evidence from guesses/i,
    'research goal does not state the usable result before asking for details',
  );
  await goalWizard.locator('[data-goal-key="task"]').click();
  await goalWizard.locator('[data-field-key="goal"]').fill('Fix one broken help-page link');
  await goalWizard.locator('[data-field-key="context"]').fill('The file is docs/help.md and I can edit it locally.');
  await goalWizard.locator('[data-goal-form]').getByRole('button', { name: 'Build my prompt' }).click();
  assert.match(await goalWizard.locator('[data-goal-prompt]').innerText(), /allowed actions[\s\S]*stop condition/i, 'task goal does not produce a bounded, usable prompt');
  assert.match(
    await goalWizard.locator('[data-goal-path]').getAttribute('href'),
    /reader\.html\?path=book%2Fchapters%2F03-task-protocol-EN\.md&lang=en#core-task-contract$/,
    'task goal deep link does not use the current English Reader route',
  );
  await page.goto(`${origin}/site/?lang=zh`, { waitUntil: 'networkidle' });
  const chineseGoalWizard = page.locator('[data-goal-wizard]');
  await chineseGoalWizard.locator('[data-goal-key="task"]').click();
  await chineseGoalWizard.locator('[data-field-key="goal"]').fill('修复帮助页面上的一个失效链接');
  await chineseGoalWizard.locator('[data-field-key="context"]').fill('文件是 docs/help.md，我可以在本地修改。');
  await chineseGoalWizard.locator('[data-wizard-next]').click();
  assert.match(await chineseGoalWizard.locator('[data-goal-prompt]').innerText(), /允许行动[\s\S]*停止条件/, 'Chinese task goal does not render its Chinese prompt');
  assert.match(
    await chineseGoalWizard.locator('[data-goal-path]').getAttribute('href'),
    /reader\.html\?path=book%2Fchapters%2F03-task-protocol-ZH\.md&lang=zh#core-task-contract$/,
    'Chinese task goal deep link does not stay on the Chinese route',
  );
  await noHorizontalOverflow(page, 'Chinese goal wizard');
  // Traditional Chinese must use its own goal records, not the English
  // fallback. The first generated prompt and its Reader route are both
  // observable requirements of the seventh locale.
  await page.goto(`${origin}/site/?lang=zh-tw`, { waitUntil: 'networkidle' });
  const traditionalGoalWizard = page.locator('[data-goal-wizard]');
  await traditionalGoalWizard.locator('[data-goal-key="task"]').click();
  await traditionalGoalWizard.locator('[data-field-key="goal"]').fill('修復說明頁上的一個失效連結');
  await traditionalGoalWizard.locator('[data-field-key="context"]').fill('檔案是 docs/help.md，我可以在本機修改。');
  await traditionalGoalWizard.locator('[data-wizard-next]').click();
  assert.match(await traditionalGoalWizard.locator('[data-goal-prompt]').innerText(), /允許行動[\s\S]*停止條件/, 'Traditional Chinese task goal does not render its local prompt');
  assert.match(
    await traditionalGoalWizard.locator('[data-goal-path]').getAttribute('href'),
    /reader\.html\?path=book%2Fchapters%2F03-task-protocol-ZHTW\.md&lang=zh-tw#core-task-contract$/,
    'Traditional Chinese task goal deep link does not stay on the ZHTW route',
  );
  // Every localized language-practice prompt must land on an actual anchor in
  // its own Reader document. A same-locale filename with a stale English
  // fragment silently sends readers to the article top, which defeats the
  // concrete next step promised by the goal wizard.
  for (const locale of ['zh', 'es', 'ja', 'ko', 'de', 'zh-tw']) {
    await page.goto(`${origin}/site/?lang=${locale}`, { waitUntil: 'networkidle' });
    const localizedWizard = page.locator('[data-goal-wizard]');
    await localizedWizard.locator('[data-goal-key="language"]').click();
    const localizedFields = localizedWizard.locator('[data-goal-fields] input, [data-goal-fields] textarea');
    for (let index = 0; index < await localizedFields.count(); index += 1) {
      await localizedFields.nth(index).fill('test');
    }
    await localizedWizard.locator('[data-wizard-next]').click();
    const localizedPromptHref = await localizedWizard.locator('[data-goal-path]').getAttribute('href');
    const suffix = locale === 'zh-tw' ? 'ZHTW' : locale.toUpperCase();
    assert.match(
      localizedPromptHref,
      new RegExp(`book%2Fcommunication-clinic-${suffix}\\.md&lang=${locale}#language-practice-route$`),
      `${locale} language goal does not stay on its local route`,
    );
    await page.goto(new URL(localizedPromptHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.equal(await page.locator('#language-practice-route').count(), 1, `${locale} language goal points to a missing local anchor`);
    const localizedAnchorTop = await page.locator('#language-practice-route').evaluate((target) => target.getBoundingClientRect().top);
    assert.ok(localizedAnchorTop >= 0 && localizedAnchorTop < 260, `${locale} language goal does not restore its local anchor into the reading band: ${localizedAnchorTop}`);
  }
  // The selected language must also be present during the loading state, not
  // only after the localized Markdown fetch completes.
  const loadingLanguagePage = await context.newPage();
  await loadingLanguagePage.route('**/book/guides/llm-fundamentals-*.md', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.continue();
  });
  const readerHtmlLanguages = { en: 'en', zh: 'zh-CN', es: 'es', ja: 'ja', ko: 'ko', de: 'de', 'zh-tw': 'zh-TW' };
  for (const locale of Object.keys(readerHtmlLanguages)) {
    const suffix = locale === 'zh-tw' ? 'ZHTW' : locale.toUpperCase();
    const source = `book/guides/llm-fundamentals-${suffix}.md`;
    await loadingLanguagePage.goto(`${origin}/site/reader.html?path=${encodeURIComponent(source)}&lang=${locale}`, { waitUntil: 'domcontentloaded' });
    assert.equal(
      await loadingLanguagePage.locator('html').getAttribute('lang'),
      readerHtmlLanguages[locale],
      `${locale} Reader exposes the English language during its loading state`,
    );
  }
  await loadingLanguagePage.close();
  // The localized application guide is intentionally a starter-card subset.
  // Do not preserve an English-only detailed fragment when the local document
  // cannot satisfy it: link to the selected-language overview and say why.
  await page.goto(`${origin}/site/?lang=zh`, { waitUntil: 'networkidle' });
  const localizedLanguageBoundary = page.locator('#everyday-prompts [data-prompt-card]').first().getByRole('link', { name: /练习边界/ });
  assert.match(
    await localizedLanguageBoundary.getAttribute('href'),
    /communication-clinic-ZH\.md&lang=zh#language-practice-route$/,
    'localized language prompt boundary lost its available local anchor',
  );
  const localizedResearchBoundary = page.locator('#everyday-prompts [data-prompt-card]').nth(1).getByRole('link', { name: /研究边界/ });
  assert.match(
    await localizedResearchBoundary.getAttribute('href'),
    /communication-clinic-ZH\.md&lang=zh$/,
    'localized research prompt boundary retained a missing English-only fragment',
  );
  assert.equal(
    await localizedResearchBoundary.locator('[data-locale-anchor-note]').innerText(),
    '本地概览；该详细专题尚未完成翻译。',
    'localized research prompt boundary does not disclose its unavailable detailed section',
  );
  await page.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  // The home page must lead with outcomes, not internal development labels.
  // Evidence remains available in the dedicated status section and Reader.
  const localizedHeroSources = {
    en: /Hi, the workshop changed/, zh: /你好，工作坊改期了/, es: /El taller cambió/,
    ja: /ワークショップの予定が変わりました/, ko: /워크숍 일정이 바뀌었습니다/, de: /Der Workshop wurde verschoben/,
    'zh-tw': /嗨，工作坊改期了/,
  };
  const localizedHeroTitles = {
    en: 'Understand LLMs before you ask them to work.',
    zh: '先理解 LLM，再让它开始工作。',
    es: 'Entiende los LLM antes de pedirles que trabajen.',
    ja: 'LLMに仕事を頼む前に、その仕組みを理解する。',
    ko: 'LLM에게 일을 맡기기 전에 먼저 이해하세요.',
    de: 'Verstehe LLMs, bevor du sie arbeiten lässt.',
    'zh-tw': '先理解 LLM，再讓它開始工作。',
  };
  const localizedRouteContinuation = {
    en: 'Continue inside the core route',
    zh: '在核心路线中继续',
    es: 'Continúa dentro de la ruta principal',
    ja: '基礎コアルートの中で続ける',
    ko: '기초 코어 경로에서 계속하기',
    de: 'Im Kernpfad fortfahren',
    'zh-tw': '在核心路線中繼續',
  };
  const localizedVisualCardTitles = {
    en: ['Request to evidence', 'Beginner practice loop', 'Project evidence snapshot', 'From understanding to transfer'],
    zh: ['从请求到证据', '入门实践循环', '项目证据快照', '从理解到迁移'],
    es: ['De la solicitud a la evidencia', 'Bucle de práctica para principiantes', 'Panorama de evidencia del proyecto', 'De la comprensión a la transferencia'],
    ja: ['リクエストからエビデンスへ', '初心者練習ループ', 'プロジェクトのエビデンススナップショット', '理解から転移へ'],
    ko: ['요청에서 증거까지', '초보 연습 루프', '프로젝트 증거 스냅샷', '이해에서 전이까지'],
    de: ['Von der Anfrage zum Beleg', 'Anfänger-Übungsschleife', 'Evidenz-Schnappschuss des Projekts', 'Vom Verstehen zum Transfer'],
    'zh-tw': ['從請求到證據', '入門實踐循環', '專案證據快照', '從理解到遷移'],
  };
  const localizedFoundationLensTitles = {
    en: ['Generate', 'Frame', 'Extend', 'Coordinate', 'Check'],
    zh: ['生成', '定义', '扩展', '协作', '检查'],
    es: ['Generar', 'Enmarcar', 'Ampliar', 'Coordinar', 'Comprobar'],
    ja: ['生成', '枠組み', '拡張', '調整', '確認'],
    ko: ['생성', '구성', '확장', '조정', '점검'],
    de: ['Erzeugen', 'Rahmen', 'Erweitern', 'Koordinieren', 'Prüfen'],
    'zh-tw': ['生成', '定義', '擴展', '協作', '檢查'],
  };
  const localizedFoundationConceptTitles = {
    en: ['Token', 'Context', 'Context window', 'Prompt', 'Response', 'Tool / Agent'],
    zh: ['Token', '上下文', '上下文窗口', '提示词', '回答', '工具 / Agent'],
    es: ['Token', 'Contexto', 'Ventana de contexto', 'Prompt', 'Respuesta', 'Herramienta / agente'],
    ja: ['トークン', 'コンテキスト', 'コンテキストウィンドウ', 'プロンプト', '回答', 'ツール / Agent'],
    ko: ['토큰', '컨텍스트', '컨텍스트 윈도우', '프롬프트', '응답', '도구 / Agent'],
    de: ['Token', 'Kontext', 'Kontextfenster', 'Prompt', 'Antwort', 'Tool / Agent'],
    'zh-tw': ['Token', '上下文', '上下文窗口', '提示詞', '回答', '工具 / Agent'],
  };
  const localizedFoundationVisuals = {
    en: {
      heading: 'Five foundation boards, one loop.',
      titles: ['The smallest safe LLM loop', 'Prompt contract: six fields', 'Observable action boundary', 'Evidence recovery ladder', 'Source check before belief'],
      bodies: ['Define, supply context, request, check, then repair, transfer, or stop.', 'Result, context, allowed help, limits, check, and stop.', 'Proposal, authority, execution, and human read-back.', 'Match claim strength to the next smallest check.', 'Match claim, source, scope, and freshness before relying on it.'],
      boundary: /Project-authored English boards/i,
    },
    zh: {
      heading: '五张基础图，串起一个闭环。',
      titles: ['最小安全 LLM 闭环', '提示词契约：六个字段', '可观察的行动边界', '证据恢复阶梯', '相信前先检查来源'],
      bodies: ['定义、提供上下文、提出请求、检查，然后修正、迁移或停止。', '结果、上下文、允许的帮助、限制、回答与检查、停止条件。', '提议、授权、执行和人工核对。', '让声明的强度匹配下一个最小检查。', '依赖信息前，对照声明、来源、范围和时效性。'],
      boundary: /项目原创英文图表/,
    },
    es: {
      heading: 'Cinco tablas, un solo bucle de fundamentos.',
      titles: ['El bucle LLM seguro más pequeño', 'Contrato de prompt: seis campos', 'Límite de acción observable', 'Escalera de recuperación de evidencia', 'Comprobar la fuente antes de creer'],
      bodies: ['Define, aporta contexto, pide, comprueba y después repara, transfiere o detén.', 'Resultado, contexto, ayuda permitida, límites, comprobación y parada.', 'Propuesta, autoridad, ejecución y lectura humana del resultado.', 'Ajusta la fuerza de la afirmación a la siguiente comprobación mínima.', 'Compara afirmación, fuente, alcance y vigencia antes de confiar.'],
      boundary: /Tablas originales del proyecto en inglés/,
    },
    ja: {
      heading: '5つの基礎ボード、1つのループ。',
      titles: ['最小の安全なLLMループ', 'プロンプト契約：6つの項目', '観測可能な操作境界', 'エビデンス回復ラダー', '信じる前に出典を確認'],
      bodies: ['定義、コンテキスト提供、依頼、確認、その後に修正、転移、または停止。', '結果、コンテキスト、許可された支援、制約、確認、停止。', '提案、権限、実行、人による読み戻し。', '主張の強さを、次に行う最小の確認に合わせます。', '頼る前に、主張、出典、範囲、鮮度を照合します。'],
      boundary: /プロジェクト作成の英語図/,
    },
    ko: {
      heading: '다섯 기초 보드, 하나의 루프.',
      titles: ['가장 작은 안전한 LLM 루프', '프롬프트 계약: 여섯 필드', '관찰 가능한 행동 경계', '증거 복구 사다리', '믿기 전에 출처 점검'],
      bodies: ['정의하고, 맥락을 제공하고, 요청하고, 점검한 다음 수정·전이하거나 멈춥니다.', '결과, 컨텍스트, 허용된 도움, 제한, 응답과 점검, 중지.', '제안, 권한, 실행, 사람의 결과 확인.', '주장의 강도를 다음 최소 점검에 맞추세요.', '의존하기 전에 주장, 출처, 범위, 최신성을 맞춰 보세요.'],
      boundary: /프로젝트가 만든 영어 보드/,
    },
    de: {
      heading: 'Fünf Grundtafeln, ein Ablauf.',
      titles: ['Der kleinste sichere LLM-Ablauf', 'Prompt-Vertrag: sechs Felder', 'Beobachtbare Handlungsgrenze', 'Evidenz-Wiederherstellungsleiter', 'Quelle prüfen, bevor du vertraust'],
      bodies: ['Definieren, Kontext liefern, anfragen, prüfen und dann reparieren, übertragen oder stoppen.', 'Ergebnis, Kontext, erlaubte Hilfe, Grenzen, Prüfung und Stopp.', 'Vorschlag, Autorität, Ausführung und menschliche Rücklese.', 'Passe die Stärke der Aussage an die nächste kleinste Prüfung an.', 'Gleiche Aussage, Quelle, Umfang und Aktualität ab, bevor du dich darauf verlässt.'],
      boundary: /Projekt-eigene englische Tafeln/,
    },
    'zh-tw': {
      heading: '五張基礎圖，串起一個閉環。',
      titles: ['最小安全 LLM 閉環', '提示詞契約：六個欄位', '可觀察的行動邊界', '證據恢復階梯', '相信前先檢查來源'],
      bodies: ['定義、提供脈絡、提出請求、檢查，然後修正、遷移或停止。', '結果、起始脈絡、允許的協助、限制、回答與檢查、停止條件。', '提議、授權、執行與人工讀回。', '讓聲明的強度對應下一個最小檢查。', '依賴資訊前，對照聲明、來源、範圍與時效性。'],
      boundary: /專案原創英文圖表/,
    },
  };
  const localizedMobileIndexDetails = {
    en: 'Open the detailed map',
    zh: '打开详细地图',
    es: 'Abrir el mapa detallado',
    ja: '詳細な地図を開く',
    ko: '상세 지도 열기',
    de: 'Detaillierte Karte öffnen',
    'zh-tw': '開啟詳細地圖',
  };
  for (const locale of ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw']) {
    await page.goto(`${origin}/site/?lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-current-language]').waitFor();
    const expectedLanguageToken = locale === 'zh-tw' ? 'ZHTW' : locale.toUpperCase();
    await page.waitForFunction((expectedLocale) => document.querySelector('[data-current-language]')?.textContent?.trim() === expectedLocale, expectedLanguageToken);
    assert.equal(
      (await page.locator('#hero-title').innerText()).trim(),
      localizedHeroTitles[locale],
      `${locale} home page leaks a different-language hero instead of its selected locale`,
    );
    assert.match(
      await page.locator('.hero-proof-source blockquote').innerText(),
      localizedHeroSources[locale],
      `${locale} home page leaks a different-language prompt example instead of its selected locale`,
    );
    assert.equal(
      (await page.locator('.hero-route-continuation-label').textContent()).trim(),
      localizedRouteContinuation[locale],
      `${locale} foundation route continuation leaks a different-language label`,
    );
    assert.equal(
      await page.locator('.problem-grid .card-link').evaluateAll((links) => links.some((link) => /candidate|draft|not_run/i.test(link.textContent || ''))),
      false,
      `${locale} home-page action links expose internal development labels instead of the next action`,
    );
    assert.equal(
      await page.locator('[data-current-language]').innerText(), expectedLanguageToken,
      `${locale} interface does not retain the selected language route`,
    );
    assert.equal(
      await page.locator('[data-language-option] [data-language-fallback]').evaluateAll((labels) => labels.some((label) => /fallback/i.test(label.textContent || ''))),
      false,
      `${locale} language menu still claims an ordinary English UI fallback`,
    );
    const visualCards = page.locator('#visual-cases .visual-case-card');
    assert.equal(await visualCards.count(), 4, `${locale} project index does not expose all four teaching boards`);
    assert.deepEqual(
      await visualCards.locator('strong').allTextContents(),
      localizedVisualCardTitles[locale],
      `${locale} project index teaching-board titles are not fully localized`,
    );
    const visualHrefs = await visualCards.evaluateAll((cards) => cards.map((card) => card.getAttribute('href')));
    assert.ok(visualHrefs.some((href) => /project-evidence-snapshot-red-black\.svg$/.test(href || '')), `${locale} project index lost the evidence snapshot board`);
    assert.ok(visualHrefs.some((href) => /understanding-to-transfer-red-black\.svg$/.test(href || '')), `${locale} project index lost the transfer board`);
    assert.deepEqual(
      await page.locator('.foundation-map-layer strong').allTextContents(),
      localizedFoundationLensTitles[locale],
      `${locale} foundation concept map is not fully localized`,
    );
    assert.equal(await page.locator('#foundation-lens .foundation-map-layer').count(), 5, `${locale} foundation concept map lost a layer`);
    assert.equal(await page.locator('.foundation-concept-card').count(), 6, `${locale} six-term concept map lost a term`);
    assert.deepEqual(
      await page.locator('.foundation-concept-card strong').allTextContents(),
      localizedFoundationConceptTitles[locale],
      `${locale} six-term concept map is not fully localized`,
    );
    const foundationVisuals = page.locator('#foundation-visuals');
    assert.equal(await foundationVisuals.count(), 1, `${locale} foundation teaching visual section is missing`);
    assert.equal(await foundationVisuals.locator('.foundation-visual-card').count(), 5, `${locale} foundation teaching visual section lost a board`);
    assert.equal(await foundationVisuals.locator('h3').innerText(), localizedFoundationVisuals[locale].heading, `${locale} foundation visual heading is not localized`);
    assert.deepEqual(
      await foundationVisuals.locator('.foundation-visual-card strong').allTextContents(),
      localizedFoundationVisuals[locale].titles,
      `${locale} foundation visual titles are not fully localized`,
    );
    assert.deepEqual(
      await foundationVisuals.locator('.foundation-visual-card small').allTextContents(),
      localizedFoundationVisuals[locale].bodies,
      `${locale} foundation visual descriptions are not fully localized`,
    );
    assert.match(await foundationVisuals.locator('.foundation-visual-boundary').innerText(), localizedFoundationVisuals[locale].boundary, `${locale} foundation visual provenance boundary is not localized`);
    assert.deepEqual(
      await foundationVisuals.locator('img').evaluateAll((images) => images.map((image) => image.getAttribute('src'))),
      [
        '../assets/teaching/foundation-route-map-red-black.svg',
        '../assets/teaching/prompt-contract-six-fields-red-black.svg',
        '../assets/teaching/observable-action-boundary-red-black.svg',
        '../assets/teaching/evidence-recovery-ladder.svg',
        '../assets/teaching/source-check-before-belief-red-black.svg',
      ],
      `${locale} foundation visual assets changed unexpectedly`,
    );
    assert.deepEqual(
      await foundationVisuals.locator('img').evaluateAll((images) => images.map((image) => image.getAttribute('alt'))),
      {
        en: ['Smallest safe LLM loop teaching board', 'Six-field prompt contract teaching board', 'Observable action boundary teaching board', 'Evidence recovery ladder teaching board', 'Source check before belief teaching board'],
        zh: ['最小安全 LLM 闭环教学图', '六字段提示词契约教学图', '可观察行动边界教学图', '证据恢复阶梯教学图', '相信前先检查来源教学图'],
        es: ['Tabla didáctica del bucle LLM seguro más pequeño', 'Tabla didáctica del contrato de prompt de seis campos', 'Tabla didáctica del límite de acción observable', 'Tabla didáctica de la escalera de recuperación de evidencia', 'Tabla didáctica de comprobar la fuente antes de creer'],
        ja: ['最小の安全なLLMループを示す教材図', '6項目のプロンプト契約を示す教材図', '観測可能な操作境界を示す教材図', 'エビデンス回復ラダーを示す教材図', '信じる前の出典確認を示す教材図'],
        ko: ['가장 작은 안전한 LLM 루프 교육 보드', '여섯 필드 프롬프트 계약 교육 보드', '관찰 가능한 행동 경계 교육 보드', '증거 복구 사다리 교육 보드', '믿기 전 출처 점검 교육 보드'],
        de: ['Lehrtafel zum kleinsten sicheren LLM-Ablauf', 'Lehrtafel für einen Prompt-Vertrag mit sechs Feldern', 'Lehrtafel für eine beobachtbare Handlungsgrenze', 'Lehrtafel zur Evidenz-Wiederherstellungsleiter', 'Lehrtafel zur Quellenprüfung vor dem Vertrauen'],
        'zh-tw': ['最小安全 LLM 閉環教學圖', '六欄位提示詞契約教學圖', '可觀察行動邊界教學圖', '證據恢復階梯教學圖', '相信前先檢查來源教學圖'],
      }[locale],
      `${locale} foundation visual alt text is not localized`,
    );
    await foundationVisuals.scrollIntoViewIfNeeded();
    await foundationVisuals.locator('img').first().waitFor();
    await page.waitForTimeout(50);
    assert.equal(
      (await foundationVisuals.locator('img').evaluateAll((images) => images.map((image) => ({ complete: image.complete, width: image.naturalWidth })))).every((image) => image.complete && image.width > 0),
      true,
      `${locale} foundation teaching SVG did not load in the browser`,
    );
    assert.match(
      await page.locator('.foundation-concept-head .text-link').innerText(),
      { en: /Open the complete English visual/i, zh: /打开完整英文图表/, es: /visual completo en inglés/i, ja: /英語の全体図/, ko: /전체 영어 도표/, de: /vollständige englische Grafik/i, 'zh-tw': /完整英文圖表/ }[locale],
      `${locale} concept map visual link is not localized`,
    );
    assert.equal(
      await page.locator('.mobile-project-details > summary').innerText(),
      localizedMobileIndexDetails[locale],
      `${locale} mobile project map disclosure is not localized`,
    );
    assert.equal(await page.locator('#protocol .protocol-rule li').count(), 4, `${locale} protocol boundary chart lost a step`);
    assert.equal(
      await page.locator('#protocol .protocol-rule').getAttribute('aria-label'),
      {
        en: 'Four questions for a bounded task',
        zh: '有边界任务的四个问题',
        es: 'Cuatro preguntas para una tarea acotada',
        ja: '境界付きタスクの4つの問い',
        ko: '범위가 정해진 작업을 위한 네 가지 질문',
        de: 'Vier Fragen für eine begrenzte Aufgabe',
        'zh-tw': '有邊界任務的四個問題',
      }[locale],
      `${locale} protocol boundary chart is not localized`,
    );
    if (locale === 'zh-tw') {
      const visibleText = await page.locator('body').innerText();
      assert.doesNotMatch(visibleText, /跳到主要内容|基础系统|搜索|学习路径/, 'Traditional Chinese home page exposes high-confidence Simplified Chinese UI text');
      assert.match(visibleText, /跳到主要內容|基礎系統|搜尋|學習路徑/, 'Traditional Chinese home page does not expose its localized UI vocabulary');
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/site/?lang=zh`, { waitUntil: 'networkidle' });
  await noHorizontalOverflow(page, 'mobile localized six-term concept map');
  assert.equal(await page.locator('.foundation-concept-card').count(), 6, 'mobile six-term concept map is not discoverable');
  assert.equal(await page.locator('#foundation-visuals .foundation-visual-card').count(), 5, 'mobile foundation visual section is not discoverable');
  await page.locator('#foundation-visuals').scrollIntoViewIfNeeded();
  await page.locator('#foundation-visuals').screenshot({ path: path.join(visualEvidenceDirectory, 'foundation-visuals-mobile.png') });
  await noHorizontalOverflow(page, 'mobile foundation teaching visuals');
  const mobileProjectDetails = page.locator('.mobile-project-details');
  assert.equal(await mobileProjectDetails.isVisible(), true, 'mobile project map disclosure is not visible');
  assert.equal(await mobileProjectDetails.locator('nav').getAttribute('aria-label'), '详细项目地图', 'mobile project map disclosure aria label is not localized');
  assert.match(
    await mobileProjectDetails.locator('a[data-content-id="project-readme"]').getAttribute('href'),
    /reader\.html\?path=README-ZH\.md&lang=zh$/,
    'mobile project map canonical reading link does not stay on the selected Chinese route',
  );
  assert.match(
    await page.locator('.mobile-index-rail a[data-content-id="book-table-of-contents"]').getAttribute('href'),
    /reader\.html\?path=book%2Ftable-of-contents-ZH\.md&lang=zh$/,
    'mobile chapter index does not stay on the selected Chinese route',
  );
  assert.match(
    await page.locator('.mobile-index-rail a[data-content-id="book-labs-readme"]').getAttribute('href'),
    /reader\.html\?path=book%2Flabs%2FREADME-ZH\.md&lang=zh$/,
    'mobile lab index does not stay on the selected Chinese route',
  );
  assert.match(
    await page.locator('.mobile-index-rail a[data-content-id="field-problems-index-2026-08-10"]').getAttribute('href'),
    /reader\.html\?path=docs%2Fresearch%2Ffield-problems-index-2026-08-10\.md&lang=zh$/,
    'mobile field-case index does not retain the selected Chinese locale',
  );
  await mobileProjectDetails.locator('summary').click();
  assert.equal(await mobileProjectDetails.locator('a').count(), 3, 'mobile project map disclosure lost a source route');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#start').evaluate((section) => section.previousElementSibling?.id), 'top', 'the useful result is not immediately after the hero');
  assert.equal(await page.locator('#first-30').evaluate((section) => section.previousElementSibling?.id), 'start', 'optional first practice is not placed after the useful result');
  assert.equal(await page.locator('#foundation-lens').evaluate((section) => section.previousElementSibling?.id), 'first-30', 'foundation lens is not placed after the optional first practice');
  assert.equal(await page.locator('#project-map').evaluate((section) => section.previousElementSibling?.id), 'foundation-lens', 'project catalogue is not placed after the foundation map');
  assert.equal(await page.locator('#protocol').evaluate((section) => section.previousElementSibling?.id), 'project-map', 'protocol frame is not placed after the project catalogue');
  assert.deepEqual(await page.locator('#protocol .protocol-rule strong').allTextContents(), ['Define', 'Act', 'Verify', 'Hand off'], 'protocol boundary chart is not in action order');
  await page.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('[data-current-language]')?.textContent?.trim() === 'EN');
  const skillsSection = page.locator('#skills');
  const desktopSkillCatalog = skillsSection.locator('.skill-catalog');
  assert.equal(await desktopSkillCatalog.getAttribute('open'), null, 'desktop Skill registry is expanded before a reader asks for it');
  await desktopSkillCatalog.locator('summary').click();
  assert.equal(await desktopSkillCatalog.getAttribute('open'), '', 'desktop Skill registry does not open from its summary');
  const adversarialReviewLink = skillsSection.getByRole('link', { name: 'Adversarial Project Review' });
  await adversarialReviewLink.waitFor();
  const comparisonProtocolLink = skillsSection.getByRole('link', { name: 'LLM Comparison Protocol' });
  await comparisonProtocolLink.waitFor();
  const practiceTargetSkillLink = skillsSection.getByRole('link', { name: 'Practice Target' });
  await practiceTargetSkillLink.waitFor();
  const interruptionCheckpointLink = skillsSection.getByRole('link', { name: 'Interruption Checkpoint' });
  await interruptionCheckpointLink.waitFor();
  assert.equal(await skillsSection.locator('.skill-grid > a').count(), governedSkillCount, `Skill index does not expose the governed inventory of ${governedSkillCount} methods`);
  assert.match(
    await adversarialReviewLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-adversarial-project-review%2FSKILL\.md&lang=en$/,
    'Adversarial Project Review does not resolve through the canonical English Reader route',
  );
  const requestEscalationLink = skillsSection.locator('.skill-grid a').filter({ hasText: 'Request Escalation' });
  assert.match(
    await requestEscalationLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-request-escalation%2FSKILL\.md&lang=en$/,
    'Request Escalation does not resolve through the canonical English Reader route',
  );
  assert.match(
    await comparisonProtocolLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-llm-comparison-protocol%2FSKILL\.md&lang=en$/,
    'LLM Comparison Protocol does not resolve through the canonical English Reader route',
  );
  assert.match(
    await practiceTargetSkillLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-practice-target%2FSKILL\.md&lang=en$/,
    'Practice Target does not resolve through the canonical English Reader route',
  );
  assert.match(
    await interruptionCheckpointLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-interruption-checkpoint%2FSKILL\.md&lang=en$/,
    'Interruption Checkpoint does not resolve through the canonical English Reader route',
  );
  const factWatchLink = skillsSection.getByRole('link', { name: 'Platform Fact Watch' });
  await factWatchLink.waitFor();
  assert.match(
    await factWatchLink.getAttribute('href'),
    /reader\.html\?path=skills%2Fprysai-platform-fact-watch%2FSKILL\.md&lang=en$/,
    'Platform Fact Watch does not resolve through the canonical English Reader route',
  );
  assert.equal(
    await skillsSection.locator('.skill-starter-grid a').filter({ hasText: 'I am not sure what kind of help I need yet.' }).isVisible(),
    true,
    'Skill starter does not expose Request Escalation to an unsure beginner',
  );
  assert.match(
    await skillsSection.locator('.skill-footnote').innerText(),
    /not an external review/i,
    'Skill index does not retain the new review method\'s evidence boundary',
  );
  assert.match(
    await skillsSection.locator('.skill-footnote').innerText(),
    /unrun comparison method, not a model ranking/i,
    'Skill index does not retain the LLM comparison evidence boundary',
  );
  assert.match(
    await skillsSection.locator('.skill-footnote').innerText(),
    /maintenance (?:receipt|check record), not a current-platform check/i,
    'Skill index does not retain the platform-fact maintenance boundary',
  );
  assert.match(
    await skillsSection.locator('.skill-footnote').innerText(),
    /sets up one first attempt; it does not prove learning/i,
    'Skill index does not retain the Practice Target evidence boundary',
  );
  assert.match(
    await skillsSection.locator('.skill-footnote').innerText(),
    /preserves a task (?:receipt|check record); it does not retry or recover work/i,
    'Skill index does not retain the Interruption Checkpoint evidence boundary',
  );
  await skillsSection.screenshot({ path: path.join(visualEvidenceDirectory, 'skills-desktop.png') });
  await page.locator('a[href="#skills"]').first().click();
  await page.waitForFunction(() => window.location.hash === '#skills');
  await page.waitForTimeout(350);
  const skillsAnchorMetrics = await page.evaluate(() => {
    const section = document.querySelector('#skills');
    const header = document.querySelector('.site-header');
    return {
      sectionTop: section?.getBoundingClientRect().top,
      headerBottom: header?.getBoundingClientRect().bottom,
    };
  });
  assert.ok(
    Number(skillsAnchorMetrics.sectionTop) >= Number(skillsAnchorMetrics.headerBottom) - 1,
    `Skill index anchor is hidden by the sticky header: ${JSON.stringify(skillsAnchorMetrics)}`,
  );
  const everydayPromptDeck = page.locator('#everyday-prompts');
  await everydayPromptDeck.waitFor();
  await everydayPromptDeck.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const promptDeckAnchorMetrics = await page.evaluate(() => {
    const deck = document.querySelector('#everyday-prompts');
    const header = document.querySelector('.site-header');
    return {
      deckTop: deck?.getBoundingClientRect().top,
      headerBottom: header?.getBoundingClientRect().bottom,
    };
  });
  assert.ok(
    Number(promptDeckAnchorMetrics.deckTop) < Number(promptDeckAnchorMetrics.headerBottom) + 900,
    `prompt-card deck is not reachable: ${JSON.stringify(promptDeckAnchorMetrics)}`,
  );
  await fs.mkdir(visualEvidenceDirectory, { recursive: true });
  await everydayPromptDeck.screenshot({ path: path.join(visualEvidenceDirectory, 'everyday-prompt-cards-desktop.png') });
  assert.equal(await everydayPromptDeck.getByRole('heading', { name: 'Start with one small conversation.' }).isVisible(), true, 'everyday prompt-card entry is missing');
  const everydayPromptButtons = everydayPromptDeck.getByRole('button', { name: 'Copy prompt' });
  assert.equal(await everydayPromptButtons.count(), 3, 'everyday prompt deck does not expose three copy controls');
  const spanishPromptDetails = everydayPromptDeck.locator('[data-prompt-card]').first().locator('details');
  assert.equal(await spanishPromptDetails.getAttribute('open'), null, 'Spanish prompt should begin compact');
  await spanishPromptDetails.locator('summary').click();
  assert.match(
    await spanishPromptDetails.locator('[data-everyday-prompt]').innerText(),
    /typed Spanish study-group time check[\s\S]*do not call one successful exchange fluency, spoken conversation, or listening\/pronunciation evidence/i,
    'Spanish prompt card omits its text-only or spoken-language boundary',
  );
  assert.equal(await everydayPromptDeck.locator('.everyday-prompt-steps').count(), 3, 'everyday prompt cards do not expose their three-step use instructions');
  assert.match(await everydayPromptDeck.locator('.everyday-prompt-steps').first().innerText(), /Copy the card exactly as written[\s\S]*fictional typed Spanish study-group time check/i, 'Spanish card does not provide a no-setup first action');
  const researchPromptDetails = everydayPromptDeck.locator('[data-prompt-card]').nth(1).locator('details');
  assert.equal(await researchPromptDetails.getAttribute('open'), null, 'research prompt should begin compact');
  await researchPromptDetails.locator('summary').click();
  assert.match(
    await researchPromptDetails.locator('[data-everyday-prompt]').innerText(),
    /Do not invent citations|give a recommendation/i,
    'research prompt card omits its source and recommendation boundary',
  );
  const skillPracticeCard = everydayPromptDeck.locator('.everyday-prompt-card-skill');
  assert.equal(await skillPracticeCard.count(), 1, 'fictional skill-practice card is missing');
  const skillPracticeBoundaryLink = skillPracticeCard.getByRole('link', { name: 'Read the skill-practice boundary' });
  assert.match(
    await skillPracticeBoundaryLink.getAttribute('href'),
    /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#general-skill-practice-route$/,
    'skill-practice card does not target its authored Reader fragment',
  );
  assert.match(
    await skillPracticeCard.locator('[data-everyday-prompt]').textContent(),
    /Do not make the plan first[\s\S]*one consequential omission[\s\S]*change only the visit length/i,
    'skill-practice card omits its attempt-first, bounded-help, or changed-case boundary',
  );
  const skillPromptDetails = skillPracticeCard.locator('.compact-prompt-details');
  assert.equal(await skillPromptDetails.count(), 1, 'skill-practice prompt lacks progressive disclosure');
  assert.equal(await skillPromptDetails.getAttribute('open'), null, 'skill-practice prompt should remain collapsed at first view');
  const skillPracticeHref = await skillPracticeCard.getByRole('link', { name: /skill-practice boundary/i }).getAttribute('href');
  assert.match(skillPracticeHref, /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#general-skill-practice-route$/, 'skill-practice card does not target its explicit route anchor');
  await everydayPromptButtons.first().click();
  await everydayPromptDeck.locator('#spanish-prompt-status').getByText(/Prompt copied\. Follow the three steps/i).waitFor();
  await everydayPromptButtons.nth(2).click();
  await everydayPromptDeck.locator('#skill-prompt-status').getByText(/Prompt copied\. Follow the three steps/i).waitFor();
  assert.match(
    await page.locator('.hero-scope').innerText(),
    /One transferable foundation[\s\S]*platform-specific practice[\s\S]*current sources[\s\S]*runnable evidence/i,
    'hero overstates named-platform coverage or omits the adapter evidence boundary',
  );
  const lessonZeroLink = page.getByRole('link', { name: /LLM Foundation Core/i }).first();
  assert.match(
    await lessonZeroLink.getAttribute('href'),
    /reader\.html\?path=book%2Froutes%2Fllm-foundation-core-v1-EN\.md&lang=en$/,
    'LLM Foundation Core route does not open through the Reader',
  );
  const guidedRouteLink = page.getByRole('link', { name: /Unit 1: what an LLM is/i });
  assert.match(
    await guidedRouteLink.getAttribute('href'),
    /reader\.html\?path=book%2Fguides%2Fllm-fundamentals-EN\.md&lang=en$/,
    'LLM concept route card does not open the canonical foundation guide Reader route',
  );
  const fixtureRouteLink = page.getByRole('link', { name: /Unit 2: your first bounded request/i });
  assert.match(
    await fixtureRouteLink.getAttribute('href'),
    /reader\.html\?path=book%2Froutes%2Fllm-core-first-generation-EN\.md&lang=en$/,
    'first bounded-request route card does not open the canonical Reader route',
  );
  assert.match(
    await page.locator('[data-route-decision]').innerText(),
    /finish all five units before entering codex/i,
    'foundation route card does not state its platform boundary',
  );
  const firstTurnLink = page.getByRole('link', { name: 'Draft a universal first turn' });
  await assert.doesNotReject(async () => firstTurnLink.waitFor(), 'universal first-turn research entry is missing from the showcase');
  assert.match(
    await firstTurnLink.getAttribute('href'),
    /reader\.html\?path=docs%2Fresearch%2Funiversal-first-turn-prompt-contract-2026-08-13\.md/,
    'universal first-turn research entry does not resolve through the bounded reader',
  );
  const firstTurnPage = await context.newPage();
  const firstTurnHref = await firstTurnLink.getAttribute('href');
  await firstTurnPage.goto(new URL(firstTurnHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await firstTurnPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await firstTurnPage.locator('[data-reader-article] h1').innerText(), /universal first-turn prompt contract/i, 'Reader did not render the universal first-turn research record');
  assert.equal(await firstTurnPage.getByRole('heading', { name: /before sending: inspect, do not certify/i }).isVisible(), true, 'First-turn record omits its before-send inspection boundary');
  const firstTurnVisual = firstTurnPage.locator('img[alt*="Make the boundary visible"]');
  assert.match(await firstTurnVisual.getAttribute('src'), /assets\/teaching\/first-turn-contract-card\.svg$/, 'First-turn record does not retain its original teaching visual');
  const firstTurnVisualLink = firstTurnPage.locator('.reader-image-link').filter({ has: firstTurnVisual });
  assert.equal(await firstTurnVisualLink.getAttribute('target'), '_blank', 'First-turn visual does not offer a full-size reading route');
  assert.match(await firstTurnVisualLink.locator('.reader-visual-thesis').innerText(), /make the boundary visible/i, 'First-turn visual lacks a mobile-readable thesis');
  await firstTurnPage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await firstTurnVisual.isVisible(), false, 'Mobile Reader shrinks the dense first-turn teaching board instead of offering a full-size route');
  assert.equal(await firstTurnPage.getByRole('link', { name: /open full-size visual: make the boundary visible/i }).isVisible(), true, 'First-turn visual lacks an accessible mobile full-size route');
  await noHorizontalOverflow(firstTurnPage, 'mobile universal first-turn record');
  await firstTurnPage.close();

  const verificationStabilityPage = await context.newPage();
  await verificationStabilityPage.setViewportSize({ width: 390, height: 844 });
  await verificationStabilityPage.goto(`${origin}/site/reader.html?path=docs%2Fquality%2Fverification-stability-2026-08-15.md&lang=en`, { waitUntil: 'networkidle' });
  await verificationStabilityPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await verificationStabilityPage.locator('[data-reader-article] h1').innerText(), /five repeated local verification runs/i, 'Reader did not render the verification-stability record');
  const verificationStabilityVisual = verificationStabilityPage.locator('img[alt*="Median duration for five repeated local verification runs"]');
  assert.match(await verificationStabilityVisual.getAttribute('src'), /docs\/quality\/verification-stability-2026-08-15\.svg$/, 'Verification-stability record does not retain its original chart');
  const verificationStabilityVisualLink = verificationStabilityPage.locator('.reader-image-link').filter({ has: verificationStabilityVisual });
  assert.match(await verificationStabilityVisualLink.locator('.reader-visual-thesis').innerText(), /median duration for five repeated local verification runs/i, 'Verification-stability chart lacks a mobile-readable thesis');
  assert.equal(await verificationStabilityVisual.isVisible(), false, 'Mobile Reader shrinks the dense verification-stability chart instead of offering a full-size route');
  assert.equal(await verificationStabilityPage.getByRole('link', { name: /open full-size visual: median duration for five repeated local verification runs/i }).isVisible(), true, 'Verification-stability chart lacks an accessible mobile full-size route');
  assert.match(await verificationStabilityPage.locator('[data-reader-article]').innerText(), /use the table below for the exact values/i, 'Verification-stability record does not direct mobile readers to the exact-value table');
  await noHorizontalOverflow(verificationStabilityPage, 'mobile verification-stability record');
  await verificationStabilityVisualLink.screenshot({ path: path.join(visualEvidenceDirectory, 'verification-stability-mobile-visual-route.png') });
  await verificationStabilityPage.screenshot({ path: path.join(visualEvidenceDirectory, 'verification-stability-mobile.png') });
  await verificationStabilityPage.close();

  const requestEscalationPage = await context.newPage();
  await requestEscalationPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#request-escalation`, { waitUntil: 'networkidle' });
  await requestEscalationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await requestEscalationPage.locator('[data-reader-article] h1').innerText(), /optional application practice: language, work, and research/i, 'Reader did not render the optional application practice guide for request escalation');
  const requestEscalationHeading = requestEscalationPage.getByRole('heading', { name: /choose the lane/i });
  assert.equal(await requestEscalationHeading.isVisible(), true, 'Request escalation card is not discoverable in Reader');
  assert.equal(await requestEscalationPage.locator('#request-escalation').count(), 1, 'Reader did not preserve the request-escalation fragment target');
  const requestEscalationPosition = await requestEscalationPage.locator('#request-escalation').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(requestEscalationPosition >= 0 && requestEscalationPosition < 260, `Reader did not restore the request-escalation fragment into the first visible reading band: ${requestEscalationPosition}`);
  const requestEscalationSkill = requestEscalationPage.getByRole('link', { name: /request escalation skill/i });
  assert.match(await requestEscalationSkill.getAttribute('href'), /reader\.html\?path=skills%2Fprysai-request-escalation%2FSKILL\.md&lang=en$/, 'Request Escalation card does not open the canonical Skill Reader route');
  const requestEscalationResearch = requestEscalationPage.getByRole('link', { name: /source-and-action escalation record/i });
  assert.match(await requestEscalationResearch.getAttribute('href'), /reader\.html\?path=docs%2Fresearch%2Fprompt-escalation-boundary-source-and-action-2026-08-14\.md&lang=en$/, 'Request escalation card does not expose its dated source boundary');
  assert.match(await requestEscalationPage.locator('[data-reader-article]').innerText(), /candidate\s*\/\s*not_run/i, 'Request escalation card omits its candidate and not-run boundary');
  await noHorizontalOverflow(requestEscalationPage, 'desktop request escalation card');
  await requestEscalationPage.screenshot({ path: path.join(visualEvidenceDirectory, 'request-escalation-desktop.png') });
  await requestEscalationPage.setViewportSize({ width: 390, height: 844 });
  await requestEscalationPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#request-escalation`, { waitUntil: 'networkidle' });
  await requestEscalationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const mobileRequestEscalationHeadingTop = await requestEscalationHeading.evaluate((heading) => heading.getBoundingClientRect().top);
  assert.ok(mobileRequestEscalationHeadingTop >= 0 && mobileRequestEscalationHeadingTop < 260, `Mobile Reader did not restore the request-escalation heading into the first visible reading band: ${mobileRequestEscalationHeadingTop}`);
  await noHorizontalOverflow(requestEscalationPage, 'mobile request escalation card');
  await requestEscalationPage.screenshot({ path: path.join(visualEvidenceDirectory, 'request-escalation-mobile.png') });
  await requestEscalationPage.close();

  const sourceCheckPage = await context.newPage();
  await sourceCheckPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#source-check-route`, { waitUntil: 'networkidle' });
  await sourceCheckPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const sourceCheckHeading = sourceCheckPage.getByRole('heading', { name: /advanced — source check when an answer looks cited/i });
  assert.equal(await sourceCheckHeading.isVisible(), true, 'Source-record check is not discoverable in Reader');
  assert.equal(await sourceCheckPage.locator('#source-check-route').count(), 1, 'Reader did not preserve the source-check fragment target');
  const sourceCheckPosition = await sourceCheckPage.locator('#source-check-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(sourceCheckPosition >= 0 && sourceCheckPosition < 260, `Reader did not restore the source-check fragment into the first visible reading band: ${sourceCheckPosition}`);
  assert.match(await sourceCheckPage.locator('[data-reader-article]').innerText(), /unverified — source record missing/i, 'Source-record check omits its missing-evidence status');
  const sourceCheckResearch = sourceCheckPage.getByRole('link', { name: /source-shaped-answer research record/i });
  assert.match(
    await sourceCheckResearch.getAttribute('href'),
    /reader\.html\?path=docs%2Fresearch%2Fsource-shaped-answers-and-beginner-checks-2026-08-14\.md&lang=en$/,
    'Source-record check does not expose its dated research boundary',
  );
  const sourceCheckVisual = sourceCheckPage.locator('img[alt*="citation is a pointer"]');
  assert.match(await sourceCheckVisual.getAttribute('src'), /assets\/teaching\/source-check-before-belief-red-black\.svg$/, 'Source-record check does not retain its original teaching visual');
  await noHorizontalOverflow(sourceCheckPage, 'desktop source-record check');
  await sourceCheckPage.screenshot({ path: path.join(visualEvidenceDirectory, 'source-record-check-desktop.png') });
  await sourceCheckPage.setViewportSize({ width: 390, height: 844 });
  await sourceCheckPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#source-check-route`, { waitUntil: 'networkidle' });
  await sourceCheckPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const mobileSourceCheckHeadingTop = await sourceCheckHeading.evaluate((heading) => heading.getBoundingClientRect().top);
  assert.ok(mobileSourceCheckHeadingTop >= 0 && mobileSourceCheckHeadingTop < 260, `Mobile Reader did not restore the source-check heading into the first visible reading band: ${mobileSourceCheckHeadingTop}`);
  assert.equal(await sourceCheckVisual.isVisible(), false, 'Mobile Reader shrinks the dense source-record board instead of offering a full-size route');
  assert.equal(await sourceCheckPage.getByRole('link', { name: /open full-size visual: a citation is a pointer/i }).isVisible(), true, 'Source-record check lacks an accessible mobile full-size route');
  await noHorizontalOverflow(sourceCheckPage, 'mobile source-record check');
  await sourceCheckPage.screenshot({ path: path.join(visualEvidenceDirectory, 'source-record-check-mobile.png') });
  await sourceCheckPage.close();

  const directStarterCardPage = await context.newPage();
  await directStarterCardPage.setViewportSize({ width: 390, height: 844 });
  await directStarterCardPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#card-a1-study-group-baseline-and-correction`, { waitUntil: 'networkidle' });
  await directStarterCardPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const directStarterHeading = directStarterCardPage.getByRole('heading', { name: /card a1 — study-group baseline and correction/i });
  await directStarterHeading.waitFor();
  const directStarterTop = await directStarterHeading.evaluate((heading) => heading.getBoundingClientRect().top);
  assert.ok(directStarterTop >= 0 && directStarterTop < 260, `Beginner route A1 does not land on its copy-ready card: ${directStarterTop}`);
  const directStarterPrompt = directStarterCardPage.locator('pre').filter({ hasText: 'Run one four-minute' }).first();
  assert.match(await directStarterPrompt.innerText(), /Run one four-minute typed Spanish study-group time check/i, 'Beginner route A1 does not retain its first copy-ready prompt');
  assert.doesNotMatch(await directStarterPrompt.innerText(), /\*\*typed\*\*/, 'Beginner route A1 leaks Markdown markup into the copied prompt');
  await noHorizontalOverflow(directStarterCardPage, 'mobile direct beginner starter card');
  await directStarterCardPage.close();

  const practiceTargetPage = await context.newPage();
  await practiceTargetPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#practice-target-route`, { waitUntil: 'networkidle' });
  await practiceTargetPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const practiceTargetHeading = practiceTargetPage.getByRole('heading', { name: /make the first try small/i });
  assert.equal(await practiceTargetHeading.isVisible(), true, 'Practice Target route is not discoverable in Reader');
  assert.equal(await practiceTargetPage.locator('#practice-target-route').count(), 1, 'Reader did not preserve the practice-target fragment target');
  const practiceTargetPosition = await practiceTargetPage.locator('#practice-target-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(practiceTargetPosition >= 0 && practiceTargetPosition < 260, `Reader did not restore the Practice Target fragment into the first visible reading band: ${practiceTargetPosition}`);
  const practiceTargetSkill = practiceTargetHeading.locator('xpath=following::a[normalize-space()="Practice Target Skill"][1]');
  assert.match(await practiceTargetSkill.getAttribute('href'), /reader\.html\?path=skills%2Fprysai-practice-target%2FSKILL\.md&lang=en$/, 'Practice Target route does not open the canonical Skill Reader route');
  const practiceTargetVisual = practiceTargetPage.locator('img[alt*="learning wish becomes one ordinary situation"]');
  assert.match(await practiceTargetVisual.getAttribute('src'), /assets\/teaching\/practice-target-to-first-attempt-red-black\.svg$/, 'Practice Target route does not retain its original teaching visual');
  await noHorizontalOverflow(practiceTargetPage, 'desktop Practice Target route');
  await practiceTargetPage.screenshot({ path: path.join(visualEvidenceDirectory, 'practice-target-desktop.png') });
  await practiceTargetPage.setViewportSize({ width: 390, height: 844 });
  await practiceTargetPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#practice-target-route`, { waitUntil: 'networkidle' });
  await practiceTargetPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await practiceTargetVisual.isVisible(), false, 'Mobile Reader shrinks the dense Practice Target board instead of offering a full-size route');
  assert.equal(await practiceTargetPage.getByRole('link', { name: /open full-size visual: a learning wish becomes one ordinary situation/i }).isVisible(), true, 'Practice Target route lacks an accessible mobile full-size route');
  await noHorizontalOverflow(practiceTargetPage, 'mobile Practice Target route');
  await practiceTargetPage.screenshot({ path: path.join(visualEvidenceDirectory, 'practice-target-mobile.png') });
  await practiceTargetPage.close();

  const sixMessagePage = await context.newPage();
  await sixMessagePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-spanish-messages`, { waitUntil: 'networkidle' });
  await sixMessagePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const sixMessageHeading = sixMessagePage.getByRole('heading', { name: /six short messages for one Spanish practice loop/i });
  assert.equal(await sixMessageHeading.isVisible(), true, 'Six-message Spanish practice route is not discoverable in Reader');
  assert.match(await sixMessagePage.locator('[data-reader-article]').innerText(), /six separate copy-ready messages, not six magic prompts/i, 'Six-message route omits its no-magic-prompt boundary');
  assert.ok(await sixMessagePage.getByRole('link', { name: 'Spanish practice loop', exact: true }).count() >= 1, 'Six-message route does not expose its canonical loop');
  const spanishCanonicalPage = await context.newPage();
  await spanishCanonicalPage.goto(`${origin}/site/reader.html?path=book%2Fspanish-practice-loop-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await spanishCanonicalPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await spanishCanonicalPage.getByRole('heading', { name: /six messages for a small Spanish practice loop/i }).isVisible(), true, 'Canonical Spanish loop did not render');
  for (const message of ['Choose a target', 'Try first', 'Find one gap', 'Repair it', 'Change the scene', 'Check later']) {
    assert.equal(await spanishCanonicalPage.getByRole('heading', { name: new RegExp(`^\\d+\\. ${message}$`, 'i') }).isVisible(), true, `Canonical Spanish loop omits ${message}`);
  }
  await noHorizontalOverflow(spanishCanonicalPage, 'desktop canonical Spanish loop');
  await noHorizontalOverflow(sixMessagePage, 'desktop six-message Spanish practice route');
  await sixMessagePage.setViewportSize({ width: 390, height: 844 });
  await sixMessagePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-spanish-messages`, { waitUntil: 'networkidle' });
  await sixMessagePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  await noHorizontalOverflow(sixMessagePage, 'mobile six-message Spanish practice route');
  await sixMessagePage.screenshot({ path: path.join(visualEvidenceDirectory, 'six-message-spanish-mobile.png') });
  await sixMessagePage.close();
  await spanishCanonicalPage.close();

  const workUpdatePage = await context.newPage();
  await workUpdatePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-work-update-messages`, { waitUntil: 'networkidle' });
  await workUpdatePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const workUpdateHeading = workUpdatePage.getByRole('heading', { name: /six short messages for a work-update practice loop/i });
  assert.equal(await workUpdateHeading.isVisible(), true, 'Six-message work-update route is not discoverable in Reader');
  assert.equal(await workUpdatePage.locator('#six-short-work-update-messages').count(), 1, 'Reader did not preserve the six-message work-update fragment target');
  assert.match(await workUpdatePage.locator('[data-reader-article]').innerText(), /not a promise that an LLM can assess writing/i, 'Six-message work-update route omits its evidence boundary');
  assert.ok(await workUpdatePage.getByRole('link', { name: 'truthful work-update loop', exact: true }).count() >= 1, 'Six-message work-update route does not expose its canonical loop');
  const workCanonicalPage = await context.newPage();
  await workCanonicalPage.goto(`${origin}/site/reader.html?path=book%2Fwork-update-practice-loop-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await workCanonicalPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await workCanonicalPage.getByRole('heading', { name: /six messages for a truthful work-update practice loop/i }).isVisible(), true, 'Canonical work-update loop did not render');
  for (const message of ['Set the reader and the facts', 'Write before seeing a model version', 'Find one material gap', 'Revise in my own words', 'Change the audience', 'Leave a small receipt']) {
    assert.equal(await workCanonicalPage.getByRole('heading', { name: new RegExp(`^\\d+\\. ${message}$`, 'i') }).isVisible(), true, `Canonical work-update loop omits ${message}`);
  }
  await noHorizontalOverflow(workCanonicalPage, 'desktop canonical work-update loop');
  await noHorizontalOverflow(workUpdatePage, 'desktop six-message work-update route');
  await workUpdatePage.screenshot({ path: path.join(visualEvidenceDirectory, 'six-message-work-update-desktop.png') });
  await workUpdatePage.setViewportSize({ width: 390, height: 844 });
  await workUpdatePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-work-update-messages`, { waitUntil: 'networkidle' });
  await workUpdatePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  await noHorizontalOverflow(workUpdatePage, 'mobile six-message work-update route');
  await workUpdatePage.screenshot({ path: path.join(visualEvidenceDirectory, 'six-message-work-update-mobile.png') });
  await workUpdatePage.close();
  await workCanonicalPage.close();

  const sixResearchPage = await context.newPage();
  await sixResearchPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-research-messages`, { waitUntil: 'networkidle' });
  await sixResearchPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const sixResearchHeading = sixResearchPage.getByRole('heading', { name: /six short messages for one research check/i });
  assert.equal(await sixResearchHeading.isVisible(), true, 'Six-message research route is not discoverable in Reader');
  assert.equal(await sixResearchPage.locator('#six-short-research-messages').count(), 1, 'Reader did not preserve the six-message research fragment target');
  assert.match(await sixResearchPage.locator('[data-reader-article]').innerText(), /not a promise that an LLM can search correctly/i, 'Six-message research route omits its evidence boundary');
  assert.equal(await sixResearchPage.getByRole('link', { name: 'Freeze one decision', exact: true }).isVisible(), true, 'Six-message research route omits the first usable prompt');
  assert.ok(await sixResearchPage.getByRole('link', { name: 'bounded research-check loop', exact: true }).count() >= 1, 'Six-message research route does not expose its canonical loop');
  const sixResearchCanonicalPage = await context.newPage();
  await sixResearchCanonicalPage.goto(`${origin}/site/reader.html?path=book%2Fresearch-check-practice-loop-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await sixResearchCanonicalPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await sixResearchCanonicalPage.getByRole('heading', { name: /six messages for a bounded research check/i }).isVisible(), true, 'Canonical research loop did not render');
  for (const message of ['Freeze one decision', 'Name claims and source owners', 'Read supplied material, not imagined sources', 'Test one sentence', 'Look for a decision-changing exception', 'End with a stop receipt']) {
    assert.equal(await sixResearchCanonicalPage.getByRole('heading', { name: new RegExp(`^\\d+\\. ${message}$`, 'i') }).isVisible(), true, `Canonical research loop omits ${message}`);
  }
  const sixResearchVisual = sixResearchCanonicalPage.locator('img[alt*="research question becomes a decision"]');
  assert.match(await sixResearchVisual.getAttribute('src'), /assets\/teaching\/research-question-to-source-record-red-black\.svg$/, 'Canonical research loop does not retain its teaching visual');
  await noHorizontalOverflow(sixResearchCanonicalPage, 'desktop canonical research loop');
  await noHorizontalOverflow(sixResearchPage, 'desktop six-message research route');
  await sixResearchPage.screenshot({ path: path.join(visualEvidenceDirectory, 'six-message-research-desktop.png') });
  assert.equal(await sixResearchPage.locator('img[alt*="research question becomes a decision"]').count(), 0, 'Legacy research pointer retained a duplicate teaching visual');
  await sixResearchCanonicalPage.setViewportSize({ width: 390, height: 844 });
  await sixResearchCanonicalPage.goto(`${origin}/site/reader.html?path=book%2Fresearch-check-practice-loop-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await sixResearchCanonicalPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await sixResearchVisual.isVisible(), false, 'Mobile Reader shrinks the canonical research-record board instead of offering a full-size route');
  assert.equal(await sixResearchCanonicalPage.getByRole('link', { name: /open full-size visual: a research question becomes a decision/i }).isVisible(), true, 'Canonical research loop lacks an accessible mobile full-size route');
  await noHorizontalOverflow(sixResearchCanonicalPage, 'mobile canonical research loop');
  await sixResearchPage.setViewportSize({ width: 390, height: 844 });
  await sixResearchPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#six-short-research-messages`, { waitUntil: 'networkidle' });
  await sixResearchPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  await noHorizontalOverflow(sixResearchPage, 'mobile six-message research route');
  await sixResearchPage.screenshot({ path: path.join(visualEvidenceDirectory, 'six-message-research-mobile.png') });
  await sixResearchPage.close();
  await sixResearchCanonicalPage.close();

  const platformFactWatchPage = await context.newPage();
  await platformFactWatchPage.goto(`${origin}/site/reader.html?path=skills%2Fprysai-platform-fact-watch%2FSKILL.md&lang=en`, { waitUntil: 'networkidle' });
  await platformFactWatchPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await platformFactWatchPage.locator('[data-reader-article] h1').innerText(), /platform fact watch/i, 'Reader did not render Platform Fact Watch');
  assert.match(
    await platformFactWatchPage.locator('[data-reader-article]').innerText(),
    /does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence/i,
    'Platform Fact Watch Reader page omits its evidence boundary',
  );
  await noHorizontalOverflow(platformFactWatchPage, 'desktop Platform Fact Watch Reader page');
  await platformFactWatchPage.close();

  // The platform map uses one stable authored fragment for every locale. A
  // translated heading alone is not a deep-link contract: its generated slug
  // can change with wording or Reader rules. Keep every localized adapter
  // fail-closed only for missing content, not for a missing target.
  const platformAdapterPage = await context.newPage();
  for (const locale of ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw']) {
    const suffix = locale === 'zh-tw' ? 'ZHTW' : locale.toUpperCase();
    const adapterSource = `book%2Froutes%2Fplatform-adapter-guide-${suffix}.md`;
    await platformAdapterPage.goto(`${origin}/site/reader.html?path=${adapterSource}&lang=${locale}#deepseek-first-task`, { waitUntil: 'networkidle' });
    await platformAdapterPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
    assert.equal(
      await platformAdapterPage.locator('#deepseek-first-task').count(),
      1,
      `${locale} platform adapter lost the stable DeepSeek fragment`,
    );
    const adapterAnchorTop = await platformAdapterPage.locator('#deepseek-first-task').evaluate((target) => target.getBoundingClientRect().top);
    assert.ok(adapterAnchorTop >= 0 && adapterAnchorTop < 260, `${locale} DeepSeek fragment did not restore the reading band: ${adapterAnchorTop}`);
  }
  await noHorizontalOverflow(platformAdapterPage, 'mobile-independent platform adapter route');
  await platformAdapterPage.close();

  const typedLanguagePage = await context.newPage();
  await typedLanguagePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#language-practice-route`, { waitUntil: 'networkidle' });
  await typedLanguagePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const typedLanguageHeading = typedLanguagePage.getByRole('heading', { name: /typed beginner Spanish scheduling exchange/i });
  assert.equal(await typedLanguageHeading.isVisible(), true, 'Typed language route is not discoverable in Reader');
  assert.equal(await typedLanguagePage.locator('#language-practice-route').count(), 1, 'Reader did not preserve the language-practice-route fragment target');
  const typedLanguagePosition = await typedLanguagePage.locator('#language-practice-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(typedLanguagePosition >= 0 && typedLanguagePosition < 260, `Reader did not restore the typed language fragment into the first visible reading band: ${typedLanguagePosition}`);
  const modalityBoundary = typedLanguagePage.getByRole('heading', { name: /keep the evidence surface honest/i });
  assert.equal(await modalityBoundary.isVisible(), true, 'Typed language route omits the modality boundary');
  assert.match(await typedLanguagePage.locator('[data-reader-article]').innerText(), /does not observe speech, listening, pronunciation, pace, or repair/i, 'Typed language route does not name the unobserved spoken evidence');
  const modalityRecord = typedLanguagePage.getByRole('link', { name: /typed-rehearsal boundary record/i });
  assert.match(await modalityRecord.getAttribute('href'), /reader\.html\?path=docs%2Fresearch%2Fai-assisted-language-practice-boundaries-2026-08-14\.md&lang=en$/, 'Typed language route does not expose its modality-boundary research record');
  await noHorizontalOverflow(typedLanguagePage, 'desktop typed language route');
  await typedLanguagePage.screenshot({ path: path.join(visualEvidenceDirectory, 'typed-language-route-desktop.png') });
  await typedLanguagePage.setViewportSize({ width: 390, height: 844 });
  await typedLanguagePage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#language-practice-route`, { waitUntil: 'networkidle' });
  await typedLanguagePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const mobileTypedLanguageHeadingTop = await typedLanguageHeading.evaluate((heading) => heading.getBoundingClientRect().top);
  assert.ok(mobileTypedLanguageHeadingTop >= 0 && mobileTypedLanguageHeadingTop < 260, `Mobile Reader did not restore the typed language heading into the first visible reading band: ${mobileTypedLanguageHeadingTop}`);
  await noHorizontalOverflow(typedLanguagePage, 'mobile typed language route');
  await typedLanguagePage.screenshot({ path: path.join(visualEvidenceDirectory, 'typed-language-route-mobile.png') });
  await typedLanguagePage.close();

  const pilotProtocolPage = await context.newPage();
  await pilotProtocolPage.goto(`${origin}/site/reader.html?path=docs%2Fquality%2Ffirst-win-pilot-protocol-v2.md&lang=en`, { waitUntil: 'networkidle' });
  await pilotProtocolPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await pilotProtocolPage.locator('[data-reader-article] h1').innerText(), /first win pilot protocol v2/i, 'Reader did not render the First Win pilot protocol');
  const pilotKitLink = pilotProtocolPage.getByRole('link', { name: /pilot-kit contract/i });
  assert.match(await pilotKitLink.getAttribute('href'), /docs\/governance\/first-win-pilot-kit\.yaml$/, 'Pilot protocol does not link to its commit-bound kit contract');
  assert.match(await pilotProtocolPage.locator('[data-reader-article]').innerText(), /prepared_no_recruitment_or_participant_run_recorded/i, 'Pilot protocol omits the prepared-not-run boundary');
  await noHorizontalOverflow(pilotProtocolPage, 'desktop First Win pilot protocol');
  await pilotProtocolPage.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(pilotProtocolPage, 'mobile First Win pilot protocol');
  const pilotConditionList = pilotProtocolPage.locator('[data-reader-article] h2', { hasText: 'Fixed conditions' }).locator('xpath=following-sibling::ul[1]');
  assert.equal(await pilotConditionList.count(), 1, 'Pilot protocol uses a dense fixed-condition block instead of a mobile-readable list');
  assert.equal(await pilotConditionList.locator('li').count(), 6, 'Pilot protocol fixed conditions do not expose six scannable records');
  await pilotProtocolPage.close();
  const newcomerProtocolPage = await context.newPage();
  await newcomerProtocolPage.goto(`${origin}/site/reader.html?path=docs%2Fquality%2Fnewcomer-entry-observation-protocol-v1.md&lang=en`, { waitUntil: 'networkidle' });
  await newcomerProtocolPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await newcomerProtocolPage.locator('[data-reader-article] h1').innerText(), /newcomer entry observation protocol v1/i, 'Reader did not render the newcomer-entry protocol');
  assert.match(await newcomerProtocolPage.locator('[data-reader-article]').innerText(), /have you sent a prompt to a generative chat model/i, 'newcomer-entry protocol lacks its explicit cohort screen');
  assert.match(await newcomerProtocolPage.locator('[data-reader-article]').innerText(), /no recruitment, participant run, or result is recorded/i, 'newcomer-entry protocol omits its not-run boundary');
  await newcomerProtocolPage.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(newcomerProtocolPage, 'mobile newcomer-entry protocol');
  await newcomerProtocolPage.close();
  assert.equal(await page.locator('[data-first-win-check]').count(), 0, 'first prompt practice still exposes a scoring form');
  assert.equal(await page.locator('[data-first-win-receipt]').count(), 0, 'first prompt practice still exposes a machine-style receipt');
  assert.match(await page.locator('[data-starter-prompt]').innerText(), /Do not add a date, place, reason, contact detail/i, 'first prompt does not name the no-invention boundary');
  assert.equal(await page.locator('.first-win-checks li').count(), 3, 'first prompt practice does not expose three plain-language checks');
  await page.locator('[data-copy-starter]').click();
  await page.locator('[data-copy-starter-status]').getByText('Prompt copied.', { exact: false }).waitFor();
  for (const locale of ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw']) {
    const localePage = await context.newPage();
    const localeEntry = locale === 'en' ? `${origin}/site/index.html` : `${origin}/${locale}.html`;
    await localePage.goto(localeEntry, { waitUntil: 'networkidle' });
    const expectedUrl = locale === 'en'
      ? 'https://docs.prysai.com/llm-playbook/'
      : `https://docs.prysai.com/llm-playbook/${locale}.html`;
    assert.equal(await localePage.locator('link[rel="canonical"]').getAttribute('href'), expectedUrl, `${locale} canonical metadata is incorrect`);
    assert.ok((await localePage.locator('meta[name="description"]').getAttribute('content'))?.trim(), `${locale} is missing a localized description`);
    const expectedHtmlLang = locale === 'zh' ? 'zh-CN' : locale === 'zh-tw' ? 'zh-TW' : locale;
    assert.equal(await localePage.locator('html').getAttribute('lang'), expectedHtmlLang, `${locale} static entry does not render in its selected document language`);
    const structuredData = JSON.parse(await localePage.locator('#site-structured-data').textContent());
    assert.equal(structuredData.alternateName, 'LLMPlaybook', `${locale} structured data omits the LLMPlaybook discovery alias`);
    assert.equal(await localePage.locator('.problem-grid .card-link').evaluateAll((links) => links.some((link) => /candidate|draft|not_run/i.test(link.textContent || ''))), false, `${locale} problem cards expose development statuses`);
    assert.match(await localePage.locator('.hero-proof-source blockquote').innerText(), localizedHeroSources[locale], `${locale} hero teaching example leaks an English source message`);
    await localePage.close();
  }

  await page.goto(`${origin}/site/index.html?lang=en`, { waitUntil: 'networkidle' });
  const searchInput = page.getByRole('searchbox', { name: 'Search the Playbook' });
  await searchInput.focus();
  await page.waitForTimeout(100);
  assert.equal(searchRequests.length, 0, 'keyboard focus fetched the full search index');
  const searchIndexResponse = page.waitForResponse((response) => response.url().includes('search-index.js') && response.ok());
  await searchInput.fill('verification');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-clear]').click();
  await searchIndexResponse;
  assert.equal(searchRequests.length, 1, 'search index was not loaded exactly once on first search intent');
  assert.equal(await searchInput.inputValue(), '', 'clearing during index load restored a stale query');
  assert.equal(await page.locator('[data-search-results] .search-result').count(), 0, 'clearing during index load restored stale results');
  await searchInput.fill('verification');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-results] .search-result').first().waitFor();
  assert.ok(await page.locator('[data-search-results] .search-result').count() > 0, 'search returned no results for verification');
  await searchInput.fill('safe task');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-results] .search-result').first().waitFor();
  const safeTaskResults = await page.locator('[data-search-results] .search-result strong').allTextContents();
  assert.match(safeTaskResults[0], /safe.*task/i, 'search did not put a safe-task learning page first');
  await searchInput.fill('spanish practice');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const spanishPracticeResult = page.locator('[data-search-results] .search-result').first();
  await spanishPracticeResult.waitFor();
  assert.match(
    await spanishPracticeResult.locator('strong').innerText(),
    /six short spanish practice messages/i,
    'Spanish practice search did not put the declared copy-ready card first',
  );
  assert.match(
    await spanishPracticeResult.locator('a').getAttribute('href'),
    /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#six-short-spanish-messages$/,
    'Spanish practice search did not open the exact learner-facing card anchor',
  );
  const directSearchPage = await context.newPage();
  await directSearchPage.goto(`${origin}/site/index.html?q=spanish+practice&lang=en`, { waitUntil: 'networkidle' });
  const directSearchResult = directSearchPage.locator('[data-search-results] .search-result').first();
  await directSearchResult.waitFor();
  assert.match(
    await directSearchResult.locator('strong').innerText(),
    /six short spanish practice messages/i,
    'direct search URL left the lazy search panel loading instead of rendering results',
  );
  assert.equal(await directSearchPage.locator('[data-site-search-input]').inputValue(), 'spanish practice', 'direct search URL did not seed the visible query');
  await directSearchPage.close();
  const labIndexPage = await context.newPage();
  await labIndexPage.goto(`${origin}/site/reader.html?path=book%2Flabs%2FREADME-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await labIndexPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await labIndexPage.getByText('<!-- language-switcher:end -->', { exact: true }).count(), 0, 'Reader rendered a source language-switcher comment');
  assert.equal(await labIndexPage.getByText(/^Languages:/, { exact: false }).count(), 0, 'Reader rendered a duplicate source language selector');
  await labIndexPage.close();
  const defaultReaderPage = await context.newPage();
  await defaultReaderPage.goto(`${origin}/site/reader.html`, { waitUntil: 'networkidle' });
  await defaultReaderPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await defaultReaderPage.locator('html').getAttribute('lang'), 'en', 'unparameterized English Reader inherits a browser language preference');
  assert.match(await defaultReaderPage.locator('[data-reader-article] h1').innerText(), /LLM Foundation Core v1/i, 'unparameterized Reader does not open the foundation route');
  await defaultReaderPage.close();
  await searchInput.fill('research checkpoint');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('[data-search-results] .search-result').filter({ hasText: 'AI safety field signals' }).first().waitFor();
  await page.locator('[data-search-clear]').click();

  const fieldSignalsHref = await page.getByRole('link', { name: 'Read the AI safety field signals' }).getAttribute('href');
  assert.match(fieldSignalsHref, /reader\.html\?path=docs%2Fresearch%2Fai-safety-field-signals-and-research-receipts-2026-08-13\.md&lang=en$/, 'AI safety field-signals link does not open its canonical Reader route');
  const fieldSignalsPage = await context.newPage();
  await fieldSignalsPage.goto(new URL(fieldSignalsHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await fieldSignalsPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await fieldSignalsPage.locator('[data-reader-article] h1').innerText(), /AI safety field signals/i, 'Reader did not render the AI safety field-signals record');
  assert.equal(await fieldSignalsPage.getByRole('heading', { name: /a research checkpoint that survives a long task/i }).isVisible(), true, 'AI safety field-signals record does not expose its research checkpoint');
  assert.match(await fieldSignalsPage.locator('[data-reader-article]').innerText(), /not a security log, audit certificate, chain-of-thought record, or proof that the research is complete/i, 'research checkpoint is missing its evidence boundary');
  await fieldSignalsPage.close();

  const surfaceChapterPage = await context.newPage();
  await surfaceChapterPage.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F05-choose-the-codex-surface-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await surfaceChapterPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await surfaceChapterPage.locator('[data-reader-article] h1').innerText(), /choose the right codex surface/i, 'Reader did not render the surface-decision chapter');
  const fieldSignalVisual = surfaceChapterPage.locator('img[alt*="Field signals mapped to the smallest safe response"]');
  assert.match(await fieldSignalVisual.getAttribute('src'), /assets\/teaching\/field-signal-to-safe-degradation-red-black\.svg$/, 'surface-decision chapter does not retain its teaching visual');
  assert.equal(await fieldSignalVisual.isVisible(), true, 'Desktop Reader does not show the field-signal teaching visual');
  const fieldSignalVisualLink = surfaceChapterPage.locator('.reader-image-link').filter({ has: fieldSignalVisual });
  assert.equal(await fieldSignalVisualLink.getAttribute('target'), '_blank', 'field-signal teaching visual does not offer a full-size route');
  assert.equal(await fieldSignalVisualLink.evaluate((link) => link.classList.contains('reader-teaching-visual')), true, 'field-signal visual is not rendered as a deliberate visual break');
  await fieldSignalVisualLink.screenshot({ path: path.join(visualEvidenceDirectory, 'field-signal-surface-desktop.png') });
  await noHorizontalOverflow(surfaceChapterPage, 'desktop surface-decision chapter');
  await surfaceChapterPage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await fieldSignalVisual.isVisible(), false, 'Mobile Reader shrinks the dense field-signal board instead of offering a full-size route');
  assert.equal(await surfaceChapterPage.getByRole('link', { name: /open full-size visual: field signals mapped to the smallest safe response/i }).isVisible(), true, 'field-signal visual lacks an accessible mobile full-size route');
  await noHorizontalOverflow(surfaceChapterPage, 'mobile surface-decision chapter');
  await surfaceChapterPage.close();

  await searchInput.fill('task receipt');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const handoffSearchResult = page.locator('[data-search-results] .search-result').filter({ hasText: 'created sub-agent is not a task receipt' }).first();
  await handoffSearchResult.waitFor();
  const handoffCaseHref = await handoffSearchResult.locator('a').getAttribute('href');
  assert.match(handoffCaseHref, /reader\.html\?path=docs%2Fresearch%2Ffield-case-agent-handoff-receipt-2026-08-14\.md&lang=en$/, 'Agent-handoff case is not exposed through the English Reader route');
  const handoffCasePage = await context.newPage();
  await handoffCasePage.goto(new URL(handoffCaseHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await handoffCasePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await handoffCasePage.locator('[data-reader-article] h1').innerText(), /created sub-agent is not a task receipt/i, 'Reader did not render the agent-handoff field case');
  assert.equal(await handoffCasePage.getByRole('heading', { name: /start here: name the missing checkpoint/i }).isVisible(), true, 'Agent-handoff case does not lead with the beginner checkpoint boundary');
  assert.match(await handoffCasePage.locator('[data-reader-article]').innerText(), /does not create an agent, send a message, inspect a session, or diagnose a product/i, 'Agent-handoff case omits its offline scope boundary');
  const handoffVisual = handoffCasePage.locator('img[alt*="Five handoff checkpoints"]');
  assert.match(await handoffVisual.getAttribute('src'), /assets\/teaching\/agent-handoff-receipt-checkpoints-red-black\.svg$/, 'Agent-handoff case does not retain its project-owned teaching visual');
  const handoffVisualLink = handoffCasePage.locator('.reader-image-link').filter({ has: handoffVisual });
  assert.equal(await handoffVisualLink.getAttribute('target'), '_blank', 'Agent-handoff visual does not offer its full-size reading route');
  await handoffCasePage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await handoffVisual.isVisible(), false, 'Mobile Reader shrinks the dense agent-handoff teaching board instead of offering a full-size route');
  assert.equal(await handoffCasePage.getByRole('link', { name: /open full-size visual: five handoff checkpoints/i }).isVisible(), true, 'Agent-handoff visual lacks an accessible mobile full-size route');
  await noHorizontalOverflow(handoffCasePage, 'mobile agent-handoff field case');
  await handoffCasePage.close();

  await searchInput.fill('capacity interruption');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const capacitySearchResult = page.locator('[data-search-results] .search-result').filter({ hasText: 'pause before retrying an interrupted task' }).first();
  await capacitySearchResult.waitFor();
  const capacityCaseHref = await capacitySearchResult.locator('a').getAttribute('href');
  assert.match(capacityCaseHref, /reader\.html\?path=docs%2Fresearch%2Ffield-case-capacity-interruption-checkpoint-2026-08-14\.md&lang=en$/, 'Capacity-interruption case is not exposed through the English Reader route');
  const capacityCasePage = await context.newPage();
  await capacityCasePage.goto(new URL(capacityCaseHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await capacityCasePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await capacityCasePage.locator('[data-reader-article] h1').innerText(), /pause before retrying an interrupted task/i, 'Reader did not render the capacity-interruption field case');
  assert.equal(await capacityCasePage.getByRole('heading', { name: /start here: do not make the interruption invisible/i }).isVisible(), true, 'Capacity-interruption case does not lead with the beginner pause boundary');
  assert.match(await capacityCasePage.locator('[data-reader-article]').innerText(), /does not send a prompt, retry a model, change a model, inspect an account, or establish how any provider will behave/i, 'Capacity-interruption case omits its offline scope boundary');
  const capacityVisual = capacityCasePage.locator('img[alt*="Interruption checkpoint"]');
  assert.match(await capacityVisual.getAttribute('src'), /assets\/teaching\/interruption-checkpoint-card-red-black\.svg$/, 'Capacity-interruption case does not retain its project-owned checkpoint visual');
  const capacityVisualLink = capacityCasePage.locator('.reader-image-link').filter({ has: capacityVisual });
  assert.equal(await capacityVisualLink.getAttribute('target'), '_blank', 'Capacity-interruption visual does not offer a full-size reading route');
  await capacityVisualLink.screenshot({ path: path.join(visualEvidenceDirectory, 'interruption-checkpoint-card.png') });
  await noHorizontalOverflow(capacityCasePage, 'desktop capacity-interruption field case');
  await capacityCasePage.screenshot({ path: path.join(visualEvidenceDirectory, 'capacity-interruption-desktop.png') });
  await capacityCasePage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await capacityVisual.isVisible(), false, 'Mobile Reader shrinks the dense interruption-checkpoint board instead of offering a full-size route');
  assert.equal(await capacityCasePage.getByRole('link', { name: /open full-size visual: interruption checkpoint/i }).isVisible(), true, 'Capacity-interruption visual lacks an accessible mobile full-size route');
  await noHorizontalOverflow(capacityCasePage, 'mobile capacity-interruption field case');
  await capacityCasePage.screenshot({ path: path.join(visualEvidenceDirectory, 'capacity-interruption-mobile.png') });
  await capacityCasePage.close();

  await searchInput.fill('better beginner opening');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const tutorialIntakeSearchResult = page.locator('[data-search-results] .search-result').filter({ hasText: 'Community tutorial intake' }).first();
  await tutorialIntakeSearchResult.waitFor();
  const tutorialIntakeHref = await tutorialIntakeSearchResult.locator('a').getAttribute('href');
  assert.match(tutorialIntakeHref, /reader\.html\?path=docs%2Fresearch%2Fcommunity-tutorial-intake-and-foundations-2026-08-14\.md&lang=en$/, 'Community tutorial intake is not exposed through the English Reader route');
  const tutorialIntakePage = await context.newPage();
  await tutorialIntakePage.goto(new URL(tutorialIntakeHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await tutorialIntakePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await tutorialIntakePage.locator('[data-reader-article] h1').innerText(), /a better beginner opening, not a product source/i, 'Reader did not render the community tutorial intake');
  assert.equal(await tutorialIntakePage.getByRole('heading', { name: /an original opening for the general course/i }).isVisible(), true, 'Community tutorial intake does not expose the original beginner-opening boundary');
  assert.match(await tutorialIntakePage.locator('[data-reader-article]').innerText(), /do not embed its player, copy its transcript, reuse its screenshots/i, 'Community tutorial intake omits its source and rights boundary');
  await noHorizontalOverflow(tutorialIntakePage, 'community tutorial intake field note');
  await tutorialIntakePage.close();
  await page.locator('[data-search-clear]').click();

  const retryPage = await context.newPage();
  let retryRequests = 0;
  await retryPage.route('**/search-index.js*', async (route) => {
    retryRequests += 1;
    if (retryRequests === 1) await route.abort('failed');
    else await route.continue();
  });
  await retryPage.goto(`${origin}/`, { waitUntil: 'networkidle' });
  const retryInput = retryPage.getByRole('searchbox', { name: 'Search the Playbook' });
  await retryInput.evaluate((input) => { input.value = 'verification'; });
  await retryPage.getByRole('button', { name: 'Search', exact: true }).click();
  await retryPage.getByText(/submit again to retry/i).waitFor();
  await retryPage.getByRole('button', { name: 'Search', exact: true }).click();
  await retryPage.locator('[data-search-results] .search-result').first().waitFor();
  assert.equal(retryRequests, 2, 'search failure did not retry after the submitted search failed');
  await retryPage.close();

  // Earlier goal-wizard coverage deliberately visits the Chinese home page.
  // The following legacy card assertions are specifically about English
  // source fragments, so restore their explicit locale precondition.
  await page.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  const desktopRecoveryHref = await page.locator('.problem-card-practice').filter({ hasText: 'The model answered the wrong task.' }).getAttribute('href');
  assert.match(desktopRecoveryHref, /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#recovery-route$/, 'Showcase recovery card does not preserve the Reader fragment');
  const desktopRecoveryPage = await context.newPage();
  await desktopRecoveryPage.goto(new URL(desktopRecoveryHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await desktopRecoveryPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
  const desktopRecoveryTop = await desktopRecoveryPage.locator('#recovery-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(desktopRecoveryTop >= 0 && desktopRecoveryTop < 260, `Desktop Reader did not restore the recovery fragment: ${desktopRecoveryTop}`);
  await desktopRecoveryPage.close();

  const desktopPublicInterestHref = await page.locator('.problem-card-practice').filter({ hasText: 'I need to assess an AI idea that could affect people.' }).getAttribute('href');
  assert.match(desktopPublicInterestHref, /reader\.html\?path=book%2Fcommunication-clinic-EN\.md&lang=en#public-interest-safety-route$/, 'Showcase public-interest safety card does not preserve the Reader fragment');
  const desktopPublicInterestPage = await context.newPage();
  await desktopPublicInterestPage.goto(new URL(desktopPublicInterestHref, `${origin}/site/`).href, { waitUntil: 'networkidle' });
  await desktopPublicInterestPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.equal(await desktopPublicInterestPage.getByRole('heading', { name: /advanced — public-interest safety research before a system affects people/i }).isVisible(), true, 'Public-interest safety inquiry is not discoverable in Reader');
  assert.equal(await desktopPublicInterestPage.locator('#public-interest-safety-route').count(), 1, 'Reader did not preserve the public-interest-safety-route fragment target');
  const publicInterestTop = await desktopPublicInterestPage.locator('#public-interest-safety-route').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(publicInterestTop >= 0 && publicInterestTop < 260, `Desktop Reader did not restore the public-interest safety fragment: ${publicInterestTop}`);
  const publicInterestVisual = desktopPublicInterestPage.locator('img[alt*="public-interest safety research card"]');
  assert.match(await publicInterestVisual.getAttribute('src'), /assets\/teaching\/public-interest-safety-research-red-black\.svg$/, 'Public-interest safety inquiry does not retain its original full-size teaching visual');
  await desktopPublicInterestPage.close();

  const universalSeamPage = await context.newPage();
  await universalSeamPage.goto(`${origin}/site/reader.html?path=book%2Froutes%2Funiversal-core-foundations-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await universalSeamPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(await universalSeamPage.locator('[data-reader-article] h1').innerText(), /universal llm collaboration: one safe first task, then four foundations/i, 'Reader did not render the universal-core route');
  assert.equal(await universalSeamPage.getByRole('link', { name: /universal seam fixture/i }).isVisible(), true, 'Universal-core route does not expose its offline seam fixture');
  const universalSeamVisual = universalSeamPage.locator('img[alt*="Four evidence seams"]');
  assert.match(await universalSeamVisual.getAttribute('src'), /assets\/teaching\/universal-seams-red-black\.svg$/, 'Universal-core route does not retain its original seam visual');
  assert.equal(await universalSeamVisual.isVisible(), true, 'Desktop Reader does not show the universal seam board');
  await noHorizontalOverflow(universalSeamPage, 'desktop universal-core route');
  await universalSeamPage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await universalSeamVisual.isVisible(), false, 'Mobile Reader shrinks the dense universal seam board instead of offering a full-size route');
  assert.equal(await universalSeamPage.getByRole('link', { name: /open full-size visual: four evidence seams/i }).isVisible(), true, 'Universal seam visual lacks an accessible mobile full-size route');
  await noHorizontalOverflow(universalSeamPage, 'mobile universal-core route');
  await universalSeamPage.close();

  const universalSeamRawPage = await context.newPage();
  await universalSeamRawPage.setViewportSize({ width: 390, height: 844 });
  await universalSeamRawPage.goto(`${origin}/assets/teaching/universal-seams-red-black.svg`, { waitUntil: 'networkidle' });
  await noHorizontalOverflow(universalSeamRawPage, 'mobile universal-seam full-size visual');
  await universalSeamRawPage.screenshot({ path: path.join(visualEvidenceDirectory, 'universal-seams-mobile-visual-route.png') });
  await universalSeamRawPage.close();

  // The five-unit LLM Foundation Core is the canonical English contract. Its
  // non-English entry projections must resolve to an existing same-locale
  // teaching page; the Reader must never show the English source under a
  // translated shell. Truly unregistered project material is checked below
  // for the separate fail-closed behavior.
  const coreRouteChecks = [
    ['llm-foundation-core-v1-EN.md', /LLM Foundation Core v1/i],
    ['llm-core-first-generation-EN.md', /Context, instruction, and a first generation/i],
    ['llm-core-visible-failures-EN.md', /Recognize visible LLM failures/i],
    ['llm-core-check-repair-EN.md', /Check, repair, and state limits/i],
    ['llm-core-unseen-transfer-EN.md', /Repeat the method on an unseen task/i],
  ];
  const localeSuffix = { en: 'EN', zh: 'ZH', es: 'ES', ja: 'JA', ko: 'KO', de: 'DE', 'zh-tw': 'ZHTW' };
  const coreProjectionStems = {
    'llm-foundation-core-v1-EN.md': 'book/guides/llm-fundamentals',
    'llm-core-first-generation-EN.md': 'book/routes/universal-core-foundations',
    'llm-core-visible-failures-EN.md': 'book/communication-clinic',
    'llm-core-check-repair-EN.md': 'book/chapters/09-verification-and-recovery',
    'llm-core-unseen-transfer-EN.md': 'book/routes/first-safe-change',
  };
  const coreRoutePage = await context.newPage();
  const localizedCorePages = await Promise.all(
    Object.entries({ zh: 'zh-CN', es: 'es', ja: 'ja', ko: 'ko', de: 'de', 'zh-tw': 'zh-TW' }).map(async ([locale, htmlLang]) => ({
      locale,
      htmlLang,
      page: await context.newPage(),
    })),
  );
  for (const [sourceName, titlePattern] of coreRouteChecks) {
    const sourcePath = `book%2Froutes%2F${sourceName}`;
    await coreRoutePage.goto(`${origin}/site/reader.html?path=${sourcePath}&lang=en`, { waitUntil: 'networkidle' });
    await coreRoutePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.match(await coreRoutePage.locator('[data-reader-article] h1').innerText(), titlePattern, `English core route did not render: ${sourceName}`);
    assert.equal(await coreRoutePage.locator('[data-reader-article]').getAttribute('data-reader-translation-status'), 'source', `English core route is not marked as source: ${sourceName}`);

    await Promise.all(localizedCorePages.map(async ({ locale, htmlLang, page: localePage }) => {
      await localePage.goto(`${origin}/site/reader.html?path=${sourcePath}&lang=${locale}`, { waitUntil: 'domcontentloaded' });
      await localePage.locator('[data-reader-article][aria-busy="false"]').waitFor();
      assert.equal(await localePage.locator('html').getAttribute('lang'), htmlLang, `core route changed the document language: ${sourceName}/${locale}`);
      assert.equal(await localePage.locator('.reader-error').count(), 0, `localized core route failed closed: ${sourceName}/${locale}`);
      assert.equal(await localePage.locator('[data-reader-article] h1').count(), 1, `localized core route did not render a local teaching page: ${sourceName}/${locale}`);
      const expectedPath = `${coreProjectionStems[sourceName]}-${localeSuffix[locale]}.md`;
      // Source path lives inside a closed <details> panel by default.  Use
      // textContent for this structural assertion; Playwright's innerText
      // intentionally omits text in closed disclosure content even though
      // the Reader has rendered the correct path.
      assert.equal((await localePage.locator('[data-reader-path]').textContent()).trim(), expectedPath, `localized core route did not project to the declared same-locale page: ${sourceName}/${locale}`);
      assert.equal(await localePage.locator('[data-reader-article]').getAttribute('data-reader-effective-locale'), locale, `localized core route rendered with the wrong effective locale: ${sourceName}/${locale}`);
    }));
  }

  // The receipt is an opt-in, local-only self-report. It must survive a
  // refresh without turning into a completion claim, and saving it must not
  // create a network request containing the user's notes.
  const coreReceiptPage = await context.newPage();
  const receiptNetworkDuringSave = [];
  let recordingReceiptNetwork = false;
  coreReceiptPage.on('request', (request) => {
    if (recordingReceiptNetwork) receiptNetworkDuringSave.push({ url: request.url(), postData: request.postData() || '' });
  });
  await coreReceiptPage.goto(`${origin}/site/reader.html?path=book%2Froutes%2Fllm-foundation-core-v1-EN.md&lang=en`, { waitUntil: 'networkidle' });
  const coreReceiptCard = coreReceiptPage.locator('[data-reader-core-card]');
  await coreReceiptCard.waitFor({ state: 'visible' });
  assert.match(await coreReceiptPage.locator('[data-reader-core-current-title]').innerText(), /start with one safe attempt/i, 'core receipt panel does not identify the current unit');
  const coreNextCard = coreReceiptPage.locator('[data-reader-core-next]');
  await coreNextCard.waitFor({ state: 'visible' });
  assert.match(await coreNextCard.locator('[data-reader-core-next-title]').innerText(), /start with one safe attempt/i, 'core next-step card does not identify the current unit before an attempt');
  assert.match(await coreNextCard.locator('[data-reader-core-next-body]').innerText(), /read this unit.*keep:/i, 'core next-step card does not name the first retained artifact');
  assert.match(await coreNextCard.locator('[data-reader-core-next-link]').getAttribute('href'), /llm-foundation-core-v1-EN\.md&lang=en$/, 'core next-step card does not open the current unit before an attempt');
  assert.doesNotMatch(await coreReceiptPage.locator('[data-reader-article]').innerText(), /<span id="unit-/i, 'Reader leaked an inline anchor tag into core route prose');
  assert.equal(await coreReceiptPage.locator('[data-reader-article] .reader-anchor#unit-1-llm-boundaries').count(), 1, 'Reader dropped the core route unit anchor while hiding its source markup');
  await coreReceiptPage.evaluate(() => localStorage.removeItem('prysai-llm-foundation-core-receipt-v1'));
  await coreReceiptPage.reload({ waitUntil: 'networkidle' });
  await coreReceiptCard.waitFor({ state: 'visible' });
  await coreReceiptPage.locator('[data-reader-core-attempted]').check();
  await coreReceiptPage.locator('[data-reader-core-artifact]').fill('A short non-sensitive task note');
  await coreReceiptPage.locator('[data-reader-core-limit]').fill('No source check yet');
  recordingReceiptNetwork = true;
  await coreReceiptPage.getByRole('button', { name: /save local (?:receipt|check record)/i }).click();
  await coreReceiptPage.waitForTimeout(100);
  recordingReceiptNetwork = false;
  assert.equal(receiptNetworkDuringSave.length, 0, 'saving a local receipt created a network request');
  assert.match(await coreReceiptPage.locator('[data-reader-core-status]').innerText(), /not a completion claim/i, 'save feedback omits the non-completion boundary');
  const savedCoreState = await coreReceiptPage.evaluate(() => JSON.parse(localStorage.getItem('prysai-llm-foundation-core-receipt-v1')));
  assert.equal(savedCoreState.version, 1, 'local receipt has no schema version');
  assert.equal(savedCoreState.units['core-first-success'].attempted, true, 'local receipt did not save the opt-in attempt');
  assert.match(await coreNextCard.locator('[data-reader-core-next-title]').innerText(), /context, instruction, and a first generation/i, 'core next-step card does not advance after saving an attempt');
  assert.match(await coreNextCard.locator('[data-reader-core-next-body]').innerText(), /continue to the next unit.*keep:/i, 'core next-step card does not name the next retained artifact');
  assert.match(await coreNextCard.locator('[data-reader-core-next-link]').getAttribute('href'), /llm-core-first-generation-EN\.md&lang=en$/, 'core next-step card points to the wrong next unit');
  await coreReceiptPage.getByRole('button', { name: /copy (?:receipt|check record)/i }).click();
  const copiedReceipt = await coreReceiptPage.evaluate(() => navigator.clipboard.readText());
  assert.match(copiedReceipt, /candidate \/ not_run/, 'copied receipt does not expose candidate / not_run status');
  assert.match(copiedReceipt, /No source check yet/, 'copied receipt omits the declared limit');
  await noHorizontalOverflow(coreReceiptPage, 'desktop core receipt panel');
  await coreReceiptPage.screenshot({ path: path.join(visualEvidenceDirectory, 'core-receipt-desktop.png'), fullPage: true });
  await coreReceiptPage.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(coreReceiptPage, 'mobile core receipt panel');
  await coreReceiptPage.screenshot({ path: path.join(visualEvidenceDirectory, 'core-receipt-mobile.png'), fullPage: true });
  await coreReceiptPage.reload({ waitUntil: 'networkidle' });
  await coreReceiptCard.waitFor({ state: 'visible' });
  assert.equal(await coreReceiptPage.locator('[data-reader-core-attempted]').isChecked(), true, 'local receipt did not restore after refresh');
  assert.match(await coreReceiptPage.locator('[data-reader-core-progress]').innerText(), /1 of 5 units/i, 'core progress does not reflect the saved attempt');
  const localizedNextMarkers = { zh: '下一步', es: 'Siguiente paso', ja: '次のステップ', ko: '다음 단계', de: 'Nächster Schritt', 'zh-tw': '下一步' };
  for (const { locale, page: localePage } of localizedCorePages) {
    await localePage.goto(`${origin}/site/reader.html?path=book%2Froutes%2Fllm-foundation-core-v1-EN.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await localePage.locator('[data-reader-core-card]').waitFor({ state: 'visible' });
    assert.equal(await localePage.locator('[data-reader-core-next]').isVisible(), true, `localized core next-step card is hidden: ${locale}`);
    assert.equal((await localePage.locator('[data-reader-core-next] .reader-aside-label').innerText()).trim().toLocaleLowerCase(), localizedNextMarkers[locale].toLocaleLowerCase(), `localized core next-step label leaked: ${locale}`);
  }
  await coreReceiptPage.getByRole('button', { name: /clear local (?:receipt|check record)/i }).click();
  assert.equal(await coreReceiptPage.evaluate(() => localStorage.getItem('prysai-llm-foundation-core-receipt-v1')), null, 'clear did not remove the local receipt');
  assert.equal(await coreReceiptPage.locator('[data-reader-core-attempted]').isChecked(), false, 'clear did not reset the current unit form');
  await coreReceiptPage.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F01-gpt-and-codex-EN.md&lang=en`, { waitUntil: 'networkidle' });
  assert.equal(await coreReceiptPage.locator('[data-reader-core-card]').isHidden(), true, 'core receipt panel leaked onto a non-core Reader route');
  await coreReceiptPage.close();
  await coreRoutePage.close();
  await Promise.all(localizedCorePages.map(({ page: localePage }) => localePage.close()));

  // This board is linked from both English and Chinese Chapter 9. Keep its
  // standalone reading route phone-fitted instead of silently restoring a
  // wide desktop-only asset after the Reader hides dense SVGs on mobile.
  const evidenceRecoveryRawPage = await context.newPage();
  await evidenceRecoveryRawPage.setViewportSize({ width: 390, height: 844 });
  await evidenceRecoveryRawPage.goto(`${origin}/assets/teaching/evidence-recovery-ladder.svg`, { waitUntil: 'networkidle' });
  await noHorizontalOverflow(evidenceRecoveryRawPage, 'mobile evidence-recovery full-size visual');
  await evidenceRecoveryRawPage.screenshot({ path: path.join(visualEvidenceDirectory, 'evidence-recovery-mobile-visual-route.png') });
  await evidenceRecoveryRawPage.close();

  await page.setViewportSize({ width: 390, height: 844 });
  await noHorizontalOverflow(page, 'mobile showcase');
  await page.goto(`${origin}/site/`, { waitUntil: 'networkidle' });
  const mobileHeroMetrics = await page.evaluate(() => {
    const action = document.querySelector('[data-hero-primary]');
    const title = document.querySelector('#hero-title');
    if (!action || !title) return null;
    const actionBox = action.getBoundingClientRect();
    const titleBox = title.getBoundingClientRect();
    return {
      actionTop: actionBox.top,
      actionBottom: actionBox.bottom,
      titleHeight: titleBox.height,
      viewportHeight: window.innerHeight,
    };
  });
  assert.ok(mobileHeroMetrics, 'mobile hero is missing its title or primary action');
  assert.ok(
    mobileHeroMetrics.actionBottom <= mobileHeroMetrics.viewportHeight,
    `mobile first action starts below the initial viewport: ${JSON.stringify(mobileHeroMetrics)}`,
  );
  assert.ok(
    mobileHeroMetrics.titleHeight <= 150,
    `mobile hero title regained an overly tall line box: ${JSON.stringify(mobileHeroMetrics)}`,
  );
  await page.locator('.hero').screenshot({ path: path.join(visualEvidenceDirectory, 'hero-routes-mobile.png') });
  assert.equal(await page.locator('.mobile-core-routes').isVisible(), false, 'mobile route chooser duplicates the detailed hero decision');
  const mobileLessonZeroRoute = page.locator('.hero-route-option').first();
  assert.match(
    await mobileLessonZeroRoute.getAttribute('href'),
    /reader\.html\?path=book%2Froutes%2Fllm-foundation-core-v1-EN\.md&lang=en$/,
    'mobile foundation route does not target the LLM Foundation Core',
  );
  await mobileLessonZeroRoute.click();
  await page.waitForURL(/reader\.html\?path=book%2Froutes%2Fllm-foundation-core-v1-EN\.md/);
  assert.equal(await page.locator('[data-reader-article] h1').filter({ hasText: /LLM Foundation Core v1/i }).isVisible(), true, 'mobile foundation route does not reach the LLM Foundation Core');
  const mobileStartRoutes = [
    [/llm-fundamentals-EN\.md/, /what an llm is.*layers behind a useful answer/i],
    [/llm-core-first-generation-EN\.md/, /context, instruction, and a first generation/i],
  ];
  for (const [index, [pathPattern, titlePattern]] of mobileStartRoutes.entries()) {
    await page.goto(`${origin}/site/`, { waitUntil: 'networkidle' });
    const route = page.locator('.hero-route-option').nth(index + 1);
    const label = (await route.innerText()).replace(/\s+/g, ' ').trim();
    assert.ok(label, `mobile start route ${index + 1} has no visible label`);
    const href = await route.getAttribute('href');
    assert.match(href, /reader\.html\?path=/, `${label}: mobile start route does not open Reader`);
    assert.match(href, pathPattern, `${label}: mobile start route does not preserve its canonical source`);
    await route.click();
    // A same-tab Reader navigation can briefly retain the previous article
    // while the new document starts loading. Wait for the route's canonical
    // URL before inspecting the article so a stale H1 cannot satisfy the
    // readiness selector.
    await page.waitForURL((url) => pathPattern.test(url.href));
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.match(await page.locator('[data-reader-article] h1').innerText(), titlePattern, `${label}: Reader did not render the intended first page`);
  }
  await page.goto(`${origin}/site/#everyday-prompts`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  const mobilePromptDeckAnchorMetrics = await page.evaluate(() => {
    const deck = document.querySelector('#everyday-prompts');
    const header = document.querySelector('.site-header');
    return {
      deckTop: deck?.getBoundingClientRect().top,
      headerBottom: header?.getBoundingClientRect().bottom,
    };
  });
  assert.ok(
    Number(mobilePromptDeckAnchorMetrics.deckTop) >= Number(mobilePromptDeckAnchorMetrics.headerBottom) - 1,
    `mobile prompt-card anchor is hidden by the sticky header: ${JSON.stringify(mobilePromptDeckAnchorMetrics)}`,
  );
  await page.locator('#everyday-prompts').screenshot({ path: path.join(visualEvidenceDirectory, 'everyday-prompt-cards-mobile-en.png') });
  assert.equal(await page.locator('#everyday-prompts').getByRole('button', { name: 'Copy prompt' }).first().isVisible(), true, 'mobile prompt-card copy control is hidden');
  await noHorizontalOverflow(page, 'mobile prompt-card deck');
  const chinesePromptPage = await context.newPage();
  await chinesePromptPage.setViewportSize({ width: 390, height: 844 });
  await chinesePromptPage.goto(`${origin}/site/?lang=zh#everyday-prompts`, { waitUntil: 'networkidle' });
  await chinesePromptPage.locator('#everyday-prompts').waitFor();
  await chinesePromptPage.waitForTimeout(350);
  await noHorizontalOverflow(chinesePromptPage, 'mobile Chinese prompt-card deck');
  assert.equal(
    await chinesePromptPage.getByRole('heading', { name: '完成一次简短的文字版西班牙语学习小组时间确认。' }).isVisible(),
    true,
    'mobile Chinese language prompt-card heading is missing',
  );
  assert.equal(
    await chinesePromptPage.getByRole('button', { name: '复制提示词' }).first().isVisible(),
    true,
    'mobile Chinese prompt-card copy control is hidden',
  );
  const chinesePromptContract = chinesePromptPage.locator('.prompt-contract-panel');
  assert.equal(await chinesePromptContract.getByRole('listitem').count(), 6, 'mobile prompt contract does not expose all six visible fields');
  assert.deepEqual(
    await chinesePromptContract.locator('strong').allTextContents(),
    ['结果', '起始上下文', '请求的回答', '限制', '检查', '停止和记录'],
    'mobile Chinese prompt contract is not fully localized',
  );
  const chinesePromptContractMetrics = await chinesePromptContract.evaluate((panel) => {
    const grid = panel.querySelector('.prompt-contract-grid');
    const cards = [...panel.querySelectorAll('li')];
    return {
      panelRight: panel.getBoundingClientRect().right,
      viewport: window.innerWidth,
      columns: getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length,
      cardsFit: cards.every((card) => card.getBoundingClientRect().right <= window.innerWidth + 1),
    };
  });
  assert.equal(chinesePromptContractMetrics.columns, 2, `mobile prompt contract should keep two readable columns: ${JSON.stringify(chinesePromptContractMetrics)}`);
  assert.ok(chinesePromptContractMetrics.cardsFit && chinesePromptContractMetrics.panelRight <= chinesePromptContractMetrics.viewport + 1, `mobile prompt contract overflows the viewport: ${JSON.stringify(chinesePromptContractMetrics)}`);
  await chinesePromptPage.locator('#everyday-prompts').screenshot({ path: path.join(visualEvidenceDirectory, 'everyday-prompt-cards-mobile-zh.png') });
  await chinesePromptPage.close();
  await page.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  assert.match(await page.getByRole('link', { name: 'Open every problem route' }).getAttribute('href'), /reader\.html\?path=README-EN\.md&lang=en#start-with-a-real-outcome$/, 'mobile route index link does not target the canonical English README route section');
  assert.equal(await page.locator('[data-copy-rescue], [data-copy-first-win-record], [data-first-win-check]').count(), 0, 'mobile first prompt practice still exposes a rescue or scoring record');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const closeMenuButton = page.getByRole('button', { name: 'Close navigation' });
  assert.equal(await closeMenuButton.getByText('Close', { exact: true }).isVisible(), true, 'mobile menu does not visibly identify its close action');
  assert.equal(await page.locator('.site-nav.is-open').isVisible(), true, 'mobile navigation does not open');
  await closeMenuButton.click();
  assert.equal(await page.locator('.site-nav.is-open').count(), 0, 'mobile navigation does not close again');

  const mobileAnchorDestinations = [
    ['Start here', '#start', '#start-title'],
    ['Learning path', '#path', '#path-title'],
    ['Reading routes', '#chapters', '#chapters-title'],
    ['Project index', '#project-map', '#project-map-title'],
  ];
  for (const [label, hash, headingSelector] of mobileAnchorDestinations) {
    await page.goto(`${origin}/site/`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('link', { name: label, exact: true }).click();
    await page.waitForFunction((expectedHash) => window.location.hash === expectedHash, hash);
    await page.waitForTimeout(2_000);
    const destination = await page.evaluate((selector) => {
      const header = document.querySelector('.site-header');
      const heading = document.querySelector(selector);
      return {
        headerHeight: header.getBoundingClientRect().height,
        headingTop: heading.getBoundingClientRect().top,
        headingVisible: Boolean(heading.offsetParent),
        navigationOpen: document.querySelector('.site-nav').classList.contains('is-open'),
      };
    }, headingSelector);
    assert.equal(destination.navigationOpen, false, `mobile navigation stays open after choosing ${label}`);
    assert.equal(destination.headingVisible, true, `mobile destination heading is hidden for ${label}`);
    assert.ok(destination.headingTop >= destination.headerHeight + 12, `mobile destination heading is covered for ${label}: ${JSON.stringify(destination)}`);
    assert.ok(destination.headingTop <= destination.headerHeight + 200, `mobile destination heading is too far below the header for ${label}: ${JSON.stringify(destination)}`);
  }

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
  const mobileWideTable = page.locator('.reader-table-wide').first();
  assert.equal(await mobileWideTable.isVisible(), true, 'mobile multi-column table does not preserve a readable wide-table route');
  assert.match(await mobileWideTable.getAttribute('aria-label'), /scroll horizontally/i, 'mobile wide table does not explain how to read every column');
  assert.equal(await mobileWideTable.locator('.reader-table-hint').isVisible(), true, 'mobile wide table does not show a swipe hint');
  const mobileTableWidth = await mobileWideTable.evaluate((wrap) => ({ viewport: wrap.clientWidth, content: wrap.querySelector('table').scrollWidth }));
  assert.ok(mobileTableWidth.content > mobileTableWidth.viewport, `mobile wide table is still compressed instead of scrollable: ${JSON.stringify(mobileTableWidth)}`);
  await noHorizontalOverflow(page, 'mobile Reader');

  // Navigation must keep the requested locale when the next candidate file
  // exists, then enter the explicit fallback path at the first missing one.
  const chineseChapterNavigationPage = await context.newPage();
  await chineseChapterNavigationPage.setViewportSize({ width: 390, height: 844 });
  await chineseChapterNavigationPage.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F06-model-selection-ZH.md&lang=zh`, { waitUntil: 'networkidle' });
  await chineseChapterNavigationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  await chineseChapterNavigationPage.locator('[data-reader-next]').click();
  await chineseChapterNavigationPage.waitForURL(/reader\.html\?path=book%2Fchapters%2F07-skills-plugins-and-tools-ZH\.md&lang=zh$/);
  await chineseChapterNavigationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await chineseChapterNavigationPage.locator('[data-reader-language]').inputValue(), 'zh', 'Chinese chapter navigation loses the requested interface language');
  assert.match(await chineseChapterNavigationPage.locator('[data-reader-article] h1').innerText(), /Skill、Plugin、MCP 和工具如何分工/, 'Chinese chapter navigation does not open the available Chapter 7 candidate translation');
  assert.equal(
    (await chineseChapterNavigationPage.locator('[data-reader-banner]').innerText()).includes('\u72ec\u7acb\u8bed\u8a00\u5ba1\u6821'),
    true,
    'Chinese Chapter 7 does not disclose pending independent language review',
  );
  await chineseChapterNavigationPage.locator('[data-reader-next]').click();
  await chineseChapterNavigationPage.waitForURL(/reader\.html\?path=book%2Fchapters%2F08-full-lifecycle-workflow-ZH\.md&lang=zh$/);
  await chineseChapterNavigationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(
    await chineseChapterNavigationPage.locator('[data-reader-article] h1').innerText(),
    /从定义到交付/,
    'Chinese chapter navigation does not open the available Chapter 8 candidate translation',
  );
  assert.equal(
    (await chineseChapterNavigationPage.locator('[data-reader-banner]').innerText()).includes('\u72ec\u7acb\u8bed\u8a00\u5ba1\u6821'),
    true,
    'Chinese Chapter 8 does not disclose pending independent language review',
  );
  await chineseChapterNavigationPage.locator('[data-reader-next]').click();
  await chineseChapterNavigationPage.waitForURL(/reader\.html\?path=book%2Fchapters%2F09-verification-and-recovery-ZH\.md&lang=zh$/);
  await chineseChapterNavigationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(
    await chineseChapterNavigationPage.locator('[data-reader-article] h1').innerText(),
    /验证、怀疑与恢复/,
    'Chinese chapter navigation does not open the available Chapter 9 candidate translation',
  );
  await chineseChapterNavigationPage.locator('[data-reader-next]').click();
  await chineseChapterNavigationPage.waitForURL(/reader\.html\?path=book%2Fchapters%2F10-planning-and-slicing-ZH\.md&lang=zh$/);
  await chineseChapterNavigationPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.match(
    await chineseChapterNavigationPage.locator('[data-reader-article] h1').innerText(),
    /规划与竖向切片/,
    'Chinese chapter navigation does not open the available Chapter 10 candidate translation',
  );
  assert.equal(
    (await chineseChapterNavigationPage.locator('[data-reader-banner]').innerText()).includes('\u72ec\u7acb\u8bed\u8a00\u5ba1\u6821'),
    true,
    'Chinese Chapter 10 does not disclose pending independent language review',
  );
  await noHorizontalOverflow(chineseChapterNavigationPage, 'mobile Chinese Chapter 10 Reader');
  await chineseChapterNavigationPage.close();

  await page.getByText('Evidence note for this page').click();
  assert.equal(await page.locator('[data-reader-trust-reviewed]').getAttribute('datetime'), '2026-08-12', 'Reader omits the last actual evidence review date');
  assert.match(await page.locator('.reader-trust-boundary').innerText(), /not a freshness guarantee/i, 'Reader does not bound the scheduled review date');

  const chineseLabPage = await context.newPage();
  await chineseLabPage.goto(`${origin}/site/reader.html?path=book%2Flabs%2Flab-001-first-safe-task-EN.md&lang=zh`, { waitUntil: 'networkidle' });
  await chineseLabPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.equal(await chineseLabPage.locator('[data-reader-next] .reader-pagination-kicker').innerText(), '下一个实验', 'Chinese Lab navigation labels the next Lab as previous');
  assert.equal(await chineseLabPage.locator('[data-reader-next-title]').innerText(), '实验 002 · 把一个愿望变成任务协议', 'Chinese Lab navigation does not use the localized adjacent Lab title');
  assert.match(await chineseLabPage.title(), /^实验 001：/, 'Chinese Lab keeps an English browser-tab title after the localized source is rendered');
  assert.match(await chineseLabPage.locator('[data-reader-chapter-label]').innerText(), /^实验 001：/, 'Chinese Lab keeps an English reading-route label after the localized source is rendered');
  await chineseLabPage.close();

  const chineseLab004Page = await context.newPage();
  await chineseLab004Page.setViewportSize({ width: 390, height: 844 });
  await chineseLab004Page.goto(`${origin}/site/reader.html?path=book%2Flabs%2Flab-004-skill-selection-ZH.md&lang=zh`, { waitUntil: 'networkidle' });
  await chineseLab004Page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await chineseLab004Page.locator('[data-reader-language]').inputValue(), 'zh', 'Chinese Lab 004 loses the requested interface language');
  assert.match(await chineseLab004Page.title(), /^实验 004：选择最小有用能力/, 'Chinese Lab 004 keeps an English browser-tab title');
  assert.equal(await chineseLab004Page.locator('[data-reader-next] .reader-pagination-kicker').innerText(), '下一个实验', 'Chinese Lab 004 does not label the adjacent Lab in Chinese');
  assert.equal(await chineseLab004Page.locator('[data-reader-next-title]').innerText(), '实验 005 · 把重复方法沉淀为边界明确的 Skill', 'Chinese Lab 004 exposes the adjacent Chinese title before the same-locale unavailable state');
  assert.equal(
    (await chineseLab004Page.locator('[data-reader-banner]').innerText()).includes('\u72ec\u7acb\u8bed\u8a00\u5ba1\u6821'),
    true,
    'Chinese Lab 004 does not disclose pending independent language review',
  );
  await noHorizontalOverflow(chineseLab004Page, 'mobile Chinese Lab 004 Reader');
  await chineseLab004Page.close();

  const chineseBookEntryPage = await context.newPage();
  await chineseBookEntryPage.setViewportSize({ width: 390, height: 844 });
  await chineseBookEntryPage.goto(`${origin}/site/reader.html?path=book%2FREADME-ZH.md&lang=zh`, { waitUntil: 'networkidle' });
  await chineseBookEntryPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await chineseBookEntryPage.locator('[data-reader-language]').inputValue(), 'zh', 'Chinese book entry loses the requested interface language');
  const chineseFirstChapterLink = chineseBookEntryPage.locator('[data-reader-article] a[href*="book%2Fchapters%2F01-gpt-and-codex-ZH.md&lang=zh"]');
  assert.ok(await chineseFirstChapterLink.count() >= 1, 'Chinese book entry does not route the first chapter to its available Chinese source');
  assert.equal(await chineseFirstChapterLink.first().isVisible(), true, 'Chinese book entry does not visibly expose the first Chinese chapter route');
  assert.match(await chineseBookEntryPage.locator('[data-reader-article]').innerText(), /不会静默跳到英文正文|不会自动切换到英文正文/, 'Chinese book entry does not state the no-English-content-fallback boundary');
  await noHorizontalOverflow(chineseBookEntryPage, 'mobile Chinese book entry');
  await chineseBookEntryPage.close();

    // A localized page may reference an English-only governance record. The
  // Reader must preserve the selected locale and render its local unavailable
  // state rather than silently presenting the English Markdown as Chinese.
  const englishOnlyResearchPath = 'docs%2Fresearch%2Funiversal-first-turn-prompt-contract-2026-08-13.md';
  const chineseResearchBoundaryPage = await context.newPage();
  await chineseResearchBoundaryPage.setViewportSize({ width: 390, height: 844 });
  await chineseResearchBoundaryPage.goto(`${origin}/site/reader.html?path=${englishOnlyResearchPath}&lang=zh`, { waitUntil: 'networkidle' });
  await chineseResearchBoundaryPage.locator('[data-reader-article][aria-busy="false"]').waitFor();
  const localizedUnavailable = chineseResearchBoundaryPage.locator('[data-reader-article] [role="alert"]');
  await localizedUnavailable.waitFor();
  assert.match(await localizedUnavailable.innerText(), /暂时没有.*版本|不会自动切换到其他语言/, 'Chinese research route does not explain the same-locale unavailable state');
  assert.equal(await chineseResearchBoundaryPage.locator('[data-reader-article] h1').count(), 0, 'Chinese research route renders the English-only document body');
  const localizedResearchRecovery = localizedUnavailable.getByRole('link', { name: '返回总览' });
  assert.match(await localizedResearchRecovery.getAttribute('href'), /index\.html\?lang=zh$/, 'Chinese research boundary recovery does not preserve the selected locale');
  await noHorizontalOverflow(chineseResearchBoundaryPage, 'mobile Chinese research unavailable state');
  await chineseResearchBoundaryPage.close();

// The same protection is a Reader contract for every non-English route,
  // including locales that currently have only their starter path translated.
  for (const locale of ['zh', 'es', 'ja', 'ko', 'de']) {
    const untranslatedProjectPage = await context.newPage();
    await untranslatedProjectPage.goto(`${origin}/site/reader.html?path=${englishOnlyResearchPath}&lang=${locale}`, { waitUntil: 'networkidle' });
    await untranslatedProjectPage.locator('[data-reader-article] [role="alert"]').waitFor();
    assert.equal(await untranslatedProjectPage.locator('[data-reader-language]').inputValue(), locale, `${locale} untranslated project route loses the selected locale`);
    assert.equal(await untranslatedProjectPage.locator('[data-reader-article] h1').count(), 0, `${locale} untranslated project route renders an English document body`);
    const recovery = untranslatedProjectPage.locator('[data-reader-article] [role="alert"]').getByRole('link');
    assert.match(await recovery.getAttribute('href'), new RegExp(`index\\.html\\?lang=${locale}$`), `${locale} untranslated project route loses its local overview recovery`);
    await untranslatedProjectPage.close();
  }

  const chineseSafeFixturePage = await context.newPage();
  await chineseSafeFixturePage.setViewportSize({ width: 390, height: 844 });
  await chineseSafeFixturePage.goto(`${origin}/site/reader.html?path=book%2Froutes%2Ffirst-safe-change-ZH.md&lang=zh`, { waitUntil: 'networkidle' });
  await chineseSafeFixturePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const chineseLab001Link = chineseSafeFixturePage.locator('[data-reader-article] a[href*="book%2Flabs%2Flab-001-first-safe-task-ZH.md&lang=zh"]');
  assert.equal(await chineseLab001Link.isVisible(), true, 'Chinese safe-fixture route does not continue to the available Chinese Lab 001');
  await noHorizontalOverflow(chineseSafeFixturePage, 'mobile Chinese safe-fixture route');
  await chineseSafeFixturePage.close();

  const localizedSafeFixtureRoutes = [
    ['es', 'Primer cambio seguro', 'Haz un cambio seguro de README'],
    ['ja', '最初の安全な変更', '安全な README の変更を一つ行う'],
    ['ko', '첫 번째 안전한 변경', '안전한 README 변경 하나 만들기'],
    ['de', 'Die erste sichere Änderung', 'Eine sichere README-Änderung vornehmen'],
  ];
  for (const [locale, heading, labHeading] of localizedSafeFixtureRoutes) {
    const localizedRoutePage = await context.newPage();
    await localizedRoutePage.setViewportSize({ width: 390, height: 844 });
    await localizedRoutePage.goto(`${origin}/site/reader.html?path=book%2Froutes%2Ffirst-safe-change-${locale.toUpperCase()}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await localizedRoutePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.equal(await localizedRoutePage.locator('[data-reader-language]').inputValue(), locale, `${locale} safe-fixture route loses the requested interface language`);
    assert.match(await localizedRoutePage.locator('[data-reader-article] h1').innerText(), new RegExp(heading), `${locale} safe-fixture route does not render its localized source`);
    const nextLocalizedLab = localizedRoutePage.locator(`[data-reader-article] a[href*="book%2Flabs%2Flab-001-first-safe-task-${locale.toUpperCase()}.md&lang=${locale}"]`);
    assert.equal(await nextLocalizedLab.isVisible(), true, `${locale} safe-fixture route does not expose the same-locale Lab 001 continuation`);
    await nextLocalizedLab.click();
    await localizedRoutePage.waitForURL(new RegExp(`reader\\.html\\?path=book%2Flabs%2Flab-001-first-safe-task-${locale.toUpperCase()}\\.md&lang=${locale}$`));
    await localizedRoutePage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.match(await localizedRoutePage.locator('[data-reader-article] h1').innerText(), new RegExp(labHeading), `${locale} safe-fixture continuation does not render the localized Lab 001 source`);
    assert.equal(await localizedRoutePage.locator('[data-reader-language]').inputValue(), locale, `${locale} safe-fixture continuation changes the requested interface language`);
    await noHorizontalOverflow(localizedRoutePage, `mobile ${locale} safe-fixture and Lab 001 continuation`);
    await localizedRoutePage.close();
  }

  const chineseSearchPage = await context.newPage();
  await chineseSearchPage.setViewportSize({ width: 390, height: 844 });
  await chineseSearchPage.goto(`${origin}/site/index.html?lang=zh`, { waitUntil: 'networkidle' });
  await chineseSearchPage.locator('[data-site-search-input]').fill('安全任务');
  await chineseSearchPage.locator('[data-site-search] button[type="submit"]').click();
  const chineseFirstResult = chineseSearchPage.locator('[data-search-results] .search-result').first();
  await chineseFirstResult.waitFor();
  assert.match(await chineseFirstResult.innerText(), /完成第一个安全、可验证的任务/i, 'Chinese task search does not put the Chapter 2 candidate translation first');
  assert.match(
    await chineseFirstResult.locator('a').getAttribute('href'),
    /reader\.html\?path=book%2Fchapters%2F02-first-safe-task-ZH\.md&lang=zh$/,
    'Chinese task search does not open the available Chapter 2 candidate translation',
  );
  const chineseSearchPosition = await chineseSearchPage.evaluate(() => {
    const header = document.querySelector('[data-header]');
    const heading = document.querySelector('[data-search-panel] h2');
    return {
      headerHeight: header?.getBoundingClientRect().height || 0,
      headerPosition: header ? getComputedStyle(header).position : 'static',
      headingTop: heading?.getBoundingClientRect().top || 0,
    };
  });
  if (chineseSearchPosition.headerPosition === 'sticky' || chineseSearchPosition.headerPosition === 'fixed') {
    assert.ok(
      chineseSearchPosition.headingTop >= chineseSearchPosition.headerHeight + 8,
      `mobile search heading is obscured by the sticky header: ${JSON.stringify(chineseSearchPosition)}`,
    );
  } else {
    assert.ok(
      chineseSearchPosition.headingTop >= 0,
      `mobile search heading starts outside the visible document flow: ${JSON.stringify(chineseSearchPosition)}`,
    );
  }
  await noHorizontalOverflow(chineseSearchPage, 'mobile Chinese search');
  await chineseFirstResult.locator('a').click();
  await chineseSearchPage.waitForURL(/reader\.html\?path=book%2Fchapters%2F02-first-safe-task-ZH\.md&lang=zh$/);
  await chineseSearchPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await chineseSearchPage.locator('[data-reader-language]').inputValue(), 'zh', 'Chinese candidate Reader loses the requested interface language');
  const chineseCandidateStatus = chineseSearchPage.locator('[data-reader-banner]');
  await chineseCandidateStatus.waitFor();
  assert.equal(
    (await chineseCandidateStatus.innerText()).includes('\u72ec\u7acb\u8bed\u8a00\u5ba1\u6821'),
    true,
    'Chinese candidate Reader does not disclose pending independent language review',
  );
  await noHorizontalOverflow(chineseSearchPage, 'mobile Chinese candidate Reader');
  await chineseSearchPage.close();

  const mobileSkillsPage = await context.newPage();
  await mobileSkillsPage.setViewportSize({ width: 390, height: 844 });
  await mobileSkillsPage.goto(`${origin}/site/?lang=en`, { waitUntil: 'networkidle' });
  assert.equal(
    await mobileSkillsPage.locator('.site-header').evaluate((header) => getComputedStyle(header).position),
    'static',
    'mobile home header remains sticky and consumes the reading viewport',
  );
  const mobileSkillsSection = mobileSkillsPage.locator('#skills');
  await mobileSkillsSection.scrollIntoViewIfNeeded();
  await noHorizontalOverflow(mobileSkillsPage, 'mobile Skill index');
  const mobileSkillCatalog = mobileSkillsSection.locator('.skill-catalog');
  assert.equal(await mobileSkillCatalog.getAttribute('open'), null, 'mobile Skill registry is expanded before a reader asks for it');
  assert.equal(await mobileSkillsSection.getByRole('link', { name: 'Adversarial Project Review' }).isVisible(), false, 'mobile Skill registry exposes the full inventory before it is opened');
  await mobileSkillCatalog.locator('summary').click();
  assert.equal(
    await mobileSkillsSection.getByRole('link', { name: 'Adversarial Project Review' }).isVisible(),
    true,
    'mobile Skill index hides Adversarial Project Review',
  );
  assert.equal(
    await mobileSkillsSection.locator('.skill-grid a').filter({ hasText: 'Request Escalation' }).isVisible(),
    true,
    'mobile Skill index hides Request Escalation',
  );
  assert.equal(
    await mobileSkillsSection.locator('.skill-grid a').filter({ hasText: 'LLM Comparison Protocol' }).isVisible(),
    true,
    'mobile Skill index hides LLM Comparison Protocol',
  );
  assert.equal(
    await mobileSkillsSection.locator('.skill-grid a').filter({ hasText: 'Platform Fact Watch' }).isVisible(),
    true,
    'mobile Skill index hides Platform Fact Watch',
  );
  await mobileSkillsSection.screenshot({ path: path.join(visualEvidenceDirectory, 'skills-mobile.png') });
  await mobileSkillsPage.close();

  await page.goto(`${origin}/site/reader.html?path=book%2Froutes%2Ffirst-safe-change-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await page.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.match(await page.locator('[data-reader-article] h1').innerText(), /First Safe Change/i, 'Reader did not render the First Safe Change route');
  assert.match(await page.locator('[data-reader-article]').innerText(), /FIRST_SAFE_CHANGE_FAILED/, 'First Safe Change route does not expose the intentional baseline');
  assert.equal(await page.getByRole('link', { name: /Lab 001.*Make one safe README change/i }).isVisible(), true, 'First Safe Change route does not continue to Lab 001');
  await noHorizontalOverflow(page, 'mobile First Safe Change route');

  await page.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#recovery-route`, { waitUntil: 'networkidle' });
  await page.locator('[data-reader-article][aria-busy="false"]').waitFor();
  assert.match(await page.locator('[data-reader-article] h1').innerText(), /optional application practice: language, work, and research/i, 'Reader did not render the public optional application practice title');
  assert.match(await page.locator('[data-reader-article]').innerText(), /learner evidence:\s*not_run/i, 'Beginner Practice Pack does not expose its learner-evidence boundary');
  assert.equal(await page.getByRole('heading', { name: /advanced — recovery route when the reply already missed/i }).isVisible(), true, 'Post-failure recovery route is not discoverable');
  assert.equal(await page.locator('[data-reader-article] a[href="#general-skill-practice-route"]').count(), 1, 'recovery route retains a stale Route B anchor');
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
  await noHorizontalOverflow(page, 'mobile optional application practice guide');

  const boundaryCardPage = await context.newPage();
  await boundaryCardPage.setViewportSize({ width: 390, height: 844 });
  await boundaryCardPage.goto(`${origin}/site/reader.html?path=book%2Fcommunication-clinic-EN.md&lang=en#four-line-safety-card`, { waitUntil: 'networkidle' });
  await boundaryCardPage.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  const boundaryCardHeading = boundaryCardPage.getByRole('heading', { name: /advanced — boundary card before you share, search, or act/i });
  assert.equal(await boundaryCardHeading.isVisible(), true, 'Boundary Card is not discoverable in Reader');
  assert.equal(await boundaryCardPage.locator('#four-line-safety-card').count(), 1, 'Reader did not preserve the legacy Boundary Card fragment');
  const boundaryCardPosition = await boundaryCardPage.locator('#four-line-safety-card').evaluate((target) => target.getBoundingClientRect().top);
  assert.ok(boundaryCardPosition >= 0 && boundaryCardPosition < 260, `Reader did not restore the Boundary Card fragment into the first visible reading band: ${boundaryCardPosition}`);
  assert.match(await boundaryCardPage.locator('[data-reader-article]').innerText(), /input status: \[authorized instruction \| external data \| unknown\]/i, 'Boundary Card omits the input-status boundary');
  assert.match(await boundaryCardPage.locator('[data-reader-article]').innerText(), /unknown destination/i, 'Boundary Card omits the data-egress stop');
  const boundaryCardVisual = boundaryCardPage.locator('img[alt*="Boundary Card for deciding what may enter"]');
  assert.match(await boundaryCardVisual.getAttribute('src'), /assets\/teaching\/conversation-safety-card-red-black\.svg$/, 'Boundary Card does not retain its original teaching visual');
  const boundaryCardVisualLink = boundaryCardPage.locator('.reader-image-link').filter({ has: boundaryCardVisual });
  assert.match(await boundaryCardVisualLink.locator('.reader-visual-thesis').innerText(), /Boundary Card for deciding what may enter/i, 'Boundary Card lacks a mobile-readable visual thesis');
  assert.equal(await boundaryCardVisual.isVisible(), false, 'Mobile Reader shrinks the dense Boundary Card instead of offering a focused full-size route');
  assert.equal(await boundaryCardPage.getByRole('link', { name: /open full-size visual: a boundary card for deciding what may enter/i }).isVisible(), true, 'Boundary Card lacks an accessible full-size visual route');
  assert.equal(await boundaryCardPage.getByRole('link', { name: /cross-platform boundary card source receipt/i }).isVisible(), true, 'Boundary Card does not expose its source receipt');
  await noHorizontalOverflow(boundaryCardPage, 'mobile Boundary Card');
  await boundaryCardVisualLink.screenshot({ path: path.join(visualEvidenceDirectory, 'boundary-card-mobile-visual-route.png') });
  await boundaryCardPage.close();

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
  assert.equal(await readerRetryPage.locator('.reader-aside').isVisible(), true, 'Reader does not restore page details after a successful retry');
  await readerRetryPage.close();

  await page.goto(`${origin}/site/reader.html?path=private%2Fsecret.md&lang=en`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('alert').waitFor();
  assert.equal(await page.getByRole('alert').count(), 1, 'Reader announces one error through multiple assertive regions');
  assert.equal(await page.getByRole('alert').getAttribute('aria-live'), 'assertive', 'Reader error is not an assertive live region');
  assert.match(await page.getByRole('alert').innerText(), /does not name an allowed project source file/i, 'Reader invalid-path failure is not explicit');
  assert.equal(await page.locator('[data-reader-banner]').isHidden(), true, 'Reader repeats an invalid-path error above the actionable error card');
  assert.equal(await page.locator('[data-reader-orientation]').isHidden(), true, 'Reader shows an empty mobile chapter control after an invalid path');
  assert.equal(await page.locator('[data-reader-mobile-page-toc]').isHidden(), true, 'Reader shows an empty mobile page-contents control after an invalid path');
  assert.equal(await page.locator('.reader-aside').isHidden(), true, 'Reader shows empty page details after an invalid path');
  const invalidPathRecovery = page.locator('[data-reader-article]').getByRole('link', { name: 'Back to overview' });
  assert.match(await invalidPathRecovery.getAttribute('href'), /index\.html\?lang=en$/, 'Reader invalid-path recovery does not preserve the current interface language');
  await invalidPathRecovery.click();
  await page.waitForURL(/site\/index\.html\?lang=en$/);
  await page.locator('[data-route-decision]').waitFor();
  assert.equal(await page.locator('[data-route-decision]').isVisible(), true, 'Reader invalid-path recovery does not reach the English route chooser');

  await page.goto(`${origin}/site/reader.html?path=private%2Fsecret.md&lang=zh`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('alert').waitFor();
  assert.equal(await page.locator('[data-reader-language]').inputValue(), 'zh', 'Reader invalid-path state resets the requested interface language');
  const chineseInvalidPathRecovery = page.locator('[data-reader-article]').getByRole('link', { name: '返回总览' });
  assert.match(await chineseInvalidPathRecovery.getAttribute('href'), /index\.html\?lang=zh$/, 'Reader invalid-path recovery does not preserve Chinese interface language');
  await chineseInvalidPathRecovery.click();
  await page.waitForURL(/site\/index\.html\?lang=zh$/);
  await page.locator('[data-route-decision]').waitFor();
  assert.equal(await page.locator('[data-route-decision]').isVisible(), true, 'Reader invalid-path recovery does not reach the Chinese route chooser');

  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join(' | ')}`);
  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  await context.tracing.stop();
  console.log('BROWSER_SMOKE_OK initial_search_requests=0 lazy_search_requests=1 desktop=1280 mobile=390 readers=chapter-02,first-safe-change,beginner-practice-pack,boundary-card,ai-safety-field-signals,universal-first-turn,first-win-pilot-protocol,newcomer-entry-protocol,capacity-interruption-case invalid_path=blocked');
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
