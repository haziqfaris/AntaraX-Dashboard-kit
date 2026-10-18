import { useEffect, useId, useRef, useState } from 'react';

// A Level 2 or Level 3 confirmation, to actions/SPEC.md §2 and §5. Level 1 (undoable) actions never use it:
// they act at once and offer Undo in the toast.
//
//   <ConfirmDialog
//     open={open} onCancel={() => setOpen(false)}
//     level={3}
//     title="Delete Tegap Fabrication?"
//     body={<>This deletes 3 projects and 1,240 work orders. Owners can undo it for 30 days, then it is gone.</>}
//     action="Delete Tegap Fabrication" busyLabel="Deleting…" destructive
//     confirmName="Tegap Fabrication"           // Level 3: the name to type
//     askAgain={<PasswordField label="Your password" … />}  // Level 3: getting-in GI-13
//     onConfirm={async () => { await api.deleteOrganisation(id); }}   // throw an Error with a written message to show it here
//   />
export function ConfirmDialog({ open, onCancel, level = 2, title, body, action, busyLabel = 'Working…', destructive = false, confirmName, askAgain, askAgainReady = true, onConfirm }) {
  const id = useId();
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false); // read by the key handler, which outlives a render
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;
    setTyped(''); setError(''); setBusy(false); busyRef.current = false;
    const dialog = dialogRef.current;
    const focusables = () => Array.from(dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
    // The safe choice is focused first in anything destructive (AC-11); a Level 3 dialog starts in the name field.
    (level === 3 ? dialog.querySelector('input') : dialog.querySelector('[data-cancel]'))?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && !busyRef.current) { e.preventDefault(); onCancel(); }
      if (e.key === 'Tab') {
        const list = focusables(); const i = list.indexOf(document.activeElement);
        e.preventDefault(); list[(i + (e.shiftKey ? -1 : 1) + list.length) % list.length]?.focus();
      }
    };
    dialog.addEventListener('keydown', onKey);
    return () => { dialog.removeEventListener('keydown', onKey); openerRef.current?.focus?.(); };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;
  const nameOk = level < 3 || typed === confirmName;
  const ready = nameOk && (level < 3 || askAgainReady) && !busy;

  const confirm = async () => {
    if (!ready) return;
    setBusy(true); busyRef.current = true; setError('');
    try { await onConfirm(); }
    catch (e) { setError(e && e.message ? e.message : "That didn't work. Try again."); setBusy(false); busyRef.current = false; }
  };

  return (
    <div className="ax-dialog-backdrop">
      <div ref={dialogRef} className="ax-dialog" role="alertdialog" aria-modal="true" aria-labelledby={`${id}-t`} aria-describedby={`${id}-b`}>
        <h2 id={`${id}-t`} className="ax-dialog-title">{title}</h2>
        <div id={`${id}-b`} className="ax-dialog-body">{body}</div>
        {level === 3 ? (
          <label className="ax-dialog-type">
            <span>Type <strong>{confirmName}</strong> to confirm</span>
            <input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" spellCheck={false} disabled={busy} />
          </label>
        ) : null}
        {level === 3 && askAgain ? <div className="ax-dialog-again">{askAgain}</div> : null}
        {error ? <p className="ax-dialog-error" role="alert">{error}</p> : null}
        <div className="ax-dialog-actions">
          <button type="button" data-cancel onClick={onCancel} disabled={busy}>Cancel</button>
          <button type="button" className={destructive ? 'is-danger' : 'is-action'} onClick={confirm} disabled={!ready} aria-busy={busy}>
            {busy ? busyLabel : action}
          </button>
        </div>
      </div>
    </div>
  );
}
