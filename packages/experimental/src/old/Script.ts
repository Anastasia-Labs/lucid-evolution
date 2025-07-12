import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as Data from "../Data.js";
import * as UPLC from "@harmoniclabs/uplc";
import * as Bytes from "../Bytes.js";
import * as CBORX from "cbor-x";
import { dataFromCbor } from "@harmoniclabs/plutus-data";
import { Schema } from "effect";
import * as ScriptHash from "./ScriptHash_old.js";
import * as Network from "../Network.js";
import * as Address from "./Address_old.js";
import * as Credential from "./Credential_old.js";
import * as Policy from "./Policy.js";

export type Minting = Script;
export type Spending = Script;
export type Certificate = Script;
export type Withdrawal = Script;
export type Vote = Script;
export type Propose = Script;

export type Script = { type: ScriptType; script: string };
export type ScriptType = "Native" | PlutusVersion;
export type PlutusVersion = "PlutusV1" | "PlutusV2" | "PlutusV3";

export function toCMLScript(script: Script): CML.Script {
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

export function fromCMLScript(script: CML.Script): Script {
  const kind = script.kind();
  switch (kind) {
    case 0:
      return {
        type: "Native",
        script: script.as_native()!.to_cbor_hex(),
      };
    case 1:
      return {
        type: "PlutusV1",
        script: script.as_plutus_v1()!.to_cbor_hex(),
      };
    case 2:
      return {
        type: "PlutusV2",
        script: script.as_plutus_v2()!.to_cbor_hex(),
      };
    case 3:
      return {
        type: "PlutusV3",
        script: script.as_plutus_v3()!.to_cbor_hex(),
      };
    default:
      throw new Error(
        `Exhaustive check failed: Unhandled case '${kind}' encountered.`,
      );
  }
}

/**
 * Applies a list of parameters, in the form of the `Data` type, to a CBOR encoded script.
 *
 * The `plutusScript` must be double CBOR encoded(bytes). Ensure to use the `applyDoubleCborEncoding` function.
 */
export function applyParamsToScript<
  Source,
  Target extends Data.Data,
  T extends Target[],
>(
  plutusScript: string,
  params: T,
  type?: Schema.Schema<Source, Target>,
): string {
  const program = UPLC.parseUPLC(
    CBORX.decode(
      CBORX.decode(Bytes.fromHexOrThrow(applyDoubleCborEncoding(plutusScript))),
    ),
    "flat",
  );
  const parameters = type
    ? params.map((param) => Data.encodeDataOrThrow(param, type))
    : params;
  const appliedProgram = parameters.reduce((body, currentParameter) => {
    const data = UPLC.UPLCConst.data(
      dataFromCbor(Data.encodeCBOROrThrow(currentParameter)),
    );
    const appliedParameter = new UPLC.Application(body, data);
    return appliedParameter;
  }, program.body);

  return applyDoubleCborEncoding(
    Bytes.toHexOrThrow(
      UPLC.encodeUPLC(
        new UPLC.UPLCProgram(program.version, appliedProgram),
      ).toBuffer().buffer,
    ),
  );
}

// 1st byte (58) 0101(major type 2) , 1000 (additional info)
// 2n byte byte represents the lenght of the content
// 3rd byte represents bytestring content
// https://www.rfc-editor.org/rfc/rfc7049#section-2.1
// Apply double bytestring enconding of type `major type 2`
export const applyDoubleCborEncoding = (script: string): string => {
  try {
    CBORX.decode(CBORX.decode(Bytes.fromHexOrThrow(script)));
    return script;
  } catch (error) {
    try {
      CBORX.decode(Bytes.fromHexOrThrow(script));
      return Bytes.toHexOrThrow(
        Uint8Array.from(CBORX.encode(Bytes.fromHexOrThrow(script).buffer)),
      );
    } catch (error) {
      return Bytes.toHexOrThrow(
        Uint8Array.from(
          CBORX.encode(CBORX.encode(Bytes.fromHexOrThrow(script).buffer)),
        ),
      );
    }
  }
};

export const applySingleCborEncoding = (script: string): string => {
  try {
    CBORX.decode(CBORX.decode(Bytes.fromHexOrThrow(script)));
    return Bytes.toHexOrThrow(CBORX.decode(Bytes.fromHexOrThrow(script)));
  } catch (error) {
    try {
      CBORX.decode(Bytes.fromHexOrThrow(script));
      return script;
    } catch (error) {
      return Bytes.toHexOrThrow(
        Uint8Array.from(CBORX.encode(Bytes.fromHexOrThrow(script).buffer)),
      );
    }
  }
};

export const CBOREncodingLevel = (script: string): "double" | "single" => {
  try {
    CBORX.decode(CBORX.decode(Bytes.fromHexOrThrow(script)));
    return "double" as const;
  } catch (error) {
    try {
      CBORX.decode(Bytes.fromHexOrThrow(script));
      return "single" as const;
    } catch (error) {
      throw new Error("Script is not CBOR-encoded or invalid format.");
    }
  }
};

//FIX:
// export function toAddress(
//   network: Network.Network,
//   validator: Spending,
//   stakeCredential?: Credential.Credential,
// ): Address.Address {
//   const validatorHash = toScriptHash(validator);
//   if (stakeCredential) {
//     return CML.BaseAddress.new(
//       Network.toId(network),
//       CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
//       stakeCredential.type === "Key"
//         ? CML.Credential.new_pub_key(
//             CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
//           )
//         : CML.Credential.new_script(
//             CML.ScriptHash.from_hex(stakeCredential.hash),
//           ),
//     )
//       .to_address()
//       .to_bech32(undefined);
//   } else {
//     return CML.EnterpriseAddress.new(
//       Network.toId(network),
//       CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
//     )
//       .to_address()
//       .to_bech32(undefined);
//   }
// }

export function toScriptHash(validator: Script): ScriptHash.ScriptHash {
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

/**
 * Convert a minting policy to a policy id.
 * @example
 * ```ts
 * import { Validator } from "@evolution-sdk/..."
 * const mintingPolicy = {
 *  type: "PlutusV3",
 *  script: "..."
 * }
 * Validator.toPolicyId(mintingPolicy);
 * ```
 * @since 1.0.0
 */
export function toPolicyId(mintingPolicy: Minting): Policy.PolicyId {
  return toScriptHash(mintingPolicy);
}
