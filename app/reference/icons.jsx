// The shell's icons, drawn inline so the reference needs nothing but React.
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const MenuIcon = () => <svg {...base}><path d="M5 7h14M5 12h14M5 17h14" /></svg>;
export const SearchIcon = () => <svg {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
export const BellIcon = () => <svg {...base}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>;
export const HelpIcon = () => <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.4v.5" /><path d="M12 17h.01" /></svg>;
export const ChevronIcon = () => <svg {...base} width={12} height={12} strokeWidth={2.4}><path d="m6 9 6 6 6-6" /></svg>;
export const CloseIcon = () => <svg {...base} width={14} height={14} strokeWidth={2.2}><path d="M6 6l12 12M18 6 6 18" /></svg>;
