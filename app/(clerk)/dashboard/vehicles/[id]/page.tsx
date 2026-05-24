import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import { Badge } from "@/components/ui/shadcn/badge";
import OwnerSubmissionCard from "@/components/ui/dashboard/OwnerSubmissionCard";

async function fetchVehicleById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plateNumber, make, model, color, status, year, location")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching vehicle", error);
    return { error: error.message };
  }

  return { data };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchVehicleById(id);

  if (response?.error || !response.data) {
    return <p className="text-red-500">Vehicle not found.</p>;
  }

  const vehicle = response.data;

  return (
    <div className="p-6">
      <Card className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Vehicle Information</h1>
              <Badge>{vehicle.status}</Badge>
            </div>
            <CardContent className="px-0 space-y-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plate Number</span>
                <span>{vehicle.plateNumber}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Make</span>
                <span>{vehicle.make}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model</span>
                <span>{vehicle.model}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>{vehicle.year}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color</span>
                <span>{vehicle.color}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>{vehicle.location}</span>
              </div>
            </CardContent>
          </div>
          <div className="p-6">
            <OwnerSubmissionCard vehicleId={id} />
          </div>
        </div>
      </Card>
    </div>
  );
}
