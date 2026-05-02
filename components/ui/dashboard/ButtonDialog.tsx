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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

type Location = (typeof TOW_POUND_LOCATIONS)[number];

type ButtonDialogProps = Omit<VehicleFormData, "location"> & {
  onChange: (
    field: keyof Omit<VehicleFormData, "location">,
    value: string | number
  ) => void;
};

type FormErrors = Partial<Record<keyof VehicleFormData, string>>;

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
  const [errors, setErrors] = useState<FormErrors>({});

  const handleEntrySubmission = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});

      const result = vehicleSchema.safeParse({
        plateNumber,
        make,
        model,
        year,
        color,
        location,
      });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          plateNumber: fieldErrors.plateNumber?.[0],
          make: fieldErrors.make?.[0],
          model: fieldErrors.model?.[0],
          year: fieldErrors.year?.[0],
          color: fieldErrors.color?.[0],
          location: fieldErrors.location?.[0],
        });
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
            <FieldGroup className="pt-4 pb-4">
              <Field className="pt-2">
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
                {errors.plateNumber && (
                  <p className="text-sm text-red-500">{errors.plateNumber}</p>
                )}
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
                {errors.make && (
                  <p className="text-sm text-red-500">{errors.make}</p>
                )}
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
                {errors.model && (
                  <p className="text-sm text-red-500">{errors.model}</p>
                )}
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
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year}</p>
                )}
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
                {errors.color && (
                  <p className="text-sm text-red-500">{errors.color}</p>
                )}
              </Field>
              <Field className="pb-4">
                <Label htmlFor="vehicle-location">Tow Pound Location</Label>
                <Select
                  value={location}
                  onValueChange={(val) => setLocation(val as Location)}
                >
                  <SelectTrigger id="vehicle-location" className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Chicago Pound Locations</SelectLabel>
                      {TOW_POUND_LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
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
