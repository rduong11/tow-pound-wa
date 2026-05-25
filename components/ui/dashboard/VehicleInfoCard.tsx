import { CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";

type VehicleInfoCardProps = {
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  color: string;
  location: string;
};

export default function VehicleInfoCard({
  plateNumber,
  make,
  model,
  year,
  color,
  location,
}: VehicleInfoCardProps) {
  return (
    <div>
      <CardHeader className="px-0 pt-0">
        <CardTitle>Vehicle Information</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="flex gap-8">
          <span className="text-muted-foreground">Plate Number</span>
          <span>{plateNumber}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Make</span>
          <span>{make}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Model</span>
          <span>{model}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Year</span>
          <span>{year}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Color</span>
          <span>{color}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Location</span>
          <span>{location}</span>
        </div>
      </CardContent>
    </div>
  );
}
