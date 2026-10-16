import { useEffect, useRef, useState } from 'react';
import { BrandPill } from './BrandPill.jsx';
import { RoundControl } from './RoundControl.jsx';
import { HelpMenu } from './HelpMenu.jsx';
import { AccountButton, AccountMenu } from './AccountMenu.jsx';
import { MenuIcon, SearchIcon, BellIcon, HelpIcon } from './icons.jsx';

// The bar's width: 'phone' below the product's drawer width, 'medium' until the search field fits, 'wide' after.
// The breakpoints are the product's own; the sizes at each are the shell's (app/tokens.css).
export function useBarSize({ phoneBelow = 768, wideFrom = 1200 } = {}) {
  const get = () => (typeof window === 'undefined' ? 'wide' : window.innerWidth < phoneBelow ? 'phone' : window.innerWidth < wideFrom ? 'medium' : 'wide');
  const [size, setSize] = useState(get);
  useEffect(() => {
    const on = () => setSize(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [phoneBelow, wideFrom]);
  return size;
}

// The AntaraX shell's top bar (SPEC §2). Its order never changes: menu (drawer widths only), brand pill,
// page title (wide only), the product's slot, search, notifications, Help, and the account at the far right.
//
//   product  { key: 'yara', name: 'Yara', mark, aMark }   key is the palette name in app/tokens.css
//   theme    'light' | 'dark'
//   size     'wide' | 'medium' | 'phone'                  useBarSize() or the product's own
//   slot     the product's own controls (Add, Assist, a date range); drawn 40px tall (.ax-slot-button)
//   search   { onOpen, shortcut: '⌘K' } or nothing         notifications  { count, fault, onOpen } or nothing
//   help     props for HelpMenu (openYaraOne, whatsNewHref…)
//   account  props for AccountMenu (person, organisation, onSignOut…)
export function AppBar({ product, theme = 'light', size = 'wide', title, slot, onMenu, search, notifications, help = {}, account }) {
  const [open, setOpen] = useState(null);
  const helpRef = useRef(null);
  const accountRef = useRef(null);
  const phone = size === 'phone';
  const toggle = (which) => setOpen((o) => (o === which ? null : which));
  const close = () => setOpen(null);
  return (
    <div className="shell-root ax-bar-wrap" data-product={product.key} data-theme={theme === 'dark' ? 'dark' : undefined} data-size={size}>
      <header className="ax-bar">
        {onMenu && size !== 'wide' ? <RoundControl label="Open the menu" icon={<MenuIcon />} onClick={onMenu} /> : null}
        <BrandPill product={product.name} mark={product.mark} aMark={product.aMark} homeHref={product.homeHref} compact={phone} />
        {size === 'wide' && title ? <h1 className="ax-title">{title}</h1> : null}
        <span className="ax-spacer" />
        {!phone && slot ? <div className="ax-slot">{slot}</div> : null}
        {search && size === 'wide' ? (
          <button type="button" className="ax-search" onClick={search.onOpen}>
            <SearchIcon /><span>Search</span>{search.shortcut ? <kbd>{search.shortcut}</kbd> : null}
          </button>
        ) : null}
        {search && size === 'medium' ? <RoundControl label="Search" icon={<SearchIcon />} onClick={search.onOpen} /> : null}
        {notifications && !phone ? <RoundControl label="Notifications" icon={<BellIcon />} badge={notifications.count} fault={notifications.fault} onClick={notifications.onOpen} /> : null}
        <span className="ax-anchor">
          <RoundControl ref={helpRef} label="Help" icon={<HelpIcon />} className="ax-help" expanded={open === 'help'} controls="ax-help-menu" onClick={() => toggle('help')} />
          <HelpMenu {...help} open={open === 'help'} onClose={close} buttonRef={helpRef} />
        </span>
        <span className="ax-anchor">
          <AccountButton ref={accountRef} person={account.person} expanded={open === 'account'} controls="ax-account-menu" onClick={() => toggle('account')} />
          <AccountMenu {...account} product={product.name} showHelp={phone} onHelp={() => setOpen('help')} open={open === 'account'} onClose={close} buttonRef={accountRef} />
        </span>
      </header>
    </div>
  );
}
