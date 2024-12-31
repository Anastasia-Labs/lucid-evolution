import * as Script from "./Script.js";
import * as Network from "./Network.js";
import * as Address from "./Address.js";

export type Validator =
  | Script.Minting
  | Script.Spending
  | Script.Certificate
  | Script.Withdrawal
  | Script.Vote
  | Script.Propose;

export function toAddress(
  network: Network.Network,
  validator: Script.Spending,
  stakeCredential?: Credential,
): Address.Address {
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

export function toScriptHash(validator: Validator): ScriptHash {
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
