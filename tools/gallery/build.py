# Builds inventory/gallery.html from each product's nav.json and screenshots.
# Run from anywhere: python3 tools/gallery/build.py (needs Pillow).
import json, os, re
from PIL import Image
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'inventory')
PRODUCTS = [
  ('yara','Yara','#08B0B3','Management app · Yara AXLE · worker PWA'),
  ('janka','Janka','#0CC4FB','Web app · phone scanner · Janka AXLE'),
  ('plexyz-grid','PLExyz Grid','#2C09B2','Staff app · tenant portal · Grid AXLE'),
  ('plexyz-crowd','PLExyz Crowd','#2C09B2','Facilities app (branded AXLE) · client view'),
  ('ax-frame','AX Frame','#074AF8','Ledger (desktop) · Insight (phone) · AXLE'),
  ('angka','Angka','#6B3F6B','Customer app (light and dark) · AXLE · Lapis'),
  ('tinara','Tinara','#7A1E3C','Partner app · Tinara Admin'),
  ('lapisan-console','Lapisan Console','#0459F7','Developer console · AXLE Central (not built)'),
  ('iso-generator','ISO Generator','#0C1F30','Workspace app · REKA Admin (its AXLE) · a REKA product, not in the brand kit'),
]
OTHER = {'iso-generator':'Other','plexyz-grid':'Tenant portal','plexyz-crowd':'Client view','angka':'Lapis','lapisan-console':'Public site'}
METHOD = {'local-run':'Demo mode','mocked':'Fake backend','repo-existing':'From repo','harness':'Spec mock','live-public':'Live site'}
items = []; prods = []
for slug, name, accent, surfaces in PRODUCTS:
  d = json.load(open(f'{ROOT}/{slug}/nav.json'))
  shots = sorted(d['screenshots'], key=lambda s: os.path.basename(s['file']))
  prods.append({'slug':slug,'name':name,'accent':accent,'surfaces':surfaces,'repo':d['repo'],'commit':d['commit'],'count':len(shots)})
  for s in shots:
    fn = os.path.basename(s['file']); path = f'{slug}/screenshots/{fn}'
    w,h = Image.open(f'{ROOT}/{path}').size
    low = fn.lower()
    if re.search(r'sign-?in|signup|pending-approval', low): cat, label = 'signin','Sign-in'
    elif low.startswith('spec-') or low.startswith('repo-reference'): cat, label = 'reference','Reference'
    elif s['surface'] in ('customer','developer'): cat, label = 'customer', 'Developer console' if s['surface']=='developer' else 'Customer app'
    elif s['surface']=='axle': cat, label = 'axle', 'Tinara Admin' if slug=='tinara' else 'AXLE'
    elif s['surface']=='worker': cat, label = 'other', 'Worker app' if slug=='yara' else 'Phone scanner'
    else: cat, label = 'other', OTHER.get(slug,'Other')
    vp = 'phone' if w < 700 else 'desktop'
    full = h > w*1.35 if vp=='desktop' else h > w*2.4
    items.append({'p':slug,'src':path,'w':w,'h':h,'cat':cat,'label':label,'vp':vp,'full':full,
      'what':s.get('what') or fn,'method':METHOD.get(s.get('method'),s.get('method') or ''),
      'notes':s.get('notes') or '','file':fn})
data = json.dumps({'products':prods,'items':items}, ensure_ascii=False).replace('</','<\\/')
tpl = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'template.html')).read()
open(f'{ROOT}/gallery.html','w').write(tpl.replace('/*__DATA__*/null', data))
print(len(items), 'items', sum(1 for i in items if i['vp']=='phone'), 'phone')
