import { emailValidationSchema } from "../zodValidations/formValidation";

export type ValidationResult =
  | { success: true }
  | { success: false; error: string };

export default function validateEmail(email: string): ValidationResult {
  const emailValidation = emailValidationSchema.safeParse({ email });
  if (!emailValidation.success) {
    console.log("Invalid email address format (form)");
    return { success: false, error: "Invalid email address format" };
  }
  return { success: true };
}
