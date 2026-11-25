#!/usr/bin/env node
/*
  Every kit check on every page a product lists, at desktop and phone widths, in one command (axle/SPEC.md §19,
  app/SPEC.md, actions/SPEC.md). A product runs it in its own check and before every push; a page it does not list
  is a page it has not proved, so the product's own tests fail when a page is missing from its list (README: "Proving
  a product").

    node tools/check-product.mjs PAGES.json [--base URL] [--storage PATH] [--lock PATH] [--out DIR] [--jobs 4]

  PAGES.json, the product's kit-pages.json:
    {
      "product": "awangan",
      "widths": [1280, 390],
      "src": ["src"],                       source folders for tools/check-actions.mjs, relative to PAGES.json
      "parts": ["src/ui"],                  screen folders for tools/check-parts.mjs (one part per job)
      "surfaces": [
        { "name": "AXLE", "base": "http://axle.localhost:8080", "storage": "signed-in.json",
          "pages": ["/", "/models?tab=keys", ...] }
      ]
    }
  --base and --storage replace every surface's own (a product's harness serves its pages on a port it chooses).

  For each page and width it runs:
    - tools/check-shell.mjs: the bar, the brand pill, Help and the account, menus, uppercase, ellipses, links that go
      nowhere, scrollbars (axle/SPEC.md §6, §6.3, §14.2; app/SPEC.md §2, §11b, §11c);
    - axe-core (WCAG 2.2 A and AA rules): every violation fails (axle/SPEC.md §16), unless the lock records it as an
      exception whose "what" is "axe: <rule id>";
  and once, tools/check-actions.mjs on the product's source (actions/SPEC.md) and tools/check-parts.mjs on its screens.
  Differences the lock records pass and are listed. Exit 1 on any failure. Writes OUT/report.md and the screenshots.

  Needs Playwright with Chromium, and axe-core, in the product (npm i -D playwright axe-core) or installed globally.
*/
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFile, execSync } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const KIT = dirname(dirname(fileURLToPath(import.meta.url)));
const argv = process.argv.slice(2);
const opt = (name, fallback) => (argv.includes('--' + name) ? argv[argv.indexOf('--' + name) + 1] : fallback);
const file = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
if (!file) { console.error('Usage: node tools/check-product.mjs PAGES.json [--base URL] [--storage PATH] [--lock PATH] [--out DIR] [--jobs 4]'); process.exit(2); }

const here = dirname(resolve(file));
const spec = JSON.parse(readFileSync(file, 'utf8'));
const widths = spec.widths ?? [1280, 390];
const lockPath = opt('lock', existsSync(join(here, 'antarax-kit.lock')) ? join(here, 'antarax-kit.lock') : null);
const lock = lockPath ? JSON.parse(readFileSync(lockPath, 'utf8')) : { exceptions: [] };
const axeExceptions = new Map((lock.exceptions ?? []).filter((e) => /^axe: /i.test(e.what)).map((e) => [e.what.slice(5).trim().toLowerCase(), e.why]));
const out = resolve(opt('out', join(here, 'kit-check')));
const jobs = Math.max(1, Number(opt('jobs', 4)));
mkdirSync(out, { recursive: true });

const requireFrom = (dir) => createRequire(join(dir, 'x.js'));
const globalRoot = (() => { try { return execSync('npm root -g', { encoding: 'utf8' }).trim(); } catch { return null; } })();
function load(name) {
  for (const dir of [here, process.cwd(), KIT, globalRoot].filter(Boolean)) {
    try { return requireFrom(dir)(name); } catch {}
    try { return requireFrom(join(dir, 'node_modules'))(name); } catch {}
  }
  return null;
}
const playwright = load('playwright');
const axePath = (() => { for (const dir of [here, process.cwd(), KIT, globalRoot].filter(Boolean)) { try { return requireFrom(dir).resolve('axe-core/axe.min.js'); } catch {} } return null; })();
if (!playwright) { console.error('check-product needs Playwright: npm i -D playwright && npx playwright install chromium'); process.exit(2); }
if (!axePath) { console.error('check-product needs axe-core: npm i -D axe-core'); process.exit(2); }
const axeSource = readFileSync(axePath, 'utf8');

