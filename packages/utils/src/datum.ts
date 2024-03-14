import { Datum, DatumHash } from "@anastasia-labs/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export function datumToHash(datum: Datum): DatumHash {
  return CML.hash_plutus_data(CML.PlutusData.from_cbor_hex(datum)).to_hex();
}
