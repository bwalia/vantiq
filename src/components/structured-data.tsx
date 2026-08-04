import { site } from "@/lib/site";

/**
 * JSON-LD describing the organisation and the trial offer.
 * Claims here must stay in step with the copy — nothing extra is asserted.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.legalName,
        url: site.url,
        description: site.description,
        email: site.contact.email,
        founder: site.founders.map((founder) => ({
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
        })),
        areaServed: { "@type": "Country", name: "United Kingdom" },
      },
      {
        "@type": "Service",
        "@id": `${site.url}#service`,
        name: "30-Day Lead Generation Trial",
        serviceType: "Meta advertising and video content for care homes",
        provider: { "@id": `${site.url}#organization` },
        areaServed: { "@type": "Country", name: "United Kingdom" },
        audience: { "@type": "BusinessAudience", audienceType: "Care home operators" },
        offers: {
          "@type": "Offer",
          name: "30-day trial, no agency fee",
          price: 0,
          priceCurrency: "GBP",
          description:
            "Our fee is £0 for 30 days. Ad spend of £500 – £1,000 is recommended and paid by the client directly to Meta on their own card.",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}#organization` },
        inLanguage: "en-GB",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
