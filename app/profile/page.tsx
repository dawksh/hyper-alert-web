"use client";
import Link from "next/link";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";

// Mobile Number Section
const MobileSection = () => (
  <div className="flex flex-row gap-2 w-full">
    <div className="flex-1 bg-indigo-500 rounded-xl h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">
      Your mobile number to get alert calls
    </div>
    <PhoneInput
      defaultCountry="us"
      value={"+919084857736"}
      className="w-2/5 bg-white rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo']"
      onChange={(phone) => console.log(phone)}
    />
    <div className="bg-lime-400 rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] cursor-pointer">
      Update
    </div>
  </div>
);

// Telegram Section
const TelegramSection = () => {
  const [openTelegram, setOpenTelegram] = useState(false);
  return (
    <>
      <div className="flex flex-row gap-x-2 w-full">
        <div className="flex-1 bg-indigo-500 rounded-xl h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">
          Get notified on Telegram
        </div>
        <div className="flex-1 bg-white rounded-xl h-20 flex items-center px-8 text-red-600 text-2xl font-medium font-['Archivo']">
          Telegram <span className="font-bold ml-2">Not Connected!</span>
        </div>
        <div className="flex-1 bg-lime-400 rounded-xl h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo']">
          Register
          <span
            className="font-bold underline ml-2"
            onClick={() => setOpenTelegram(!openTelegram)}
          >
            here
          </span>
        </div>
      </div>
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
            <span className="font-bold ml-2 underline">
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
                navigator.clipboard.writeText("1234567890");
                toast.success("Copied to clipboard");
              }}
            >
              1234567890
            </span>{" "}
            as register code
          </div>
        </div>
      </div>
    </>
  );
};

// Liquidation Threshold Section
const ThresholdSection = () => {
  const [value, setValue] = useState(20);
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
      <div className="bg-neutral-800 rounded-xl w-full flex flex-col items-center px-12 py-6 gap-6">
        <div className="text-white text-8xl font-bold font-['Archivo']">{value}%</div>
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
            onChange={e => setValue(Number(e.target.value))}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-lime-400 mt-2 mb-2"
            style={{ accentColor: '#c6ff00', height: '0.5rem', WebkitAppearance: 'none', appearance: 'none' }}
          />
          <style jsx global>{`
            input[type='range']::-webkit-slider-thumb {
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
            input[type='range']::-moz-range-thumb {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
            }
            input[type='range']::-ms-thumb {
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
const SubscriptionSection = () => (
  <div className="bg-zinc-800 rounded-xl w-full flex flex-col items-start px-12 py-8 gap-2">
    <div className="text-zinc-800 text-xl font-bold font-['Archivo']">
      Your Subscription Plan
    </div>
    <div className="text-zinc-800 text-xl font-normal font-['Archivo']">
      Alerts are sent at a flat fee of 1$/call. No charges for telegram alerts.
    </div>
    <div className="flex flex-row gap-8 mt-8 w-full">
      <div className="flex-1 bg-white rounded-xl flex flex-col items-center justify-center py-8">
        <div className="text-white text-xl font-normal font-['Archivo']">
          Remaining Credits
        </div>
        <div className="text-white text-xl font-bold font-['Archivo']">499</div>
      </div>
      <div className="flex-1 bg-white rounded-xl flex flex-col items-center justify-center py-8" />
      <div className="flex-1 bg-white rounded-xl flex flex-col items-center justify-center py-8" />
    </div>
  </div>
);

const Profile = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-2 gap-1 px-28">
    {/* Mobile Number Section */}
    <MobileSection />
    {/* Telegram Section */}
    <TelegramSection />
    {/* Liquidation Threshold Section */}
    <ThresholdSection />
    {/* Subscription Plan Section */}
    {/* <SubscriptionSection /> */}
  </div>
);

export default Profile;
