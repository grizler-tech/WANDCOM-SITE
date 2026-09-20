import { Icon } from '@/components/ui/Icon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/content/social-proof';

/**
 * Client words. Kept short and specific — a quote that could belong to any
 * agency belongs on no website.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="deep">
      <Shell>
        <SectionHeading
          eyebrow="Client words"
          title="What it feels like on the other side."
          description="Placeholder quotes are flagged in the content layer — swap them for real client words before launch (see docs/blueprint.md)."
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.author}>
              <figure className="card flex h-full flex-col p-7 sm:p-8">
                <Icon name="quote" className="size-6 text-accent" />
                <blockquote className="mt-6 text-base leading-relaxed text-fg">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-line-soft pt-6 text-sm">
                  <span
                    className="grid size-9 place-items-center rounded-full border border-line font-mono text-[11px] tracking-wider text-accent"
                    aria-hidden
                  >
                    {testimonial.author
                      .split(' ')
                      .map((part) => part.charAt(0))
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium">{testimonial.author}</span>
                    <span className="text-fg-muted">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </Section>
  );
}
