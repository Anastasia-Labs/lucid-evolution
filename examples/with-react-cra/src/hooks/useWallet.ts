import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Lucid, Blockfrost } from "@lucid-evolution/lucid";
import { useRef } from "react";

export const useWallet = () => {
  // Always use Testnet (Preprod) for this example
  const network = NetworkType.TESTNET;
  const hasLogged = useRef(false);
  const lucidInstance = useRef<Awaited<ReturnType<typeof Lucid>> | null>(null);
  const lastInitTime = useRef<number>(0);
  const REFRESH_INTERVAL = 120000; // 120 seconds

  const {
    isConnected,
    connect,
    disconnect,
    stakeAddress,
    accountBalance,
    installedExtensions,
    enabledWallet,
    usedAddresses,
  } = useCardano({
    limitNetwork: network,
  });

  const initLucid = async () => {
    if (!isConnected || !enabledWallet || !usedAddresses?.length) {
      lucidInstance.current = null;
      return null;
    }

    const now = Date.now();
    if (
      lucidInstance.current &&
      now - lastInitTime.current < REFRESH_INTERVAL
    ) {
      return lucidInstance.current;
    }

    try {
      console.log("🔄 Initializing Lucid...");
      const lucid = await Lucid(
        new Blockfrost(
          "https://cardano-preprod.blockfrost.io/api/v0",
          process.env.REACT_APP_BLOCKFROST_API_KEY,
        ),
        "Preprod",
      );

      // wallet API
      const api = await window.cardano[enabledWallet].enable();
      await lucid.selectWallet.fromAPI(api);

      if (!hasLogged.current) {
        console.log("✅ Lucid initialized successfully");
        console.log("✓ Wallet connected and ready");
        hasLogged.current = true;
      }

      lucidInstance.current = lucid;
      lastInitTime.current = now;
      return lucid;
    } catch (error) {
      console.error("❌ Lucid initialization error:", error);
      throw error;
    }
  };

  return {
    isConnected,
    connect,
    disconnect,
    stakeAddress,
    accountBalance,
    installedExtensions,
    enabledWallet,
    usedAddresses,
    network,
    initLucid,
  };
};
