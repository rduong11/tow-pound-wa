"use client";

import { useState } from "react";
import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "@/utils/schemas/ownerSubmissionForm.schema";
import { submitOwnerInfo } from "@/utils/actions/ownerForm";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import OwnerSubmissionConfirmation from "./OwnerSubmissionConfirmation";
import OwnerFormFields from "./OwnerFormField";
import z from "zod";

type FormErrors = Partial<Record<keyof OwnerSubmissionFormSchema, string>>;
type OwnerSubmissionFormProps = {
  vehicleId: string;
};

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "application/pdf"];

const uploadPhoto = async (
  file: File,
  vehicleId: string,
  side: "front" | "back"
) => {
  const supabase = createClient();
  const fileName = `${vehicleId}/${side}-${Date.now()}`;

  const { data, error } = await supabase.storage
    .from("tow-pound-ids")
    .upload(fileName, file);

  if (error) {
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("tow-pound-ids")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};

export default function OwnerSubmissionForm({
  vehicleId,
}: OwnerSubmissionFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [idPhotoFront, setIdPhotoFront] = useState<File | null>(null);
  const [idPhotoBack, setIdPhotoBack] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (
    field: keyof OwnerSubmissionFormSchema,
    value: string
  ) => {
    const result = ownerSubmissionFormSchema.shape[field].safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  //   NEED TO ADD VALIDATION CHECK FOR FILE SIZES TOO BIG
  const validateIdFile = (
    file: File,
    field: "idPhotoFront" | "idPhotoBack"
  ) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only JPG and PDF files are accepted",
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
        .omit({ idPhotoFront: true, idPhotoBack: true })
        .safeParse({ firstName, lastName, email, address });

      if (!textResult.success) {
        const fieldErrors = z.treeifyError(textResult.error);
        allErrors.firstName = fieldErrors.properties?.firstName?.errors[0];
        allErrors.lastName = fieldErrors.properties?.lastName?.errors[0];
        allErrors.email = fieldErrors.properties?.email?.errors[0];
        allErrors.address = fieldErrors.properties?.address?.errors[0];
      }

      if (!idPhotoFront) allErrors.idPhotoFront = "Front photo is required";
      if (!idPhotoBack) allErrors.idPhotoBack = "Back photo is required";

      if (
        Object.keys(allErrors).some((key) => allErrors[key as keyof FormErrors])
      ) {
        setErrors(allErrors);
        return;
      }
      setErrors({});

      const frontUrl = await uploadPhoto(idPhotoFront!, vehicleId, "front");
      const backUrl = await uploadPhoto(idPhotoBack!, vehicleId, "back");

      if (!frontUrl || !backUrl) {
        toast.error("Failed to upload photos. Please try again.");
        return;
      }

      const response = await submitOwnerInfo({
        firstName,
        lastName,
        email,
        address,
        idPhotoFront: frontUrl,
        idPhotoBack: backUrl,
        vehicleId,
      });

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return submitted ? (
    <OwnerSubmissionConfirmation />
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
      onValidateField={validateField}
      onValidateIdFile={validateIdFile}
      onSubmit={handleOwnerSubmission}
    />
  );
}
