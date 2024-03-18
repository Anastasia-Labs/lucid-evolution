import {
  Network,
  PrivateKey,
  Provider,
  Wallet,
} from "@anastasia-labs/core-types";
import {
  makeTxBuilder,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "./utils.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { Blockfrost } from "lucid-cardano";

export class newLucid {
  #txBuilderConfig: CML.TransactionBuilderConfig;
  wallet: Wallet | undefined;
  #provider: Provider;
  #network: Network;
  private constructor(
    provider: Provider,
    network: Network,
    wallet: Wallet | undefined,
    txBuilderConfig: CML.TransactionBuilderConfig,
  ) {
    this.#txBuilderConfig = txBuilderConfig;
    this.wallet = wallet;
    this.#provider = provider;
    this.#network = network;
  }
  static async make(provider: Provider, network: Network) {
    //TODO: provider shuold set the network then this.#network = provider.network
    const txbuilderconfig = await makeTxBuilder(provider);
    return new newLucid(provider, network, undefined, txbuilderconfig);
  }
  getConfig() {
    return {
      txbuilder: this.#txBuilderConfig,
      wallet: this.wallet,
      provider: this.#provider,
      network: this.#network,
    };
  }
  async switchProvider(provider: Provider) {
    const txbuilderconfig = await makeTxBuilder(provider);
    this.#txBuilderConfig = txbuilderconfig;
    this.#provider = provider;
    return this;
  }
  selectWallet() {
    return {
      fromSeed: (seed: string) => {
        this.wallet = makeWalletFromSeed(this.#provider, seed, this.#network);
        return this;
      },
    };
  }
}

const newL = await newLucid.make(
  new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0",
    "preprodOr3zZOkFc8Sqa5sp3aa9oGTb1wxulzhy",
  ),
  "Preprod",
);
console.log(newL.getConfig());
newL
  .selectWallet()
  .fromSeed(
    "jewel solid busy tomorrow woman magnet diagram husband shaft kingdom ritual humble mouse level equip seven swim web bid street inflict please exact desk",
  );
console.log(await newL.wallet?.getUtxos());
