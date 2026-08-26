/**
 * Site-wide configuration.
 *
 * Values marked TODO are real-world facts that must be supplied before launch.
 * They are deliberately left visible rather than filled with plausible
 * placeholders, so nothing invented can ship by accident. See README.md.
 */

/** "/vantiq" on a GitHub project page; empty on a custom domain or a server deploy. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Where the enquiry funnel posts.
 *
 * Unset → the built-in Route Handler, which only exists on a server deploy.
 * On GitHub Pages there is no server, so this must point at an external form
 * service (Formspree, Basin, Web3Forms — anything that accepts a JSON POST).
 * Set it to the single character "-" to disable posting entirely, which makes
 * the form fall back to opening a pre-filled email so no enquiry is lost.
 */
const configuredEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();

export const enquiryEndpoint =
  configuredEndpoint === "-"
    ? null
    : configuredEndpoint && configuredEndpoint.length > 0
      ? configuredEndpoint
      : `${basePath}/api/enquiries`;

export const site = {
  name: "Vantiq",
  /** Used in <title> templates and the JSON-LD organisation record. */
  legalName: "Vantiq",
  tagline: "Meta advertising for care homes — no agency fee",
  description:
    "A 30-day Meta advertising trial for UK care homes. We film your home, build and run the campaign, and send qualified enquiries straight to your team. Our fee is £0 — you pay only for the ads, direct to Meta.",
  /**
   * Canonical origin, used by canonical URLs, Open Graph, sitemap and robots.
   * NEXT_PUBLIC_SITE_URL overrides it in the deploy environment — `||` for the
   * same reason as the email below: an unset repository variable arrives as an
   * empty string, not as undefined.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.vantiqsocial.com",
  locale: "en_GB",

  contact: {
    /**
     * `||` rather than `??` on purpose: the Pages workflow always passes
     * NEXT_PUBLIC_CONTACT_EMAIL, so an unset repository variable arrives as an
     * empty string, which `??` would happily keep — silently publishing
     * `mailto:` with no recipient.
     */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@vantiqsocial.com",
    /** A number here adds a phone line to the footer. null hides it. */
    phone: null as string | null,
    /** A number here adds the registration line to the footer. null hides it. */
    companyNumber: null as string | null,
  },

  founders: [
    { name: "Kian Heneghan", role: "Co-founder" },
    { name: "Harman Walia", role: "Co-founder" },
  ],
} as const;

export const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "What it costs" },
  { href: "#included", label: "What's included" },
  { href: "#founders", label: "Who you'll work with" },
] as const;
