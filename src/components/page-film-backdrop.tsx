type PageFilmBackdropProps = {
  density?: "compact" | "full";
};

const STRIPS_FULL = ["a", "b", "c", "d", "e"] as const;
const STRIPS_COMPACT = ["a", "e"] as const;

export function PageFilmBackdrop({ density = "full" }: PageFilmBackdropProps = {}) {
  const strips = density === "compact" ? STRIPS_COMPACT : STRIPS_FULL;

  return (
    <div aria-hidden="true" className="page-film-backdrop">
      {strips.map((id) => (
        <div key={id} className={`page-film-backdrop__strip page-film-backdrop__strip--${id}`}>
          <div className="page-film-backdrop__track">
            {Array.from({ length: 80 }, (_, i) => (
              <span key={i} className="page-film-backdrop__perf" />
            ))}
          </div>
        </div>
      ))}
      <div className="page-film-backdrop__grain" />
      <div className="page-film-backdrop__vignette" />
      <div className="page-film-backdrop__glow page-film-backdrop__glow--a" />
      <div className="page-film-backdrop__glow page-film-backdrop__glow--b" />
    </div>
  );
}
