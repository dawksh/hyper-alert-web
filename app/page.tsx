import React from "react";

const page = () => (
  <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-8 px-4">
    <div className="w-full max-w-7xl flex flex-col gap-y-6 md:gap-y-12 items-center">
      {/* Hero Section */}
      <section className="w-full bg-indigo-500 rounded-3xl flex flex-col items-center py-12 md:py-20 shadow-xl px-8">
        <h1 className="text-white text-3xl md:text-6xl lg:text-8xl font-black text-center leading-tight">
          We send you a call
          <br />
          on your phone, before
          <br />
          your hyperliquid trades get{" "}
          <span className="text-lime-400">liquidated.</span>
        </h1>
      </section>
      {/* Pricing Section */}
      <section className="w-full bg-lime-400 rounded-3xl flex flex-col items-center py-10 md:py-16 shadow-xl px-2">
        <h2 className="text-neutral-900 text-3xl md:text-6xl lg:text-8xl font-bold text-center">
          We charge <span className="text-indigo-500">1$/call</span>
        </h2>
      </section>
      {/* How It Works Section */}
      <section className="w-full grid grid-cols-3 gap-2 md:gap-8">
        <div className="bg-white rounded-3xl flex flex-col items-start p-2 md:p-10 min-h-[100px] md:min-h-[300px] w-full max-w-[110px] md:max-w-none mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            1.
            <br />
            Connect your
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-2">
            hyperliquid wallet
          </span>
        </div>
        <div className="bg-white rounded-3xl flex flex-col items-start p-2 md:p-10 min-h-[100px] md:min-h-[300px] w-full max-w-[110px] md:max-w-none mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            2.
            <br />
            Choose the trades you want to get
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-2">
            notified
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            {" "}
            on.
          </span>
        </div>
        <div className="bg-red-600 rounded-3xl flex flex-col items-start p-2 md:p-10 min-h-[100px] md:min-h-[300px] w-full max-w-[110px] md:max-w-none mx-auto shadow-xl">
          <span className="text-neutral-900 text-base md:text-4xl font-normal">
            3.
            <br />
            Get{" "}
          </span>
          <span className="text-neutral-900 text-base md:text-4xl font-bold mt-2">
            alert!
          </span>
        </div>
      </section>
      {/* Talk to us on Section */}
      <section className="w-full bg-white rounded-3xl flex flex-col md:flex-row items-start md:items-center py-10 md:py-16 px-4 md:px-10 shadow-xl gap-4 md:gap-10">
        <span className="text-neutral-900 text-3xl md:text-6xl lg:text-8xl font-bold">
          Talk to us on:
        </span>
        <span className="text-indigo-500 text-3xl md:text-6xl lg:text-8xl font-bold mt-2 md:mt-0">
          Twitter
        </span>
      </section>
    </div>
  </div>
);

export default page;
