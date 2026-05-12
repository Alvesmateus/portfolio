import { PageFilmBackdrop } from "@/components/page-film-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThumbnailGallery } from "@/components/thumbnail-gallery";

export default function ThumbnailsPage() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-page__content">
        <section className="page-hero">
          <PageFilmBackdrop density="compact" />
          <div className="shell page-hero__inner">
            <h1 className="page-hero__title">Todas as Thumbnails</h1>
          </div>
        </section>

        <section className="shell page-content">
          <ThumbnailGallery />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
