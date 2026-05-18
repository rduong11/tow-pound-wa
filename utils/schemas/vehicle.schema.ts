import { z } from "zod";
import { vehicleSchema } from "./vehicleForm.schema";

export const statusSchema = z.enum([
  "pending",
  "in_progress",
  "ready",
  "picked_up",
]);

export const fullVehicleSchema = vehicleSchema.extend({
  status: statusSchema,
});

export type VehicleStatus = z.infer<typeof statusSchema>;
export type FullVehicleData = z.infer<typeof fullVehicleSchema>;
