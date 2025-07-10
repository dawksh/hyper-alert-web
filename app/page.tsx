"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import XIcon from "@/components/Icons/XIcon";

const Page = () => {
  const { data: session } = useSession();
  const isConnected = !!session?.address;
  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center py-2 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 gap-y-2">
      {/* Hero Section */}
      <section className="w-full bg-indigo-500 rounded-xl flex flex-col justify-end items-start h-[85vh] md:min-h-[unset] py-8 md:py-16 px-8 md:px-24">
        <h1
          className="text-white text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight max-w-6xl mt-24"
          style={{ letterSpacing: "-0.05em", lineHeight: "1em" }}
        >
         We give you a call before your hyperliquid position gets{" "}
          <span className="text-lime-400">liquidated.</span>
        </h1>
      </section>
      {/* How It Works Section */}
      <section className="w-full flex flex-row justify-between gap-1">
        <div className="bg-white rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-[35vw] md:max-w-[35vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            1.
            <br />
            Connect your
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            wallet
          </span>
        </div>
        <div className="bg-white rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-[40vw] md:max-w-[40vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            2.
            <br />
            Select the positions you want 
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            notified on.
          </span>
         
        </div>
        <div className="bg-red-500 rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-[25vw] md:max-w-[25vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            3.
            <br />
            Get{" "}
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            alert!
          </span>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="w-full bg-lime-400 rounded-xl flex flex-col items-start py-5 md:py-8 px-8 md:px-24">
        <h2 className="text-neutral-900 justify-start items-start text-3xl md:text-8xl lg:text-8xl font-bold max-w-6xl mt-16">
          We save thousands of dollars from liquidation for just
          <span className="text-indigo-500">$1 per alert</span>
        </h2>
      </section>
      {/* Talk to us on Section */}
      <section className="w-full bg-indigo-500 rounded-xl flex flex-row md:flex-row items-end md:items-end md:justify-between py-5 md:py-8 px-8 md:px-24 shadow-xl gap-2 md:gap-4 h-[60vh] justify-center mb-4">
        <span className="text-black text-6xl md:text-8xl lg:text-8xl font-bold">
          Talk to us on:
        </span>
        <span className="text-white text-6xl md:text-8xl lg:text-8xl font-bold mt-1 md:mt-0">
          <Link href="https://x.com/perpalertapp" target="_blank">
            <XIcon className="w-[30vw] h-[50vh]" />
          </Link>
        </span>
      </section>
    </div>
  );
};

export default Page;
