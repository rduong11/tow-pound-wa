import { PoundLocation } from "@/utils/constants/poundLocations";
import CashPaymentPage from "./CashPaymentPage";
import StripePaymentPage from "./StripePaymentPage";
import { ProofStatus } from "@/utils/schemas/ownerSubmissionForm.schema";

type PaymentPageProps = {
  location: PoundLocation;
  proofStatus: ProofStatus;
  vehicleId: string;
  email: string;
};
export default function PaymentPage({
  location,
  proofStatus,
  vehicleId,
  email,
}: PaymentPageProps) {
  return (
    <div>
      {proofStatus === "approved" ? (
        <StripePaymentPage vehicleId={vehicleId} email={email} />
      ) : (
        <CashPaymentPage location={location} />
      )}
    </div>
  );
}
