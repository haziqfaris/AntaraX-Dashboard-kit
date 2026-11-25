// The kit's list template on Astryx (axle/SPEC.md §9; app/reference/ListToolbar.jsx and useListState.js rebuilt on
// Astryx, astryx/SPEC.md §6). First built in AwanGan's AXLE (src/axle/ui/list.tsx, decision 0054). Copy it into a
// product, set `product`, and keep its behaviour: a stats strip that follows the filters; search, filters, sort and
// grouping kept in the address; a CSV export named axle-<product>-<list>-<YYYY-MM-DD>.csv (UTF-8, ISO dates, plain
// numbers). The server draws it from the same state the address holds, so the first paint and the hydrated page match.
// Its layout is kit-patterns.css (.stats, .listbar, .table-wrap).
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Selector } from '@astryxdesign/core/Selector';
import { Table, type TableColumn } from '@astryxdesign/core/Table';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
export interface Choice { value: string; label: string }

/** The list's state as the address holds it: ?q=, one ?f.<key>= per filter, ?sort=, ?group=. */
export type ListQuery = Record<string, string>;

export interface ListFilter<T> {
  key: string;
  label: string;
  /** "All" first is added for you. */
  options: Choice[];
  get: (row: T) => string;
}
export interface ListSort<T> {
  value: string;
  label: string;
  cmp: (a: T, b: T) => number;
}
export interface ListStat<T> {
  label: string;
  value: (rows: T[]) => string | number;
}

export interface KitListProps<T extends Record<string, unknown>> {
  /** The product's key, as in its antarax-kit.lock: awangan, yaraone, cebis. */
  product: string;
  /** The list's name in the CSV file and the address: models, keys, members. */
  list: string;
  title?: string;
  rows: T[];
  idKey: keyof T & string;
  columns: TableColumn<T>[];
  /** The words a row is found by. */
  text: (row: T) => string;
  filters?: ListFilter<T>[];
  sorts?: ListSort<T>[];
  /** Group rows under a heading by this value. */
  group?: { label: string; get: (row: T) => string };
  stats?: ListStat<T>[];
  csv: { header: string[]; row: (row: T) => (string | number | null)[] };
  /** Today in the server's time zone, YYYY-MM-DD, for the file's name. */
  today: string;
  /** The address's list state when the page was drawn. */
  query: ListQuery;
  empty: { title: string; description: string };
  /** The list's own action at the right of the toolbar (Add, Invite). */
  action?: ReactNode;
}

const cell = (v: string | number | null) => {
  const s = v === null ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
/** The CSV text: a header row, then one line per row, CRLF, UTF-8 with a byte order mark for spreadsheet apps. */
export const toCsv = (header: string[], rows: (string | number | null)[][]) => '﻿' + [header, ...rows].map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
export const csvName = (product: string, list: string, today: string) => `axle-${product}-${list}-${today}.csv`;

export function KitList<T extends Record<string, unknown>>(p: KitListProps<T>) {
  const [q, setQ] = useState(p.query.q ?? '');
  const [f, setF] = useState<Record<string, string>>(() => Object.fromEntries((p.filters ?? []).map((x) => [x.key, p.query[`f.${x.key}`] ?? ''])));
  const [sort, setSort] = useState(p.query.sort ?? p.sorts?.[0]?.value ?? '');
  const [grouped, setGrouped] = useState(p.query.group === '1');

  // The address follows the list, so a copied link opens the same view (§19 "Links").
  useEffect(() => {
    const u = new URL(window.location.href);
    const set = (k: string, v: string) => (v ? u.searchParams.set(k, v) : u.searchParams.delete(k));
    set('q', q.trim());
    for (const x of p.filters ?? []) set(`f.${x.key}`, f[x.key] ?? '');
    set('sort', sort === (p.sorts?.[0]?.value ?? '') ? '' : sort);
    set('group', grouped ? '1' : '');
    if (u.href !== window.location.href) window.history.replaceState(null, '', u.href);
  }, [q, f, sort, grouped]);

  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let rows = p.rows.filter((r) => {
      const t = p.text(r).toLowerCase();
      return words.every((w) => t.includes(w)) && (p.filters ?? []).every((x) => !f[x.key] || x.get(r) === f[x.key]);
    });
    const s = p.sorts?.find((x) => x.value === sort);
    if (s) rows = [...rows].sort(s.cmp);
    return rows;
  }, [q, f, sort, p.rows]);

  const download = () => {
    const blob = new Blob([toCsv(p.csv.header, shown.map(p.csv.row))], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = csvName(p.product, p.list, p.today);
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const groups = grouped && p.group ? [...new Set(shown.map(p.group.get))].map((g) => ({ g, rows: shown.filter((r) => p.group!.get(r) === g) })) : [{ g: '', rows: shown }];
  const filtered = shown.length !== p.rows.length;

  return (
    <VStack gap={3}>
      {p.stats?.length ? (
        <dl className="stats" aria-label={filtered ? 'Counts for the rows shown' : 'Counts'}>
          {p.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value(shown)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="listbar" role="search" aria-label={`Find in ${p.title ?? p.list}`}>
        <div className="listbar-q">
          <TextInput label="Search" isLabelHidden placeholder="Search" type="search" value={q} onChange={setQ} autoComplete="off" />
        </div>
        {(p.filters ?? []).map((x) => (
          <div className="listbar-f" key={x.key}>
            <Selector label={x.label} isLabelHidden options={[{ value: '', label: `${x.label}: all` }, ...x.options.map((o) => ({ value: o.value, label: `${x.label}: ${o.label}` }))]} value={f[x.key] ?? ''} onChange={(v) => setF({ ...f, [x.key]: v ?? '' })} />
          </div>
        ))}
        {p.sorts && p.sorts.length > 1 ? (
          <div className="listbar-f">
            <Selector label="Sort" isLabelHidden options={p.sorts.map((s) => ({ value: s.value, label: `Sort: ${s.label}` }))} value={sort} onChange={(v) => setSort(v ?? sort)} />
          </div>
        ) : null}
        {p.group ? <Button label={grouped ? 'Ungroup' : `Group by ${p.group.label.toLowerCase()}`} variant="secondary" onClick={() => setGrouped(!grouped)} /> : null}
        <span className="listbar-sp" />
        <Text type="supporting" hasTabularNumbers>{filtered ? `${shown.length} of ${p.rows.length}` : `${p.rows.length}`}</Text>
        <Button label="Export CSV" variant="secondary" onClick={download} isDisabled={!shown.length} />
        {p.action}
      </div>
      {shown.length ? (
        groups.map(({ g, rows }) => (
          <VStack key={g || 'all'} gap={1}>
            {g ? <Heading level={3}>{`${g} (${rows.length})`}</Heading> : null}
            <div className="table-wrap">
              <Table<T> data={rows} idKey={p.idKey} density="compact" columns={p.columns} />
            </div>
          </VStack>
        ))
      ) : (
        <EmptyState title={filtered ? 'Nothing matches' : p.empty.title} description={filtered ? 'Change the search or a filter.' : p.empty.description} isCompact />
      )}
    </VStack>
  );
}
