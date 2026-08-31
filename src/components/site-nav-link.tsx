"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A top-level navigation link that knows whether it is the current page.
 *
 * `usePathname` is the only reason this is a client component; the header and
 * footer around it stay server-rendered. The current page is marked with
 * aria-current as well as colour, so it is not signalled by colour alone.
 */
export function SiteNavLink({
  href,
  children,
  className,
  activeClassName = "text-accent-text",
  idleClassName = "text-muted hover:text-accent-text",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  idleClassName?: string;
}) {
  const pathname = usePathname() ?? "/";
  // "/" must match exactly; a section route also matches its own subpaths.
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[className ?? "", active ? activeClassName : idleClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
