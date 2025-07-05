"use client"

import Positions from "@/components/home/Positions";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";

export default function Home() {
  const { isConnected } = useAccount()
  const { data: session } = useSession()
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-start h-screen">
      {(!isConnected || !session?.address) && <p>Connect your wallet to get started</p>} 
      {(!isConnected || !session?.address) && <ConnectButton />}
      {isConnected && session?.address && <Positions />}
      <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
    </div>
  );
}
