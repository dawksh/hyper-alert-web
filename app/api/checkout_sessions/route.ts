import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const serverSession = await getServerSession(authOptions);
    if (!serverSession?.address) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1RhPwpBMM9SAnGH60bYMZGGa",
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          user: serverSession?.address,
        },
      },
      mode: "payment",
      success_url: `${origin}/profile?success`,
      cancel_url: `${origin}/?canceled=true`,
      payment_method_types: ["crypto", "card"],
    });
    return NextResponse.json({ url: session?.url }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
