import Image, { type StaticImageData } from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Dash, Section, SectionLayout } from "@/components/primitives";
import { founders, terms } from "@/lib/content";

import harmanPhoto from "./founders-harman.jpg";
import kianPhoto from "./founders-kian.jpg";

/**
 * Portraits are keyed off the name in content, so `content.ts` stays text-only.
 *
 * The files are pre-cropped to a head-and-shoulders square, so they need no
 * object-position nudging: the source frames are full-length and seated, and a
 * square crop of those would have framed the torso.
 */
const portraits: Record<string, StaticImageData> = {
  "Kian Heneghan": kianPhoto,
  "Harman Walia": harmanPhoto,
};

export function Founders({ tinted = false }: { tinted?: boolean } = {}) {
  return (
    <Section id="founders" tinted={tinted} aria-labelledby="founders-heading">
      <SectionLayout
        index={founders.index}
        title={founders.heading}
        titleId="founders-heading"
        kicker={founders.kicker}
      >
        <RevealGroup className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
          {founders.people.map((person) => {
            const portrait = portraits[person.name];

            return (
              <RevealItem key={person.name} className="border-t-2 border-accent-soft pt-7">
                <div className="flex items-center gap-5">
                  {portrait ? (
                    <Image
                      src={portrait}
                      alt=""
                      aria-hidden="true"
                      sizes="80px"
                      className="size-16 shrink-0 rounded-full object-cover ring-1 ring-hairline sm:size-20"
                    />
                  ) : null}
                  <div>
                    <h3 className="display text-[clamp(1.9rem,3vw,2.6rem)]">{person.name}</h3>
                    <p className="eyebrow mt-2">{person.role}</p>
                  </div>
                </div>

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
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="text-sm text-muted">{terms}</p>
        </Reveal>
      </SectionLayout>
    </Section>
  );
}
