import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Blade, LinkButton, Section, Shell } from "@/components/primitives";
import { Founders } from "@/components/sections/founders";
import { StructuredData } from "@/components/structured-data";
import { TaglineReveal } from "@/components/tagline-reveal";
import { home } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — growth systems for care homes and property`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The two service pages, as the page's main act.
 *
 * The home page's job is to route, so the routes are the largest thing on it —
 * numbered panels rather than a card grid, which keeps them reading as a table
 * of contents instead of as a pricing table.
 */
function Routes() {
  return (
    <Section aria-labelledby="routes-heading">
      <h2 id="routes-heading" className="sr-only">
        What we do
      </h2>

      <RevealGroup className="border-t-2 border-accent-soft">
        {home.routes.map((route) => (
          <RevealItem key={route.href}>
            <Link
              href={route.href}
              className="group grid gap-x-10 gap-y-4 border-b border-hairline py-10 transition-colors duration-300 hover:bg-surface-strong lg:grid-cols-12 lg:py-14"
            >
              <span className="row-index lg:col-span-2">{route.index}</span>

              <div className="lg:col-span-6">
                <h3 className="display text-[clamp(1.9rem,4vw,3rem)]">{route.title}</h3>
                <p className="prose-body mt-4 max-w-[52ch] text-muted">{route.note}</p>
              </div>

              <div className="flex items-center lg:col-span-4 lg:justify-end">
                <span className="inline-flex items-center gap-3 text-sm font-medium text-accent-text">
                  {route.cta}
                  <Blade className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function Benefits() {
  return (
    <Section tinted aria-labelledby="benefits-heading">
      <Reveal>
        <p className="eyebrow eyebrow-ruled">Why it works</p>
        <h2 id="benefits-heading" className="display mt-6 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)]">
          What a system does that a burst of ads cannot
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-16">
        {home.benefits.map((benefit) => (
          <RevealItem key={benefit.title} className="border-t-2 border-accent-soft pt-6">
            <h3 className="display-sm text-[1.3rem] lg:text-[1.5rem]">{benefit.title}</h3>
            <p className="mt-3.5 max-w-[46ch] text-[0.975rem] leading-relaxed text-muted">
              {benefit.note}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />

      <section className="relative overflow-hidden">
        <Shell className="relative pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-8 xl:col-span-7">
              <div className="reveal">
                <p className="eyebrow eyebrow-ruled">{home.eyebrow}</p>

                <h1 className="display mt-6 text-[clamp(2.6rem,7vw,6rem)]">
                  {home.headlineLead}{" "}
                  <span className="display-accent">{home.headlineAccent}</span>{" "}
                  {home.headlineTail}
                </h1>

                <p className="prose-body mt-8 max-w-[54ch] text-[1.05rem] md:text-[1.15rem]">
                  {home.standfirst}
                </p>

                <p className="mt-6 max-w-[58ch] text-[0.975rem] leading-relaxed text-muted">
                  {home.body}
                </p>

                <div className="mt-10 flex flex-col gap-3 xs:flex-row">
                  <LinkButton href="/care-homes">{home.primaryCta}</LinkButton>
                  <LinkButton href="/property" variant="ghost">
                    {home.secondaryCta}
                  </LinkButton>
                </div>
              </div>
            </div>

            {/* One proof signal above the fold, linked to where it is evidenced. */}
            <div className="reveal reveal-delayed lg:col-span-4 lg:col-start-9 lg:self-end">
              <hr aria-hidden="true" className="rule-double" />
              <p className="numeral mt-6 text-[clamp(3.5rem,8vw,5rem)] text-accent">
                {home.proof.figure}
              </p>
              <p className="mt-5 max-w-[32ch] text-[0.975rem] leading-relaxed">
                {home.proof.text}
              </p>
              <Link
                href={home.proof.href}
                className="link-sweep mt-5 inline-flex items-center gap-3 text-sm font-medium text-accent-text"
              >
                {home.proof.cta}
                <Blade className="h-2.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Shell>
      </section>

      <Routes />

      <TaglineReveal text={home.tagline} />

      <Benefits />

      <Founders />

      <Section aria-labelledby="home-contact-heading">
        <Reveal>
          <hr aria-hidden="true" className="rule-double" />
          <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="home-contact-heading" className="display text-[clamp(1.9rem,3.6vw,2.9rem)]">
                Tell us which one you are, and we will tell you what we would run.
              </h2>
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
