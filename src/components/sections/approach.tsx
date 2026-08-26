import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { MarkedHeading, Prose, Section, SectionLayout } from "@/components/primitives";
import { craft, whyMeta } from "@/lib/content";

export function Approach() {
  return (
    <Section id="how-it-works" aria-labelledby="why-meta-heading">
      <SectionLayout
        index={whyMeta.index}
        title={whyMeta.heading}
        titleId="why-meta-heading"
        kicker={whyMeta.kicker}
      >
        {/*
         * The standfirst: the argument of the section in one paragraph, set in
         * the display serif at reading size. Serif at 1.5rem with open leading
         * is a magazine standfirst; the same words in the body sans would read
         * as just another paragraph.
         */}
        <Reveal>
          <p className="display-sm max-w-[46ch] text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.44] text-ink">
            {whyMeta.body}
          </p>
        </Reveal>

        <hr aria-hidden="true" className="rule-double mt-16" />

        <RevealGroup className="grid gap-10 pt-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          {craft.map((block) => (
            <RevealItem key={block.heading}>
              <MarkedHeading>{block.heading}</MarkedHeading>
              <div className="mt-5 flex flex-col gap-4">
                {block.paragraphs.map((paragraph) => (
                  <Prose key={paragraph.slice(0, 32)} className="max-w-[46ch] text-[0.975rem]">
                    {paragraph}
                  </Prose>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
