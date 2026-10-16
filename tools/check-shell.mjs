#!/usr/bin/env node
/*
  Measures a running customer app's top bar against the AntaraX shell (app/SPEC.md §2, app/tokens.css).

    node tools/check-shell.mjs URL [options]

    --product KEY        the product's palette key in app/tokens.css (yara, janka, frame, angka, tinara, grid…);
                         its recorded radius or flat bar is then expected, and its reference PNG is put beside the shot
    --lock PATH          the product's antarax-kit.lock: a difference listed in its "exceptions" passes, with its reason
    --widths 1280,390    the widths to measure (default 1280 and 390)
    --out DIR            where the screenshots go (default ./shell-check)
    --storage PATH       a Playwright storage state (signed-in cookies), for pages behind sign-in
    --bar CSS            the bar, if it is not the first <header> or [role=banner] at the top of the page
    --help CSS / --account CSS   Help and the account, if their names are not "Help" and "Account…"

  It checks: the bar's height (64, 58 on phones); every control in it 44px, product-slot buttons at least
  40px drawn; Help second from the right and the account at the far right; whether the bar floats with its
  radius, gutter and shadow; labels set in uppercase anywhere on the page; Help's and the account's menu
  items. It saves each width's screenshot and, with --product, the matching reference PNG beside it in
  compare.html. Exit 1 on any failure; differences recorded in the lock are reported, not failed.

  Needs Playwright and Chromium (npm i -D playwright; npx playwright install chromium).
*/
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const KIT = dirname(dirname(fileURLToPath(import.meta.url)));
const argv = process.argv.slice(2);
const opt = (name, fallback) => (argv.includes('--' + name) ? argv[argv.indexOf('--' + name) + 1] : fallback);
const url = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
if (!url) { console.error('Usage: node tools/check-shell.mjs URL [--product KEY] [--lock PATH] [--widths 1280,390] [--out DIR]'); process.exit(2); }
const product = opt('product');
const widths = opt('widths', '1280,390').split(',').map(Number);
const out = resolve(opt('out', 'shell-check'));
const lock = opt('lock') ? JSON.parse(readFileSync(opt('lock'), 'utf8')) : null;
const exceptions = (lock?.exceptions || []).map((e) => e.what.toLowerCase());

