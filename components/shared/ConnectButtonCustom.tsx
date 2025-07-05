import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
export default function ConnectButtonCustom() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const { disconnect } = useDisconnect();
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                width: '100%',
              },
            })}
          >
            <AnimatePresence initial={false} mode="wait">
              {!connected && (
                <motion.div
                  key="connect"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={openConnectModal}
                  className="flex flex-row items-center justify-center w-full h-20 bg-lime-400 rounded-md cursor-pointer"
                >
                  <span className="text-neutral-900 text-xl font-semibold">Connect Wallet</span>
                </motion.div>
              )}
              {connected && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-row items-center gap-1 w-full h-20"
                >
                  <motion.button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center justify-center flex-1 h-20 bg-lime-400 rounded-md cursor-pointer"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-green-900 text-xl font-semibold">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
                  </motion.button>
                  <motion.button
                    onClick={() => disconnect()}
                    type="button"
                    className="flex items-center justify-center w-20 h-20 bg-red-500 rounded-md cursor-pointer"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LogOut className="text-white text-xl font-semibold" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            {chain && chain.unsupported && connected && (
              <button onClick={openChainModal} type="button">
                Wrong network
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}