import ClientWrapper from "@/components/ClientWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <header className="fixed w-full z-10 border-b border-zinc-800/30">
        <div className="bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative h-5 w-5 flex items-center justify-center">
                <Image
                  src="/evolution-sdk-no-witness-labs.svg"
                  alt="Evolution SDK Logo"
                  width={22}
                  height={22}
                  className="h-[18px] w-[18px] object-contain"
                />
              </div>
              <h1 className="text-sm font-medium bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Evolution SDK
              </h1>
            </div>

            <nav>
              <ul className="flex space-x-6 text-xs">
                <li>
                  <a
                    href="https://github.com/no-witness-labs/evolution-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors relative group"
                  >
                    GitHub
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://no-witness-labs.github.io/evolution-sdk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors relative group"
                  >
                    Docs
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-20 px-5">
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-base font-medium mb-2 text-zinc-100">
              Create a Cardano dApp with Evolution SDK
            </h2>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              A minimal starter template for building Cardano dApps with Next.js
              15
            </p>
          </div>

          <ClientWrapper />
        </div>
      </main>

      <footer className="mt-auto py-6">
        <div className="max-w-4xl mx-auto px-5">
          <div className="border-t border-zinc-800/30 pt-5 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <a
                href="no-witness-labs.github.io/evolution-sdk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700/90 hover:text-orange-600 transition-colors group flex items-center space-x-1"
              >
                <span className="text-[9px] text-zinc-500">Powered by</span>
                <span className="relative">
                  Evolution SDK
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-red-700/50 transition-all group-hover:w-full"></span>
                </span>
              </a>

              <span className="text-zinc-700">•</span>

              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-400 transition-colors group flex items-center"
              >
                <span className="relative">
                  Next.js 15
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-zinc-700 transition-all group-hover:w-full"></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
