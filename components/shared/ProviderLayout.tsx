"use client"

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';

import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

export const queryClient = new QueryClient()

function ProviderLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <SessionProvider>
                    <RainbowKitSiweNextAuthProvider getSiweMessageOptions={() => {
                        return {
                            domain: window.location.host,
                            statement: "Sign in with Ethereum to the app.",
                            uri: window.location.origin,
                        }
                    }}>
                    <RainbowKitProvider coolMode={true} showRecentTransactions={true}>
                        {children}
                    </RainbowKitProvider>
                    </RainbowKitSiweNextAuthProvider>
                    </SessionProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    )
}

export default ProviderLayout