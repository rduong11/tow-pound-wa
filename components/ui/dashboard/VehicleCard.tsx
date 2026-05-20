import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
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
  const statusConfig: Record<VehicleStatus, { color: string; width: string }> =
    {
      pending: { color: "bg-yellow-400", width: "w-1/4" },
      in_progress: { color: "bg-blue-400", width: "w-1/2" },
      ready: { color: "bg-green-400", width: "w-3/4" },
      picked_up: { color: "bg-gray-400", width: "w-full" },
    };
  console.log(status);
  return (
    <Link href={`/dashboard/vehicles/${id}`}>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {plateNumber} - {status}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {year} {color} {make} {model}
          </CardContent>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${statusConfig[status].color} ${statusConfig[status].width}`}
            />
          </div>
        </Card>
      </div>
    </Link>
  );
}
