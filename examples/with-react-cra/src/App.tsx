import ConnectButton from "./components/ConnectButton";
import WalletConnect from "./components/WalletConnect";
import { theme } from "./config/theme";
import "./styles/globals.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useWallet } from "./hooks/useWallet";

function App() {
  const { isConnected, usedAddresses, initLucid } = useWallet();
  const hasLoggedAddress = useRef(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      const lucidInstance = await initLucid();
      if (lucidInstance) {
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
          <div style={{ marginTop: "2rem", color: theme.colors.text.primary }}>
            <h2>Connected Wallet Info:</h2>
            <p>Address: {walletAddress}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
