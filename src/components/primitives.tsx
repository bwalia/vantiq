import Link from "next/link";
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
        "relative scroll-mt-24 py-20 md:py-24 lg:py-28 xl:py-32",
        tinted ? "bg-surface" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Tinted bands get the faint feint of ruled paper, masked to fade out
          before it reaches the body copy. */}
      {tinted ? (
        <div aria-hidden="true" className="paper-rules pointer-events-none absolute inset-0" />
      ) : null}
      <Shell className="relative">{children}</Shell>
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
            {/*
             * The section index, set as a chapter mark: the numeral with a
             * rule running off to the right. It is real text, not decoration,
             * so the numbering is available to a screen reader too.
             */}
            <p className="flex items-center gap-4">
              <span className="section-index">{index}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
            </p>
            <Heading
              id={titleId}
              className="display-sm mt-5 text-[1.75rem] md:text-[2.1rem] xl:text-[2.45rem]"
            >
              {title}
            </Heading>
            {kicker ? (
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">{kicker}</p>
            ) : null}
            <hr aria-hidden="true" className="rule-double mt-7 w-16" />
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

/**
 * A single blade from the logo mark — the tapered arrow the identity is built
 * from — reused as the page's marker: bullets, sub-head markers, and the
 * separator between a label and its detail.
 *
 * It replaces the em-dashes and plain rules those places used to carry. One
 * shape doing all three jobs is what makes it read as a device rather than as
 * punctuation, and it runs the wordmark's motif down to the smallest label.
 */
export function Blade({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 10"
      aria-hidden="true"
      className={["shrink-0 text-accent-soft", className ?? ""].filter(Boolean).join(" ")}
    >
      <path d="M0 0.9 L15 5 L0 9.1 L5.1 5 Z" fill="currentColor" />
    </svg>
  );
}

/** Heading marked with a blade, for headings outside the rail. */
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
      className={["display-sm flex items-baseline gap-3 text-xl md:text-2xl", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Blade className="size-3 translate-y-[-0.08em]" />
      <span>{children}</span>
    </Tag>
  );
}

export function RuleFade({ className }: { className?: string }) {
  return <hr className={["rule-fade", className ?? ""].filter(Boolean).join(" ")} />;
}

/**
 * List bullet. Was a short dash; now the blade, pointing at the item it
 * introduces.
 */
export function Dash() {
  return <Blade className="mt-[0.5em] size-2.5" />;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Buttons are set as tight rectangles rather than pills. Everything else on the
 * page is ruled and rectilinear; a pill would be the only soft shape on it, and
 * the warmth is meant to come from the type and the paper, not from a radius.
 */
export function LinkButton({ href, children, variant = "primary", className }: ButtonProps) {
  const base =
    "group inline-flex cursor-pointer items-center justify-center gap-3 rounded-[3px] px-7 py-3.5 text-sm font-medium tracking-[-0.005em] transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-ink text-bg shadow-soft hover:bg-accent-text hover:shadow-lift"
      : "border border-hairline text-ink hover:border-accent-soft hover:bg-accent-wash hover:text-accent-text";

  const classes = [base, styles, className ?? ""].filter(Boolean).join(" ");
  // In-app routes go through the router; hashes and mailto: stay plain anchors.
  const Tag = href.startsWith("/") ? Link : "a";

  return (
    <Tag href={href} className={classes}>
      {children}
      {variant === "primary" ? (
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
    </Tag>
  );
}
