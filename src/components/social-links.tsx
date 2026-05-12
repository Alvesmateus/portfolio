import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  const { contact } = portfolioData;
  const links = [
    { label: "WhatsApp", href: contact.whatsappHref },
    { label: "Instagram", href: contact.instagramHref },
    { label: "LinkedIn", href: contact.linkedInHref },
    { label: "Email", href: contact.emailHref },
  ].filter((social) => social.href && social.href !== "#");

  return (
    <ul className={cn("social-links", className)}>
      {links.map((social) => (
        <li key={social.label}>
          <a
            className="text-link"
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
