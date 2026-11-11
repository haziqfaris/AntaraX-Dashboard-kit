#!/usr/bin/env node
/*
  Writes one Astryx theme per AntaraX product, and one for AXLE, from the brand kit snapshot (components/SPEC.md §4).

    node tools/build-astryx-themes.mjs            write astryx/themes/<key>/<key>Theme.ts
    node tools/build-astryx-themes.mjs --check    change nothing; fail if a theme file is missing or differs

  Sources: brand/product-palettes.json (each product's roles, neutrals, status and dark slots) and brand/tokens.json
  (fonts, the bar's per-product shape, AXLE's page and signal colours). Every theme extends Astryx's Neutral theme and
  overrides only what the brand kit decides. A product copies its file into src/themes/<key>/ and runs
  `npx astryx theme build src/themes/<key>/<key>Theme.ts`; it never edits a colour by hand.
*/
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const palettes = JSON.parse(readFileSync(join(ROOT, 'brand/product-palettes.json'), 'utf8')).products;
const tokens = JSON.parse(readFileSync(join(ROOT, 'brand/tokens.json'), 'utf8'));
const lock = readFileSync(join(ROOT, 'brand/brand-kit.lock'), 'utf8');
const source = (lock.match(/version\D*([\d.]+)/) || [, '?'])[1] + ', commit ' + ((lock.match(/commit\D*([0-9a-f]{7,40})/) || [, '?'])[1]).slice(0, 7);

