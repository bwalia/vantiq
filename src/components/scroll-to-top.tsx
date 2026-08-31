"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Put every route change where it belongs: the top of the page, or the anchor
 * the link asked for.
 *
 * Two things needed fixing. The App Router does scroll to the top on
 * navigation, but `scroll-behavior: smooth` on <html> turns that into an
 * animation competing with the new page's layout settling, so it can finish
 * part way down. And a cross-route hash (/care-homes#enquiry followed from
 * another page) was not honoured at all: the page arrived at the top with the
 * form thousands of pixels below.
 *
 * The anchor is attempted synchronously first, because by the time an effect
 * runs the new route has usually committed and the target exists. Retries use
 * a timer rather than requestAnimationFrame: rAF is suspended entirely while a
 * tab is hidden, which would leave a background navigation stranded.
 *
 * Runs on pathname change only. Same-page anchors are left to the browser,
 * which handles them well and keeps the smooth easing.
 */

/** Returns true when the work is finished and no retry is needed. */
function scrollToHash(): boolean {
  const hash = window.location.hash;
  if (!hash) return false;

  let target: Element | null = null;
  try {
    target = document.querySelector(hash);
  } catch {
    // A hash that is not a valid selector is not ours to resolve.
    return true;
  }
  if (!target) return false;

  // scrollIntoView honours scroll-padding-top, so the sticky header does not
  // cover the heading it just landed on.
  target.scrollIntoView({ behavior: "instant", block: "start" });
  return true;
}

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (scrollToHash()) return;

    // No anchor resolved yet. Start at the top, which is right on its own for
    // a plain navigation and a harmless starting point if a hash arrives late.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    let attempts = 0;
    let timer = 0;

    const retry = () => {
      if (scrollToHash() || attempts++ >= 20) return;
      timer = window.setTimeout(retry, 50);
    };

    timer = window.setTimeout(retry, 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
