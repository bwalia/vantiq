"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * The header sits flat against the hero at rest and lifts into a distinct layer
 * once the page has moved: a hairline appears and the backdrop turns
 * translucent. Colour and backdrop only — nothing here changes size, so the
 * header can never reflow the page beneath it.
 *
 * The scroll value is subscribed to directly and only flips component state
 * when it crosses the threshold, so this does not re-render per scroll frame.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [lifted, setLifted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setLifted(value > 8);
  });

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-colors duration-300",
        lifted ? "border-hairline bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg",
      ].join(" ")}
    >
      {children}
    </header>
  );
}

/**
 * Reading-progress hairline along the bottom edge of the header. Spring-damped
 * so it trails the scroll slightly instead of snapping frame to frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  // Hidden at rest, so the bar never reads as a stray mark at the top of the page.
  const opacity = useTransform(scrollYProgress, [0, 0.012], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, opacity }}
      className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent-soft"
    />
  );
}
