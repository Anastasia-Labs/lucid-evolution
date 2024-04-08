import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { fromHex } from "@lucid-evolution/core-utils";
import { C } from "lucid-cardano";

export function toCMLTransactionHash(body: CML.TransactionBody) {
  const TransactionHash = C.hash_transaction(
    C.TransactionBody.from_bytes(fromHex(body.to_cbor_hex())),
  );
  return CML.TransactionHash.from_hex(TransactionHash.to_hex());
}
