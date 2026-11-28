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
  radius, gutter and shadow (in its column, so beside AXLE's sidebar too); labels set in uppercase anywhere on the page; Help's and the account's menu
  items (on a bar with the AXLE tag, AXLE's staff menu, axle/SPEC.md §6). Scrollbars (SPEC §11c): every area that scrolls on the page has a thin scrollbar, hidden at rest (not the browser's default,
  not removed); where the system asks for forced colours it passes. Page width (SPEC §11d), at 1280px and wider: the page's
  content reaches within 80px of the window's right edge (the gutter and 48px); a page of prose only passes. Anywhere on the page, and in both menus (SPEC §11b): controls, tabs, menu items and placeholders
  whose label ends in "…" or "...", and <a> elements with nowhere to go (no href, href="#" or javascript:),
  which are actions dressed as links. A busy control (aria-busy, or disabled with "Saving…"-style words) and
  text cut short by CSS are not counted. It saves each width's screenshot and, with --product, the matching reference PNG beside it in
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
    // The column the bar floats in: the page's full width, or the page column beside a sidebar (AXLE, axle/SPEC.md §6).
    let col = 0;
    for (let el = bar.parentElement; el && el !== document.body; el = el.parentElement) col = Math.max(col, el.getBoundingClientRect().left);
    // An AXLE bar carries the orange AXLE tag (axle/SPEC.md §6): its staff menu is AXLE's, not a customer app's.
    const axle = [...bar.querySelectorAll('*')].some((el) => !el.children.length && el.textContent.trim() === 'AXLE');
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
    // SPEC §11b: no label ends in an ellipsis; an action is a button, so every <a> goes somewhere.
    const shown = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
    const busy = (el, t) => el.closest('[aria-busy="true"]') || (el.disabled && /\b\w+ing\b[^.…]*(…|\.\.\.)$/.test(t));
    const dots = /(…|\.\.\.)$/;
    const ellipsis = [];
    for (const el of document.querySelectorAll('button, a, summary, option, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], [role="option"], input[type="button"], input[type="submit"]')) {
      const t = (el.tagName === 'INPUT' ? el.value : el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ');
      if (dots.test(t) && (el.tagName === 'OPTION' || shown(el)) && !busy(el, t)) ellipsis.push(t.slice(-40));
    }
    for (const el of document.querySelectorAll('input[placeholder], textarea[placeholder]')) {
      const t = el.getAttribute('placeholder').trim();
      if (dots.test(t) && shown(el)) ellipsis.push(`placeholder "${t.slice(-40)}"`);
    }
    const nowhere = [...document.querySelectorAll('a')].filter((el) => {
      const h = el.getAttribute('href');
      return shown(el) && (h == null || h.trim() === '' || h.trim() === '#' || /^javascript:/i.test(h.trim()));
    }).map((el) => `"${name(el).slice(0, 30) || '(no text)'}"${el.hasAttribute('href') ? ` href="${el.getAttribute('href')}"` : ' (no href)'}`);
    return {
      bar: { ...box(bar), radius: cs.borderTopLeftRadius, shadow: cs.boxShadow, border: cs.borderTopWidth, col }, axle,
      viewport: window.innerWidth,
      controls, pill, help: help ? { name: name(help), ...box(help) } : null, account: account ? { name: name(account), ...box(account) } : null, upper, ellipsis: [...new Set(ellipsis)], nowhere: [...new Set(nowhere)],
    };
  }, { barSel: opt('bar'), helpSel: opt('help'), accountSel: opt('account') });

  if (!found) { report(false, width, 'Top bar', 'No <header> or [role=banner] at the top of the page. Pass --bar CSS.'); return; }
  const { bar } = found;
  isAxle = found.axle;
  const h = phone ? px(want['bar-height-phone']) : px(want['bar-height']);
  report(Math.abs(bar.h - h) <= 1, width, 'Bar height', `${Math.round(bar.h)}px, the shell says ${h}px`);

  if (flat) {
    report(bar.y <= 1 && px(bar.radius) === 0, width, 'Flat bar (recorded)', `top ${Math.round(bar.y)}px, radius ${bar.radius}`);
  } else {
    const r = phone ? px(want['bar-radius-phone']) : px(want['bar-radius']);
    const gutter = px((phone ? want['bar-outer-padding-phone'] : want['bar-outer-padding']).split(' ')[0]);
    const side = px((phone ? want['bar-outer-padding-phone'] : want['bar-outer-padding']).split(' ')[1]);
    report(Math.abs(px(bar.radius) - r) <= 1, width, 'Bar radius', `${bar.radius}, the shell says ${r}px${product ? ` for ${product}` : ''}`);
    const left = bar.x - bar.col;
    report(Math.abs(bar.y - gutter) <= 2 && Math.abs(left - side) <= 2, width, 'Bar floats in the gutter', `top ${Math.round(bar.y)}px, left ${Math.round(left)}px${bar.col ? ` from its column (${Math.round(bar.col)}px in, beside a sidebar)` : ''}; the shell says ${gutter}px and ${side}px`);
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
  report(!found.ellipsis.length, width, 'No label ends in an ellipsis', found.ellipsis.length ? found.ellipsis.slice(0, 10).map((t) => t.startsWith('placeholder') ? t : `"${t}"`).join(', ') + ' (SPEC §11b)' : 'none');
  report(!found.nowhere.length, width, 'Links go somewhere', found.nowhere.length ? found.nowhere.slice(0, 10).join(', ') + ': an action is a button, a link has a real href (SPEC §11b)' : 'every <a> has a real href');
}

