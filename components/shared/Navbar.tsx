"use client";

import Link from "next/link";
import ConnectButtonCustom from "./ConnectButtonCustom";
import PerpAlertLogo from "../Icons/PerpAlertLogo";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const isConnected = !!session?.address;
  const pathname = usePathname();
  return (
    <nav className="w-full flex flex-row justify-center items-center bg-zinc-900 px-1 sm:px-2 md:px-4 2xl:px-5 pt-2 sm:pt-3 md:pt-2 gap-x-1">
      <div className="flex flex-row items-center gap-1 w-full">
        {/* Perp Alert Logo */}
        <div className={`bg-zinc-800 rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-[10vh] md:h-[15vh] 2xl:h-[12vh] flex items-center justify-center`}>
          <Link href="/">
            <span className="flex flex-col items-center">
              <PerpAlertLogo className="w-[50%] h-[50%] md:w-[50%] md:h-[50%] 2xl:w-[75%] 2xl:h-[75%]" />
            </span>
          </Link>
        </div>
        {/* Pricing */}
        {!isConnected && (
          <div className="bg-white rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-[10vh] md:h-[15vh] 2xl:h-[12vh] flex items-center justify-center">
            <Link href="/pricing">
              <span className="flex flex-col items-center">
                <span className="text-neutral-900 text-md md:text-2xl 2xl:text-4xl hover:text-[#6F52FF] font-semibold">
                  Pricing
                </span>
              </span>
            </Link>
          </div>
        )}
        {/* Position */}
        {isConnected && (
          <div className={`rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-[10vh] md:h-[15vh] 2xl:h-[12vh] flex items-center justify-center transition-all duration-300 ${pathname === "/app" ? "bg-[#C4C4C4] text-[#737373]" : "bg-white text-neutral-900 hover:text-[#6F52FF]"}`}>
            <Link href="/app">
              <span className="flex flex-col items-center">
                <span className="text-md md:text-2xl 2xl:text-4xl font-semibold transition-all duration-300">
                  Positions
                </span>
              </span>
            </Link>
          </div>
        )}
        {/* Profile */}
        {isConnected && (
          <div className={`rounded-md px-3 sm:px-4 md:px-7 py-0 w-full sm:w-2/5 md:w-2/5 h-[10vh] md:h-[15vh] 2xl:h-[12vh] flex items-center justify-center transition-all duration-300 ${pathname === "/profile" ? "bg-[#C4C4C4] text-[#737373]" : "bg-white text-neutral-900 hover:text-[#6F52FF]"}`}>
            <Link href="/profile">
              <span className="flex flex-col items-center">
                <span className="text-md md:text-2xl 2xl:text-4xl font-semibold">
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
