import ConnectButton from "./components/ConnectButton";
import WalletConnect from "./components/WalletConnect";
import SendAdaButton from "./components/SendAdaButton";
import { theme } from "./config/theme";
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
            src="/lucid-evolution-al-red.svg"
            alt="Lucid Evolution Logo"
            style={{
              height: "2rem",
              width: "auto",
              marginRight: "0.5rem",
            }}
          />
          <span style={{ color: theme.colors.primary }}>Lucid</span>
          <span style={{ opacity: 0.9 }}>Evolution</span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
