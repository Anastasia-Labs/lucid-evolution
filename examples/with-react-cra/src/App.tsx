import ConnectButton from "./components/ConnectButton";
import WalletConnect from "./components/WalletConnect";
import SendAdaButton from "./components/SendAdaButton";
import { theme } from "./config/theme";
import { appConfig } from "./config/app.config";
import "./styles/globals.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useWallet } from "./hooks/useWallet";
import { Lucid } from "@lucid-evolution/lucid";

function App() {
  const { isConnected, usedAddresses, initLucid } = useWallet();
  const hasLoggedAddress = useRef(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [lucidInstance, setLucidInstance] = useState<Awaited<
    ReturnType<typeof Lucid>
  > | null>(null);

  const initialize = useCallback(async () => {
    try {
      const instance = await initLucid();
      if (instance) {
        setLucidInstance(instance);
        if (usedAddresses?.[0] && usedAddresses[0] !== walletAddress) {
          setWalletAddress(usedAddresses[0]);
          if (!hasLoggedAddress.current) {
            console.log("Connected wallet address:", usedAddresses[0]);
            hasLoggedAddress.current = true;
          }
        }
      }
    } catch (error) {
      console.error("Error initializing Lucid:", error);
    }
  }, [initLucid, usedAddresses, walletAddress]);

  useEffect(() => {
    if (isConnected) {
      initialize();
    } else {
      setWalletAddress(null);
      setLucidInstance(null);
      hasLoggedAddress.current = false;
    }
  }, [isConnected, initialize]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.gradients.background,
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.colors.border.primary}`,
          background: theme.effects.headerBlur,
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: theme.colors.text.primary,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={appConfig.logo.path}
            alt={appConfig.logo.alt}
            style={{
              height: "2rem",
              width: "auto",
              marginRight: "0.5rem",
            }}
          />
          <span style={{ color: theme.colors.text.primary }}>
            {appConfig.title}
          </span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Social Links */}
          <div style={{ display: "flex", gap: "1rem", marginRight: "0.5rem" }}>
            <a
              href={appConfig.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.text.primary,
                opacity: 0.7,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href={appConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.text.primary,
                opacity: 0.7,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.27-1.21-1.6-1.21-1.6-.98-.67.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.96 1.65 2.53 1.17 3.15.9.1-.7.38-1.17.69-1.44-2.42-.28-4.96-1.21-4.96-5.4 0-1.19.42-2.17 1.12-2.93-.11-.28-.49-1.39.11-2.89 0 0 .92-.3 3 1.12a10.38 10.38 0 015.5 0c2.08-1.42 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.74 1.12 2.93 0 4.2-2.55 5.12-4.98 5.39.39.34.74 1 .74 2.02v3c0 .29.18.62.74.52A11 11 0 0012 1.27" />
              </svg>
            </a>
          </div>
          <div
            style={{
              background: theme.colors.background.secondary,
              borderRadius: "8px",
              border: `1px solid ${theme.colors.border.secondary}`,
              padding: "0.25rem",
            }}
          >
            <div className="wallet-button-wrapper">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <WalletConnect />
        {isConnected && walletAddress && (
          <div style={{ marginTop: "2rem" }}>
            <div
              style={{
                background: theme.colors.background.secondary,
                borderRadius: "12px",
                border: `1px solid ${theme.colors.border.secondary}`,
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  color: theme.colors.text.primary,
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                Connected Wallet
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: theme.colors.background.card,
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: `1px solid ${theme.colors.border.primary}`,
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    color: theme.colors.text.primary,
                    opacity: 0.7,
                    fontSize: "0.9rem",
                  }}
                >
                  {walletAddress.slice(0, 20)}...{walletAddress.slice(-20)}
                </span>
              </div>
            </div>

            {/* Transaction Example Section */}
            <div
              style={{
                padding: "1.5rem",
                background: theme.colors.background.secondary,
                borderRadius: "12px",
                border: `1px solid ${theme.colors.border.secondary}`,
              }}
            >
              <h3
                style={{
                  color: theme.colors.text.primary,
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                Dummy Button - Create a Sample Transaction via Click
              </h3>
              <SendAdaButton lucidInstance={lucidInstance} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
