"use client";
import React from "react";
import { useAlerts } from "@/hooks/useActiveAlerts";
import clsx from "clsx";
import { abbreviateNumber } from "@/lib/utils";


const History = () => {
  const { data: alerts } = useAlerts();
  return (
    <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-1 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5">
      <div className="flex flex-row justify-between items-center bg-lime-400 rounded-2xl p-8 w-full mb-1 h-fit ">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-900 text-8xl 2xl:text-[12rem] font-bold">Alert</span>
          <span className="text-neutral-900 text-8xl 2xl:text-[12rem] font-bold">History</span>
        </div>
        <div className="flex flex-row gap-1">
          {[
            {
              label: "Total Alerts Sent",
              value: alerts?.length,
            },
            {
              label: "Liquidations Saved",
              value: alerts?.filter(a => a.acknowledged && a.last_alert).length,
            },
            {
              label: "Total Funds Saved",
              value: `$${abbreviateNumber(Number(alerts?.filter(a => a.acknowledged && a.last_alert).reduce((acc, a) => acc + a.margin, 0).toFixed(2)))}`,
            },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className="flex flex-col justify-between gap-1 bg-neutral-900 rounded-2xl py-8 md:py-12 2xl:py-20 px-4 2xl:px-8 w-[20vw] 2xl:w-[25vw] min-h-[18rem] 2xl:min-h-[28rem]"
            >
              <div className="text-white text-3xl 2xl:text-6xl font-semibold max-w-[80%]">{label}</div>
              <div className="text-white text-6xl 2xl:text-[8rem] font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-indigo-500 rounded-3xl p-6 2xl:p-12 flex flex-col gap-2 2xl:gap-4">
        <div className="grid grid-cols-8 gap-2 2xl:gap-4 text-white text-md 2xl:text-2xl font-semibold px-8 2xl:px-16 h-8 2xl:h-16 items-center">
          <div>Asset</div>
          <div>Size</div>
          <div>Margin</div>
          <div>Liq. Price</div>
          <div>Alert Price</div>
          <div>Margin %</div>
          <div>Time</div>
          <div>Acknowledged</div>
        </div>
        {alerts?.length === 0 ? (
          <div className="bg-white rounded-2xl px-8 2xl:px-16 py-8 2xl:py-16 text-lg 2xl:text-3xl text-center font-medium text-neutral-900 w-full flex items-center justify-center">
          No History Found
        </div>
        ) : (
          alerts?.filter(a => a.last_alert).map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-2 2xl:gap-4 bg-white rounded-2xl px-8 2xl:px-16 h-16 2xl:h-24 items-center mb-2:last:mb-0"
            >
              <div className="text-neutral-900 text-lg 2xl:text-3xl font-bold flex flex-col">
                {row.coin}
                <span className="text-neutral-500 text-xs 2xl:text-lg font-medium">
                  {row.direction}
                </span>
              </div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">{Math.abs(row.size).toFixed(2)}</div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">${row.margin.toFixed(2)}</div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">${row.liq_price.toFixed(2)}</div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">{row.last_price ? row.last_price.toFixed(2) : '-'}</div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">{row.last_price ? (row.last_price - row.liq_price).toFixed(2) : '-'}</div>
              <div className="text-neutral-900 text-lg 2xl:text-3xl">
                {row.last_alert ? new Date(row.last_alert).toLocaleString("en-IN", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "-"}
              </div>
              <div
                className={clsx(row.acknowledged ? "text-green-600" : "text-red-600", "font-bold", "text-lg", "2xl:text-3xl")}
              >
                {row.acknowledged ? "YES" : "NO"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
