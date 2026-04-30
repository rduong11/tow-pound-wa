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
import { CirclePlus } from "lucide-react";

type VehicleFormData = {
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  location: string;
};

type ButtonDialogProps = VehicleFormData & {
  onChange: (field: keyof VehicleFormData, value: string | number) => void;
  onSubmit: (data: VehicleFormData) => void;
};

export default function ButtonDialog({
  plateNumber,
  make,
  model,
  year,
  color,
  location,
  onChange,
  onSubmit,
}: ButtonDialogProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 text-lg px-6 py-6 shadow-lg hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200">
            <CirclePlus /> New Entry
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ plateNumber, make, model, year, color, location });
            }}
          >
            <DialogHeader>
              <DialogTitle>Vehicle Information</DialogTitle>
              <DialogDescription>
                Enter the vehicle&aposs information below.
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
                  onChange={(e) => onChange("plateNumber", e.target.value)}
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
                <Label htmlFor="vehicle-location">Vehicle Location</Label>
                <Input
                  id="vehicle-Location"
                  name="vehicle-Location"
                  placeholder="500 E Wacker Dr."
                  value={location}
                  onChange={(e) => onChange("color", e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
