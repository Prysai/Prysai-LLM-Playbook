import { chromium } from "file:///C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const baseUrl = "http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/";
const outputRoot = "C:\\Users\\Administrator\\Documents\\ChatGPT\\My Github\\assets\\cases";

const browser = await chromium.launch({ executablePath: edgePath, headless: true });

for (const capture of [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: capture.width, height: capture.height } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "load" });
  const metrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    documentWidth: document.documentElement.scrollWidth,
    documentHeight: document.documentElement.scrollHeight,
    title: document.title,
  }));

  await page.screenshot({
    path: `${outputRoot}/product-context-real-estate-${capture.name}.png`,
    fullPage: true,
  });

  console.log(JSON.stringify({ capture, metrics, consoleErrors, pageErrors }));
  await page.close();
}

await browser.close();
