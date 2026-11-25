// The page header under the top bar (axle/SPEC.md §6 "Page header"; app/SPEC.md): one line on what the page is for,
// the state line, "How this page works" folded, and the page's one main action at the right. First built in AwanGan's
// AXLE (decision 0054). Layout: kit-patterns.css (.pagehead).
import type { ReactNode } from 'react';
import { Collapsible } from '@astryxdesign/core/Collapsible';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';

export function PageHead({ text, state, how, end }: { text: string; state: string; how?: string[]; end?: ReactNode }) {
  return (
    <div className="pagehead">
      <VStack gap={1}>
        <Text as="p" weight="medium">{text}</Text>
        <Text type="supporting" as="p" hasTabularNumbers>{state}</Text>
        {how?.length ? (
          <Collapsible defaultIsOpen={false} trigger={<Text type="supporting" weight="semibold">How this page works</Text>}>
            <ul className="plain how">{how.map((x) => <li key={x}>{x}</li>)}</ul>
          </Collapsible>
        ) : null}
      </VStack>
      {end ? <div className="pagehead-end">{end}</div> : null}
    </div>
  );
}

/** A page's views as tabs that are links, so the view is in the address (axle/SPEC.md §19 "Links"). */
export function PageTabs<T extends string>({ label, tabs, current, href }: { label: string; tabs: Record<T, string>; current: T; href: (t: T) => string }) {
  return (
    <nav className="tabs" aria-label={label}>
      {(Object.keys(tabs) as T[]).map((t) => (
        <a key={t} href={href(t)} aria-current={current === t ? 'page' : undefined}>{tabs[t]}</a>
      ))}
    </nav>
  );
}
