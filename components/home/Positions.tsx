"use client";
import { Position, usePositions } from "@/hooks/usePositions";
import { useUser } from "@/hooks/useUser";
import { FilterIcon, HistoryIcon, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { queryClient } from "../shared/ProviderLayout";
import { Button } from "../ui/button";
import { MobileSection } from "@/app/profile/page";

const Positions = () => {
  const { data: positions, isLoading } = usePositions();
  const { data: user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filterTabOpen, setFilterTabOpen] = useState(false)
  const [filterTabVisible, setFilterTabVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [directionFilter, setDirectionFilter] = useState<string>("all")
  const [statusOpen, setStatusOpen] = useState(false)
  const [directionOpen, setDirectionOpen] = useState(false)
  const [search, setSearch] = useState("")

  const createAlert = async (p: Position) => {
    if (
      user?.telegram_id &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        user.telegram_id
      ) &&
      !user?.pd_id
    ) {
      toast.error(
        "Please connect your Telegram or PD account to create alerts."
      );
      router.push("/profile");
      return;
    }
    setLoading(true);
    await axios.post("/api/alerts", {
      alerts: [
        {
          asset: p.asset,
          liqPrice: p.liquidationPrice,
          direction: p.direction.toLowerCase(),
          address: user?.address,
          size: p.size,
          margin: p.collateral,
          leverage: p.leverage.value.toString(),
        },
      ],
    });
    queryClient.invalidateQueries({ queryKey: ["activeAlerts"] });
    setLoading(false);
  };

  const deleteAlerts = async (positionId: string) => {
    setLoading(true);
    await axios.delete("/api/alerts", { data: [positionId] });
    queryClient.invalidateQueries({ queryKey: ["activeAlerts"] });
    setLoading(false);
  };

  const filteredPositions = positions?.filter(p =>
    (activeFilter === "all" || (activeFilter === "active" ? p.isActive : !p.isActive)) &&
    (directionFilter === "all" || p.direction.toLowerCase() === directionFilter) &&
    (search === "" || [p.asset, p.entryPrice, p.direction].some(v => v.toString().toLowerCase().includes(search.toLowerCase())))
  )

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-2 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 gap-1">
      {(!user?.credits.length ||  user?.credits[0].credits === 0) && <MobileSection mobileNumber={user?.pd_id} id={user?.id} />}
      <CreditsCard />
      <div className="w-full flex gap-1 items-center">
        <div className="rounded-xl flex justify-center items-center px-24 w-[60vw] h-16 bg-indigo-500">
          <span className="text-white text-xl font-normal">Your Positions</span>
        </div>
        <div className="flex items-center justify-center bg-white rounded-2xl px-6 h-16 w-[40vw]">
          <Search className="w-8 h-8 text-gray-500 mr-4" />
          <input
            type="text"
            placeholder="Search your trade"
            className="w-full bg-transparent outline-none text-neutral-500 text-xl"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-white rounded-2xl flex items-center justify-center h-16 w-[10vw]" onClick={() => {
          if (!filterTabOpen) {
            setFilterTabVisible(true)
            setTimeout(() => setFilterTabOpen(true), 10)
          } else {
            setFilterTabOpen(false)
            setTimeout(() => setFilterTabVisible(false), 300)
          }
        }}>
          <FilterIcon className="w-8 h-8 text-neutral-900 cursor-pointer" />
        </button>
      </div>
      {filterTabVisible && (
        <div className={`w-full bg-lime-400 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-500 ease-in-out ${filterTabOpen ? 'h-20' : 'h-0 pointer-events-none'}`}>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative">
              <Button
                variant="outline"
                className="w-36 justify-between"
                onClick={() => setStatusOpen(o => !o)}
                type="button"
              >
                {activeFilter === "active"
                  ? "Active"
                  : activeFilter === "inactive"
                  ? "Inactive"
                  : "Alert Status"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </Button>
              {statusOpen && (
                <div className="absolute left-0 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setActiveFilter("all"); setStatusOpen(false); }}>Status</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setActiveFilter("active"); setStatusOpen(false); }}>Active</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setActiveFilter("inactive"); setStatusOpen(false); }}>Inactive</button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant="outline"
                className="w-36 justify-between"
                onClick={() => setDirectionOpen(o => !o)}
                type="button"
              >
                {directionFilter === "long"
                  ? "Long"
                  : directionFilter === "short"
                  ? "Short"
                  : "Direction"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </Button>
              {directionOpen && (
                <div className="absolute left-0 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setDirectionFilter("all"); setDirectionOpen(false); }}>Direction</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setDirectionFilter("long"); setDirectionOpen(false); }}>Long</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setDirectionFilter("short"); setDirectionOpen(false); }}>Short</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full bg-indigo-500 rounded-3xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-8 gap-4 text-white text-md font-semibold px-8 h-8 items-center">
          <div>Asset</div>
          <div>Size</div>
          <div>Leverage</div>
          <div>Collateral</div>
          <div>Entry</div>
          <div>Liquidation Price</div>
          <div>Buffer</div>
          <div>Alert</div>
        </div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-8 gap-4 bg-white rounded-2xl px-8 h-16 items-center animate-pulse">
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="h-6 w-full bg-zinc-200 rounded" />
              ))}
            </div>
          ))
        ) : filteredPositions?.length === 0 ? (
          <div className="text-white text-lg text-center font-medium">
            No positions found
          </div>
        ) : (
          (filteredPositions ?? []).map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 bg-white rounded-2xl px-8 h-16 items-center mb-4:last:mb-0"
            >
              <div className="text-neutral-900 text-lg font-bold flex flex-col">
                {p.asset}
                <span className="text-neutral-500 text-xs font-medium">
                  {p.direction.toUpperCase()}
                </span>
              </div>
              <div className="text-neutral-900 text-lg">
                {Math.abs(Number(p.size))}
              </div>
              <div className="text-neutral-900 text-lg">
                {p.leverage.value}x {p.leverage.type}
              </div>
              <div className="text-neutral-900 text-lg">
                $ {Number(p.collateral).toFixed(2)}
              </div>
              <div className="text-neutral-900 text-lg">{p.entryPrice}</div>
              <div className="text-neutral-900 text-lg">
                $ {Number(p.liquidationPrice).toFixed(2)}
              </div>
              <div className="text-neutral-900 text-lg">${(Number(p.liquidationPrice) - Number(p.entryPrice)).toFixed(2)} ({((Number(p.liquidationPrice) - Number(p.entryPrice)) / Number(p.entryPrice) * 100).toFixed(2)}%)</div>
              <div className="flex justify-start">
                <button
                  className={`w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${
                    p.isActive
                      ? "bg-red-600 disabled:bg-red-600"
                      : "bg-neutral-400 disabled:bg-neutral-400"
                  } flex items-center px-1`}
                  onClick={() => {
                    p.isActive
                      ? deleteAlerts(p?.id || "")
                      : createAlert(p as Position);
                  }}
                  disabled={loading}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      p.isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CreditsCard = () => {
  const { data: user } = useUser();
  return (
    <div className="w-full bg-lime-400 rounded-2xl p-4 flex flex-row justify-between px-8 gap-4">
      <div className="flex flex-row items-end gap-4">
        <span className="text-neutral-900 flex flex-col text-lg font-semibold">
          <span className="text-neutral-900 text-lg font-semibold">Available</span>
          <span className="text-neutral-900 text-lg font-semibold">Credits</span>
        </span>
        <span className="text-neutral-900 text-6xl font-bold">{user?.credits?.length && user?.credits[0].credits || 0}</span>
        <span className="text-neutral-900 text-sm font-semibold border-1 bg-white cursor-pointer ` flex flex-row items-center gap-1 rounded-xl px-2 py-1 "> <HistoryIcon className="w-4 h-4" /><Link href="/history"> Alert history</Link></span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="text-neutral-900 text-xl font-normal">Get started with<br/> monthly alerts</span>
        <span className="text-medium font-semibold bg-[#2A2A2A] text-lime-400 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 py-4"><Link href="/pricing">Subscribe</Link></span>
      </div>
    </div>
  )
}

export default Positions;
