import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Layout system.
 *
 * The page runs on a wide shell (max 110rem) with fluid gutters, so large
 * displays are used rather than left with dead margins. Readability is
 * protected inside that shell by the 12-column grid: prose blocks are capped at
 * 6–8 columns, which lands at a 65–75 character measure at every breakpoint.
 * Widening the shell and widening the paragraphs are different things.
 */

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[110rem] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed warm band. */
  tinted?: boolean;
  "aria-labelledby"?: string;
};

export function Section({ id, children, className, tinted = false, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      {...rest}
      className={[
        "scroll-mt-24 py-20 md:py-24 lg:py-28 xl:py-32",
        tinted ? "bg-surface" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Shell>{children}</Shell>
    </section>
  );
}

/**
 * The editorial two-track layout used by every content section: a narrow left
 * rail holding the section index and title, which stays put while the reader
 * moves through the wider right-hand track.
 */
export function SectionLayout({
  index,
  title,
  titleId,
  kicker,
  children,
  as = "h2",
}: {
  index: string;
  title: string;
  titleId?: string;
  kicker?: string;
  children: ReactNode;
  as?: "h2" | "h3";
}) {
  const Heading = as;

  return (
    <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <Reveal from="left">
            <p className="eyebrow font-mono">{index}</p>
            <Heading
              id={titleId}
              className="mt-4 text-2xl leading-[1.15] md:text-3xl xl:text-[2.1rem]"
            >
              {title}
            </Heading>
            {kicker ? (
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">{kicker}</p>
            ) : null}
            <span aria-hidden="true" className="mt-6 block h-0.5 w-12 bg-accent-soft" />
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 xl:col-start-4">{children}</div>
    </div>
  );
}

/** Body copy held to a readable measure regardless of how wide the shell gets. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={["prose-body max-w-[68ch]", className ?? ""].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}

export function Eyebrow({
  children,
  muted = false,
  className,
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <p
      className={["eyebrow", muted ? "eyebrow-muted" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

/** Heading with the filled accent square, for headings outside the rail. */
export function MarkedHeading({
  id,
  children,
  as: Tag = "h3",
  className,
}: {
  id?: string;
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={["flex items-baseline gap-3 text-lg md:text-xl", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className="inline-block size-2 shrink-0 translate-y-[-0.1em] bg-accent-soft"
      />
      <span>{children}</span>
    </Tag>
  );
}

export function RuleFade({ className }: { className?: string }) {
  return <hr className={["rule-fade", className ?? ""].filter(Boolean).join(" ")} />;
}

/** The short accent dash used as a list bullet throughout the document. */
export function Dash() {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.72em] inline-block h-px w-3 shrink-0 bg-accent-soft"
    />
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function LinkButton({ href, children, variant = "primary", className }: ButtonProps) {
  const base =
    "group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-ink text-bg hover:bg-accent-text"
      : "border border-hairline text-ink hover:border-accent-soft hover:text-accent-text";

  return (
    <a href={href} className={[base, styles, className ?? ""].filter(Boolean).join(" ")}>
      {children}
      {variant === "primary" ? (
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M2 8h11M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}
