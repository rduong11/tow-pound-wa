"use client";

import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../shadcn/field";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import {
  ownerSubmissionFormSchema,
  OwnerSubmissionFormSchema,
} from "@/utils/schemas/ownerSubmissionForm.schema";
import { submitOwnerInfo } from "@/utils/actions/ownerForm";
import toast from "react-hot-toast";

type FormErrors = Partial<Record<keyof OwnerSubmissionFormSchema, string>>;

export default function OwnerSubmissionForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [idPhotoFront, setIdPhotoFront] = useState<string>("");
  const [idPhotoBack, setIdPhotoBack] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (
    field: keyof OwnerSubmissionFormSchema,
    value: string,
  ) => {
    const result = ownerSubmissionFormSchema.shape[field].safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOwnerSubmission = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});

      const result = ownerSubmissionFormSchema.safeParse({
        firstName,
        lastName,
        email,
        address,
        idPhotoBack,
        idPhotoFront,
      });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          firstName: fieldErrors.firstName?.[0],
          lastName: fieldErrors.lastName?.[0],
          email: fieldErrors.email?.[0],
          address: fieldErrors.address?.[0],
          id_photo_front: fieldErrors.id_photo_front?.[0],
          id_photo_back: fieldErrors.id_photo_back?.[0],
        });
        return;
      }

      const response = await submitOwnerInfo(result.data);
      if (response?.error) {
        toast.error(response.error);
        return;
      }

      toast.success("Your form was submitted sucessfully");
      // what do we want to do upon successful submission ? might need to change in the submit owner info function too.
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md m-auto">
      <FieldGroup className="pt-2 pb-2">
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            id="first-name"
            name="first-name"
            placeholder="John"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateField("firstName", e.target.value);
            }}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateField("lastName", e.target.value);
            }}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            placeholder="JohnDoe@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input
            id="address"
            name="address"
            placeholder="67 W. Ohio St."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address}</p>
          )}
        </Field>

        {/* need to handle file change value and also validate */}
        <Field>
          <FieldLabel htmlFor="id-photo-front">
            Front of ID / Drivers license
          </FieldLabel>
          <Input id="picture" type="file" />
          <FieldDescription>Select a picture to upload.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="id-photo-back">
            Back of ID / Drivers license
          </FieldLabel>
          <Input id="picture" type="file" />
          <FieldDescription>Select a picture to upload.</FieldDescription>
        </Field>
      </FieldGroup>
      {/* need to implement handling submission and loading state */}
      <Button
        type="submit"
        disabled={loading}
        className="hover:brightness-75 transition-all duration-200"
        onClick={() => handleOwnerSubmission}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
