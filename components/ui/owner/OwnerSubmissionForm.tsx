"use client";

import { useState } from "react";
import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "@/utils/schemas/ownerSubmissionForm.schema";
import { submitOwnerInfo, updateOwnerInfo } from "@/utils/actions/ownerForm";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import OwnerStatusResponse from "./OwnerStatusResponse";
import OwnerFormFields from "./OwnerFormField";
import z from "zod";
import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";

type FormErrors = Partial<Record<keyof OwnerSubmissionFormSchema, string>>;

type ExistingSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  idPhotoFront: string;
  idPhotoBack: string;
  proofOfOwnership: string | null;
} | null;

type OwnerSubmissionFormProps = {
  vehicleId: string;
  status: VehicleStatus;
  denialReason: string | null;
  existingSubmission: ExistingSubmission;
};

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_PROOF_TYPES = ["image/jpeg", "image/jpg", "application/pdf"];

const uploadPhoto = async (
  file: File,
  vehicleId: string,
  side: "front" | "back",
) => {
  const supabase = createClient();
  const fileName = `${vehicleId}/${side}-${Date.now()}`;

  const { data, error } = await supabase.storage
    .from("tow-pound-ids")
    .upload(fileName, file);

  if (error) {
    return null;
  }

  return data.path;
};

const uploadProof = async (file: File, vehicleId: string) => {
  const supabase = createClient();
  const extension = file.name.split(".").pop();
  const fileName = `${vehicleId}/-${Date.now()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("proofOfOwnership")
    .upload(fileName, file);

  if (error) {
    return null;
  }

  return data.path;
};

export default function OwnerSubmissionForm({
  vehicleId,
  status,
  denialReason,
  existingSubmission,
}: OwnerSubmissionFormProps) {
  const [firstName, setFirstName] = useState(
    existingSubmission?.firstName ?? "",
  );
  const [lastName, setLastName] = useState(existingSubmission?.lastName ?? "");
  const [email, setEmail] = useState(existingSubmission?.email ?? "");
  const [address, setAddress] = useState(existingSubmission?.address ?? "");
  const [idPhotoFront, setIdPhotoFront] = useState<File | null>(null);
  const [idPhotoBack, setIdPhotoBack] = useState<File | null>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const isResubmission = status === "denied" && existingSubmission !== null;

  const validateField = (
    field: keyof OwnerSubmissionFormSchema,
    value: string,
  ) => {
    const result = ownerSubmissionFormSchema.shape[field].safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateIdFile = (
    file: File,
    field: "idPhotoFront" | "idPhotoBack",
  ) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only JPG and JPEG files are accepted",
      }));
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size must be under 5MB",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const validateProof = (file: File, field: "proofOfOwnership") => {
    if (!ACCEPTED_PROOF_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only JPG, JPEG, and PDF files are accepted",
      }));
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size must be under 5MB",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const handleOwnerSubmission = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const allErrors: FormErrors = {};

      const textResult = ownerSubmissionFormSchema
        .omit({ idPhotoFront: true, idPhotoBack: true, proofOfOwnership: true })
        .safeParse({ firstName, lastName, email, address });

      if (!textResult.success) {
        const fieldErrors = z.treeifyError(textResult.error);
        allErrors.firstName = fieldErrors.properties?.firstName?.errors[0];
        allErrors.lastName = fieldErrors.properties?.lastName?.errors[0];
        allErrors.email = fieldErrors.properties?.email?.errors[0];
        allErrors.address = fieldErrors.properties?.address?.errors[0];
      }

      const frontUrl = idPhotoFront
        ? await uploadPhoto(idPhotoFront, vehicleId, "front")
        : (existingSubmission?.idPhotoFront ?? null);

      const backUrl = idPhotoBack
        ? await uploadPhoto(idPhotoBack, vehicleId, "back")
        : (existingSubmission?.idPhotoBack ?? null);

      const proofUrl = proof
        ? await uploadProof(proof, vehicleId)
        : (existingSubmission?.proofOfOwnership ?? null);

      if (!frontUrl) allErrors.idPhotoFront = "Front photo is required";
      if (!backUrl) allErrors.idPhotoBack = "Back photo is required";

      if (
        Object.keys(allErrors).some((key) => allErrors[key as keyof FormErrors])
      ) {
        setErrors((prev) => ({
          ...allErrors,
          idPhotoFront: allErrors.idPhotoFront ?? prev.idPhotoFront,
          idPhotoBack: allErrors.idPhotoBack ?? prev.idPhotoBack,
        }));
        return;
      }

      setErrors((prev) => ({
        idPhotoFront: prev.idPhotoFront,
        idPhotoBack: prev.idPhotoBack,
      }));

      const response = isResubmission
        ? await updateOwnerInfo({
            firstName,
            lastName,
            email,
            address,
            idPhotoFront: frontUrl!,
            idPhotoBack: backUrl!,
            proofOfOwnership: proofUrl ?? undefined,
            vehicleId,
          })
        : await submitOwnerInfo({
            firstName,
            lastName,
            email,
            address,
            idPhotoFront: frontUrl!,
            idPhotoBack: backUrl!,
            proofOfOwnership: proofUrl ?? undefined,
            vehicleId,
          });

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      setSubmitted(true);
      setEditOpen(false);
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const showStatusResponse =
    submitted ||
    status === "in_progress" ||
    status === "ready" ||
    status === "denied";

  return (
    <>
      {showStatusResponse ? (
        <OwnerStatusResponse
          status={submitted ? "in_progress" : status}
          denialReason={denialReason}
          onEdit={status === "denied" ? () => setEditOpen(true) : undefined}
        />
      ) : (
        <OwnerFormFields
          firstName={firstName}
          lastName={lastName}
          email={email}
          address={address}
          errors={errors}
          loading={loading}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onEmailChange={setEmail}
          onAddressChange={setAddress}
          onPhotoFrontChange={setIdPhotoFront}
          onPhotoBackChange={setIdPhotoBack}
          onProofChange={setProof}
          onValidateField={validateField}
          onValidateIdFile={validateIdFile}
          onValidateProof={validateProof}
          onSubmit={handleOwnerSubmission}
        />
      )}

      <Dialog
        open={editOpen}
        onOpenChange={(val) => {
          setEditOpen(val);
          if (!val) setErrors({});
          setFirstName(existingSubmission?.firstName ?? "");
          setLastName(existingSubmission?.lastName ?? "");
          setEmail(existingSubmission?.email ?? "");
          setAddress(existingSubmission?.address ?? "");
          setIdPhotoFront(null);
          setIdPhotoBack(null);
        }}
      >
        <DialogContent
          className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Review & Resubmit</DialogTitle>
          </DialogHeader>
          <OwnerFormFields
            firstName={firstName}
            lastName={lastName}
            email={email}
            address={address}
            errors={errors}
            loading={loading}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPhotoFrontChange={setIdPhotoFront}
            onPhotoBackChange={setIdPhotoBack}
            onProofChange={setProof}
            onValidateField={validateField}
            onValidateIdFile={validateIdFile}
            onValidateProof={validateProof}
            onSubmit={handleOwnerSubmission}
            existingPhotoFront={existingSubmission?.idPhotoFront}
            existingPhotoBack={existingSubmission?.idPhotoBack}
            proofOfOwnership={existingSubmission?.proofOfOwnership ?? undefined}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
