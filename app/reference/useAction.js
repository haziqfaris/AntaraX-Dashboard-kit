import { useCallback, useRef, useState } from 'react';
import { noDots } from './InlineLoop.jsx';

// One action, to actions/SPEC.md: busy while it runs (AC-05), never twice at once, and a result or an error
// in words (AC-08, AC-09). `run` is the request; it resolves to the result or throws an Error whose message is
// already written for a person (the server maps its own errors, so a raw message never reaches the screen).
// The busy words have no dots ("Saving", never "Saving…"; owner, 26 Oct 2026): BusyLabel shows them with the
// inline loop at the button's kept width, and any dots passed in are taken off.
//
//   const save = useAction(() => api.saveWorkOrder(form), { busyLabel: 'Saving', done: (wo) => toast(`${wo.number} saved`) });
//   <button type="submit" disabled={save.busy} aria-busy={save.busy}>
//     <BusyLabel busy={save.busy} label="Save" busyLabel={save.busyLabel} loop={<ProductLoop />} />
//   </button>
//   {save.error && <p role="alert">{save.error} {save.canRetry && <button onClick={save.retry}>Retry</button>}</p>}
export function useAction(run, { busyLabel = 'Saving', done, retryable = (e) => e?.retry !== false } = {}) {
  const [state, setState] = useState({ busy: false, error: null, canRetry: false });
  const inFlight = useRef(false);
  const lastArgs = useRef([]);

  const start = useCallback(async (...args) => {
    if (inFlight.current) return undefined; // a second press while it runs does nothing (AC-05)
    inFlight.current = true;
    lastArgs.current = args;
    setState({ busy: true, error: null, canRetry: false });
    try {
      const result = await run(...args);
      setState({ busy: false, error: null, canRetry: false });
      done?.(result);
      return result;
    } catch (e) {
      const message = e && e.message ? e.message : "That didn't work. Try again.";
      setState({ busy: false, error: message, canRetry: retryable(e) });
      return undefined;
    } finally {
      inFlight.current = false;
    }
  }, [run, done, retryable]);

  const retry = useCallback(() => start(...lastArgs.current), [start]);
  return { ...state, busyLabel: noDots(busyLabel), start, retry };
}
