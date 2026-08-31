import type { Metadata } from "next";
import { StickyCta } from "@/components/motion/sticky-cta";
import { Approach } from "@/components/sections/approach";
import { Audiences } from "@/components/sections/audiences";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { Founders } from "@/components/sections/founders";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Qualification } from "@/components/sections/qualification";
import { Scope } from "@/components/sections/scope";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "30-Day Lead Generation Trial for Care Homes",
  description:
    "A 30-day Meta advertising trial for UK care homes. We film your home, build and run the campaign, and send qualified enquiries straight to your team. Our fee is £0.",
  alternates: { canonical: "/care-homes" },
};

export default function CareHomesPage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Audiences />
      <Pricing />
      <Approach />
      <Scope />
      <Qualification />
      <Founders />
      <EnquirySection />
      <StickyCta />
    </>
  );
}
