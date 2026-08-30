import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const playwrightModule = await import('playwright');
const { chromium } = playwrightModule.default ?? playwrightModule;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const asset = 'evidence-maturity-ladder-red-black.svg';
const locales = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
const sourcePath = path.join(root, 'assets', 'teaching', asset);

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
  const relative = requestPath.replace(/^\/+/, '');
  const filePath = path.resolve(root, relative);
  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(400).end();
    return;
  }
  readFile(filePath)
    .then((body) => {
      const contentType = filePath.endsWith('.svg') ? 'image/svg+xml' : 'application/octet-stream';
      response.writeHead(200, { 'content-type': contentType });
      response.end(body);
    })
    .catch(() => response.writeHead(404).end());
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const results = [];

try {
  assert.equal(await readFile(sourcePath, 'utf8').then((svg) => (svg.match(/<text\b/gi) || []).length), 31, 'maturity ladder source text-node contract changed');
  for (const locale of locales) {
    const relative = locale === 'en'
      ? `assets/teaching/${asset}`
      : `assets/teaching/locales/${locale}/${asset}`;
    await page.goto(`${origin}/${relative}`, { waitUntil: 'load' });
    const geometry = await page.locator('text').evaluateAll((nodes) => {
      const root = nodes[0].ownerSVGElement;
      const rootInverse = root.getScreenCTM().inverse();
      const boxes = nodes.map((node, index) => {
        const box = node.getBBox();
        const matrix = node.getScreenCTM();
        const points = [
          new DOMPoint(box.x, box.y),
          new DOMPoint(box.x + box.width, box.y),
          new DOMPoint(box.x, box.y + box.height),
          new DOMPoint(box.x + box.width, box.y + box.height),
        ].map((point) => point.matrixTransform(matrix).matrixTransform(rootInverse));
        return {
          index: index + 1,
          left: Math.min(...points.map((point) => point.x)),
          right: Math.max(...points.map((point) => point.x)),
        };
      });
      return {
        count: boxes.length,
        minLeft: Math.min(...boxes.map((box) => box.left)),
        maxRight: Math.max(...boxes.map((box) => box.right)),
        // getBBox() reports each text node in its own SVG user space. Convert
        // every corner back through its screen transform so translated nodes
        // inside <g transform="..."> are checked in the root viewBox too.
        overflowing: boxes.filter((box) => box.left < 0 || box.right > 858).map((box) => box.index),
      };
    });
    assert.equal(geometry.count, 31, `${locale} maturity ladder text-node count changed`);
    assert.deepEqual(geometry.overflowing, [], `${locale} maturity ladder text escaped its frame`);
    results.push(`${locale}:maxRight=${geometry.maxRight.toFixed(2)}`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(`VISUAL_ASSET_GEOMETRY_OK asset=${asset} ${results.join(' ')}`);
