import z from "zod";

export const ownerSubmissionFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "At least one character is required" }),
  lastName: z
    .string()
    .min(1, { message: "At least one character is required" }),
  // address and photos needs to be a regex, will fix later
  address: z.string().min(1, { message: "At least one character is required" }),
  id_photo_front: z
    .string()
    .min(1, { message: "At least one character is required" }),
  id_photo_back: z
    .string()
    .min(1, { message: "At least one character is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please enter a valid email address",
    }),
});

export type OwnerSubmissionFormSchema = z.infer<
  typeof ownerSubmissionFormSchema
>;
