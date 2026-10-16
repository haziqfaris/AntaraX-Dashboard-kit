#!/usr/bin/env python3
"""Keep the Dashboard kit in step with the AntaraX brand kit.

The brand kit owns every colour and size. Its tokens/tokens.json has an "axle" section;
this script copies the brand kit's tokens and its product palettes (tokens/product-palettes.json,
each product's own colours) into brand/ (a pinned snapshot), records which
version and commit they came from in brand/brand-kit.lock, and generates axle/tokens.css
from the "axle" section. Never edit axle/tokens.css by hand.

  python3 tools/sync-brand-kit.py                     sync from ../AntaraX-brand-kit
  python3 tools/sync-brand-kit.py --brand-kit PATH    sync from a brand kit checkout elsewhere
  python3 tools/sync-brand-kit.py --check             change nothing; fail if anything has drifted
  python3 tools/sync-brand-kit.py --project PATH      check a REKA client project: no AntaraX colour may appear in it

--check fails when:
  - axle/tokens.css is not exactly what the snapshot generates (someone edited it by hand);
  - a mock in axle/mock/ uses a hex colour that is in neither the brand kit tokens nor a product
    palette (a board that shows a product's own side, such as a support session, uses that
    product's palette);
  - a brand kit checkout is available (--brand-kit, or ../AntaraX-brand-kit) and its tokens or
    product palettes differ from the snapshot (the brand kit changed and this kit has not been synced);
  - a mock in project/mock/ uses any AntaraX colour (project SPEC §3), except a board marked
    "antarax-comparison", which shows an AntaraX product beside a project on purpose.

--project PATH checks a client project's own code the same way: every .css, .scss, .ts, .tsx, .js,
.jsx, .html and .json file under PATH, skipping node_modules, .next and build output.
"""
import argparse, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAPSHOT = os.path.join(HERE, 'brand', 'tokens.json')
PALETTES = os.path.join(HERE, 'brand', 'product-palettes.json')
LOCK = os.path.join(HERE, 'brand', 'brand-kit.lock')
OUT = os.path.join(HERE, 'axle', 'tokens.css')
MOCK = os.path.join(HERE, 'axle', 'mock')
PROJECT_MOCK = os.path.join(HERE, 'project', 'mock')
NEUTRAL = {'#FFFFFF', '#000000'}
CODE_EXT = ('.css', '.scss', '.ts', '.tsx', '.js', '.jsx', '.html', '.json')
SKIP_DIRS = {'node_modules', '.next', '.open-next', 'dist', 'build', 'out', '.git', '.vercel'}
DEFAULT_KIT = os.path.join(os.path.dirname(HERE), 'AntaraX-brand-kit')
HEX = re.compile(r'#[0-9a-fA-F]{6}\b')


def vkey(v):
    return tuple(int(x) for x in re.findall(r'\d+', v))


def generate(tokens, lock):
    ax = tokens['axle']
    out = [
        '/*',
        '  AXLE tokens. GENERATED from the AntaraX brand kit: do not edit.',
        '  Source: haziqfaris/AntaraX-brand-kit tokens/tokens.json "axle", version %s (%s), commit %s.' % (lock['version'], lock['updated'], lock['commit']),
        '  To change a value, change it in the brand kit (with an owner decision), then run tools/sync-brand-kit.py here.',
        '  Use these names only. A colour that is not here is not part of AXLE: raise it, do not add it in a product.',
        '*/',
        '',
        '.axle-root {',
        '  --axle-font: Poppins, ui-sans-serif, system-ui, sans-serif;',
        '  --axle-mono: "JetBrains Mono", ui-monospace, Menlo, monospace; /* every number, tabular-nums */',
        '',
    ]
    for group, entries in ax['color'].items():
        out.append('  /* %s: %s */' % (group, entries.get('use', '')))
        for name, tok in entries.items():
            if name == 'use':
                continue
            note = (' /* %s */' % tok['use']) if tok.get('use') else ''
            out.append('  --axle-%s: %s;%s' % (name, tok['value'], note))
        out.append('')
    out.append('  /* size */')
    for name, value in ax['size'].items():
        out.append('  --axle-%s: %s;' % (name, value))
    out.append('}')
    return '\n'.join(out) + '\n'


def read(path):
    return open(path, encoding='utf-8').read()


def brand_hexes(tokens):
    found = HEX.findall(json.dumps(tokens))
    if os.path.isfile(PALETTES):
        found += HEX.findall(read(PALETTES))
    return {h.upper() for h in found}


def mock_strays(tokens):
    allowed = brand_hexes(tokens)
    strays = {}
    for name in sorted(os.listdir(MOCK)):
        if not name.endswith('.dc.html'):
            continue
        for h in HEX.findall(open(os.path.join(MOCK, name), encoding='utf-8').read()):
            if h.upper() not in allowed:
                strays.setdefault(h.upper(), set()).add(name)
    return strays


