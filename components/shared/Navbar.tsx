import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold">hyper-alert</span>
            <ConnectButton accountStatus="address" />
        </nav>
    )
}
