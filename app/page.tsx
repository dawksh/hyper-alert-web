"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount()
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-start h-screen">
      <h1 className="text-2xl font-bold">Hyper Alert</h1>
      {!isConnected && <p>Connect your wallet to get started</p>}
      {!isConnected && <ConnectButton />}
    </div>
  );
}
