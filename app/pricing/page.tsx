import React from "react";
import Link from "next/link";

const Pricing = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 gap-1 px-1 sm:px-2 md:px-3 2xl:px-4">
    <div className="flex flex-col md:flex-row w-full gap-1">
      <div className="flex flex-col gap-1 w-full md:w-1/2">
        <div
          className="flex items-end justify-start bg-indigo-500 rounded-2xl w-full h-[20vh] md:h-[40vh] px-4 py-4"
          style={{
            paddingLeft: "clamp(1rem, 5vw, 6rem)",
            paddingRight: "clamp(1rem, 5vw, 6rem)",
            paddingTop: "clamp(1rem, 4vw, 5rem)",
            paddingBottom: "clamp(1rem, 4vw, 5rem)",
          }}
        >
          <span
            className="text-white font-extrabold"
            style={{ fontSize: "clamp(2.5rem, 7vw, 10rem)" }}
          >
            Pricing
          </span>
        </div>
        <div
          className="flex items-end justify-center bg-[#2A2A2A] rounded-2xl w-full h-[20vh] md:h-[40vh] px-4 py-4"
          style={{
            paddingLeft: "clamp(1rem, 5vw, 6rem)",
            paddingRight: "clamp(1rem, 5vw, 6rem)",
            paddingTop: "clamp(1rem, 4vw, 5rem)",
            paddingBottom: "clamp(1rem, 4vw, 5rem)",
          }}
        >
          <span
            className="text-white font-extrabold"
            style={{ fontSize: "clamp(1.5rem, 4vw, 6rem)" }}
          >
            Monthly Subscription Plans
          </span>
        </div>
      </div>
      <div
        className="flex flex-row justify-center items-end bg-lime-500 rounded-2xl w-full md:w-1/2 h-[30vh] md:h-[80vh] px-4 mt-2 md:mt-0"
        style={{
          paddingLeft: "clamp(1rem, 4vw, 6rem)",
          paddingRight: "clamp(1rem, 4vw, 6rem)",
        }}
      >
        <span
          className="text-neutral-900 font-extrabold"
          style={{
            fontSize: "clamp(3rem, 7vw, 10rem)",
            paddingBottom: "clamp(2rem, 10vh, 50vh)",
          }}
        >
          $
        </span>
        <span
          className="text-neutral-900 font-extrabold leading-none"
          style={{ fontSize: "clamp(6rem, 35vw, 40rem)" }}
        >
          1
        </span>
        <span
          className="text-neutral-900 font-extrabold"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 8rem)",
            paddingBottom: "clamp(1rem, 10vh, 50vh)",
            paddingLeft: "clamp(0.5rem, 2vw, 4vw)",
          }}
        >
          / alert
        </span>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-1">
      {/* 50 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">
              $50
            </span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">50</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            alerts/month
          </span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 100 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">
              $100
            </span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">100</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            alerts/month
          </span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
      {/* 200 alerts */}
      <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 2xl:h-[30vh] md:py-8 md:px-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-16 md:h-24 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-neutral-900 text-3xl sm:text-5xl md:text-7xl 2xl:text-[8rem] font-black">
              $200
            </span>
          </div>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            Pack of <span className="font-bold">200</span>
          </span>
          <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
            alerts/month
          </span>
        </div>
        <button className="w-full h-12 md:h-14 2xl:h-28 bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-colors duration-200 hover:bg-lime-600 hover:text-white">
          <Link href="/profile">Get Started</Link>
        </button>
      </div>
    </div>
  </div>
);

export default Pricing;
