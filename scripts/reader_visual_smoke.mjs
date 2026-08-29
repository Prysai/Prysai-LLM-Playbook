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
// Keep this artifact isolated. build_pages_artifact.py swaps a sibling
// `._site-previous` directory during publication, so concurrent smoke tests
// must never point at the repository's shared `_site` directory.
const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'prysai-reader-visual-'));
const artifact = path.join(temporaryRoot, '_site');
const python = process.env.PYTHON || 'python';
const locales = [
  ['en', 'EN', 'Lab 003: Audit a completion claim', 'Keep a lab run small enough to check'],
  ['zh', 'ZH', '实验 003：审计一条完成声明', '让实验记录小到可以检查'],
  ['es', 'ES', 'Lab 003: Auditar una declaración de finalización', 'Mantén el experimento lo bastante acotado para comprobarlo'],
  ['ja', 'JA', 'Lab 003：完了宣言を監査する', '確認できる大きさに実験を絞る'],
  ['ko', 'KO', 'Lab 003: 완료 주장을 감사하기', '확인할 수 있을 만큼 실험 범위를 줄이기'],
  ['de', 'DE', 'Lab 003: Eine Fertigmeldung prüfen', 'Einen Versuch so klein halten, dass er prüfbar bleibt'],
  ['zh-tw', 'ZHTW', '實驗 003：審計一條完成宣告', '把實驗縮小到可以檢查'],
  ['fr', 'FR', 'Lab 003 : Auditer une affirmation de fin', 'Garder un essai assez petit pour être vérifiable'],
];
const documentLanguages = { zh: 'zh-CN', 'zh-tw': 'zh-TW' };
const readerOfficialSiteLabels = {
  en: 'Prysai official website', zh: 'Prysai 官网', es: 'Sitio web oficial de Prysai',
  ja: 'Prysai 公式サイト', ko: 'Prysai 공식 웹사이트', de: 'Offizielle Prysai-Website',
  'zh-tw': 'Prysai 官方網站', fr: 'Site officiel de Prysai',
};
const localizedVisualAssets = new Set([
  'llm-six-terms-to-one-check.svg', 'foundation-first-visit-route-red-black.svg',
  'llm-foundation-core-path-red-black.svg', 'playbook-learning-journey-red-black.svg',
  'reader-page-reading-loop-red-black.svg', 'first-task-evidence-bridge-red-black.svg',
  'recovery-decision-tree-red-black.svg', 'skill-trigger-boundary-decision-map.svg',
  'lifecycle-checkpoints.svg',
]);
const visualSrc = (locale, asset) => locale !== 'en' && localizedVisualAssets.has(asset)
  ? `../assets/teaching/locales/${locale}/${asset}`
  : `../assets/teaching/${asset}`;
const researchLocales = [
  ['en', 'EN'],
  ['zh', 'ZH'],
  ['es', 'ES'],
  ['ja', 'JA'],
  ['ko', 'KO'],
  ['de', 'DE'],
  ['zh-tw', 'ZHTW'],
  ['fr', 'FR'],
];
const skillLocales = [
  ['en', 'EN', 'A Skill must know when to yield'],
  ['zh', 'ZH', 'Skill 必须知道什么时候让出'],
  ['es', 'ES', 'Un Skill debe saber cuándo ceder'],
  ['ja', 'JA', 'Skill には、譲るべき時を判断する境界が要る'],
  ['ko', 'KO', 'Skill은 언제 물러나야 하는지도 알아야 합니다'],
  ['de', 'DE', 'Ein Skill muss auch wissen, wann er abgeben muss'],
  ['zh-tw', 'ZHTW', 'Skill 也必須知道何時讓出'],
  ['fr', 'FR', 'Un Skill doit aussi savoir quand céder la main'],
];
const firstTaskLocales = [
  ['en', 'EN', 'Lab 001: Make the first request usable', 'Make the first task checkable'],
  ['zh', 'ZH', '实验 001：让第一个请求变得可用', '让第一次任务可以检查'],
  ['es', 'ES', 'Lab 001: Haz un cambio seguro de README', 'Haz comprobable la primera tarea'],
  ['ja', 'JA', 'Lab 001: 安全な README の変更を一つ行う', '最初のタスクを確認できる形にする'],
  ['ko', 'KO', 'Lab 001: 안전한 README 변경 하나 만들기', '첫 작업을 확인 가능한 형태로 만들기'],
  ['de', 'DE', 'Lab 001: Eine sichere README-Änderung vornehmen', 'Die erste Aufgabe prüfbar machen'],
  ['zh-tw', 'ZHTW', '實驗 001：讓第一個請求變得可用', '讓第一次任務變得可檢查'],
  ['fr', 'FR', 'Lab 001 : Rendre la première demande exploitable', 'Rendre la première tâche vérifiable'],
];
const lifecycleLocales = [
  ['en', 'EN'], ['zh', 'ZH'], ['es', 'ES'], ['ja', 'JA'],
  ['ko', 'KO'], ['de', 'DE'], ['zh-tw', 'ZHTW'], ['fr', 'FR'],
];

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

