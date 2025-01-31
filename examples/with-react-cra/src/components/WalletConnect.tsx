import { useWallet } from "../hooks/useWallet";
import { theme } from "../config/theme";
import { useState } from "react";

const WalletConnect = () => {
  const { isConnected, stakeAddress, accountBalance } = useWallet();
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    if (stakeAddress) {
      await navigator.clipboard.writeText(stakeAddress);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem",
          color: theme.colors.text.secondary,
          fontSize: "0.875rem",
          background: theme.colors.background.card,
          borderRadius: "12px",
          border: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        Connect your wallet to continue
      </div>
    );
  }

  return (
    <div
      style={{
        background: theme.colors.background.card,
        borderRadius: "12px",
        border: `1px solid ${theme.colors.border.primary}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.25rem",
          borderBottom: `1px solid ${theme.colors.border.primary}`,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: theme.colors.primary,
            boxShadow: `0 0 12px ${theme.colors.primary}`,
          }}
        />
        <span
          style={{ color: theme.colors.text.primary, fontSize: "0.875rem" }}
        >
          Wallet Connected
        </span>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: theme.colors.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              Stake Address
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span
                style={{
                  color: theme.colors.text.primary,
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  background: theme.colors.background.secondary,
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  border: `1px solid ${theme.colors.border.secondary}`,
                }}
              >
                {stakeAddress
                  ? `${stakeAddress.slice(0, 10)}...${stakeAddress.slice(-6)}`
                  : "Not available"}
              </span>
              {stakeAddress && (
                <button
                  onClick={handleCopy}
                  style={{
                    background: theme.colors.background.secondary,
                    border: `1px solid ${theme.colors.border.secondary}`,
                    borderRadius: "6px",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: showCopied
                      ? theme.colors.primary
                      : theme.colors.text.secondary,
                    fontSize: "0.75rem",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                  title="Copy address"
                >
                  {showCopied ? "✓" : "⎘"}
                </button>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: theme.colors.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              Balance
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.25rem",
              }}
            >
              <span
                style={{
                  color: theme.colors.primary,
                  fontSize: "1.25rem",
                  fontWeight: 500,
                }}
              >
                {accountBalance || "0"}
              </span>
              <span
                style={{
                  color: theme.colors.text.secondary,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                ₳
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
