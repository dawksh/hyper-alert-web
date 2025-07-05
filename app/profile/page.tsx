"use client";
import { queryClient } from "@/components/shared/ProviderLayout";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import phone from "phone";
import React, { useState, useEffect, useRef } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";

// Mobile Number Section
const MobileSection = ({
  mobileNumber,
  id,
}: {
  mobileNumber: string | null | undefined;
  id: string | null | undefined;
}) => {
  const [phoneNumber, setPhoneNumber] = useState(mobileNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const number = phone(phoneNumber);
      if (!number.isValid) {
        toast.error("Invalid phone number, please verify.");
        return;
      }
      await axios.post("/api/user", {
        id: id,
        pd_id: phoneNumber,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex-1 bg-indigo-500 rounded-xl h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">
        Your mobile number to get alert calls
      </div>
      <PhoneInput
        defaultCountry="us"
        value={mobileNumber || phoneNumber}
        className="w-2/5 bg-white rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo']"
        onChange={(phone) => setPhoneNumber(phone)}
      />
      <div
        className={`bg-lime-400 rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] cursor-pointer ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
      </div>
    </div>
  );
};

// Telegram Section
const TelegramSection = ({
  telegramId,
}: {
  telegramId: string | null | undefined;
}) => {
  const [openTelegram, setOpenTelegram] = useState(false);
  const isTelegramConnected = telegramId && !isNaN(Number(telegramId));

  return (
    <>
      <div className="flex flex-row gap-x-2 w-full">
        <div className="flex-1 bg-indigo-500 rounded-xl h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">
          Get notified on Telegram
        </div>
        <div
          className="flex-1 bg-white rounded-xl h-20 flex items-center px-8 text-2xl font-medium font-['Archivo']"
          style={{ color: isTelegramConnected ? "#22c55e" : "#dc2626" }}
        >
          Telegram{" "}
          <span className="font-bold ml-2">
            {isTelegramConnected ? "Connected!" : "Not Connected!"}
          </span>
        </div>
        <div
          className={`flex-1 rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] ${
            isTelegramConnected
              ? "bg-lime-300 opacity-60 cursor-not-allowed"
              : "bg-lime-400 cursor-pointer"
          }`}
        >
          Register
          <span
            className={`font-bold underline ml-2 ${
              isTelegramConnected ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={
              !isTelegramConnected
                ? () => setOpenTelegram(!openTelegram)
                : undefined
            }
          >
            here
          </span>
        </div>
      </div>
      {!isTelegramConnected && (
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-row gap-2 w-full  ${
            openTelegram
              ? "h-full opacity-100"
              : "h-0 opacity-0 pointer-events-none"
          }`}
          style={{}}
        >
          <div className="flex-1 bg-white rounded-xl h-[30vh] flex flex-col items-start justify-center px-8 text-neutral-900 text-3xl font-medium font-['Archivo']">
            <div>
              Open Bot{" "}
              <span className="font-bold ml-2 underline cursor-pointer">
                <Link href="https://t.me/liquialertbot" target="_blank">
                  here
                </Link>
              </span>
            </div>
            <div>&gt; send /register</div>
            <div>
              &gt; send{" "}
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(telegramId || "");
                  toast.success("Copied to clipboard");
                }}
              >
                {telegramId}
              </span>{" "}
              as registration code
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Liquidation Threshold Section
const ThresholdSection = ({
  threshold,
  id,
}: {
  threshold: number | null | undefined;
  id: string | null | undefined;
}) => {
  const [value, setValue] = useState(threshold ?? 20);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axios.post("/api/user", {
        id: id,
        threshold: value,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Threshold updated successfully");
    } catch (error) {
      toast.error("Failed to update threshold");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value !== threshold) handleSubmit();
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-lime-400 rounded-xl w-full flex flex-col items-start px-12 py-6 gap-2 ">
        <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">
          Liquidation Threshold (%)
        </div>
        <div className="text-zinc-800 text-xl font-normal font-['Archivo']">
          i.e. the margin you want to get{" "}
          <span className="font-bold">alerted</span> on before getting
          liquidated
        </div>
      </div>
      <div className="bg-neutral-800 rounded-xl max-w-5/12 h-[40vh] flex flex-col items-start justify-center px-12 py-6 gap-6">
        <div className="text-white text-9xl text-start font-bold font-['Archivo']">
          {value}%
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-row items-center justify-between px-2">
            <span className="text-neutral-400 text-lg">min</span>
            <span className="text-neutral-400 text-lg">max</span>
          </div>
          <input
            type="range"
            min={5}
            max={90}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-lime-400 mt-2 mb-2"
            style={{
              accentColor: "#c6ff00",
              height: "0.5rem",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          <style jsx global>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
            }
            input[type="range"]::-moz-range-thumb {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
            }
            input[type="range"]::-ms-thumb {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

// Subscription Plan Section
const SubscriptionSection = ({
  credits,
}: {
  credits: number | null | undefined;
}) => {
  return (
    <div className="flex flex-col justify-center gap-2 w-full mt-1">
      <div className="bg-lime-400 rounded-xl w-full flex flex-row items-start px-12 py-6 gap-2 ">
        <div className="flex flex-col gap-x-2 w-full">
          <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">
            Your Subscription Plan
          </div>
          <div className="text-zinc-800 text-xl font-normal font-['Archivo']">
            Alerts are sent at a flat fee of 1$/call. No charges for telegram
            alerts.
          </div>
        </div>
        <div className="bg-neutral-800 rounded-xl w-[15vw] h-[10vh] flex flex-row items-center justify-center px-12 py-6 gap-2 ">
          <div className="text-white text-lg font-normal font-['Archivo'] tracking-tight">
            Remaining Credits
          </div>
          <div className="text-white text-4xl font-bold font-['Archivo'] tracking-tight">
            {credits}
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { data: user } = useUser();
  if (!user)
    return (
      <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center py-2 gap-1 px-28">
        <Loader2 className="text-white text-4xl animate-spin" />
      </div>
    );
  return (
    <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-2 gap-1 px-28">
      {/* Mobile Number Section */}
      <MobileSection mobileNumber={user?.pd_id} id={user?.id} />
      {/* Telegram Section */}
      <TelegramSection telegramId={user?.telegram_id} />
      {/* Liquidation Threshold Section */}
      <ThresholdSection threshold={user?.threshold} id={user?.id} />
      {/* Subscription Plan Section */}
      <SubscriptionSection credits={user?.credits[0].credits} />
    </div>
  );
};

export default Profile;
