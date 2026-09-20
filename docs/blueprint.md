# WANDCOM — UI/UX blueprint (as built)

This is the page-by-page specification the codebase implements. Copy lives in `src/content/*`, so
content can change without touching a component.

---

## 1. Positioning

**Primary:** WANDCOM is a *digital solutions & creative technology company*.
**Secondary:** the digital side is the main identity; other ventures sit underneath the brand later.

Every page answers, in order: **What do you do? → Who do you help? → What can I hire you for? →
How do I start?**

### Brand architecture

```text
                    WANDCOM
        digital solutions company
                      │
   ┌──────────────┬───────────┬────────────────┐
 01 Digital     02 Brand     03 Digital      04 Digital
 Experiences    & Visual     Growth          Solutions
 Websites       Identity     Marketing       Automation
 E-commerce     UI/UX        Social          WhatsApp commerce
 Landing pages  Graphics     Content         Custom apps
 UI/UX          Guidelines   SEO             Dashboards
 Maintenance                 Strategy        Integrations
```

Expansion path (structure already supports it, no rebuild required):
`WANDCOM GROUP → WANDCOM DIGITAL · WANDCOM COMMERCE · WANDCOM VENTURES`

---

## 2. Global elements

### Header (`components/layout/Header.tsx`)

- Transparent over the hero; after 16px of scroll it becomes a blurred bar with a hairline border.
- Nav: **Home · Services · Work · Process · Pricing · About** with an animated active indicator.
- Persistent primary CTA: **Start a Project**. A WhatsApp link appears from `xl` upwards.
- Below `lg`: a slide-down panel with every link, both CTAs, email and location; body scroll is
  locked while it is open and it closes automatically on navigation.

### Footer (`components/layout/Footer.tsx`)

- Brand block: wordmark, tagline, `Start a Project` + `WhatsApp us`, email, phone, location, hours.
- Columns: **Services** (the four divisions, deep-linked), **Company**, **Connect**
  (Instagram, TikTok, LinkedIn, WhatsApp).
- Newsletter signup (“Signals, not spam”) posting to `/api/newsletter`.
- Bottom bar: `© <year> WANDCOM. All rights reserved.` plus the positioning line.

### WhatsApp float (`components/layout/WhatsAppFloat.tsx`)

- Appears only after 560px of scroll, bottom-right, a single accent pill that expands its label.
- Deliberately understated: the website is headquarters, WhatsApp is the fast lane.

---

## 3. Pages

### `/` Homepage

| #   | Section           | Purpose                                                                                                                                                                                             |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `Hero`            | Headline **“We build digital experiences that move businesses forward.”**, supporting paragraph, `Start a Project` / `Explore Our Services`, interactive WEB · BRAND · DESIGN · DIGITAL composition |
| 2   | `CapabilityStrip` | Credibility marquee (Web Design · Branding · Digital Solutions · Creative Design · Social Media · E-commerce) plus four trust stats                                                                 |
| 3   | `ServicesPreview` | The four divisions as chapter cards with index, tagline, service chips and “starting from”                                                                                                          |
| 4   | `WhyWandcom`      | Four opinionated statements (built around your business, design meets function, digital-first thinking, one creative partner)                                                                       |
| 5   | `FeaturedWork`    | Large case-study cards with generated art and result chips                                                                                                                                          |
| 6   | `AboutTeaser`     | “We're building what comes next.” plus Technology / Design / Strategy pillars                                                                                                                       |
| 7   | `ProcessSection`  | Six phases, each with a “You leave with” deliverable                                                                                                                                                |
| 8   | `PricingSection`  | Starter · Growth · Custom, add-on table, `Estimate your project`                                                                                                                                    |
| 9   | `Testimonials`    | Client quotes                                                                                                                                                                                       |
| 10  | `FaqAccordion`    | Seven real questions (timelines, cost, remote work, handover, hosting, maintenance)                                                                                                                 |
| 11  | `CTASection`      | “Let's build something.” with brief and WhatsApp routes                                                                                                                                             |

**Motion:** word-by-word headline rise, staggered card reveals, pointer-tracked spotlight on the hero
composition, marquee that pauses on hover. **Responsive:** single column below `sm`; the hero
composition collapses to full-width tiles.

### `/services`

`PageHero` → jump-to-division index → four `DivisionBlock`s (alternating sides) with deliverables →
engagement models → process → CTA. Each division is anchored (`#digital-solutions`) so footer links
deep-link straight into it.

### `/work`

`PageHero` → case-study count and sector legend → large project cards (the first spans both columns) → CTA.

### `/work/[slug]`

`PageHero` with breadcrumb → generated art banner → meta strip (category, sector, year, client) →
sticky overview with services and stack → the narrative **The Challenge → Our Approach → Design →
Development → Result** → result metrics → client quote → next case study → CTA.
Statically generated from `projects` via `generateStaticParams`.

### `/process`

`PageHero` → what we need from you / what you get from us → six-phase detail → how we charge for it
(engagement models) → two conversion routes → CTA.

### `/pricing`

`PageHero` → three bands (Growth highlighted) → add-on table → **instant estimate calculator**
(client preview, server-confirmed band) → honest pricing notes → starting points by division → FAQ → CTA.

### `/about`

`PageHero` → trust stats → Technology · Design · Strategy → four working principles → “Built to grow
beyond a studio” (division structure) → two conversion routes → CTA.

### `/contact`

`PageHero` → **four-step project brief** with a live summary card → what happens next (01–04) →
direct lines (email, phone, WhatsApp, studio, hours) → FAQ.

Brief steps: **1)** What do you need? (multi-select) **2)** Project details (name, email, phone,
business, description) **3)** Budget range **4)** Launch timing → submit **“Let's build something.”**
Success returns a reference number plus a WhatsApp fallback.

`/contact?tier=starter|growth|custom` (the deep link used by the pricing cards) pre-selects a
sensible starting set of services in step one. It is read on the client so `/contact` stays
statically prerendered.

### `not-found.tsx`

Friendly 404 with links back to every main route, marked `noindex`.

---

## 4. Content to replace before launch

- [ ] Replace the sample case studies in `work.ts` with real projects (keep the structure, drop any
      metric you cannot verify).
- [ ] Replace the placeholder testimonials in `social-proof.ts` with real client words.
- [ ] Confirm prices and timelines in `pricing.ts` and `services.ts`.
- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`.
- [ ] Add real social URLs; remove any channel the business does not use.
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the live domain.
- [ ] Add real photography to case studies (`next/image` in place of `ProjectArt` once available).

## 5. Roadmap (already-structured next steps)

1. **CMS** — replace `src/content/*` reads with Sanity/Payload queries; no component changes.
2. **Case-study media** — swap generated art for real screenshots or film.
3. **Calculator → brief handoff** — carry the estimator's line items into the brief (the pricing
   *tier* handoff via `/contact?tier=` is already implemented).
4. **WhatsApp commerce landing page** — a deeper offer page under Digital Solutions.
5. **Insights/notes section** — supports SEO clusters around “digital agency Kenya”.
6. **Client portal** — retainer dashboards built on the same stack.
7. **Lead storage upgrade** — swap `data/briefs` for a database or CRM; the API contract in
   `src/lib/brief-store.ts` is the only file that changes.
