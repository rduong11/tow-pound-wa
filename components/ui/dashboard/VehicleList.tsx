import { createClient } from "@/utils/supabase/server";
import VehicleCard from "./VehicleCard";

async function fetchVehicles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plateNumber, make, model, color, status, year")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error fetching vehicles", error);
    return { error: error.message };
  }

  return { data };
}

export default async function VehicleList() {
  const response = await fetchVehicles();

  if (response?.error) {
    return <p className="text-red-500">Failed to load vehicles.</p>;
  }

  if (!response.data || response.data.length === 0) {
    return <p className="text-secondary">No vehicles on record.</p>;
  }

  return (
    <div>
      {response.data.map((vehicle) => (
        <VehicleCard 
          key={vehicle.id}
          id={vehicle.id}
          plateNumber={vehicle.plateNumber}
          make={vehicle.make}
          model={vehicle.model}
          color={vehicle.color}
          status={vehicle.status}
          year={vehicle.year}
        />
      ))}
    </div>
  );
}
