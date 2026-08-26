import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Dash, MarkedHeading, Section, SectionLayout } from "@/components/primitives";
import { reassurance, scope } from "@/lib/content";

type ScopeItem = { readonly text: string; readonly emphasis?: boolean };

function ScopeList({
  heading,
  items,
  headingId,
  tone,
}: {
  heading: string;
  items: readonly ScopeItem[];
  headingId: string;
  tone: "ours" | "yours";
}) {
  return (
    <div className={tone === "yours" ? "md:border-l md:border-hairline md:pl-10 lg:pl-14" : ""}>
      <MarkedHeading id={headingId}>{heading}</MarkedHeading>
      <ul className="mt-6 flex flex-col border-t-2 border-accent-soft">
        {items.map((item) => (
          <li
            key={item.text}
            className="flex items-start gap-3.5 border-b border-hairline py-4 last:border-b-0"
          >
            <Dash />
            <span
              className={[
                "max-w-[44ch] text-[0.975rem] leading-relaxed",
                item.emphasis ? "font-medium" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Scope() {
  return (
    <Section id="included" aria-labelledby="scope-heading">
      <SectionLayout
        index={scope.index}
        title={scope.title}
        titleId="scope-heading"
        kicker={scope.kicker}
      >
        <RevealGroup className="grid gap-12 md:grid-cols-2 md:gap-0">
          <RevealItem>
            <ScopeList
              headingId="included-heading"
              heading={scope.included.heading}
              items={scope.included.items}
              tone="ours"
            />
          </RevealItem>
          <RevealItem>
            <ScopeList
              headingId="required-heading"
              heading={scope.required.heading}
              items={scope.required.items}
              tone="yours"
            />
          </RevealItem>
        </RevealGroup>

        {/* The two standing objections, answered on the warm ground the source
            document reserves for its reassurance panels. */}
        <RevealGroup className="mt-16 grid gap-px bg-hairline md:grid-cols-2">
          {reassurance.map((card) => (
            <RevealItem key={card.heading} className="card-warm p-8 lg:p-10">
              <MarkedHeading as="h3" className="text-lg md:text-xl">
                {card.heading}
              </MarkedHeading>
              <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.75] text-muted">
                {card.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}
