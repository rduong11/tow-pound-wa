import { createClient } from "@/utils/supabase/server";
import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
import VehicleListClient from "./VehicleListClient";
import EmptyState from "./EmptyState";

async function fetchVehicles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plateNumber, make, model, color, status, year, pickupCode")
    .is("archivedAt", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error fetching vehicles", error);
    return { error: error.message };
  }

  return { data };
}

export default async function VehicleListServer() {
  const response = await fetchVehicles();

  if (response?.error) {
    return <p className="text-red-500">Failed to load vehicles.</p>;
  }

  if (!response.data || response.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <VehicleListClient
      vehicles={
        response.data as ((typeof response.data)[0] & {
          status: VehicleStatus;
        })[]
      }
    />
  );
}
