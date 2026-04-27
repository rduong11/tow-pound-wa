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

export default function ButtonDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 text-lg px-6 py-6 shadow-lg hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200">
            <CirclePlus /> New Entry
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form>
            <DialogHeader>
              <DialogTitle>Vehicle Information</DialogTitle>
              <DialogDescription>
                Enter the vehicle's information below.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="vehicle-plate">Vehicle Plate Number</Label>
                <Input
                  id="plate-number"
                  name="plate-number"
                  placeholder="AB12345"
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-model">Vehicle Model</Label>
                <Input
                  id="vehicle-model-name"
                  name="vehicle-model-name"
                  placeholder="Honda"
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-make">Vehicle Make</Label>
                <Input
                  id="vehicle-make-name"
                  name="vehicle-make-name"
                  placeholder="Accord"
                />
              </Field>
              <Field>
                <Label htmlFor="vehicle-year">Vehicle Year</Label>
                <Input
                  id="vehicle-year-num"
                  name="vehicle-year-num"
                  placeholder="2008"
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
