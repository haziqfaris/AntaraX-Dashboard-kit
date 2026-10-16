#!/usr/bin/env python3
"""Check a product's capacity.json against the AXLE capacity standard (axle SPEC §10.13).

  python3 capacity/check.py PATH [PATH ...]

Plain Python, no packages, so any product's CI can run it from a copy of this kit.
Exits 1 on any problem and names each one.
"""
import json, re, sys

CLASSES = {'data', 'files', 'transfer', 'requests', 'compute', 'connections', 'deployables',
           'jobs', 'messages', 'ai', 'outside-apis', 'backups'}
ACTIONS = {'upgrade-plan', 'reduce-use', 'change-architecture', 'move-provider'}
HOW = {'provider-api', 'query', 'log', 'manual', 'none'}
ID = re.compile(r'^[a-z][a-z0-9-]*$')


def check(c):
    out = []
    for k in ('product', 'updated', 'plans', 'resources', 'availability'):
        if k not in c:
            out.append('missing "%s"' % k)
    if out:
        return out
    if not ID.match(str(c['product'])):
        out.append('product: "%s" is not a plain id' % c['product'])
    plans = {}
    for i, p in enumerate(c['plans']):
        at = 'plans[%d] %s' % (i, p.get('id', '?'))
        for k in ('id', 'provider', 'plan', 'confirmed'):
            if k not in p:
                out.append('%s: missing "%s"' % (at, k))
        if p.get('id') in plans:
            out.append('%s: id used twice' % at)
        plans[p.get('id')] = p
    if not plans:
        out.append('plans: list every provider and plan the product runs on')
    seen, classes = set(), set()
    for i, r in enumerate(c['resources']):
        at = 'resources[%d] %s' % (i, r.get('id', '?'))
        for k in ('id', 'class', 'name', 'plan', 'unit', 'limit', 'measure', 'decide'):
            if k not in r:
                out.append('%s: missing "%s"' % (at, k))
        if r.get('id') in seen:
            out.append('%s: id used twice' % at)
        seen.add(r.get('id'))
        if r.get('class') not in CLASSES:
            out.append('%s: class "%s" is not one of %s' % (at, r.get('class'), ', '.join(sorted(CLASSES))))
        classes.add(r.get('class'))
        if r.get('plan') not in plans:
            out.append('%s: plan "%s" is not in plans' % (at, r.get('plan')))
        if r.get('limit') is None and 'budget' not in r:
            out.append('%s: no plan limit, so "budget" must say what REKA allows itself' % at)
        if r.get('limit') is not None and not isinstance(r.get('limit'), (int, float)):
            out.append('%s: limit must be a number or null' % at)
        m = r.get('measure') or {}
        if m.get('how') not in HOW:
            out.append('%s: measure.how must be one of %s' % (at, ', '.join(sorted(HOW))))
        if m.get('how') == 'none' and not m.get('why_not'):
            out.append('%s: not measured, so measure.why_not must say why and what would measure it' % at)
        if m.get('how') not in ('none', None) and not m.get('source'):
            out.append('%s: measure.source must name where the number comes from' % at)
        if r.get('warn_at', 80) > 80:
            out.append('%s: warn_at may be lower than 80, never higher' % at)
        if r.get('runway_days', 30) < 30:
            out.append('%s: runway_days may be longer than 30, never shorter' % at)
        d = r.get('decide') or []
        if not d:
            out.append('%s: decide must name at least one thing to do when it crosses' % at)
        for x in d:
            if x.get('action') not in ACTIONS or not x.get('what'):
                out.append('%s: each decision needs an action (%s) and what, in words' % (at, ', '.join(sorted(ACTIONS))))
    if not classes & {'data', 'files'}:
        out.append('resources: no "data" or "files" resource. Every product stores something; one resource may cover both where they share a disk')
    a = c['availability']
    if not str(a.get('url', '')).startswith('https://'):
        out.append('availability.url: an https page that touches the database')
    if not isinstance(a.get('every_minutes'), int) or not 1 <= a['every_minutes'] <= 15:
        out.append('availability.every_minutes: 1 to 15')
    if not a.get('from'):
        out.append('availability.from: where the check runs, outside the product\'s own hosting')
    unconfirmed = [p['id'] for p in c['plans'] if p.get('confirmed') is False]
    return out, unconfirmed


def main(paths):
    if not paths:
        sys.exit(__doc__)
    bad = 0
    for path in paths:
        try:
            c = json.load(open(path, encoding='utf-8'))
        except Exception as e:
            print('%s: not valid JSON: %s' % (path, e)); bad += 1; continue
        res = check(c)
        problems, unconfirmed = res if isinstance(res, tuple) else (res, [])
        if problems:
            bad += 1
            print('%s: %d problem%s' % (path, len(problems), '' if len(problems) == 1 else 's'))
            for p in problems:
                print('  - ' + p)
        else:
            note = ' Not confirmed yet: %s.' % ', '.join(unconfirmed) if unconfirmed else ''
            print('%s: follows the capacity standard (%s, %d plans, %d resources).%s' % (path, c['product'], len(c['plans']), len(c['resources']), note))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
