"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useUser } from "@/hooks/useUser";
import ConnectButtonCustom from "./ConnectButtonCustom";

export default function Navbar() {
  const { address } = useAccount();
  const { data: session } = useSession();
  const { data: user } = useUser();

  return (
    <nav className="w-full flex flex-row justify-center items-center bg-zinc-900 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 pt-2 sm:pt-3 md:pt-4 gap-1">
      <div className="flex flex-row items-center gap-1 w-full">
        {/* Perp Alert Logo */}
        <div className="bg-zinc-800 rounded-md px-3 sm:px-4 md:px-7 py-2 sm:py-3 md:py-6 sm:w-1/3 md:w-1/5 h-12 sm:h-16 md:h-20 flex items-center justify-center">
          <Link href="/">
            <span className="flex flex-col items-center">
              <span className="text-lime-400 text-lg sm:text-2xl md:text-3xl font-black">
                Perp
              </span>
              <span className="text-white text-lg sm:text-2xl md:text-3xl font-black">
                alert
              </span>
            </span>
          </Link>
        </div>
        {/* Pricing */}
        <div className="bg-white rounded-md px-3 sm:px-4 md:px-7 py-2 sm:py-3 md:py-6 w-1/3 sm:w-2/3 md:w-2/5 h-12 sm:h-16 md:h-20 flex items-center justify-center">
          <Link href="/pricing">
            <span className="flex flex-col items-center">
              <span className="text-neutral-900 text-sm sm:text-base md:text-xl font-medium">
                Pricing
              </span>
            </span>
          </Link>
        </div>
        {/* Connect Button */}
        <div className="w-full">
        {!address || !session?.address ? <ConnectButtonCustom /> : null}
        </div>
      </div>
    </nav>
  );
}
