import ButtonDialog from "@/components/ui/dashboard/ButtonDialog";
import LogoutButton from "@/components/ui/dashboard/LogoutButton";
import VehicleList from "@/components/ui/dashboard/VehicleList";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      Dashboard page
      <LogoutButton />
      <VehicleList />
      <ButtonDialog />
    </div>
  );
}
