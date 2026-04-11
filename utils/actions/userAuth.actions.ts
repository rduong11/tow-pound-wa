"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import validateEmail from "../validations/validateEmail";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // check email
  const email = formData.get("email") as string;

  const emailValidation = validateEmail(email);
  if (!emailValidation.success) {
    return { error: emailValidation.error };
  }

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    console.log("Error signing in", error);
    revalidatePath("/");
    return { error: error.message };
  }

  // log in user
}
