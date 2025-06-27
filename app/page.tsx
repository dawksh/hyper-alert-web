"use client"

import Positions from "@/components/home/Positions";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount()
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-start h-screen">
      {!isConnected && <p>Connect your wallet to get started</p>}
      {!isConnected && <ConnectButton />}
      {isConnected && <Positions />}
    </div>
  );
}
