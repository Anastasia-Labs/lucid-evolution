import {
  applyDoubleCborEncoding,
  validatorToScriptHash,
} from "@lucid-evolution/utils";
import {
  CertificateValidator,
  MintingPolicy,
  ProposeValidator,
  SpendingValidator,
  Validator,
  VoteValidator,
  WithdrawalValidator,
} from "@lucid-evolution/core-types";

/**
 * Keys a script by its hash and stores Plutus scripts double CBOR encoded.
 * Both conversions are memoized per script, so attaching the same script
 * again (every `readFrom` of a reference script, for example) is cheap.
 */
export const attachScript = ({ type, script }: Validator) => {
  //TODO: script should be a branded type
  switch (type) {
    case "Native":
      return {
        key: validatorToScriptHash({ type, script }),
        value: { type, script },
      };
    case "PlutusV1":
    case "PlutusV2":
    case "PlutusV3":
      return {
        key: validatorToScriptHash({ type, script }),
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
