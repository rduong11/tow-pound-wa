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

export default function OwnerSubmissionForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [idPhotoFront, setIdPhotoFront] = useState<string>("");
  const [idPhotoBack, setIdPhotoBack] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
              // validation
            }}
          />
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
              // validation
            }}
          />
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
              // validation
            }}
          />
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
      <Button>Submit</Button>
    </div>
  );
}
