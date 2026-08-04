import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Section } from "@/components/primitives";
import { closing, hero } from "@/lib/content";
import { site } from "@/lib/site";

export function EnquirySection() {
  return (
    <Section id="enquiry" tinted aria-labelledby="enquiry-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal from="left">
              <Eyebrow>{closing.eyebrow}</Eyebrow>
              <h2
                id="enquiry-heading"
                className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.035em]"
              >
                {closing.heading}
              </h2>
              <p className="prose-body mt-6 max-w-[42ch]">{closing.body}</p>

              <ul className="mt-9 flex flex-col gap-2.5 border-t border-hairline pt-7">
                {hero.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 text-accent">
                      <path
                        d="M3 8.4l3.2 3.2L13 4.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm leading-relaxed text-muted">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-accent-text underline decoration-accent-faint underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8 xl:col-start-5">
          <Reveal amount={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
