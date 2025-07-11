import React from "react";
import Link from "next/link";

const Pricing = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 gap-1 px-1 sm:px-2 md:px-3 2xl:px-4">
    <div className="flex flex-col md:flex-row w-full gap-1">
      <div className="flex flex-col gap-1 w-full md:w-1/2">
        <div className="flex items-end justify-start bg-indigo-500 rounded-2xl w-full h-[20vh] md:h-[40vh] px-4 py-4 2xl:py-20 md:px-24 md:py-12">
          <span className="text-white text-7xl md:text-8xl 2xl:text-[14rem] font-extrabold">
            Pricing
          </span>
        </div>
        <div className="flex items-end justify-center bg-[#2A2A2A] rounded-2xl w-full h-[20vh] md:h-[40vh] px-4 py-4 md:px-24 2xl:py-20 md:py-12">
          <span className="text-white text-5xl md:text-5xl 2xl:text-[9rem] font-extrabold">
            Monthly Subscription Plans
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center items-end bg-lime-500 rounded-2xl w-full md:w-1/2 h-[30vh] md:h-[80vh] px-4 md:px-12 mt-2 md:mt-0">
        <span className="text-neutral-900 text-9xl md:text-[8rem] 2xl:text-[12rem] font-extrabold pb-28 md:pb-[45vh] 2xl:pb-[35vh]">$</span>
        <span className="text-neutral-900 text-[16rem] md:text-[40rem] 2xl:text-[70rem] font-extrabold leading-none">1</span>
        <span className="text-neutral-900 text-6xl md:text-7xl 2xl:text-[12rem] font-extrabold pb-8 md:pb-24 2xl:pb-40">/per alert</span>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-1">
      {/* 50 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">$50</span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">50</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">alerts/month</span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 100 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">$100</span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">100</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">alerts/month</span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 200 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">$200</span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">200</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">alerts/month</span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
    </div>
  </div>
);

export default Pricing;
