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
        {/*
         * Four targets, set as a ruled index rather than as cards. Each row
         * carries its own ordinal, so the list reads as an enumeration of
         * options — which is the point: one filming day, four places to aim it.
         */}
        <RevealGroup as="ul" className="border-t-2 border-accent-soft">
          {audiences.items.map((item, index) => (
            <RevealItem
              key={item.title}
              as="li"
              className="group relative grid gap-x-6 gap-y-2 border-b border-hairline py-7 transition-colors duration-300 hover:bg-surface-strong sm:grid-cols-[3.5rem_1fr] lg:grid-cols-[4.5rem_1fr] lg:py-8"
            >
              {/* Marker that draws down the left edge on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-4 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 lg:-left-6"
              />
              <span className="row-index pt-2">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display-sm text-[1.3rem] lg:text-[1.5rem]">{item.title}</h3>
                <p className="mt-2.5 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
                  {item.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
