import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/work/ProjectCard';
import { featuredProjects } from '@/content/work';

/**
 * Selected work. Cards are intentionally large — the work is the argument.
 */
export function FeaturedWork() {
  return (
    <Section id="work" tone="deep">
      <Shell>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects with a before and an after."
          description="Every case study follows the same structure: the challenge, our approach, the design, the build and the measurable result."
          action={
            <Button href="/work" variant="secondary" icon="arrow-right">
              View all work
            </Button>
          }
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </Section>
  );
}
