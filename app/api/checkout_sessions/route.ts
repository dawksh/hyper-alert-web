import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const body = await request.json();
    const price = body.price;
    let productId = "";
    let price_id = "";
    let unitAmount = "";

    if (price === 50) {
      price_id = "0bc33c0c-a3ba-4827-b329-aa857f662d33";
      unitAmount = "500000000";
      productId = "34807143-889c-4827-b722-f520d2cf6692";
    } else if (price === 200) {
      price_id = "af99774d-9a95-4f05-b850-bebf6d29b23b";
      unitAmount = "20000000000";
      productId = "5242c437-037a-455d-97e1-ecff282a8b0d";
    } else if (price === 500) {
      price_id = "e811c4b2-0901-4d83-8cf7-df4ce915613d";
      unitAmount = "50000000000";
      productId = "aba4749a-c5d9-4fdc-8d96-2f1a37a94650";
    } else {
      return Response.json({ error: "Invalid price" }, { status: 400 });
    }
    const serverSession = await getServerSession(authOptions);
    if (!serverSession?.address) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const invoiceRes = await axios.post(
      "https://api.copperx.io/api/v1/invoices",
      {
        customerId: body.customerId,
        description: "Monthly recurring credit charge for perpalert",
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        invoiceType: "recurring",
        collectionMethod: "charge_automatically",
        lineItems: {
          data: [
            {
              quantity: 1,
              priceId: price_id,
              price: {
                productId: productId,
                unitAmount: unitAmount,
                currency: "usdc",
                type: "recurring",
                interval: "month",
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COPPERX_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const invoiceId = invoiceRes.data.id;

    const invoice = await axios.post(
      `https://api.copperx.io/api/v1/invoices/${invoiceId}/finalize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.COPPERX_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json({ url: invoice.data.url }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
