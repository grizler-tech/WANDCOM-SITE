# WANDCOM design system

The visual language is **minimal + premium + digital + youthful**: generous whitespace, bold
typography, one signal accent, hairline structure and motion that never shouts.

---

## 1. Colour tokens

Defined once in `src/app/globals.css` inside Tailwind v4's `@theme`, so every token is available as a
utility (`bg-ink`, `text-fg-muted`, `border-line`, `text-accent`…).

| Token                     | Value                   | Used for                                     |
| ------------------------- | ----------------------- | -------------------------------------------- |
| `--color-ink`             | `#07080A`               | Page background — the default canvas         |
| `--color-ink-soft`        | `#0C0E13`               | Chapter bands (capability strip, footer)     |
| `--color-ink-card`        | `#111318`               | Cards and panels on dark                     |
| `--color-line`            | `#23262E`               | Primary hairlines and borders                |
| `--color-line-soft`       | `#1A1D23`               | Secondary dividers inside cards              |
| `--color-paper`           | `#F5F6F8`               | Light “chapter” sections (`.on-paper`)       |
| `--color-paper-line`      | `#DCDFE4`               | Hairlines on light                           |
| `--color-fg`              | `#F7F8FA`               | Primary text on dark                         |
| `--color-fg-muted`        | `#9BA1AC`               | Secondary text on dark                       |
| `--color-fg-invert`       | `#07080A`               | Text on light sections                       |
| `--color-fg-invert-muted` | `#565C66`               | Secondary text on light                      |
| `--color-accent`          | `#C8FF4D` (signal lime) | CTAs, key numbers, active states, focus ring |
| `--color-accent-deep`     | `#A5E022`               | Accent hover                                 |
| `--color-accent-soft`     | `rgba(200,255,77,.12)`  | Selected chips and states                    |

**Ratio discipline:** ~90% ink/paper surfaces, ~9% text hierarchy, ~1% accent. The accent is reserved
for action and emphasis — never decoration.

## 2. Type

| Role          | Size                              | Weight  | Tracking      |
| ------------- | --------------------------------- | ------- | ------------- |
| Hero (h1)     | `clamp(2.6rem, 7vw, 5.1rem)`      | 600     | `-0.035em`    |
| Page title    | `clamp(2.3rem, 6vw, 4.4rem)`      | 600     | `-0.03em`     |
| Section (h2)  | `clamp(2rem, 4.6vw, 3.4rem)`      | 600     | `-0.03em`     |
| Card (h3)     | `1.25–1.75rem`                    | 600     | `-0.03em`     |
| Body          | `1rem–1.125rem`, line-height 1.7  | 400     | normal        |
| Small / meta  | `0.875rem`                        | 400     | normal        |
| Eyebrow/label | `0.6875rem`, uppercase            | 500     | `0.18em` mono |
| Numerals      | mono, aligned where tabular       | 400–500 | `0.14em`      |

- Family: **Inter** via `next/font/google` (variable `--font-inter`), `display: swap`.
- The mono stack is the platform UI mono — used for indices, references, metrics and labels.
- Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

## 3. Space, shape, structure

- Page gutter: `.shell` — 1.25rem → 2rem (`sm`) → 2.5rem (`xl`), max width 84rem.
- Section rhythm: `.section-y` — `clamp(4.5rem, 9vw, 8.5rem)`.
- Radii: `--radius-card: 1.25rem`; pills for buttons and chips.
- Structure is drawn with **1px hairlines and `gap-px` grids**, not heavy shadows — the only shadow
  in the system is the floating WhatsApp pill.
- `.grid-bg` adds the 72px hairline grid behind hero/CTA blocks, and recolours itself inside
  `.on-paper`.

## 4. Components

| Component           | File                     | Notes                                                                                                      |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `Button`            | `ui/Button.tsx`          | 5 variants (`primary`, `secondary`, `outline`, `ghost`, `invert`), 3 sizes; renders link, anchor or button |
| `Section` / `Shell` | `ui/Section.tsx`         | Tone (`dark`, `deep`, `paper`, `accent`), optional grid background                                         |
| `SectionHeading`    | `ui/SectionHeading.tsx`  | Eyebrow + title + description + action slot; `h1`, `h2` or `h3`                                            |
| `Reveal` family     | `ui/Reveal.tsx`          | `Reveal`, `RevealGroup`, `RevealItem` for staggered entrances                                              |
| `Marquee`           | `ui/Marquee.tsx`         | Pure-CSS infinite strip, pauses on hover, duplicate hidden from AT                                         |
| `Icon`              | `ui/Icon.tsx`            | Registry keyed by string — content files never import lucide directly                                      |
| `ProjectArt`        | `work/ProjectArt.tsx`    | Generative case-study artwork from a two-colour palette                                                    |
| Forms               | `forms/*`                | Multi-step brief, newsletter, quote calculator                                                             |

## 5. Motion rules

Presets live in `src/lib/motion.ts`.

1. **Subtle, fast, purposeful.** 0.25–0.8s, transform/opacity only.
2. **Reveal once.** `viewportOnce = { once: true, amount: 0.25 }` — content never re-animates when you
   scroll back.
3. **Signature easing:** `easeOutExpo = [0.22, 1, 0.36, 1]`.
4. **Stagger, don't swarm:** 0.07–0.09s between siblings, at most ~6 items sequenced.
5. **Reduced motion:** `MotionConfig reducedMotion="user"` plus a CSS media query that neutralises
   animation and smooth scrolling.
6. **Micro-interactions:** arrows translate 2–6px on hover, card borders warm to the accent, and the
   hero spotlight follows the pointer via CSS variables (no React re-render).

## 6. Accessibility baseline

- Contrast: body text ≥ 4.5:1 on both canvases; the accent is never used for long-form text on dark.
- Visible `:focus-visible` ring in accent (ink on light sections).
- Icon-only controls always carry an `aria-label`; decorative icons are `aria-hidden`.
- Fields keep visible labels (no placeholder-only inputs) and errors are announced with
  `role="alert"`.
- The skip-to-content link is the first focusable element on every page.

## 7. Do / don't

| Do                                               | Don't                                              |
| ------------------------------------------------ | -------------------------------------------------- |
| Use the accent for the single most important CTA | Sprinkle lime across headings and icons            |
| Keep sections on one of four tones               | Invent new background greys per section            |
| Animate transform and opacity                    | Animate height, width, colour or layout properties |
| Let type size carry hierarchy                    | Add drop shadows to create hierarchy               |
| Alternate dark and light chapters deliberately   | Alternate tones randomly page after page           |
