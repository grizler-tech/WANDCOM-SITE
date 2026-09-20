'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/**
 * Footer newsletter signup.
 *
 * Posts to `/api/newsletter`, which validates with the same Zod schema used on
 * the client. Errors are always shown inline — never a browser alert.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setState('error');
        setMessage(payload.error ?? 'That did not work. Please try again.');
        return;
      }

      setState('done');
      setMessage(payload.message ?? 'You are on the list. Thank you.');
      setEmail('');
    } catch {
      setState('error');
      setMessage('Network error — please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn('w-full max-w-md', className)} noValidate>
      <label htmlFor="newsletter-email" className="eyebrow mb-3 block">
        Signals, not spam — occasional notes
      </label>
      <div className="flex items-center gap-2">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          aria-invalid={state === 'error'}
          className="h-11 w-full rounded-full border border-line bg-white/[0.02] px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted/70 focus:border-accent/60"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-ink transition-colors hover:bg-accent-deep disabled:opacity-60"
          aria-label="Subscribe to the newsletter"
        >
          <Icon
            name={state === 'loading' ? 'loader' : 'send'}
            className={cn('size-4', state === 'loading' && 'animate-spin')}
          />
        </button>
      </div>
      {message ? (
        <p
          role="status"
          className={cn('mt-3 text-sm', state === 'error' ? 'text-red-400' : 'text-accent')}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
