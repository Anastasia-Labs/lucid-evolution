import {
  Credential,
  Delegation,
  Network,
  OutRef,
  PrivateKey,
  ProtocolParameters,
  Provider,
  Transaction,
  UTxO,
  Wallet,
  WalletApi,
} from "@lucid-evolution/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { datumOf, makeConfigBuilder, metadataOf } from "./utils.js";
import { unixTimeToSlot } from "@lucid-evolution/utils";
import { TxBuilder, makeTxBuilder } from "../tx-builder/MakeTxBuilder.js";
import {
  TxSignBuilder,
  makeTxSignBuilder,
} from "../tx-sign-builder/MakeTxSign.js";
import { Data } from "@lucid-evolution/plutus";
import {
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "@lucid-evolution/wallet";

export type LucidEvolution = {
  txbuilderconfig: () => CML.TransactionBuilderConfig;
  wallet: () => Wallet;
  switchProvider: (provider: Provider) => Promise<void>;
  newTx: () => TxBuilder;
  fromTx: (tx: Transaction) => TxSignBuilder;
  selectWallet: {
    fromSeed: (seed: string) => void;
    fromPrivateKey: (privateKey: PrivateKey) => void;
    fromAPI: (walletAPI: WalletApi) => void;
  };
  currentSlot: () => number;
  utxosAt: (addressOrCredential: string | Credential) => Promise<UTxO[]>;
  utxosAtWithUnit: (
    addressOrCredential: string | Credential,
    unit: string,
  ) => Promise<UTxO[]>;
  utxoByUnit: (unit: string) => Promise<UTxO>;
  utxosByOutRef: (outRefs: OutRef[]) => Promise<UTxO[]>;
  delegationAt: (rewardAddress: string) => Promise<Delegation>;
  awaitTx: (
    txHash: string,
    checkInterval?: number | undefined,
  ) => Promise<boolean>;
  datumOf: <T = Data>(utxo: UTxO, type?: T | undefined) => Promise<T>;
  metadataOf: <T = any>(unit: string) => Promise<T>;
};

export type LucidConfig = {
  provider: Provider;
  network: Network;
  wallet: Wallet | undefined;
  txbuilderconfig: CML.TransactionBuilderConfig;
  protocolParameters: ProtocolParameters;
};

//TODO: turn this to Effect
export const Lucid = async (
  provider: Provider,
  network: Network,
): Promise<LucidEvolution> => {
  const protocolParam = await provider.getProtocolParameters();
  const config: LucidConfig = {
    provider: provider,
    network: network,
    wallet: undefined,
    txbuilderconfig: makeConfigBuilder(protocolParam),
    protocolParameters: protocolParam,
  };
  return {
    txbuilderconfig: () => config.txbuilderconfig,
    wallet: () => config.wallet as Wallet,
    switchProvider: async (provider: Provider) => {
      const protocolParam = await provider.getProtocolParameters();
      config.provider = provider;
      config.txbuilderconfig = makeConfigBuilder(protocolParam);
      config.protocolParameters = protocolParam;
    },
    newTx: (): TxBuilder => makeTxBuilder(config),
    fromTx: (tx: Transaction) =>
      makeTxSignBuilder(config, CML.Transaction.from_cbor_hex(tx)),
    selectWallet: {
      fromSeed: (seed: string) => {
        config.wallet = makeWalletFromSeed(config.provider, network, seed);
      },
      fromPrivateKey: (privateKey: PrivateKey) => {
        config.wallet = makeWalletFromPrivateKey(
          config.provider,
          network,
          privateKey,
        );
      },
      fromAPI: (walletAPI: WalletApi) => {
        config.wallet = makeWalletFromAPI(config.provider, walletAPI);
      },
    },
    currentSlot: () => {
      return unixTimeToSlot(config.network, Date.now());
    },
    utxosAt: (addressOrCredential: string | Credential) =>
      config.provider.getUtxos(addressOrCredential),
    utxosAtWithUnit: config.provider.getUtxosWithUnit,
    utxoByUnit: config.provider.getUtxoByUnit,
    utxosByOutRef: config.provider.getUtxosByOutRef,
    delegationAt: config.provider.getDelegation,
    awaitTx: config.provider.awaitTx,
    datumOf: datumOf(config.provider),
    metadataOf: metadataOf(config.provider),
  };
};
