"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
    const { address } = useAccount();
    const { data: session } = useSession()
    const { data: user } = useUser()
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 border-b">
            <Link href="/">
                <span className="text-lg font-semibold">hyper-alert</span>
            </Link>
            {address && session?.address && (
                <div className="flex items-center gap-2">
                    {user?.credits.length === 0 ? (
                        <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                            <Link href="/checkout" className="flex items-center gap-2">
                                <span>💎</span>
                                <span>Buy Credits</span>
                            </Link>
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg">
                            <span className="text-green-600 font-semibold">{user?.credits[0].credits}</span>
                            <span className="text-green-500 text-sm">credits</span>
                        </div>
                    )}
                    <Button variant="outline">
                        <Link href="/profile">profile</Link>
                    </Button>
                    <ConnectButton accountStatus="avatar" />
                </div>
            )}
        </nav>
    );
}
