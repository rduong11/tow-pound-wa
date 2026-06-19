import CityHeader from "@/components/ui/landing/CityHeader";
import VehicleSearchInput from "@/components/ui/owner/VehicleSearchInput";

export default function LandingPage() {
  return (
    <div>
      <CityHeader variant="full" />
      <div className="flex flex-col items-center pt-32 min-h-screen">
        <VehicleSearchInput />
      </div>
    </div>
  );
}
