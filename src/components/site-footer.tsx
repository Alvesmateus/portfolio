import { portfolioData } from "@/data/portfolio";
import { ChannelLinks } from "@/components/channel-links";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const { contact, profile } = portfolioData;

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__identity">
          <p className="eyebrow">Contato</p>
          <h2>{profile.name}</h2>
          <p>{profile.ageLabel}</p>
          <p>{profile.phrase}</p>
        </div>

        <div className="site-footer__meta">
          <a className="text-link" href={contact.whatsappHref} target="_blank" rel="noreferrer">
            {contact.phoneLabel}
          </a>
          <a className="text-link" href={contact.emailHref}>
            {contact.email}
          </a>
          <SocialLinks />
          <ChannelLinks />
        </div>
      </div>
    </footer>
  );
}
