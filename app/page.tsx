"use client"

import { Button } from "@/components/ui/button";
import { useConnect } from "wagmi";

export default function Home() {
  const { connect, connectors } = useConnect()
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <p className="text-2xl font-bold">Available Connectors:</p>
      {connectors.map((connector) => (
        <div key={connector.id} className="flex flex-col gap-2 items-center justify-center">
          {connector.icon && <img src={connector.icon} className="w-10 h-10" alt="icon" />}
          <Button onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
