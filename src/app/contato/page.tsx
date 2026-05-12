import { ContactPanel } from "@/components/contact-panel";
import { PageFilmBackdrop } from "@/components/page-film-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-page__content">
        <section className="page-hero page-hero--contact">
          <PageFilmBackdrop />
          <div className="shell page-hero__inner page-hero__inner--contact">
            <ContactPanel />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
