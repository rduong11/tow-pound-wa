"use server";

import { revalidatePath } from "next/cache";
import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "../schemas/ownerSubmissionForm.schema";
import { createClient } from "../supabase/server";

export async function submitOwnerInfo(
  data: OwnerSubmissionFormSchema & { vehicleId: string },
) {
  const supabase = await createClient();
  const result = ownerSubmissionFormSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { firstName, lastName, email, address, idPhotoFront, idPhotoBack } =
    result.data;

  const { error } = await supabase.from("owner_submissions").insert({
    firstName,
    lastName,
    email,
    address,
    idPhotoFront,
    idPhotoBack,
    vehicle_id: data.vehicleId,
  });

  if (error) {
    console.log("Error submitting form, please try again later.", error);
    return { error: error.message };
  }

  const { error: statusError } = await supabase
    .from("vehicles")
    .update({ status: "in_progress" })
    .eq("id", data.vehicleId);

  if (statusError) {
    console.log("Error updating vehicle status", statusError);
    return { error: statusError.message };
  }

  return { error: null };
}

export async function updateOwnerInfo(
  data: OwnerSubmissionFormSchema & { vehicleId: string },
) {
  const supabase = await createClient();
  const result = ownerSubmissionFormSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { firstName, lastName, email, address, idPhotoFront, idPhotoBack } =
    result.data;

  const { error } = await supabase
    .from("owner_submissions")
    .update({
      firstName,
      lastName,
      email,
      address,
      idPhotoFront,
      idPhotoBack,
    })
    .eq("vehicle_id", data.vehicleId);

  if (error) {
    console.log("Error updating owner submission", error);
    return { error: error.message };
  }

  const { error: statusError } = await supabase
    .from("vehicles")
    .update({ status: "in_progress" })
    .eq("id", data.vehicleId);

  if (statusError) {
    console.log("Error updating vehicle status", statusError);
    return { error: statusError.message };
  }

  revalidatePath("/dashboard");

  return { error: null };
}
