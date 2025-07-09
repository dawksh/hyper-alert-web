"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

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
          We’ll give you a call before your Hyperliquid positions get{" "}
          <span className="text-lime-400">liquidated.</span>
        </h1>
      </section>
      {/* How It Works Section */}
      <section className="w-full grid grid-cols-3 gap-1 md:gap-2">
        <div className="bg-white rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-full max-w-[220px] md:max-w-[33vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            1.
            <br />
            Connect your
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            hyperliquid wallet
          </span>
        </div>
        <div className="bg-white rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-full max-w-[220px] md:max-w-[33vw] mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            2.
            <br />
            Choose the trades you want to get
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            notified
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            {" "}
            on.
          </span>
        </div>
        <div className="bg-red-500 rounded-xl flex flex-col items-start p-1 md:p-4 min-h-[20vh] md:min-h-[25vh] w-full max-w-[220px] md:max-w-[33vw] mx-auto shadow-xl">
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
          <span className="text-indigo-500">1$/alert</span>
        </h2>
      </section>
      {/* Talk to us on Section */}
      <section className="w-full bg-indigo-500 rounded-xl flex flex-col md:flex-col items-start md:items-start md:justify-end py-5 md:py-8 px-8 md:px-24 shadow-xl gap-2 md:gap-4 h-[60vh] justify-center mb-4">
        <span className="text-black text-6xl md:text-8xl lg:text-8xl font-bold">
          Talk to us on:
        </span>
        <span className="text-white text-6xl md:text-8xl lg:text-8xl font-bold mt-1 md:mt-0">
          <Link href="https://x.com/perpalert" target="_blank">
            Twitter
          </Link>
        </span>
      </section>
    </div>
  );
};

export default Page;
