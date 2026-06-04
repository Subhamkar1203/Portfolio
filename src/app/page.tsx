import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Story = dynamic(() => import("@/components/Story"));
const SimiCafeFlagship = dynamic(() => import("@/components/SimiCafeFlagship"));
const FeaturedWork = dynamic(() => import("@/components/FeaturedWork"));
const TechnicalExpertise = dynamic(() => import("@/components/TechnicalExpertise"));
const Journey = dynamic(() => import("@/components/Journey"));
const Vision = dynamic(() => import("@/components/Vision"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Story />
      <SimiCafeFlagship />
      <FeaturedWork />
      <TechnicalExpertise />
      <Journey />
      <Vision />
      <Contact />
    </main>
  );
}
