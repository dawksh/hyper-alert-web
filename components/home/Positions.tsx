"use client";
import { Position as BasePosition, usePositions } from "@/hooks/usePositions";
import { useUser } from "@/hooks/useUser";
import {  HistoryIcon, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { queryClient } from "../shared/ProviderLayout";
import { Button } from "../ui/button";
import { MobileSection } from "@/components/profile/MobileSection";
import { motion } from "framer-motion";
import FilterIcon from "../Icons/FilterIcon";

type Position = BasePosition & { isActive: boolean; id: string };
type FilterDirection = "all" | "long" | "short";
type FilterStatus = "all" | "active" | "inactive";

const filterPositions = (
  positions: Position[] | undefined,
  active: FilterStatus,
  direction: FilterDirection,
  search: string
) =>
  positions?.filter(
    (p: Position) =>
      (active === "all" || (active === "active" ? p.isActive : !p.isActive)) &&
      (direction === "all" || p.direction.toLowerCase() === direction) &&
      (search === "" ||
        [p.asset, p.entryPrice, p.direction].some((v) =>
          v.toString().toLowerCase().includes(search.toLowerCase())
        ))
  );

const CreditsCard = ({
  credits,
  buzz,
  setBuzz,
}: {
  credits: number;
  buzz?: boolean;
  setBuzz?: (b: boolean) => void;
}) => {
  const handleBuzz = () =>
    credits === 0 && setBuzz?.(true) && setTimeout(() => setBuzz(false), 300);
  return credits > 0 && credits < 10 ? (
    <div className="w-full bg-red-500 rounded-2xl p-4 2xl:p-8 flex flex-row justify-between px-8 2xl:px-16 gap-4 2xl:gap-8">
      <div className="flex flex-row items-end gap-4 2xl:gap-8">
        <span className="text-white flex flex-col text-lg 2xl:text-3xl font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <span className="text-white text-6xl 2xl:text-8xl font-bold">{credits}</span>
        <span className="text-neutral-900 text-sm 2xl:text-lg font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 2xl:px-4 py-1 2xl:py-2 ">
          <HistoryIcon className="w-4 h-4 2xl:w-8 2xl:h-8" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4 2xl:gap-8">
        <span className="text-white text-xl 2xl:text-4xl font-normal">
          Your Alerts are <br /> about to{" "}
          <span className="font-bold">finish!</span>
        </span>
        <span className="text-lg 2xl:text-2xl font-semibold bg-white text-neutral-900 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 2xl:px-8 py-4 2xl:py-6">
          <Link href="/profile?buy=true">Topup</Link>
        </span>
      </div>
    </div>
  ) : credits === 0 ? (
    <div className="w-full bg-lime-400 rounded-2xl p-4 2xl:p-8 flex flex-row justify-between px-8 2xl:px-16 gap-4 2xl:gap-8">
      <div className="flex flex-row items-end gap-4 2xl:gap-8">
        <span className="text-neutral-900 flex flex-col text-lg 2xl:text-3xl font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <motion.span
          className="text-neutral-900 text-6xl 2xl:text-8xl font-bold cursor-pointer"
          onClick={handleBuzz}
          animate={buzz ? { x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0] } : { x: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          {credits}
        </motion.span>
        <span className="text-neutral-900 text-sm 2xl:text-lg font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 2xl:px-4 py-1 2xl:py-2 ">
          <HistoryIcon className="w-4 h-4 2xl:w-6 2xl:h-6" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4 2xl:gap-8">
        <span className="text-neutral-900 text-xl 2xl:text-4xl font-normal">
          Get started with
          <br /> monthly alerts
        </span>
        <span className="text-lg 2xl:text-2xl font-semibold bg-[#2A2A2A] text-lime-400 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 2xl:px-8 py-4 2xl:py-6">
          <Link href="/profile?buy=true">Buy Credits</Link>
        </span>
      </div>
    </div>
  ) : (
    <div className="w-full bg-lime-400 rounded-2xl p-4 2xl:p-8 flex flex-row justify-between px-8 2xl:px-16 gap-4 2xl:gap-8">
      <div className="flex flex-row items-end gap-4 2xl:gap-8">
        <span className="text-neutral-900 flex flex-col text-lg 2xl:text-3xl font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <span className="text-neutral-900 text-6xl 2xl:text-8xl font-bold">{credits}</span>
        <span className="text-neutral-900 text-sm 2xl:text-lg font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 2xl:px-4 py-1 2xl:py-2 ">
          <HistoryIcon className="w-4 h-4 2xl:w-6 2xl:h-6" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4 2xl:gap-8">
        <span className="text-neutral-900 text-xl 2xl:text-4xl font-normal">
          Planning to go <br /> ballistic in trades?
        </span>
        <span className="text-lg 2xl:text-2xl font-semibold bg-[#2A2A2A] text-lime-400 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 2xl:px-8 py-4 2xl:py-6">
          <Link href="/profile?buy=true">Buy Credits</Link>
        </span>
      </div>
    </div>
  );
};

const Positions = () => {
  const { data: positions, isLoading } = usePositions();
  const { data: user } = useUser();
  const router = useRouter();
  const [credits, setCredits] = useState<number>(
    user?.credits?.[0]?.credits || 0
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTabOpen, setFilterTabOpen] = useState<boolean>(false);
  const [filterTabVisible, setFilterTabVisible] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [directionFilter, setDirectionFilter] =
    useState<FilterDirection>("all");
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [directionOpen, setDirectionOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [buzz, setBuzz] = useState<boolean>(false);
  const [sort, setSort] = useState<{ key: "buffer" | "size" | null; order: "asc" | "desc" | null }>({ key: null, order: null });
  useEffect(
    () => setCredits(user?.credits?.[0]?.credits || 0),
    [user?.credits]
  );
  const createAlert = async (p: Position, idx: number) => {
    if (!credits) {
      setShakeIndex(idx);
      setBuzz(true);
      setTimeout(() => setShakeIndex(null), 600);
      setTimeout(() => setBuzz(false), 300);
      toast.error(
        "You don't have any credits. Please buy some credits to create alerts."
      );
      return;
    }
    if (
      user?.telegram_id &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        user.telegram_id
      ) &&
      !user?.pd_id
    ) {
      toast.error(
        "Please connect your Telegram or Phone number to create alerts."
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
    await axios.delete("/api/alerts", { data: positionId });
    queryClient.invalidateQueries({ queryKey: ["activeAlerts", user?.address] });
    setLoading(false);
  };
  const filtered = filterPositions(
    positions as Position[] | undefined,
    activeFilter,
    directionFilter,
    search
  );
  const withBuffer = (filtered ?? []).map((p) => {
    const entry = Number(p.entryPrice);
    const liq = Number(p.liquidationPrice);
    const bufferAmount = liq - entry;
    const bufferPercent = entry !== 0 ? ((liq - entry) / entry) * 100 : 0;
    return { ...p, bufferAmount, bufferPercent };
  });
  const handleSort = (key: "buffer" | "size") => {
    setSort((prev) => {
      if (prev.key !== key) return { key, order: "asc" };
      if (prev.order === "asc") return { key, order: "desc" };
      if (prev.order === "desc") return { key: null, order: null };
      return { key, order: "asc" };
    });
  };
  const sorted = sort.key
    ? [...(withBuffer ?? [])].sort((a, b) => {
        const vA = sort.key === "size" ? Math.abs(Number(a.size)) : a.bufferAmount;
        const vB = sort.key === "size" ? Math.abs(Number(b.size)) : b.bufferAmount;
        return sort.order === "asc" ? vA - vB : vB - vA;
      })
    : withBuffer;
  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-1 px-1 sm:px-2 md:px-3 2xl:px-4 gap-1">
      {(!user?.credits?.length || user?.credits?.[0]?.credits === 0 || !user?.pd_id) && (
        <MobileSection mobileNumber={user?.pd_id} id={user?.id} />
      )}
      <CreditsCard credits={credits} buzz={buzz} setBuzz={setBuzz} />
      <div className="w-full flex gap-1 items-center">
        <div className="rounded-xl flex justify-center items-center px-24 2xl:px-48 w-[60vw] h-16 2xl:h-28 bg-indigo-500">
          <span className="text-white text-xl 2xl:text-3xl font-normal">Set your alerts here</span>
        </div>
        <div className="flex items-center justify-center bg-white rounded-2xl px-6 2xl:px-12 h-16 2xl:h-28 w-[40vw]">
          <Search className="w-8 h-8 2xl:w-12 2xl:h-12 text-gray-500 mr-4" />
          <input
            type="text"
            placeholder="Search your trade"
            className="w-full bg-transparent outline-none text-neutral-500 text-xl 2xl:text-3xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-white rounded-2xl flex items-center justify-center h-16 2xl:h-28 w-[10vw]"
          onClick={() =>
            !filterTabOpen
              ? (setFilterTabVisible(true),
                setTimeout(() => setFilterTabOpen(true), 10))
              : (setFilterTabOpen(false),
                setTimeout(() => setFilterTabVisible(false), 300))
          }
        >
          <FilterIcon className="w-8 h-8 2xl:w-12 2xl:h-12 text-neutral-900 cursor-pointer" />
        </button>
      </div>
      {filterTabVisible && (
        <div
          className={`w-full bg-lime-400 rounded-3xl p-6 2xl:p-12 flex flex-col gap-4 2xl:gap-8 transition-all duration-500 ease-in-out ${
            filterTabOpen ? "h-20 2xl:h-32" : "h-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 2xl:gap-8 w-full">
            <div className="relative">
              <Button
                variant="outline"
                className="w-36 2xl:w-56 justify-between 2xl:text-2xl"
                onClick={() => setStatusOpen((o) => !o)}
                type="button"
              >
                {activeFilter === "active"
                  ? "Active"
                  : activeFilter === "inactive"
                  ? "Inactive"
                  : "Alert Status"}
                <svg
                  className="ml-2 w-4 h-4 2xl:w-6 2xl:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              {statusOpen && (
                <div className="absolute left-0 mt-2 w-36 2xl:w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  {["Status", "Active", "Inactive"].map((v, i) => (
                    <button
                      key={v}
                      className="w-full px-4 py-2 2xl:px-6 2xl:py-4 text-left hover:bg-gray-100 2xl:text-xl"
                      onClick={() => {
                        setActiveFilter(
                          v.toLowerCase() === "status"
                            ? "all"
                            : (v.toLowerCase() as FilterStatus)
                        );
                        setStatusOpen(false);
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant="outline"
                className="w-36 2xl:w-56 justify-between 2xl:text-2xl"
                onClick={() => setDirectionOpen((o) => !o)}
                type="button"
              >
                {directionFilter === "long"
                  ? "Long"
                  : directionFilter === "short"
                  ? "Short"
                  : "Direction"}
                <svg
                  className="ml-2 w-4 h-4 2xl:w-6 2xl:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              {directionOpen && (
                <div className="absolute left-0 mt-2 w-36 2xl:w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  {["Direction", "Long", "Short"].map((v, i) => (
                    <button
                      key={v}
                      className="w-full px-4 py-2 2xl:px-6 2xl:py-4 text-left hover:bg-gray-100 2xl:text-xl"
                      onClick={() => {
                        setDirectionFilter(
                          v.toLowerCase() === "direction"
                            ? "all"
                            : (v.toLowerCase() as FilterDirection)
                        );
                        setDirectionOpen(false);
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full bg-indigo-500 rounded-3xl p-6 flex flex-col gap-4 ">
        <div className="grid grid-cols-8 gap-4 2xl:gap-8 text-white text-md 2xl:text-2xl font-semibold px-8 2xl:px-16 h-8 2xl:h-16 items-center">
          {[
            "Asset",
            "Size",
            "Leverage",
            "Collateral",
            "Entry Price",
            "Mark Price",
            "Liq. Price",
            "Alert",
          ].map((v, idx) =>
            idx === 1 ? (
              <div
                key={v}
                className="cursor-pointer select-none flex items-center gap-1"
                onClick={() => handleSort("size")}
              >
                {v}
                {sort.key === "size" &&
                  (sort.order === "asc"
                    ? "↑"
                    : sort.order === "desc"
                    ? "↓"
                    : "")}
              </div>
            ) : idx === 6 ? (
              <div
                key={v}
                className="cursor-pointer select-none flex items-center gap-1"
                onClick={() => handleSort("buffer")}
              >
                {v}
                {sort.key === "buffer" &&
                  (sort.order === "asc"
                    ? "↑"
                    : sort.order === "desc"
                    ? "↓"
                    : "")}
              </div>
            ) : (
              <div key={v}>{v}</div>
            )
          )}
        </div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 2xl:gap-8 bg-white rounded-2xl px-8 2xl:px-16 h-16 2xl:h-24 items-center animate-pulse"
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="h-6 2xl:h-10 w-full bg-zinc-200 rounded" />
              ))}
            </div>
          ))
        ) : sorted.length === 0 ? (
          <div className="bg-white rounded-2xl px-8 2xl:px-16 py-8 2xl:py-16 text-lg 2xl:text-3xl text-center font-medium text-neutral-900 w-full flex items-center justify-center">
            No positions found
          </div>
        ) : (
          sorted.map((p, i) => (
            <div
              key={i}
              className={`flex rounded-xl flex-col ${
                p.bufferPercent < 10 ? "bg-red-500" : "bg-white"
              }`}
            >
              <div
                className={`grid grid-cols-8 gap-4 2xl:gap-8 rounded-2xl px-8 2xl:px-16 h-16 2xl:h-24 items-center mb-4:last:mb-0 `}
              >
                <div className="text-neutral-900 text-lg 2xl:text-3xl font-bold flex flex-col">
                  {p.asset}
                  <span
                    className={`text-neutral-500 text-xs 2xl:text-lg font-medium ${
                        "text-indigo-500"
                    }`}
                  >
                    {p.direction.toUpperCase()}
                  </span>
                </div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">
                  {Math.abs(Number(p.size))}
                </div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">
                  {p.leverage.value}x {p.leverage.type}
                </div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">
                  $ {Number(p.collateral).toFixed(2)}
                </div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">{p.entryPrice}</div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">
                  ${Number(p.markPrice).toFixed(2)}
                </div>
                <div className="text-neutral-900 text-lg 2xl:text-3xl">
                  $ {Number(p.liquidationPrice).toFixed(2)}
                </div>
                {/* Slider */}
                <div className="flex justify-start">
                  <motion.button
                    className={`w-10 2xl:w-16 h-6 2xl:h-10 rounded-full transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${
                      p.isActive
                        ? p.bufferPercent < 10 ? "bg-red-600 disabled:bg-red-600" : "bg-green-600 disabled:bg-green-600"
                        : "bg-neutral-400 disabled:bg-neutral-400"
                    } flex items-center px-1 2xl:px-2`}
                    onClick={() =>
                      p.isActive ? deleteAlerts(p?.id) : createAlert(p, i)
                    }
                    disabled={loading}
                    animate={
                      shakeIndex === i
                        ? { x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.3, type: "tween" }}
                  >
                    <span
                      className={`w-4 2xl:w-6 h-4 2xl:h-6 rounded-full bg-white transition-transform duration-200 ${
                        p.isActive ? "translate-x-4 2xl:translate-x-6" : "translate-x-0"
                      }`}
                    ></span>
                  </motion.button>
                </div>
              </div>
              {p.bufferPercent < 10 && (
                <div className="bg-white rounded-lg p-2 2xl:p-4 flex justify-center text-md 2xl:text-2xl font-medium text-neutral-900 mb-2 2xl:mb-4 mx-4 2xl:mx-8">
                  This trade is at Risk! Go to&nbsp;
                  <Link
                    href="https://app.hyperliquid.xyz"
                    className="underline font-bold"
                    target="_blank"
                  >
                    Hyperliquid
                  </Link>
                  &nbsp;to prevent liquidation.
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Positions;
