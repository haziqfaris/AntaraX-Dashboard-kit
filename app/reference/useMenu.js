import { useEffect, useRef } from 'react';

// What every shell menu does (SPEC §11, §17): focus moves into it when it opens, arrow keys move between
// items, Tab stays inside, Escape and a click outside close it, and focus goes back to the button.
export function useMenu(open, onClose, buttonRef) {
  const menuRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const menu = menuRef.current;
    const items = () => Array.from(menu.querySelectorAll('[role="menuitem"], [role="menuitemradio"]'));
    items()[0]?.focus();
    const close = () => { onClose(); buttonRef?.current?.focus(); };
    const onKey = (e) => {
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
      else if (e.key === 'Home') { e.preventDefault(); list[0]?.focus(); }
      else if (e.key === 'End') { e.preventDefault(); list[list.length - 1]?.focus(); }
      else if (e.key === 'Tab') { e.preventDefault(); list[(i + (e.shiftKey ? -1 : 1) + list.length) % list.length]?.focus(); }
    };
    const onDown = (e) => { if (!menu.contains(e.target) && !buttonRef?.current?.contains(e.target)) onClose(); };
    menu.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { menu.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open, onClose, buttonRef]);
  return menuRef;
}
