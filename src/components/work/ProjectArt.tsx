import { cn } from '@/lib/utils';

interface ProjectArtProps {
  /** Two-colour art direction taken from the case study record. */
  palette: [string, string];
  label: string;
  /** Small monogram shown in the corner, e.g. "AC". */
  monogram: string;
  /** Deterministic index used to vary the composition between cards. */
  seed?: number;
  className?: string;
}

/**
 * Generative case-study artwork.
 *
 * Real client screenshots belong here eventually, but until then a generated
 * composition keeps the portfolio visually consistent, sharp on any display and
 * free of fake screenshots that would misrepresent the work.
 */
export function ProjectArt({ palette, label, monogram, seed = 0, className }: ProjectArtProps) {
  const [accent, base] = palette;
  const rotation = (seed % 4) * 45;

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card)] border border-line-soft',
        className,
      )}
      style={{ backgroundColor: base }}
      role="img"
      aria-label={`${label} — art direction preview`}
    >
      {/* Layered light */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(120% 90% at 15% 10%, ${accent}55 0%, transparent 55%),
                       radial-gradient(90% 70% at 85% 100%, ${accent}33 0%, transparent 60%)`,
        }}
        aria-hidden
      />
      {/* Hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden
      />
      {/* Rotated frame — gives each card a different geometry */}
      <div
        className="absolute -right-10 -bottom-16 size-[280px] rounded-[36%] border"
        style={{ borderColor: `${accent}66`, transform: `rotate(${rotation}deg)` }}
        aria-hidden
      />
      <div
        className="absolute right-10 bottom-8 size-24 rounded-full border"
        style={{ borderColor: `${accent}88` }}
        aria-hidden
      />
      {/* Monogram */}
      <span
        className="absolute top-5 left-5 font-mono text-xs tracking-[0.24em] uppercase"
        style={{ color: accent }}
      >
        {monogram}
      </span>
      <span className="absolute bottom-5 left-5 text-sm font-medium text-white/90">{label}</span>
    </div>
  );
}
