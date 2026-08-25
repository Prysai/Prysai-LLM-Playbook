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
  console.log(`READER_VISUAL_SMOKE_OK locales=${locales.length} lab=003 mobile=390 no_horizontal_overflow=1`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
