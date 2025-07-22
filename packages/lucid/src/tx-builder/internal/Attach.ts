import { applyDoubleCborEncoding } from "@evolution-sdk/utils";
import {
  CertificateValidator,
  MintingPolicy,
  ProposeValidator,
  SpendingValidator,
  Validator,
  VoteValidator,
  WithdrawalValidator,
} from "@evolution-sdk/core-types";
import { CML } from "../../core.js";

export const attachScript = ({ type, script }: Validator) => {
  //TODO: script should be a branded type
  switch (type) {
    case "Native":
      return {
        key: CML.NativeScript.from_cbor_hex(script).hash().to_hex(),
        value: { type, script },
      };
    case "PlutusV1":
      return {
        key: CML.PlutusV1Script.from_cbor_hex(applyDoubleCborEncoding(script))
          .hash()
          .to_hex(),
        value: { type, script: applyDoubleCborEncoding(script) },
      };
    case "PlutusV2":
      return {
        key: CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script))
          .hash()
          .to_hex(),
        value: { type, script: applyDoubleCborEncoding(script) },
      };
    case "PlutusV3":
      return {
        key: CML.PlutusV3Script.from_cbor_hex(applyDoubleCborEncoding(script))
          .hash()
          .to_hex(),
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
