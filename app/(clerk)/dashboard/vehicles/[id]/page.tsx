import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/shadcn/badge";
import { Card } from "@/components/ui/shadcn/card";
import VehicleInfoCard from "@/components/ui/dashboard/VehicleInfoCard";
import OwnerSubmissionCard from "@/components/ui/dashboard/OwnerSubmissionCard";
import { Button } from "@/components/ui/shadcn/button";
import { revalidatePath } from "next/cache";

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

  return { data };
}

// handle deny
// trigger dialog with an input field "comment"
// re-render the confirmation page to have this comment

// handle approve
async function handleApprove(vehicleId: string) {
  const supabase = await createClient();
  const { error: statusError } = await supabase
    .from("vehicles")
    .update({ status: "ready" })
    .eq("id", vehicleId);

  if (statusError) {
    console.log("Error updating vehicle status", statusError);
    return { error: statusError.message };
  }

  revalidatePath("/dashboard");
  // re-render the confirmation page to the payment page
  return { error: null };
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
          <Button variant="destructive">Deny</Button>
          <Badge>{vehicle.status}</Badge>
          <Button className="bg-green-600 hover:brightness-75 transition-all duration-200">
            Approve
          </Button>
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
