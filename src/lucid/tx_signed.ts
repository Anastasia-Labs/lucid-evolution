import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs"
import type { Transaction, TxHash } from "../types/mod.ts";
import { Lucid } from "./lucid.js";
import { toHex } from "../utils/mod.js";

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
    return CML.TransactionHash.from_raw_bytes(this.txSigned.body().to_cbor_bytes()).to_hex();
  }
}
