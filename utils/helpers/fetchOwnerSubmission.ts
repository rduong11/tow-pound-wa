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
  proofPath: string | null,
) {
  const supabase = await createClient();

  const basePromises = [
    supabase.storage.from("tow-pound-ids").createSignedUrl(frontPath, 3600),
    supabase.storage.from("tow-pound-ids").createSignedUrl(backPath, 3600),
  ];

  const [frontResult, backResult] = await Promise.all(basePromises);

  let proofSignedUrl: string | null = null;

  if (proofPath) {
    const proofResult = await supabase.storage
      .from("proofOfOwnership")
      .createSignedUrl(proofPath, 3600);

    if (proofResult.error) {
      console.log("Error generating proof signed URL", proofResult.error);
    } else {
      proofSignedUrl = proofResult.data?.signedUrl ?? null;
    }
  }

  if (frontResult.error)
    console.log("Error generating front signed URL", frontResult.error);
  if (backResult.error)
    console.log("Error generating back signed URL", backResult.error);

  return {
    frontSignedUrl: frontResult.data?.signedUrl ?? null,
    backSignedUrl: backResult.data?.signedUrl ?? null,
    proofOfOwnershipUrl: proofSignedUrl,
  };
}
