"use server";
import { createClient } from "../supabase/server";

export async function searchVehicle(plateNumber: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plateNumber")
    .eq("plateNumber", plateNumber)
    .single();

  if (error) {
    console.log("Error fetching vehicles", error);
    return { error: error.message };
  }

  return { data };
}
