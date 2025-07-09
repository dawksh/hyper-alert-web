import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const body = await request.json();
    const price = body.price;
    let price_id = "";

    if(price === 50) {
      price_id = "price_1Riu0rBMM9SAnGH6ShpWqeIB";
    } else if(price === 200) {
      price_id = "price_1RiuVABMM9SAnGH6jnt8ffEN";
    } else if(price === 500) {
      price_id = "price_1RiuVPBMM9SAnGH6V2k8SHq5";
    } else {
      return Response.json({ error: "Invalid price" }, { status: 400 });
    }

    const serverSession = await getServerSession(authOptions);
    if (!serverSession?.address) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: price_id,
          quantity: 1,
        },
      ],
      customer: body.customerId,
      subscription_data: {
        metadata: {
          user: serverSession?.address,
        },
      },
      mode: "subscription",
      success_url: `${origin}/profile?success=true`,
      cancel_url: `${origin}/profile?canceled=true`,
      payment_method_types: ["card"],
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
