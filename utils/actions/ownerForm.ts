"use server";

import { revalidatePath } from "next/cache";
import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "../schemas/ownerSubmissionForm.schema";
import { createClient } from "../supabase/server";

export async function submitOwnerInfo(
  data: OwnerSubmissionFormSchema & { vehicleId: string }
) {
  const supabase = await createClient();
  const result = ownerSubmissionFormSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const {
    firstName,
    lastName,
    email,
    address,
    idPhotoFront,
    proofOfOwnership,
    idPhotoBack,
  } = result.data;

  const { error } = await supabase.from("owner_submissions").insert({
    firstName,
    lastName,
    email,
    address,
    idPhotoFront,
    idPhotoBack,
    proofOfOwnership: proofOfOwnership ?? null,
    proofStatus: proofOfOwnership ? "pending" : null,
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
  data: OwnerSubmissionFormSchema & { vehicleId: string }
) {
  const supabase = await createClient();
  const result = ownerSubmissionFormSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const {
    firstName,
    lastName,
    email,
    address,
    idPhotoFront,
    idPhotoBack,
    proofOfOwnership,
  } = result.data;

  const { data: updatedRows, error } = await supabase
    .from("owner_submissions")
    .update({
      firstName,
      lastName,
      email,
      address,
      idPhotoFront,
      idPhotoBack,
      proofOfOwnership: proofOfOwnership ?? null,
      proofStatus: proofOfOwnership ? "pending" : null,
    })
    .eq("vehicle_id", data.vehicleId)
    .select();

  if (!error && (!updatedRows || updatedRows.length === 0)) {
    return { error: "Update failed. Please try again." };
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

export async function updateProofStatus(
  vehicleId: string,
  status: "approved" | "denied"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("owner_submissions")
    .update({ proofStatus: status })
    .eq("vehicle_id", vehicleId);

  if (error) {
    console.log("Error updating proof status", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/vehicles/${vehicleId}`);
  return { error: null };
}
