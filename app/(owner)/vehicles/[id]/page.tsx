import { createClient } from "@/utils/supabase/server";
import OwnerSubmissionForm from "@/components/ui/owner/OwnerSubmissionForm";
import { VehicleStatus } from "@/utils/schemas/vehicle.schema";

async function fetchVehicleStatus(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("status, denialReason")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching vehicle status", error);
    return { error: error.message };
  }

  return { data: data as typeof data & { status: VehicleStatus } };
}

export default async function OwnerVehicleFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchVehicleStatus(id);

  if (response?.error || !response.data) {
    return <p className="text-red-500">Vehicle not found.</p>;
  }

  const { status, denialReason } = response.data;

  return (
    <div>
      <OwnerSubmissionForm
        vehicleId={id}
        status={status}
        denialReason={denialReason}
      />
    </div>
  );
}