// The expected values, read from the generated tokens so the check never drifts from the kit.
const tokens = readFileSync(join(KIT, 'app', 'tokens.css'), 'utf8');
const block = (sel) => (tokens.match(new RegExp(sel.replace(/[[\]"=]/g, '\\$&') + '\\s*\\{([^}]*)\\}')) || [, ''])[1];
const vars = (text) => Object.fromEntries([...text.matchAll(/--shell-([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const base = vars(block('.shell-root'));
const mine = product ? vars(block(`.shell-root[data-product="${product}"]`)) : {};
const want = { ...base, ...mine };
const px = (v) => parseFloat(v);
const flat = want['bar-radius'] === '0';

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  try { return createRequire(join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'x.js'))('playwright'); } catch {}
  console.error('This check needs Playwright: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const results = [];
const report = (ok, width, what, detail) => {
  const recorded = !ok && exceptions.some((e) => what.toLowerCase().includes(e) || e.includes(what.toLowerCase()));
  results.push({ ok: ok || recorded, recorded, width, what, detail });
};

async function measure(page, width) {
  const phone = width < 768;
  const found = await page.evaluate(({ barSel, helpSel, accountSel }) => {
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, right: r.right }; };
    const name = (el) => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ');
    let bar = barSel ? document.querySelector(barSel) : null;
    if (!bar) bar = [...document.querySelectorAll('header, [role="banner"]')].find((el) => { const r = el.getBoundingClientRect(); return r.top < 40 && r.height >= 40 && r.height <= 100; });
    if (!bar) return null;
    const cs = getComputedStyle(bar);
    const controls = [...bar.querySelectorAll('a[href], button, [role="button"], input, select')]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; })
      .map((el) => ({ el, name: name(el), tag: el.tagName.toLowerCase(), round: parseFloat(getComputedStyle(el).borderRadius) >= el.getBoundingClientRect().height / 2 - 1, ...box(el) }));
    // The brand pill: the AntaraX A (to antarax.ai) and the product chip beside it, in one well.
    const aLink = controls.find((c) => /antarax\.ai/.test(c.el.getAttribute('href') || ''));
    const well = aLink ? aLink.el.parentElement : null;
    const pill = aLink ? { a: { w: aLink.w, h: aLink.h }, chip: controls.filter((c) => c.el !== aLink.el && well.contains(c.el)).map((c) => ({ w: c.w, h: c.h }))[0] || null, first: controls.filter((c) => !well.contains(c.el)).every((c) => c.x > aLink.x || /menu/i.test(c.name)) } : null;
    controls.forEach((c) => { c.pill = !!(well && well.contains(c.el)); delete c.el; });
    const help = helpSel ? bar.querySelector(helpSel) : [...bar.querySelectorAll('button, a')].find((el) => /^help\b/i.test(name(el)));
    const account = accountSel ? bar.querySelector(accountSel) : [...bar.querySelectorAll('button, a')].find((el) => /^(account|your account|profile)\b/i.test(name(el)) || el.getAttribute('aria-haspopup') && /^[A-Z]{1,3}$/.test(name(el)));
    const upper = [...document.querySelectorAll('body *')].filter((el) => {
      if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length > 2)) return false;
      const s = getComputedStyle(el);
      return s.textTransform === 'uppercase' && s.display !== 'none' && el.getBoundingClientRect().width > 0;
    }).map((el) => el.textContent.trim().slice(0, 40)).slice(0, 10);
    return {
      bar: { ...box(bar), radius: cs.borderTopLeftRadius, shadow: cs.boxShadow, border: cs.borderTopWidth },
      viewport: window.innerWidth,
      controls, pill, help: help ? { name: name(help), ...box(help) } : null, account: account ? { name: name(account), ...box(account) } : null, upper,
    };
  }, { barSel: opt('bar'), helpSel: opt('help'), accountSel: opt('account') });

  if (!found) { report(false, width, 'Top bar', 'No <header> or [role=banner] at the top of the page. Pass --bar CSS.'); return; }
  const { bar } = found;
  const h = phone ? px(want['bar-height-phone']) : px(want['bar-height']);
  report(Math.abs(bar.h - h) <= 1, width, 'Bar height', `${Math.round(bar.h)}px, the shell says ${h}px`);

  if (flat) {
    report(bar.y <= 1 && px(bar.radius) === 0, width, 'Flat bar (recorded)', `top ${Math.round(bar.y)}px, radius ${bar.radius}`);
  } else {
    const r = phone ? px(want['bar-radius-phone']) : px(want['bar-radius']);
    const gutter = px((phone ? want['bar-outer-padding-phone'] : want['bar-outer-padding']).split(' ')[0]);
    const side = px((phone ? want['bar-outer-padding-phone'] : want['bar-outer-padding']).split(' ')[1]);
    report(Math.abs(px(bar.radius) - r) <= 1, width, 'Bar radius', `${bar.radius}, the shell says ${r}px${product ? ` for ${product}` : ''}`);
    report(Math.abs(bar.y - gutter) <= 2 && Math.abs(bar.x - side) <= 2, width, 'Bar floats in the gutter', `top ${Math.round(bar.y)}px, left ${Math.round(bar.x)}px; the shell says ${gutter}px and ${side}px`);
    report(bar.shadow !== 'none', width, 'Bar shadow', bar.shadow === 'none' ? 'none' : 'present');
  }

  const { pill } = found;
  report(!!pill, width, 'Brand pill', pill ? 'the AntaraX A links to antarax.ai' : 'no link to antarax.ai in the bar');
  if (pill) {
    report(Math.abs(pill.a.w - px(want['pill-a-width'])) <= 1 && Math.abs(pill.a.h - px(want['pill-a-height'])) <= 1, width, 'The AntaraX A', `${Math.round(pill.a.w)}×${Math.round(pill.a.h)}, the shell says ${want['pill-a-width']} × ${want['pill-a-height']}`);
    report(!!pill.chip && Math.abs(pill.chip.h - px(want['pill-chip-height'])) <= 1, width, 'Product chip', pill.chip ? `${Math.round(pill.chip.h)}px tall, the shell says ${want['pill-chip-height']}` : 'no product chip beside the A');
    report(pill.first, width, 'Brand pill at the left', pill.first ? 'first, after the menu button if any' : 'something other than the menu button comes before it');
  }
  const small = found.controls.filter((c) => !c.pill).filter((c) => c.round ? (Math.abs(c.h - 44) > 1 || Math.abs(c.w - 44) > 1) : c.h < 40);
  report(!small.length, width, 'Control sizes', small.length ? small.map((c) => `"${c.name || c.tag}" ${Math.round(c.w)}×${Math.round(c.h)}`).join('; ') + ': round controls are 44px, slot buttons at least 40px' : `${found.controls.length} controls, round ones 44px, the rest at least 40px`);

  report(!!found.help, width, 'Help is in the bar', found.help ? `"${found.help.name}"` : 'no button named Help');
  report(!!found.account, width, 'The account is in the bar', found.account ? `"${found.account.name}"` : 'no button named Account…');
  if (found.help && found.account) {
    const right = found.controls.filter((c) => !c.pill).sort((a, b) => a.x - b.x);
    const last = right[right.length - 1], second = right[right.length - 2];
    const isAcc = last && Math.abs(last.x - found.account.x) < 1;
    const isHelp = second && Math.abs(second.x - found.help.x) < 1;
    report(isAcc, width, 'The account at the far right', isAcc ? 'last' : `last is "${last?.name}"`);
    report(isHelp, width, 'Help second from the right', isHelp ? 'second from the right' : `second from the right is "${second?.name}"`);
    report(found.viewport - found.account.right <= (flat ? 24 : 40), width, 'Nothing after the account', `${Math.round(found.viewport - found.account.right)}px from the account to the edge`);
  }
  report(!found.upper.length, width, 'No uppercase labels', found.upper.length ? found.upper.map((t) => `"${t}"`).join(', ') : 'none');
}

async function menus(page, width) {
  const bar = page.locator(opt('bar') || 'header, [role="banner"]').first();
  const open = async (sel, name) => {
    const btn = sel ? page.locator(sel).first() : bar.getByRole('button', { name }).first();
    if (!(await btn.count())) return null;
    await btn.click();
    await page.waitForTimeout(250);
    const text = await page.locator('[role="menu"]:visible').allInnerTexts().catch(() => []);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    return text.join('\n');
  };
  const help = await open(opt('help'), /^help\b/i);
  if (help != null) {
    const need = ['User guide', 'Help centre', 'Send feedback', 'Contact support', 'Your requests'];
    const missing = need.filter((n) => !help.includes(n));
    report(!missing.length, width, "Help's menu", missing.length ? `missing ${missing.join(', ')}` : need.join(' · '));
  }
  const acc = await open(opt('account'), /^(account|your account|profile)\b/i);
  if (acc != null) {
    const need = ['Your account', 'Settings', 'Sign out', 'by AntaraX', 'Privacy', 'Terms'];
    const missing = need.filter((n) => !acc.includes(n));
    report(!missing.length, width, 'Account menu', missing.length ? `missing ${missing.join(', ')}` : need.join(' · '));
    const words = ['Log out', 'Organization', 'Preferences', 'Admin panel'].filter((w) => acc.includes(w));
    report(!words.length, width, 'Account menu words', words.length ? `says ${words.join(', ')} (brand kit 13 §1)` : 'the shared words');
  }
}

const { chromium } = await loadPlaywright();
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const shots = [];
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, storageState: opt('storage') });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await measure(page, width);
  const shot = join(out, `shell-${width}.png`);
  await page.screenshot({ path: shot, clip: { x: 0, y: 0, width, height: width < 768 ? 120 : 110 } });
  await menus(page, width);
  let ref = null;
  if (product) {
    const file = join(KIT, 'app', 'mock', 'renders', `AppBar-${product}-${width < 768 ? 'phone' : 'wide'}.png`);
    if (existsSync(file)) { ref = `reference-${basename(file)}`; copyFileSync(file, join(out, ref)); }
  }
  shots.push({ width, shot: basename(shot), ref });
  await ctx.close();
}
await browser.close();

writeFileSync(join(out, 'compare.html'), `<!doctype html><meta charset="utf-8"><title>Shell check</title>
<style>body{font-family:system-ui;margin:24px;color:#0B1B4F}img{display:block;max-width:100%;border:1px solid #E5E8EE;margin:6px 0 18px}h2{font-size:15px}</style>
<h1>Shell check: ${url}</h1>${shots.map((s) => `<h2>${s.width}px: the product</h2><img src="${s.shot}">${s.ref ? `<h2>${s.width}px: the kit's reference (menus open)</h2><img src="${s.ref}">` : ''}`).join('')}`);

let failed = 0;
for (const r of results) {
  const mark = r.recorded ? 'RECORDED' : r.ok ? 'ok  ' : 'FAIL';
  if (!r.ok) failed++;
  console.log(`${mark}  ${String(r.width).padStart(4)}px  ${r.what}: ${r.detail}`);
}
console.log(`\n${failed ? `${failed} failed` : 'All passed'}. Screenshots and compare.html in ${out}`);
process.exitCode = failed ? 1 : 0;
