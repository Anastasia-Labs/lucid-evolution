import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs"

/** Returns double cbor encoded script. If script is already double cbor encoded it's returned as it is. */
export function applyDoubleCborEncoding(script: string): string {
  try {
    CML.PlutusScript.from_v2(
      CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(script),
      ).as_v2()!,
    );
    return script;
  } catch (_e) {
    return CML.PlutusScript.from_v2(CML.PlutusV2Script.from_cbor_hex(script))
      .as_v2()!
      .to_cbor_hex();
  }
}