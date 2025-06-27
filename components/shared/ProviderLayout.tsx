"use client"

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

function ProviderLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider coolMode={true} showRecentTransactions={true}>
                        {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    )
}

export default ProviderLayout