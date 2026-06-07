import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!);

function generatePickupCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_PUBLIC_SECRET_STRIPE_WEBHOOK_KEY!,
    );
  } catch (error) {
    console.error("Webhook signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const vehicleId = session.metadata?.vehicleId;

    if (!vehicleId) {
      return NextResponse.json({ error: "No vehicle ID" }, { status: 400 });
    }

    const supabase = createAdminClient();
    console.log(
      "service role key exists:",
      !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const pickupCode = generatePickupCode();
    console.log("pickup code generated:", pickupCode);

    const { data, error } = await supabase
      .from("vehicles")
      .update({
        status: "picked_up",
        pickupCode,
      })
      .eq("id", vehicleId);

    console.log("update data:", data);
    console.log("update error:", error);

    if (error) {
      console.error("Error updating vehicle after payment", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
