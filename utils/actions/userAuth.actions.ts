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

  revalidatePath("/");
  // log in user
}

export async function verifyToken(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  const emailValidation = validateEmail(email);
  if (!emailValidation.success) {
    return { error: emailValidation.error };
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: email,
    token: token.trim(),
    type: "email",
  });

  if (error) {
    console.log("Error verifying OTP", error);
    return { error: error.message };
  }

  return { error: null, session };
}
