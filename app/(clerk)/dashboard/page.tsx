import ButtonDialog from "@/components/ui/dashboard/ButtonDialog";
import VehicleList from "@/components/ui/dashboard/VehicleList";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      Dashboard page
      <VehicleList />
      <ButtonDialog />
    </div>
  );
}
