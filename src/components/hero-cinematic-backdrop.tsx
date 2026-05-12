export function HeroCinematicBackdrop() {
  return (
    <div aria-hidden="true" className="hero-backdrop">
      <div className="hero-backdrop__filmstrip hero-backdrop__filmstrip--top">
        <div className="hero-backdrop__filmstrip-track">
          {Array.from({ length: 60 }, (_, i) => (
            <span key={i} className="hero-backdrop__perf" />
          ))}
        </div>
      </div>
      <div className="hero-backdrop__filmstrip hero-backdrop__filmstrip--bottom">
        <div className="hero-backdrop__filmstrip-track hero-backdrop__filmstrip-track--reverse">
          {Array.from({ length: 60 }, (_, i) => (
            <span key={i} className="hero-backdrop__perf" />
          ))}
        </div>
      </div>

      <div className="hero-backdrop__scanlines" />
      <div className="hero-backdrop__grain" />
      <div className="hero-backdrop__vignette" />
      <div className="hero-backdrop__glow hero-backdrop__glow--a" />
      <div className="hero-backdrop__glow hero-backdrop__glow--b" />
      <div className="hero-backdrop__beam" />
    </div>
  );
}
