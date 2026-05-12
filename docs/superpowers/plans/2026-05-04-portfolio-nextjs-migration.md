# Portfolio Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing portfolio as a Next.js editorial-cinematic site without changing any existing portfolio facts, contact details, local media inventory, or approved messaging.

**Architecture:** Build a fresh Next.js App Router frontend in-place, centralize the real portfolio content into a typed data module, and render the approved hybrid information architecture from reusable components. Treat `index.html` plus local assets as the canonical source of truth, and treat the placeholder-heavy secondary HTML pages only as structural references unless they expose real categories already visible in the main portfolio.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library

---

## Planned File Map

### Legacy source files to preserve as reference during migration

- Keep: `index.html`
- Keep: `style.css`
- Keep: `script.js`
- Keep: `projects.html`
- Keep: `thumbnails.html`
- Keep: `reels.html`
- Keep: `vertical-projects.html`
- Keep: `instagram.html`
- Keep: `instagram-square.html`

### Static asset directories to serve through Next.js

- Move directory: `videos/` -> `public/videos/`
- Move directory: `tumb/` -> `public/tumb/`
- Move directory: `logo/` -> `public/logo/`
- Move directory: `img/` -> `public/img/`
- Move directory: `square/` -> `public/square/`
- Move directory: `icons/` -> `public/icons/`

### App and configuration files

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

### Application source files

- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/projetos/page.tsx`
- Create: `src/app/thumbnails/page.tsx`
- Create: `src/app/contato/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.ts`
- Create: `src/lib/utils.ts`
- Create: `src/components/site-header.tsx`
- Create: `src/components/hero-showreel.tsx`
- Create: `src/components/featured-projects-rail.tsx`
- Create: `src/components/editorial-section-header.tsx`
- Create: `src/components/project-card.tsx`
- Create: `src/components/project-grid.tsx`
- Create: `src/components/thumbnail-gallery.tsx`
- Create: `src/components/client-results.tsx`
- Create: `src/components/skills-list.tsx`
- Create: `src/components/experience-tags.tsx`
- Create: `src/components/differentials-grid.tsx`
- Create: `src/components/channel-links.tsx`
- Create: `src/components/social-links.tsx`
- Create: `src/components/contact-panel.tsx`
- Create: `src/components/site-footer.tsx`

### Tests

- Create: `tests/data/portfolio-data.test.ts`
- Create: `tests/routes/home-page.test.tsx`
- Create: `tests/routes/projects-page.test.tsx`
- Create: `tests/routes/thumbnails-contact-pages.test.tsx`

## Canonical Content Rules

- Canonical identity source: `index.html`
- Canonical local videos: all 10 files inside `videos/`
- Canonical local thumbnails: all 14 files inside `tumb/`
- Canonical local square/Instagram-style assets: all files inside `square/` and `img/instagram-square/`
- Canonical contact/profile facts from `index.html`:
  - Name: `Mateus Alves`
  - Role: `Creative Designer & Video Strategist specialized in Viral Content`
  - Phone / WhatsApp: `+55 (21) 97304-2881`
  - Email: `mateusalves.flu@gmail.com`
  - Age: `26 anos`
  - Phrase: `"Criatividade, retenção e resultados que transformam."`
- Canonical client/result facts from `index.html`:
  - Fuzileiro Real / Instagram 250k+ / YouTube 1.2M+
  - Só Papiro Cast / Instagram 85k / YouTube 300k+
- Canonical skill facts from `index.html`:
  - Photoshop 5
  - CapCut 4
  - Premiere Pro 5
  - After Effects 4
  - Blender 3
  - Canva 5
  - InDesign 4
- Canonical niches from `index.html`:
  - Entretenimento Militar
  - Entretenimento Educativo
  - Podcasts
  - Mídia para Cursos
  - Filmmaker
- Canonical differentiators from `index.html`:
  - Comunicativo
  - Trabalho em Equipe
  - Postagens em Massa
  - IA para Automação
  - Versatilidade Técnica
- Placeholder-only embedded YouTube/Picsum examples in secondary pages are not canonical content and must not replace the real local portfolio media.

### Task 1: Bootstrap Next.js, toolchain, and baseline test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Test: `tests/routes/home-page.test.tsx`

- [ ] **Step 1: Write the failing home smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the preserved portfolio identity", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /mateus alves/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: FAIL with module resolution errors because Next/Vitest app files do not exist yet.

- [ ] **Step 3: Create the baseline project configuration**

```json
{
  "name": "mateus-alves-portfolio",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.500.0",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "jsdom": "^26.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

```tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mateus Alves Portfolio",
  description: "Editorial-cinematic portfolio for video editing and creative direction.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// src/app/page.tsx
export default function HomePage() {
  return <h1>Mateus Alves</h1>;
}
```

```css
/* src/app/globals.css */
@import "tailwindcss";

html {
  background: #080605;
}

body {
  margin: 0;
  min-height: 100vh;
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: lockfile created and install completes without peer dependency errors.

- [ ] **Step 5: Run the home smoke test again**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: PASS with `1 passed`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts src/app/layout.tsx src/app/page.tsx src/app/globals.css tests/routes/home-page.test.tsx
git commit -m "chore: bootstrap nextjs portfolio app"
```

### Task 2: Centralize all canonical portfolio data and asset paths

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.ts`
- Modify: `src/app/page.tsx`
- Test: `tests/data/portfolio-data.test.ts`

- [ ] **Step 1: Write the failing portfolio data integrity test**

```ts
import { portfolioData } from "@/data/portfolio";

describe("portfolioData", () => {
  it("preserves the approved profile and contact information", () => {
    expect(portfolioData.profile.name).toBe("Mateus Alves");
    expect(portfolioData.profile.role).toBe("Creative Designer & Video Strategist specialized in Viral Content");
    expect(portfolioData.profile.ageLabel).toBe("26 anos");
    expect(portfolioData.contact.email).toBe("mateusalves.flu@gmail.com");
    expect(portfolioData.contact.whatsappHref).toContain("5521973042881");
  });

  it("preserves the local media inventory counts", () => {
    expect(portfolioData.projects).toHaveLength(10);
    expect(portfolioData.thumbnails).toHaveLength(14);
    expect(portfolioData.squareAssets).toHaveLength(8);
  });

  it("preserves result, skill, niche, and differentiator sections", () => {
    expect(portfolioData.clients).toHaveLength(2);
    expect(portfolioData.skills).toHaveLength(7);
    expect(portfolioData.niches).toHaveLength(5);
    expect(portfolioData.differentials).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/data/portfolio-data.test.ts`
Expected: FAIL because `@/data/portfolio` does not exist.

- [ ] **Step 3: Define the portfolio types**

```ts
// src/types/portfolio.ts
export type SocialLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  mediaType: "video";
  src: string;
  featured: boolean;
};

export type ThumbnailItem = {
  slug: string;
  alt: string;
  src: string;
};

export type ClientResult = {
  name: string;
  category: string;
  logoSrc: string;
  stats: Array<{ label: string; href: string }>;
};

export type SkillRating = {
  name: string;
  rating: number;
  outOf: number;
};

export type Differential = {
  title: string;
  description: string;
};
```

- [ ] **Step 4: Implement the canonical portfolio data module**

```ts
// src/data/portfolio.ts
import type { ClientResult, Differential, ProjectItem, SkillRating, ThumbnailItem } from "@/types/portfolio";

const projects: ProjectItem[] = [
  {
    slug: "curso-operacoes-com-caes",
    title: "Curso de Operações com Cães",
    description: "Edição dinâmica focada em retenção e branding.",
    mediaType: "video",
    src: "/videos/OPERAÇÕES COM CÃES - TODOS OS TEMEM OS CÃES DE GUERRA!-00.00.00.000-00.01.23.215.mp4",
    featured: true,
  },
  {
    slug: "brasileiros-na-guerra-da-ucrania",
    title: "Brasileiros na Guerra da Ucrânia",
    description: "Color grading e narrativa cinematográfica.",
    mediaType: "video",
    src: "/videos/brasileironaucrania.mp4",
    featured: true,
  },
  {
    slug: "taf-comandos-anfibios",
    title: "Taf Comandos Anfíbios",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/COMANDOS ANFÍBIOS OU OPERAÇÕES ESPECIAIS_ QUAL é a DIFERENÇA ENTRE OS DOIS CURSOS_-00.00.00.000-00.01.13.698.mp4",
    featured: true,
  },
  {
    slug: "legiao-estrangeira",
    title: "Legião Estrangeira",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/O LADO SOMBRIO DA LEGIÃO ESTRANGEIRA _ PASSO A PASSO PARA SE TORNAR UM LEGIONÁRIO!-00.00.00.000-00.01.09.160.mp4",
    featured: true,
  },
  {
    slug: "conheca-o-bepi",
    title: "Legião Estrangeira",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/CONHEÇA O BEPI - OS CAÇADORES DA CAATINGA!-00.00.00.000-00.01.26.278.mp4",
    featured: false,
  },
  {
    slug: "insano-taf-paracomandos",
    title: "Legião Estrangeira",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/INSANO_ TAF dos PARACOMANDOS-00.00.00.000-00.01.13.423.mp4",
    featured: false,
  },
  {
    slug: "taf-cia-prec",
    title: "Legião Estrangeira",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/O TAF DA CIA PREC É HARDCORE!-00.00.00.000-00.00.26.086.mp4",
    featured: false,
  },
  {
    slug: "gerr-ou-comanf",
    title: "Legião Estrangeira",
    description: "Cortes rápidos e efeitos visuais modernos.",
    mediaType: "video",
    src: "/videos/GERR ou COMANF_ QUAL É A DIFERENÇA_ COMO ENTRAR_-00.00.00.000-00.01.01.375.mp4",
    featured: false,
  },
  {
    slug: "pelotao-de-reconhecimento",
    title: "Pelotão de Reconhecimento e Vigilância do Corpo de Fuzileiros Navais",
    description: "Projeto preservado do acervo local.",
    mediaType: "video",
    src: "/videos/PELOTÃO DE RECONHECIMENTO E VIGILÂNCIA DO CORPO DE FUZILERIOS NAVAIS-00.00.00.000-00.01.06.105.mp4",
    featured: false,
  },
  {
    slug: "historia-cb-anisio",
    title: "A História do CB Anisio",
    description: "Projeto preservado do acervo local.",
    mediaType: "video",
    src: "/videos/A HISTÓRIA do CB ANISIO - O NAVAL QUE FOI PARAR NA UCRÂNIA!-00.00.00.000-00.00.51.811.mp4",
    featured: false,
  },
];

const thumbnails: ThumbnailItem[] = [
  { slug: "thumb-01", alt: "Thumbnail 1", src: "/tumb/maxresdefault (1).jpg" },
  { slug: "thumb-02", alt: "Thumbnail 2", src: "/tumb/maxresdefault (2).jpg" },
  { slug: "thumb-03", alt: "Thumbnail 3", src: "/tumb/maxresdefault (3).jpg" },
  { slug: "thumb-04", alt: "Thumbnail 4", src: "/tumb/maxresdefault (4).jpg" },
  { slug: "thumb-05", alt: "Thumbnail 5", src: "/tumb/maxresdefault (5).jpg" },
  { slug: "thumb-06", alt: "Thumbnail 6", src: "/tumb/maxresdefault.jpg" },
  { slug: "thumb-07", alt: "Thumbnail 7", src: "/tumb/maxresdefault (6).jpg" },
  { slug: "thumb-08", alt: "Thumbnail 8", src: "/tumb/sddefault (1).jpg" },
  { slug: "thumb-09", alt: "Thumbnail 9", src: "/tumb/sddefault (2).jpg" },
  { slug: "thumb-10", alt: "Thumbnail 10", src: "/tumb/sddefault (3).jpg" },
  { slug: "thumb-11", alt: "Thumbnail 11", src: "/tumb/sddefault (4).jpg" },
  { slug: "thumb-12", alt: "Thumbnail 12", src: "/tumb/sddefault.jpg" },
  { slug: "thumb-13", alt: "Thumbnail 13", src: "/tumb/3.jpg" },
  { slug: "thumb-14", alt: "Thumbnail 14", src: "/tumb/3 (2).jpg" },
];

const squareAssets: ThumbnailItem[] = [
  { slug: "square-01", alt: "Square 1", src: "/square/matbel.jpg" },
  { slug: "square-02", alt: "Square 2", src: "/square/dia sd.jpg" },
  { slug: "square-03", alt: "Square 3", src: "/square/aciso.webp" },
  { slug: "square-04", alt: "Square 4", src: "/square/engenharia.jpg" },
  { slug: "square-05", alt: "Square 5", src: "/square/07 de Setembro 🇧🇷 - “BRAVA GENTE BRASILEIRA LONGE VÁ, TEMOR SERVIL OU FICAR A PÁTRIA LIVRE, OU.jpg" },
  { slug: "square-06", alt: "Square 6", src: "/square/matbel2.jpg" },
  { slug: "square-07", alt: "Square 7", src: "/square/10 de Junho - Dia da arma de Artilharia O 25° Batalhão Logístico (Es) parabeniza a todos os mili.jpg" },
  { slug: "square-08", alt: "Square 8", src: "/square/18 de Setembro - Dia da Família Militar.....#familia #militar #exercitobrasileiro #military #arm.jpg" },
];

const clients: ClientResult[] = [
  {
    name: "Fuzileiro Real",
    category: "Entretenimento Militar",
    logoSrc: "/logo/download.jpg",
    stats: [
      { label: "Instagram: 250k+", href: "https://www.instagram.com/fuzileiroreal02/" },
      { label: "YouTube: 1.2M+", href: "https://www.youtube.com/fuzileiroreal" },
    ],
  },
  {
    name: "Só Papiro Cast",
    category: "Entretenimento Militar e Educativo",
    logoSrc: "/logo/channels4_profile.jpg",
    stats: [
      { label: "Instagram: 85k", href: "https://www.instagram.com/sopapirocast/" },
      { label: "YouTube: 300k+", href: "https://www.youtube.com/@sopapirocast" },
    ],
  },
];

const skills: SkillRating[] = [
  { name: "Photoshop", rating: 5, outOf: 5 },
  { name: "CapCut", rating: 4, outOf: 5 },
  { name: "Premiere Pro", rating: 5, outOf: 5 },
  { name: "After Effects", rating: 4, outOf: 5 },
  { name: "Blender", rating: 3, outOf: 5 },
  { name: "Canva", rating: 5, outOf: 5 },
  { name: "InDesign", rating: 4, outOf: 5 },
];

const differentials: Differential[] = [
  { title: "Comunicativo", description: "Foco em entendimento claro e alinhamento constante com o cliente." },
  { title: "Trabalho em Equipe", description: "Fácil integração com times de marketing e departamentos criativos." },
  { title: "Postagens em Massa", description: "Especialista em fluxo de trabalho para alto volume de conteúdo." },
  { title: "IA para Automação", description: "Uso de ferramentas avançadas para acelerar a produção sem perder qualidade." },
  { title: "Versatilidade Técnica", description: "Capacidade única de entrega em qualquer setup (PC forte ou fraco)." },
];

export const portfolioData = {
  profile: {
    name: "Mateus Alves",
    highlightedSurname: "Alves",
    role: "Creative Designer & Video Strategist specialized in Viral Content",
    portraitSrc: "/img/foto-perfil.png",
    ageLabel: "26 anos",
    phrase: "\"Criatividade, retenção e resultados que transformam.\"",
  },
  contact: {
    phoneLabel: "+55 (21) 97304-2881",
    whatsappHref: "https://api.whatsapp.com/send?phone=5521973042881&text=Ol%C3%A1%2C+Mateus%21",
    instagramHref: "https://www.instagram.com/mateusalvesdzn",
    linkedinHref: "#",
    email: "mateusalves.flu@gmail.com",
    emailHref: "mailto:mateusalves.flu@gmail.com",
  },
  channels: [
    { label: "Canal Fuzileiro", href: "https://www.youtube.com/fuzileiroreal" },
    { label: "Canal Só Papiro", href: "https://www.youtube.com/@sopapirocast" },
  ],
  projects,
  thumbnails,
  squareAssets,
  clients,
  skills,
  niches: [
    "Entretenimento Militar",
    "Entretenimento Educativo",
    "Podcasts",
    "Mídia para Cursos",
    "Filmmaker",
  ],
  differentials,
} as const;
```

- [ ] **Step 5: Update the temporary homepage to consume the real data**

```tsx
// src/app/page.tsx
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  return (
    <main>
      <h1>{portfolioData.profile.name}</h1>
      <p>{portfolioData.profile.role}</p>
    </main>
  );
}
```

- [ ] **Step 6: Run the data integrity test**

Run: `npm test -- --run tests/data/portfolio-data.test.ts`
Expected: PASS with `3 passed`.

- [ ] **Step 7: Commit**

```bash
git add src/types/portfolio.ts src/data/portfolio.ts src/app/page.tsx tests/data/portfolio-data.test.ts
git commit -m "feat: centralize preserved portfolio content"
```

### Task 3: Move static assets into `public/` and add shared layout/navigation primitives

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/social-links.tsx`
- Create: `src/components/channel-links.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/routes/home-page.test.tsx`

- [ ] **Step 1: Expand the failing home test to cover navigation and footer**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders navigation links for the approved routes", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /início/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /projetos/i })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: /thumbnails/i })).toHaveAttribute("href", "/thumbnails");
    expect(screen.getByRole("link", { name: /contato/i })).toHaveAttribute("href", "/contato");
  });

  it("renders the preserved footer contact information", () => {
    render(<HomePage />);
    expect(screen.getByText(/\+55 \(21\) 97304-2881/i)).toBeInTheDocument();
    expect(screen.getByText(/mateusalves\.flu@gmail\.com/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: FAIL because the homepage does not yet render the approved navigation/footer primitives.

- [ ] **Step 3: Move all static directories into `public/` without renaming files**

Run:

```bash
mkdir -p public
mv videos public/videos
mv tumb public/tumb
mv logo public/logo
mv img public/img
mv square public/square
mv icons public/icons
```

Expected: all original media files now resolve under `/videos/...`, `/tumb/...`, `/logo/...`, `/img/...`, `/square/...`, `/icons/...`.

- [ ] **Step 4: Implement the shared primitives**

```ts
// src/lib/utils.ts
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
```

```tsx
// src/components/site-header.tsx
import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/thumbnails", label: "Thumbnails" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm uppercase tracking-[0.3em] text-white">
          Mateus Alves
        </Link>
        <nav className="flex gap-6 text-sm text-white/80">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

```tsx
// src/components/social-links.tsx
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export function SocialLinks() {
  const { contact } = portfolioData;

  return (
    <div className="flex gap-3">
      <Link href={contact.whatsappHref}>WhatsApp</Link>
      <Link href={contact.instagramHref}>Instagram</Link>
      <Link href={contact.linkedinHref}>LinkedIn</Link>
      <Link href={contact.emailHref}>Email</Link>
    </div>
  );
}
```

```tsx
// src/components/channel-links.tsx
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export function ChannelLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      {portfolioData.channels.map((channel) => (
        <Link key={channel.href} href={channel.href}>
          {channel.label}
        </Link>
      ))}
    </div>
  );
}
```

```tsx
// src/components/site-footer.tsx
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const { profile, contact } = portfolioData;

  return (
    <footer className="border-t border-white/10 px-6 py-10 text-white">
      <h2>{profile.name}</h2>
      <p>{profile.ageLabel}</p>
      <p>{profile.phrase}</p>
      <p>{contact.phoneLabel}</p>
      <p>{contact.email}</p>
      <SocialLinks />
    </footer>
  );
}
```

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --background: #080605;
  --surface: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 244, 230, 0.12);
  --text: #f5ede3;
  --muted: rgba(245, 237, 227, 0.72);
  --accent: #b4603d;
  --accent-soft: #6f2e1d;
}

html {
  background:
    radial-gradient(circle at top, rgba(164, 86, 52, 0.18), transparent 32%),
    linear-gradient(180deg, #120d0b 0%, #080605 55%, #060505 100%);
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  background: transparent;
}
```

- [ ] **Step 5: Update the homepage shell to use the primitives**

```tsx
// src/app/page.tsx
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-10">
        <h1>{portfolioData.profile.name}</h1>
        <p>{portfolioData.profile.role}</p>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 6: Run the expanded home test**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: PASS with navigation and footer assertions satisfied.

- [ ] **Step 7: Commit**

```bash
git add public src/lib/utils.ts src/components/site-header.tsx src/components/site-footer.tsx src/components/social-links.tsx src/components/channel-links.tsx src/app/layout.tsx src/app/globals.css src/app/page.tsx tests/routes/home-page.test.tsx
git commit -m "feat: add shared layout and serve static assets"
```

### Task 4: Implement the editorial-cinematic homepage

**Files:**
- Create: `src/components/hero-showreel.tsx`
- Create: `src/components/featured-projects-rail.tsx`
- Create: `src/components/editorial-section-header.tsx`
- Create: `src/components/client-results.tsx`
- Create: `src/components/skills-list.tsx`
- Create: `src/components/experience-tags.tsx`
- Create: `src/components/differentials-grid.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/routes/home-page.test.tsx`

- [ ] **Step 1: Add failing homepage content coverage tests**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage content", () => {
  it("renders the cinematic hero, featured projects rail, and channel links", () => {
    render(<HomePage />);
    expect(screen.getByText(/creative designer & video strategist specialized in viral content/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /projetos em destaque/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /canal fuzileiro/i })).toHaveAttribute("href", "https://www.youtube.com/fuzileiroreal");
    expect(screen.getByRole("link", { name: /canal só papiro/i })).toHaveAttribute("href", "https://www.youtube.com/@sopapirocast");
  });

  it("renders preserved clients, niches, and differentiators", () => {
    render(<HomePage />);
    expect(screen.getByText(/fuzileiro real/i)).toBeInTheDocument();
    expect(screen.getByText(/só papiro cast/i)).toBeInTheDocument();
    expect(screen.getByText(/entretenimento militar/i)).toBeInTheDocument();
    expect(screen.getByText(/versatilidade técnica/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: FAIL because the home shell does not yet render the full approved sections.

- [ ] **Step 3: Build the homepage components**

```tsx
// src/components/editorial-section-header.tsx
export function EditorialSectionHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.4em] text-white/45">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-white md:text-5xl">{title}</h2>
    </div>
  );
}
```

```tsx
// src/components/hero-showreel.tsx
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/social-links";

