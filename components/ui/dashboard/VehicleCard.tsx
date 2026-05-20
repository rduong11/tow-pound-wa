import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";

type VehicleCardProps = {
  id: number;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  status: VehicleStatus;
  year: number;
};

export default function VehicleCard(vehicleData: VehicleCardProps) {
  return (
    <Link href={`[${vehicleData.id}]`}>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {vehicleData.plateNumber} - {vehicleData.status}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vehicleData.year} {vehicleData.color} {vehicleData.make}{" "}
            {vehicleData.model}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
