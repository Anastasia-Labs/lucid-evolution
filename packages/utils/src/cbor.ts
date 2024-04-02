import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { fromHex, toHex } from "@lucid-evolution/core-utils";

import { encode } from "cborg";
export { applyDoubleCborEncoding } from "lucid-cardano";
// TODO: use the below instead
// toHex(cbor.encode(fromHex(helloCBOR)))
/** Returns double cbor encoded script. If script is already double cbor encoded it's returned as it is. */
// export function applyDoubleCborEncoding(script: string): string {
//   // return toHex(encode(fromHex(script)));
//   try {
//     CML.PlutusScript.from_v2(
//       CML.PlutusV2Script.from_cbor_bytes(
//         CML.PlutusV2Script.from_cbor_bytes(fromHex(script)).to_cbor_bytes()
//       )
//     );
//     return script;
//   } catch (_e) {
//   console.log(_e)
//     return CML.PlutusScript.from_v2(
//       CML.PlutusV2Script.from_cbor_bytes(fromHex(script))
//     )
//       .as_v2()!
//       .to_cbor_hex();
//   }
// }
