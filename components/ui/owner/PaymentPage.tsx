import { PoundLocation } from "@/utils/constants/poundLocations";
import CashPaymentPage from "./CashPaymentPage";
import StripePaymentPage from "./StripePaymentPage";
import { ProofStatus } from "@/utils/schemas/ownerSubmissionForm.schema";

type PaymentPageProps = {
  location: PoundLocation;
  proofStatus: ProofStatus;
};
export default function PaymentPage({
  location,
  proofStatus,
}: PaymentPageProps) {
  return (
    <div>
      {proofStatus === "approved" ? (
        <StripePaymentPage />
      ) : (
        <CashPaymentPage location={location} />
      )}
    </div>
  );
}
