import {
  Address,
  Network,
  SpendingValidator,
  Credential,
  Validator,
  ScriptHash,
  Script,
  MintingPolicy,
  PolicyId,
  CertificateValidator,
  WithdrawalValidator,
  RewardAddress,
  NativeScript,
  Native,
  Exact,
} from "@lucid-evolution/core-types";
import { CML } from "./core.js";
import { networkToId } from "./network.js";
import { applyDoubleCborEncoding } from "./cbor.js";
import { nativeJSFromJson } from "./native.js";
import { Data } from "@lucid-evolution/plutus";
import * as UPLC from "@lucid-evolution/uplc";
import { fromHex, toHex } from "@lucid-evolution/core-utils";

export function validatorToAddress(
  network: Network,
  validator: SpendingValidator,
  stakeCredential?: Credential
): Address {
  const validatorHash = validatorToScriptHash(validator);
  if (stakeCredential) {
    return CML.BaseAddress.new(
      networkToId(network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash)
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash)
          )
    )
      .to_address()
      .to_bech32(undefined);
  } else {
    return CML.EnterpriseAddress.new(
      networkToId(network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash))
    )
      .to_address()
      .to_bech32(undefined);
  }
}

export function validatorToScriptHash(validator: Validator): ScriptHash {
  switch (validator.type) {
    case "Native":
      return CML.NativeScript.from_cbor_hex(validator.script).hash().to_hex();
    case "PlutusV1":
      return CML.PlutusScript.from_v1(
        CML.PlutusV1Script.from_cbor_hex(
          applyDoubleCborEncoding(validator.script)
        )
      )
        .hash()
        .to_hex();
    case "PlutusV2":
      return CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(
          applyDoubleCborEncoding(validator.script)
        )
      )
        .hash()
        .to_hex();
    default:
      throw new Error("No variant matched");
  }
}

export function toScriptRef(script: Script): CML.Script {
  switch (script.type) {
    case "Native":
      return CML.Script.new_native(
        CML.NativeScript.from_cbor_hex(script.script)
      );
    case "PlutusV1":
      return CML.Script.new_plutus_v1(
        CML.PlutusV1Script.from_cbor_hex(applyDoubleCborEncoding(script.script))
      );
    case "PlutusV2":
      return CML.Script.new_plutus_v2(
        CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script.script))
      );
    default:
      throw new Error("No variant matched.");
  }
}

export function fromScriptRef(scriptRef: CML.Script): Script {
  const kind = scriptRef.kind();
  switch (kind) {
    case 0:
      return {
        type: "Native",
        script: scriptRef.as_native()!.to_cbor_hex(),
      };
    case 1:
      return {
        type: "PlutusV1",
        script: scriptRef.as_plutus_v1()!.to_cbor_hex(),
      };
    case 2:
      return {
        type: "PlutusV2",
        script: scriptRef.as_plutus_v2()!.to_cbor_hex(),
      };
    default:
      throw new Error("No variant matched.");
  }
}

export function mintingPolicyToId(mintingPolicy: MintingPolicy): PolicyId {
  return validatorToScriptHash(mintingPolicy);
}

export function nativeFromJson(nativeScript: Native): Script {
  return nativeJSFromJson(nativeScript);
}

/**
 * Convert a native script from Json to the Hex representation.
 * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
 */
export function nativeScriptFromJson(nativeScript: NativeScript): Script {
  return {
    type: "Native",
    script: CML.NativeScript.from_json(
      JSON.stringify(nativeScript)
    ).to_cbor_hex(),
  };
}

export function applyParamsToScript<T extends unknown[] = Data[]>(
  plutusScript: string,
  params: Exact<[...T]>,
  type?: T
): string {
  const p = (type ? Data.castTo<T>(params, type) : params) as Data[];
  return toHex(
    UPLC.apply_params_to_script(fromHex(Data.to(p)), fromHex(plutusScript))
  );
}
