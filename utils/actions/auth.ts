"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import {
  loginSchema,
  otpSchema,
  LoginFormData,
  OTPFormData,
} from "@/utils/schemas/auth.schema";

export async function login(data: LoginFormData) {
  const supabase = await createClient();

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email } = result.data;

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    console.log("Error signing in", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
}

export async function verifyToken(data: OTPFormData) {
  const supabase = await createClient();

  const result = otpSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, token } = result.data;

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: token.trim(),
    type: "email",
  });

  if (error) {
    console.log("Error verifying OTP", error);
    return { error: error.message };
  }

  return { error: null, session };
}
