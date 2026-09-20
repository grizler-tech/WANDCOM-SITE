'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { whatsappLink } from '@/content/site';
import { easeOutExpo } from '@/lib/motion';

/**
 * Floating WhatsApp button.
 *
 * Deliberately understated: it only appears after the visitor has scrolled past
 * the hero, stays a single accent pill, and expands its label on hover/focus.
 * The site remains the headquarters; WhatsApp is the fast lane.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.94 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-[var(--radius-pill)] border border-line bg-ink-card/95 py-2.5 pr-5 pl-2.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-accent/60"
          >
            <span className="relative grid size-9 place-items-center rounded-full bg-accent text-ink">
              <Icon name="message-circle" className="size-4" />
              <span className="absolute inset-0 animate-pulse-soft rounded-full ring-1 ring-accent/60" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium">Chat with Wandcom</span>
              <span className="text-[11px] text-fg-muted">Replies in minutes</span>
            </span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
