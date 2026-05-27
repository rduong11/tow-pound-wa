"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function denyVehicle(vehicleId: string, comment: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({ status: "denied", denialReason: comment })
    .eq("id", vehicleId);

  if (error) {
    console.log("Error denying vehicle", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/vehicles/${vehicleId}`);
  return { error: null };
}

export async function approveVehicle(vehicleId: string) {
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
  revalidatePath(`/dashboard/vehicles/${vehicleId}`);
  return { error: null };
}
