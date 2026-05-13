# Mateus Alves — Portfolio

Site portfólio de Mateus Alves (Creative Designer & Video Strategist), construído como aplicação Next.js com renderização no servidor, animações em React e estilo cinematográfico.

## Tecnologias

- **Next.js 16** — framework React com App Router (`src/app/`).
- **React 19** + **TypeScript 5** — componentes em `src/components/`.
- **Tailwind CSS 4** (via `@tailwindcss/postcss`) + `src/app/globals.css` para estilos globais.
- **Framer Motion 12** — animações de entrada e transições.
- **lucide-react** — ícones.
- **ESLint 9** (`eslint-config-next`) — linting.
- **Vitest 3** + Testing Library + jsdom — testes (config em `vitest.config.ts`, setup em `vitest.setup.ts`).
- **PostCSS** — pipeline de CSS.

## Pré-requisitos

- Node.js 18.18+ (recomendado 20+).
- npm (ou pnpm/yarn — os exemplos abaixo usam `npm`).

## Como rodar

Instalar dependências:

```bash
npm install
```

Servidor de desenvolvimento (`http://localhost:3000`):

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Servir build de produção:

```bash
npm start
```

Lint:

```bash
npm run lint
```

Testes:

```bash
npm test
```

## Estrutura do projeto

```
src/
├── app/                  # Rotas (App Router): page.tsx, layout.tsx, /contato, /projetos, /thumbnails
│   └── globals.css       # Estilos globais e tokens de tema
├── components/           # Componentes de UI (hero, project-card, social-links, etc.)
├── data/portfolio.ts     # Conteúdo do portfólio (perfil, contato, projetos, skills, clientes)
├── lib/utils.ts          # Utilidades (ex.: cn para classes)
└── types/portfolio.ts    # Tipagens dos dados do portfólio
public/                   # Assets estáticos: /videos, /tumb, /square, /img, /logo
tests/                    # Testes Vitest
```

## Como editar o conteúdo

Todo o conteúdo exibido (nome, frases, links de contato, projetos, clientes, skills, etc.) está centralizado em **`src/data/portfolio.ts`**. Para mudar textos, links ou adicionar/remover itens, edite esse arquivo — as tipagens em `src/types/portfolio.ts` orientam o formato esperado.

Exemplos comuns:

- **Atualizar links sociais** — campos `contact.whatsappHref`, `contact.instagramHref`, `contact.linkedInHref`, `contact.emailHref` e o array `contact.socials`.
- **Adicionar um projeto em vídeo** — adicione um item em `projects` com `title`, `description` e `assetPath` (arquivo dentro de `public/videos/`).
- **Adicionar thumbnail** — adicione em `thumbnails` apontando para um arquivo em `public/tumb/`.
- **Adicionar cliente** — adicione em `clients` com `name`, `niche`, `logoPath` (em `public/logo/`) e `stats`.
- **Atualizar skills/nichos/diferenciais** — arrays `skills`, `niches`, `differentials`.

### Editar layout e estilo

- **Componentes visuais** — em `src/components/` (ex.: `hero-video-cube.tsx`, `project-card.tsx`, `site-header.tsx`).
- **Páginas/rotas** — em `src/app/` (`page.tsx` é a home; subpastas `contato/`, `projetos/`, `thumbnails/` são rotas adicionais).
- **Estilos globais e tema** — `src/app/globals.css`. Utilitários Tailwind podem ser aplicados diretamente nos componentes.

### Adicionar mídia

Coloque os arquivos em `public/`:

- Vídeos → `public/videos/`
- Thumbnails → `public/tumb/`
- Imagens quadradas → `public/square/` ou `public/img/instagram-square/`
- Logos → `public/logo/`

Depois referencie pelo caminho começando com `/` (ex.: `/videos/meu-video.mp4`) no `portfolio.ts`.

## Deploy

Projeto pronto para deploy em qualquer plataforma compatível com Next.js (Vercel é a padrão recomendada). Basta conectar o repositório e usar os comandos `npm run build` / `npm start`.
