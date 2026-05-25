import { createClient } from "@/utils/supabase/server";
import { CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import Image from "next/image";

async function fetchOwnerSubmissionById(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner_submissions")
    .select(
      "firstName, lastName, address, idPhotoFront, idPhotoBack, email, created_at, vehicle_id",
    )
    .eq("vehicle_id", vehicleId)
    .maybeSingle();

  if (error) {
    console.log("Error fetching owner submission", error);
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
    return (
      <p className="text-muted-foreground">Owner has not completed form yet.</p>
    );
  }

  const ownerInfo = response.data;

  return (
    <div>
      <CardHeader className="px-0 pt-0">
        <CardTitle>Owner Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Submitted {new Date(ownerInfo.created_at).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="flex gap-8 pt-2">
          <span className="text-muted-foreground">First Name</span>
          <span>{ownerInfo.firstName}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Last Name</span>
          <span>{ownerInfo.lastName}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Email</span>
          <span>{ownerInfo.email}</span>
        </div>
        <Separator />
        <div className="flex gap-8">
          <span className="text-muted-foreground">Address</span>
          <span>{ownerInfo.address}</span>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground">Front ID Photo</span>
          <Image
            src={ownerInfo.idPhotoFront}
            alt="Front ID"
            width={500}
            height={300}
            className="w-full rounded-md"
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground">Back ID Photo</span>
          <Image
            src={ownerInfo.idPhotoBack}
            alt="Back ID"
            width={500}
            height={300}
            className="w-full rounded-md"
          />
        </div>
      </CardContent>
    </div>
  );
}
