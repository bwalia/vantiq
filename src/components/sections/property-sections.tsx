import { DrawBar, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import {
  Blade,
  LinkButton,
  MarkedHeading,
  Prose,
  Section,
  SectionLayout,
  Shell,
} from "@/components/primitives";
import { property, results } from "@/lib/content";

export function PropertyHero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Shell className="relative pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="reveal">
              <p className="eyebrow eyebrow-ruled">{property.eyebrow}</p>

              <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
                {property.headlineLead}{" "}
                <span className="display-accent">{property.headlineAccent}</span>,{" "}
                {property.headlineTail}
              </h1>

              <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted">
                {property.standfirst}
                <Blade className="h-2.5 w-3.5" />
                <span className="font-medium text-accent-text">{property.standfirstAccent}</span>
              </p>

              <p className="prose-body mt-8 max-w-[62ch] text-[1.05rem] md:text-[1.15rem]">
                {property.body}
              </p>

              <div className="mt-10">
                <LinkButton href="#results">See the results</LinkButton>
              </div>
            </div>
          </div>

          {/* Proof beside the claim, not buried at the foot of the page. */}
          <div className="reveal reveal-delayed lg:col-span-4 lg:col-start-9 lg:self-end">
            <hr aria-hidden="true" className="rule-double" />
            <p className="numeral mt-6 text-[clamp(3.5rem,8vw,5.5rem)] text-accent">
              {results.portfolioValue}
            </p>
            <p className="mt-5 max-w-[30ch] text-[0.975rem] leading-relaxed text-muted">
              The portfolio held by the leasing company whose campaign is published below.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export function PropertyAudiences() {
  return (
    <Section id="who" tinted aria-labelledby="who-heading">
      <SectionLayout
        index="01"
        title="Who we bring in"
        titleId="who-heading"
        kicker="The funnel is pointed, not broadcast."
      >
        <RevealGroup as="ul" className="border-t-2 border-accent-soft">
          {property.audiences.map((item, index) => (
            <RevealItem
              key={item.title}
              as="li"
              className="group relative grid gap-x-6 gap-y-2 border-b border-hairline py-7 transition-colors duration-300 hover:bg-surface-strong sm:grid-cols-[3.5rem_1fr] lg:grid-cols-[4.5rem_1fr] lg:py-8"
            >
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

export function PropertySteps() {
  return (
    <Section id="how" aria-labelledby="how-heading">
      <SectionLayout
        index="02"
        title="How the leads arrive"
        titleId="how-heading"
        kicker="Four stages, and you only see the last one."
      >
        <RevealGroup as="ol" className="flex flex-col border-t-2 border-accent-soft">
          {property.steps.map((step) => (
            <RevealItem
              key={step.number}
              as="li"
              className="grid items-baseline gap-x-8 gap-y-3 border-b border-hairline py-6 sm:grid-cols-[4rem_1fr] lg:py-7"
            >
              <span className="row-index">{step.number}</span>
              <p className="flex flex-wrap items-baseline gap-x-2.5 leading-relaxed">
                <span className="display-sm text-[1.15rem] lg:text-[1.3rem]">{step.title}</span>
                <span className="inline-flex items-baseline gap-x-2.5 text-[0.95rem] text-muted">
                  <Blade className="h-2 w-3 translate-y-[-0.15em]" />
                  {step.detail}
                </span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </SectionLayout>
    </Section>
  );
}

/**
 * The evidence.
 *
 * Shares lead and raw counts sit beside them, so the shape of the list is the
 * argument without the base ever floating free. Active ad days are given more
 * weight than the calendar window: the ads did not run every day, and the
 * honest denominator is the one the reader would otherwise assume wrongly.
 */
export function PropertyResults() {
  const typeMax = Math.max(...results.propertyType.rows.map((r) => r.count));
  const painMax = Math.max(...results.painPoints.rows.map((r) => r.count));

  return (
    <Section id="results" tinted aria-labelledby="results-heading">
      <Reveal>
        <p className="eyebrow eyebrow-ruled">Results</p>
        <h2
          id="results-heading"
          className="display mt-6 max-w-[24ch] text-[clamp(1.9rem,4vw,3.2rem)]"
        >
          Here is what we brought in for a property leasing company with a portfolio over{" "}
          <span className="display-accent">{results.portfolioValue}</span>
        </h2>
      </Reveal>

      <Reveal className="mt-12">
        <hr aria-hidden="true" className="rule-double" />
        <div className="flex items-start gap-7 pt-8">
          <p className="numeral text-[clamp(4rem,11vw,8rem)] text-accent">
            {results.headline.value}
          </p>
          <div className="pt-2">
            <h3 className="display-sm text-[1.4rem] md:text-[1.7rem]">{results.headline.label}</h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
              {results.headline.note}
            </p>
          </div>
        </div>
      </Reveal>

      {/*
       * The three numbers that frame the headline. Active days are the honest
       * denominator: the ads did not run every day, so a calendar window would
       * understate the rate. Quality sits beside the rate rather than in a
       * separate section, because volume on its own invites the wrong question.
       */}
      <RevealGroup className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {results.frame.map((item) => (
          <RevealItem key={item.label} className="border-t-2 border-accent-soft pt-5">
            <p className="numeral text-[clamp(2.2rem,4.5vw,3.2rem)]">{item.value}</p>
            <p className="eyebrow mt-3">{item.label}</p>
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted">{item.note}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Portfolio mix. */}
      <Reveal className="mt-16">
        <MarkedHeading as="h3">{results.portfolio.heading}</MarkedHeading>
        <p className="mt-3 text-sm text-muted">{results.portfolio.kicker}</p>

        <div className="mt-7 flex flex-col border-t-2 border-accent-soft">
          {results.portfolio.rows.map((row, index) => (
            <div
              key={row.label}
              className="grid items-center gap-x-8 gap-y-3 border-b border-hairline py-5 sm:grid-cols-[12rem_1fr_7rem]"
            >
              <span className="text-[0.975rem] font-medium">{row.label}</span>
              <DrawBar
                width={`${row.share}%`}
                delay={index * 0.07}
                thickness="h-2.5"
                className="hidden sm:block"
              />
              <span className="flex items-baseline gap-2.5 sm:justify-end">
                <span className="numeral text-[1.5rem]">{row.share}%</span>
                <span className="eyebrow eyebrow-muted">{row.count}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="card-warm mt-8 px-7 py-6">
          <p className="max-w-[70ch] text-[0.975rem] leading-relaxed">{results.portfolio.note}</p>
        </div>
      </Reveal>

      {/* Scale of the pipeline, derived rather than estimated. */}
      <Reveal className="mt-16">
        <div className="grid gap-y-8 border-t-2 border-accent-soft pt-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <h3 className="eyebrow">{results.pipeline.heading}</h3>
            <p className="numeral mt-5 text-[clamp(3.5rem,8vw,6rem)] text-accent">
              {results.pipeline.value}
            </p>
            <p className="display-sm mt-4 text-[1.15rem]">{results.pipeline.unit}</p>
          </div>
          <div className="lg:col-span-7 lg:self-end">
            <Prose className="max-w-[52ch] text-[0.975rem]">{results.pipeline.note}</Prose>
          </div>
        </div>
      </Reveal>

      {/* What they own, and where they came from. */}
      <Reveal className="mt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <MarkedHeading as="h3">{results.propertyType.heading}</MarkedHeading>
            <p className="mt-3 text-sm text-muted">{results.propertyType.kicker}</p>
            <div className="mt-6 flex flex-col border-t border-hairline">
              {results.propertyType.rows.map((row, index) => (
                <div
                  key={row.label}
                  className="grid items-center gap-x-6 gap-y-2 border-b border-hairline py-4 sm:grid-cols-[10rem_1fr_3rem]"
                >
                  <span className="text-[0.95rem]">{row.label}</span>
                  <DrawBar
                    width={`${Math.round((row.count / typeMax) * 100)}%`}
                    delay={index * 0.06}
                    thickness="h-2"
                    className="hidden sm:block"
                  />
                  <span className="numeral text-[1.3rem] sm:text-right">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <MarkedHeading as="h3">{results.source_split.heading}</MarkedHeading>
            <dl className="mt-6 grid grid-cols-2 gap-px">
              {results.source_split.platforms.map((platform) => (
                <div key={platform.name} className="border-t-2 border-accent-soft pr-6 pt-5">
                  <dt className="flex items-baseline gap-3">
                    <span className="numeral text-[clamp(2rem,4vw,2.8rem)]">{platform.count}</span>
                    <span className="eyebrow eyebrow-muted">{platform.share}</span>
                  </dt>
                  <dd className="eyebrow mt-3">{platform.name}</dd>
                </div>
              ))}
            </dl>
            <Prose className="mt-6 max-w-[44ch] text-[0.95rem]">{results.source_split.note}</Prose>
          </div>
        </div>
      </Reveal>

      {/* Pain points. */}
      <Reveal className="mt-16">
        <MarkedHeading as="h3">{results.painPoints.heading}</MarkedHeading>
        <p className="mt-3 text-sm text-muted">{results.painPoints.kicker}</p>
        <div className="mt-6 flex flex-col border-t-2 border-accent-soft">
          {results.painPoints.rows.map((row, index) => (
            <div
              key={row.label}
              className="grid items-center gap-x-8 gap-y-2 border-b border-hairline py-4 sm:grid-cols-[16rem_1fr_3rem]"
            >
              <span className="flex items-center gap-4 text-[0.975rem]">
                <Blade className="h-2.5 w-3.5" />
                {row.label}
              </span>
              <DrawBar
                width={`${Math.round((row.count / painMax) * 100)}%`}
                delay={index * 0.06}
                thickness="h-2"
                className="hidden sm:block"
              />
              <span className="numeral text-[1.3rem] sm:text-right">{row.count}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Provenance. */}
      <Reveal className="mt-14">
        <hr aria-hidden="true" className="rule-hairline" />
        <p className="mt-5 text-xs leading-relaxed text-muted">{results.source}</p>
      </Reveal>
    </Section>
  );
}
