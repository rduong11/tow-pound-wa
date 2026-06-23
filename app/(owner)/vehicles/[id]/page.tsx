import { createClient } from "@/utils/supabase/server";
import OwnerSubmissionForm from "@/components/ui/owner/OwnerSubmissionForm";
import ProgressBar from "@/components/ui/owner/ProgressBar";
import { statusMetaData, VehicleStatus } from "@/utils/schemas/vehicle.schema";
import { fetchOwnerSubmissionById } from "@/utils/helpers/fetchOwnerSubmission";
import { PoundLocation } from "@/utils/constants/poundLocations";

async function fetchVehicleDetails(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("status, denialReason, location")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching vehicle details", error);
    return { error: error.message };
  }

  return {
    data: data as typeof data & {
      status: VehicleStatus;
      location: PoundLocation;
    },
  };
}

export default async function OwnerVehicleFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [vehicleResponse, submissionResponse] = await Promise.all([
    fetchVehicleDetails(id),
    fetchOwnerSubmissionById(id),
  ]);

  if (vehicleResponse?.error || !vehicleResponse.data) {
    return <p className="text-red-500">Vehicle not found.</p>;
  }

  const { status, denialReason, location } = vehicleResponse.data;
  const existingSubmission = submissionResponse.data ?? null;
  const proofStatus = existingSubmission?.proofStatus ?? null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="border-b border-gray-100">
          <ProgressBar status={status} />
        </div>

        <div className="p-4">
          <OwnerSubmissionForm
            vehicleId={id}
            status={status}
            denialReason={denialReason}
            existingSubmission={existingSubmission}
            location={location}
            proofStatus={proofStatus}
          />
        </div>
      </div>
    </div>
  );
}
