"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion primitives.
 *
 * These are the only client boundary the animation system needs — sections stay
 * Server Components and pass their server-rendered markup through as children.
 *
 * House rules, applied everywhere:
 *   - transform and opacity only, never width/height/top/left
 *   - enter 280–700ms, ease-out; motion carries meaning (content arriving)
 *   - reduced motion is handled once, by MotionConfig in <MotionProvider>, not
 *     by branching on the element type here
 *   - every animated element carries data-reveal, so the (scripting: none) rule
 *     and the <noscript> block can force the finished state
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Motion components are created once at module scope. Calling motion.create()
 * during render would produce a new component type on every pass and reset the
 * subtree's state.
 */
const MOTION_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  section: motion.section,
} as const;

type Tag = keyof typeof MOTION_TAGS;

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  as?: Tag;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
};

export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  className,
  as = "div",
  amount = 0.25,
}: RevealProps) {
  const MotionTag = MOTION_TAGS[as];

  const offset =
    from === "left" ? { x: -24 } : from === "right" ? { x: 24 } : from === "none" ? {} : { y: 22 };

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.62, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

/**
 * Staggered container. Each direct <RevealItem> child enters 55ms after the
 * previous one — slow enough to read as a sequence, fast enough that the last
 * item is not still waiting when the reader gets there.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  amount?: number;
}) {
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag data-reveal="" className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

/**
 * A bar that draws itself along the x-axis when scrolled into view.
 * Used for the funnel steps, where the shortening bar *is* the information —
 * so it animates via scaleX from a fixed origin rather than changing width.
 */
export function DrawBar({
  width,
  delay = 0,
  className,
  thickness = "h-0.75",
}: {
  width: string;
  delay?: number;
  className?: string;
  /** Track height. A hairline reads as a rule; a chart bar needs weight. */
  thickness?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={["relative block w-full bg-accent-faint", thickness, className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.span
        data-reveal=""
        className="absolute inset-y-0 left-0 block origin-left bg-accent-soft"
        style={{ width }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      />
    </span>
  );
}
