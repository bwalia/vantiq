import { DrawBar, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Blade, Prose, Section, SectionLayout } from "@/components/primitives";
import { qualification } from "@/lib/content";

/**
 * The funnel narrows at each stage, so the accent bar shortens with it — the
 * same device the source document uses beside 01–04. The bars draw themselves
 * on scroll, in sequence, so the narrowing reads as a movement rather than a
 * static chart.
 */
const BAR_WIDTHS = ["100%", "76%", "52%", "30%"];

export function Qualification() {
  return (
    <Section id="qualification" tinted aria-labelledby="qualification-heading">
      <SectionLayout
        index={qualification.index}
        title={qualification.heading}
        titleId="qualification-heading"
        kicker={qualification.kicker}
      >
        <Reveal>
          <Prose>{qualification.body}</Prose>
        </Reveal>

        <RevealGroup as="ol" className="mt-14 flex flex-col">
          {qualification.steps.map((step, index) => (
            <RevealItem
              key={step.number}
              as="li"
              className="group grid items-center gap-x-8 gap-y-4 border-t border-hairline py-7 first:border-t-2 first:border-t-accent-soft last:border-b sm:grid-cols-[3rem_minmax(7rem,16rem)_1fr] lg:py-8"
            >
              <span className="row-index">{step.number}</span>

              <DrawBar
                width={BAR_WIDTHS[index]}
                delay={index * 0.07}
                className="hidden sm:block"
              />

              {/* The blade travels with the detail rather than sitting between
                  the two spans: left on its own it strands at the end of a
                  wrapped line and reads as a stray mark. */}
              <p className="flex flex-wrap items-baseline gap-x-2.5 leading-relaxed">
                <span className="display-sm text-[1.15rem] lg:text-[1.3rem]">{step.title}</span>
                <span className="inline-flex items-baseline gap-x-2.5 text-[0.95rem] text-muted">
                  <Blade className="h-2 w-3 translate-y-[-0.15em]" />
                  {step.detail}
                </span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
