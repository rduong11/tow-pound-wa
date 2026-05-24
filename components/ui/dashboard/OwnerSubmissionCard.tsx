import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";

async function fetchOwnerSubmissionById(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner_submissions")
    .select(
      "firstName, lastName, address, idPhotoFront, idPhotoBack, email, created_at, vehicle_id"
    )
    .eq("vehicle_id", vehicleId)
    .maybeSingle();

  if (error) {
    console.log("Error fetching vehicles", error);
    return { error: error.message };
  }

  return { data };
}

export default async function OwnerSubmissionCard({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const response = await fetchOwnerSubmissionById(vehicleId);

  if (response?.error) {
    return <p className="text-red-500">Failed to load owner information.</p>;
  }

  if (!response.data) {
    return <p className="text-secondary">Owner has not completed form yet.</p>;
  }

  const ownerInfo = response.data;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Owner Information</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted-foreground">
            Submitted {new Date(ownerInfo?.created_at).toLocaleDateString()}
          </p>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Name</span>
              <span>{ownerInfo?.firstName}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Name</span>
              <span>{ownerInfo?.lastName}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{ownerInfo?.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span>{ownerInfo?.address}</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Front ID Photo</span>
              <img
                src={ownerInfo?.idPhotoFront}
                alt="Front ID"
                className="w-full rounded-md"
              />
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Back ID Photo</span>
              <img
                src={ownerInfo?.idPhotoBack}
                alt="Back ID"
                className="w-full rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
