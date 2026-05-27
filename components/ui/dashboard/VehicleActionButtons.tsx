"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/shadcn/dialog";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { approveVehicle, denyVehicle } from "@/utils/actions/vehicleActions";
import toast from "react-hot-toast";

type VehicleActionButtonsProps = {
  vehicleId: string;
};

export default function VehicleActionButtons({
  vehicleId,
}: VehicleActionButtonsProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    try {
      setLoading(true);
      const response = await approveVehicle(vehicleId);

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    try {
      setLoading(true);
      const response = await denyVehicle(vehicleId, comment);

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      setDenyOpen(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Dialog
        open={denyOpen}
        onOpenChange={(val) => {
          setDenyOpen(val);
          if (!val) setComment("");
        }}
      >
        <DialogTrigger asChild>
          <Button variant="destructive" disabled={loading}>
            Deny
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Deny Submission</DialogTitle>
            <DialogDescription>
              Enter a reason for denial. This will be visible to the car owner.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Label htmlFor="comment">Comment</Label>
            <Input
              id="comment"
              placeholder="Enter reason for denial..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeny}
              disabled={loading || !comment.trim()}
            >
              {loading ? "Denying..." : "Confirm Deny"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        className="bg-green-600 hover:brightness-75 transition-all duration-200"
        onClick={handleApprove}
        disabled={loading}
      >
        {loading ? "Approving..." : "Approve"}
      </Button>
    </div>
  );
}
