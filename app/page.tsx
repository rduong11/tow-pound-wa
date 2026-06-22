import CityHeader from "@/components/ui/landing/CityHeader";
import Footer from "@/components/ui/landing/Footer";
import Hero from "@/components/ui/landing/Hero";
import HowItWorks from "@/components/ui/landing/HowItWorks";
import ImportantNotice from "@/components/ui/landing/ImportantNotice";

export default function LandingPage() {
  return (
    <div>
      <CityHeader variant="full" />
      <Hero />
      <HowItWorks />
      <ImportantNotice />
      <Footer />
    </div>
  );
}
