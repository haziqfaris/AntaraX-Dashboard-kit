// The chat app (Dashboard kit astryx/templates/ChatApp.tsx, 1.21.0): a full-page AI chat in the AntaraX look, built on
// Astryx's own chat parts. First built for AwanGan's Assist at /try (its decision 0068). The product brings the state,
// the network and the bar (app/reference's AppBar); these are the parts every AntaraX chat shares:
//   ChatApp           the page: the conversation list on the left, folding away into a drawer below 768px, the chat
//   ConversationList  new chat, search, each conversation with its actions (rename, export, delete), a footer
//   ChatEmpty         an empty chat: what it is for, and suggestions to start with
//   Sparkle           the AntaraX AI sparkle (brand kit assets/antarax/sparkle.svg), still or thinking
//   Thinking          the thinking motion while the first words come, with Stop after 10 seconds
//   MaskedChip        "3 items masked": what the privacy shield hid in a message before it left
//   Receipt           under every answer: which model, on our server or paid, the time and the cost
// Layout and motion: kit-patterns.css (.chatapp, .chat-*). Motion is CSS only, from the theme's durations, and none
// under prefers-reduced-motion: the sparkle holds still.
import { useEffect, useState, type ReactNode } from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';

/** One conversation in the list. */
export interface ChatListItem {
  id: string;
  title: string;
  /** When it was last written to, as people say it: 14:05, Yesterday, 3 Nov. */
  when: string;
  href: string;
  /** Where a search matched, when one is asked. */
  match?: string;
}

/** An answer's receipt, as words: never a key, a prompt or the provider's own words. */
export interface ChatReceiptView {
  /** The model as people say it: Claude Haiku 5.5, AntaraX's own model. */
  label: string;
  where: 'local' | 'paid';
  /** "2.4 s" */
  time: string;
  /** "US$0.0012", or "no charge" on our own server. */
  cost: string;
  /** The price is a list price, not confirmed: the cost is an estimate. */
  estimate: boolean;
  /** A line worth saying: an allowance reached, a step passed over. */
  note?: string | null;
}

