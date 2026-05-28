import { createClient } from "../supabase/server";

export async function fetchOwnerSubmissionById(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner_submissions")
    .select(
      "firstName, lastName, address, idPhotoFront, idPhotoBack, email, created_at, vehicle_id"
    )
    .eq("vehicle_id", vehicleId)
    .maybeSingle();

  if (error) {
    console.log("Error fetching owner submission", error);
    return { error: error.message };
  }

  return { data };
}
