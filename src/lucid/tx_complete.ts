import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import {
  PrivateKey,
  Transaction,
  TransactionWitnesses,
  TxHash,
} from "../types/mod.js";
import { Lucid } from "./lucid.js";
import { TxSigned } from "./tx_signed.js";
import { toCMLTransactionHash } from "../tx-builder/utils.js";

export class TxComplete {
  txComplete: CML.Transaction;
  witnessSetBuilder: CML.TransactionWitnessSetBuilder;
  private tasks: (() => Promise<void>)[];
  private lucid: Lucid;
  fee: number;
  exUnits: { cpu: number; mem: number } | null = null;

  constructor(lucid: Lucid, tx: CML.Transaction) {
    this.lucid = lucid;
    this.txComplete = tx;
    this.witnessSetBuilder = CML.TransactionWitnessSetBuilder.new();
    this.tasks = [];

    this.fee = parseInt(tx.body().fee().toString());
    const redeemers = tx.witness_set().redeemers();
    if (redeemers) {
      const exUnits = { cpu: 0, mem: 0 };
      for (let i = 0; i < redeemers.len(); i++) {
        const redeemer = redeemers.get(i);
        exUnits.cpu += parseInt(redeemer.ex_units().steps().toString());
        exUnits.mem += parseInt(redeemer.ex_units().mem().toString());
      }
      this.exUnits = exUnits;
    }
  }
  sign(): TxComplete {
    this.tasks.push(async () => {
      const witnesses = await this.lucid.wallet.signTx(this.txComplete);
      this.witnessSetBuilder.add_existing(witnesses);
    });
    return this;
  }

  /** Add an extra signature from a private key. */
  signWithPrivateKey(privateKey: PrivateKey): TxComplete {
    const priv = CML.PrivateKey.from_bech32(privateKey);
    const witness = CML.make_vkey_witness(
      toCMLTransactionHash(this.txComplete.body()),
      priv
    );
    this.witnessSetBuilder.add_vkey(witness);
    return this;
  }

  /** Sign the transaction and return the witnesses that were just made. */
  async partialSign(): Promise<TransactionWitnesses> {
    const witnesses = await this.lucid.wallet.signTx(this.txComplete);
    this.witnessSetBuilder.add_existing(witnesses);
    return witnesses.to_cbor_hex();
  }

  /**
   * Sign the transaction and return the witnesses that were just made.
   * Add an extra signature from a private key.
   */
  partialSignWithPrivateKey(privateKey: PrivateKey): TransactionWitnesses {
    const priv = CML.PrivateKey.from_bech32(privateKey);
    const witness = CML.make_vkey_witness(
      toCMLTransactionHash(this.txComplete.body()),
      priv
    );
    this.witnessSetBuilder.add_vkey(witness);
    const witnesses = CML.TransactionWitnessSetBuilder.new();
    witnesses.add_vkey(witness);
    return witnesses.build().to_cbor_hex();
  }

  /** Sign the transaction with the given witnesses. */
  assemble(witnesses: TransactionWitnesses[]): TxComplete {
    witnesses.forEach((witness) => {
      const witnessParsed = CML.TransactionWitnessSet.from_cbor_hex(witness);
      this.witnessSetBuilder.add_existing(witnessParsed);
    });
    return this;
  }

  async complete(): Promise<TxSigned> {
    for (const task of this.tasks) {
      await task();
    }
    this.witnessSetBuilder.add_existing(this.txComplete.witness_set());
    const signedTx = CML.Transaction.new(
      this.txComplete.body(),
      this.witnessSetBuilder.build(),
      true,
      this.txComplete.auxiliary_data()
    );
    return new TxSigned(this.lucid, signedTx);
  }

  /** Return the transaction in Hex encoded Cbor. */
  toString(): Transaction {
    return this.txComplete.to_cbor_hex();
  }

  /** Return the transaction hash. */
  toHash(): TxHash {
    return toCMLTransactionHash(this.txComplete.body()).to_hex();
  }
}
