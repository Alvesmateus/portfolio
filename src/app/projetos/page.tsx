import { PageFilmBackdrop } from "@/components/page-film-backdrop";
import { ProjectGrid } from "@/components/project-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ProjectsPage() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-page__content">
        <section className="page-hero">
          <PageFilmBackdrop density="compact" />
          <div className="shell page-hero__inner">
            <h1 className="page-hero__title">Todos os Projetos</h1>
          </div>
        </section>

        <section className="shell page-content">
          <ProjectGrid />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
