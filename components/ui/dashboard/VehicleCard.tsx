import {
  VehicleStatus,
  statusLabels,
  statusConfig,
} from "@/utils/schemas/vehicle.schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";

type VehicleCardProps = {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  status: VehicleStatus;
  year: number;
};

export default function VehicleCard({
  id,
  plateNumber,
  make,
  model,
  color,
  status,
  year,
}: VehicleCardProps) {
  return (
    <Link href={`/dashboard/vehicles/${id}`}>
      <div>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>
              {plateNumber} - {statusLabels[status ?? "pending"]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {year} {color} {make} {model}
          </CardContent>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${statusConfig[status ?? "pending"].color} ${statusConfig[status ?? "pending"].width}`}
            />
          </div>
        </Card>
      </div>
    </Link>
  );
}
