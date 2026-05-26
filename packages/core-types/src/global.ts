// CIP-0030
export type TransactionSignatureRequest = {
  cbor: string;
  partialSign: boolean;
};

export type WalletApi = {
  getNetworkId(): Promise<number>;
  getUtxos(): Promise<string[] | undefined>;
  getBalance(): Promise<string>;
  getUsedAddresses(): Promise<string[]>;
  getUnusedAddresses(): Promise<string[]>;
  getChangeAddress(): Promise<string>;
  getRewardAddresses(): Promise<string[]>;
  signTx(tx: string, partialSign: boolean): Promise<string>;
  signData(
    address: string,
    payload: string,
  ): Promise<{ signature: string; key: string }>;
  cip103?: {
    signTxs(txs: TransactionSignatureRequest[]): Promise<string[]>;
  };
  signTxs?(txs: TransactionSignatureRequest[]): Promise<string[]>;
  submitTx(tx: string): Promise<string>;
  getCollateral(): Promise<string[]>;
  experimental: {
    signTxs?(txs: TransactionSignatureRequest[]): Promise<string[]>;
    getCollateral(): Promise<string[]>;
    on(eventName: string, callback: (...args: unknown[]) => void): void;
    off(eventName: string, callback: (...args: unknown[]) => void): void;
  };
};

export type Cardano = {
  [key: string]: {
    name: string;
    icon: string;
    apiVersion: string;
    enable(): Promise<WalletApi>;
    isEnabled(): Promise<boolean>;
  };
};

declare global {
  interface Window {
    cardano: Cardano;
  }
}
