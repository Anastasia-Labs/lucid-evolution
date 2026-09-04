import { applyDoubleCborEncoding } from "@lucid-evolution/utils";
import {
  CertificateValidator,
  MintingPolicy,
  ProposeValidator,
  SpendingValidator,
  Validator,
  VoteValidator,
  WithdrawalValidator,
} from "@lucid-evolution/core-types";
import { CML } from "../../core.js";
import { withCMLScope } from "@lucid-evolution/core-utils";

const scriptHashHex = (script: {
  hash(): CML.ScriptHash;
  free(): void;
}): string => withCMLScope((own) => own(own(script).hash()).to_hex());

export const attachScript = ({ type, script }: Validator) => {
  //TODO: script should be a branded type
  switch (type) {
    case "Native":
      return {
        key: scriptHashHex(CML.NativeScript.from_cbor_hex(script)),
        value: { type, script },
      };
    case "PlutusV1":
      return {
        key: scriptHashHex(
          CML.PlutusV1Script.from_cbor_hex(applyDoubleCborEncoding(script)),
        ),
        value: { type, script: applyDoubleCborEncoding(script) },
      };
    case "PlutusV2":
      return {
        key: scriptHashHex(
          CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script)),
        ),
        value: { type, script: applyDoubleCborEncoding(script) },
      };
    case "PlutusV3":
      return {
        key: scriptHashHex(
          CML.PlutusV3Script.from_cbor_hex(applyDoubleCborEncoding(script)),
        ),
        value: { type, script: applyDoubleCborEncoding(script) },
      };
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${type}`);
  }
};
export const attachSpendingValidator = (spendingValidator: SpendingValidator) =>
  attachScript(spendingValidator);

export const attachMintingPolicy = (mintingPolicy: MintingPolicy) =>
  attachScript(mintingPolicy);

export const attachCertificateValidator = (
  certValidator: CertificateValidator,
) => attachScript(certValidator);

export const attachWithdrawalValidator = (
  withdrawalValidator: WithdrawalValidator,
) => attachScript(withdrawalValidator);

export const attachVoteValidator = (voteValidator: VoteValidator) =>
  attachScript(voteValidator);

export const attachProposeValidator = (proposeValidator: ProposeValidator) =>
  attachScript(proposeValidator);
