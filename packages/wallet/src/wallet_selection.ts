import {
  Address,
  Delegation,
  KeyHash,
  Network,
  Payload,
  PrivateKey,
  Provider,
  RewardAddress,
  SignedMessage,
  Transaction,
  TxHash,
  UTxO,
  Wallet,
  WalletApi,
} from "@evolution-sdk/core-types";
import { fromHex, toHex } from "@evolution-sdk/core-utils";
import {
  coreToUtxo,
  credentialToRewardAddress,
  getAddressDetails,
  utxoToCore,
} from "@evolution-sdk/utils";
import { CML } from "./core.js";
import { signData } from "@evolution-sdk/sign_data";
import { discoverOwnUsedTxKeyHashes, walletFromSeed } from "./wallet.js";

type Config = {
  overriddenUTxOs: UTxO[];
};

export const makeWalletFromSeed = (
  provider: Provider,
  network: Network,
  seed: string,
  options?: {
    addressType?: "Base" | "Enterprise";
    accountIndex?: number;
    password?: string;
  },
): Wallet => {
  const config: Config = {
    overriddenUTxOs: [],
  };

  const { address, rewardAddress, paymentKey, stakeKey } = walletFromSeed(
    seed,
    {
      addressType: options?.addressType || "Base",
      accountIndex: options?.accountIndex || 0,
      password: options?.password,
      network: network,
    },
  );
  const paymentKeyHash = CML.PrivateKey.from_bech32(paymentKey)
    .to_public()
    .hash()
    .to_hex();
  const stakeKeyHash = stakeKey
    ? CML.PrivateKey.from_bech32(stakeKey).to_public().hash().to_hex()
    : "";

  const privKeyHashMap = {
    [paymentKeyHash]: paymentKey,
    [stakeKeyHash]: stakeKey,
  };
  return {
    overrideUTxOs: (utxos: UTxO[]) => (config.overriddenUTxOs = utxos),
    address: async (): Promise<Address> => address,
    rewardAddress: async (): Promise<RewardAddress | null> =>
      rewardAddress || null,
    getUtxos: async (): Promise<UTxO[]> =>
      config.overriddenUTxOs.length > 0
        ? config.overriddenUTxOs
        : provider.getUtxos(address),
    getUtxosCore: async (): Promise<CML.TransactionUnspentOutput[]> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs
          : await provider.getUtxos(address);
      const coreUtxos: CML.TransactionUnspentOutput[] = [];
      for (const utxo of utxos) {
        coreUtxos.push(utxoToCore(utxo));
      }
      return coreUtxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      return rewardAddress
        ? await provider.getDelegation(rewardAddress)
        : { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs
          : await provider.getUtxos(address);

      const ownKeyHashes: Array<KeyHash> = [paymentKeyHash, stakeKeyHash];

      const usedKeyHashes = discoverOwnUsedTxKeyHashes(tx, ownKeyHashes, utxos);

      const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
      for (const keyHash of usedKeyHashes) {
        const priv = CML.PrivateKey.from_bech32(privKeyHashMap[keyHash]!);
        const witness = CML.make_vkey_witness(
          CML.hash_transaction(tx.body()),
          priv,
        );
        txWitnessSetBuilder.add_vkey(witness);
      }

      return txWitnessSetBuilder.build();
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const {
        paymentCredential,
        stakeCredential,
        address: { hex: hexAddress },
      } = getAddressDetails(address);

      const keyHash = paymentCredential?.hash || stakeCredential?.hash;

      const privateKey = privKeyHashMap[keyHash!];

      if (!privateKey) {
        throw new Error(`Cannot sign message for address: ${address}.`);
      }

      return signData(hexAddress, payload, privateKey);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => provider.submitTx(tx),
  };
};

/**
 * Cardano Private key in bech32; not the BIP32 private key or any key that is not fully derived.
 * Only an Enterprise address (without stake credential) is derived.
 */
export const makeWalletFromPrivateKey = (
  provider: Provider,
  network: Network,
  privateKey: PrivateKey,
): Wallet => {
  const priv = CML.PrivateKey.from_bech32(privateKey);
  const pubKeyHash = priv.to_public().hash();
  const address = CML.EnterpriseAddress.new(
    network === "Mainnet" ? 1 : 0,
    CML.Credential.new_pub_key(pubKeyHash),
  )
    .to_address()
    .to_bech32(undefined);
  const config: Config = {
    overriddenUTxOs: [],
  };

  return {
    overrideUTxOs: (utxos: UTxO[]) => (config.overriddenUTxOs = utxos),
    address: async (): Promise<Address> => address,
    rewardAddress: async (): Promise<RewardAddress | null> => null,
    getUtxos: async (): Promise<UTxO[]> =>
      config.overriddenUTxOs.length > 0
        ? config.overriddenUTxOs
        : provider.getUtxos(address),
    getUtxosCore: async (): Promise<CML.TransactionUnspentOutput[]> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs
          : await provider.getUtxos(address);
      const coreUtxos: CML.TransactionUnspentOutput[] = [];
      for (const utxo of utxos) {
        coreUtxos.push(utxoToCore(utxo));
      }
      return coreUtxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      return { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const witness = CML.make_vkey_witness(
        CML.hash_transaction(tx.body()),
        priv,
      );
      const txWitnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
      txWitnessSetBuilder.add_vkey(witness);
      return txWitnessSetBuilder.build();
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const {
        paymentCredential,
        address: { hex: hexAddress },
      } = getAddressDetails(address);
      const keyHash = paymentCredential?.hash;

      const originalKeyHash = pubKeyHash.to_hex();

      if (!keyHash || keyHash !== originalKeyHash) {
        throw new Error(`Cannot sign message for address: ${address}.`);
      }

      return signData(hexAddress, payload, privateKey);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => {
      return await provider.submitTx(tx);
    },
  };
};

export const makeWalletFromAPI = (
  provider: Provider,
  api: WalletApi,
): Wallet => {
  const config: Config = {
    overriddenUTxOs: [],
  };
  const getAddressHex = async () => {
    const [addressHex] = await api.getUsedAddresses();
    if (addressHex) return addressHex;

    const [unusedAddressHex] = await api.getUnusedAddresses();
    return unusedAddressHex;
  };

  const getRewardAddress = async () => {
    const [rewardAddressHex] = await api.getRewardAddresses();
    const rewardAddress = rewardAddressHex
      ? CML.RewardAddress.from_address(CML.Address.from_hex(rewardAddressHex))!
          .to_address()
          .to_bech32(undefined)
      : null;
    return rewardAddress;
  };

  return {
    overrideUTxOs: (utxos: UTxO[]) => (config.overriddenUTxOs = utxos),
    address: async (): Promise<Address> =>
      CML.Address.from_hex(await getAddressHex()).to_bech32(undefined),
    rewardAddress: async (): Promise<RewardAddress | null> =>
      getRewardAddress(),
    getUtxos: async (): Promise<UTxO[]> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs
          : ((await api.getUtxos()) || []).map((utxo) =>
              coreToUtxo(
                CML.TransactionUnspentOutput.from_cbor_bytes(fromHex(utxo)),
              ),
            );
      return utxos;
    },
    getUtxosCore: async (): Promise<CML.TransactionUnspentOutput[]> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs.map(utxoToCore)
          : ((await api.getUtxos()) || []).map((utxo: string) =>
              CML.TransactionUnspentOutput.from_cbor_hex(utxo),
            );
      return utxos;
    },
    getDelegation: async (): Promise<Delegation> => {
      const rewardAddr = await getRewardAddress();
      return rewardAddr
        ? await provider.getDelegation(rewardAddr)
        : { poolId: null, rewards: 0n };
    },
    signTx: async (tx: CML.Transaction): Promise<CML.TransactionWitnessSet> => {
      const witnessSet = await api.signTx(toHex(tx.to_cbor_bytes()), true);
      return CML.TransactionWitnessSet.from_cbor_hex(witnessSet);
    },
    signMessage: async (
      address: Address | RewardAddress,
      payload: Payload,
    ): Promise<SignedMessage> => {
      const hexAddress = toHex(CML.Address.from_bech32(address).to_raw_bytes());
      return await api.signData(hexAddress, payload);
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => api.submitTx(tx),
  };
};

export const makeWalletFromAddress = (
  provider: Provider,
  network: Network,
  address: string,
  utxos: UTxO[],
): Wallet => {
  const { stakeCredential } = getAddressDetails(address);
  const rewardAddress = stakeCredential
    ? credentialToRewardAddress(network, stakeCredential)
    : null;
  const config: Config = {
    overriddenUTxOs: utxos,
  };
  return {
    overrideUTxOs: (utxos: UTxO[]) => (config.overriddenUTxOs = utxos),
    address: async (): Promise<Address> => address,
    rewardAddress: async (): Promise<RewardAddress | null> => rewardAddress,
    getUtxos: async (): Promise<UTxO[]> =>
      config.overriddenUTxOs.length > 0
        ? config.overriddenUTxOs
        : provider.getUtxos(address),
    getUtxosCore: async (): Promise<CML.TransactionUnspentOutput[]> => {
      const utxos =
        config.overriddenUTxOs.length > 0
          ? config.overriddenUTxOs
          : await provider.getUtxos(address);
      const coreUtxos: CML.TransactionUnspentOutput[] = [];
      for (const utxo of utxos) {
        coreUtxos.push(utxoToCore(utxo));
      }
      return coreUtxos;
    },
    getDelegation: async (): Promise<Delegation> =>
      rewardAddress
        ? provider.getDelegation(rewardAddress)
        : { poolId: null, rewards: 0n },
    signTx: async (
      _tx: CML.Transaction,
    ): Promise<CML.TransactionWitnessSet> => {
      throw new Error("Not implemented");
    },
    signMessage: async (
      _address: Address | RewardAddress,
      _payload: Payload,
    ): Promise<SignedMessage> => {
      throw new Error("Not implemented");
    },
    submitTx: async (tx: Transaction): Promise<TxHash> => provider.submitTx(tx),
  };
};
