#!/usr/bin/env node
/*
  Renders the kit's mocks to PNG, so a builder can read them without opening the canvas,
  and checks that the renders and each mock's values table are in step with the mock.

    node tools/render-mocks.mjs app/mock                  render every PNG listed in app/mock/renders.json
    node tools/render-mocks.mjs app/mock --only AppBar    render only the PNGs of mocks whose name starts with AppBar
    node tools/render-mocks.mjs app/mock --check          change nothing; fail if a PNG or a values table is stale or missing
    node tools/render-mocks.mjs app/mock --stamp-values   after re-reading each values table against its mock, record that it is current

  Rendering needs Playwright and Chromium (npm i -D playwright; npx playwright install chromium).
  --check needs neither: it compares hashes only, so CI can run it on every push.

  What is hashed: the mock and every mock it imports (<dc-import>), so a change to the top bar
  makes every PNG that shows the top bar stale. The renders' manifest is <mock dir>/renders/manifest.json.
*/
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dir = resolve(args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--only') || 'app/mock');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const CHECK = args.includes('--check');
const STAMP = args.includes('--stamp-values');

const read = (p) => readFileSync(p, 'utf8');
const config = JSON.parse(read(join(dir, 'renders.json')));
const canvas = JSON.parse(read(join(dir, 'canvas.json')));
const outDir = join(dir, config.out || 'renders');
const manifestPath = join(outDir, 'manifest.json');
const mocks = Object.keys(canvas.boards);

function imports(name, seen = new Set()) {
  if (seen.has(name)) return seen;
  seen.add(name);
  for (const m of read(join(dir, name)).matchAll(/<dc-import\b[^>]*\bname="([^"]+)"/g)) imports(m[1] + '.dc.html', seen);
  return seen;
}

function sourceHash(name) {
  const h = createHash('sha256');
  for (const n of [...imports(name)].sort()) h.update(n + '\0' + read(join(dir, n)) + '\0');
  return h.digest('hex').slice(0, 16);
}

function renderList() {
  return config.renders.map((r) => {
    const board = canvas.boards[r.mock];
    if (!board) throw new Error(`renders.json names ${r.mock}, which is not on the canvas`);
    return {
      ...r,
      name: r.name || r.mock.replace('.dc.html', ''),
      width: r.width || board.w,
      height: r.height || board.h,
      fullPage: r.fullPage ?? !r.height,
    };
  });
}

const valuesPath = (mock) => join(dir, mock.replace('.dc.html', '.values.md'));
const STAMP_RE = /^<!-- values for (\S+), source ([0-9a-f]{16}) -->\n/;

function check() {
  const problems = [];
  const manifest = existsSync(manifestPath) ? JSON.parse(read(manifestPath)) : { renders: {} };
  const want = renderList();
  for (const mock of mocks) {
    if (!want.some((r) => r.mock === mock)) problems.push(`${mock} has no render in renders.json.`);
    const vp = valuesPath(mock);
    if (!existsSync(vp)) { problems.push(`${relative(process.cwd(), vp)} is missing: every mock has a values table beside it.`); continue; }
    const m = STAMP_RE.exec(read(vp));
    if (!m) problems.push(`${relative(process.cwd(), vp)} does not start with its stamp line. Run --stamp-values after checking it.`);
    else if (m[2] !== sourceHash(mock)) problems.push(`${relative(process.cwd(), vp)} was written for an earlier ${mock}. Re-read it against the mock, correct it, then run --stamp-values.`);
  }
  for (const r of want) {
    const entry = manifest.renders[r.name + '.png'];
    if (!entry || !existsSync(join(outDir, r.name + '.png'))) problems.push(`${r.name}.png is missing. Run node tools/render-mocks.mjs ${relative(process.cwd(), dir)}.`);
    else if (entry.source !== sourceHash(r.mock) || JSON.stringify(entry.props || {}) !== JSON.stringify(r.props || {})) problems.push(`${r.name}.png is older than ${r.mock}. Run node tools/render-mocks.mjs ${relative(process.cwd(), dir)} --only ${r.mock.replace('.dc.html', '')}.`);
  }
  const listed = new Set(want.map((r) => r.name + '.png'));
  for (const f of existsSync(outDir) ? readdirSync(outDir) : []) if (f.endsWith('.png') && !listed.has(f)) problems.push(`${f} is not in renders.json: remove it.`);
  for (const p of problems) console.log('STALE: ' + p);
  if (!problems.length) console.log(`Renders and values tables are in step with the ${mocks.length} mocks in ${relative(process.cwd(), dir) || '.'}.`);
  return problems.length ? 1 : 0;
}

function stamp() {
  for (const mock of mocks) {
    const vp = valuesPath(mock);
    if (!existsSync(vp)) { console.log(`missing ${vp}`); continue; }
    const body = read(vp).replace(STAMP_RE, '');
    writeFileSync(vp, `<!-- values for ${mock}, source ${sourceHash(mock)} -->\n` + body);
  }
  console.log('Stamped the values tables as current. Only do this after reading each against its mock.');
  return 0;
}

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  try {
    const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
    return createRequire(join(root, 'noop.js'))('playwright');
  } catch {}
  console.error('Rendering needs Playwright: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

async function render() {
  const { chromium } = await loadPlaywright();
  const assets = JSON.parse(read(join(dir, 'assets', 'assets.json')));
  const blobs = {};
  for (const [id, file] of Object.entries(assets)) {
    if (id === 'note') continue;
    blobs[id] = 'data:image/svg+xml;base64,' + readFileSync(join(dir, 'assets', file)).toString('base64');
  }
  const sources = {};
  for (const f of readdirSync(dir)) if (f.endsWith('.dc.html')) sources[f] = read(join(dir, f));
  const engine = read(join(HERE, 'dc-render.js'));
  const fonts = new Map();
  const browser = await chromium.launch();
  mkdirSync(outDir, { recursive: true });
  const manifest = existsSync(manifestPath) ? JSON.parse(read(manifestPath)) : { renders: {} };
  manifest.note = 'Written by tools/render-mocks.mjs. Each PNG with the hash of the mocks it was drawn from.';
  let n = 0;
  for (const r of renderList()) {
    if (only && !r.mock.startsWith(only) && !r.name.startsWith(only)) continue;
    const page = await browser.newPage({ viewport: { width: r.width, height: r.height }, deviceScaleFactor: r.scale || 1 });
    // Fonts come from Google Fonts; fetched here so the browser needs no network setup of its own.
    await page.route(/fonts\.(googleapis|gstatic)\.com/, async (route) => {
      const url = route.request().url();
      if (!fonts.has(url)) {
        const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/140' } });
        fonts.set(url, { status: res.status, type: res.headers.get('content-type'), body: Buffer.from(await res.arrayBuffer()) });
      }
      const f = fonts.get(url);
      await route.fulfill({ status: f.status, contentType: f.type, body: f.body, headers: { 'access-control-allow-origin': '*' } });
    });
    await page.setContent('<!doctype html><html lang="en-GB"><head><meta charset="utf-8"></head><body style="margin:0"><div id="dc-root"></div></body></html>');
    await page.addScriptTag({ content: engine });
    await page.evaluate((o) => window.renderDC(o), { sources, entry: r.mock, props: r.props || {}, blobs });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(outDir, r.name + '.png'), fullPage: r.fullPage, animations: 'disabled' });
    await page.close();
    manifest.renders[r.name + '.png'] = { mock: r.mock, props: r.props || {}, width: r.width, source: sourceHash(r.mock) };
    n++;
    console.log(`  ${r.name}.png`);
  }
  await browser.close();
  const sorted = {};
  for (const k of Object.keys(manifest.renders).sort()) sorted[k] = manifest.renders[k];
  manifest.renders = sorted;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Rendered ${n} PNG${n === 1 ? '' : 's'} into ${relative(process.cwd(), outDir)}.`);
  return 0;
}

process.exitCode = CHECK ? check() : STAMP ? stamp() : await render();
