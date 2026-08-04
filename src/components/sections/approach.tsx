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
        <Reveal>
          <p className="max-w-[52ch] text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.45] tracking-[-0.015em]">
            {whyMeta.body}
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-10 border-t border-hairline pt-12 md:grid-cols-2 md:gap-12 lg:gap-16">
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
