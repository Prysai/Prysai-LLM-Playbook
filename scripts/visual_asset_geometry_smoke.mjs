import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const playwrightModule = await import('playwright');
const { chromium } = playwrightModule.default ?? playwrightModule;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
const assets = [
  {
    asset: 'foundation-first-visit-route-red-black.svg',
    viewBox: '0 0 900 1400',
    textCount: 28,
    maxRight: 858,
  },
  {
    asset: 'llm-foundation-core-path-red-black.svg',
    viewBox: '0 0 900 1400',
    textCount: 23,
    maxRight: 858,
  },
  {
    asset: 'playbook-learning-journey-red-black.svg',
    viewBox: '0 0 1200 1600',
    textCount: 24,
    maxRight: 1140,
  },
  {
    asset: 'evidence-maturity-ladder-red-black.svg',
    viewBox: '0 0 900 1500',
    textCount: 31,
    maxRight: 858,
  },
];

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
  for (const definition of assets) {
    for (const locale of locales) {
      const relative = locale === 'en'
        ? `assets/teaching/${definition.asset}`
        : `assets/teaching/locales/${locale}/${definition.asset}`;
      const response = await page.goto(`${origin}/${relative}`, { waitUntil: 'load' });
      assert.equal(response?.status(), 200, `${locale} ${definition.asset} did not load`);
      const geometry = await page.locator('text').evaluateAll((nodes) => {
        const root = nodes[0]?.ownerSVGElement;
        if (!root) return { count: 0, viewBox: '', boxes: [] };
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
            top: Math.min(...points.map((point) => point.y)),
            bottom: Math.max(...points.map((point) => point.y)),
          };
        });
        return {
          count: boxes.length,
          viewBox: root.getAttribute('viewBox') || '',
          boxes,
        };
      });
      assert.equal(geometry.viewBox, definition.viewBox, `${locale} ${definition.asset} viewBox changed`);
      assert.equal(geometry.count, definition.textCount, `${locale} ${definition.asset} text-node count changed`);
      const viewBoxHeight = Number(definition.viewBox.split(' ')[3]);
      const overflowing = geometry.boxes
        .filter((box) => (
          box.left < -0.5
          || box.right > definition.maxRight + 0.5
          || box.top < -0.5
          || box.bottom > viewBoxHeight + 0.5
        ))
        .map((box) => box.index);
      assert.deepEqual(overflowing, [], `${locale} ${definition.asset} text escaped its frame`);
      results.push(`${locale}/${definition.asset}:right=${Math.max(...geometry.boxes.map((box) => box.right)).toFixed(2)}`);
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(`VISUAL_ASSET_GEOMETRY_OK assets=${assets.length} locales=${locales.length} ${results.join(' ')}`);
