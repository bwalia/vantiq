import Link from "next/link";
import { VantiqWordmark } from "@/components/logo";
import { RuleFade, Shell } from "@/components/primitives";
import { terms } from "@/lib/content";
import { bookHref, careHomeSections, nav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-surface pb-24 md:pb-0">
      <Shell className="py-16 lg:py-20">
        <RuleFade />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-5 xl:col-span-4">
            <VantiqWordmark />
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-muted">
              {site.tagline}.
            </p>
            <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-muted">{terms}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 xl:col-span-3 xl:col-start-6">
            <h2 className="eyebrow">Pages</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-8">On the care home page</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {careHomeSections.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={bookHref}
                  className="text-sm text-muted transition-colors hover:text-accent-text"
                >
                  Book a filming date
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4 xl:col-span-3 xl:col-start-10">
            <h2 className="eyebrow">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm wrap-break-word text-muted transition-colors hover:text-accent-text"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone ? (
                <li className="text-sm text-muted">{site.contact.phone}</li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          {site.contact.companyNumber ? <p>{site.contact.companyNumber}</p> : null}
        </div>
      </Shell>
    </footer>
  );
}
