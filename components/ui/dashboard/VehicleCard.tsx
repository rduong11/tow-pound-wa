"use client";

import { VehicleStatus, statusMetaData } from "@/utils/schemas/vehicle.schema";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../shadcn/card";
import ArchiveButtonDialog from "./ArchiveButtonDialog";

type VehicleCardProps = {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  status: VehicleStatus;
  year: number;
  pickupCode: string | null;
  created_at: string;
};

function getRelativeTime(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export default function VehicleCard({
  id,
  plateNumber,
  make,
  model,
  color,
  status,
  year,
  pickupCode,
  created_at,
}: VehicleCardProps) {
  const router = useRouter();
  const meta = statusMetaData[status ?? "pending"];
  const isPaid = status === "paid";

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-dialog-trigger]") ||
      target.closest('[role="dialog"]')
    ) {
      return;
    }
    router.push(`/dashboard/vehicles/${id}`);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer block">
      <Card
        className={`overflow-hidden flex flex-col gap-0 relative hover:shadow-md transition-shadow duration-200 ${
          isPaid ? "bg-green-50 border-green-200" : "bg-white"
        }`}
      >
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold tracking-widest text-gray-900 font-mono">
              {plateNumber}
            </h2>
            <span className="text-xs text-muted-foreground mt-1 shrink-0">
              {getRelativeTime(created_at)}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            {year} · {color} · {make} {model}
          </p>

          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {meta.label}
          </p>

          <div className="w-full bg-gray-100 h-1.5 rounded-full">
            <div
              className={`h-1.5 rounded-full ${meta.color} ${meta.width} transition-all duration-500`}
            />
          </div>

          {pickupCode && (
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="bg-gray-900 rounded-md px-3 py-1.5 flex-1">
                <p className="text-xs text-gray-400 mb-0.5">Pickup Code</p>
                <p className="font-mono font-bold tracking-widest text-white text-sm">
                  {pickupCode}
                </p>
              </div>
              <div data-dialog-trigger onClick={(e) => e.stopPropagation()}>
                <ArchiveButtonDialog vehicleId={id} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
