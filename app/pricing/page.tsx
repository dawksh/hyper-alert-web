import React from "react";
import Link from "next/link";

const Pricing = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-4 gap-2 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5">
    <div className="flex items-center justify-start bg-indigo-500 rounded-2xl w-full h-[20vh] px-24">
      <span className="text-white text-8xl font-extrabold">Our Pricing</span>
    </div>
    <div className="flex items-center justify-start bg-lime-500 rounded-2xl w-full h-[20vh] px-24">
      <span className="text-neutral-900 text-7xl font-extrabold">
        1$ per alert
      </span>
    </div>
    <div className="flex flex-col items-start justify-center bg-[#2A2A2A] rounded-2xl w-full h-[15vh] gap-2 px-24">
      <span className="text-white text-4xl font-extrabold">
        Monthly Subscription Plans
      </span>
      <span className="text-white text-2xl font-normal">
        Renewed every month
      </span>
    </div>
    <div className="flex items-center flex-row justify-center w-full h-full gap-2">
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
            <Link href="/profile">
          Get Started
            </Link>
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
            <Link href="/profile">
              Get Started
            </Link>
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
          <Link href="/profile">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  </div>
);

export default Pricing;
