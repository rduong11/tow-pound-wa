import { z } from "zod";
import { vehicleSchema } from "./vehicleForm.schema";

export const statusSchema = z.enum([
  "pending",
  "in_progress",
  "denied",
  "ready",
  "picked_up",
]);

export const fullVehicleSchema = vehicleSchema.extend({
  status: statusSchema,
});

export const statusLabels: Record<VehicleStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  denied: "Denied",
  ready: "Ready",
  picked_up: "Picked Up",
};

export const statusConfig: Record<
  VehicleStatus,
  { color: string; width: string }
> = {
  pending: { color: "bg-yellow-400", width: "w-1/4" },
  in_progress: { color: "bg-blue-400", width: "w-1/2" },
  denied: { color: "bg-red-400", width: "w-1/4" },
  ready: { color: "bg-green-400", width: "w-3/4" },
  picked_up: { color: "bg-gray-400", width: "w-full" },
};

export type VehicleStatus = z.infer<typeof statusSchema>;
export type FullVehicleData = z.infer<typeof fullVehicleSchema>;
