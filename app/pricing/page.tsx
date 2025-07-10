import React from "react";
import Link from "next/link";

const Pricing = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 gap-1 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5">
    <div className="flex flex-row w-full gap-1">
      <div className="flex flex-col gap-1">
        <div className="flex items-end justify-start bg-indigo-500 rounded-2xl w-full h-[40vh] px-24 py-12">
          <span className="text-white text-8xl font-extrabold">
            Pricing
          </span>
        </div>
        <div className="flex  items-end justify-center bg-[#2A2A2A] rounded-2xl w-full h-[40vh] px-24 py-12">
          <span className="text-white text-5xl font-extrabold">
            Monthly Subscription Plans
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center items-end bg-lime-500 rounded-2xl w-full h-[80vh] px-12">
        <span className="text-neutral-900 text-[8rem] font-extrabold pb-[45vh]">$</span>
        <span className="text-neutral-900 text-[40rem] font-extrabold leading-none">
          1
        </span>
        <span className="text-neutral-900 text-7xl font-extrabold pb-24">
          /per alert
        </span>
      </div>
    </div>

    <div className="flex items-center flex-row justify-center w-full h-full gap-1">
      {/* 50 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-between items-center py-8 px-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-24 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-7xl font-black">$50</span>
          </div>
          <span className="text-white text-4xl font-normal">
            Pack of <span className="font-bold">50</span>
          </span>
          <span className="text-white text-4xl font-normal">alerts/month</span>
        </div>
        <button className="w-full h-14 bg-white rounded-2xl text-zinc-800 text-2xl py-4 font-semibold flex items-center justify-center mt-4">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 100 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-between items-center py-8 px-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-24 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-7xl font-black">$100</span>
          </div>
          <span className="text-white text-4xl font-normal">
            Pack of <span className="font-bold">100</span>
          </span>
          <span className="text-white text-4xl font-normal">alerts/month</span>
        </div>
        <button className="w-full h-14 bg-white rounded-2xl text-zinc-800 text-2xl py-4 font-semibold flex items-center justify-center mt-4">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 200 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-between items-center py-8 px-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-24 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-7xl font-black">$200</span>
          </div>
          <span className="text-white text-4xl font-normal">
            Pack of <span className="font-bold">200</span>
          </span>
          <span className="text-white text-4xl font-normal">alerts/month</span>
        </div>
        <button className="w-full h-14 bg-white rounded-2xl text-zinc-800 text-2xl py-4 font-semibold flex items-center justify-center mt-4">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
    </div>
  </div>
);

export default Pricing;
