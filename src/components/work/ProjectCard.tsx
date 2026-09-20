import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import { ProjectArt } from '@/components/work/ProjectArt';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

/** First letters of a client name, used as the artwork monogram. */
function monogramOf(client: string): string {
  return client
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

interface ProjectCardProps {
  project: Project;
  index: number;
  /** `wide` spans both columns on the Work page. */
  size?: 'default' | 'wide';
}

/**
 * Large portfolio card. The whole card is one link — no nested interactive
 * elements — and the hover state moves the arrow, not the layout.
 */
export function ProjectCard({ project, index, size = 'default' }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn('card card-hover group flex flex-col p-4 sm:p-5', size === 'wide' && 'md:col-span-2')}
    >
      <ProjectArt
        palette={project.palette}
        label={project.category}
        monogram={monogramOf(project.client)}
        seed={index}
      />

      <div className="flex flex-1 flex-col px-2 pt-6 pb-2">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-line" aria-hidden />
          <span>{project.sector}</span>
          <span className="ml-auto">{project.year}</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-fg-muted">{project.client}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted">{project.summary}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line-soft pt-5 text-sm">
          <ul className="flex flex-wrap gap-2">
            {project.results.slice(0, 2).map((result) => (
              <li
                key={result.label}
                className="rounded-[var(--radius-pill)] border border-line-soft px-3 py-1 text-xs text-fg-muted"
              >
                {result.label}: <span className="text-fg">{result.value}</span>
              </li>
            ))}
          </ul>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-accent">
            Case study
            <Icon
              name="arrow-right"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
