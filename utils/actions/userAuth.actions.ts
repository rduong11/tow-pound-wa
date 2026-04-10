"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { emailValidationSchema } from "../zodValidations/formValidation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // check email
  const email = formData.get("email") as string;

  // modularize this
  const emailValidation = emailValidationSchema.safeParse({ email: email });
  if (!emailValidation.success) {
    console.log("Invalid email address format (form)");
    return;
  }

  // into a function
  // so it can be used in login-form too

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    console.log("Error signing in", error);
    revalidatePath("/");
    return { error: error.message };
  }

  // log in user
}
