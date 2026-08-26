import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Dash, Section, SectionLayout } from "@/components/primitives";
import { founders, terms } from "@/lib/content";

export function Founders() {
  return (
    <Section id="founders" aria-labelledby="founders-heading">
      <SectionLayout
        index={founders.index}
        title={founders.heading}
        titleId="founders-heading"
        kicker={founders.kicker}
      >
        <RevealGroup className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
          {founders.people.map((person) => (
            <RevealItem key={person.name} className="border-t-2 border-accent-soft pt-7">
              <h3 className="display text-[clamp(1.9rem,3vw,2.6rem)]">{person.name}</h3>
              <p className="eyebrow mt-3">{person.role}</p>

              <ul className="mt-7 flex flex-col gap-4">
                {person.credentials.map((credential) => (
                  <li key={credential.text} className="flex items-start gap-3.5">
                    <Dash />
                    <div>
                      <p className="max-w-[46ch] text-[0.975rem] leading-relaxed">
                        {credential.text}
                      </p>
                      {"sub" in credential && credential.sub ? (
                        <p className="mt-2.5 max-w-[44ch] border-l border-hairline pl-4 text-sm leading-relaxed text-muted">
                          {credential.sub}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="text-sm text-muted">{terms}</p>
        </Reveal>
      </SectionLayout>
    </Section>
  );
}
