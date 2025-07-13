"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useState } from "react";
import { Emulator, Lucid } from "@evolution-sdk/lucid";

export default function TransactionBuilder() {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const network =
    process.env.NODE_ENV === "development"
      ? NetworkType.TESTNET
      : NetworkType.MAINNET;

  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  const handleBuildTransaction = async () => {
    if (!isConnected || !enabledWallet) {
      setError("Wallet not connected");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTxHash(null);

    try {
      // Initialize Lucid with an emulator (will be replaced with actual provider)
      const lucid = await Lucid(new Emulator([]), "Preprod");

      // Get API from wallet
      const api = await window.cardano[enabledWallet].enable();

      // Select wallet
      lucid.selectWallet.fromAPI(api);

      // Make API request to build transaction
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: usedAddresses[0] }),
      });

      if (!response.ok) {
        throw new Error("Failed to get transaction from server");
      }

      const { tx } = await response.json();

      // Sign transaction with wallet
      const signedTx = await lucid.fromTx(tx).sign.withWallet().complete();

      // Submit transaction
      const txHash = await signedTx.submit();

      setTxHash(txHash);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="px-5 py-8 flex items-center justify-center min-h-[150px]">
        <p className="text-xs text-zinc-500">Connect your wallet to continue</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 space-y-4">
      {/* Main action button */}
      <button
        className={`w-full py-2.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-1 ${
          isLoading
            ? "bg-zinc-800/80 text-zinc-400 cursor-not-allowed"
            : "bg-orange-900/90 hover:bg-orange-800 text-zinc-100 border border-orange-900/60 focus:ring-orange-700/30"
        }`}
        onClick={handleBuildTransaction}
        disabled={isLoading || !isConnected}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-3 w-3 text-zinc-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing Transaction</span>
          </div>
        ) : (
          "Build Sample Transaction"
        )}
      </button>

      {/* Error state */}
      {error && (
        <div className="py-2 px-3 bg-orange-950/30 border border-orange-900/30 rounded-md text-orange-400 text-xs">
          {error}
        </div>
      )}

      {/* Success state */}
      {txHash && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-green-400">
              Transaction Submitted
            </span>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-md overflow-hidden">
            <div className="px-3 py-2 border-b border-zinc-800/40 text-[10px] text-zinc-400">
              Transaction Hash
            </div>
            <div className="px-3 py-2 font-mono text-xs text-zinc-300 break-all">
              {txHash}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