const pages = spec.surfaces.flatMap((s) => s.pages.map((p) => ({ surface: s.name, base: opt('base', s.base), storage: opt('storage', s.storage ? resolve(here, s.storage) : undefined), path: p })));
if (!pages.length) { console.error(`${file} lists no pages.`); process.exit(2); }
const slug = (p) => (p.path === '/' ? 'home' : p.path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')) || 'home';

const rows = []; // { page, width, check, ok, recorded, detail }
const add = (page, width, check, ok, recorded, detail) => rows.push({ page, width, check, ok, recorded, detail });

// 1. The shell checker, a few pages at a time (each starts its own browser).
async function shellCheck(p) {
  const args = [join(KIT, 'tools/check-shell.mjs'), p.base + p.path, '--widths', widths.join(','), '--out', join(out, `${p.surface}-${slug(p)}`.toLowerCase())];
  if (p.storage) args.push('--storage', p.storage);
  if (lockPath) args.push('--lock', lockPath);
  let text = '';
  try { text = (await run(process.execPath, args, { encoding: 'utf8', timeout: 240000, maxBuffer: 1 << 24 })).stdout; } catch (e) { text = String(e.stdout ?? '') + String(e.stderr ?? ''); }
  const lines = text.split('\n').filter((l) => /^(ok|FAIL|RECORDED)\s/.test(l));
  if (!lines.length) add(p.path, '', 'check-shell', false, false, text.trim().split('\n').slice(-3).join(' ') || 'no output');
  for (const l of lines) {
    const m = /^(ok|FAIL|RECORDED)\s+(\d+)px\s+([^:]+):\s*(.*)$/.exec(l.trim());
    if (m) add(p.path, Number(m[2]), m[3], m[1] !== 'FAIL', m[1] === 'RECORDED', m[4]);
  }
}
for (let i = 0; i < pages.length; i += jobs) await Promise.all(pages.slice(i, i + jobs).map(shellCheck));

// 2. axe on every page at every width, in one browser.
const browser = await playwright.chromium.launch();
try {
  for (const p of pages) {
    for (const width of widths) {
      const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, storageState: p.storage });
      // Injected before the page's own scripts, as Playwright does, so a strict Content-Security-Policy stays on and
      // its violations are still reported below.
      await ctx.addInitScript({ content: axeSource });
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      try {
        const res = await page.goto(p.base + p.path, { waitUntil: 'networkidle' });
        if (!res || res.status() >= 400) { add(p.path, width, 'Page opens', false, false, `HTTP ${res ? res.status() : 'no answer'}`); await ctx.close(); continue; }
        const r = await page.evaluate(async () => {
          const v = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] });
          return v.violations.map((x) => ({ id: x.id, impact: x.impact, help: x.help, nodes: x.nodes.length, where: x.nodes.slice(0, 2).map((n) => n.target.join(' ')) }));
        });
        if (!r.length) add(p.path, width, 'axe (WCAG 2.2 AA)', true, false, 'no violations');
        for (const v of r) {
          const why = axeExceptions.get(v.id.toLowerCase());
          add(p.path, width, `axe: ${v.id}`, !!why, !!why, `${v.impact}: ${v.help} (${v.nodes} element${v.nodes === 1 ? '' : 's'}: ${v.where.join(', ')})${why ? `; recorded: ${why}` : ''}`);
        }
        add(p.path, width, 'No script errors', !errors.length, false, errors.length ? errors.slice(0, 3).join(' | ') : 'none');
      } catch (e) {
        add(p.path, width, 'Page opens', false, false, e.message.split('\n')[0]);
      }
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}

// 3. The actions scan on the source.
for (const src of spec.src ?? []) {
  let text = '';
  let code = 0;
  try { text = (await run(process.execPath, [join(KIT, 'tools/check-actions.mjs'), resolve(here, src)], { encoding: 'utf8', maxBuffer: 1 << 24 })).stdout; } catch (e) { text = String(e.stdout ?? ''); code = e.code ?? 1; }
  const fails = text.split('\n').filter((l) => /^FAIL\s/.test(l.trim()));
  add(src, '', 'check-actions', code === 0 && !fails.length, false, fails.length ? fails.slice(0, 5).join(' | ') : (text.trim().split('\n').at(-1) ?? 'clean'));
}

for (const dir of spec.parts ?? []) {
  let text = '';
  let code = 0;
  try { text = (await run(process.execPath, [join(KIT, 'tools/check-parts.mjs'), resolve(here, dir)], { encoding: 'utf8', maxBuffer: 1 << 24 })).stdout; } catch (e) { text = String(e.stdout ?? ''); code = e.code ?? 1; }
  const fails = text.split('\n').filter((l) => /^FAIL\s/.test(l.trim()));
  add(dir, '', 'check-parts', code === 0 && !fails.length, false, fails.length ? fails.slice(0, 5).map((l) => l.trim()).join(' | ') : (text.trim().split('\n').at(-1) ?? 'clean'));
}

// The report.
const failed = rows.filter((r) => !r.ok);
const recorded = rows.filter((r) => r.recorded);
const md = [
  `# Kit check: ${spec.product}`,
  '',
  `${pages.length} pages × ${widths.join(' and ')} px, ${rows.length} results: ${failed.length ? `**${failed.length} failed**` : 'all passed'}${recorded.length ? `, ${recorded.length} recorded in the lock` : ''}. Kit ${KIT}.`,
  '',
  '| Page | Width | Check | Result | Detail |',
  '|---|---|---|---|---|',
  ...rows.filter((r) => !r.ok || r.recorded).map((r) => `| \`${r.page}\` | ${r.width} | ${r.check} | ${r.recorded ? 'recorded' : '**failed**'} | ${String(r.detail).replace(/\|/g, '\\|')} |`),
  '',
  `Pages: ${pages.map((p) => `\`${p.path}\``).join(', ')}.`,
].join('\n');
writeFileSync(join(out, 'report.md'), md + '\n');
for (const r of failed) console.log(`FAIL  ${String(r.width).padStart(4)}  ${r.page}  ${r.check}: ${r.detail}`);
for (const r of recorded) console.log(`RECORDED  ${String(r.width).padStart(4)}  ${r.page}  ${r.check}`);
console.log(`\n${pages.length} pages, ${rows.length} results: ${failed.length ? `${failed.length} failed` : 'all passed'}${recorded.length ? `, ${recorded.length} recorded` : ''}. Report: ${join(out, 'report.md')}`);
process.exitCode = failed.length ? 1 : 0;
