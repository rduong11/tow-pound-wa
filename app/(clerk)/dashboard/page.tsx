import ButtonDialog from "@/components/ui/dashboard/ButtonDialog";
import ClerkVehicleSearch from "@/components/ui/dashboard/VehicleListServer";
import DashboardHeader from "@/components/ui/dashboard/DashboardHeader";
import StatsBar from "@/components/ui/dashboard/StatsBar";
import VehicleListServer from "@/components/ui/dashboard/VehicleListServer";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen p-6">
      <DashboardHeader />
      <StatsBar />
      <VehicleListServer />
      <ButtonDialog />
    </div>
  );
}
