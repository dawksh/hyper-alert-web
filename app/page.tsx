"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import XIcon from "@/components/Icons/XIcon";

const Page = () => {
  const { data: session } = useSession();
  const isConnected = !!session?.address;
  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center py-1 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 gap-y-1">
      {/* Hero Section */}
      <section className="w-full bg-indigo-500 rounded-xl flex flex-col justify-end items-start h-[90vh] md:h-[85vh] py-8 md:py-16 px-8 md:px-24">
        <h1
          className="text-white font-extrabold leading-tight max-w-[70%] mt-24"
          style={{ fontSize: "clamp(4.5rem, 7vw, 20rem)", letterSpacing: "-0.05em", lineHeight: "1em" }}
        >
         We give you a call before your hyperliquid position gets{" "}
          <span className="text-lime-400">liquidated.</span>
        </h1>
      </section>
      {/* How It Works Section */}
      <section className="w-full flex flex-row justify-between gap-1">
        <div className="bg-white rounded-xl flex flex-col items-start p-4  min-h-[20vh] md:min-h-[25vh] w-[35vw] md:max-w-[35vw] shadow-xl">
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-normal">
            1.
            <br />
            Connect your
          </span>
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-bold mt-1">
            wallet
          </span>
        </div>
        <div className="bg-white rounded-xl flex flex-col items-start p-4  min-h-[20vh] md:min-h-[25vh] w-[40vw] md:max-w-[40vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-normal">
            2.
            <br />
            Select the positions you want 
          </span>
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-bold mt-1">
            notified on.
          </span>
         
        </div>
        <div className="bg-red-500 rounded-xl flex flex-col items-start p-4 min-h-[20vh] md:min-h-[25vh] w-[25vw] md:max-w-[25vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-normal">
            3.
            <br />
            Get{" "}
          </span>
          <span className="text-neutral-900 text-2xl md:text-4xl 2xl:text-8xl font-bold mt-1">
            alert!
          </span>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="w-full bg-lime-400 rounded-xl flex flex-col items-start py-5 md:py-8 px-8 md:px-24">
        <h2 className="text-neutral-900 justify-start items-start text-5xl md:text-8xl 2xl:text-9xl font-bold max-w-6xl 2xl:max-w-[40%] mt-16">
          We save thousands of dollars from liquidation for just
          <span className="text-indigo-500">$1 per alert</span>
        </h2>
      </section>
      {/* Talk to us on Section */}
      <section className="w-full bg-indigo-500 rounded-xl flex flex-row md:flex-row items-end md:items-end md:justify-between py-5 md:py-8 px-8 md:px-24 gap-1 md:gap-4 h-[30vh] md:h-[60vh] 2xl:h-[50vh] justify-center mb-4">
        <span className="text-black text-6xl md:text-8xl 2xl:text-[15rem] font-bold">
          Reach out to us on:
        </span>
        <span className="text-white font-bold mt-1 md:mt-0">
          <Link href="https://x.com/perpalertapp" target="_blank">
            <XIcon className="w-full h-full md:w-[30vw] md:h-[50vh] 2xl:w-[20vw] 2xl:h-[30vh]" />
          </Link>
        </span>
      </section>
    </div>
  );
};

export default Page;
