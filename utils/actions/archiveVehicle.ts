import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function archiveVehicle(vehicleId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({ status: "completed" }) // <- add archivedAt
    .eq("id", vehicleId);

  if (error) {
    console.log("Error archiving vehicle", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/vehicles/${vehicleId}`);
  return { error: null };
}
