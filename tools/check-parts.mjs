#!/usr/bin/env node
/*
  One part per job (app/SPEC.md §11, astryx/SPEC.md §6; YaraOne's scripts/lint-parts.mjs made for every product):
  in a product's screen code, a field, a menu, tabs, a dialog, a confirm or a fold comes from the product's parts
  library (Astryx, or its own primitives), never drawn by hand beside it.

    node tools/check-parts.mjs DIR [DIR...] [--ext .tsx,.jsx,.ts,.js,.vue,.svelte]

  It reports, with file and line, hand-made:
    PA-01  native fields: <select>, <textarea>, <input> other than type="hidden"
    PA-02  dialogs: <dialog>, role="dialog" or role="alertdialog"
    PA-03  menus: role="menu", role="menuitem", role="listbox"
    PA-04  tabs: role="tab", role="tablist"
    PA-05  folds: <details> (a Collapsible or the library's disclosure instead)
    PA-06  browser pop-ups: alert(), confirm(), prompt() (also tools/check-actions.mjs AC-01)
  A line with "parts-ok: <why>" (in a comment on it or the line above) is let through: a real exception, said where it
  is. Point it at the screens only (a product's UI folder), not at its server or its shell, which the kit draws.
  Exit 1 on any finding.
*/
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const argv = process.argv.slice(2);
const exts = (argv.includes('--ext') ? argv[argv.indexOf('--ext') + 1] : '.tsx,.jsx,.ts,.js,.vue,.svelte').split(',');
const roots = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--ext');
if (!roots.length) { console.error('Usage: node tools/check-parts.mjs DIR [DIR...] [--ext .tsx,.jsx]'); process.exit(2); }
const SKIP = /(^|\/)(node_modules|dist|build|out|coverage|\.git|vendor)(\/|$)|\.(test|spec|stories|d)\.[jt]sx?$/;

const RULES = [
  { id: 'PA-01', what: 'a native field', re: /<(select|textarea)\b|<input\b(?![^>]*type=["']hidden["'])/g },
  { id: 'PA-02', what: 'a hand-made dialog', re: /<dialog\b|role=["'](alert)?dialog["']/g },
  { id: 'PA-03', what: 'a hand-made menu', re: /role=["'](menu|menuitem|listbox)["']/g },
  { id: 'PA-04', what: 'hand-made tabs', re: /role=["'](tab|tablist)["']/g },
  { id: 'PA-05', what: 'a hand-made fold', re: /<details\b/g },
  { id: 'PA-06', what: 'a browser pop-up', re: /(?<![\w.$'"`])(?:window\.)?(alert|confirm|prompt)\(/g },
];

const files = [];
const walk = (p) => {
  if (SKIP.test(p)) return;
  const st = statSync(p);
  if (st.isDirectory()) for (const f of readdirSync(p)) walk(join(p, f));
  else if (exts.includes(extname(p))) files.push(p);
};
for (const r of roots) walk(r);

let found = 0;
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    if (/parts-ok:\s*\S/.test(line) || /parts-ok:\s*\S/.test(lines[i - 1] ?? '')) return;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      if (r.re.test(line)) {
        found++;
        console.log(`FAIL  ${r.id}  ${relative(process.cwd(), f)}:${i + 1}  ${r.what}\n        ${line.trim().slice(0, 140)}`);
      }
    }
  });
}
console.log(`\n${files.length} files: ${found ? `${found} hand-made part${found === 1 ? '' : 's'}` : 'every part from the library'}.`);
process.exitCode = found ? 1 : 0;
