"use server";

import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "../schemas/ownerSubmissionForm.schema";
import { createClient } from "../supabase/server";

export async function submitOwnerInfo(data: OwnerSubmissionFormSchema) {
  const supabase = await createClient();
  const result = ownerSubmissionFormSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { firstName, lastName, email, address, id_photo_front, id_photo_back } =
    result.data;

  const { error } = await supabase.from("owner_submissions").insert({
    firstName,
    lastName,
    email,
    address,
    id_photo_front,
    id_photo_back,
  });

  if (error) {
    console.log("Error submitting form, please try again later.", error);
    return { error: error.message };
  }

  return { error: null };
}