// SPEC §11d (owner, 28 Nov 2026): the page fills its area. From 1280px, the content of <main> (or [role=main]) must reach
// within 80px of the window's right edge: the page gutter (at most 32px) and 48px. A bare wrapper that is the only child
// is looked through, so a capped page wrapper is caught, but a card (its own background or border) is measured; absolutely placed and fixed parts do not count; a page whose
// parts are all prose (paragraphs, headings, lists) passes, since prose keeps its reading measure.
async function pagewidth(page, width) {
  if (width < 1280) return;
  const r = await page.evaluate(() => {
    const main = document.querySelector('main, [role="main"]');
    if (!main) return null;
    const shown = (el) => { const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && cs.position !== 'absolute' && cs.position !== 'fixed'; };
    let el = main;
    // A part with its own ground (a card: a background or a border) is content: it is measured, not looked through.
    const drawn = (e) => { const cs = getComputedStyle(e); return cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent' || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0; };
    for (let i = 0; i < 8; i++) { const kids = [...el.children].filter(shown); if (kids.length === 1 && !drawn(kids[0])) el = kids[0]; else break; }
    const parts = [...el.children].filter(shown);
    const all = parts.length ? parts : [el];
    const right = (k) => k.getBoundingClientRect().right;
    const widest = all.reduce((a, k) => (right(k) > right(a) ? k : a));
    const cls = typeof widest.className === 'string' && widest.className.trim() ? '.' + widest.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return { gap: Math.round(document.documentElement.clientWidth - right(widest)), prose: all.every((k) => /^(P|H[1-6]|UL|OL|DL|BLOCKQUOTE)$/.test(k.tagName)), widest: widest.tagName.toLowerCase() + cls };
  });
  if (!r) { report(false, width, 'Page width', 'no <main> or [role=main] to measure (SPEC §11d)'); return; }
  const ok = r.gap <= 80 || r.prose;
  report(ok, width, 'Page width', ok ? (r.prose && r.gap > 80 ? 'prose only, kept to its measure' : `content reaches ${r.gap}px from the right edge`) : `the content stops ${r.gap}px short of the right edge (widest part: ${r.widest}); the page fills its area, no max-width on the page or a wrapper (SPEC §11d)`);
}

// SPEC §11c (owner, 19 Nov 2026): every scrollable area has a thin scrollbar that is hidden at rest. Measured on the areas that scroll
// right now (a menu or dialog that is closed is not measured; open it and run again, or add --open CSS to click something first).
async function scrollbars(page, width) {
  await page.mouse.move(0, 0);
  const found = await page.evaluate(() => {
    if (matchMedia('(forced-colors: active)').matches) return { forced: true };
    const clear = (c) => /^(rgba\(0, 0, 0, 0\)|transparent)$/.test(c.trim());
    const label = (el) => (el === document.documentElement ? 'the page' : el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.getAttribute('aria-label') ? ` "${el.getAttribute('aria-label').slice(0, 24)}"` : el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''));
    const bad = []; let seen = 0;
    for (const el of [document.documentElement, ...document.querySelectorAll('body *')]) {
      const cs = getComputedStyle(el);
      const root = el === document.documentElement;
      const scrolls = (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) || (/(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1)
        || (root && (el.scrollHeight > el.clientHeight + 1));
      if (!scrolls || cs.display === 'none' || cs.visibility === 'hidden') continue;
      seen++;
      const w = cs.scrollbarWidth, c = cs.scrollbarColor;
      if (w === 'none') bad.push(`${label(el)}: scrollbar removed (scrollbar-width: none); keep it, thin and hidden at rest`);
      else if (w === 'auto' && c === 'auto') bad.push(`${label(el)}: the browser's default scrollbar`);
      else if (w === 'auto') bad.push(`${label(el)}: scrollbar-width is auto, not thin`);
      else if (c === 'auto') bad.push(`${label(el)}: scrollbar-color is auto`);
      else if (!root && !el.matches(':hover, :focus-within, [data-scrolling]') && !clear(c.match(/^(rgba?\([^)]*\)|\S+)/)[0])) bad.push(`${label(el)}: the thumb shows at rest (${c})`);
    }
    return { seen, bad: bad.slice(0, 10) };
  });
  if (found.forced) { report(true, width, 'Scrollbars', 'forced colours: the system scrollbars show (SPEC §11c)'); return; }
  report(!found.bad.length, width, 'Scrollbars (thin, hidden at rest)', found.bad.length ? found.bad.join('; ') + ' (SPEC §11c)' : `${found.seen} scrollable area(s), all thin and hidden at rest`);
}

