#!/usr/bin/env node
/*
  Checks a running product's sign-in screens against getting-in/SPEC.md: what can be seen from outside.

    node tools/check-signin.mjs SIGNIN_URL [options]

    --axle               this is an AXLE sign-in: no sign-in link is expected (and one fails), Google is
    --signup URL         the Create an account page, where the product has sign-up
    --reset URL          the Forgot your password page, if the sign-in page's link cannot be followed
    --submit             also submit the reset form with a made-up address (…@example.invalid) and read the
                         reply (GI-07). Off by default: it sends a request to the product
    --known-email EMAIL  with --submit, also submit this real account's email and compare the two replies.
                         It sends that person a real reset email: use a test account only
    --out DIR            where the screenshots go (default ./signin-check)

  It checks:
    GI-01  "Forgot your password?" exists and leads to a form with an email field
    GI-02  every password field has a Show button, named, in the tab order, that reveals the text
    GI-05  a Caps Lock warning appears while Caps Lock is on (reported as "not seen" when the browser cannot set it)
    GI-06  autocomplete on every field, paste not blocked, no confirm-password field
    GI-07  with --submit, the reset reply does not say whether the account exists
    GI-11  "Email me a sign-in link" in a customer app; never in AXLE
    §2     Continue with Google
    §10    no forbidden words on any screen it opens (Log in, Login, Register, Invalid credentials…)
  What it cannot see (the breach check, attempts, two-step, sessions) each product proves in its own tests.

  Exit 1 on any failure. Needs Playwright and Chromium (npm i -D playwright; npx playwright install chromium).
*/
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const argv = process.argv.slice(2);
const has = (name) => argv.includes('--' + name);
const opt = (name, fallback) => (has(name) ? argv[argv.indexOf('--' + name) + 1] : fallback);
const VALUED = ['--signup', '--reset', '--known-email', '--out'];
const url = argv.find((a, i) => !a.startsWith('--') && !VALUED.includes(argv[i - 1]));
if (!url) { console.error('Usage: node tools/check-signin.mjs SIGNIN_URL [--axle] [--signup URL] [--reset URL] [--submit] [--known-email EMAIL] [--out DIR]'); process.exit(2); }
const axle = has('axle');
const out = resolve(opt('out', 'signin-check'));
mkdirSync(out, { recursive: true });

const FORBIDDEN = [/\blog ?in\b/i, /\blog ?out\b/i, /\bregister\b/i, /invalid credentials/i, /user not found/i, /\bmagic link\b/i, /\b2fa\b/i, /\bauthorized\b/i, /forgot password\?/i];

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  try { return createRequire(join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'x.js'))('playwright'); } catch {}
  console.error('This check needs Playwright: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const results = [];
const report = (ok, id, screen, detail) => results.push({ ok, id, screen, detail });

// Every password field and what sits around it, as seen in the page.
async function fields(page) {
  return page.evaluate(() => {
    const name = (el) => (el.getAttribute('aria-label') || el.textContent || el.value || '').trim().replace(/\s+/g, ' ');
    const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
    const inputs = [...document.querySelectorAll('input')].filter(visible);
    return inputs.map((el, i) => {
      el.setAttribute('data-signin-check', String(i));
      let box = el.parentElement, show = null;
      for (let up = 0; up < 3 && box && !show; up++, box = box.parentElement) {
        show = [...box.querySelectorAll('button, [role="button"]')].find((b) => visible(b) && /show|hide|reveal|lihat/i.test(name(b) + ' ' + (b.getAttribute('title') || '')));
      }
      if (show) show.setAttribute('data-signin-show', String(i));
      return { i, type: el.type, autocomplete: el.getAttribute('autocomplete'), name: el.name, id: el.id, showName: show ? name(show) : null, showType: show ? show.getAttribute('type') : null, showTab: show ? show.tabIndex : null, onpaste: !!el.getAttribute('onpaste') };
    });
  });
}

async function checkFields(page, screen, expectNew) {
  const list = await fields(page);
  const pw = list.filter((f) => f.type === 'password');
  if (!pw.length) { report(false, 'GI-02', screen, 'no password field found'); return; }
  const email = list.find((f) => f.type === 'email' || /email|user/i.test(f.name + ' ' + f.id + ' ' + (f.autocomplete || '')));
  if (email) report(['username', 'email'].includes((email.autocomplete || '').split(' ').pop()), 'GI-06', screen, `email field autocomplete="${email.autocomplete ?? ''}" (want username or email)`);
  const want = expectNew ? 'new-password' : 'current-password';
  if (expectNew && pw.length > 1) report(false, 'GI-06', screen, `${pw.length} password fields: no confirm field, Show replaces it`);
  for (const f of pw) {
    report((f.autocomplete || '').split(' ').pop() === want, 'GI-06', screen, `password autocomplete="${f.autocomplete ?? ''}" (want ${want})`);
    const input = page.locator(`[data-signin-check="${f.i}"]`);
    const blocked = await input.evaluate((el) => { const e = new Event('paste', { bubbles: true, cancelable: true }); el.dispatchEvent(e); return e.defaultPrevented; });
    report(!blocked && !f.onpaste, 'GI-06', screen, blocked || f.onpaste ? 'paste is blocked' : 'paste works');
    // A headless browser cannot switch Caps Lock on, so send the key events a browser sends while it is on.
    const caps = await input.evaluate(async (el) => {
      el.focus();
      for (const type of ['keydown', 'keyup']) el.dispatchEvent(new KeyboardEvent(type, { key: 'A', code: 'KeyA', bubbles: true, modifierCapsLock: true }));
      await new Promise((r) => setTimeout(r, 150));
      const seen = /caps ?lock/i.test(document.body.innerText);
      for (const type of ['keydown', 'keyup']) el.dispatchEvent(new KeyboardEvent(type, { key: 'a', code: 'KeyA', bubbles: true, modifierCapsLock: false }));
      return seen;
    });
    report(caps ? true : null, 'GI-05', screen, caps ? 'Caps Lock warning shown' : 'Caps Lock warning not seen (check by hand)');
    if (!f.showName) { report(false, 'GI-02', screen, 'password field has no Show button'); continue; }
    report(f.showType === 'button', 'GI-02', screen, `Show button "${f.showName}" is type="${f.showType}" (want button, so it never submits)`);
    report(f.showTab >= 0, 'GI-02', screen, f.showTab >= 0 ? 'Show is reachable by keyboard' : 'Show has tabindex="-1": a keyboard cannot reach it');
    await input.fill('correct horse battery');
    await page.locator(`[data-signin-show="${f.i}"]`).click();
    const revealed = await input.evaluate((el) => el.type === 'text');
    report(revealed, 'GI-02', screen, revealed ? `Show "${f.showName}" reveals the text` : 'Show did not reveal the text');
    if (revealed) await page.locator(`[data-signin-show="${f.i}"]`).click();
    await input.fill('');
  }
}

async function checkWords(page, screen) {
  const text = await page.evaluate(() => document.body.innerText);
  const found = FORBIDDEN.filter((r) => r.test(text)).map((r) => text.match(r)[0]);
  report(!found.length, '§10', screen, found.length ? `words to change: ${[...new Set(found)].join(', ')}` : 'no forbidden words');
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Sign in
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: join(out, 'signin.png'), fullPage: true });
const body = await page.evaluate(() => document.body.innerText);
report(/continue with google/i.test(body), '§2', 'Sign in', /continue with google/i.test(body) ? 'Continue with Google' : 'no "Continue with Google"');
const linkOffered = /email me a sign-in link/i.test(body);
report(axle ? !linkOffered : linkOffered, 'GI-11', 'Sign in', axle ? (linkOffered ? 'AXLE offers a sign-in link: it must not' : 'no sign-in link, as AXLE should') : linkOffered ? '"Email me a sign-in link"' : 'no "Email me a sign-in link"');
await checkFields(page, 'Sign in', false);
await checkWords(page, 'Sign in');

