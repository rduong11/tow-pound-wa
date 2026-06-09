import { createClient } from "@/utils/supabase/server";

async function fetchPickupCode(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("pickupCode, location, plateNumber")
    .eq("id", vehicleId)
    .single();

  if (error) {
    console.log("Error fetching pickup code", error);
    return { error: error.message };
  }

  return { data };
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchPickupCode(id);

  if (response?.error || !response.data) {
    return <p className="text-red-500">Something went wrong.</p>;
  }

  const { pickupCode, location, plateNumber } = response.data;

  return (
    <div className="max-w-md mx-auto text-center pt-10">
      <h2 className="text-xl font-semibold">Payment Successful!</h2>
      <p className="text-muted-foreground mt-2">
        Your vehicle is ready for pickup. Show this code to the clerk.
      </p>
      <div className="mt-6 p-6 rounded-lg border">
        <p className="text-sm text-muted-foreground">Pickup Code</p>
        <p className="text-4xl font-bold tracking-widest mt-2">{pickupCode}</p>
        <p className="text-sm text-muted-foreground mt-4">Plate Number</p>
        <p className="text-lg font-semibold mt-1">{plateNumber}</p>
        <p className="text-sm text-muted-foreground mt-4">Pickup Location</p>
        <p className="text-sm mt-1">{location}</p>
      </div>
    </div>
  );
}
