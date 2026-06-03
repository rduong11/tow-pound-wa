import { createClient } from "../supabase/server";

export async function fetchOwnerSubmissionById(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner_submissions")
    .select(
      "firstName, lastName, address, idPhotoFront, idPhotoBack, proofOfOwnership, email, created_at, vehicle_id",
    )
    .eq("vehicle_id", vehicleId)
    .maybeSingle();

  if (error) {
    console.log("Error fetching owner submission", error);
    return { error: error.message };
  }

  return { data };
}

export async function getSignedUrls(
  frontPath: string,
  backPath: string,
  proofPath: string,
) {
  const supabase = await createClient();

  const [frontResult, backResult, proofResult] = await Promise.all([
    supabase.storage.from("tow-pound-ids").createSignedUrl(frontPath, 3600),
    supabase.storage.from("tow-pound-ids").createSignedUrl(backPath, 3600),
    supabase.storage
      .from("proof-of-ownership")
      .createSignedUrl(proofPath, 3600),
  ]);

  if (frontResult.error)
    console.log("Error generating front signed URL", frontResult.error);
  if (backResult.error)
    console.log("Error generating back signed URL", backResult.error);
  if (proofResult.error)
    console.log("Error generating proof of ownership URL", proofResult.error);

  return {
    frontSignedUrl: frontResult.data?.signedUrl ?? null,
    backSignedUrl: backResult.data?.signedUrl ?? null,
    proofOfOwnershipUrl: proofResult.data?.signedUrl ?? null,
  };
}
