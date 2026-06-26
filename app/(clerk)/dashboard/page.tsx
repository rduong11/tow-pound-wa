import ButtonDialog from "@/components/ui/dashboard/ButtonDialog";
import DashboardHeader from "@/components/ui/dashboard/DashboardHeader";
import StatsBar from "@/components/ui/dashboard/StatsBar";
import VehicleList from "@/components/ui/dashboard/VehicleList";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen p-6">
      <DashboardHeader />
      <StatsBar />
      <VehicleList />
      <ButtonDialog />
    </div>
  );
}
