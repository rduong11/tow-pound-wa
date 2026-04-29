import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const otpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please enter a valid email address",
    }),
  token: z
    .string()
    .min(1, { message: "Code is required" })
    .length(6, { message: "Code must be 6 digits" })
    .regex(/^\d+$/, { message: "Code must contain numbers only" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
