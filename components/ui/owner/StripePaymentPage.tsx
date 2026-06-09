"use client";

import { useState } from "react";
import { Button } from "../shadcn/button";
import { createCheckoutSession } from "@/utils/actions/stripeActions";
import toast from "react-hot-toast";

type StripePaymentPageProps = {
  vehicleId: string;
  email: string;
};

export default function StripePaymentPage({
  vehicleId,
  email,
}: StripePaymentPageProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { url, error } = await createCheckoutSession(vehicleId, email);

      if (error || !url) {
        toast.error("Failed to start payment. Please try again.");
        return;
      }

      window.location.href = url;
    } catch (error) {
      console.error("Something went wrong.", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center pt-10">
      <h2 className="text-xl font-semibold">Payment Required</h2>
      <p className="text-muted-foreground mt-2">
        Your submission has been approved. Please proceed to pay the tow fee.
      </p>
      <div className="mt-6 p-4 rounded-lg border">
        <p className="text-sm text-muted-foreground">Amount due</p>
        <p className="text-3xl font-semibold mt-1">$250.00</p>
      </div>
      <Button
        className="mt-6 w-full hover:brightness-75 transition-all duration-200"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Pay Now"}
      </Button>
    </div>
  );
}
