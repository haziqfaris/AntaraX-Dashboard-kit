// The busy state of a button or a wait line, to actions/SPEC.md §3 and app SPEC §11b, §12 (owner, 26 Oct 2026):
// the words lose their dots ("Saving", never "Saving…") and an inline loop carries the motion instead.
//
// InlineLoop draws AntaraX's loop, Assemble (brand kit guide 14, assets/antarax/antarax-busy.svg): the A's three
// pieces light in turn, hold whole, then rest, 1.4s, in currentColor. It is for surfaces with no product of their
// own: AXLE in every product, and this kit's neutral reference. A product passes its own inline loop (Yara's dots
// on a wave, AX Frame's corners, Janka's ticks) as `loop`, drawn in currentColor so it works on every button.
// Never pass the sparkle: it means AI, and an AI action shows the thinking state instead.
// With reduced motion, shell.css holds the still frame (the whole A); the words stay, so it is never plain text.
//
//   <button type="submit" disabled={save.busy} aria-busy={save.busy}>
//     <BusyLabel busy={save.busy} label="Save" busyLabel={save.busyLabel} icon={<SaveIcon />} loop={<YaraWave />} />
//   </button>
//   <p role="status"><InlineLoop size={16} />Signed in. Opening AXLE · Janka</p>

// Busy words never end in dots; a product that still passes "Saving…" gets "Saving".
export const noDots = (words) => String(words ?? '').replace(/\s*(…|\.{3})\s*$/, '');

const A_FOOT = 'M9.9 19.1 9.9 18.5 9.8 18.3 8.7 17.3 2.8 21.3 3.7 21.9 5 22.4 6.1 22.5 7.3 22.2 8.1 21.8 8.9 21 9.8 19.6Z';
const A_APEX = 'M11.7 1.5 10.7 1.7 9.8 2.2 9.1 2.9 8.6 3.7 1.9 16.5 1.7 17.1 1.6 18 1.6 18.8 1.8 19.7 7.7 15.6 7.6 14.9 7.5 14.3 7.6 13.4 7.8 12.7 8.1 12 8.6 11.4 9 10.9 9.6 10.5 10.2 10.2 10.9 10 11.6 9.8 12.3 9.8 13.1 9.9 13.8 10.1 14.5 10.5 15 10.9 18.2 8.8 15.4 3.4 14.9 2.7 14.1 2.1 13.4 1.7 12.6 1.5Z';
const A_RIGHT = 'M22.4 17.9 22.3 17.1 22 16.2 19.1 10.4 16.1 12.4 16.4 13.2 16.6 14.1 16.5 15 16.3 15.7 16.1 16.4 15.8 16.9 15.2 17.5 14.4 18.3 14.1 18.8 14.2 19.4 15 20.8 15.6 21.5 15.9 21.7 16.6 22.2 17.8 22.5 19 22.4 20.2 22 21.2 21.2 21.8 20.5 22.2 19.7 22.3 19.2Z';

export function InlineLoop({ size = 16, loop }) {
  return (
    <span className="ax-loop" style={{ minWidth: size, height: size }} aria-hidden="true">
      {loop || (
        <svg className="ax-loop-assemble" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path className="ax-loop-1" d={A_FOOT} />
          <path className="ax-loop-2" d={A_APEX} />
          <path className="ax-loop-3" d={A_RIGHT} />
        </svg>
      )}
    </span>
  );
}

// A button's words and its loop, stacked so the button keeps the width of the wider of the two: nothing jumps
// when it starts or stops. Put aria-busy on the button itself; the hidden half is left out of the accessible name.
export function BusyLabel({ busy, label, busyLabel, icon, loop, size = 16 }) {
  return (
    <span className="ax-busy" data-busy={busy ? 'true' : 'false'}>
      <span className="ax-busy-idle" aria-hidden={busy || undefined}>{icon}{label}</span>
      <span className="ax-busy-run" aria-hidden={!busy || undefined}><InlineLoop size={size} loop={loop} />{noDots(busyLabel)}</span>
    </span>
  );
}
