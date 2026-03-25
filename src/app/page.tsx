import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import HowItWorks from "@/components/home/HowItWorks";
import Ingredients from "@/components/home/Ingredients";
import Testimonials from "@/components/home/Testimonials";
import StatsCounter from "@/components/home/StatsCounter";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <HowItWorks />
      <Ingredients />
      <StatsCounter />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
