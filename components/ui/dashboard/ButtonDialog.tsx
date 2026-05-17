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
import { VEHICLE_COLORS } from "@/utils/constants/vehicleColors";
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
type Color = (typeof VEHICLE_COLORS)[number];
type FormErrors = Partial<Record<keyof VehicleFormData, string>>;

const emptyForm = {
  plateNumber: "",
  make: "",
  model: "",
  year: "",
  color: "" as Color | "",
  location: "" as Location | "",
};

export default function ButtonDialog() {
  const [open, setOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState<Color | "">("");
  const [location, setLocation] = useState<Location | "">("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setPlateNumber(emptyForm.plateNumber);
    setMake(emptyForm.make);
    setModel(emptyForm.model);
    setYear(emptyForm.year);
    setColor(emptyForm.color);
    setLocation(emptyForm.location);
    setErrors({});
  };

  const validateField = (
    field: keyof VehicleFormData,
    value: string | number
  ) => {
    const result = vehicleSchema.shape[field].safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEntrySubmission = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});

      const result = vehicleSchema.safeParse({
        plateNumber,
        make,
        model,
        year: Number(year),
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
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) resetForm();
        }}
      >
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
            <div className="overflow-y-auto max-h-[60vh] pr-1">
              <FieldGroup className="pt-2 pb-2">
                <Field>
                  <Label htmlFor="plate-number">Vehicle Plate Number</Label>
                  <Input
                    id="plate-number"
                    name="plate-number"
                    placeholder="AB12345"
                    value={plateNumber}
                    onChange={(e) => {
                      setPlateNumber(e.target.value.toUpperCase());
                      validateField(
                        "plateNumber",
                        e.target.value.toUpperCase()
                      );
                    }}
                  />
                  {errors.plateNumber && (
                    <p className="text-xs text-red-500">{errors.plateNumber}</p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="vehicle-make-name">Vehicle Make</Label>
                  <Input
                    id="vehicle-make-name"
                    name="vehicle-make-name"
                    placeholder="Honda"
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                      validateField("make", e.target.value);
                    }}
                  />
                  {errors.make && (
                    <p className="text-xs text-red-500">{errors.make}</p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="vehicle-model-name">Vehicle Model</Label>
                  <Input
                    id="vehicle-model-name"
                    name="vehicle-model-name"
                    placeholder="Accord"
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      validateField("model", e.target.value);
                    }}
                  />
                  {errors.model && (
                    <p className="text-xs text-red-500">{errors.model}</p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="vehicle-year-num">Vehicle Year</Label>
                  <Input
                    id="vehicle-year-num"
                    name="vehicle-year-num"
                    placeholder="2008"
                    value={year}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setYear(val);
                      validateField("year", Number(val));
                    }}
                  />
                  {errors.year && (
                    <p className="text-xs text-red-500">{errors.year}</p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="vehicle-color">Vehicle Color</Label>
                  <Select
                    value={color}
                    onValueChange={(val) => {
                      setColor(val as Color);
                      validateField("color", val);
                    }}
                  >
                    <SelectTrigger id="vehicle-color" className="w-full">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Colors</SelectLabel>
                        {VEHICLE_COLORS.map((col) => (
                          <SelectItem key={col} value={col}>
                            {col}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.color && (
                    <p className="text-xs text-red-500">{errors.color}</p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="vehicle-location">Tow Pound Location</Label>
                  <Select
                    value={location}
                    onValueChange={(val) => {
                      setLocation(val as Location);
                      validateField("location", val);
                    }}
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
                    <p className="text-xs text-red-500">{errors.location}</p>
                  )}
                </Field>
              </FieldGroup>
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className="hover:brightness-75 transition-all duration-200"
              >
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
