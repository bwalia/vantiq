import { DrawBar, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Prose, Section, SectionLayout } from "@/components/primitives";
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
              className="grid items-center gap-x-8 gap-y-4 border-t border-hairline py-7 last:border-b sm:grid-cols-[3rem_minmax(7rem,16rem)_1fr] lg:py-8"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-accent-text">
                {step.number}
              </span>

              <DrawBar
                width={BAR_WIDTHS[index]}
                delay={index * 0.07}
                className="hidden sm:block"
              />

              <p className="text-[0.975rem] leading-relaxed lg:text-base">
                <span className="font-medium">{step.title}</span>
                <span className="text-muted"> — {step.detail}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
