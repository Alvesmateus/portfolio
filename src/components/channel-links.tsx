import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ChannelLinksProps = {
  className?: string;
};

export function ChannelLinks({ className }: ChannelLinksProps) {
  return (
    <ul className={cn("channel-links", className)}>
      {portfolioData.channels.map((channel) => (
        <li key={channel.label}>
          <a
            className="text-link"
            href={channel.href}
            target="_blank"
            rel="noreferrer"
          >
            {channel.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
