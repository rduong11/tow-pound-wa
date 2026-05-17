"use server";

import { revalidatePath } from "next/cache";
import { VehicleFormData, vehicleSchema } from "../schemas/vehicleForm.schema";
import { createClient } from "../supabase/server";

export async function submitVehicleEntry(data: VehicleFormData) {
  const supabase = await createClient();
  const result = vehicleSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { plateNumber, make, model, color, year, location } = result.data;

  const { error } = await supabase
    .from("vehicles")
    .insert({ plateNumber, make, model, color, year, location });

  if (error) {
    console.log("Error adding vehicle", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { error: null };
}
