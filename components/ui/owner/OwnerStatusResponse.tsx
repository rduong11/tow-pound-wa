import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
import { Button } from "../shadcn/button";

type OwnerStatusResponseProps = {
  status: VehicleStatus;
  denialReason?: string | null;
  onEdit?: () => void;
};

export default function OwnerStatusResponse({
  status,
  denialReason,
  onEdit,
}: OwnerStatusResponseProps) {
  if (status === "denied") {
    return (
      <div className="max-w-md mx-auto text-center pt-10">
        <h2 className="text-xl font-semibold">Submission Denied</h2>
        <p className="text-muted-foreground mt-2">
          Unfortunately your submission was denied by the clerk.
        </p>
        {denialReason && (
          <div className="mt-4 p-4 rounded-lg border text-left">
            <p className="text-sm font-medium">Reason:</p>
            <p className="text-sm text-muted-foreground mt-1">{denialReason}</p>
          </div>
        )}
        {onEdit && (
          <Button className="mt-6" onClick={onEdit}>
            Review & Resubmit
          </Button>
        )}
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div className="max-w-md mx-auto text-center pt-10">
        <h2 className="text-xl font-semibold">Your vehicle is ready!</h2>
        <p className="text-muted-foreground mt-2">
          Your submission has been approved. Please proceed to payment.
        </p>
        {/* Payment component goes here */}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center pt-10">
      <h2 className="text-xl font-semibold">You&apos;re all set!</h2>
      <p className="text-muted-foreground mt-2">
        Your information has been submitted. The clerk will review your details
        shortly.
      </p>
    </div>
  );
}
