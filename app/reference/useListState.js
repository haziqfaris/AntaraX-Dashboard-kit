import { useCallback, useEffect, useState } from 'react';

// A long list's state, remembered (SPEC §11a): kept in the address so a view can be shared, and per person
// in this browser so coming back finds the list as it was left. The address wins when it has any of the keys.
//
//   const [state, set, reset] = useListState({ list: 'work-orders', person: user.id,
//     defaults: { q: '', stage: '', due: '', sort: 'due', dir: 'asc', group: '', view: 'table' } });
export function useListState({ list, person, defaults }) {
  const storeKey = `ax-list:${person}:${list}`;
  const read = () => {
    if (typeof window === 'undefined') return defaults;
    const url = new URLSearchParams(window.location.search);
    const fromUrl = {};
    for (const k of Object.keys(defaults)) if (url.has(k)) fromUrl[k] = url.get(k);
    if (Object.keys(fromUrl).length) return { ...defaults, ...fromUrl };
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(storeKey) || '{}') }; } catch { return defaults; }
  };
  const [state, setState] = useState(read);
  useEffect(() => {
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(state)) {
      if (v === defaults[k] || v === '' || v == null) url.searchParams.delete(k); else url.searchParams.set(k, v);
    }
    window.history.replaceState(window.history.state, '', url);
    try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch { /* private mode: the address still holds it */ }
  }, [state, storeKey]);
  const set = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState(defaults), [defaults]);
  return [state, set, reset];
}

// A person's named saved views of one list (SPEC §11a), kept per person in this browser. A product that has
// accounts on a server should keep them there instead, so they follow the person between devices.
// `current` is the view that matches the list as it is now, or null for "All ‹records›".
//
//   const views = useSavedViews({ list: 'work-orders', person: user.id, state, defaults });
//   <ListToolbar savedViews={{ ...views, onPick: (id) => set(views.stateOf(id)) }} … />
export function useSavedViews({ list, person, state, defaults }) {
  const storeKey = `ax-views:${person}:${list}`;
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(storeKey) || '[]'); } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem(storeKey, JSON.stringify(items)); } catch { /* private mode: views last for this visit */ }
  }, [items, storeKey]);
  const same = (a, b) => Object.keys(defaults).every((k) => String(a?.[k] ?? '') === String(b?.[k] ?? ''));
  const current = items.find((v) => same(v.state, state))?.id ?? null;
  const onSave = useCallback((name) => setItems((xs) => [...xs, { id: `v${Date.now().toString(36)}`, name, state }]), [state]);
  const onRename = useCallback((id, name) => setItems((xs) => xs.map((v) => (v.id === id ? { ...v, name } : v))), []);
  const onDelete = useCallback((id) => setItems((xs) => xs.filter((v) => v.id !== id)), []);
  const stateOf = (id) => (id == null ? defaults : { ...defaults, ...items.find((v) => v.id === id)?.state });
  return { items: items.map(({ id, name }) => ({ id, name })), current, onSave, onRename, onDelete, stateOf };
}

// CSV as SPEC §11a asks: UTF-8, ISO dates, plain numbers, currency in its own column, what is on screen.
export function csvName(product, list, date = new Date()) {
  return `${product}-${list}-${date.toISOString().slice(0, 10)}.csv`;
}

export function toCsv(rows, columns) {
  const cell = (v) => {
    if (v == null) return '';
    if (v instanceof Date) v = v.toISOString().slice(0, 10);
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return '﻿' + [columns.map((c) => cell(c.label)), ...rows.map((r) => columns.map((c) => cell(c.value(r))))].map((l) => l.join(',')).join('\r\n');
}

export function downloadCsv(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}
