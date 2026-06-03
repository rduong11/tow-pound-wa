import z from "zod";

export const ownerSubmissionFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .regex(/^[a-zA-Z\s\-']+$/, {
      message: "First name contains invalid characters",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[a-zA-Z\s\-']+$/, {
      message: "Last name contains invalid characters",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please enter a valid email address",
    }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .regex(/^[0-9]+\s[a-zA-Z0-9\s\.\,\#\-]+$/, {
      message: "Please enter a valid street address",
    }),
  idPhotoFront: z.string().min(1, { message: "Front photo is required" }),
  idPhotoBack: z.string().min(1, { message: "Back photo is required" }),
  proofOfOwnership: z.string().optional(),
});

export type OwnerSubmissionFormSchema = z.infer<
  typeof ownerSubmissionFormSchema
>;
