"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../shadcn/button";
import { Field, FieldLabel } from "../shadcn/field";
import { Input } from "../shadcn/input";
import { plateSchema } from "@/utils/schemas/vehicleForm.schema";
import { searchVehicle } from "@/utils/actions/vehicleSearch";
import { ButtonGroup } from "../shadcn/button-group";
import { Spinner } from "../shadcn/spinner";

export default function VehicleSearchInput() {
  const [plateNumber, setPlateNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePlate = (value: string) => {
    const result = plateSchema.shape.plateNumber.safeParse(value);
    return result.success ? "" : result.error.issues[0].message;
  };

  async function handleSearch() {
    const validationError = validatePlate(plateNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await searchVehicle(plateNumber);

      if (response?.error || !response.data) {
        setError("No vehicle found with that plate number.");
        return;
      }

      router.push(`/vehicles/${response.data.id}`);
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Field>
        <FieldLabel
          htmlFor="vehicle-search-input"
          className="text-lg font-medium mb-2 block"
        >
          Enter your vehicle plate number
        </FieldLabel>
        <ButtonGroup>
          <Input
            value={plateNumber}
            placeholder="AB12345"
            className="h-12 text-lg px-4 placeholder:text-lg"
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setPlateNumber(val);
              setError(validatePlate(val));
            }}
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="h-12 px-8 text-lg"
          >
            {loading ? <Spinner /> : "Search"}
          </Button>
        </ButtonGroup>
      </Field>
      <p className="text-xs text-red-500 h-4 mt-1">{error}</p>
    </div>
  );
}
