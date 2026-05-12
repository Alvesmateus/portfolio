import { portfolioData } from "@/data/portfolio";

export function ThumbnailGallery() {
  return (
    <section aria-label="Galeria de thumbnails" className="thumbnail-gallery">
      {portfolioData.thumbnails.map((thumbnail, index) => (
        <figure key={thumbnail.assetPath} className="thumbnail-card">
          <img alt={thumbnail.alt} loading="lazy" src={thumbnail.assetPath} />
          <span className="thumbnail-card__frame" aria-hidden="true" />
          <span className="thumbnail-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </figure>
      ))}
    </section>
  );
}
