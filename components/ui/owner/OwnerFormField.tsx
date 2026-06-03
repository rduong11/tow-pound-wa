import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../shadcn/field";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import { OwnerSubmissionFormSchema } from "@/utils/schemas/ownerSubmissionForm.schema";

type FormErrors = Partial<Record<keyof OwnerSubmissionFormSchema, string>>;

type OwnerFormFieldsProps = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  errors: FormErrors;
  loading: boolean;
  existingPhotoFront?: string;
  existingPhotoBack?: string;
  proofOfOwnership?: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPhotoFrontChange: (file: File) => void;
  onPhotoBackChange: (file: File) => void;
  onProofChange: (file: File) => void;
  onValidateField: (
    field: keyof OwnerSubmissionFormSchema,
    value: string,
  ) => void;
  onValidateIdFile: (
    file: File,
    field: "idPhotoFront" | "idPhotoBack",
  ) => boolean;
  onValidateProof: (file: File, field: "proofOfOwnership") => boolean;
  onSubmit: (e: React.SubmitEvent) => void;
};

export default function OwnerFormFields({
  firstName,
  lastName,
  email,
  address,
  errors,
  loading,
  existingPhotoFront,
  existingPhotoBack,
  proofOfOwnership,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onAddressChange,
  onPhotoFrontChange,
  onPhotoBackChange,
  onProofChange,
  onValidateField,
  onValidateIdFile,
  onValidateProof,
  onSubmit,
}: OwnerFormFieldsProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <FieldGroup className="w-full pt-2 pb-4 flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input
              id="first-name"
              name="first-name"
              placeholder="John"
              value={firstName}
              onChange={(e) => {
                onFirstNameChange(e.target.value);
                onValidateField("firstName", e.target.value);
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
                onLastNameChange(e.target.value);
                onValidateField("lastName", e.target.value);
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
                onEmailChange(e.target.value);
                onValidateField("email", e.target.value);
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
                onAddressChange(e.target.value);
                onValidateField("address", e.target.value);
              }}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="id-photo-front">
              Front of ID / Drivers license
            </FieldLabel>
            {existingPhotoFront && (
              <p className="text-xs text-muted-foreground mb-1">
                Previous photo on file. Upload a new one to replace it.
              </p>
            )}
            <Input
              id="id-photo-front"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onPhotoFrontChange(file);
                  onValidateIdFile(file, "idPhotoFront");
                }
              }}
            />
            {errors.idPhotoFront && (
              <p className="text-xs text-red-500">{errors.idPhotoFront}</p>
            )}
            <FieldDescription>JPG or JPEG only.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="id-photo-back">
              Back of ID / Drivers license
            </FieldLabel>
            {existingPhotoBack && (
              <p className="text-xs text-muted-foreground mb-1">
                Previous photo on file. Upload a new one to replace it.
              </p>
            )}
            <Input
              id="id-photo-back"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onPhotoBackChange(file);
                  onValidateIdFile(file, "idPhotoBack");
                }
              }}
            />
            {errors.idPhotoBack && (
              <p className="text-xs text-red-500">{errors.idPhotoBack}</p>
            )}
            <FieldDescription>JPG or JPEG only.</FieldDescription>
            <FieldLabel htmlFor="proof-of-ownership">
              Proof of Ownership (optional)
            </FieldLabel>
            {proofOfOwnership && (
              <p className="text-xs text-muted-foreground mb-1">
                Previous photo on file. Upload a new one to replace it.
              </p>
            )}
            <Input
              id="proof-of-ownership"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onProofChange(file);
                  onValidateProof(file, "proofOfOwnership");
                }
              }}
            />
            {errors.proofOfOwnership && (
              <p className="text-xs text-red-500">{errors.proofOfOwnership}</p>
            )}
            <FieldDescription>JPG, JPEG, or PDF only.</FieldDescription>
          </Field>
        </FieldGroup>
        <Button
          type="submit"
          disabled={loading}
          className="hover:brightness-75 transition-all duration-200"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
