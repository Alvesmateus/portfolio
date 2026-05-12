import { portfolioData } from "@/data/portfolio";

export function ContactPanel() {
  const { contact, profile } = portfolioData;

  return (
    <section aria-label="Canais de contato" className="contact-panel">
      <div className="contact-panel__hero">
        <div className="contact-panel__avatar">
          <img alt={profile.name} src="/img/foto-perfil.png" />
          <span className="contact-panel__avatar-ring" aria-hidden="true" />
        </div>
        <div className="contact-panel__intro">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            Contato direto
          </p>
          <h1>Contato</h1>
          <p className="contact-panel__name">{profile.name}</p>
          <p className="contact-panel__role">{profile.role}</p>
        </div>
      </div>

      <div className="contact-panel__primary">
        <a
          className="contact-card contact-card--whatsapp"
          href={contact.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          {contact.phoneLabel}
        </a>
        <a className="contact-card contact-card--email" href={contact.emailHref}>
          {contact.email}
        </a>
      </div>

      <ul className="contact-panel__socials">
        {contact.socials.map((social) => (
          <li key={social.label}>
            <a
              className="contact-pill text-link"
              href={social.href}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              target={social.href.startsWith("http") ? "_blank" : undefined}
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
