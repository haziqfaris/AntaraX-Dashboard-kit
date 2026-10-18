#!/usr/bin/env node
/*
  Scans a product's source for what actions/SPEC.md forbids and can be seen in the code.

    node tools/check-actions.mjs PATH [--ext .ts,.tsx,.js,.jsx,.vue,.svelte] [--json]

  It reports, with file and line:
    AC-01  browser pop-ups: alert(), confirm(), prompt() and window.alert/confirm/prompt
    AC-09  generic or raw error messages: "Something went wrong" (alone), "An error occurred", "Error:" + err,
           error.message or err.message shown straight to the screen (toast, alert, setError, innerText)
    AC-04  confirm buttons labelled OK, Yes, Confirm or Submit
    AC-05  (a hint) a <button> whose onClick awaits a call with no disabled/aria-busy/isPending nearby
  Skips node_modules, build output, tests and stories. Exit 1 when AC-01 or AC-04 is found; the rest are listed
  for a person to read, because a pattern cannot tell a written message from a raw one every time.
*/
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const argv = process.argv.slice(2);
const root = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--ext');
if (!root) { console.error('Usage: node tools/check-actions.mjs PATH [--ext .ts,.tsx,.js,.jsx] [--json]'); process.exit(2); }
const exts = (argv.includes('--ext') ? argv[argv.indexOf('--ext') + 1] : '.ts,.tsx,.js,.jsx,.mjs,.vue,.svelte').split(',');
const SKIP = /(^|\/)(node_modules|\.next|dist|build|out|coverage|\.open-next|\.git|vendor|public)(\/|$)|\.(test|spec|stories)\.[jt]sx?$|(^|\/)(tests?|e2e|__tests__|scripts)\//;

const RULES = [
  { id: 'AC-01', fail: true, what: 'browser pop-up', re: /(?<![\w.$'\"`])(?:window\.)?(alert|confirm|prompt)\(/g, keep: (line) => !/^\s*(\/\/|\*)/.test(line) && !/\bconfirm\s*\(\s*\)\s*\{|function\s+confirm|const\s+confirm\b|async\s+confirm\b|\.confirm\(|confirm:\s/.test(line) },
  { id: 'AC-04', fail: true, what: 'confirm button labelled OK, Yes, Confirm or Submit', re: /<(button|Button)\b[^>]*>\s*(OK|Ok|Yes|Confirm|Submit)\s*</g },
  { id: 'AC-09', fail: false, what: 'generic error message', re: /(['"`])(Something went wrong\.?|An error occurred\.?|An unexpected error occurred\.?|Oops[^'"`]*|Error)\1/g },
  { id: 'AC-09', fail: false, what: 'raw error message on screen', re: /(toast[\w.]*|alert|setError|setMessage|showError|innerText\s*=|textContent\s*=)\s*\(?\s*(?:`[^`]*\$\{)?\s*(err|error|e)(\??\.)message/g },
];

const found = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(root, p);
    if (SKIP.test(rel)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.includes(extname(name))) scan(p, rel);
  }
}
function scan(p, rel) {
  const lines = readFileSync(p, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const r of RULES) {
      r.re.lastIndex = 0;
      if (r.re.test(line) && (!r.keep || r.keep(line))) found.push({ id: r.id, fail: r.fail, what: r.what, file: rel, line: i + 1, text: line.trim().slice(0, 140) });
    }
    // AC-05 hint: an awaited call in an onClick on a button with no busy state on the same or next lines
    if (/<button[^>]*onClick=\{[^}]*\b(async|await)\b/.test(line)) {
      const near = lines.slice(Math.max(0, i - 2), i + 4).join(' ');
      if (!/disabled=|aria-busy|isPending|isLoading|loading|busy|pending|submitting/i.test(near)) found.push({ id: 'AC-05', fail: false, what: 'button awaits a request with no busy state nearby', file: rel, line: i + 1, text: line.trim().slice(0, 140) });
    }
  });
}
walk(root);

if (argv.includes('--json')) { console.log(JSON.stringify(found, null, 2)); }
else {
  for (const f of found) console.log(`${f.fail ? 'FAIL ' : 'CHECK'} ${f.id}  ${f.file}:${f.line}  ${f.what}\n        ${f.text}`);
  const by = (id) => found.filter((f) => f.id === id).length;
  console.log(`\nAC-01 browser pop-ups: ${by('AC-01')} · AC-04 OK/Yes/Confirm buttons: ${by('AC-04')} · AC-09 error messages to read: ${by('AC-09')} · AC-05 buttons to check: ${by('AC-05')}`);
}
process.exit(found.some((f) => f.fail) ? 1 : 0);
