import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!);
export async function createCheckoutSession(vehicleId: string, email: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Vehicle Tow Fee",
              description:
                "Chicago DMV Tow Pound Fee for retrieval of vehicle.",
            },
            unit_amount: 25000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        vehicleId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${vehicleId}/confirmation`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/confirmation`,
    });

    return { url: session.url, error: null };
  } catch (error) {
    console.error("Error creating checkout session", error);
    return { url: null, error: "Failed to create checkout session." };
  }
}
