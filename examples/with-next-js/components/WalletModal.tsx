"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    my_modal: HTMLDialogElement;
  }
}

const WalletModal = () => {
  const { isConnected, connect, installedExtensions } = useCardano({
    limitNetwork: NetworkType.TESTNET,
  });

  return (
    <div>
      <button
        className="inline-flex items-center justify-center h-[42px] px-8
                   bg-black/20 backdrop-blur-sm
                   border border-anastasia/[0.10] hover:border-anastasia/20
                   rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)]
                   text-white/40 hover:text-white/90
                   relative group overflow-hidden
                   transition-all duration-500 ease-out
                   hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]
                   hover:bg-black/30"
        onClick={() => window.my_modal.showModal()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-anastasia/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out" />
        <div className="relative z-10 flex items-center gap-2.5">
          <svg
            className="w-[18px] h-[18px] text-white/20 group-hover:text-anastasia/60 transition-colors duration-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v-4h-2a2 2 0 110-4h2V8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 12h-2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h6M7 12h4M7 16h4"
            />
          </svg>
          <span className="font-medium tracking-wide">
            {isConnected ? "Connected" : "Connect Wallet"}
          </span>
        </div>
      </button>

      <AnimatePresence>
        <dialog id="my_modal" className="modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[400px] mx-4 overflow-hidden rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)]"
            >
              {/* glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-white/[0.12] via-anastasia/20 to-transparent blur-[1px]" />

              {/* Background with the gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-anastasia/30 via-white/10 to-transparent rounded-2xl p-[1px]">
                <div className="absolute inset-0 bg-black/95 rounded-2xl backdrop-blur-2xl" />
              </div>

              {/* Inner border */}
              <div className="absolute inset-[1px] rounded-[15px] border border-white/[0.05]" />

              {/* Content */}
              <div className="relative bg-black/40 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => window.my_modal.close()}
                  className="absolute top-2 md:top-3 left-2 md:left-3 p-2 rounded-full
                           text-white/40 hover:text-white/90 
                           hover:bg-white/10 transition-all
                           duration-300 z-50"
                >
                  <svg
                    className="w-4 h-4"
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
                </motion.button>
                <h3 className="text-base md:text-lg font-medium mb-6 md:mb-8 text-center tracking-wider text-white/90">
                  Select Wallet
                </h3>
                <div className="mb-6 md:mb-8 p-3 md:p-4 bg-yellow-500/[0.03] border border-yellow-500/10 rounded-xl flex items-center gap-3">
                  <div className="shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-yellow-500/[0.07] flex items-center justify-center">
                    <svg
                      className="w-4 md:w-5 h-4 md:h-5 text-yellow-500/80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-yellow-500/90 font-medium mb-1 text-sm md:text-base">
                      Network Requirement
                    </p>
                    <p className="text-yellow-500/60 text-xs md:text-sm">
                      DEMO: Connect via Preview network
                    </p>
                  </div>
                </div>
                <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto scrollbar-hide">
                  <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 md:gap-5 pr-2">
                    {installedExtensions.map((provider: string, index) => (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={provider}
                        onClick={() => connect(provider)}
                        className="group relative flex flex-col items-center justify-center p-2 md:p-4
                                 bg-white/[0.01] hover:bg-anastasia/[0.03] rounded-lg md:rounded-xl
                                 border border-white/[0.02] hover:border-anastasia/20
                                 transition-all duration-500"
                      >
                        {/* gray overlay */}
                        <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-transparent transition-colors duration-500 rounded-lg md:rounded-xl" />

                        {/* hover effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-anastasia/[0.07] via-transparent to-transparent rounded-lg md:rounded-xl" />
                        </div>

                        <div className="relative z-10 space-y-2 md:space-y-4">
                          <span className="block h-6 md:h-12 w-6 md:w-12 relative">
                            <Image
                              src={window.cardano[provider].icon}
                              alt={provider}
                              width={48}
                              height={48}
                              className="object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 grayscale group-hover:grayscale-0"
                            />
                          </span>
                          <span className="block text-white/50 group-hover:text-white text-[10px] md:text-sm font-medium tracking-wide transition-colors duration-300">
                            {provider.toUpperCase()}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </dialog>
      </AnimatePresence>
    </div>
  );
};

export default WalletModal;
