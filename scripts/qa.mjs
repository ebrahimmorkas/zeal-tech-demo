// Browser QA sweep against a running build (default: vite preview on :4199).
// Usage: node scripts/qa.mjs [baseUrl]
// Checks every route of every demo at desktop + mobile widths for: correct demo layout,
// console/page errors, horizontal overflow, broken images, and stray (non-prefixed) links.
// Then exercises key interactions (mobile menu, forms, chat, filters, lightbox, history).
import { chromium } from 'playwright-core';

const BASE = process.argv[2] || 'http://localhost:4199';
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const demos = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'];
const sections = ['', 'about-us', 'group-companies', 'group-companies/nexora-energy-solutions', 'partner-with-us', 'partner-with-us?type=vendor', 'news', 'news/inside-our-precision-facility', 'future-roadmap', 'gallery', 'leadership', 'resource-centre', 'resource-centre/iot-condition-monitoring-primer', 'contact', 'missing-page'];

const failures = [];
const fail = (m) => {
  failures.push(m);
  console.log('  ✗', m);
};

const browser = await chromium.launch({ executablePath: CHROME });

async function sweep(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  let errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));

  const urls = ['/', '/demo6', ...demos.flatMap((d) => sections.map((s) => `/${d}${s ? '/' + s : ''}`))];
  for (const u of urls) {
    errors = [];
    const res = await page.goto(BASE + u, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) fail(`${width}px ${u}: HTTP ${res?.status()}`);
    // Scroll through so lazy images load and whileInView animations run.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(400);
    const r = await page.evaluate((demo) => {
      const root = document.querySelector('[data-demo]');
      const imgs = Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
      const stray = Array.from(document.querySelectorAll('a[href^="/"]'))
        .map((a) => a.getAttribute('href'))
        .filter((h) => demo && h !== '/' && !h.startsWith('/' + demo));
      return {
        demo: root?.getAttribute('data-demo') ?? null,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        broken: imgs,
        stray,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
      };
    }, u.match(/^\/(demo[1-5])/)?.[1] ?? null);
    const expected = u.match(/^\/(demo[1-5])/)?.[1] ?? null;
    if (r.demo !== expected) fail(`${width}px ${u}: rendered layout ${r.demo}, expected ${expected}`);
    if (r.overflow > 1) fail(`${width}px ${u}: horizontal overflow ${r.overflow}px`);
    if (r.broken.length) fail(`${width}px ${u}: broken images ${r.broken.join(', ')}`);
    if (r.stray.length) fail(`${width}px ${u}: stray links ${r.stray.join(', ')}`);
    if (r.h1 !== 1) fail(`${width}px ${u}: ${r.h1} h1 elements`);
    if (!r.title || r.title === 'Vite + React') fail(`${width}px ${u}: missing title`);
    if (errors.length) fail(`${width}px ${u}: ${errors.join(' | ')}`);
  }
  console.log(`swept ${urls.length} routes at ${width}px`);
  await ctx.close();
}

