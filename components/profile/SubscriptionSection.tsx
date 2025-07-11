import axios from "axios";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { EmailSection } from "./EmailSection";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

const tiers = [
  { name: "Basic", credits: 50, price: 50 },
  { name: "Pro", credits: 200, price: 200 },
  { name: "Elite", credits: 500, price: 500 },
];

const TierCards = React.memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("buy") === "true") ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);
  const { data: user } = useUser();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const handleBuy = async (
    t: { price: number; credits: number },
    idx: number
  ) => {
    if (!user?.stripe_id || !user?.email) {
      setShowEmail(true);
      toast.error("Please add your email to buy plans");
      return;
    }
    setLoadingIndex(idx);
    try {
      const res = await axios.post("/api/checkout_sessions", {
        price: t.price,
        customerId: user?.stripe_id,
      });
      if (res.data?.url) window.open(res.data.url, "_blank");
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div ref={ref} className="flex items-center flex-col justify-center w-full h-full gap-1">
      {/* Email Section */}
      <AnimatePresence>
        {showEmail && (!user?.email || !user?.stripe_id) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <EmailSection email={user?.email} id={user?.id} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center flex-row justify-center w-full h-full mb-4 gap-1">
        {tiers.map((t, idx) => (
          <div
            key={t.name}
            className={`relative w-full rounded-3xl flex flex-col justify-around items-center py-4 px-2 h-full md:py-16 md:px-4 2xl:py-16 2xl:px-8 ${
              user?.subscription_tier != t.price.toString()
                ? "bg-[#2A2A2A]"
                : "bg-indigo-500"
            }`}
          >
            <div className="w-full flex flex-col items-center gap-2">
              <div
                className={`w-full md:py-12 2xl:py-16 ${
                  user?.subscription_tier != t.price.toString()
                    ? "bg-indigo-500"
                    : "bg-lime-400"
                } rounded-2xl flex items-center justify-center mb-2`}
              >
                <span
                  className={`text-3xl sm:text-5xl md:text-9xl 2xl:text-[10rem] font-black ${
                   "text-neutral-900"
                  }`}
                >{`$${t.price}`}</span>
              </div>
              <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
                Pack of <span className="font-bold">{t.credits}</span>
              </span>
              <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
                alerts/month
              </span>
            </div>
            <button
              className={`w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 2xl:py-8 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 ${
                user?.subscription_tier === t.price.toString()
                  ? "bg-lime-400 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-400 transition-all duration-200"
              }`}
              onClick={() => handleBuy(t, idx)}
              disabled={
                loadingIndex === idx ||
                user?.subscription_tier === t.price.toString()
              }
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
    </div>
  );
});

const SubscriptionSection = ({
  credits,
}: {
  credits: number | null | undefined;
}) => {
  
  return (
    <div className="flex flex-col justify-center gap-1 w-full">
      <div className="bg-lime-400 rounded-md w-full flex flex-row items-center px-12 py-6 gap-1 2xl:px-32 2xl:py-6 2xl:gap-2 ">
        <div className="flex flex-col gap-x-1 w-full">
          <div className="text-zinc-800 text-5xl font-bold font-['Archivo'] 2xl:text-8xl">
            Your Subscription Plan
          </div>
          <div className="text-zinc-800 text-xl font-normal font-['Archivo'] 2xl:text-4xl">
            Alerts are sent at a flat fee of 1$/call. No charges for telegram
            alerts.
          </div>
        </div>
        <div className="bg-neutral-800 rounded-md w-[18vw] 2xl:w-[20vw] h-[10vh] flex flex-row items-center justify-around px-8 py-6 gap-1 2xl:h-[15vh] 2xl:px-20 2xl:py-12 2xl:gap-4 ">
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
};

export default SubscriptionSection;