// AXLE's bar (axle/SPEC.md §6): the staff menu holds Your account, the AXLE guide and Sign out; Help, when it is there,
// points to the AXLE guide. A customer app's menus are app/SPEC.md §3 and §10.
let isAxle = false;
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
    const need = isAxle ? ['AXLE guide'] : ['User guide', 'Help centre', 'Send feedback', 'Contact support', 'Your requests'];
    const missing = need.filter((n) => !help.includes(n));
    report(!missing.length, width, "Help's menu", missing.length ? `missing ${missing.join(', ')}` : need.join(' · '));
  }
  const acc = await open(opt('account'), /^(account|your account|profile)\b/i);
  if (acc != null) {
    const need = isAxle ? ['Your account', 'AXLE guide', 'Sign out'] : ['Your account', 'Settings', 'Sign out', 'by AntaraX', 'Privacy', 'Terms'];
    const missing = need.filter((n) => !acc.includes(n));
    report(!missing.length, width, isAxle ? 'Staff menu (AXLE)' : 'Account menu', missing.length ? `missing ${missing.join(', ')}` : need.join(' · '));
    const words = ['Log out', 'Organization', 'Preferences', 'Admin panel'].filter((w) => acc.includes(w));
    report(!words.length, width, 'Account menu words', words.length ? `says ${words.join(', ')} (brand kit 13 §1)` : 'the shared words');
  }
  const dotted = [help, acc].filter(Boolean).join('\n').split('\n').map((l) => l.trim()).filter((l) => /(…|\.\.\.)$/.test(l));
  if (help != null || acc != null) report(!dotted.length, width, 'Menu items without an ellipsis', dotted.length ? dotted.map((l) => `"${l.slice(-40)}"`).join(', ') + ' (SPEC §11b)' : 'none');
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
  await scrollbars(page, width);
  await pagewidth(page, width);
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
