"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { useState } from "react";

interface DelegateProps {
  showToast: (message: string) => void;
}

const Delegate = ({ showToast }: DelegateProps) => {
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: NetworkType.TESTNET,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDelegation = async () => {
    if (!isConnected || !enabledWallet || !usedAddresses?.length) {
      showToast("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      const lucid = await Lucid(new Emulator([]), "Preprod");
      const api = await window.cardano[enabledWallet].enable();
      lucid.selectWallet.fromAPI(api);

      showToast("Building delegation transaction...");
      const response = await fetch("/api/delegate-drep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: usedAddresses[0] }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server response error:", data);
        throw new Error(data.error || "Failed to create transaction");
      }

      showToast("Please sign the transaction in your wallet...");
      const signedTx = await lucid.fromTx(data.tx).sign.withWallet().complete();
      const txHash = await signedTx.submit();
      console.log("Transaction submitted:", txHash);
      showToast("Transaction submitted successfully!");
    } catch (error) {
      console.error("Delegation error:", error);
      showToast(error instanceof Error ? error.message : "Failed to delegate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col items-start gap-2 w-full sm:w-auto pt-[6px]">
          <span className="text-[9px] uppercase tracking-wider font-medium text-white/50 pl-1">
            Action
          </span>
          <div className="relative w-full sm:w-auto">
            <button
              className="group inline-flex items-center justify-between h-auto py-2 w-full sm:w-[240px]
                        text-xs font-medium text-white/90 hover:text-white
                        bg-black/30 hover:bg-black/40
                        transition-all duration-500 px-4 rounded-lg
                        disabled:opacity-30 disabled:cursor-not-allowed
                        relative overflow-hidden border border-anastasia hover:border-anastasia/80
                        hover:shadow-[0_0_20px_-3px_rgba(255,0,0,0.15)] hover:scale-[1.01]"
              onClick={handleDelegation}
              disabled={isLoading}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-anastasia/[0.03] to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] 
                          transition-transform duration-[1.5s] ease-in-out"
              />
              <div className="flex flex-col gap-0.5">
                <span className="h-[20px] flex items-center justify-center relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 w-full">
                      <div className="relative w-4 h-4">
                        <div className="absolute inset-0 border-t-2 border-r-2 border-anastasia/30 rounded-full animate-[spin_0.6s_linear_infinite]" />
                        <div className="absolute inset-0 border-t-2 border-r-2 border-anastasia rounded-full animate-[spin_1.8s_linear_infinite]" />
                      </div>
                      <span className="text-white/70 translate-y-[1px]">
                        Delegating
                      </span>
                    </div>
                  ) : (
                    <span>Delegate to Anastasia Labs</span>
                  )}
                </span>
                <span
                  className={`text-[10px] font-light text-white/50 text-left transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Choose as DRep
                </span>
              </div>
              {!isLoading && (
                <div className="relative z-10">
                  <div className="p-1 hover:bg-white/5 rounded-full transition-colors">
                    <svg
                      className="w-3.5 h-3.5 text-anastasia"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Delegate;
