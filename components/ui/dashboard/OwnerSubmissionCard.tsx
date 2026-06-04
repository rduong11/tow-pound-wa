import { CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import Image from "next/image";
import {
  fetchOwnerSubmissionById,
  getSignedUrls,
} from "@/utils/helpers/fetchOwnerSubmission";
import ProofActionButtons from "./ProofActionButtons";
import Link from "next/link";

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

  const { frontSignedUrl, backSignedUrl, proofOfOwnershipUrl } =
    await getSignedUrls(
      ownerInfo.idPhotoFront,
      ownerInfo.idPhotoBack,
      ownerInfo.proofOfOwnership
    );

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
          {frontSignedUrl ? (
            <Image
              src={frontSignedUrl}
              alt="Front ID"
              width={500}
              height={300}
              className="w-full rounded-md"
            />
          ) : (
            <p className="text-xs text-red-500">Failed to load photo.</p>
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground">Back ID Photo</span>
          {backSignedUrl ? (
            <Image
              src={backSignedUrl}
              alt="Back ID"
              width={500}
              height={300}
              className="w-full rounded-md"
            />
          ) : (
            <p className="text-xs text-red-500">Failed to load photo.</p>
          )}
        </div>
        <Separator />
        <div className="rounded-lg border p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">
              Proof of Ownership
            </span>
            <ProofActionButtons
              vehicleId={vehicleId}
              proofStatus={ownerInfo.proofStatus}
            />
          </div>
          {ownerInfo.proofOfOwnership ? (
            proofOfOwnershipUrl ? (
              ownerInfo.proofOfOwnership.endsWith(".pdf") ? (
                <Link
                  href={proofOfOwnershipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View Proof of Ownership (PDF)
                </Link>
              ) : (
                <Image
                  src={proofOfOwnershipUrl}
                  alt="Proof of Ownership"
                  width={500}
                  height={300}
                  className="w-full rounded-md"
                />
              )
            ) : (
              <p className="text-xs text-red-500">Failed to load proof.</p>
            )
          ) : (
            <p className="text-xs text-muted-foreground">
              No proof of ownership submitted.
            </p>
          )}
        </div>
      </CardContent>
    </div>
  );
}
