// Captures homepage previews for the portal cards: node scripts/previews.mjs [baseUrl]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const BASE = process.argv[2] || 'http://localhost:4199';
fs.mkdirSync('public/previews', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const d of process.argv[3] ? process.argv[3].split(',') : ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6', 'demo7', 'demo8', 'demo9', 'demo10']) {
  await page.goto(`${BASE}/${d}`, { waitUntil: 'networkidle' });
  for (let y = 0; y < 2400; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(150); }
  await page.evaluate(() => window.scrollTo(0, 0));
  // Hide presentation-only floating controls in previews.
  await page.addStyleTag({ content: 'a[aria-label^="Back to all concepts"], .chat-root, [data-preview-hide] { display:none !important }' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `public/previews/${d}.png`, fullPage: true, clip: { x: 0, y: 0, width: 1440, height: 2400 } });
  console.log('captured', d);
}
await browser.close();
