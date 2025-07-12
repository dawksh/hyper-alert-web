import React from "react";
import Link from "next/link";

const Pricing = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 gap-1 px-1 sm:px-2 md:px-4 2xl:px-5">
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
        className="flex justify-center items-end bg-lime-400 rounded-2xl w-full md:w-1/2 h-[30vh] md:h-[80vh] px-4 mt-2 md:mt-0"
        style={{
          paddingLeft: "clamp(1rem, 4vw, 6rem)",
          paddingRight: "clamp(1rem, 4vw, 6rem)",
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Main numeral */}
          <span
            className="text-neutral-900 font-extrabold leading-none"
            style={{ fontSize: "clamp(6rem, 40vw, 45rem)" }}
          >
            1
          </span>

          {/* Dollar sign - positioned top-left of "1" */}
          <span
            className="absolute text-neutral-900 font-extrabold"
            style={{
              fontSize: "clamp(3rem, 7vw, 10rem)",
              top: 0,
              left: 0,
              transform: "translate(-60%, 100%)",
            }}
          >
            $
          </span>

          {/* / alert - positioned bottom-left of "1" */}
          <span
            className="absolute text-neutral-900 font-extrabold"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 8rem)",
              bottom: 0,
              left: 0,
              transform: "translate(230%, -150%)",
            }}
          >
            / alert
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-1">
      {pricingOptions.map(({ price, count }) => (
        <PricingCard key={count} price={price} count={count} />
      ))}
    </div>
  </div>
);

const pricingOptions = [
  { price: 50, count: 50 },
  { price: 100, count: 100 },
  { price: 200, count: 200 },
];

const PricingCard = ({ price, count }: { price: number; count: number }) => (
  <div className="relative w-full bg-indigo-500 rounded-3xl flex flex-col justify-around items-center py-4 px-2 h-fit md:py-16 md:px-4 mb-2 md:mb-0 last:mb-0">
    <div className="w-full flex flex-col justify-between items-center gap-2">
      <div className="w-full p-9 md:px  -12 2xl:h-36 bg-lime-400 rounded-2xl flex items-center justify-center mb-2">
        <span className="text-neutral-900 text-3xl sm:text-5xl md:text-9xl 2xl:text-[10rem] font-black">
          {`$${price}`}
        </span>
      </div>
      <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
        Pack of <span className="font-bold">{count}</span>
      </span>
      <span className="text-white text-xl sm:text-2xl md:text-4xl 2xl:text-[4rem] font-normal">
        alerts/month
      </span>
    </div>
    <button className="w-full h-[40%] bg-white rounded-2xl text-zinc-800 text-lg md:text-2xl 2xl:text-4xl py-2 md:py-4 font-semibold flex items-center justify-center mt-4 transition-all duration-200 hover:bg-gray-400">
      <Link href="/profile">Get Started</Link>
    </button>
  </div>
);

export default Pricing;
