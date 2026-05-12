import { portfolioData } from "@/data/portfolio";

const FACE_TRANSFORMS = [
  "rotateY(0deg) translateZ(var(--cube-half))",
  "rotateY(90deg) translateZ(var(--cube-half))",
  "rotateY(180deg) translateZ(var(--cube-half))",
  "rotateY(-90deg) translateZ(var(--cube-half))",
  "rotateX(90deg) translateZ(var(--cube-half))",
  "rotateX(-90deg) translateZ(var(--cube-half))",
];

const FACE_LABELS = ["FRONT", "RIGHT", "BACK", "LEFT", "TOP", "BOTTOM"];

export function HeroVideoCube() {
  const videos = portfolioData.projects.slice(0, 6);

  return (
    <div aria-hidden="true" className="hero-cube">
      <div className="hero-cube__halo" />
      <div className="hero-cube__floor" />
      <div className="hero-cube__stage">
        <div className="hero-cube__shape">
          {videos.map((project, index) => (
            <div
              key={project.assetPath}
              className="hero-cube__face"
              style={{ transform: FACE_TRANSFORMS[index] }}
            >
              <video autoPlay className="hero-cube__media" loop muted playsInline src={project.assetPath} />
              <span className="hero-cube__face-overlay" />
              <span className="hero-cube__face-tag">
                <span className="hero-cube__face-dot" />
                {FACE_LABELS[index]} · 0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
