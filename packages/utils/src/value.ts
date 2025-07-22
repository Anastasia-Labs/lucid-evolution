import { Assets, PolicyId, UTxO, Unit } from "@evolution-sdk/core-types";
import { fromHex, fromText, toHex, toText } from "@evolution-sdk/core-utils";
import { CML } from "./core.js";
import { fromLabel, toLabel } from "./label.js";
import { pipe } from "effect";

export function valueToAssets(value: CML.Value): Assets {
  const assets: Assets = {};
  assets["lovelace"] = value.coin();
  if (value.has_multiassets()) {
    const ma = value.multi_asset();
    const multiAssets = ma.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = ma.get_assets(policy)!;
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset)!;
        // Note: Using policyAsset.to_js_value() as a work around till AssetName provides to_hex() method
        // https://github.com/dcSpark/cardano-multiplatform-lib/issues/334
        const unit = policy.to_hex() + policyAsset.to_js_value();
        assets[unit] = quantity;
      }
    }
  }
  return assets;
}

export function assetsToValue(assets: Assets): CML.Value {
  const multiAsset = CML.MultiAsset.new();
  const lovelace = assets["lovelace"] ? BigInt(assets["lovelace"]) : 0n;
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units
        .filter((unit) => unit !== "lovelace")
        .map((unit) => unit.slice(0, 56)),
    ),
  );
  for (const policy of policies) {
    const policyUnits = units.filter((unit) => unit.slice(0, 56) === policy);
    const assetsValue = CML.MapAssetNameToCoin.new();
    for (const unit of policyUnits) {
      assetsValue.insert(
        CML.AssetName.from_hex(unit.slice(56)),
        BigInt(assets[unit]),
      );
    }
    multiAsset.insert_assets(CML.ScriptHash.from_hex(policy), assetsValue);
  }
  return CML.Value.new(lovelace, multiAsset);
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

export function addAssets(...assets: Assets[]): Assets {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (Object.hasOwn(b, k)) {
        const sum = (a[k] || 0n) + b[k];
        if (sum === 0n) {
          delete a[k];
        } else {
          a[k] = sum;
        }
      }
    }
    return a;
  }, {});
}

/**
 * Returns a unique token name which is SHA3-256 hash of UTxO's txid and idx
 * @param utxo UTxO whose OutRef will be used
 */
export async function getUniqueTokenName(utxo: UTxO): Promise<string> {
  const id = fromHex(utxo.txHash);
  const data = new Uint8Array([utxo.outputIndex, ...id]);

  const hash = new Uint8Array(await crypto.subtle.digest("SHA3-256", data));

  return toHex(hash);
}

/**
 *
 * Sort Assets following [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) sorting rules
 */
export const sortCanonical = (assets: Assets): Assets =>
  pipe(
    Object.entries(assets).sort(([aUnit], [bUnit]) => {
      const a = fromUnit(aUnit);
      const b = fromUnit(bUnit);
      // Compare policy lengths
      // NOTE: all policies have the same length, because they must be 28 bytes
      // but because Lovelace is in the assets we must compare the length
      if (a.policyId.length !== b.policyId.length)
        return a.policyId.length - b.policyId.length;
      // If policy IDs are the same, compare asset names length
      if (a.policyId === b.policyId) {
        const aAssetName = a.assetName || "";
        const bAssetName = b.assetName || "";
        if (aAssetName.length !== bAssetName.length)
          return aAssetName.length - bAssetName.length;
        // If asset names have same length but are different, compare them lexicographically
        return aAssetName.localeCompare(bAssetName);
      }
      // If policy IDs have same length but are different, compare them lexicographically
      return a.policyId.localeCompare(b.policyId);
    }),
    Object.fromEntries,
  );