const noHorizontalOverflow = async (label) => {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(metrics.scrollWidth <= metrics.innerWidth, `${label} has horizontal overflow: ${JSON.stringify(metrics)}`);
};

try {
  for (const [locale, suffix, heading, thesis] of locales) {
    await page.goto(`${origin}/site/reader.html?path=book%2Flabs%2Flab-003-evidence-review-${suffix}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'), documentLanguages[locale] || locale, `${locale} Reader changed the document language`);
    assert.equal((await page.locator('[data-reader-article] h1').innerText()).trim(), heading, `${locale} Lab 003 heading is not localized`);

    const officialSite = page.locator('.reader-footer-site');
    assert.equal(await officialSite.count(), 1, `${locale} Reader footer is missing the official-site link`);
    assert.equal(await officialSite.getAttribute('href'), 'https://prysai.com/', `${locale} Reader footer official-site URL changed`);
    assert.equal((await officialSite.textContent() || '').trim(), readerOfficialSiteLabels[locale], `${locale} Reader footer official-site label is not localized`);
    assert.equal(await officialSite.getAttribute('target'), '_blank', `${locale} Reader footer official-site link should open separately`);
    assert.equal(await officialSite.getAttribute('rel'), 'noreferrer', `${locale} Reader footer official-site link is missing its referrer boundary`);

    const visual = page.locator('[data-reader-inline-visual]');
    assert.equal(await visual.count(), 1, `${locale} Lab 003 is missing its inline teaching visual`);
    assert.match(await visual.getAttribute('data-reader-inline-visual') || '', /experiment-record-anatomy-red-black\.svg$/, `${locale} Lab 003 selected the wrong teaching visual`);
    assert.equal((await visual.locator('.reader-visual-thesis').innerText()).includes(thesis), true, `${locale} Lab 003 visual thesis is not localized`);
    assert.notEqual((await visual.locator('img').getAttribute('alt') || '').trim(), '', `${locale} Lab 003 visual has no alternative text`);
    assert.match(await visual.locator('img').getAttribute('src') || '', /assets\/teaching\/experiment-record-anatomy-red-black\.svg$/, `${locale} Lab 003 visual asset is missing`);
    assert.notEqual((await visual.locator('.reader-visual-explanation li').textContent() || '').trim(), '', `${locale} Lab 003 visual has no text explanation`);
    assert.notEqual((await visual.locator('.reader-inline-visual-boundary').innerText()).trim(), '', `${locale} Lab 003 visual has no evidence boundary`);

    const related = page.locator('[data-reader-related-visuals]');
    assert.equal(await related.isVisible(), true, `${locale} Lab 003 related visuals are not discoverable`);
    assert.equal(await related.locator('.reader-related-visual-card').count(), 2, `${locale} Lab 003 related visual sequence changed`);
    assert.notEqual((await related.locator('[data-reader-related-visuals-boundary]').textContent() || '').trim(), '', `${locale} Lab 003 related visuals have no evidence boundary`);
    await noHorizontalOverflow(`${locale} Lab 003 Reader`);
  }

  for (const [locale, suffix] of researchLocales) {
    await page.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F15-research-track-${suffix}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.notEqual((await page.locator('[data-reader-article] h1').innerText()).trim(), '', `${locale} Chapter 15 has no localized heading`);

    const related = page.locator('[data-reader-related-visuals]');
    assert.equal(await related.isVisible(), true, `${locale} Chapter 15 related visuals are not discoverable`);
    assert.equal(await related.locator('.reader-related-visual-card').count(), 2, `${locale} Chapter 15 related visual sequence changed`);
    const inlineVisual = page.locator('[data-reader-inline-visual]');
    assert.equal(await inlineVisual.count(), 1, `${locale} Chapter 15 is missing its primary teaching visual`);
    const fallbackState = await inlineVisual.locator('img').evaluate((image) => {
      const note = image.closest('a')?.querySelector('.visual-locale-note');
      return { status: image.dataset.visualLocaleStatus, note: note?.textContent || '', hidden: note?.hidden ?? true };
    });
    assert.equal(fallbackState.status, locale === 'en' ? 'source' : 'english-fallback', `${locale} Chapter 15 fallback visual status is not explicit`);
    assert.equal(fallbackState.hidden, locale === 'en', `${locale} Chapter 15 fallback disclosure visibility is incorrect`);
    if (locale !== 'en') assert.notEqual(fallbackState.note.trim(), '', `${locale} Chapter 15 fallback visual has no localized disclosure`);
    const maturityCard = related.locator('img[src*="evidence-maturity-ladder-red-black.svg"]');
    assert.equal(await maturityCard.count(), 1, `${locale} Chapter 15 is missing the evidence maturity ladder`);
    assert.notEqual((await maturityCard.getAttribute('alt') || '').trim(), '', `${locale} evidence maturity ladder has no localized alternative text`);
    assert.notEqual((await related.locator('[data-reader-related-visuals-boundary]').textContent() || '').trim(), '', `${locale} Chapter 15 related visuals have no evidence boundary`);
    await noHorizontalOverflow(`${locale} Chapter 15 Reader`);
  }

  for (const [locale, suffix, heading, thesis] of firstTaskLocales) {
    await page.goto(`${origin}/site/reader.html?path=book%2Flabs%2Flab-001-first-safe-task-${suffix}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    assert.equal((await page.locator('[data-reader-article] h1').innerText()).trim(), heading, `${locale} Lab 001 heading is not localized`);

    const visual = page.locator('[data-reader-inline-visual]');
    assert.equal(await visual.count(), 1, `${locale} Lab 001 is missing its inline teaching visual`);
    assert.match(await visual.getAttribute('data-reader-inline-visual') || '', /first-task-evidence-bridge-red-black\.svg$/, `${locale} Lab 001 selected the wrong teaching visual`);
    assert.equal((await visual.locator('.reader-visual-thesis').innerText()).includes(thesis), true, `${locale} Lab 001 visual thesis is not localized`);
    assert.notEqual((await visual.locator('img').getAttribute('alt') || '').trim(), '', `${locale} Lab 001 visual has no alternative text`);
    assert.equal(await visual.locator('img').getAttribute('src'), visualSrc(locale, 'first-task-evidence-bridge-red-black.svg'), `${locale} Lab 001 visual asset is not resolved for the selected language`);
    assert.notEqual((await visual.locator('.reader-visual-explanation li').textContent() || '').trim(), '', `${locale} Lab 001 visual has no text explanation`);
    assert.notEqual((await visual.locator('.reader-inline-visual-boundary').innerText()).trim(), '', `${locale} Lab 001 visual has no evidence boundary`);
    await noHorizontalOverflow(`${locale} Lab 001 Reader`);
  }

  for (const [locale, suffix] of lifecycleLocales) {
    await page.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F08-full-lifecycle-workflow-${suffix}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    const visual = page.locator('[data-reader-inline-visual]');
    assert.equal(await visual.count(), 1, `${locale} Chapter 8 is missing its lifecycle teaching visual`);
    assert.match(await visual.getAttribute('data-reader-inline-visual') || '', /lifecycle-checkpoints\.svg$/, `${locale} Chapter 8 selected the wrong teaching visual`);
    const image = visual.locator('img');
    assert.notEqual((await image.getAttribute('alt') || '').trim(), '', `${locale} Chapter 8 lifecycle visual has no alternative text`);
    assert.equal(await image.getAttribute('src'), visualSrc(locale, 'lifecycle-checkpoints.svg'), `${locale} Chapter 8 lifecycle visual did not resolve to the selected locale`);
    const imageState = await image.evaluate((element) => ({
      complete: element.complete,
      naturalWidth: element.naturalWidth,
      status: element.dataset.visualLocaleStatus,
      locale: element.dataset.visualLocale,
      asset: element.dataset.visualAsset,
    }));
    assert.equal(imageState.complete, true, `${locale} Chapter 8 lifecycle visual did not finish loading`);
    assert.ok(imageState.naturalWidth > 0, `${locale} Chapter 8 lifecycle visual has no rendered pixels`);
    assert.equal(imageState.status, locale === 'en' ? 'source' : 'localized', `${locale} Chapter 8 lifecycle visual status is not explicit`);
    assert.equal(imageState.locale, locale, `${locale} Chapter 8 lifecycle visual reports the wrong locale`);
    assert.equal(imageState.asset, 'lifecycle-checkpoints.svg', `${locale} Chapter 8 lifecycle visual reports the wrong asset`);
    assert.notEqual((await visual.locator('.reader-visual-thesis').innerText()).trim(), '', `${locale} Chapter 8 lifecycle visual has no localized reading thesis`);
    assert.notEqual((await visual.locator('.reader-visual-explanation').innerText()).trim(), '', `${locale} Chapter 8 lifecycle visual has no text explanation`);
    assert.notEqual((await visual.locator('.reader-inline-visual-boundary').innerText()).trim(), '', `${locale} Chapter 8 lifecycle visual has no evidence boundary`);
    await noHorizontalOverflow(`${locale} Chapter 8 Reader`);
  }

  for (const [locale, suffix, thesis] of skillLocales) {
    await page.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F11-designing-a-skill-${suffix}.md&lang=${locale}`, { waitUntil: 'networkidle' });
    await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
    const visual = page.locator('[data-reader-inline-visual]');
    assert.equal(await visual.count(), 1, `${locale} Chapter 11 is missing its inline teaching visual`);
    assert.match(await visual.getAttribute('data-reader-inline-visual') || '', /skill-trigger-boundary-decision-map\.svg$/, `${locale} Chapter 11 selected the wrong teaching visual`);
    assert.equal((await visual.locator('.reader-visual-thesis').innerText()).includes(thesis), true, `${locale} Chapter 11 Skill boundary thesis is not localized`);
    assert.notEqual((await visual.locator('img').getAttribute('alt') || '').trim(), '', `${locale} Chapter 11 Skill boundary visual has no alternative text`);
    assert.equal(await visual.locator('img').getAttribute('src'), visualSrc(locale, 'skill-trigger-boundary-decision-map.svg'), `${locale} Chapter 11 Skill boundary asset is not resolved for the selected language`);
    assert.notEqual((await visual.locator('.reader-visual-explanation li').textContent() || '').trim(), '', `${locale} Chapter 11 Skill boundary visual has no text explanation`);
    assert.notEqual((await visual.locator('.reader-inline-visual-boundary').innerText()).trim(), '', `${locale} Chapter 11 Skill boundary visual has no evidence boundary`);
    const related = page.locator('[data-reader-related-visuals]');
    assert.equal(await related.isVisible(), true, `${locale} Chapter 11 related visuals are not discoverable`);
    assert.equal(await related.locator('.reader-related-visual-card').count(), 2, `${locale} Chapter 11 related visual sequence changed`);
    assert.equal(await page.locator('[data-reader-inline-concept-map]').evaluate((element) => element.open), false, `${locale} Chapter 11 concept map should start collapsed on mobile`);
    await noHorizontalOverflow(`${locale} Chapter 11 Reader`);
  }

  await page.setViewportSize({ width: 1024, height: 844 });
  await page.goto(`${origin}/site/reader.html?path=book%2Fchapters%2F11-designing-a-skill-EN.md&lang=en`, { waitUntil: 'networkidle' });
  await page.locator('[data-reader-article][aria-busy="false"] h1').waitFor();
  assert.equal(await page.locator('[data-reader-inline-concept-map]').evaluate((element) => element.open), true, 'EN Chapter 11 concept map should start open on desktop');
  await noHorizontalOverflow('EN Chapter 11 desktop Reader');
  await page.setViewportSize({ width: 390, height: 844 });
  console.log(`READER_VISUAL_SMOKE_OK locales=${locales.length} lab=003 first_task_locales=${firstTaskLocales.length} lifecycle_locales=${lifecycleLocales.length} research_locales=${researchLocales.length} skill_locales=${skillLocales.length} chapter=8,11,15 mobile=390 no_horizontal_overflow=1`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  await rm(temporaryRoot, { recursive: true, force: true });
}
