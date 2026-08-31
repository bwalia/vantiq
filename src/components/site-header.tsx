import Link from "next/link";
import { VantiqWordmark } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderShell, ScrollProgress } from "@/components/motion/header-motion";
import { SiteNavLink } from "@/components/site-nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { bookHref, nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 w-full max-w-[110rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-18 lg:px-12 xl:px-16 2xl:px-24">
        <Link href="/" className="rounded-sm" aria-label="Vantiq — home">
          <VantiqWordmark decorative />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <SiteNavLink
                  href={item.href}
                  className="relative py-2 text-[0.975rem] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent-soft after:transition-transform after:duration-300 hover:after:scale-x-100"
                  activeClassName="text-accent-text after:scale-x-100"
                  idleClassName="text-muted hover:text-accent-text after:scale-x-0"
                >
                  {item.label}
                </SiteNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href={bookHref}
            className="hidden cursor-pointer rounded-[3px] bg-ink px-5 py-2.5 text-[0.925rem] font-medium text-bg transition-[background-color,transform] duration-200 hover:bg-accent-text active:translate-y-px md:inline-flex"
          >
            Book a filming date
          </Link>
          <MobileNav />
        </div>
      </div>

      <ScrollProgress />
    </HeaderShell>
  );
}
