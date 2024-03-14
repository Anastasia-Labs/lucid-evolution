import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
// import { Lucid, TxComplete } from "../lucid/mod.js";
import { crc8 } from "@anastasia-labs/crc8";
import {
  Assets,
  Datum,
  DatumHash,
  NativeScript,
  OutRef,
  PolicyId,
  PrivateKey,
  PublicKey,
  Script,
  TxOutput,
  Unit,
  UTxO,
  Native,
} from "@anastasia-labs/core-types";
import { nativeJSFromJson } from "./native.js";

export function  datumToHash(datum: Datum): DatumHash {
    return CML.hash_plutus_data(CML.PlutusData.from_cbor_hex(datum)).to_hex();
  }

export function toPublicKey(privateKey: PrivateKey): PublicKey {
  return CML.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}

/** Padded number in Hex. */
function checksum(num: string): string {
  return crc8(fromHex(num)).toString(16).padStart(2, "0");
}

export function toLabel(num: number): string {
  if (num < 0 || num > 65535) {
    throw new Error(
      `Label ${num} out of range: min label 1 - max label 65535.`,
    );
  }
  const numHex = num.toString(16).padStart(4, "0");
  return "0" + numHex + checksum(numHex) + "0";
}

export function fromLabel(label: string): number | null {
  if (label.length !== 8 || !(label[0] === "0" && label[7] === "0")) {
    return null;
  }
  const numHex = label.slice(1, 5);
  const num = parseInt(numHex, 16);
  const check = label.slice(5, 7);
  return check === checksum(numHex) ? num : null;
}

/**
 * @param name Hex encoded
 */
export function toUnit(
  policyId: PolicyId,
  name?: string | null,
  label?: number | null,
): Unit {
  const hexLabel = Number.isInteger(label) ? toLabel(label!) : "";
  const n = name ? name : "";
  if ((n + hexLabel).length > 64) {
    throw new Error("Asset name size exceeds 32 bytes.");
  }
  if (policyId.length !== 56) {
    throw new Error(`Policy id invalid: ${policyId}.`);
  }
  return policyId + hexLabel + n;
}

/**
 * Splits unit into policy id, asset name (entire asset name), name (asset name without label) and label if applicable.
 * name will be returned in Hex.
 */
export function fromUnit(unit: Unit): {
  policyId: PolicyId;
  assetName: string | null;
  name: string | null;
  label: number | null;
} {
  const policyId = unit.slice(0, 56);
  const assetName = unit.slice(56) || null;
  const label = fromLabel(unit.slice(56, 64));
  const name = (() => {
    const hexName = Number.isInteger(label) ? unit.slice(64) : unit.slice(56);
    return hexName || null;
  })();
  return { policyId, assetName, name, label };
}


// export function applyParamsToScript<T extends unknown[] = Data[]>(
//   plutusScript: string,
//   params: Exact<[...T]>,
//   type?: T
// ): string {
//   const p = (type ? Data.castTo<T>(params, type) : params) as Data[];
//   return toHex(
//     CML.apply_params_to_plutus_script(
//       CML.PlutusList.from_bytes(fromHex(Data.to<Data[]>(p))),
//       CML.PlutusScript.from_bytes(
//         fromHex(applyDoubleCborEncoding(plutusScript))
//       )
//     ).to_bytes()
//   );
// }


export function addAssets(...assets: Assets[]): Assets {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (Object.hasOwn(b, k)) {
        a[k] = (a[k] || 0n) + b[k];
      }
    }
    return a;
  }, {});
}
