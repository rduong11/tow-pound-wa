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

export const statusMetaData: Record<
  VehicleStatus,
  { label: string; color: string; width: string; step: number }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-400",
    width: "w-1/6",
    step: 1,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-yellow-400",
    width: "w-1/3",
    step: 2,
  },
  denied: { label: "Denied", color: "bg-red-400", width: "w-1/2", step: 1 },
  ready: { label: "Ready", color: "bg-blue-400", width: "w-2/3", step: 3 },
  paid: { label: "Paid", color: "bg-green-400", width: "w-5/6", step: 4 },
  completed: {
    label: "Completed",
    color: "bg-gray-400",
    width: "w-full",
    step: 4,
  },
};

export type VehicleStatus = z.infer<typeof statusSchema>;
export type FullVehicleData = z.infer<typeof fullVehicleSchema>;
export type StatusMetaDataType = z.infer<typeof statusMetaData>;
