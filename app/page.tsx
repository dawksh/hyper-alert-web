import React from "react";

const page = () => (
  <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-4 px-2">
    <div className="w-full max-w-7xl flex flex-col gap-y-4 md:gap-y-8 items-center">
      {/* Hero Section */}
      <section className="w-full bg-indigo-500 rounded-3xl flex flex-col justify-center items-center min-h-[300px] md:min-h-[unset] py-6 md:py-10 shadow-xl px-8 text-center">
        <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-black leading-tight max-w-4xl mx-auto">
          We send you a call on your phone, before your hyperliquid trades get <span className="text-lime-400">liquidated.</span>
        </h1>
      </section>
      {/* Pricing Section */}
      <section className="w-full bg-lime-400 rounded-3xl flex flex-col items-center py-5 md:py-8 shadow-xl px-1">
        <h2 className="text-neutral-900 text-3xl md:text-6xl lg:text-8xl font-bold text-center">
          We charge <span className="text-indigo-500">1$/call</span>
        </h2>
      </section>
      {/* How It Works Section */}
      <section className="w-full grid grid-cols-3 gap-1 md:gap-4">
        <div className="bg-white rounded-3xl flex flex-col items-start p-1 md:p-4 min-h-[60px] md:min-h-[150px] w-full max-w-[90px] md:max-w-none mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            1.
            <br />
            Connect your
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-1">
            hyperliquid wallet
          </span>
        </div>
        <div className="bg-white rounded-3xl flex flex-col items-start p-1 md:p-4 min-h-[60px] md:min-h-[150px] w-full max-w-[90px] md:max-w-none mx-auto shadow-xl">
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
        <div className="bg-red-600 rounded-3xl flex flex-col items-start p-1 md:p-4 min-h-[60px] md:min-h-[150px] w-full max-w-[90px] md:max-w-none mx-auto shadow-xl">
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
      <section className="w-full bg-white rounded-3xl flex flex-col md:flex-row items-start md:items-center py-5 md:py-8 px-2 md:px-4 shadow-xl gap-2 md:gap-4">
        <span className="text-neutral-900 text-3xl md:text-6xl lg:text-8xl font-bold">
          Talk to us on:
        </span>
        <span className="text-indigo-500 text-3xl md:text-6xl lg:text-8xl font-bold mt-1 md:mt-0">
          Twitter
        </span>
      </section>
    </div>
  </div>
);

export default page;
