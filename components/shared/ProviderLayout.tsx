"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { WagmiProvider } from "wagmi";
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import { config } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export const queryClient = new QueryClient();

function ProviderLayout({ children }: { children: React.ReactNode }) {
  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: "Sign into LiquiAlerts",
    domain: window.location.host,
    uri: window.location.origin,
  });
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <RainbowKitProvider coolMode={true} showRecentTransactions={true}>
                {children}
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default ProviderLayout;
