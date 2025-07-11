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
    <div className="flex items-center flex-row justify-center w-full h-full gap-1 2xl:gap-4">
      {tiers.map((t, idx) => (
        <div
          key={t.name}
          className={`relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4 2xl:py-16 2xl:px-8 ${user?.subscription_tier === t.price.toString() ? "bg-[#2A2A2A]" : "bg-indigo-500"}`}
        >
          <div className="w-full flex flex-col items-center gap-2">
            <div className={`w-full h-16 md:h-24 2xl:h-36 ${user?.subscription_tier === t.price.toString() ? "bg-neutral-800" : "bg-lime-400"} rounded-2xl flex items-center justify-center mb-2`}>
              <span className={`text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black ${user?.subscription_tier === t.price.toString() ? "text-white" : "text-neutral-900"}`}>{`$${t.price}`}</span>
            </div>
            <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
              Pack of <span className="font-bold">{t.credits}</span>
            </span>
            <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
              alerts/month
            </span>
          </div>
          <button
            className={`w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 2xl:py-8 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 ${user?.subscription_tier === t.price.toString() ? "bg-lime-400 cursor-not-allowed" : "cursor-pointer hover:bg-lime-600 hover:text-white"}`}
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
}) => (
  <div className="flex flex-col justify-center gap-1 w-full mt-1 2xl:gap-4 2xl:mt-4">
    <div className="bg-lime-400 rounded-md w-full flex flex-row items-center px-12 py-6 gap-1 2xl:px-32 2xl:py-6 2xl:gap-2 ">
      <div className="flex flex-col gap-x-1 w-full">
        <div className="text-zinc-800 text-5xl font-bold font-['Archivo'] 2xl:text-8xl">
          Your Subscription Plan
        </div>
        <div className="text-zinc-800 text-xl font-normal font-['Archivo'] 2xl:text-4xl">
          Alerts are sent at a flat fee of 1$/call. No charges for telegram alerts.
        </div>
      </div>
      <div className="bg-neutral-800 rounded-md w-[18vw] h-[10vh] flex flex-row items-center justify-around px-10 py-6 gap-1 2xl:w-[12vw] 2xl:h-[10vh] 2xl:px-20 2xl:py-12 2xl:gap-4 ">
        <div className="text-white text-lg font-normal font-['Archivo'] tracking-tight 2xl:text-3xl">
          Remaining Credits
        </div>
        <div className="text-white text-4xl font-bold font-['Archivo'] tracking-tight 2xl:text-7xl">
          {credits}
        </div>
      </div>
    </div>
    <TierCards />
  </div>
);

export default SubscriptionSection; 