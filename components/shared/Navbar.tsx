"use client";

import Link from "next/link";
import ConnectButtonCustom from "./ConnectButtonCustom";
import PerpAlertLogo from "../Icons/PerpAlertLogo";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const isConnected = !!session?.address;
  return (
    <nav className="w-full flex flex-row justify-center items-center bg-zinc-900 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 pt-2 sm:pt-3 md:pt-4 gap-x-2">
      <div className="flex flex-row items-center gap-1 w-full">
        {/* Perp Alert Logo */}
        <div className="bg-zinc-800 rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-1/5 md:w-1/5 h-20 flex items-center justify-center">
          <Link href="/">
            <span className="flex flex-col items-center">
              <PerpAlertLogo className="w-3/4 h-3/4" />
            </span>
          </Link>
        </div>
        {/* Pricing */}
        {!isConnected && (
          <div className="bg-white rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-20 flex items-center justify-center">
            <Link href="/pricing">
              <span className="flex flex-col items-center">
                <span className="text-neutral-900 text-sm sm:text-base md:text-xl font-semibold">
                  Pricing
                </span>
              </span>
            </Link>
          </div>
        )}
        {/* Profile */}
        {isConnected && (
          <div className="bg-white rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-20 flex items-center justify-center">
            <Link href="/profile">
              <span className="flex flex-col items-center">
                <span className="text-neutral-900 text-sm sm:text-base md:text-xl font-semibold">
                  Profile
                </span>
              </span>
            </Link>
          </div>
        )}
        {/* Connect Button */}
        <div className="w-full">
          <ConnectButtonCustom />
        </div>
      </div>
    </nav>
  );
}
