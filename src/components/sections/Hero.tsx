'use client';

import { motion } from 'motion/react';
import { useCallback, useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Shell } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';
import { easeOutExpo, headlineWord } from '@/lib/motion';

/** The headline is split so each word can rise into place independently. */
const headline: { text: string; accent?: boolean }[] = [
  { text: 'We' },
  { text: 'build' },
  { text: 'digital', accent: true },
  { text: 'experiences', accent: true },
  { text: 'that' },
  { text: 'move' },
  { text: 'businesses' },
  { text: 'forward.' },
];

/** The interactive composition on the right of the hero. */
const tiles = [
  { label: 'WEB', detail: 'Design & build' },
  { label: 'BRAND', detail: 'Identity systems' },
  { label: 'DESIGN', detail: 'UI / UX' },
  { label: 'DIGITAL', detail: 'Automation & apps' },
];

export function Hero() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  /**
   * Pointer-tracked spotlight: writes two CSS variables instead of re-rendering
   * React on every mouse move.
   */
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = surfaceRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(closest-side, rgba(200,255,77,0.45), rgba(200,255,77,0))',
        }}
        aria-hidden
      />

      <Shell className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-fg-muted"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {siteConfig.positioning} · {siteConfig.location}
            </motion.p>

            <h1 className="mt-7 text-[clamp(2.6rem,7vw,5.1rem)] font-semibold text-balance-tight">
              {headline.map((word, index) => (
                <motion.span
                  key={`${word.text}-${index}`}
                  variants={headlineWord}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.7, ease: easeOutExpo }}
                  className={`mr-[0.28em] inline-block ${word.accent ? 'text-accent' : ''}`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: easeOutExpo }}
              className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            >
              Websites, branding, digital experiences and creative solutions designed to help
              ambitious businesses look better, work smarter and grow online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7, ease: easeOutExpo }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/contact" size="lg" icon="arrow-right">
                Start a Project
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore Our Services
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-fg-muted"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="zap" className="size-4 text-accent" />
                Reply within one working day
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="users" className="size-4 text-accent" />
                Design + development in-house
              </span>
            </motion.div>
          </div>

          <motion.div
            ref={surfaceRef}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: easeOutExpo }}
            onPointerMove={onPointerMove}
            className="relative rounded-[1.75rem] border border-line bg-ink-card/70 p-3 backdrop-blur-sm"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 hover:opacity-100"
              style={{
                background:
                  'radial-gradient(320px circle at var(--px,50%) var(--py,50%), rgba(200,255,77,0.16), transparent 70%)',
              }}
              aria-hidden
            />
            <div className="grid grid-cols-6 gap-3">
              {tiles.map((tile, index) => (
                <motion.div
                  key={tile.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.09, duration: 0.6, ease: easeOutExpo }}
                  className="group relative col-span-6 overflow-hidden rounded-2xl border border-line-soft bg-ink p-5 sm:col-span-3"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-fg-muted">
                    0{index + 1}
                  </span>
                  <p className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                    {tile.label}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{tile.detail}</p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl border border-line-soft bg-ink px-5 py-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
                One partner · four divisions
              </span>
              <span className="animate-float text-accent" aria-hidden>
                <Icon name="sparkles" className="size-4" />
              </span>
            </div>
          </motion.div>
        </div>
      </Shell>
    </section>
  );
}
