// The reference components on one page, in any product's colours: demo.html?product=janka&theme=dark
// Build: npx esbuild demo.jsx --bundle --outfile=demo.js --jsx=automatic --loader:.js=jsx  (needs react and react-dom)
import { createRoot } from 'react-dom/client';
import { useMemo, useState } from 'react';
import { AppBar, useBarSize, ListToolbar, NoMatch, useListState, useSavedViews, toCsv, csvName, downloadCsv } from '../index.js';

const PRODUCTS = {
  yara: { name: 'Yara', mark: 'yara.svg', list: 'work-orders', noun: 'work orders', slot: 'New work order' },
  janka: { name: 'Janka', mark: 'janka.svg', list: 'stock', noun: 'stock items', slot: 'Scan' },
  frame: { name: 'AX Frame', mark: 'ax-frame.svg', list: 'assets', noun: 'assets', slot: 'Add' },
  angka: { name: 'Angka', mark: 'angka.svg', list: 'bills', noun: 'bills', slot: 'Add' },
  tinara: { name: 'Tinara', mark: 'tinara.svg', list: 'signals', noun: 'signals', slot: 'Start campaign' },
  grid: { name: 'PLExyz Grid', mark: 'plexyz-grid.svg', list: 'bays', noun: 'bays', slot: 'Today' },
};
const ROWS = [
  { id: 'WO-2026-0412', customer: 'Tegap Fabrication', stage: 'cutting', due: '2026-10-17' },
  { id: 'WO-2026-0415', customer: 'Kilang Seri Maju', stage: 'cutting', due: '2026-10-18' },
  { id: 'WO-2026-0419', customer: 'Tegap Fabrication', stage: 'welding', due: '2026-10-20' },
  { id: 'WO-2026-0421', customer: 'Bina Utara Steel', stage: 'painting', due: '2026-10-21' },
];
const STAGES = [{ value: 'cutting', label: 'Cutting' }, { value: 'welding', label: 'Welding' }, { value: 'painting', label: 'Painting' }];
const DEFAULTS = { q: '', stage: '', sort: 'due', dir: 'asc', view: 'table' };

function Demo() {
  const params = new URLSearchParams(location.search);
  const key = PRODUCTS[params.get('product')] ? params.get('product') : 'yara';
  const p = PRODUCTS[key];
  const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  const size = useBarSize();
  const assets = '../../mock/assets/';
  const [list, set, reset] = useListState({ list: p.list, person: 'demo', defaults: DEFAULTS });
  const views = useSavedViews({ list: p.list, person: 'demo', state: list, defaults: DEFAULTS });
  const rows = useMemo(() => ROWS
    .filter((r) => (!list.q || (r.id + r.customer).toLowerCase().includes(list.q.toLowerCase())) && (!list.stage || r.stage === list.stage))
    .sort((a, b) => (list.dir === 'asc' ? 1 : -1) * a[list.sort === 'due' ? 'due' : 'id'].localeCompare(b[list.sort === 'due' ? 'due' : 'id'])), [list]);
  const [current, setCurrent] = useState('List');
  return (
    <div className="page" data-theme={theme}>
      <AppBar
        product={{ key, name: p.name, mark: assets + p.mark, aMark: assets + (theme === 'dark' ? 'antarax-a-white.svg' : 'antarax-a-blue.svg') }}
        theme={theme} size={size} title="Work orders" onMenu={() => {}}
        slot={<button type="button" className="ax-slot-button is-action">{p.slot}</button>}
        search={{ onOpen: () => {}, shortcut: '⌘K' }}
        notifications={{ count: 3, onOpen: () => {} }}
        help={{ whatsNewHref: '#whats-new', openYaraOne: (view) => alert(`YaraOne.open('${view}')`) }}
        account={{
          person: { name: 'Hafiz Roslan', initials: 'HR', email: 'hafiz@tegap-fab.example', role: 'Owner' },
          organisation: { name: 'Tegap Fabrication Sdn Bhd' }, isOwner: true, plan: 'Nova', version: 'v2.14',
          appearance: theme, onAppearance: () => {}, onSignOut: () => alert('Signed out'),
        }}
      />
      <main className="shell-root content" data-product={key} data-theme={theme === 'dark' ? 'dark' : undefined}>
        <nav aria-label={p.name} className="nav">
          {['List', 'Board', 'People'].map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(/\s+/g, '-')}`} className="ax-nav-item" aria-current={current === n ? 'page' : undefined} onClick={(e) => { e.preventDefault(); setCurrent(n); }}>{n}</a>
          ))}
        </nav>
        <section className="list">
          <ListToolbar
            noun={p.noun} query={list.q} onQuery={(q) => set({ q })}
            savedViews={{ ...views, onPick: (id) => set(views.stateOf(id)) }}
            filters={[{ id: 'stage', label: 'Stage', value: list.stage, options: STAGES }]} onFilter={(id, v) => set({ [id]: v })}
            sort={{ value: list.sort, dir: list.dir, options: [{ value: 'due', label: 'Due date' }, { value: 'id', label: 'Number' }] }} onSort={(s) => set({ sort: s.value, dir: s.dir })}
            views={['list', 'table']} view={list.view} onView={(view) => set({ view })}
            onExport={() => downloadCsv(csvName(key, p.list), toCsv(rows, [{ label: 'Number', value: (r) => r.id }, { label: 'Customer', value: (r) => r.customer }, { label: 'Stage', value: (r) => r.stage }, { label: 'Due', value: (r) => r.due }]))}
            shown={rows.length} total={ROWS.length} onClear={reset}
          />
          {rows.length ? (
            <table><tbody>{rows.map((r) => <tr key={r.id}><td className="ax-mono">{r.id}</td><td>{r.customer}</td><td>{r.stage}</td><td className="ax-mono">{r.due}</td></tr>)}</tbody></table>
          ) : <NoMatch noun={p.noun} onClear={reset} />}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Demo />);
