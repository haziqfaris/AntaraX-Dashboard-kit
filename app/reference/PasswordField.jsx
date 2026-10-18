import { useId, useState } from 'react';

// A password field to getting-in/SPEC.md §4: Show (GI-02), the Caps Lock warning (GI-05), the right
// autocomplete and paste (GI-06), and for a new password the strength meter in words (GI-04).
// The meter is advice: only length (12 to 64 characters, at most 72 bytes) and the breach check refuse a password, on the server.
//
// `estimate(password)` returns { score: 0-4, warning, suggestion } in plain words. Pass zxcvbn-ts:
//   import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
//   estimate={(p) => { const r = zxcvbn(p, [email, name]); return { score: r.score, warning: r.feedback.warning, suggestion: r.feedback.suggestions[0] }; }}
// Without one, a rough length-and-variety guess stands in so the demo works; do not ship it.

const MIN = 12;
const MAX = 64;
const MAX_BYTES = 72; // bcrypt's limit (Supabase): anything longer is silently ignored
const WORDS = ['', 'Weak', 'Fair', 'Good', 'Strong'];

export function PasswordField({
  label = 'Password',
  isNew = false,
  value,
  onChange,
  estimate = roughEstimate,
  error,
  name = 'password',
  id,
}) {
  const auto = useId();
  const fieldId = id || `pw-${auto}`;
  const [shown, setShown] = useState(false);
  const [caps, setCaps] = useState(false);
  const length = [...(value || '').normalize('NFKC')].length;
  const tooLong = length > MAX || new TextEncoder().encode((value || '').normalize('NFKC')).length > MAX_BYTES;
  const result = isNew && length >= MIN && !tooLong ? estimate(value) : null;
  const score = result ? Math.max(1, Math.min(4, result.score)) : 0;
  const reason = result && score <= 2 ? (score === 1 ? result.warning || result.suggestion : result.suggestion || result.warning) : '';
  const meter = !isNew ? '' : length === 0 ? '' : length < MIN ? `At least ${MIN} characters` : tooLong ? `Use at most ${MAX} characters` : `${WORDS[score]}${reason ? `: ${reason}` : ''}`;
  const describedBy = [error && `${fieldId}-error`, caps && `${fieldId}-caps`, isNew && `${fieldId}-meter`].filter(Boolean).join(' ') || undefined;
  const onKey = (e) => setCaps(Boolean(e.getModifierState && e.getModifierState('CapsLock')));

  return (
    <div className="ax-pw">
      <label className="ax-pw-label" htmlFor={fieldId}>{label}</label>
      <div className="ax-pw-box">
        <input
          id={fieldId}
          name={name}
          type={shown ? 'text' : 'password'}
          autoComplete={isNew ? 'new-password' : 'current-password'}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKey}
          onKeyUp={onKey}
          onBlur={() => setCaps(false)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="ax-pw-show"
          aria-pressed={shown}
          aria-label={shown ? 'Hide password' : 'Show password'}
          aria-controls={fieldId}
          onClick={() => setShown((s) => !s)}
        >
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
      {caps ? <p id={`${fieldId}-caps`} className="ax-pw-caps">Caps Lock is on</p> : null}
      {isNew ? (
        <div className="ax-pw-meter" data-score={length < MIN || tooLong ? 0 : score}>
          <span className="ax-pw-bar" aria-hidden="true"><span /></span>
          <p id={`${fieldId}-meter`} aria-live="polite">{meter}</p>
        </div>
      ) : null}
      {error ? <p id={`${fieldId}-error`} className="ax-pw-error">{error}</p> : null}
    </div>
  );
}

// A stand-in for the demo only: length and character variety. Ship zxcvbn-ts instead.
function roughEstimate(p) {
  const kinds = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(p)).length;
  const words = p.trim().split(/\s+/).length;
  if (/^(.)\1+$/.test(p) || /password|qwerty|123456/i.test(p)) return { score: 1, warning: 'This is a very common password', suggestion: 'Add another word or two' };
  const s = p.length >= 20 || words >= 4 ? 4 : p.length >= 16 || words >= 3 ? 3 : kinds >= 3 ? 2 : 1;
  return { score: s, warning: '', suggestion: s < 3 ? 'Add another word or two' : '' };
}
