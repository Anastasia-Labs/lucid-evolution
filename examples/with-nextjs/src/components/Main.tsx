"use client";

import dynamic from "next/dynamic";
import WalletConnect from "./WalletConnect";

// Dynamically import the TransactionBuilder with SSR disabled
const DynamicTransactionBuilder = dynamic(
  () => import("./TransactionBuilder"),
  { ssr: false },
);

export default function Main() {
  return (
    <div className="w-full">
      {/* Card container with continuous design */}
      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-lg shadow-md overflow-hidden">
        {/* Wallet section */}
        <div className="border-b border-zinc-800/40">
          <div className="px-5 py-3 border-b border-zinc-800/20">
            <h3 className="text-sm font-medium text-zinc-100">Wallet</h3>
          </div>
          <WalletConnect />
        </div>

        {/* Transaction section */}
        <div>
          <div className="px-5 py-3 border-b border-zinc-800/20">
            <h3 className="text-sm font-medium text-zinc-100">Transaction</h3>
          </div>
          <DynamicTransactionBuilder />
        </div>
      </div>
    </div>
  );
}
