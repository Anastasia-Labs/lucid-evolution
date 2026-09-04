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
} from "@lucid-evolution/core-types";
import { CML } from "./core.js";
import { networkToId } from "./network.js";
import { applyDoubleCborEncoding } from "./cbor.js";
import { Data } from "@lucid-evolution/plutus";
import {
  Application,
  encodeUPLC,
  parseUPLC,
  UPLCConst,
  UPLCProgram,
} from "@harmoniclabs/uplc";
import { fromHex, toHex, withCMLScope } from "@lucid-evolution/core-utils";
import { decode } from "cbor-x";
import { dataFromCbor } from "@harmoniclabs/plutus-data";

export function validatorToAddress(
  network: Network,
  validator: SpendingValidator,
  stakeCredential?: Credential,
): Address {
  const validatorHash = validatorToScriptHash(validator);
  return withCMLScope((own) => {
    const paymentCredential = own(
      CML.Credential.new_script(own(CML.ScriptHash.from_hex(validatorHash))),
    );
    if (stakeCredential) {
      const stake =
        stakeCredential.type === "Key"
          ? own(
              CML.Credential.new_pub_key(
                own(CML.Ed25519KeyHash.from_hex(stakeCredential.hash)),
              ),
            )
          : own(
              CML.Credential.new_script(
                own(CML.ScriptHash.from_hex(stakeCredential.hash)),
              ),
            );
      const address = own(
        CML.BaseAddress.new(networkToId(network), paymentCredential, stake),
      );
      return own(address.to_address()).to_bech32(undefined);
    }
    const address = own(
      CML.EnterpriseAddress.new(networkToId(network), paymentCredential),
    );
    return own(address.to_address()).to_bech32(undefined);
  });
}

export function validatorToScriptHash(validator: Validator): ScriptHash {
  return withCMLScope((own) => {
    switch (validator.type) {
      case "Native":
        return own(
          own(CML.NativeScript.from_cbor_hex(validator.script)).hash(),
        ).to_hex();
      case "PlutusV1": {
        const script = own(
          CML.PlutusV1Script.from_cbor_hex(
            applyDoubleCborEncoding(validator.script),
          ),
        );
        return own(own(CML.PlutusScript.from_v1(script)).hash()).to_hex();
      }
      case "PlutusV2": {
        const script = own(
          CML.PlutusV2Script.from_cbor_hex(
            applyDoubleCborEncoding(validator.script),
          ),
        );
        return own(own(CML.PlutusScript.from_v2(script)).hash()).to_hex();
      }
      case "PlutusV3": {
        const script = own(
          CML.PlutusV3Script.from_cbor_hex(
            applyDoubleCborEncoding(validator.script),
          ),
        );
        return own(own(CML.PlutusScript.from_v3(script)).hash()).to_hex();
      }
      default:
        throw new Error("No variant matched");
    }
  });
}

export function toScriptRef(script: Script): CML.Script {
  return withCMLScope((own) => {
    switch (script.type) {
      case "Native":
        return CML.Script.new_native(
          own(CML.NativeScript.from_cbor_hex(script.script)),
        );
      case "PlutusV1":
        return CML.Script.new_plutus_v1(
          own(
            CML.PlutusV1Script.from_cbor_hex(
              applyDoubleCborEncoding(script.script),
            ),
          ),
        );
      case "PlutusV2":
        return CML.Script.new_plutus_v2(
          own(
            CML.PlutusV2Script.from_cbor_hex(
              applyDoubleCborEncoding(script.script),
            ),
          ),
        );
      case "PlutusV3":
        return CML.Script.new_plutus_v3(
          own(
            CML.PlutusV3Script.from_cbor_hex(
              applyDoubleCborEncoding(script.script),
            ),
          ),
        );
      default:
        throw new Error("No variant matched.");
    }
  });
}

export function fromScriptRef(scriptRef: CML.Script): Script {
  return withCMLScope((own) => {
    const kind = scriptRef.kind();
    switch (kind) {
      case 0:
        return {
          type: "Native",
          script: own(scriptRef.as_native()!).to_cbor_hex(),
        };
      case 1:
        return {
          type: "PlutusV1",
          script: own(scriptRef.as_plutus_v1()!).to_cbor_hex(),
        };
      case 2:
        return {
          type: "PlutusV2",
          script: own(scriptRef.as_plutus_v2()!).to_cbor_hex(),
        };
      case 3:
        return {
          type: "PlutusV3",
          script: own(scriptRef.as_plutus_v3()!).to_cbor_hex(),
        };
      default:
        throw new Error("No variant matched.");
    }
  });
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
