"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { updateProofStatus } from "@/utils/actions/ownerForm";
import { ProofStatus } from "@/utils/schemas/ownerSubmissionForm.schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ProofActionButtonsProps = {
  vehicleId: string;
  proofStatus: ProofStatus | null;
};

export default function ProofActionButtons({
  vehicleId,
  proofStatus,
}: ProofActionButtonsProps) {
  const [loadingStatus, setLoadingStatus] = useState<
    "approved" | "denied" | null
  >(null);
  const router = useRouter();

  if (!proofStatus) return null;

  const handleProofStatus = async (status: "approved" | "denied") => {
    try {
      setLoadingStatus(status);
      const response = await updateProofStatus(vehicleId, status);
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      setLoadingStatus(null);
      router.refresh();
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
      setLoadingStatus(null);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button
        variant="destructive"
        size="sm"
        disabled={loadingStatus !== null}
        onClick={() => handleProofStatus("denied")}
      >
        {loadingStatus === "denied" ? "Denying..." : "Deny Proof"}
      </Button>
      <Button
        size="sm"
        className="bg-green-600 hover:brightness-75 transition-all duration-200"
        disabled={loadingStatus !== null}
        onClick={() => handleProofStatus("approved")}
      >
        {loadingStatus === "approved" ? "Approving..." : "Approve Proof"}
      </Button>
    </div>
  );
}
