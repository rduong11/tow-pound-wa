import { PoundLocation } from "@/utils/constants/poundLocations";

type CashPaymentPageProps = {
  location: PoundLocation;
};

export default function CashPaymentPage({ location }: CashPaymentPageProps) {
  const towPrice = 231;
  return (
    <div className="max-w-md mx-auto text-center pt-10">
      <h2 className="text-xl font-semibold">
        Your vehicle is ready for pickup at:
        <div className="border border-gray-300 rounded-lg p-4 m-4 bg-gray-300">
          {location}
        </div>
      </h2>
      <p className="font-medium">
        Amount due, <span className="text-destructive">in cash: </span> $
        {towPrice}
      </p>
      <p className="text-muted-foreground mt-2">See you soon!</p>
    </div>
  );
}
