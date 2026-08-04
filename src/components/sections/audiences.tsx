import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section, SectionLayout } from "@/components/primitives";
import { audiences } from "@/lib/content";

export function Audiences() {
  return (
    <Section id="audiences" aria-labelledby="audiences-heading">
      <SectionLayout
        index={audiences.index}
        title={audiences.heading}
        titleId="audiences-heading"
        kicker={audiences.kicker}
      >
        <RevealGroup
          as="ul"
          className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2"
        >
          {audiences.items.map((item) => (
            <RevealItem
              key={item.title}
              as="li"
              className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-surface-strong lg:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent-soft transition-transform duration-300 group-hover:scale-y-100"
              />
              <h3 className="text-[1.1rem] font-medium leading-snug lg:text-[1.2rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">{item.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
