"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes the library itself honour the OS setting: it
 * drops transform and layout animations and keeps only opacity.
 *
 * This is deliberately the single place reduced motion is handled. Branching on
 * useReducedMotion() to render a plain element instead of a motion element does
 * not work — the server renders the motion element's initial styles either way,
 * and swapping element types after hydration leaves opacity: 0 stuck on the
 * node, which hides the content from exactly the users the branch was meant to
 * help.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