// Forgot your password
let resetUrl = opt('reset');
const forgot = page.getByRole('link', { name: /forgot your password/i }).or(page.getByRole('button', { name: /forgot your password/i })).first();
const forgotFound = await forgot.count();
report(forgotFound > 0, 'GI-01', 'Sign in', forgotFound ? '"Forgot your password?"' : 'no "Forgot your password?" link');
if (forgotFound && !resetUrl) { await forgot.click(); await page.waitForLoadState('networkidle'); resetUrl = page.url(); }
if (resetUrl) {
  if (page.url() !== resetUrl) await page.goto(resetUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(out, 'reset.png'), fullPage: true });
  const emailField = page.locator('input[type="email"], input[autocomplete="username"], input[autocomplete="email"]').first();
  report(await emailField.count() > 0, 'GI-01', 'Forgot your password', (await emailField.count()) ? 'an email field to send the reset link' : 'no email field');
  await checkWords(page, 'Forgot your password');
  if (has('submit') && await emailField.count()) {
    const reply = async (address) => {
      await page.goto(resetUrl, { waitUntil: 'networkidle' });
      await page.locator('input[type="email"], input[autocomplete="username"], input[autocomplete="email"]').first().fill(address);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2500);
      return (await page.evaluate(() => document.body.innerText)).replace(/\S+@\S+/g, '‹email›').replace(/\s+/g, ' ').trim();
    };
    const made = await reply(`check-signin-${Date.now()}@example.invalid`);
    await page.screenshot({ path: join(out, 'reset-sent.png'), fullPage: true });
    if (opt('known-email')) report(made === await reply(opt('known-email')), 'GI-07', 'Forgot your password', 'the same reply for a real and a made-up account');
    else report(/if an account exists/i.test(made), 'GI-07', 'Forgot your password', /if an account exists/i.test(made) ? '"If an account exists…"' : 'the reply may say whether the account exists; read reset-sent.png');
  }
}

// Create an account
if (opt('signup')) {
  await page.goto(opt('signup'), { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(out, 'signup.png'), fullPage: true });
  await checkFields(page, 'Create an account', true);
  const meter = await page.evaluate(() => { const i = document.querySelector('input[type="password"]'); return !!i; });
  if (meter) {
    await page.locator('input[type="password"]').first().fill('password123456');
    await page.waitForTimeout(300);
    const said = await page.evaluate(() => /weak|fair|good|strong|common/i.test(document.body.innerText));
    report(said, 'GI-04', 'Create an account', said ? 'a strength meter in words' : 'no strength meter in words');
  }
  await checkWords(page, 'Create an account');
}

await browser.close();
const failed = results.filter((r) => r.ok === false);
for (const r of results) console.log(`${r.ok === null ? 'CHECK' : r.ok ? 'PASS ' : 'FAIL '} ${r.id.padEnd(6)} ${r.screen.padEnd(22)} ${r.detail}`);
console.log(`\n${failed.length ? `${failed.length} to fix` : 'Everything it can see passes'}. Screenshots in ${out}.`);
process.exit(failed.length ? 1 : 0);
