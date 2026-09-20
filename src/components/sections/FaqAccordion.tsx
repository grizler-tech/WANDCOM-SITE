import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/content/social-proof';

/**
 * FAQ built on native `<details>`/`<summary>`.
 *
 * No JavaScript state, keyboard-accessible by default, and the answers remain
 * in the DOM for search engines (good for the "people also ask" snippets).
 */
export function FaqAccordion({ tone = 'paper' }: { tone?: 'paper' | 'dark' }) {
  return (
    <Section id="faq" tone={tone}>
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Questions"
            title="The things clients ask before signing."
            description="If your question is not here, ask it directly — you will get a real answer, not a brochure."
          />

          <Reveal delay={0.1}>
            <div className="divide-y divide-paper-line border-y border-paper-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium tracking-tight marker:hidden">
                    <span>{faq.question}</span>
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-paper-line transition-colors group-open:border-fg-invert group-open:bg-fg-invert group-open:text-paper">
                      <Icon
                        name="chevron-down"
                        className="size-3.5 transition-transform duration-300 group-open:rotate-180"
                      />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-invert-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
