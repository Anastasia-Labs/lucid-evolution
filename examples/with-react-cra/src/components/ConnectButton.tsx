import { useWallet } from "../hooks/useWallet";
import { theme } from "../config/theme";
import type { Cardano } from "../types/cardano";

declare global {
  interface Window {
    cardano: Cardano;
  }
}

const ConnectButton = () => {
  const { isConnected, connect, disconnect, installedExtensions } = useWallet();

  const handleConnect = () => {
    if (installedExtensions.length === 1) {
      connect(installedExtensions[0]);
    } else if (installedExtensions.length > 1) {
      const modal = document.getElementById(
        "wallet-modal",
      ) as HTMLDialogElement;
      if (modal) modal.showModal();
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={isConnected ? undefined : handleConnect}
          style={{
            background: "transparent",
            border: "none",
            color: theme.colors.text.primary,
            fontFamily: "inherit",
            fontSize: "0.875rem",
            padding: "8px 16px",
            cursor: isConnected ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s ease",
          }}
        >
          {isConnected ? "Connected" : "Connect Wallet"}
        </button>
        {isConnected && (
          <button
            onClick={disconnect}
            style={{
              background: "transparent",
              border: "none",
              color: theme.colors.text.secondary,
              padding: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
            }}
          >
            ×
          </button>
        )}
      </div>

      <dialog
        id="wallet-modal"
        style={{
          background: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.primary}`,
          borderRadius: "12px",
          padding: "1.5rem",
          color: theme.colors.text.primary,
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h3
            style={{ margin: "0 0 1rem 0", color: theme.colors.text.primary }}
          >
            Select Wallet
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {installedExtensions.map((wallet: string) => (
              <button
                key={wallet}
                onClick={() => {
                  connect(wallet);
                  const modal = document.getElementById(
                    "wallet-modal",
                  ) as HTMLDialogElement;
                  if (modal) modal.close();
                }}
                style={{
                  background: theme.colors.background.secondary,
                  border: `1px solid ${theme.colors.border.secondary}`,
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  color: theme.colors.text.primary,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: "0.875rem" }}>{wallet}</span>
                {window.cardano[wallet]?.icon && (
                  <img
                    src={window.cardano[wallet].icon}
                    alt={`${wallet} logo`}
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              const modal = document.getElementById(
                "wallet-modal",
              ) as HTMLDialogElement;
              if (modal) modal.close();
            }}
            style={{
              background: "transparent",
              border: "none",
              color: theme.colors.text.secondary,
              cursor: "pointer",
              padding: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ConnectButton;
