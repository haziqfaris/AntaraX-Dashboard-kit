// Marks the area that is scrolling with data-scrolling for a moment, so its scrollbar shows while it moves
// (touch, trackpad and wheel scrolling have no hover). Scroll events do not bubble, so this listens in the capture phase.
// Import once at the app's root. app/SPEC.md section 11c; works with shell.css and axle/reference/scrollbars.css.
const HOLD_MS = 900;
const timers = new WeakMap();

export function markScrolling(root = document) {
  const onScroll = (event) => {
    const t = event.target;
    const el = t === document ? document.documentElement : t;
    if (!(el instanceof Element)) return;
    el.setAttribute('data-scrolling', '');
    clearTimeout(timers.get(el));
    timers.set(el, setTimeout(() => el.removeAttribute('data-scrolling'), HOLD_MS));
  };
  root.addEventListener('scroll', onScroll, { capture: true, passive: true });
  return () => root.removeEventListener('scroll', onScroll, { capture: true });
}

if (typeof document !== 'undefined') markScrolling();
