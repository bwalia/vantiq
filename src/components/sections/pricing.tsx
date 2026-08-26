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
          <h3 className="display max-w-[20ch] text-[clamp(1.9rem,3.6vw,3.1rem)]">
            {pricing.heading}
          </h3>
        </Reveal>

        {/*
         * The two figures are set as a printed price table, not as cards: a
         * heavy rule across the top, a hairline down the middle, nothing
         * boxing them in. £0 is the argument, so it is given roughly twice the
         * measure and twice the type size of the number beside it.
         */}
        <RevealGroup className="mt-14">
          <hr aria-hidden="true" className="rule-double" />
          <div className="grid md:grid-cols-5">
            <RevealItem className="flex flex-col justify-between border-b border-hairline py-9 md:col-span-3 md:min-h-[16rem] md:border-b-0 md:border-r md:pr-10 lg:min-h-[18rem]">
              <p className="eyebrow eyebrow-muted">{pricing.fee.label}</p>
              <p className="numeral mt-8 text-[clamp(4.5rem,11vw,9rem)] text-ink">
                {pricing.fee.value}
              </p>
              <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-muted">
                {pricing.fee.note}
              </p>
            </RevealItem>

            <RevealItem className="flex flex-col justify-between py-9 md:col-span-2 md:min-h-[16rem] md:pl-10 lg:min-h-[18rem]">
              <p className="eyebrow eyebrow-muted">{pricing.spend.label}</p>
              <p className="numeral mt-8 whitespace-nowrap text-[clamp(1.75rem,3vw,2.6rem)] text-accent">
                {pricing.spend.value}
              </p>
              <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-muted">
                {pricing.spend.note}
              </p>
            </RevealItem>
          </div>

          {/* The one line that removes the obvious objection, set apart on the
              accent border rather than buried in the note text above. */}
          <RevealItem className="card-warm mt-px px-7 py-6 lg:px-9 lg:py-7">
            <p className="max-w-[70ch] text-[0.975rem] leading-relaxed">{pricing.assurance}</p>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-16">
          <MarkedHeading>{pricing.rationale.heading}</MarkedHeading>
          <Prose className="mt-5">{pricing.rationale.body}</Prose>
        </Reveal>
      </SectionLayout>
    </Section>
  );
}
