import { useEffect, useId, useRef } from 'react';
import { InlineLoop, noDots } from './InlineLoop.jsx';

// The progress dialog for an action expected to take over 2 seconds, or to change many records, or to run in
// steps (actions/SPEC.md §3). Escape does not close it while it runs; it closes into the result (§4).
// Pass the product's own progress loader as `loader` (app SPEC §12): never a generic spinner. The step under way
// shows the inline loop (`stepLoop`, the product's own; AntaraX's Assemble without one). Titles and steps have no
// trailing dots ("Importing 1,240 items", never "Importing…"; actions §3).
//
//   <ProgressDialog open title="Importing 1,240 items" loader={<JankaTicks />}
//     done={312} total={1240}                       // a count, or
//     steps={[{ label: 'Reading the sheet', state: 'done' }, { label: 'Matching items', state: 'now' }, { label: 'Saving', state: 'to-come' }]}
//     onCancel={canStop ? cancel : undefined} onBackground={canContinue ? toBackground : undefined} />
export function ProgressDialog({ open, title, loader, stepLoop, done, total, steps, onCancel, onBackground, note }) {
  const id = useId();
  const ref = useRef(null);
  useEffect(() => { if (open) ref.current?.querySelector('button')?.focus(); }, [open]);
  if (!open) return null;
  const pct = total ? Math.round((done / total) * 100) : null;
  return (
    <div className="ax-dialog-backdrop">
      <div ref={ref} className="ax-dialog ax-progress" role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} aria-busy="true">
        <div className="ax-progress-head">
          <span className="ax-progress-loader" aria-hidden="true">{loader || <InlineLoop size={20} />}</span>
          <h2 id={`${id}-t`} className="ax-dialog-title">{noDots(title)}</h2>
        </div>
        {total ? (
          <div className="ax-progress-count">
            <div className="ax-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={title}><span style={{ width: `${pct}%` }} /></div>
            <p aria-live="polite"><span className="ax-mono">{done.toLocaleString('en-GB')}</span> of <span className="ax-mono">{total.toLocaleString('en-GB')}</span></p>
          </div>
        ) : null}
        {steps ? (
          <ol className="ax-progress-steps" aria-live="polite">
            {steps.map((s) => <li key={s.label} data-state={s.state}>{s.state === 'now' ? <InlineLoop size={16} loop={stepLoop} /> : <span aria-hidden="true" />}{noDots(s.label)}{s.state === 'now' ? <span className="ax-sr">, in progress</span> : s.state === 'done' ? <span className="ax-sr">, done</span> : null}</li>)}
          </ol>
        ) : null}
        {note ? <p className="ax-progress-note">{note}</p> : null}
        <div className="ax-dialog-actions">
          {onCancel ? <button type="button" onClick={onCancel}>Cancel</button> : null}
          {onBackground ? <button type="button" className="is-action" onClick={onBackground}>Run in background</button> : null}
        </div>
      </div>
    </div>
  );
}
