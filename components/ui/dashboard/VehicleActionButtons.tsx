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
import { Badge } from "@/components/ui/shadcn/badge";
import { approveVehicle, denyVehicle } from "@/utils/actions/vehicleActions";
import { VehicleStatus, statusLabels } from "@/utils/schemas/vehicle.schema";
import toast from "react-hot-toast";
import { Textarea } from "../shadcn/textarea";
import { Spinner } from "../shadcn/spinner";

type VehicleActionButtonsProps = {
  vehicleId: string;
  status: VehicleStatus;
  hasSubmission: boolean;
};

export default function VehicleActionButtons({
  vehicleId,
  status,
  hasSubmission,
}: VehicleActionButtonsProps) {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [denyOpen, setDenyOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
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
    if (!comment.trim()) {
      setCommentError("Please enter a reason for denial.");
      return;
    }

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
          if (!val) {
            setComment("");
            setCommentError("");
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={!hasSubmission ? disableButton : loading}
          >
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
          <div className="py-2 flex flex-col gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Enter reason for denial..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (e.target.value.trim()) setCommentError("");
              }}
              rows={4}
            />
            {commentError && (
              <p className="text-xs text-red-500">{commentError}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeny}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Confirm Deny"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Badge>{statusLabels[status]}</Badge>

      <Button
        className="bg-green-600 hover:brightness-75 transition-all duration-200"
        onClick={handleApprove}
        disabled={!hasSubmission ? disableButton : loading}
      >
        {loading ? <Spinner /> : "Approve"}
      </Button>
    </div>
  );
}
