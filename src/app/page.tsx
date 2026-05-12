import Link from "next/link";
import { HeroCinematicBackdrop } from "@/components/hero-cinematic-backdrop";
import { HeroVideoCube } from "@/components/hero-video-cube";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  const marqueeItems = [...portfolioData.thumbnails, ...portfolioData.thumbnails];
  const showcaseProjects = portfolioData.projects.slice(0, 6);

  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-page__content">
        <section className="landing-hero">
          <HeroCinematicBackdrop />
          <div className="landing-hero__marquee" aria-hidden="true">
            <div className="landing-hero__marquee-track">
              {Array.from({ length: 2 }, (_, group) => (
                <div key={group} className="landing-hero__marquee-group">
                  <span>Cinematic Editor</span>
                  <span aria-hidden="true">★</span>
                  <span>Color Grading</span>
                  <span aria-hidden="true">★</span>
                  <span>Storytelling</span>
                  <span aria-hidden="true">★</span>
                  <span>Retention Cuts</span>
                  <span aria-hidden="true">★</span>
                  <span>Sound Design</span>
                  <span aria-hidden="true">★</span>
                  <span>Viral Content</span>
                  <span aria-hidden="true">★</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shell landing-hero__grid">
            <div className="landing-hero__copy">
              <p className="eyebrow">
                <span className="eyebrow__dot" aria-hidden="true" />
                Editorial Cinematic Portfolio
              </p>
              <div className="landing-hero__name-row">
                <span className="landing-hero__avatar" aria-hidden="true">
                  <img alt="" src="/img/foto-perfil.png" />
                  <span className="landing-hero__avatar-ring" />
                </span>
                <h1>
                  <span className="landing-hero__name">{portfolioData.profile.name}</span>
                  <span className="landing-hero__name-meta" aria-hidden="true">
                    REEL · {new Date().getFullYear()}
                  </span>
                </h1>
              </div>
              <p className="landing-hero__role">{portfolioData.profile.role}</p>
              <p className="landing-hero__phrase">{portfolioData.profile.phrase}</p>

              <div className="landing-hero__actions">
                <Link className="landing-button landing-button--primary" href={portfolioData.contact.whatsappHref}>
                  Falar no WhatsApp
                </Link>
                <Link className="landing-button landing-button--ghost" href="/projetos">
                  Ver projetos
                </Link>
              </div>

              <div className="landing-hero__channels">
                {portfolioData.channels.map((channel) => (
                  <a key={channel.href} className="landing-pill" href={channel.href} rel="noreferrer" target="_blank">
                    {channel.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="landing-hero__stage">
              <HeroVideoCube />
            </div>
          </div>
        </section>

        <section className="landing-strip">
          <div className="shell landing-section__header">
            <div>
              <p className="eyebrow">Thumbnails em Destaque</p>
            </div>
            <p className="landing-section__text">
              Uma curadoria de thumbs que sustentam clique, identidade e retenção.
            </p>
          </div>

          <div className="landing-marquee">
            <div className="landing-marquee__track">
              {marqueeItems.map((thumbnail, index) => (
                <figure key={`${thumbnail.assetPath}-${index}`} className="landing-marquee__item">
                  <img alt={thumbnail.alt} src={thumbnail.assetPath} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="shell landing-section__header">
            <div>
              <p className="eyebrow">Projetos Editados</p>
              <h2>Vídeos construídos para narrativa, impacto e retenção</h2>
            </div>
            <Link className="landing-button landing-button--ghost" href="/projetos">
              Abrir arquivo completo
            </Link>
          </div>

          <div className="shell landing-projects">
            {showcaseProjects.map((project, index) => (
              <article
                key={project.assetPath}
                className={`landing-project-card ${index === 0 ? "landing-project-card--featured" : ""}`}
              >
                <video className="landing-project-card__media" controls playsInline preload="metadata" src={project.assetPath} />
                <div className="landing-project-card__body">
                  <p className="landing-project-card__kicker">Video Editing</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-section--channels">
          <div className="shell landing-section__header">
            <div>
              <p className="eyebrow">Canais em que eu trabalho</p>
              <h2>Projetos recorrentes com presença forte em YouTube e Instagram</h2>
            </div>
          </div>

          <div className="shell channel-showcase">
            {portfolioData.clients.map((client) => (
              <article key={client.name} className="channel-card">
                <div className="channel-card__top">
                  <img alt={client.name} className="channel-card__logo" src={client.logoPath} />
                  <div>
                    <h3>{client.name}</h3>
                    <p>{client.niche}</p>
                  </div>
                </div>

                <div className="channel-card__stats">
                  {client.stats.map((stat) => (
                    <a key={stat.href} className="channel-card__stat" href={stat.href} rel="noreferrer" target="_blank">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <div className="shell landing-cta">
            <div>
              <p className="eyebrow">Contato</p>
              <h2>Portfólio pronto para apresentar cortes, thumbnails e canais já operando</h2>
            </div>
            <div className="landing-cta__links">
              <a className="landing-button landing-button--primary" href={portfolioData.contact.whatsappHref} rel="noreferrer" target="_blank">
                {portfolioData.contact.phoneLabel}
              </a>
              <a className="landing-button landing-button--ghost" href={portfolioData.contact.emailHref}>
                {portfolioData.contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
