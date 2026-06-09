"use client";

import { useState } from "react";
import { Button } from "../shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";

export default function ArchiveButtonDialog() {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 text-lg px-6 py-6 shadow-lg hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200">
          Archive Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form>
          <DialogHeader>
            <DialogTitle>Archive Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive this vehicle? You will not see it
              again upon clicking confirm.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="hover:brightness-75 transition-all duration-200"
            >
              {loading ? "Archiving..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
