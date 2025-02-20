"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WalletConnectDynamic = dynamic(
  () => import("@/components/WalletConnect"),
  { ssr: false },
);

interface DelegateProps {
  showToast: (message: string) => void;
}

const DelegateDynamic = dynamic<DelegateProps>(
  () => import("@/components/Delegate"),
  { ssr: false },
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("vision");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 4000);
  };

  const renderDelegateButton = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <DelegateDynamic showToast={showToast} />
    </motion.div>
  );

  const sections = {
    vision: {
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${
            active ? "text-red-400" : "text-gray-600"
          } transition-colors duration-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Vision & Values",
      content: (
        <div className="space-y-16">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed tracking-wide">
            Anastasia Labs represents technical excellence in Cardano&apos;s
            governance. We are committed to informed decision-making and
            providing unwavering support for ecosystem growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4 md:gap-6">
                {/* number column */}
                <div className="flex flex-col items-center">
                  <div className="text-anastasia/60 font-mono font-bold text-4xl">
                    01
                  </div>
                  <div className="w-[1px] h-full bg-gradient-to-b from-anastasia/10 to-transparent mt-4" />
                </div>

                {/* content column */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-medium tracking-tight mb-3 md:mb-4 text-white">
                    Decentralization
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Dedicated to maintaining Cardano&apos;s principles through
                    data-driven governance decisions. No compromises on
                    decentralization.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex flex-col items-center -mt-[6px]">
                  <div className="text-anastasia/60 font-mono font-bold text-4xl">
                    02
                  </div>
                  <div className="w-[1px] h-full bg-gradient-to-b from-anastasia/10 to-transparent mt-4" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-medium tracking-tight mb-3 md:mb-4 text-white -mt-[6px]">
                    Community
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Every vote is cast with the ecosystem&apos;s long-term
                    sustainability in mind.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },
    history: {
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${
            active ? "text-red-400" : "text-gray-600"
          } transition-colors duration-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Vote History",
      content: (
        <div className="flex flex-col min-h-[500px] sm:min-h-[500px] min-h-[400px] relative">
          {/* main content - No votes state */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-6 relative">
                <div className="absolute inset-0 border-2 border-dashed border-anastasia/40 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 border border-anastasia/20 rounded-full" />
              </div>
              <p className="text-white/50 text-sm mb-2">No votes cast yet</p>
              <p className="text-white/30 text-xs max-w-[240px] text-center">
                Votes will appear here once Anastasia Labs begins participating
                in governance
              </p>
            </div>
          </div>

          {/* Footer - Upcoming vote */}
          <div className="mt-auto pt-8 border-t border-white/[0.03]">
            <div className="max-w-2xl">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-6">
                Upcoming Vote
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
                  <div className="w-full sm:w-32 flex flex-col items-start">
                    <span className="text-white/20 text-xs font-medium tracking-wider uppercase mb-1">
                      XX 2025
                    </span>
                    <span className="text-[10px] font-medium tracking-wider text-anastasia/30 uppercase">
                      ONGOING
                    </span>
                  </div>

                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-start sm:items-center justify-between">
                      <div className="flex items-start sm:items-center gap-2 min-w-0">
                        <a
                          href="https://cexplorer.io/tx/0b19476e40bbbb5e1e8ce153523762e2b6859e7ecacbaf06eae0ee6a447e79b9/governance#data"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link min-w-0"
                        >
                          <h3 className="text-white/50 text-base font-medium tracking-wide group-hover/link:text-anastasia-300/50 transition-colors duration-300 break-words">
                            Really important governance proposal
                          </h3>
                        </a>
                        <a
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/explorer shrink-0"
                          title="View on Explorer"
                        >
                          <div className="relative flex items-center justify-center w-7 h-7 before:absolute before:inset-0 before:rounded-full before:bg-white/0 before:transition-all before:duration-300 group-hover/explorer:before:bg-white/5">
                            <svg
                              className="w-4 h-4 text-white/20 group-hover/explorer:text-white/90 transition-colors relative z-10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                              />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                    <p className="text-white/30 text-sm leading-relaxed">
                      Best proposal ever
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    delegate: {
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${
            active ? "text-red-400" : "text-gray-600"
          } transition-colors duration-300`}
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
      ),
      title: "Delegate",
      content: (
        <div className="space-y-12">
          {/* main section */}
          <div className="space-y-12">
            {/* connect wallet section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              {/* left side with navigation stuff */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex-shrink-0 mx-auto md:mx-0"
              >
                <Image
                  src="/al-icon-red.png"
                  alt="Anastasia Labs"
                  width={120}
                  height={120}
                  priority
                  className="opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
              </motion.div>

              {/* right side */}
              <div className="flex-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 space-y-6"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white/70 text-lg leading-relaxed"
                  >
                    You can connect your wallet,{" "}
                    <a
                      href="https://docs.gov.tools/cardano-govtool/using-govtool/dreps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF0000]/70 hover:text-[#FF0000]/90 transition-colors duration-300"
                    >
                      delegate
                    </a>{" "}
                    your voting power and help shape Cardano&apos;s future.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <WalletConnectDynamic
                        onConnectionChange={setIsWalletConnected}
                      />
                    </motion.div>
                    {isWalletConnected && renderDelegateButton()}
                  </motion.div>
                </motion.div>

                {/* Stats section */}
                <div className="pt-8 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                      {
                        label: "DRep ID",
                        value:
                          "drep1jk8rk0p7py52vz4jnhwjtn4nhyptnr5tcvewgpahwu7djkqu46m",
                        description: "Unique On-chain Identifier",
                        mono: true,
                        copyable: true,
                      },
                      {
                        label: "Voting Power",
                        value: "- ₳",
                        description: "Total ADA delegated",
                      },
                      {
                        label: "Delegators",
                        value: "-",
                        description: <div className="flex flex-col"></div>,
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="relative group"
                      >
                        <div className="flex flex-col h-[72px]">
                          {/* Label */}
                          <div className="text-white/50 text-xs tracking-wider mb-1.5">
                            {stat.label}
                          </div>

                          {/* Value */}
                          <div className="mb-1">
                            {stat.copyable ? (
                              <div className="flex items-center gap-2">
                                <span className="text-white/90 text-base font-mono tracking-wide group-hover:text-anastasia-300/90 transition-colors duration-300 truncate">
                                  {`${stat.value.slice(
                                    0,
                                    6,
                                  )}...${stat.value.slice(-4)}`}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(stat.value);
                                    showToast("DRep ID copied to clipboard!");
                                  }}
                                  className="text-white/30 hover:text-white/90 transition-colors duration-300"
                                  title="Copy to clipboard"
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
                                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <span className="text-white/90 text-base font-light tracking-wide group-hover:text-anastasia-300/90 transition-colors duration-300">
                                {stat.value}
                              </span>
                            )}
                          </div>

                          {/* description */}
                          <div className="text-white/30 text-xs">
                            {stat.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-12 h-12"
        >
          <Image
            src="/al-icon-red.png"
            alt="Anastasia Labs"
            fill
            priority
            sizes="(max-width: 48px) 100vw, 48px"
            className="object-contain opacity-80"
          />
          <motion.div
            className="absolute -inset-3 border border-[#FF0000]/40 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-6xl mx-auto backdrop-blur-xl overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/95 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,59,59,0.02),transparent_40%)]" />

        <div className="relative md:flex min-h-[600px] flex-col md:flex-row">
          {/* nav panel */}
          <div className="md:w-[280px] w-full p-4 md:p-8 flex flex-col justify-center bg-gradient-to-b from-black to-black/95 relative z-10">
            {/* logo */}
            <div className="space-y-4 md:space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center md:justify-start"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-lg bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src="/al-icon-horizontal-red-white-text.png"
                    alt="Anastasia Labs"
                    width={240}
                    height={56}
                    className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 relative"
                    priority
                  />
                </div>
              </motion.div>

              {/* navigation */}
              <div className="relative">
                {/* scroll indicators */}
                <div className="absolute md:hidden right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/95 to-transparent pointer-events-none z-20" />
                <div className="absolute md:hidden left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/95 to-transparent pointer-events-none z-20" />

                <div
                  className="flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-2 mb-auto pb-2 md:pb-0 
                              scrollbar-none scroll-smooth"
                >
                  {Object.entries(sections).map(([key, section], index) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setActiveSection(key)}
                      className={`md:w-full w-auto min-w-[120px] shrink-0 md:h-[72px] h-[48px] flex items-center gap-4 px-4 rounded-xl transition-all duration-500 relative overflow-hidden ${
                        activeSection === key
                          ? "text-white bg-gradient-to-r from-anastasia/5 to-anastasia/[0.02]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {/* hover effect background */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          activeSection === key
                            ? "opacity-100"
                            : "opacity-0 hover:opacity-100"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out" />
                      </div>

                      {/* left border indicator */}
                      <div
                        className={`absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-[2px] md:h-[32px] left-0 top-0 w-full h-[2px] transition-all duration-500 rounded-full ${
                          activeSection === key
                            ? "bg-gradient-to-b from-anastasia/50 to-anastasia/20"
                            : "bg-transparent group-hover:bg-white/10"
                        }`}
                      />

                      {section.icon(activeSection === key)}
                      <span className="text-sm font-medium tracking-wide relative z-10">
                        {section.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden md:flex items-center gap-3 pt-4 border-t border-white/[0.03]"
              >
                {[
                  {
                    href: "https://anastasialabs.com",
                    icon: (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    ),
                  },
                  {
                    href: "https://github.com/Anastasia-Labs",
                    icon: (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    href: "https://x.com/anastasialabs",
                    icon: (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://discord.gg/KCeEjr94DG",
                    icon: (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group p-2 rounded-lg"
                  >
                    <div className="absolute inset-0 bg-white/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="text-white/40 group-hover:text-white/90 transition-colors duration-300 relative">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* content panel */}
          <div className="flex-1 p-4 md:p-10 relative bg-black/95 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative w-full"
              >
                <h2 className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-anastasia/50"></span>
                  {sections[activeSection as keyof typeof sections].title}
                </h2>
                {sections[activeSection as keyof typeof sections].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-8 right-8
                     backdrop-blur-xl bg-black/40 text-white/90
                     px-6 py-3.5 rounded-2xl
                     border border-white/[0.05]
                     text-[13px] font-medium tracking-wide
                     flex items-center gap-3
                     max-w-[min(calc(100%-4rem),420px)]
                     shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-anastasia/70 animate-pulse" />
            <span className="line-clamp-2">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
