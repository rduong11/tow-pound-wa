"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { plateSchema } from "@/utils/schemas/vehicleForm.schema";
import { searchVehicle } from "@/utils/actions/vehicleSearch";
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
    <div className="w-full">
      <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
        <span className="pl-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <Input
          value={plateNumber}
          placeholder="Enter Illinois License Plate"
          className="h-14 text-lg px-4 border-none shadow-none focus-visible:ring-0 flex-1"
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            setPlateNumber(val);
          }}
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="h-10 px-6 text-base rounded-none rounded-r-lg bg-[#ED2127] hover:brightness-75 my-2 mr-2 rounded-l-lg"
        >
          {loading ? <Spinner /> : "Search"}
        </Button>
      </div>
      {error && (
        <p className="text-red-300 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
