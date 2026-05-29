import { VehicleStatus } from "@/utils/schemas/vehicle.schema";

type OwnerSubmissionConfirmationProps = {
  status: VehicleStatus;
  denialReason?: string | null;
};

export default function OwnerStatusResponse({
  status,
  denialReason,
}: OwnerSubmissionConfirmationProps) {
  console.log("status received:", status);
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

  if (status === "in_progress") {
    return (
      <div className="max-w-md mx-auto text-center pt-10">
        <h2 className="text-xl font-semibold">You&apos;re all set!</h2>
        <p className="text-muted-foreground mt-2">
          Your information has been submitted. The clerk will review your
          details shortly.
        </p>
      </div>
    );
  }
}
