import { useMenu } from './useMenu.js';

// Help's menu, in this order in every product (SPEC §2.1, item 7). Send feedback, Contact support and
// Your requests open YaraOne's front office (yaraone/EMBEDS.md): pass `openYaraOne`, which calls
// YaraOne.open('feedback' | 'help' | 'requests', { token, context }). What's new appears only with `whatsNewHref`.
export function HelpMenu({ open, onClose, buttonRef, id = 'ax-help-menu', guideHref = '/guide', helpHref = '/help', whatsNewHref, openYaraOne }) {
  const ref = useMenu(open, onClose, buttonRef);
  if (!open) return null;
  const yo = (view) => () => { onClose(); openYaraOne?.(view); };
  const items = [
    { label: 'User guide', hint: 'How to do each task, step by step', href: guideHref },
    { label: 'Help centre', hint: 'Answers to common questions', href: helpHref },
    whatsNewHref && { label: "What's new", hint: 'Changes in the last month', href: whatsNewHref },
    { label: 'Send feedback', hint: 'Tell the team what would help', onSelect: yo('feedback') },
    { label: 'Contact support', hint: 'Ask for help or report a problem', onSelect: yo('help') },
    { label: 'Your requests', hint: 'Replies from REKA support', onSelect: yo('requests') },
  ].filter(Boolean);
  return (
    <div ref={ref} id={id} role="menu" aria-label="Help" className="ax-menu ax-menu-help">
      {items.map((it) => it.href
        ? <a key={it.label} role="menuitem" className="ax-menu-item" href={it.href}><span>{it.label}</span><small>{it.hint}</small></a>
        : <button key={it.label} type="button" role="menuitem" className="ax-menu-item" onClick={it.onSelect}><span>{it.label}</span><small>{it.hint}</small></button>)}
    </div>
  );
}
