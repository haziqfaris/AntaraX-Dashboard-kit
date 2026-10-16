import { forwardRef } from 'react';

// A 44px round control in the bar: the menu button, search on medium widths, notifications, Help (SPEC §2.2).
// `badge` is the count on the bell; `fault` draws it in the status colour when something failed.
export const RoundControl = forwardRef(function RoundControl({ label, icon, badge, fault, expanded, controls, onClick, className = '' }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={`ax-round ${className}`}
      aria-label={badge ? `${label}, ${badge} new` : label}
      aria-haspopup={expanded === undefined ? undefined : 'menu'}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
    >
      {icon}
      {badge ? <span className={`ax-badge${fault ? ' ax-badge-fault' : ''}`} aria-hidden="true">{badge > 99 ? '99+' : badge}</span> : null}
    </button>
  );
});
