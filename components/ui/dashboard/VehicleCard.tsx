"use client";

import {
  VehicleStatus,
  statusLabels,
  statusConfig,
} from "@/utils/schemas/vehicle.schema";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import ArchiveButtonDialog from "./ArchiveButtonDialog";

type VehicleCardProps = {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  status: VehicleStatus;
  year: number;
  pickupCode: string;
};

export default function VehicleCard({
  id,
  plateNumber,
  make,
  model,
  color,
  status,
  year,
  pickupCode,
}: VehicleCardProps) {
  const router = useRouter();

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
      <Card className="overflow-hidden p-6 flex flex-col gap-4 relative hover:shadow-md transition-shadow">
        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-bold">
              {plateNumber} - {statusLabels[status ?? "pending"]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 text-gray-600">
            {year} {color} {make} {model}
          </CardContent>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${statusConfig[status ?? "pending"].color} ${statusConfig[status ?? "pending"].width}`}
          />
        </div>

        {pickupCode && (
          <div className="w-full mt-2 min-h-10">
            <div className="flex justify-between items-end w-full">
              <div>
                <p className="text-sm text-gray-700">
                  Pick-up code is:{" "}
                  <span className="font-bold tracking-widest block text-base mt-1">
                    {pickupCode}
                  </span>
                </p>
              </div>

              <div data-dialog-trigger onClick={(e) => e.stopPropagation()}>
                <ArchiveButtonDialog vehicleId={id} />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
