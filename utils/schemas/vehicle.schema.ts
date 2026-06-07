import { z } from "zod";
import { vehicleSchema } from "./vehicleForm.schema";

export const statusSchema = z.enum([
  "pending",
  "in_progress",
  "denied",
  "ready",
  "paid",
  "picked_up",
  "completed",
]);

export const fullVehicleSchema = vehicleSchema.extend({
  status: statusSchema,
});

export const statusLabels: Record<VehicleStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  denied: "Denied",
  ready: "Ready",
  paid: "Paid",
  picked_up: "Picked Up",
  completed: "Completed",
};

export const statusConfig: Record<
  VehicleStatus,
  { color: string; width: string }
> = {
  pending: { color: "bg-yellow-400", width: "w-1/6" },
  in_progress: { color: "bg-yellow-400", width: "w-2/6" },
  denied: { color: "bg-red-400", width: "w-1/6" },
  ready: { color: "bg-blue-400", width: "w-3/6" },
  paid: { color: "bg-green-400", width: "w-4/6" },
  picked_up: { color: "bg-teal-400", width: "w-5/6" },
  completed: { color: "bg-gray-400", width: "w-full" },
};

export type VehicleStatus = z.infer<typeof statusSchema>;
export type FullVehicleData = z.infer<typeof fullVehicleSchema>;