const PIECES: [string, string][] = [
  ['M341.497,393.504C343.205,394.409 342.985,394.412 344.615,395.268C350.479,397.415 350.435,397.162 356.51,398.18L360.467,398.127C361.25,398.585 362.033,399.042 362.815,399.5C364.128,406.614 365.84,405.401 365.9,405.433C367.576,419.076 367.193,440.292 367.053,441.739L368.931,442.5L369.297,443.5C372.461,449.655 374.616,447.753 378.657,453.257C379.631,454.583 382.355,454.238 382.683,454.196C386.23,453.746 386.08,454.562 389.712,455.03C395.407,455.763 390.801,457.868 390.653,458.019C395.615,458.569 396.003,457.803 399.49,461.533C400.028,462.109 400.462,462.573 408.889,464.5L409.749,463.385C412.513,469.838 412.599,469.778 412.829,470.341C401.216,469.087 377.567,471.264 374.513,471.546C370.237,471.939 367.05,467.863 364.725,473.925C370.982,475.015 407.828,474.747 412.805,473.5L413.815,472.356C413.939,472.613 414.778,474.362 415.432,475.533C405.199,481.117 392.758,475.467 379.5,480.051L378.5,480.213L377.5,480.621L376.5,480.882L375.5,481.29L374.483,482.445C367.332,481.659 367.285,482.441 363.483,485.683C360.826,485.681 358.168,485.679 355.511,485.677C343.608,488.234 344.125,489.324 333.283,495.085C310.988,506.929 310.732,510.714 300.716,507.06C297.414,505.855 292.994,498.541 294.688,493.563C304.937,463.441 325.288,450.756 308.963,419.246C303.645,408.98 297.618,396.417 296.66,394.418C289.196,378.859 303.353,371.486 313.38,376.738C315.7,377.954 329.433,385.148 341.497,393.504Z', 'rgb(82,79,233)'],
  ['M360.467,398.127C363.943,397.528 375.865,395.472 400.21,379.044C412.799,370.55 427.97,374.504 420.962,393.739C410.411,422.696 392.144,427.406 409.749,463.385L408.889,464.5C400.462,462.573 400.028,462.109 399.49,461.533C396.003,457.803 395.615,458.569 390.653,458.019C390.801,457.868 395.407,455.763 389.712,455.03C386.08,454.562 386.23,453.746 382.683,454.196C382.355,454.238 379.631,454.583 378.657,453.257C374.616,447.753 372.461,449.655 369.297,443.5L368.931,442.5L367.053,441.739C367.193,440.292 367.576,419.076 365.9,405.433C365.84,405.401 364.128,406.614 362.815,399.5C362.033,399.042 361.25,398.585 360.467,398.127Z', 'rgb(244,123,61)'],
  ['M415.432,475.533C425.766,493.946 423.068,499.419 422.125,501.331C414.038,517.734 396.404,500.888 373.346,488.794C382.29,484.599 382.471,485.369 392.5,485.855L393.5,485.864L394.5,485.855L395.5,485.85C401.698,487.829 401.895,485.895 404.827,482.5L404.5,481.182L403.5,481.14L402.5,481.08L401.5,481.068L400.5,481.022L399.5,481.022L398.5,481.072L397.5,480.976L396.5,481.021L395.5,480.935L394.5,480.935L393.5,481.052L392.5,481.045C386.199,481.123 385.384,482.62 374.483,482.445L375.5,481.29L376.5,480.882L377.5,480.621L378.5,480.213L379.5,480.051C392.758,475.467 405.199,481.117 415.432,475.533Z', 'rgb(12,196,251)'],
  ['M374.483,482.445C385.384,482.62 386.199,481.123 392.5,481.045L393.5,481.052L394.5,480.935L395.5,480.935L396.5,481.021L397.5,480.976L398.5,481.072L399.5,481.022L400.5,481.022L401.5,481.068L402.5,481.08L403.5,481.14L404.5,481.182L404.827,482.5C401.895,485.895 401.698,487.829 395.5,485.85L394.5,485.855L393.5,485.864L392.5,485.855C382.471,485.369 382.29,484.599 373.346,488.794C368.666,486.432 368.598,486.96 363.483,485.683C367.285,482.441 367.332,481.659 374.483,482.445Z', 'rgb(18,183,106)'],
  ['M412.829,470.341C413.158,471.013 413.487,471.684 413.815,472.356L412.805,473.5C407.828,474.747 370.982,475.015 364.725,473.925C367.05,467.863 370.237,471.939 374.513,471.546C377.567,471.264 401.216,469.087 412.829,470.341Z', 'rgb(113,113,234)'],
];

/**
 * The AntaraX AI sparkle, copied from the brand kit (assets/antarax/sparkle.svg), never redrawn. Thinking, its pieces
 * wiggle each on its own rotation, scale and timing (brand kit 04, "AI thinking"); under reduced motion it holds still.
 */
export function Sparkle({ size = 24, thinking = false, label }: { size?: number; thinking?: boolean; label?: string }) {
  return (
    <svg className={`chat-sparkle${thinking ? ' is-thinking' : ''}`} width={size} height={size} viewBox="287.94 370.80 141.59 141.59" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      {PIECES.map(([d, fill], i) => (
        <path key={i} className={`chat-sparkle-${i + 1}`} d={d} fill={fill} />
      ))}
    </svg>
  );
}

/** While the first words come: the sparkle thinking, said in words for screen readers; Stop is offered after 10 seconds. */
export function Thinking({ onStop, started }: { onStop?: () => void; started: number }) {
  const [long, setLong] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLong(true), Math.max(0, 10_000 - (Date.now() - started)));
    return () => clearTimeout(t);
  }, [started]);
  return (
    <div className="chat-thinking" role="status">
      <Sparkle size={28} thinking />
      <Text type="supporting">{long ? 'Still working on it' : 'Assist is thinking'}</Text>
      {long && onStop ? <Button label="Stop" size="sm" variant="secondary" onClick={onStop} /> : null}
    </div>
  );
}

