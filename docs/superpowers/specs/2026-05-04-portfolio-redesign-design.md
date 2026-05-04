# Portfolio Redesign Design Spec

## Overview

Refactor the current static portfolio from plain HTML/CSS/JS into a modern Next.js application while preserving all current portfolio information, assets, contact links, and media. The new experience should reposition the site as an editorial-cinematic portfolio for a video editor, with a premium hybrid structure: a high-impact homepage plus focused internal pages.

## Goals

- Preserve all current visible portfolio information and media inventory.
- Replace the current glassmorphism/stack-card presentation with a distinctive editorial-cinematic visual system.
- Improve information hierarchy, navigation, responsiveness, maintainability, and content reuse.
- Rebuild the site using a modern frontend stack centered on Next.js and structured content data.
- Keep the portfolio commercially effective: strong first impression, clear service positioning, direct contact paths.

## Non-Goals

- No CMS integration in this phase.
- No backend or authentication work.
- No content rewriting that changes the meaning of the current portfolio positioning.
- No expansion to additional internal pages beyond the approved first-version scope.

## Approved Product Direction

### Experience model

Use the recommended `Narrative Showroom` approach:

- Homepage opens with a cinematic showreel-first hero.
- Immediately below, include a highlighted featured-projects rail inspired by the stronger authority strip explored during design.
- Continue the homepage with curated supporting sections instead of dumping every asset at once.
- Use a hybrid IA: strong homepage plus internal pages for `Projetos`, `Thumbnails`, and `Contato`.

### Language

Preserve the current bilingual positioning. The homepage and key marketing text should maintain the bilingual tone already present in the site rather than switching to a single-language presentation.

### Motion

Use balanced motion:

- expressive in the hero and primary project highlights;
- restrained in supporting sections and internal pages;
- never distracting enough to compete with the actual portfolio videos.

## Information Architecture

### Primary routes

- `/` Home
- `/projetos`
- `/thumbnails`
- `/contato`

### Homepage structure

1. Cinematic hero
2. Featured projects rail
3. Personal/editorial intro
4. Channel links and credibility touchpoints
5. Thumbnail preview section
6. Contact CTA/footer close

### Internal pages

#### `/projetos`

- Curated video-focused listing
- Large editorial cards with preview media
- Clear title and short context/description per project
- Possible grouping into featured and archive if that improves scanability without hiding assets

#### `/thumbnails`

- Image-first gallery
- Editorial grid rather than repetitive generic cards
- Focus on visual impact and fast browsing

#### `/contato`

- Short premium contact page
- WhatsApp, Instagram, email, and any retained social/contact links
- Reinforce direct inquiry / project conversation CTA

## Content Preservation Rules

- Preserve current profile identity: Mateus Alves, video editing positioning, portrait, and contact endpoints.
- Preserve current YouTube channel links.
- Preserve current project media files and thumbnail image files.
- Preserve the existence of both project videos and thumbnail galleries in the new structure.
- Preserve all current user-facing categories that materially exist today, even if they are reorganized.
- Fix inconsistent or repeated project labels only when the current markup is clearly duplicated or erroneous.

## Visual Direction

### Aesthetic

The site should feel like a premium editorial presentation for a video editor:

- dark cinematic base;
- warm accent range leaning toward copper, ember, rust, and restrained red;
- textured, atmospheric backgrounds rather than flat black or generic tech glow;
- strong display typography for headlines;
- calmer supporting typography for descriptions and interface text.

### Explicitly avoid

- tech-glass aesthetic as the core visual identity;
- generic startup SaaS layout patterns;
- default purple/blue gradient branding;
- interchangeable card-grid templates;
- overly playful or neon-heavy motion-graphics aesthetics that reduce premium feel.

### Hero direction

The hero should combine:

- a dominant showreel area or featured video surface;
- bilingual manifesto-style headline/subheadline;
- refined personal identity block;
- direct CTA to contact or discuss projects;
- a composed, studio-like layout rather than a centered landing-page template.

## Component System

Core components:

- `SiteHeader`
- `HeroShowreel`
- `FeaturedProjectsRail`
- `EditorialSectionHeader`
- `ProjectCard`
- `ProjectGrid`
- `ThumbnailGallery`
- `ContactPanel`
- `SocialLinks`
- `ChannelLinks`
- `SiteFooter`

Design system primitives:

- typographic scale for editorial headline / section title / body / label;
- shared spacing and container widths;
- accent treatments for borders, overlays, dividers, and CTA states;
- reusable media-frame styling for video and image surfaces;
- motion presets for reveal, hover, and section entrance.

## Technical Architecture

### Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for major transitions and reveal behavior
- Lucide icons or custom SVGs where a more editorial fit is required

### Project structure

- `app/page.tsx`
- `app/projetos/page.tsx`
- `app/thumbnails/page.tsx`
- `app/contato/page.tsx`
- `src/components/...`
- `src/data/portfolio.ts`
- `public/...` for migrated static assets as needed by Next.js

### Content modeling

Move repeated hardcoded markup into structured content data:

- profile/contact metadata
- channel links
- projects array
- thumbnails array

This data layer must drive both the homepage previews and the internal listing pages so the same content source is reused consistently.

## Data Migration Notes

- Audit the current HTML files to discover all content variants now spread across pages such as `index.html`, `projects.html`, `thumbnails.html`, and related format-specific pages.
- Normalize repeated project titles/descriptions where the current source is obviously duplicated by mistake.
- Keep original assets local and referenced through Next.js-friendly paths.
- Ensure media filenames with spaces or special characters still resolve correctly after migration.

## Interaction Design

- Hero enters with stronger motion than the rest of the page.
- Featured projects should feel interactive and premium, with hover/focus states that emphasize media.
- Internal page transitions can be subtle if implemented, but are optional compared with strong in-page polish.
- Motion must respect `prefers-reduced-motion`.

## Responsive Behavior

- Desktop should emphasize cinematic composition and editorial asymmetry.
- Tablet should preserve hierarchy without collapsing into cramped grids.
- Mobile should remain premium and readable, with strong media-first stacking and accessible CTA placement.
- The hero must remain compelling on mobile, but should simplify composition rather than shrink every desktop element proportionally.

## Accessibility and Quality

- Use semantic HTML structure and accessible link/button states.
- Provide alt text for images where meaningful.
- Ensure color contrast remains readable against dark backgrounds.
- Avoid autoplay behavior that causes accessibility or browser-policy issues; muted inline preview behavior is acceptable where appropriate.

## Risks and Mitigations

- Risk: current content is duplicated or inconsistent across static pages.
  Mitigation: perform a content inventory before migration and centralize approved data in one source file.

- Risk: a highly stylized redesign can overshadow the actual portfolio media.
  Mitigation: keep motion and decorative treatments subordinate to the video/image work.

- Risk: many local assets with non-normalized names can break routing.
  Mitigation: validate every referenced path during migration and verification.

## Verification Plan

- Run local build successfully.
- Validate all primary routes.
- Verify desktop and mobile rendering.
- Verify all contact links still work.
- Verify all preserved project videos and thumbnail images load correctly.
- Confirm homepage still exposes the core identity, projects, channel links, and contact paths.

## Implementation Handoff

The implementation phase should:

1. scaffold the Next.js app foundation;
2. migrate assets and content into structured data;
3. build the approved component system;
4. implement the homepage first;
5. implement internal pages;
6. run visual and functional verification across desktop and mobile.
