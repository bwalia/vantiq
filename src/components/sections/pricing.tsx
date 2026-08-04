import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { MarkedHeading, Prose, Section, SectionLayout } from "@/components/primitives";
import { pricing } from "@/lib/content";

export function Pricing() {
  return (
    <Section id="pricing" tinted aria-labelledby="pricing-heading">
      <SectionLayout
        index={pricing.index}
        title={pricing.title}
        titleId="pricing-heading"
        kicker={pricing.kicker}
      >
        <Reveal>
          <h3 className="max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
            {pricing.heading}
          </h3>
        </Reveal>

        {/* Asymmetric split: the £0 is the argument, so it takes the larger half. */}
        <RevealGroup className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-5">
          <RevealItem className="flex flex-col bg-bg p-8 md:col-span-3 md:min-h-[17rem] md:justify-between lg:min-h-[19rem] lg:p-10">
            <p className="eyebrow eyebrow-muted">{pricing.fee.label}</p>
            <p className="mt-6 text-[clamp(3.5rem,8vw,6.5rem)] md:mt-8 font-semibold leading-none tracking-[-0.05em]">
              {pricing.fee.value}
            </p>
            <p className="mt-4 max-w-[30ch] md:mt-6 text-sm leading-relaxed text-muted">
              {pricing.fee.note}
            </p>
          </RevealItem>

          <RevealItem className="flex flex-col bg-bg p-8 md:col-span-2 md:min-h-[17rem] md:justify-between lg:min-h-[19rem] lg:p-10">
            <p className="eyebrow eyebrow-muted">{pricing.spend.label}</p>
            <p className="mt-6 text-[clamp(2rem,3.4vw,3rem)] md:mt-8 font-semibold leading-none tracking-[-0.04em] text-accent">
              {pricing.spend.value}
            </p>
            <p className="mt-4 max-w-[32ch] md:mt-6 text-sm leading-relaxed text-muted">
              {pricing.spend.note}
            </p>
          </RevealItem>

          <RevealItem className="bg-bg p-8 md:col-span-5 lg:px-10">
            <p className="max-w-[76ch] text-[0.95rem] leading-relaxed">{pricing.assurance}</p>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-14">
          <MarkedHeading>{pricing.rationale.heading}</MarkedHeading>
          <Prose className="mt-5">{pricing.rationale.body}</Prose>
        </Reveal>
      </SectionLayout>
    </Section>
  );
}
