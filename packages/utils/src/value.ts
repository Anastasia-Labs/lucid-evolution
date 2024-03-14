import { Assets } from "@anastasia-labs/core-types";
import { toText } from "@anastasia-labs/core-utils";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export function valueToAssets(value: CML.Value): Assets {
  const assets: Assets = {};
  assets["lovelace"] = value.coin();
  const ma = value.multi_asset();
  if (ma) {
    const multiAssets = ma.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = ma.get_assets(policy)!;
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset)!;
        const unit = policy.to_hex() + policyAsset.to_cbor_hex();
        assets[unit] = quantity;
      }
    }
  }
  return assets;
}

export function assetsToValue(assets: Assets): CML.Value {
  const multiAsset = CML.MultiAsset.new();
  const lovelace = assets["lovelace"];
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units
        .filter((unit) => unit !== "lovelace")
        .map((unit) => unit.slice(0, 56))
    )
  );
  policies.forEach((policy) => {
    const policyUnits = units.filter((unit) => unit.slice(0, 56) === policy);
    const assetsValue = CML.MapAssetNameToCoin.new();
    policyUnits.forEach((unit) => {
      assetsValue.insert(
        CML.AssetName.from_str(toText(unit.slice(56))),
        BigInt(assets[unit])
      );
    });
    multiAsset.insert_assets(CML.ScriptHash.from_hex(policy), assetsValue);
  });
  return CML.Value.new(lovelace, multiAsset);
}
