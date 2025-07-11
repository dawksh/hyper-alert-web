"use client";
import { Position as BasePosition, usePositions } from "@/hooks/usePositions";
import { useUser } from "@/hooks/useUser";
import { FilterIcon, HistoryIcon, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { queryClient } from "../shared/ProviderLayout";
import { Button } from "../ui/button";
import { MobileSection } from "@/components/profile/MobileSection";
import { motion } from "framer-motion";

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
    <div className="w-full bg-red-500 rounded-2xl p-4 flex flex-row justify-between px-8 gap-4">
      <div className="flex flex-row items-end gap-4">
        <span className="text-white flex flex-col text-lg font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <span className="text-white text-6xl font-bold">{credits}</span>
        <span className="text-neutral-900 text-sm font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 py-1 ">
          <HistoryIcon className="w-4 h-4" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="text-white text-xl font-normal">
          Your Alerts are <br /> about to{" "}
          <span className="font-bold">finish!</span>
        </span>
        <span className="text-medium font-semibold bg-white text-neutral-900 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 py-4">
          <Link href="/profile">Topup</Link>
        </span>
      </div>
    </div>
  ) : credits === 0 ? (
    <div className="w-full bg-lime-400 rounded-2xl p-4 flex flex-row justify-between px-8 gap-4">
      <div className="flex flex-row items-end gap-4">
        <span className="text-neutral-900 flex flex-col text-lg font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <motion.span
          className="text-neutral-900 text-6xl font-bold cursor-pointer"
          onClick={handleBuzz}
          animate={buzz ? { x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0] } : { x: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          {credits}
        </motion.span>
        <span className="text-neutral-900 text-sm font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 py-1 ">
          <HistoryIcon className="w-4 h-4" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="text-neutral-900 text-xl font-normal">
          Get started with
          <br /> monthly alerts
        </span>
        <span className="text-medium font-semibold bg-[#2A2A2A] text-lime-400 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 py-4">
          <Link href="/profile">Buy Credits</Link>
        </span>
      </div>
    </div>
  ) : (
    <div className="w-full bg-lime-400 rounded-2xl p-4 flex flex-row justify-between px-8 gap-4">
      <div className="flex flex-row items-end gap-4">
        <span className="text-neutral-900 flex flex-col text-lg font-semibold">
          <span>Available</span>
          <span>Credits</span>
        </span>
        <span className="text-neutral-900 text-6xl font-bold">{credits}</span>
        <span className="text-neutral-900 text-sm font-semibold border-1 bg-white cursor-pointer flex flex-row items-center gap-1 rounded-xl px-2 py-1 ">
          <HistoryIcon className="w-4 h-4" />
          <Link href="/history"> Alert history</Link>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="text-neutral-900 text-xl font-normal">
          Planning to go <br /> ballistic in trades?
        </span>
        <span className="text-medium font-semibold bg-[#2A2A2A] text-lime-400 cursor-pointer flex flex-row items-center gap-1 rounded-sm px-4 py-4">
          <Link href="/profile">Buy Credits</Link>
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
    await axios.delete("/api/alerts", { data: [positionId] });
    queryClient.invalidateQueries({ queryKey: ["activeAlerts"] });
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
  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center overflow-x-hidden py-1 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 gap-1">
      {(!user?.credits?.length || user?.credits?.[0]?.credits === 0 || !user?.pd_id) && (
        <MobileSection mobileNumber={user?.pd_id} id={user?.id} />
      )}
      <CreditsCard credits={credits} buzz={buzz} setBuzz={setBuzz} />
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-white rounded-2xl flex items-center justify-center h-16 w-[10vw]"
          onClick={() =>
            !filterTabOpen
              ? (setFilterTabVisible(true),
                setTimeout(() => setFilterTabOpen(true), 10))
              : (setFilterTabOpen(false),
                setTimeout(() => setFilterTabVisible(false), 300))
          }
        >
          <FilterIcon className="w-8 h-8 text-neutral-900 cursor-pointer" />
        </button>
      </div>
      {filterTabVisible && (
        <div
          className={`w-full bg-lime-400 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-500 ease-in-out ${
            filterTabOpen ? "h-20" : "h-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative">
              <Button
                variant="outline"
                className="w-36 justify-between"
                onClick={() => setStatusOpen((o) => !o)}
                type="button"
              >
                {activeFilter === "active"
                  ? "Active"
                  : activeFilter === "inactive"
                  ? "Inactive"
                  : "Alert Status"}
                <svg
                  className="ml-2 w-4 h-4"
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
                <div className="absolute left-0 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  {["Status", "Active", "Inactive"].map((v, i) => (
                    <button
                      key={v}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
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
                className="w-36 justify-between"
                onClick={() => setDirectionOpen((o) => !o)}
                type="button"
              >
                {directionFilter === "long"
                  ? "Long"
                  : directionFilter === "short"
                  ? "Short"
                  : "Direction"}
                <svg
                  className="ml-2 w-4 h-4"
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
                <div className="absolute left-0 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]">
                  {["Direction", "Long", "Short"].map((v, i) => (
                    <button
                      key={v}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
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
      <div className="w-full bg-indigo-500 rounded-3xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-8 gap-4 text-white text-md font-semibold px-8 h-8 items-center">
          {[
            "Asset",
            "Size",
            "Leverage",
            "Collateral",
            "Entry",
            "Liquidation Price",
            "Buffer",
            "Alert",
          ].map((v) => (
            <div key={v}>{v}</div>
          ))}
        </div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 bg-white rounded-2xl px-8 h-16 items-center animate-pulse"
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="h-6 w-full bg-zinc-200 rounded" />
              ))}
            </div>
          ))
        ) : withBuffer.length === 0 ? (
          <div className="text-white text-lg text-center font-medium">
            No positions found
          </div>
        ) : (
          withBuffer.map((p, i) => (
            <div
              key={i}
              className={`flex rounded-xl flex-col ${
                p.bufferPercent < 10 ? "bg-red-500" : "bg-white"
              }`}
            >
              <div
                className={`grid grid-cols-8 gap-4 rounded-2xl px-8 h-16 items-center mb-4:last:mb-0 `}
              >
                <div className="text-neutral-900 text-lg font-bold flex flex-col">
                  {p.asset}
                  <span
                    className={`text-neutral-500 text-xs font-medium ${
                      p.bufferPercent < 30
                        ? "text-neutral-800"
                        : "text-neutral-900"
                    }`}
                  >
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
                <div className="text-neutral-900 text-lg">
                  ${p.bufferAmount.toFixed(2)} ({p.bufferPercent.toFixed(2)}%)
                </div>
                <div className="flex justify-start">
                  <motion.button
                    className={`w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${
                      p.isActive
                        ? "bg-red-600 disabled:bg-red-600"
                        : "bg-neutral-400 disabled:bg-neutral-400"
                    } flex items-center px-1`}
                    onClick={() =>
                      p.isActive ? deleteAlerts(p?.id || "") : createAlert(p, i)
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
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        p.isActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></span>
                  </motion.button>
                </div>
              </div>
              {p.bufferPercent < 10 && (
                <div className="bg-white rounded-lg p-2 flex justify-center text-md font-medium text-neutral-900 mb-2 mx-4">
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