async function interactions() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => fail(`interaction pageerror: ${e.message}`));

  for (const d of demos) {
    // Mobile menu opens, navigates, closes, and keeps the prefix.
    await page.goto(`${BASE}/${d}`, { waitUntil: 'networkidle' });
    const menuBtn = page.locator('header button[aria-expanded], header ~ * button[aria-expanded]').filter({ hasNotText: /^$/ });
    const opener = page.locator('button[aria-controls$="-menu"], button[aria-controls$="-nav"], button[aria-controls$="-index"], button[aria-controls$="-sheet"]').first();
    await opener.click();
    const dialog = page.getByRole('dialog').first();
    await dialog.waitFor();
    const leaderLink = dialog.getByRole('link', { name: /leadership|people/i }).first();
    if (!(await leaderLink.isVisible())) await dialog.getByRole('button', { name: /^about/i }).click(); // demo1 accordion
    await leaderLink.click();
    await page.waitForURL(`**/${d}/leadership`);
    await page.waitForTimeout(800);
    if ((await page.getByRole('dialog').count()) !== 0) fail(`${d}: mobile menu stayed open after navigation`);
    void menuBtn;

    // Browser back/forward.
    await page.goBack();
    await page.waitForURL(`${BASE}/${d}`);
    await page.goForward();
    await page.waitForURL(`**/${d}/leadership`);

    // Direct load + reload of a nested route.
    await page.goto(`${BASE}/${d}/resource-centre/iot-condition-monitoring-primer`, { waitUntil: 'networkidle' });
    await page.reload({ waitUntil: 'networkidle' });
    if ((await page.locator(`[data-demo="${d}"]`).count()) !== 1) fail(`${d}: reload of nested route lost layout`);

    // Download action.
    const dl = page.getByRole('button', { name: /download/i }).first();
    const [download] = await Promise.all([page.waitForEvent('download'), dl.click()]);
    if (!download.suggestedFilename().endsWith('-sample.txt')) fail(`${d}: unexpected download ${download.suggestedFilename()}`);

    // Partner form: invalid then valid submission (vendor type).
    await page.goto(`${BASE}/${d}/partner-with-us?type=vendor`, { waitUntil: 'networkidle' });
    const form = page.locator('form').first();
    const submit = async () => form.locator('button[type="submit"]').click();
    await submit();
    if ((await form.locator('[aria-invalid="true"]').count()) === 0) fail(`${d}: no validation errors on empty partner submit`);
    // Fill every visible field, stepping through wizard steps when present (demo4).
    for (let step = 0; step < 5; step++) {
      for (const el of await form.locator('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea').all()) {
        if (!(await el.isVisible())) continue;
        const type = await el.getAttribute('type');
        const val = type === 'email' ? 'qa@company.com' : type === 'tel' ? '+1 555 010 0000' : type === 'url' ? 'https://company.com' : 'Sample QA entry text';
        await el.fill(val);
      }
      for (const sel of await form.locator('select').all()) {
        if (await sel.isVisible()) await sel.selectOption({ index: 1 });
      }
      for (const fs of await form.locator('fieldset:has(input[type="checkbox"])').all()) {
        const boxes = fs.locator('input[type="checkbox"]');
        if ((await boxes.count()) > 0 && !(await boxes.first().isChecked())) await boxes.first().check({ force: true });
      }
      for (const c of await form.locator('input[type="checkbox"][name="consent"]').all()) if (!(await c.isChecked())) await c.check({ force: true });
      await submit();
      await page.waitForTimeout(1400);
      if (await page.getByText(/DEMO-[A-Z0-9]{6}/).count()) break;
    }
    await page.getByText(/DEMO-[A-Z0-9]{6}/).first().waitFor({ timeout: 5000 }).catch(() => fail(`${d}: partner form success state not shown`));

    // Chat assistant answers a suggested question.
    await page.goto(`${BASE}/${d}`, { waitUntil: 'networkidle' });
    await page.locator('button[aria-label^="Open "]').last().click();
    await page.getByRole('button', { name: 'How can I become a distributor?' }).click();
    await page.getByText(/Ideal for:/).waitFor({ timeout: 5000 }).catch(() => fail(`${d}: chat did not answer`));
    await page.getByRole('button', { name: 'Close assistant' }).first().click();

    // News filter changes results, gallery lightbox opens + Escape closes.
    await page.goto(`${BASE}/${d}/news`, { waitUntil: 'networkidle' });
    const before = await page.locator('main a[href*="/news/"]').count();
    await page.getByRole('tab', { name: /video|films/i }).first().click();
    await page.waitForTimeout(500);
    const after = await page.locator('main a[href*="/news/"]').count();
    if (!(after > 0 && after < before)) fail(`${d}: news filter did not change results (${before} → ${after})`);

    await page.goto(`${BASE}/${d}/gallery`, { waitUntil: 'networkidle' });
    await page.locator('main ul button').first().click();
    const lb = page.getByRole('dialog');
    await lb.waitFor().catch(() => fail(`${d}: lightbox did not open`));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    if ((await page.getByRole('dialog').count()) !== 0) fail(`${d}: lightbox did not close on Escape`);
    console.log(`interactions ok-checked for ${d}`);
  }
  await ctx.close();
}

await sweep(1440, 900);
await sweep(768, 1024);
await sweep(375, 812);
await interactions();
await browser.close();
console.log(failures.length ? `\n${failures.length} FAILURE(S)` : '\nALL CHECKS PASSED');
process.exit(failures.length ? 1 : 0);
