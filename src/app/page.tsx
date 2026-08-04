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

export default function HomePage() {
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
