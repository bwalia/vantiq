import { LinkButton, Shell } from "@/components/primitives";
import { hero } from "@/lib/content";

/**
 * The document opens with a cone radiating from a single point — reach from one
 * source. Redrawn in CSS at display scale so it anchors the right of the hero
 * without needing an image asset.
 */
function Beam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-[-30%] hidden items-center lg:flex 2xl:right-[-22%]"
    >
      <div className="relative h-[38rem] w-[52rem] xl:h-[46rem] xl:w-[62rem]">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            clipPath: "polygon(4% 50%, 100% 2%, 100% 98%)",
            background:
              "linear-gradient(100deg, var(--accent-soft) 0%, var(--accent-faint) 38%, transparent 88%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            clipPath: "polygon(4% 50%, 100% 24%, 100% 76%)",
            background:
              "linear-gradient(100deg, var(--accent) 0%, var(--accent-faint) 46%, transparent 90%)",
          }}
        />
        <div className="absolute left-[3%] top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Beam />

      <Shell className="relative pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="reveal">
              <p className="eyebrow">{hero.eyebrow}</p>

              <h1 className="mt-6 text-[clamp(2.6rem,7.2vw,6.5rem)] leading-[0.98] tracking-[-0.04em]">
                {hero.headlineLead} <span className="text-accent">{hero.headlineAccent}</span>
                <br />
                {hero.headlineTail}
              </h1>

              <p className="mt-7 text-base text-muted">
                {hero.standfirst} <span aria-hidden="true">—</span>{" "}
                <span className="font-medium text-accent-text">{hero.standfirstAccent}</span>
              </p>

              <p className="prose-body mt-8 max-w-[64ch] text-[1.05rem] md:text-[1.15rem]">
                {hero.body}
              </p>

              <div className="mt-10 flex flex-col gap-3 xs:flex-row">
                <LinkButton href="#enquiry">{hero.primaryCta}</LinkButton>
                <LinkButton href="#pricing" variant="ghost">
                  {hero.secondaryCta}
                </LinkButton>
              </div>

              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
                {hero.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted">
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
            </div>
          </div>

          {/* Proof rail — the pattern's "credibility before the ask" slot. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <div className="reveal reveal-delayed">
              <dl className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-1">
                {hero.facts.map((fact) => (
                  <div key={fact.label} className="bg-bg px-5 py-5 lg:px-6">
                    <dt className="eyebrow eyebrow-muted">{fact.label}</dt>
                    <dd>
                      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">
                        {fact.value}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{fact.note}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