const FOCUS = '#0459F7'; // AntaraX blue is the focus ring everywhere (brand kit 13)
const font = (v) => v.split(',')[0].replace(/['"]/g, '').trim();
const fallbacks = (v) => v.split(',').slice(1).join(',').trim();
const SANS = tokens.font.sans.value, MONO = tokens.font.mono.value;

// Each product's shape, as its shell bar and its mocks draw it (app SPEC §2.2; app/mock/ActionsScreens P map):
// [page radius, card radius, control radius]. A product not listed takes the default.
const SHAPE = { default: [24, 20, 12], frame: [16, 20, 12], janka: [20, 20, 12], angka: [28, 20, 14], tinara: [0, 0, 4] };
const alpha = (hex, a) => hex + a;

function lines(obj) {
  return Object.entries(obj).map(([k, v]) => `    '${k}': ${Array.isArray(v) ? `['${v[0]}', '${v[1]}']` : `'${v}'`},`).join('\n');
}

function productTokens(p) {
  const r = p.roles, ui = p.ui, d = ui.dark, s = ui.status, n = p.neutral;
  const st = (k, dark) => ({
    [`--color-${k[0]}`]: [s[k[1]][2], s[k[1]][0]],
    [`--color-${k[0]}-muted`]: [s[k[1]][1], alpha(s[k[1]][0], '3D')],
    [`--color-text-${k[0]}`]: [s[k[1]][2], s[k[1]][0]],
    [`--color-icon-${k[0]}`]: [s[k[1]][2], s[k[1]][0]],
    [`--color-on-${k[0]}-muted`]: [s[k[1]][2], dark],
  });
  return {
    '--color-background-body': [ui.surface.sunken, d.ground],
    '--color-background-surface': [ui.surface.ground, d.raised],
    '--color-background-card': [ui.surface.raised, d.raised],
    '--color-background-popover': [ui.surface.raised, d.raised],
    '--color-background-muted': [ui.surface.hover, d.sunken],
    '--color-accent': [r.action, d.action],
    '--color-accent-muted': [r.subtle, alpha(d.accent, '3D')],
    '--color-text-accent': [r['accent-text'], d.accent],
    '--color-icon-accent': [r.action, d.accent],
    '--color-on-accent': [ui.text['on-action'], d['on-action']],
    '--color-text-primary': [ui.text.strong, d.strong],
    '--color-text-secondary': [ui.text.muted, d.muted],
    '--color-text-disabled': [ui.text.disabled, d.muted],
    '--color-icon-primary': [ui.text.strong, d.strong],
    '--color-icon-secondary': [ui.text.muted, d.muted],
    '--color-icon-disabled': [ui.text.disabled, d.muted],
    '--color-border': [ui.border.default, d.border],
    '--color-border-emphasized': [ui.border.strong, d.border],
    '--color-overlay': [ui.surface.overlay, 'rgba(5,13,38,.72)'],
    '--color-skeleton': [n['100'], d.sunken],
    ...st(['success', 'ok'], d.strong),
    ...st(['warning', 'warn'], d.strong),
    ...st(['error', 'fault'], d.strong),
    ...st(['info', 'info'], d.strong),
    '--color-on-success': ['#FFFFFF', d.ground],
    '--color-on-error': ['#FFFFFF', d.ground],
    '--color-on-info': ['#FFFFFF', d.ground],
    '--color-on-warning': ['#FFFFFF', d.ground],
    '--focus-outline-color': [FOCUS, '#4D84FE'],
  };
}

function axleTokens() {
  const a = tokens.axle.color, pg = a.page, sg = a.signal, s = a.status, v = (o) => o.value;
  return {
    '--color-background-body': v(pg.page),
    '--color-background-surface': v(pg.card),
    '--color-background-card': v(pg.card),
    '--color-background-popover': v(pg.card),
    '--color-background-muted': v(pg['row-line']),
    '--color-accent': v(sg.orange),
    '--color-accent-muted': v(sg['orange-tint']),
    '--color-text-accent': v(sg['orange-text']),
    '--color-icon-accent': v(sg['orange-text']),
    '--color-on-accent': v(sg['on-orange']),
    '--color-text-primary': v(pg['text-strong']),
    '--color-text-secondary': v(pg['text-muted']),
    '--color-text-disabled': v(pg['text-disabled']),
    '--color-icon-primary': v(pg['text-strong']),
    '--color-icon-secondary': v(pg['text-muted']),
    '--color-icon-disabled': v(pg['text-disabled']),
    '--color-border': v(pg['card-line']),
    '--color-border-emphasized': v(pg['control-line']),
    '--color-overlay': 'rgba(7,18,51,.56)',
    '--color-success': v(s['ok-text']), '--color-success-muted': v(s['ok-tint']), '--color-text-success': v(s['ok-text']), '--color-icon-success': v(s['ok-text']), '--color-on-success-muted': v(s['ok-text']),
    '--color-warning': v(s['warn-text']), '--color-warning-muted': v(s['warn-tint']), '--color-text-warning': v(s['warn-text']), '--color-icon-warning': v(s['warn-text']), '--color-on-warning-muted': v(s['warn-text']),
    '--color-error': v(s['fault-text']), '--color-error-muted': v(s['fault-tint']), '--color-text-error': v(s['fault-text']), '--color-icon-error': v(s['fault-text']), '--color-on-error-muted': v(s['fault-text']),
    '--color-info': v(pg.link), '--color-info-muted': v(pg['info-tint']), '--color-text-info': v(pg.link), '--color-icon-info': v(pg.link), '--color-on-info-muted': v(pg.link),
    '--color-on-success': '#FFFFFF', '--color-on-error': '#FFFFFF', '--color-on-info': '#FFFFFF', '--color-on-warning': '#FFFFFF',
    '--focus-outline-color': v(pg.link),
  };
}

function theme(key, name, toks, shape, note) {
  const [page, card, ctrl] = shape;
  const exp = key + 'Theme';
  return `// ${name}'s Astryx theme. GENERATED by the Dashboard kit's tools/build-astryx-themes.mjs from the AntaraX brand kit
// (${source}): do not edit. To change a value, change it in the brand kit with an owner decision, sync the kit, and run
// the tool again. ${note}
// Build: npx astryx theme build src/themes/${key}/${exp}.ts   (Dashboard kit components/SPEC.md §4)
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const ${exp} = defineTheme({
  name: 'antarax-${key}',
  extends: neutralTheme,

  // Poppins for words, JetBrains Mono for every number and code (brand kit 13).
  typography: {
    body: {family: '${font(SANS)}', fallbacks: '${fallbacks(SANS).replace(/'/g, '"')}'},
    heading: {family: '${font(SANS)}', fallbacks: '${fallbacks(SANS).replace(/'/g, '"')}', weights: {1: 600, 2: 600, 3: 600, 4: 600}},
    code: {family: '${font(MONO)}', fallbacks: '${fallbacks(MONO).replace(/'/g, '"')}'},
  },

  // 44px controls on a touch screen; with a mouse, dense rows stay compact (app SPEC §11b, brand kit control.minHeight).
  adaptations: {
    rules: [
      {
        when: {pointer: 'coarse'},
        value: {tokens: {'--size-element-md': '44px', '--size-element-lg': '44px'}},
      },
    ],
  },

  tokens: {
${lines(toks)}
    '--radius-inner': '${Math.max(ctrl - 4, 0)}px',
    '--radius-element': '${ctrl}px',
    '--radius-container': '${card}px',
    '--radius-page': '${page}px',
  },

  // A destructive button is solid in the fault colour with white text, as every kit mock draws it (actions/SPEC.md §5).
  components: {
    button: {
      'variant:destructive': {backgroundColor: 'var(--color-error)', color: 'var(--color-on-error)'},
    },
  },
});

// The quiet destructive button for a dense row (app SPEC §11b): the secondary button with the fault
// colour for its text and border. Use it on a \`variant="secondary"\` Button; Astryx has no variant of its own for it.
export const quietDestructive = {color: 'var(--color-error)', borderColor: 'var(--color-error)', backgroundColor: 'transparent'};
`;
}

const out = [];
for (const [key, p] of Object.entries(palettes)) {
  out.push([key, theme(key, p.name, productTokens(p), SHAPE[key] || SHAPE.default, 'Light and dark from the product\'s own palette.')]);
}
out.push(['axle', theme('axle', 'AXLE', axleTokens(), [20, 20, 12], 'The page inside AXLE; its dark bars stay axle/tokens.css. REKA orange is the main action.')]);

let bad = 0;
for (const [key, text] of out) {
  const file = join(ROOT, 'astryx/themes', key, key + 'Theme.ts');
  if (CHECK) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== text) { console.error(`stale: ${file.slice(ROOT.length + 1)}. Run node tools/build-astryx-themes.mjs.`); bad++; }
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
  }
}
console.log(CHECK ? (bad ? `${bad} Astryx theme(s) out of step with the brand kit snapshot.` : `${out.length} Astryx themes in step with the brand kit snapshot (${source}).`) : `Wrote ${out.length} Astryx themes into astryx/themes/ (${source}).`);
process.exit(bad ? 1 : 0);
