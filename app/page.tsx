import CityHeader from "@/components/ui/landing/CityHeader";
import Hero from "@/components/ui/landing/Hero";
import HowItWorks from "@/components/ui/landing/HowItWorks";
import VehicleSearchInput from "@/components/ui/owner/VehicleSearchInput";

export default function LandingPage() {
  return (
    <div>
      <CityHeader variant="full" />
      <Hero />
      <HowItWorks />
    </div>
  );
}
