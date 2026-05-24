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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{vehicle.plateNumber}</h1>
        <Badge>{vehicle.status}</Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
      </Card>
      <OwnerSubmissionCard vehicleId={id} />
    </div>
  );
}
