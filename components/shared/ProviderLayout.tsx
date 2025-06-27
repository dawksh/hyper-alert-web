"use client"

import '@rainbow-me/rainbowkit/styles.css';

import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient()

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Sign in to my hyper-alert',
});

function ProviderLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <WagmiProvider config={config}>
                <SessionProvider refetchInterval={0}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
                            <RainbowKitProvider coolMode={true} showRecentTransactions={true}>
                                {children}
                            </RainbowKitProvider>
                        </RainbowKitSiweNextAuthProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </WagmiProvider>
        </div>
    )
}

export default ProviderLayout