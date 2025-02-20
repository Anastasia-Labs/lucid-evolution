"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import WalletModal from "./WalletModal";
import { useEffect } from "react";

interface WalletConnectProps {
  onConnectionChange?: (isConnected: boolean) => void;
}

const WalletConnect = ({ onConnectionChange }: WalletConnectProps) => {
  const { isConnected, usedAddresses, disconnect, accountBalance } = useCardano(
    {
      limitNetwork: NetworkType.TESTNET,
    },
  );

  useEffect(() => {
    onConnectionChange?.(isConnected);
  }, [isConnected, onConnectionChange]);

  return (
    <div className="inline-flex items-center gap-4">
      {isConnected && usedAddresses?.length ? (
        <div className="flex flex-col items-start gap-2">
          <span className="text-[9px] uppercase tracking-wider font-medium text-white/50 pl-1">
            Connected Wallet
          </span>
          <div className="flex items-center gap-3">
            <div
              className="group relative inline-flex items-center justify-between h-auto py-2 w-[240px]
                       border border-white/10 hover:border-white/20 rounded-lg px-4
                       transition-all duration-500 backdrop-blur-sm bg-black/30"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-white/90 font-mono">
                  {usedAddresses[0].slice(0, 10)}...{usedAddresses[0].slice(-4)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-white/90">
                    {accountBalance}
                  </span>
                  <span className="text-xs font-medium text-white/60">₳</span>
                </div>
              </div>
              <button
                onClick={disconnect}
                className="relative flex items-center justify-center w-6 h-6
                         before:absolute before:inset-0 before:rounded-full before:bg-white/0 before:transition-all before:duration-300
                         group-hover:before:bg-white/5"
                title="Disconnect"
              >
                <svg
                  className="w-3.5 h-3.5 text-white/60 group-hover:text-white/80 transition-colors relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <WalletModal />
      )}
    </div>
  );
};

export default WalletConnect;
