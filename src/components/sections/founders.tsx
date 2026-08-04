import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Dash, Eyebrow, Section, SectionLayout } from "@/components/primitives";
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
        <RevealGroup className="grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-2">
          {founders.people.map((person) => (
            <RevealItem key={person.name} className="bg-bg p-8 lg:p-10">
              <h3 className="text-xl lg:text-2xl">{person.name}</h3>
              <p className="eyebrow mt-2.5">{person.role}</p>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-accent-soft" />

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

        <Reveal className="mt-10">
          <div className="card-warm flex flex-wrap items-baseline gap-x-4 gap-y-1.5 px-7 py-6">
            <Eyebrow className="shrink-0">{founders.together.label}</Eyebrow>
            <p className="text-[0.975rem]">
              <span className="font-medium text-accent-text">{founders.together.figure}</span>{" "}
              {founders.together.text}
            </p>
          </div>
          <p className="mt-8 text-sm text-muted">{terms}</p>
        </Reveal>
      </SectionLayout>
    </Section>
  );
}