def antarax_in_project(tokens, root, only_mock=False):
    """AntaraX colours found in a REKA client project: {hex: {files}}. White and black are allowed."""
    banned = brand_hexes(tokens) - NEUTRAL
    found = {}
    for d, dirs, files in os.walk(root):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for name in files:
            if only_mock and not name.endswith('.dc.html'):
                continue
            if not only_mock and not name.endswith(CODE_EXT):
                continue
            path = os.path.join(d, name)
            text = open(path, encoding='utf-8', errors='replace').read()
            if only_mock and 'antarax-comparison' in text:
                continue
            for h in HEX.findall(text):
                if h.upper() in banned:
                    found.setdefault(h.upper(), set()).add(os.path.relpath(path, root))
    return found


def kit_commit(path):
    try:
        return subprocess.check_output(['git', '-C', path, 'rev-parse', '--short', 'HEAD'], text=True, stderr=subprocess.DEVNULL).strip()
    except Exception:
        return 'unknown'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--brand-kit', help='path to a checkout of haziqfaris/AntaraX-brand-kit')
    ap.add_argument('--check', action='store_true', help='change nothing; exit 1 on any drift')
    ap.add_argument('--project', help='check a REKA client project at PATH for AntaraX colours; change nothing')
    args = ap.parse_args()
    if args.project:
        tokens = json.load(open(SNAPSHOT, encoding='utf-8'))
        found = antarax_in_project(tokens, args.project)
        for h, files in sorted(found.items()):
            print('ANTARAX COLOUR: %s in %s. A client project never uses AntaraX colours (project SPEC §3).' % (h, ', '.join(sorted(files))))
        if not found:
            print('No AntaraX colour in %s.' % args.project)
        return 1 if found else 0
    kit = args.brand_kit or (DEFAULT_KIT if os.path.isdir(DEFAULT_KIT) else None)
    kit_tokens_path = os.path.join(kit, 'tokens', 'tokens.json') if kit else None
    kit_palettes_path = os.path.join(kit, 'tokens', 'product-palettes.json') if kit else None

    if not args.check:
        if not kit_tokens_path or not os.path.isfile(kit_tokens_path):
            sys.exit('No brand kit found. Clone haziqfaris/AntaraX-brand-kit beside this repo, or pass --brand-kit PATH.')
        os.makedirs(os.path.dirname(SNAPSHOT), exist_ok=True)
        shutil.copyfile(kit_tokens_path, SNAPSHOT)
        shutil.copyfile(kit_palettes_path, PALETTES)
        tokens = json.load(open(SNAPSHOT, encoding='utf-8'))
        lock = {'source': 'haziqfaris/AntaraX-brand-kit', 'file': 'tokens/tokens.json',
                'palettes': 'tokens/product-palettes.json',
                'version': tokens['version'], 'updated': tokens['updated'], 'commit': kit_commit(kit)}
        open(LOCK, 'w', encoding='utf-8').write(json.dumps(lock, indent=2) + '\n')
        open(OUT, 'w', encoding='utf-8').write(generate(tokens, lock))
        print('Synced brand kit tokens %s and product palettes (commit %s) into brand/ and axle/tokens.css.' % (lock['version'], lock['commit']))
        strays = mock_strays(tokens)
        for h, files in sorted(strays.items()):
            print('  not a brand token: %s in %s' % (h, ', '.join(sorted(files))))
        return 1 if strays else 0

    problems = []
    tokens = json.load(open(SNAPSHOT, encoding='utf-8'))
    lock = json.load(open(LOCK, encoding='utf-8'))
    if open(OUT, encoding='utf-8').read() != generate(tokens, lock):
        problems.append('axle/tokens.css is not what the brand kit snapshot generates. Do not edit it by hand: run tools/sync-brand-kit.py.')
    for h, files in sorted(mock_strays(tokens).items()):
        problems.append('%s is used in %s but is not a brand kit token or product palette colour. Use a token, or add it to the brand kit first.' % (h, ', '.join(sorted(files))))
    if os.path.isdir(PROJECT_MOCK):
        for h, files in sorted(antarax_in_project(tokens, PROJECT_MOCK, only_mock=True).items()):
            problems.append('%s is an AntaraX colour, used in project/mock %s. Client projects never use one (project SPEC §3).' % (h, ', '.join(sorted(files))))
    if kit_tokens_path and os.path.isfile(kit_tokens_path):
        if open(kit_tokens_path, encoding='utf-8').read() != open(SNAPSHOT, encoding='utf-8').read():
            upstream = json.load(open(kit_tokens_path, encoding='utf-8'))
            if vkey(upstream['version']) < vkey(tokens['version']):
                problems.append('The snapshot (%s) is ahead of this brand kit checkout (%s): merge the brand kit change into its default branch first.' % (tokens['version'], upstream['version']))
            else:
                problems.append('The brand kit has changed (now %s, snapshot %s). Run tools/sync-brand-kit.py and commit the result.' % (upstream['version'], tokens['version']))
        elif not os.path.isfile(PALETTES) or read(kit_palettes_path) != read(PALETTES):
            problems.append('The brand kit product palettes differ from the snapshot. Run tools/sync-brand-kit.py and commit the result.')
    else:
        print('No brand kit checkout found: checked against the snapshot only (%s, commit %s).' % (lock['version'], lock['commit']))
    for p in problems:
        print('DRIFT: ' + p)
    if not problems:
        print('In step with the brand kit %s (commit %s).' % (lock['version'], lock['commit']))
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
