import { applyDoubleCborEncoding } from "@lucid-evolution/utils";
import {
  CertificateValidator,
  MintingPolicy,
  SpendingValidator,
  WithdrawalValidator,
} from "@lucid-evolution/core-types";
import { CML } from "../../core.js";

export const attachScript = ({
  type,
  script,
}:
  | SpendingValidator
  | MintingPolicy
  | CertificateValidator
  | WithdrawalValidator) => {
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
