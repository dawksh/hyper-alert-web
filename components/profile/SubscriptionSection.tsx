import axios from "axios";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

const tiers = [
  { name: "Basic", credits: 50, price: 50 },
  { name: "Pro", credits: 200, price: 200 },
  { name: "Elite", credits: 500, price: 500 },
];

const TierCards = () => {
  const { data: user } = useUser();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const handleBuy = async (
    t: { price: number; credits: number },
    idx: number
  ) => {
    if(!user?.stripe_id) {
      toast.error("Please add your email to buy plans");
      return;
    }
    setLoadingIndex(idx);
    try {
      const res = await axios.post("/api/checkout_sessions", {
        price: t.price,
        customerId: user?.stripe_id,
      });
      if (res.data?.url) window.location.href = res.data.url;
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div className="flex items-center flex-row justify-center w-full h-full gap-1">
      {tiers.map((t, idx) => (
        <div
          key={t.name}
          className={`relative w-full rounded-xl flex flex-col justify-between items-center py-8 px-4 ${user?.subscription_tier === t.price.toString() ? "bg-[#2A2A2A]" : "bg-indigo-500"}`}
        >
          <div className="w-full flex flex-col items-center gap-1">
            <div className={`w-full h-24 rounded-2xl flex items-center justify-center mb-2 ${user?.subscription_tier === t.price.toString() ? "bg-indigo-500" : "bg-lime-400"}`}>
              <span className="text-neutral-900 text-7xl font-black">{`$${t.price}`}</span>
            </div>
            <span className="text-white text-6xl font-normal">
              Pack of <span className="font-bold">{t.credits}</span>
            </span>
            <span className="text-white text-6xl font-normal">
              alerts/month
            </span>
          </div>
          <button
            className={`w-full h-14 bg-white rounded-2xl text-zinc-800 text-2xl py-4 font-semibold flex items-center justify-center mt-4 ${user?.subscription_tier === t.price.toString() ? "bg-lime-400 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => handleBuy(t, idx)}
            disabled={loadingIndex === idx || user?.subscription_tier === t.price.toString()}
          >
            {loadingIndex === idx ? (
              <Loader2 className="animate-spin" />
            ) : user?.subscription_tier === t.price.toString() ? (
              "Current Plan"
            ) : (
              "Buy Now"
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

const SubscriptionSection = ({
  credits,
}: {
  credits: number | null | undefined;
}) => {
  return (
    <div className="flex flex-col justify-center gap-1 w-full mt-1">
      <div className="bg-lime-400 rounded-md w-full flex flex-row items-start px-12 py-6 gap-1 ">
        <div className="flex flex-col gap-x-1 w-full">
          <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">
            Your Subscription Plan
          </div>
          <div className="text-zinc-800 text-xl font-normal font-['Archivo']">
            Alerts are sent at a flat fee of 1$/call. No charges for telegram
            alerts.
          </div>
        </div>
        <div className="bg-neutral-800 rounded-md w-[18vw] h-[10vh] flex flex-row items-center justify-around px-10 py-6 gap-1 ">
          <div className="text-white text-lg font-normal font-['Archivo'] tracking-tight">
            Remaining Credits
          </div>
          <div className="text-white text-4xl font-bold font-['Archivo'] tracking-tight">
            {credits}
          </div>
        </div>
      </div>
      <TierCards />
    </div>
  );
};

export default SubscriptionSection; 