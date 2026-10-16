// The brand pill: the AntaraX A (to antarax.ai) and the product chip (to the app's home) in one well (SPEC §2.1, item 2).
// `aMark` is the brand kit's A: antarax-a-blue.svg on a light bar, antarax-a-white.svg on a dark one.
export function BrandPill({ product, mark, aMark, homeHref = '/', compact = false }) {
  return (
    <div className="ax-pill">
      <a className="ax-pill-a" href="https://antarax.ai" aria-label="AntaraX">
        <img src={aMark} alt="" />
      </a>
      <a className={`ax-chip${compact ? ' ax-chip-compact' : ''}`} href={homeHref} aria-label={compact ? `${product} home` : undefined}>
        <span className="ax-tile"><img src={mark} alt="" /></span>
        {compact ? null : <span className="ax-chip-name">{product}</span>}
      </a>
    </div>
  );
}
