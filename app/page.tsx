"use client"

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const {data: session} = useSession()
  const isConnected = !!session?.address
  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-4 px-2">
      <div className="w-full max-w-7xl flex flex-col gap-y-2 md:gap-y-4 items-center">
        {/* Open App Section */}
        {isConnected && (
          <section className="w-full bg-blue-500 rounded-xl flex flex-col justify-center items-center min-h-[300px] md:min-h-[unset] py-4 md:py-8 shadow-xl px-2 text-center">
          <h2 className="text-white text-3xl md:text-6xl lg:text-6xl font-bold text-center">
            <Link href="/app">
              Open App
            </Link>
          </h2>
        </section>
        )}
        {/* Hero Section */}
        <section className="w-full bg-indigo-500 rounded-xl flex flex-col justify-center items-center min-h-[300px] md:min-h-[unset] py-4 md:py-8 shadow-xl px-2 text-center">
          <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-black leading-tight max-w-4xl mx-auto">
            We send you a call on your phone, before your hyperliquid trades get{" "}
            <span className="text-lime-400">liquidated.</span>
          </h1>
        </section>
        {/* Pricing Section */}
        <section className="w-full bg-lime-400 rounded-xl flex flex-col items-center py-5 md:py-8 shadow-xl px-1">
          <h2 className="text-neutral-900 text-3xl md:text-8xl lg:text-8xl font-bold text-center">
            We charge <span className="text-indigo-500">1$/call</span>
          </h2>
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
        {/* Talk to us on Section */}
        <section className="w-full bg-indigo-500 rounded-xl flex flex-col md:flex-col items-start md:items-start md:justify-end py-5 md:py-8 px-4 md:px-10 shadow-xl gap-2 md:gap-4 h-[60vh] justify-center mb-4">
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
    </div>
  )
}

export default Page;
