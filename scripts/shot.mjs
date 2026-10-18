// Usage: node scripts/shot.mjs <baseUrl> <outDir> <width> <height> <fullPage:0|1> <path...>
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [base, out, w, h, full, ...paths] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
page.on('pageerror', (e) => errors.push(`${page.url()} pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`${page.url()} console: ${m.text()}`));
for (const p of paths) {
  await page.goto(base + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  if (full === '1') {
    // trigger whileInView reveals
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 600) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(700);
  }
  const name = (p.replace(/\//g, '_').replace(/^_/, '') || 'root') + `-${w}.png`;
  await page.screenshot({ path: `${out}/${name}`, fullPage: full === '1' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(name, overflow > 0 ? `OVERFLOW ${overflow}px` : 'ok');
}
console.log(errors.length ? errors.join('\n') : 'no console errors');
await browser.close();
