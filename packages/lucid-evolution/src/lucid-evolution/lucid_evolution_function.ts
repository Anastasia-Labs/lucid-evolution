import {
  Credential,
  Network,
  PrivateKey,
  Provider,
  Wallet,
  WalletApi,
} from "@anastasia-labs/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { datumOf, makeConfigBuilder, metadataOf } from "./utils.js";
import { unixTimeToSlot } from "@anastasia-labs/utils";
import {
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "./wallet_selection.js";
import { TxBuilder, makeTxBuilder } from "../tx-builder/Tx.js";

export type LucidConfig = {
  provider: Provider;
  network: Network;
  wallet: Wallet | undefined;
  txbuilderconfig: CML.TransactionBuilderConfig;
};

export const makeLucid = async (provider: Provider, network: Network) => {
  const config: LucidConfig = {
    provider: provider,
    network: network,
    wallet: undefined,
    txbuilderconfig: await makeConfigBuilder(provider),
  };
  return {
    txbuilderconfig: () => config.txbuilderconfig,
    wallet: () => config.wallet as Wallet,
    switchProvider: async (provider: Provider) => {
      config.provider = provider;
      config.txbuilderconfig = await makeConfigBuilder(provider);
    },
    newTx: (): TxBuilder => makeTxBuilder(config),
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
