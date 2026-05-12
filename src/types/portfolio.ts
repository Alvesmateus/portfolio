export type SocialLink = {
  label: string;
  href: string;
};

export type AssetItem = {
  assetPath: string;
};

export type ProjectItem = AssetItem & {
  title: string;
  description: string;
};

export type ThumbnailItem = AssetItem & {
  alt: string;
};

export type ClientStat = {
  label: string;
  value: string;
  href: string;
};

export type Client = {
  name: string;
  niche: string;
  logoPath: string;
  stats: ClientStat[];
};

export type Skill = {
  name: string;
  rating: number;
  maxRating: number;
};

export type Niche = {
  label: string;
};

export type Differential = {
  title: string;
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  ageLabel: string;
  phrase: string;
};

export type Contact = {
  phoneLabel: string;
  email: string;
  emailHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  instagramHref: string;
  linkedInHref: string;
  socials: SocialLink[];
};

export type PortfolioData = {
  profile: Profile;
  contact: Contact;
  channels: SocialLink[];
  projects: ProjectItem[];
  thumbnails: ThumbnailItem[];
  squareAssets: AssetItem[];
  instagramSquareAssets: AssetItem[];
  clients: Client[];
  skills: Skill[];
  niches: Niche[];
  differentials: Differential[];
};
