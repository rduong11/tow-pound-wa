"use client";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Field, FieldGroup } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { submitVehicleEntry } from "@/utils/actions/vehicleForm";
import { TOW_POUND_LOCATIONS } from "@/utils/constants/poundLocations";
import {
  VehicleFormData,
  vehicleSchema,
} from "@/utils/schemas/vehicleForm.schema";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Location = (typeof TOW_POUND_LOCATIONS)[number];

type ButtonDialogProps = Omit<VehicleFormData, "location"> & {
  onChange: (
    field: keyof Omit<VehicleFormData, "location">,
    value: string | number,
  ) => void;
};

export default function ButtonDialog({
  plateNumber,
  make,
  model,
  year,
  color,
  onChange,
}: ButtonDialogProps) {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location | "">("");

  const handleEntrySubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = vehicleSchema.safeParse({
        plateNumber,
        make,
        model,
        year,
        color,
        location,
      });
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      const response = await submitVehicleEntry(result.data);
      if (response?.error) {
        toast.error(response.error);
        return;
      }

      toast.success("Vehicle entry added successfully!");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 text-lg px-6 py-6 shadow-lg hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200">
            <CirclePlus /> New Entry
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleEntrySubmission}>
            <DialogHeader>
              <DialogTitle>Vehicle Information</DialogTitle>
              <DialogDescription>
                Enter the vehicle&apos;s information below.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="plate-number">Vehicle Plate Number</Label>
                <Input
                  id="plate-number"
                  name="plate-number"
                  placeholder="AB12345"
                  value={plateNumber}
                  onChange={(e) =>
                    onChange("plateNumber", e.target.value.toUpperCase())
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-make-name">Vehicle Make</Label>
                <Input
                  id="vehicle-make-name"
                  name="vehicle-make-name"
                  placeholder="Honda"
                  value={make}
                  onChange={(e) => onChange("make", e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-model-name">Vehicle Model</Label>
                <Input
                  id="vehicle-model-name"
                  name="vehicle-model-name"
                  placeholder="Accord"
                  value={model}
                  onChange={(e) => onChange("model", e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-year-num">Vehicle Year</Label>
                <Input
                  id="vehicle-year-num"
                  name="vehicle-year-num"
                  placeholder="2008"
                  value={year}
                  onChange={(e) => onChange("year", Number(e.target.value))}
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-color">Vehicle Color</Label>
                <Input
                  id="vehicle-color"
                  name="vehicle-color"
                  placeholder="Grey"
                  value={color ?? ""}
                  onChange={(e) => onChange("color", e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-location">Tow Pound Location</Label>
                <select
                  id="vehicle-location"
                  name="vehicle-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as Location)}
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {TOW_POUND_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
