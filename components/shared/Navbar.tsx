"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Navbar() {
    const { address } = useAccount();
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 border-b">
            <Link href="/">
                <span className="text-lg font-semibold">hyper-alert</span>
            </Link>
            {address && (
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Link href="/profile">edit profile</Link>
                    </Button>
                    <ConnectButton accountStatus="address" />
                </div>
            )}
        </nav>
    );
}