export function HeroShowreel() {
  const primaryProject = portfolioData.projects[0];

  return (
    <section className="grid gap-8 px-6 py-12 md:grid-cols-[0.95fr_1.05fr] md:py-20">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Editorial Cinematic Portfolio</p>
        <h1 className="mt-4 text-5xl leading-none text-white md:text-7xl">
          Mateus <span className="text-[color:var(--accent)]">Alves</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
          {portfolioData.profile.role}
        </p>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          Criatividade, retenção e resultados em uma apresentação bilíngue orientada por narrativa visual.
        </p>
        <div className="mt-8">
          <SocialLinks />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <video className="w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl" src={primaryProject.src} muted controls playsInline />
      </motion.div>
    </section>
  );
}
```

```tsx
// src/components/featured-projects-rail.tsx
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function FeaturedProjectsRail() {
  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title="Projetos em Destaque" eyebrow="Featured Work" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {portfolioData.projects.filter((project) => project.featured).map((project) => (
          <article key={project.slug} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <video className="aspect-video w-full rounded-2xl object-cover" src={project.src} muted playsInline preload="metadata" />
            <h3 className="mt-4 text-xl text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-white/65">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/client-results.tsx
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function ClientResults() {
  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title="Resultados & Clientes" eyebrow="Proof" />
      <div className="grid gap-4 md:grid-cols-2">
        {portfolioData.clients.map((client) => (
          <article key={client.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4">
              <Image src={client.logoSrc} alt={client.name} width={64} height={64} className="rounded-2xl" />
              <div>
                <h3 className="text-xl text-white">{client.name}</h3>
                <p className="text-sm text-white/60">{client.category}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {client.stats.map((stat) => (
                <Link key={stat.href} href={stat.href} className="text-sm text-white/80">
                  {stat.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/skills-list.tsx
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function SkillsList() {
  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title="Ferramentas & Skills" eyebrow="Toolkit" />
      <div className="grid gap-3">
        {portfolioData.skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <span>{skill.name}</span>
            <span>{`${skill.rating}/${skill.outOf}`}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/experience-tags.tsx
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function ExperienceTags() {
  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title="Experiências & Nichos" eyebrow="Specialties" />
      <div className="flex flex-wrap gap-3">
        {portfolioData.niches.map((niche) => (
          <span key={niche} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            {niche}
          </span>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/differentials-grid.tsx
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function DifferentialsGrid() {
  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title="Habilidades & Diferenciais" eyebrow="Working Style" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.differentials.map((item) => (
          <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/65">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Compose the homepage with the approved section order**

```tsx
// src/app/page.tsx
import { ChannelLinks } from "@/components/channel-links";
import { ClientResults } from "@/components/client-results";
import { DifferentialsGrid } from "@/components/differentials-grid";
import { ExperienceTags } from "@/components/experience-tags";
import { FeaturedProjectsRail } from "@/components/featured-projects-rail";
import { HeroShowreel } from "@/components/hero-showreel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsList } from "@/components/skills-list";
import { ThumbnailGallery } from "@/components/thumbnail-gallery";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroShowreel />
        <FeaturedProjectsRail />
        <section className="px-6 py-10">
          <ChannelLinks />
        </section>
        <ThumbnailGallery limit={6} />
        <ClientResults />
        <SkillsList />
        <ExperienceTags />
        <DifferentialsGrid />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 5: Add the editorial visual system polish in `globals.css`**

```css
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px),
    radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.06) 0 1px, transparent 1px);
  background-size: 12px 12px, 18px 18px;
}
```

- [ ] **Step 6: Run homepage tests**

Run: `npm test -- --run tests/routes/home-page.test.tsx`
Expected: PASS with all home content assertions satisfied.

- [ ] **Step 7: Commit**

```bash
git add src/components/hero-showreel.tsx src/components/featured-projects-rail.tsx src/components/editorial-section-header.tsx src/components/client-results.tsx src/components/skills-list.tsx src/components/experience-tags.tsx src/components/differentials-grid.tsx src/app/page.tsx src/app/globals.css tests/routes/home-page.test.tsx
git commit -m "feat: implement editorial cinematic homepage"
```

### Task 5: Implement the `Projetos` page from preserved local videos

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/components/project-grid.tsx`
- Create: `src/app/projetos/page.tsx`
- Test: `tests/routes/projects-page.test.tsx`

- [ ] **Step 1: Write the failing projetos route test**

```tsx
import { render, screen } from "@testing-library/react";
import ProjectsPage from "@/app/projetos/page";

describe("ProjectsPage", () => {
  it("renders all preserved project videos and headings", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /todos os projetos/i })).toBeInTheDocument();
    expect(screen.getByText(/curso de operações com cães/i)).toBeInTheDocument();
    expect(screen.getByText(/brasileiros na guerra da ucrânia/i)).toBeInTheDocument();
    expect(screen.getByText(/a história do cb anisio/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/routes/projects-page.test.tsx`
Expected: FAIL because `/projetos` route and project components do not exist.

- [ ] **Step 3: Implement project listing components**

```tsx
// src/components/project-card.tsx
import type { ProjectItem } from "@/types/portfolio";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
      <video className="aspect-video w-full rounded-2xl object-cover" src={project.src} controls playsInline preload="metadata" />
      <h3 className="mt-4 text-xl text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-white/65">{project.description}</p>
    </article>
  );
}
```

```tsx
// src/components/project-grid.tsx
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export function ProjectGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {portfolioData.projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

```tsx
// src/app/projetos/page.tsx
import { EditorialSectionHeader } from "@/components/editorial-section-header";
import { ProjectGrid } from "@/components/project-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-12">
        <EditorialSectionHeader title="Todos os Projetos" eyebrow="Project Archive" />
        <ProjectGrid />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 4: Run the projetos test**

Run: `npm test -- --run tests/routes/projects-page.test.tsx`
Expected: PASS with project route rendering the preserved archive.

- [ ] **Step 5: Commit**

```bash
git add src/components/project-card.tsx src/components/project-grid.tsx src/app/projetos/page.tsx tests/routes/projects-page.test.tsx
git commit -m "feat: add projetos archive page"
```

### Task 6: Implement the `Thumbnails` and `Contato` pages from preserved content

**Files:**
- Create: `src/components/thumbnail-gallery.tsx`
- Create: `src/components/contact-panel.tsx`
- Create: `src/app/thumbnails/page.tsx`
- Create: `src/app/contato/page.tsx`
- Test: `tests/routes/thumbnails-contact-pages.test.tsx`

- [ ] **Step 1: Write the failing thumbnails/contact route tests**

```tsx
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contato/page";
import ThumbnailsPage from "@/app/thumbnails/page";

describe("ThumbnailsPage", () => {
  it("renders the preserved thumbnail archive", () => {
    render(<ThumbnailsPage />);
    expect(screen.getByRole("heading", { name: /todas as thumbnails/i })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(14);
  });
});

describe("ContactPage", () => {
  it("renders the preserved direct contact paths", () => {
    render(<ContactPage />);
    expect(screen.getByText(/\+55 \(21\) 97304-2881/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://www.instagram.com/mateusalvesdzn");
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", expect.stringContaining("5521973042881"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/routes/thumbnails-contact-pages.test.tsx`
Expected: FAIL because these routes/components do not exist.

- [ ] **Step 3: Implement the thumbnail and contact components**

```tsx
// src/components/thumbnail-gallery.tsx
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { EditorialSectionHeader } from "@/components/editorial-section-header";

export function ThumbnailGallery({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? portfolioData.thumbnails.slice(0, limit) : portfolioData.thumbnails;

  return (
    <section className="px-6 py-10">
      <EditorialSectionHeader title={limit ? "Thumbnails" : "Todas as Thumbnails"} eyebrow="Visual Library" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
            <Image src={item.src} alt={item.alt} width={1280} height={720} className="h-full w-full object-cover" />
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/contact-panel.tsx
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export function ContactPanel() {
  const { profile, contact } = portfolioData;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <h1 className="text-4xl text-white">{profile.name}</h1>
      <p className="mt-3 max-w-xl text-white/70">{profile.role}</p>
      <div className="mt-6 space-y-2 text-sm text-white/80">
        <p>{contact.phoneLabel}</p>
        <p>{contact.email}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={contact.whatsappHref}>WhatsApp</Link>
        <Link href={contact.instagramHref}>Instagram</Link>
        <Link href={contact.emailHref}>Email</Link>
      </div>
    </section>
  );
}
```

```tsx
// src/app/thumbnails/page.tsx
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThumbnailGallery } from "@/components/thumbnail-gallery";

export default function ThumbnailsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ThumbnailGallery />
      </main>
      <SiteFooter />
    </>
  );
}
```

```tsx
// src/app/contato/page.tsx
import { ContactPanel } from "@/components/contact-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-12">
        <ContactPanel />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 4: Run the thumbnails/contact tests**

Run: `npm test -- --run tests/routes/thumbnails-contact-pages.test.tsx`
Expected: PASS with thumbnail count and direct contact path assertions satisfied.

- [ ] **Step 5: Commit**

```bash
git add src/components/thumbnail-gallery.tsx src/components/contact-panel.tsx src/app/thumbnails/page.tsx src/app/contato/page.tsx tests/routes/thumbnails-contact-pages.test.tsx
git commit -m "feat: add thumbnails and contact pages"
```

### Task 7: Final integration QA, responsiveness, and release cleanup

**Files:**
- Modify: `src/app/globals.css`
- Modify: any component files requiring polish after QA
- Test: `tests/routes/home-page.test.tsx`
- Test: `tests/routes/projects-page.test.tsx`
- Test: `tests/routes/thumbnails-contact-pages.test.tsx`

- [ ] **Step 1: Run the full automated suite before polish**

Run: `npm test`
Expected: PASS for all route and data tests.

- [ ] **Step 2: Run lint and production build**

Run: `npm run lint`
Expected: PASS with no ESLint errors.

Run: `npm run build`
Expected: PASS with all four routes compiled.

- [ ] **Step 3: Start the app locally and do route QA**

Run: `npm run dev`
Expected: local dev server starts on `http://localhost:3000`.

Manual checks:
- `/` renders cinematic hero, featured projects, channels, thumbnails preview, clients, skills, niches, and differentiators.
- `/projetos` renders all preserved video entries.
- `/thumbnails` renders all preserved thumbnail images.
- `/contato` renders preserved phone/email/social contact paths.
- Desktop and mobile both keep the editorial hierarchy without clipping or overflow.

- [ ] **Step 4: Fix any responsive or fidelity gaps found during QA**

```css
@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(3rem, 14vw, 4.75rem);
  }
}
```

Apply only targeted fixes discovered during QA; do not rewrite content or remove preserved sections.

- [ ] **Step 5: Re-run the quality gates**

Run: `npm test && npm run build`
Expected: all tests still pass and the production build remains green.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/page.tsx src/app/projetos/page.tsx src/app/thumbnails/page.tsx src/app/contato/page.tsx src/components
git commit -m "fix: polish portfolio responsiveness and QA issues"
```

## Self-Review

### Spec coverage

- Home hero/showreel: covered by Task 4
- Featured projects rail: covered by Task 4
- Internal pages `Projetos`, `Thumbnails`, `Contato`: covered by Tasks 5 and 6
- Bilingual tone and preserved messaging: covered by Task 2 data centralization and Task 4 hero composition
- Motion direction: covered by Task 4 hero and featured rail implementation
- No information loss: covered by Task 2 data integrity tests and canonical content rules
- Asset/path preservation: covered by Task 3 public asset move and Task 7 QA

### Placeholder scan

- No `TODO`, `TBD`, or undefined placeholder implementation steps remain.
- Secondary placeholder HTML pages are explicitly marked non-canonical so they will not replace real content.

### Type consistency

- `portfolioData` is the only content source used across routes.
- `ProjectItem`, `ThumbnailItem`, `ClientResult`, `SkillRating`, and `Differential` are defined once and reused consistently.

