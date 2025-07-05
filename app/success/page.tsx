import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../lib/stripe";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;
  if (!sessionId) throw new Error("Missing session_id");
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });
  if (session.status === "open") return redirect("/");
  if (session.status === "complete")
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <style>{`
          .checkmark {
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: dash 0.6s ease forwards;
          }
          @keyframes dash {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        <section className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#DCFCE7" />
              <path className="checkmark" d="M20 34l8 8 16-16" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h1>
          <p className="mb-2">We appreciate your business.</p>
          <p className="mb-4">
            A confirmation email will be sent to <span className="font-medium">{session.customer_details?.email}</span>.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            If you have any questions, email <a className="text-blue-600 underline" href="mailto:orders@example.com">orders@example.com</a>.
          </p>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Back to Home</Link>
        </section>
      </main>
    );
  return null;
}
