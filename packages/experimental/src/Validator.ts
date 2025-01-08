import * as Network from "./Network.js";
import * as CBOR from "./CBOR.js";
import {
  PolicyId,
  ScriptHash,
  Credential,
  Spending,
  Address,
  Script,
  Minting,
} from "./Type.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export function toAddress(
  network: Network.Network,
  validator: Spending,
  stakeCredential?: Credential,
): Address {
  const validatorHash = toScriptHash(validator);
  if (stakeCredential) {
    return CML.BaseAddress.new(
      Network.toId(network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash),
          ),
    )
      .to_address()
      .to_bech32(undefined);
  } else {
    return CML.EnterpriseAddress.new(
      Network.toId(network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
    )
      .to_address()
      .to_bech32(undefined);
  }
}

export function toScriptHash(validator: Script): ScriptHash {
  switch (validator.type) {
    case "Native":
      return CML.NativeScript.from_cbor_hex(validator.script).hash().to_hex();
    case "PlutusV1":
      return CML.PlutusScript.from_v1(
        CML.PlutusV1Script.from_cbor_hex(
          CBOR.applyDoubleCborEncoding(validator.script),
        ),
      )
        .hash()
        .to_hex();
    case "PlutusV2":
      return CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(
          CBOR.applyDoubleCborEncoding(validator.script),
        ),
      )
        .hash()
        .to_hex();
    case "PlutusV3":
      return CML.PlutusScript.from_v3(
        CML.PlutusV3Script.from_cbor_hex(
          CBOR.applyDoubleCborEncoding(validator.script),
        ),
      )
        .hash()
        .to_hex();
    default:
      throw new Error("No variant matched");
  }
}

/**
 * Convert a minting policy to a policy id.
 * @example
 * ```ts
 * import { Validator } from "@lucid-evolution/..."
 * const mintingPolicy = {
 *  type: "PlutusV3",
 *  script: "..."
 * }
 * Validator.toPolicyId(mintingPolicy);
 * ```
 * @since 1.0.0
 */
export function toPolicyId(mintingPolicy: Minting): PolicyId {
  return toScriptHash(mintingPolicy);
}
