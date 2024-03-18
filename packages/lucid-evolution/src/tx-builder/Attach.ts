import { applyDoubleCborEncoding } from "../mod.js";
import {
  CertificateValidator,
  MintingPolicy,
  SpendingValidator,
  WithdrawalValidator,
} from "@anastasia-labs/core-types";
import { Config } from "./types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export const attachScript = (
  config: Config,
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
  config: Config,
  spendingValidator: SpendingValidator,
) => {
  return attachScript(config, spendingValidator);
};

export const attachMintingPolicy = (
  config: Config,
  mintingPolicy: MintingPolicy,
) => {
  return attachScript(config, mintingPolicy);
};

export const attachCertificateValidator = (
  config: Config,
  certValidator: CertificateValidator,
) => {
  return attachScript(config, certValidator);
};

export const attachWithdrawalValidator = (
  config: Config,
  withdrawalValidator: WithdrawalValidator,
) => {
  return attachScript(config, withdrawalValidator);
};
