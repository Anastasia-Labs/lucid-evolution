import {
  Credential,
  Delegation,
  Network,
  OutRef,
  PrivateKey,
  ProtocolParameters,
  Provider,
  Transaction,
  TxHash,
  Unit,
  UTxO,
  Wallet,
  WalletApi,
} from "@lucid-evolution/core-types";
import { CML } from "../core.js";
import { datumOf, metadataOf } from "./utils.js";
import { createCostModels, unixTimeToSlot } from "@lucid-evolution/utils";
import * as TxBuilder from "../tx-builder/TxBuilder.js";
import * as TxConfig from "../tx-builder/TxConfig.js";
import * as TxSignBuilder from "../tx-sign-builder/TxSignBuilder.js";
import { Data, SLOT_CONFIG_NETWORK } from "@lucid-evolution/plutus";
import {
  makeWalletFromAddress,
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "@lucid-evolution/wallet";
import { Emulator } from "@lucid-evolution/provider";

export type LucidEvolution = {
  config: () => LucidConfig;
  wallet: () => Wallet;
  overrideUTxOs: (utxos: UTxO[]) => void;
  switchProvider: (provider: Provider) => Promise<void>;
  newTx: () => TxBuilder.TxBuilder;
  fromTx: (tx: Transaction) => TxSignBuilder.TxSignBuilder;
  selectWallet: {
    fromSeed: (seed: string) => void;
    fromPrivateKey: (privateKey: PrivateKey) => void;
    fromAPI: (walletAPI: WalletApi) => void;
    fromAddress: (address: string, utxos: UTxO[]) => void;
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
  datumOf: <T extends Data>(utxo: UTxO, type?: T | undefined) => Promise<T>;
  metadataOf: <T = any>(unit: string) => Promise<T>;
};

export type LucidConfig = {
  provider: Provider;
  network: Network;
  wallet: Wallet | undefined;
  txbuilderconfig: CML.TransactionBuilderConfig;
  costModels: CML.CostModels;
  protocolParameters: ProtocolParameters;
};

//TODO: turn this to Effect
export const Lucid = async (
  provider: Provider,
  network: Network,
): Promise<LucidEvolution> => {
  const protocolParam = await provider.getProtocolParameters();
  const costModels = createCostModels(protocolParam.costModels);
  const config: LucidConfig = {
    provider: provider,
    network: network,
    wallet: undefined,
    costModels: costModels,
    txbuilderconfig: TxConfig.makeTxConfig(protocolParam, costModels),
    protocolParameters: protocolParam,
  };
  if (config.provider as Emulator) {
    const emulator: Emulator = config.provider as Emulator;
    SLOT_CONFIG_NETWORK[network] = {
      zeroTime: emulator.now(),
      zeroSlot: 0,
      slotLength: 1000,
    };
  }
  return {
    config: () => config,
    wallet: () => config.wallet as Wallet,
    overrideUTxOs: (utxos: UTxO[]) => config.wallet?.overrideUTxOs(utxos),
    switchProvider: async (provider: Provider) => {
      const protocolParam = await provider.getProtocolParameters();
      const costModels = createCostModels(protocolParam.costModels);
      config.provider = provider;
      config.costModels = costModels;
      config.txbuilderconfig = TxConfig.makeTxConfig(protocolParam, costModels);
      config.protocolParameters = protocolParam;
    },
    newTx: (): TxBuilder.TxBuilder => TxBuilder.makeTxBuilder(config),
    fromTx: (tx: Transaction) =>
      TxSignBuilder.makeTxSignBuilder(
        config,
        CML.Transaction.from_cbor_hex(tx),
      ),
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
      fromAddress: (address: string, utxos: UTxO[]) => {
        config.wallet = makeWalletFromAddress(
          config.provider,
          network,
          address,
          utxos,
        );
      },
    },
    currentSlot: () => {
      return unixTimeToSlot(config.network, Date.now());
    },
    utxosAt: (addressOrCredential: string | Credential) =>
      config.provider.getUtxos(addressOrCredential),
    utxosAtWithUnit: (addressOrCredential: string | Credential, unit: Unit) =>
      config.provider.getUtxosWithUnit(addressOrCredential, unit),
    utxoByUnit: (unit: Unit) => config.provider.getUtxoByUnit(unit),
    utxosByOutRef: (outRefs: OutRef[]) =>
      config.provider.getUtxosByOutRef(outRefs),
    delegationAt: config.provider.getDelegation,
    awaitTx: (txHash: TxHash, checkInterval?: number) =>
      config.provider.awaitTx(txHash, checkInterval),
    datumOf: <T extends Data>(utxo: UTxO, type?: T | undefined) =>
      datumOf(config.provider, utxo, type),
    metadataOf: (unit: string) => metadataOf(config.provider, unit),
  };
};
