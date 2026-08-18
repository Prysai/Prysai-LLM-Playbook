import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const playwrightModule = process.env.PLAYWRIGHT_MODULE
  ? await import(pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href)
  : await import("playwright");
const { chromium } = playwrightModule.default ?? playwrightModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browserExecutable = process.env.BROWSER_EXECUTABLE?.trim();
const baseUrl = process.env.CASE_SCREENSHOT_BASE_URL?.trim()
  || "http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/";
const outputRoot = path.resolve(
  process.env.CASE_SCREENSHOT_OUTPUT_DIR?.trim() || path.join(root, "assets", "cases"),
);

await fs.mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch({
  ...(browserExecutable ? { executablePath: path.resolve(browserExecutable) } : {}),
  headless: true,
});

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
