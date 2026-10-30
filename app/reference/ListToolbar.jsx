import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchIcon, CloseIcon } from './icons.jsx';
import { useMenu } from './useMenu.js';

// The tools every long list offers (SPEC §11a): saved views, search, filters on its main fields, sort, group and a
// choice of view where they fit, CSV when it is tabular, and the applied filters as chips with Clear filters.
// It draws nothing of the list itself. Pair it with useListState() so the state is remembered, and with
// NoMatch below when the filters find nothing. Its look is the product's own: restyle .ax-list-* freely.
//
//   filters  [{ id: 'stage', label: 'Stage', value, options: [{ value: 'cutting', label: 'Cutting' }] }]
//   sort     { value, dir: 'asc' | 'desc', options: [{ value: 'due', label: 'Due date' }] }
//   group    { value, options } or nothing      views ['list', 'board', 'table'] or nothing (one view: no switch)
//   savedViews  { items: [{ id, name }], current, onPick(id | null), onSave(name), onRename(id, name), onDelete(id) }
//               from useSavedViews() in useListState.js
export function ListToolbar({
  noun = 'records', query, onQuery, filters = [], onFilter, sort, onSort, group, onGroup,
  views, view, onView, onExport, shown, total, onClear, savedViews,
}) {
  const applied = filters.filter((f) => f.value);
  const name = (f) => f.options.find((o) => o.value === f.value)?.label ?? f.value;
  return (
    <div className="ax-list-tools">
      <div className="ax-list-toolbar" role="search">
        {savedViews ? <SavedViews noun={noun} {...savedViews} /> : null}
        <label className="ax-list-search">
          <SearchIcon />
          <input type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder={`Search ${noun}`} aria-label={`Search ${noun}`} />
        </label>
        {filters.map((f) => (
          <label key={f.id} className={`ax-list-select${f.value ? ' is-applied' : ''}`}>
            <span className="ax-visually-hidden">{f.label}</span>
            <select value={f.value} onChange={(e) => onFilter(f.id, e.target.value)}>
              <option value="">{f.label}: any</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{f.label}: {o.label}</option>)}
            </select>
          </label>
        ))}
        <span className="ax-spacer" />
        {sort ? (
          <span className="ax-list-sort">
            <label className="ax-list-select">
              <span className="ax-visually-hidden">Sort by</span>
              <select value={sort.value} onChange={(e) => onSort({ value: e.target.value, dir: sort.dir })}>
                {sort.options.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
              </select>
            </label>
            <button type="button" className="ax-list-button" aria-label={sort.dir === 'asc' ? 'Ascending; sort descending' : 'Descending; sort ascending'} onClick={() => onSort({ value: sort.value, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}>
              {sort.dir === 'asc' ? '↑' : '↓'}
            </button>
          </span>
        ) : null}
        {group ? (
          <label className="ax-list-select">
            <span className="ax-visually-hidden">Group by</span>
            <select value={group.value} onChange={(e) => onGroup(e.target.value)}>
              <option value="">Group: none</option>
              {group.options.map((o) => <option key={o.value} value={o.value}>Group: {o.label}</option>)}
            </select>
          </label>
        ) : null}
        {views && views.length > 1 ? (
          <span className="ax-list-views" role="radiogroup" aria-label="View">
            {views.map((v) => (
              <button key={v} type="button" role="radio" aria-checked={view === v} onClick={() => onView(v)}>{v[0].toUpperCase() + v.slice(1)}</button>
            ))}
          </span>
        ) : null}
        {onExport ? <button type="button" className="ax-list-button" onClick={onExport}>Export CSV</button> : null}
      </div>
      {applied.length || query ? (
        <div className="ax-list-applied">
          {shown != null && total != null ? <span>Showing <b className="ax-mono">{shown}</b> of <b className="ax-mono">{total}</b></span> : null}
          {applied.map((f) => (
            <span key={f.id} className="ax-list-chip">
              {f.label}: {name(f)}
              <button type="button" aria-label={`Remove ${f.label}: ${name(f)}`} onClick={() => onFilter(f.id, '')}><CloseIcon /></button>
            </span>
          ))}
          <button type="button" className="ax-ghost-button" onClick={onClear}>Clear filters</button>
        </div>
      ) : null}
    </div>
  );
}

// Named saved views (SPEC §11a): a Views menu first in the toolbar. "All ‹records›" comes first and cannot be
// deleted; then the person's own views, each renamed or deleted from its ⋯; Save view names the list as it is.
function SavedViews({ noun, items = [], current = null, onPick, onSave, onRename, onDelete }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null); // null, { kind: 'save' }, { kind: 'rename' | 'actions' | 'delete', id }
  const [draft, setDraft] = useState('');
  const buttonRef = useRef(null);
  const close = useCallback(() => { setOpen(false); setMode(null); }, []);
  const menuRef = useMenu(open && !(mode && (mode.kind === 'save' || mode.kind === 'rename')), close, buttonRef);
  // after a save, rename or delete, focus goes back into the menu, so the keys and Escape still work
  useEffect(() => {
    if (open && !mode) menuRef.current?.querySelector('[role="menuitemradio"][aria-checked="true"], [role="menuitemradio"]')?.focus();
  }, [open, mode, menuRef, items.length]);
  const all = `All ${noun}`;
  const label = items.find((v) => v.id === current)?.name ?? all;
  const pick = (id) => { onPick?.(id); close(); buttonRef.current?.focus(); };
  const submit = (e) => {
    e.preventDefault();
    const name = draft.trim();
    if (!name) return;
    if (mode.kind === 'save') onSave?.(name); else onRename?.(mode.id, name);
    setMode(null); setDraft('');
  };
  const form = (
    <form className="ax-views-form" onSubmit={submit}>
      <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Name this view" placeholder="Name this view"
        onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); setMode(null); } }} />
      <button type="submit" className="ax-menu-confirm">Save</button>
    </form>
  );
  return (
    <span className="ax-anchor">
      <button ref={buttonRef} type="button" className="ax-list-button ax-views-button" aria-haspopup="menu" aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}>
        <span className="ax-views-label">Views</span>{label}
      </button>
      {open ? (
        <div ref={menuRef} role="menu" aria-label="Views" className="ax-menu ax-menu-views">
          <button type="button" role="menuitemradio" aria-checked={current == null} className="ax-menu-item ax-menu-row ax-views-item" onClick={() => pick(null)}>
            <span>{all}</span>
          </button>
          {items.map((v) => (
            <div key={v.id} className="ax-views-own">
              {mode?.kind === 'rename' && mode.id === v.id ? form : (
                <button type="button" role="menuitemradio" aria-checked={current === v.id} className="ax-menu-item ax-menu-row ax-views-item" onClick={() => pick(v.id)}>
                  <span>{v.name}</span>
                </button>
              )}
              {mode?.kind === 'actions' && mode.id === v.id ? (
                <span className="ax-views-actions">
                  <button type="button" role="menuitem" className="ax-menu-item" onClick={() => { setDraft(v.name); setMode({ kind: 'rename', id: v.id }); }}>Rename</button>
                  <button type="button" role="menuitem" className="ax-menu-item" onClick={() => setMode({ kind: 'delete', id: v.id })}>Delete</button>
                </span>
              ) : mode?.kind === 'delete' && mode.id === v.id ? (
                <span className="ax-views-actions">
                  <button type="button" role="menuitem" className="ax-menu-confirm" onClick={() => { onDelete?.(v.id); setMode(null); }}>Delete “{v.name}”</button>
                  <button type="button" role="menuitem" className="ax-menu-item" onClick={() => setMode(null)}>Cancel</button>
                </span>
              ) : mode?.kind === 'rename' && mode.id === v.id ? null : (
                <button type="button" role="menuitem" className="ax-views-more" aria-label={`Rename or delete ${v.name}`} onClick={() => setMode({ kind: 'actions', id: v.id })}>⋯</button>
              )}
            </div>
          ))}
          <div className="ax-views-divider" />
          {mode?.kind === 'save' ? form : (
            <button type="button" role="menuitem" className="ax-menu-item ax-views-save" onClick={() => { setDraft(''); setMode({ kind: 'save' }); }}>Save view</button>
          )}
        </div>
      ) : null}
    </span>
  );
}

// When the filters find nothing: say so, never the empty state, never a blank table (SPEC §11a).
export function NoMatch({ noun = 'records', onClear }) {
  return (
    <div className="ax-list-nomatch" role="status">
      <strong>No {noun} match these filters</strong>
      <button type="button" className="ax-list-button" onClick={onClear}>Clear filters</button>
    </div>
  );
}
