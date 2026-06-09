import { z } from "zod";
import { vehicleSchema } from "./vehicleForm.schema";

export const statusSchema = z.enum([
  "pending",
  "in_progress",
  "denied",
  "ready",
  "paid",
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
  completed: "Completed",
};

export const statusConfig: Record<
  VehicleStatus,
  { color: string; width: string }
> = {
  pending: { color: "bg-yellow-400", width: "w-1/6" },
  in_progress: { color: "bg-yellow-400", width: "w-1/3" },
  denied: { color: "bg-red-400", width: "w-1/2" },
  ready: { color: "bg-blue-400", width: "w-2/3" },
  paid: { color: "bg-green-400", width: "w-5/6" },
  completed: { color: "bg-gray-400", width: "w-full" },
};

export type VehicleStatus = z.infer<typeof statusSchema>;
export type FullVehicleData = z.infer<typeof fullVehicleSchema>;
