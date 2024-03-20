import { applyDoubleCborEncoding } from "@lucid-evolution/utils";
import {
  CertificateValidator,
  MintingPolicy,
  SpendingValidator,
  WithdrawalValidator,
} from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "./types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export const attachScript = (
  config: TxBuilderConfig,
  {
    type,
    script,
  }:
    | SpendingValidator
    | MintingPolicy
    | CertificateValidator
    | WithdrawalValidator,
) => {
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
        value: { type, script },
      };
    case "PlutusV2":
      return {
        key: CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script))
          .hash()
          .to_hex(),
        value: { script, type },
      };
  }
};
export const attachSpendingValidator = (
  config: TxBuilderConfig,
  spendingValidator: SpendingValidator,
) => {
  return attachScript(config, spendingValidator);
};

export const attachMintingPolicy = (
  config: TxBuilderConfig,
  mintingPolicy: MintingPolicy,
) => {
  return attachScript(config, mintingPolicy);
};

export const attachCertificateValidator = (
  config: TxBuilderConfig,
  certValidator: CertificateValidator,
) => {
  return attachScript(config, certValidator);
};

export const attachWithdrawalValidator = (
  config: TxBuilderConfig,
  withdrawalValidator: WithdrawalValidator,
) => {
  return attachScript(config, withdrawalValidator);
};
