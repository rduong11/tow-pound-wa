import ProgressBar from "@/components/ui/owner/ProgressBar";
import { createClient } from "@/utils/supabase/server";
import { VehicleStatus } from "@/utils/schemas/vehicle.schema";

async function fetchPickupCodeAndStatus(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("pickupCode, location, plateNumber, status")
    .eq("id", vehicleId)
    .single();

  if (error) {
    console.log("Error fetching pickup code", error);
    return { error: error.message };
  }

  return { data: data as typeof data & { status: VehicleStatus } };
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchPickupCodeAndStatus(id);

  if (response?.error || !response.data) {
    return <p className="text-red-500">Something went wrong.</p>;
  }

  const { pickupCode, location, plateNumber, status } = response.data;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="border-b border-gray-100">
          <ProgressBar status={status} />
        </div>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-[#194A8D]">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground mt-2">
            Your vehicle is ready for pickup. Show this code to the clerk.
          </p>
          <div className="mt-6 p-6 rounded-xl border space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Pickup Code</p>
              <p className="text-4xl font-bold tracking-widest mt-1 font-mono">
                {pickupCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plate Number</p>
              <p className="text-lg font-semibold mt-1">{plateNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="text-sm mt-1">{location}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Please bring this code and a valid photo ID when picking up your
            vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}
