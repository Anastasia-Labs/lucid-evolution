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
  Exact,
} from "@evolution-sdk/core-types";
import { CML } from "./core.js";
import { networkToId } from "./network.js";
import { applyDoubleCborEncoding } from "./cbor.js";
import { Data } from "@evolution-sdk/plutus";
import {
  Application,
  encodeUPLC,
  parseUPLC,
  UPLCConst,
  UPLCProgram,
} from "@harmoniclabs/uplc";
import { fromHex, toHex } from "@evolution-sdk/core-utils";
import { decode } from "cbor-x";
import { dataFromCbor } from "@harmoniclabs/plutus-data";

export function validatorToAddress(
  network: Network,
  validator: SpendingValidator,
  stakeCredential?: Credential,
): Address {
  const validatorHash = validatorToScriptHash(validator);
  if (stakeCredential) {
    return CML.BaseAddress.new(
      networkToId(network),
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
      networkToId(network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
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
          applyDoubleCborEncoding(validator.script),
        ),
      )
        .hash()
        .to_hex();
    case "PlutusV2":
      return CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(
          applyDoubleCborEncoding(validator.script),
        ),
      )
        .hash()
        .to_hex();
    case "PlutusV3":
      return CML.PlutusScript.from_v3(
        CML.PlutusV3Script.from_cbor_hex(
          applyDoubleCborEncoding(validator.script),
        ),
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
        CML.NativeScript.from_cbor_hex(script.script),
      );
    case "PlutusV1":
      return CML.Script.new_plutus_v1(
        CML.PlutusV1Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
      );
    case "PlutusV2":
      return CML.Script.new_plutus_v2(
        CML.PlutusV2Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
      );
    case "PlutusV3":
      return CML.Script.new_plutus_v3(
        CML.PlutusV3Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
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
    case 3:
      return {
        type: "PlutusV3",
        script: scriptRef.as_plutus_v3()!.to_cbor_hex(),
      };
    default:
      throw new Error("No variant matched.");
  }
}

export function mintingPolicyToId(mintingPolicy: MintingPolicy): PolicyId {
  return validatorToScriptHash(mintingPolicy);
}

/**
 * Applies a list of parameters, in the form of the `Data` type, to a CBOR encoded script.
 *
 * The `plutusScript` must be double CBOR encoded(bytes). Ensure to use the `applyDoubleCborEncoding` function.
 */
export function applyParamsToScript<T extends unknown[] = Data[]>(
  plutusScript: string,
  params: Exact<[...T]>,
  type?: T,
): string {
  const program = parseUPLC(
    decode(decode(fromHex(applyDoubleCborEncoding(plutusScript)))),
    "flat",
  );
  const parameters = (type ? Data.castTo<T>(params, type) : params) as Data[];
  const appliedProgram = parameters.reduce((body, currentParameter) => {
    const data = UPLCConst.data(dataFromCbor(Data.to(currentParameter)));
    const appliedParameter = new Application(body, data);
    return appliedParameter;
  }, program.body);

  return applyDoubleCborEncoding(
    toHex(
      encodeUPLC(new UPLCProgram(program.version, appliedProgram)).toBuffer()
        .buffer,
    ),
  );
}
