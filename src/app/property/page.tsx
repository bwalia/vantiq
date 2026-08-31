import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LinkButton, Section } from "@/components/primitives";
import {
  PropertyAudiences,
  PropertyHero,
  PropertyResults,
  PropertySteps,
} from "@/components/sections/property-sections";
import { property } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property — landlord leads for letting and management businesses",
  description:
    "Paid social for letting and management businesses. We bring in landlords who already own property, sorted by portfolio size and area, and qualified before they reach your team.",
  alternates: { canonical: "/property" },
};

export default function PropertyPage() {
  return (
    <>
      <PropertyHero />
      <PropertyAudiences />
      <PropertySteps />
      <PropertyResults />

      <Section aria-labelledby="property-contact-heading">
        <Reveal>
          <hr aria-hidden="true" className="rule-double" />
          <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2
                id="property-contact-heading"
                className="display text-[clamp(1.9rem,3.6vw,2.9rem)]"
              >
                {property.primaryCta}
              </h2>
              <p className="prose-body mt-5 max-w-[52ch] text-muted">
                Tell us the boroughs you cover and the portfolio size you want, and we will say
                what we would run.
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <LinkButton href={`mailto:${site.contact.email}`}>
                Email {site.contact.email}
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