/** What the privacy shield hid in a message before it left: shown on the message, counted, never the values. */
export function MaskedChip({ count }: { count: number }) {
  if (!count) return null;
  return <Badge variant="info" label={`${count} item${count === 1 ? '' : 's'} masked`} />;
}

/** Under every answer: which model, where it ran, the time and the cost. */
export function Receipt({ r }: { r: ChatReceiptView }) {
  return (
    <div className="chat-receipt">
      <Text type="supporting" hasTabularNumbers>
        <span className="chat-receipt-model">{r.label}</span>
        {' · '}
        <span className={`chat-where is-${r.where}`}>{r.where === 'local' ? 'On our server' : 'Paid'}</span>
        {` · ${r.time} · ${r.cost}${r.estimate ? ' (estimate)' : ''}`}
      </Text>
      {r.note ? <Text type="supporting" as="p">{r.note}</Text> : null}
    </div>
  );
}

/** An empty chat: what it is for, and a few suggestions to start with (each a button that fills the message box). */
export function ChatEmpty({ heading, text, suggestions, onPick }: { heading: string; text: string; suggestions: string[]; onPick: (s: string) => void }) {
  return (
    <div className="chat-empty">
      <Sparkle size={44} />
      <h2 className="chat-empty-h">{heading}</h2>
      <Text type="supporting" as="p">{text}</Text>
      <ul className="chat-suggestions" aria-label="Suggestions">
        {suggestions.map((s) => (
          <li key={s}>
            <Button label={s} variant="secondary" onClick={() => onPick(s)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The conversation list: New chat, search, each conversation with its own actions, and a footer (an allowance). */
export function ConversationList(p: { items: ChatListItem[]; currentId: string | null; onNew: () => void; query: string; onQuery: (q: string) => void; actions: (item: ChatListItem) => ReactNode; footer?: ReactNode; extra?: ReactNode }) {
  return (
    <div className="chat-list">
      <Button label="New chat" variant="primary" onClick={p.onNew} />
      <TextInput label="Search your conversations" isLabelHidden placeholder="Search your conversations" value={p.query} onChange={p.onQuery} />
      <nav className="chat-list-items" aria-label="Your conversations" tabIndex={0}>
        {p.items.length ? (
          <ul>
            {p.items.map((it) => (
              <li key={it.id} className="chat-list-row">
                <a href={it.href} aria-current={it.id === p.currentId ? 'page' : undefined}>
                  <span className="chat-list-title">{it.title}</span>
                  <span className="chat-list-when">{it.match ?? it.when}</span>
                </a>
                {p.actions(it)}
              </li>
            ))}
          </ul>
        ) : (
          <Text type="supporting" as="p">{p.query ? 'No conversation matches that search.' : 'Your conversations will be here. Start one with New chat.'}</Text>
        )}
      </nav>
      {p.extra}
      {p.footer ? <div className="chat-list-foot">{p.footer}</div> : null}
    </div>
  );
}

/**
 * The page: the bar above, the conversation list on the left and the chat beside it. Below 768px the list folds away
 * into a drawer the bar's menu button opens; Escape and the scrim close it.
 */
export function ChatApp({ bar, list, listOpen, onCloseList, children }: { bar: ReactNode; list: ReactNode; listOpen: boolean; onCloseList: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!listOpen) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onCloseList();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [listOpen, onCloseList]);
  return (
    <div className="chatapp" data-list={listOpen ? 'open' : 'closed'} data-kit-page>
      {bar}
      <div className="chatapp-body">
        <aside className="chatapp-list" id="chat-list" aria-label="Conversations">
          {list}
        </aside>
        <button className="chatapp-scrim" type="button" aria-label="Close your conversations" tabIndex={-1} onClick={onCloseList} />
        <main className="chatapp-main" id="main">
          {children}
        </main>
      </div>
    </div>
  );
}
