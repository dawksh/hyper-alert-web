"use client";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { MobileSection } from "@/components/profile/MobileSection";
import TelegramSection from "@/components/profile/TelegramSection";
import ThresholdSection from "@/components/profile/ThresholdSection";
import SubscriptionSection from "@/components/profile/SubscriptionSection";
import { useSession } from "next-auth/react";
import { EmailSection } from "@/components/profile/EmailSection";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Profile = () => {
  const { data: user } = useUser();
  const { data: session } = useSession();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (!session?.user) openConnectModal?.();
  }, [session?.user, openConnectModal]);


  if(!session?.user) {
    return (
      <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center py-2 gap-1 px-28">
        <div className="text-white text-2xl font-bold">
          Please connect wallet to continue
        </div> 
      </div>
    )
  }

  if (!user)
    return (
      <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center py-2 gap-1 px-28">
        <Loader2 className="text-white text-4xl animate-spin" />
      </div>
    );
  return (
    <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 gap-1 px-1 sm:px-2 md:px-4 2xl:px-5">
      {/* Mobile Number Section */}
      <MobileSection mobileNumber={user?.pd_id} id={user?.id} />
      {/* Telegram Section */}
      <TelegramSection telegramId={user?.telegram_id} />
      {/* Liquidation Threshold Section */}
      <ThresholdSection threshold={user?.threshold} id={user?.id} />
      {/* Subscription Plan Section */}
      <SubscriptionSection
        credits={user.credits.length > 0 ? user.credits[0].credits : 0}
      />
    </div>
  );
};

export default Profile;
