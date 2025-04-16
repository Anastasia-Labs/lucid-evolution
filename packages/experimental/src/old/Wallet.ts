import * as UTXO from "./UTXO.js";
import * as OutRef from "./OutRef.js";
import * as Address from "./Address_old.js";
import * as RewardAddress from "./Address_old.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as Delegation from "./Delegation.js";
import * as Transaction from "./Transaction.js";

/** Hex */
export type Payload = string;

export type SignedMessage = { signature: string; key: string };

//TODO: make it generic or remove it from core
export interface Wallet {
  overrideUTxOs(utxos: UTXO.UTxO[]): void;
  address(): Promise<Address.Address>;
  rewardAddress(): Promise<RewardAddress.RewardAddress | null>;
  getUtxos(): Promise<UTXO.UTxO[]>;
  getUtxosCore(): Promise<Array<CML.TransactionUnspentOutput>>;
  getDelegation(): Promise<Delegation.Delegation>;
  signTx(tx: CML.Transaction): Promise<CML.TransactionWitnessSet>;
  signMessage(
    address: Address.Address | Address.RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage>;
  submitTx(signedTx: Transaction.Transaction): Promise<OutRef.TxHash>;
}
