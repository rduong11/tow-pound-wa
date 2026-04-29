"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import validateEmail from "../validations/validateEmail";
import { LoginFormData, OTPFormData } from "@/app/(clerk)/login/schema";

export async function login(data: LoginFormData) {
  const supabase = await createClient();

  // check email
  const { email } = data;

  const emailValidation = validateEmail(email);
  if (!emailValidation.success) {
    return { error: emailValidation.error };
  }

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    console.log("Error signing in", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  // log in user
}

export async function verifyToken(data: OTPFormData) {
  const supabase = await createClient();
  const { email, token } = data;

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
