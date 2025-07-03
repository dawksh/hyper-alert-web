import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const serverSession = await getServerSession(authOptions)
    if (!serverSession?.address) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1RgsLBBMM9SAnGH6lzOMyQUD',
          quantity: 1,
        },
      ],
      metadata: {
        user: serverSession?.address,

      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      payment_method_types: ["crypto", "card"]
    });
    return NextResponse.redirect(session?.url || '/', 303)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 } 
    )
  }
}