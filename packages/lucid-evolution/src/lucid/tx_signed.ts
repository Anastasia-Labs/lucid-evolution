import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import type { Transaction, TxHash } from "../types/mod.js";
import { Lucid } from "./lucid.js";
import { toCMLTransactionHash } from "../tx-builder/utils.js";

export class TxSigned {
  txSigned: CML.Transaction;
  private lucid: Lucid;
  constructor(lucid: Lucid, tx: CML.Transaction) {
    this.lucid = lucid;
    this.txSigned = tx;
  }

  async submit(): Promise<TxHash> {
    return await (this.lucid.wallet || this.lucid.provider).submitTx(
      this.txSigned.to_cbor_hex(),
    );
  }

  /** Returns the transaction in Hex encoded Cbor. */
  toString(): Transaction {
    return this.txSigned.to_cbor_hex();
  }

  /** Return the transaction hash. */
  toHash(): TxHash {
    return toCMLTransactionHash(this.txSigned.body()).to_hex();
  }
}
