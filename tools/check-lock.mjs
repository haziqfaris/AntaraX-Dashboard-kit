#!/usr/bin/env node
// Checks a product's antarax-kit.lock against this kit (practice/SPEC.md §9).
//
//   node tools/check-lock.mjs ../janka ../yara-one      one or more product checkouts
//   node tools/check-lock.mjs --ref origin/main ../tiko   the kit ref the pin must be on (default: origin/main, else main)
//
// Fails when a lock is missing, when its "version" has no release in CHANGELOG.md on that ref, when its
// "commit" is not on that ref (a pin to a branch that never merged, which is how a product ends up
// built against a kit nobody else can see), or when "follows" names a standard the kit does not have.
// It also says how far behind the kit's current version each product is; being behind is reported, not failed.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const refAt = args.indexOf('--ref');
const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const has = (ref) => { try { git('rev-parse', '--verify', '--quiet', ref + '^{commit}'); return true; } catch { return false; } };
const ref = refAt >= 0 ? args[refAt + 1] : (has('origin/main') ? 'origin/main' : 'main');
const products = args.filter((a, i) => refAt < 0 || (i !== refAt && i !== refAt + 1));
if (!products.length) { console.error('Usage: node tools/check-lock.mjs [--ref REF] PRODUCT_PATH...'); process.exit(2); }
if (!has(ref)) { console.error(`The kit ref ${ref} does not exist here. Fetch it, or pass --ref.`); process.exit(2); }

const changelog = git('show', `${ref}:CHANGELOG.md`);
const releases = [...changelog.matchAll(/^## (\d+\.\d+\.\d+) /gm)].map((m) => m[1]);
const current = git('show', `${ref}:VERSION`);
const STANDARDS = { app: 'app/SPEC.md', axle: 'axle/SPEC.md', project: 'project/SPEC.md', embeds: 'yaraone/EMBEDS.md', capacity: 'capacity/README.md', astryx: 'astryx/SPEC.md', actions: 'actions/SPEC.md', 'getting-in': 'getting-in/SPEC.md', practice: 'practice/SPEC.md' };
const vkey = (v) => v.split('.').map(Number);
const behind = (a, b) => { const [x, y] = [vkey(a), vkey(b)]; for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i]; return false; };

let bad = 0;
for (const p of products) {
  const file = join(resolve(p), 'antarax-kit.lock');
  const name = p.replace(/\/$/, '');
  if (!existsSync(file)) { console.log(`FAIL ${name}: no antarax-kit.lock (app/README.md, Pin the kit).`); bad++; continue; }
  let lock;
  try { lock = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { console.log(`FAIL ${name}: antarax-kit.lock is not JSON (${e.message}).`); bad++; continue; }
  const problems = [];
  if (!lock.version) problems.push('no "version"');
  else if (!releases.includes(lock.version)) problems.push(`version ${lock.version} is not a release on ${ref} (its CHANGELOG has no "## ${lock.version}")`);
  if (!lock.commit || /REPLACE/.test(lock.commit)) problems.push('no "commit"');
  else {
    try { git('merge-base', '--is-ancestor', lock.commit, ref); }
    catch { problems.push(`commit ${lock.commit} is not on ${ref}: the product was built against kit work that has not been merged`); }
  }
  for (const s of lock.follows || []) if (!STANDARDS[s]) problems.push(`follows "${s}", which is not a standard of this kit`);
  if (problems.length) { console.log(`FAIL ${name} (${lock.product || '?'}): ` + problems.join('; ') + '.'); bad++; }
  else console.log(`ok   ${name} (${lock.product || '?'}): ${lock.version}${behind(lock.version, current) ? `, behind the kit's ${current}: read the CHANGELOG from ${lock.version} up` : ', current'}.`);
}
process.exit(bad ? 1 : 0);
