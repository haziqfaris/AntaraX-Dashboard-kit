import { forwardRef, useState } from 'react';
import { useMenu } from './useMenu.js';

// The account button: always last, at the far right (SPEC §2.1, item 8; §3).
export const AccountButton = forwardRef(function AccountButton({ person, expanded, controls, onClick }, ref) {
  return (
    <button ref={ref} type="button" className="ax-account" aria-label={`Account: ${person.name}`} aria-haspopup="menu" aria-expanded={expanded} aria-controls={controls} onClick={onClick}>
      {person.photo ? <img src={person.photo} alt="" /> : person.initials}
    </button>
  );
});

// The account menu, in §3's order. Sign out asks first. The foot carries "‹Product› · by AntaraX", the version, Privacy and Terms.
export function AccountMenu({
  open, onClose, buttonRef, id = 'ax-account-menu', product, version, person, organisation, onSwitchOrganisation,
  isOwner, plan, language, onLanguage, appearance, onAppearance, showHelp, onHelp, onSignOut,
  accountHref = '/account', settingsHref = '/settings', billingHref = '/settings/billing', privacyHref = '/legal/privacy', termsHref = '/legal/terms',
}) {
  const ref = useMenu(open, onClose, buttonRef);
  const [confirming, setConfirming] = useState(false);
  if (!open) return null;
  return (
    <div ref={ref} id={id} role="menu" aria-label="Account" className="ax-menu ax-menu-account">
      <div className="ax-menu-person">
        <span className="ax-menu-avatar" aria-hidden="true">{person.photo ? <img src={person.photo} alt="" /> : person.initials}</span>
        <span><strong>{person.name}</strong><small>{person.email}</small><em>{person.role}</em></span>
      </div>
      <div className="ax-menu-org">
        <small>Organisation</small><strong>{organisation.name}</strong>
        {onSwitchOrganisation ? <button type="button" role="menuitem" className="ax-menu-link" onClick={onSwitchOrganisation}>Switch organisation</button> : null}
      </div>
      <a role="menuitem" className="ax-menu-item ax-menu-row" href={accountHref}>Your account</a>
      <a role="menuitem" className="ax-menu-item ax-menu-row" href={settingsHref}>Settings</a>
      {isOwner ? <a role="menuitem" className="ax-menu-item ax-menu-row" href={billingHref}>Plan and billing<small>{plan}</small></a> : null}
      {onLanguage ? <button type="button" role="menuitem" className="ax-menu-item ax-menu-row" onClick={onLanguage}>Language<small>{language}</small></button> : null}
      {showHelp ? <button type="button" role="menuitem" className="ax-menu-item ax-menu-row" onClick={onHelp}>Help<small>Guide, answers, support</small></button> : null}
      {onAppearance ? (
        <div className="ax-menu-row ax-menu-appearance">
          <span id={`${id}-appearance`}>Appearance</span>
          <span role="radiogroup" aria-labelledby={`${id}-appearance`}>
            {['Light', 'Dark', 'System'].map((v) => (
              <button key={v} type="button" role="menuitemradio" aria-checked={appearance === v.toLowerCase()} onClick={() => onAppearance(v.toLowerCase())}>{v}</button>
            ))}
          </span>
        </div>
      ) : null}
      <div className="ax-menu-signout">
        {confirming ? (
          <>
            <span>Sign out of {product}?</span>
            <button type="button" role="menuitem" className="ax-menu-confirm" onClick={onSignOut}>Sign out</button>
            <button type="button" role="menuitem" className="ax-menu-link" onClick={() => setConfirming(false)}>Cancel</button>
          </>
        ) : <button type="button" role="menuitem" className="ax-menu-item ax-menu-row" onClick={() => setConfirming(true)}>Sign out</button>}
      </div>
      <div className="ax-menu-foot">
        <span><strong>{product}</strong> · by AntaraX</span>
        {version ? <span className="ax-mono">{version}</span> : null}
        <a href={privacyHref}>Privacy</a>
        <a href={termsHref}>Terms</a>
      </div>
    </div>
  );
}
