import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/shadcn/badge";
import { Card } from "@/components/ui/shadcn/card";
import VehicleInfoCard from "@/components/ui/dashboard/VehicleInfoCard";
import OwnerSubmissionCard from "@/components/ui/dashboard/OwnerSubmissionCard";
import { Button } from "@/components/ui/shadcn/button";
import { statusLabels, VehicleStatus } from "@/utils/schemas/vehicle.schema";
import VehicleActionButtons from "@/components/ui/dashboard/VehicleActionButtons";

async function fetchVehicleById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plateNumber, make, model, color, status, year, location")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching vehicle", error);
    return { error: error.message };
  }

  return { data: data as typeof data & { status: VehicleStatus } };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchVehicleById(id);

  if (response?.error || !response.data) {
    return <p className="text-red-500">Vehicle not found.</p>;
  }

  const vehicle = response.data;

  return (
    <div className="p-6">
      <Card className="w-full">
        <div className="flex items-center justify-between pb-6 px-6 border-b">
          <Badge>
            {statusLabels[(vehicle.status ?? "pending") as VehicleStatus]}
          </Badge>
          <VehicleActionButtons vehicleId={id} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          <div className="p-12">
            <VehicleInfoCard
              plateNumber={vehicle.plateNumber}
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              color={vehicle.color}
              location={vehicle.location}
            />
          </div>
          <div className="p-12">
            <OwnerSubmissionCard vehicleId={id} />
          </div>
        </div>
      </Card>
    </div>
  );
}
