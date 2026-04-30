import { z } from "zod";
import { TOW_POUND_LOCATIONS } from "@/utils/constants/poundLocations";

export const plateSchema = z.object({
  plateNumber: z
    .string()
    .min(2, { message: "Plate number is too short" })
    .max(8, { message: "Plate number is too long" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Plate number must contain only letters and numbers",
    }),
});

export const vehicleSchema = z.object({
  plateNumber: plateSchema.shape.plateNumber,
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z
    .number()
    .min(1886, { message: "Year is not valid" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  color: z.string().optional(),
  location: z.enum(TOW_POUND_LOCATIONS, {
    message: "Please select a valid location",
  }),
});

export type PlateFormData = z.infer<typeof plateSchema>;
export type VehicleFormData = z.infer<typeof vehicleSchema>;
