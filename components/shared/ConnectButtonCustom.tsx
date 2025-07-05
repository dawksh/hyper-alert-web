import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
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
        const {disconnect} = useDisconnect();
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
            {(() => {
              if (!connected) {
                return (
                  <div onClick={openConnectModal} className="flex flex-row items-center justify-center w-full h-20 bg-lime-300 rounded-md cursor-pointer">
                    <span className="text-neutral-900 text-xl font-semibold">Connect Wallet</span>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex flex-row items-center gap-3 w-full h-20">
                  <button onClick={openAccountModal} type="button" className="flex items-center justify-center flex-1 h-20 bg-lime-300 rounded-md cursor-pointer">
                    <span className="text-green-900 text-xl font-semibold">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
                  </button>
                  <button onClick={() => disconnect()} type="button" className="flex items-center justify-center w-20 h-20 bg-red-500 rounded-md cursor-pointer">
                    <span className="text-white text-xl font-semibold">X</span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};