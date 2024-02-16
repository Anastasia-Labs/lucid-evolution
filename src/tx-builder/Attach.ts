import {
  CertificateValidator,
  MintingPolicy,
  SpendingValidator,
  WithdrawalValidator,
  applyDoubleCborEncoding,
} from "../mod.js";
import { makeTx } from "./MakeTx.js";
import { Config } from "./types.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export const attachScript =
  (config: Config) =>
  ({
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
        config.scripts.set(
          CML.NativeScript.from_cbor_hex(script).hash().to_hex(),
          { type, script }
        );
        return makeTx(config);
      case "PlutusV1":
        config.scripts.set(
          CML.PlutusV1Script.from_cbor_hex(applyDoubleCborEncoding(script))
            .hash()
            .to_hex(),
          { type, script }
        );
        return makeTx(config);
      case "PlutusV2":
        config.scripts.set(
          CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script))
            .hash()
            .to_hex(),
          { script, type }
        );
        return makeTx(config);
      default:
        return makeTx(config);
    }
  };
export const attachSpendingValidator =
  (config: Config) => (spendingValidator: SpendingValidator) => {
    return attachScript(config)(spendingValidator);
  };

export const attachMintingPolicy =
  (config: Config) => (mintingPolicy: MintingPolicy) => {
    return attachScript(config)(mintingPolicy);
  };

// attachCertificateValidator(certValidator: CertificateValidator): Tx {
//   this.tasks.push((that) => {
//     attachScript(that, certValidator);
//   });
//   return this;
// }

// attachWithdrawalValidator(withdrawalValidator: WithdrawalValidator): Tx {
//   this.tasks.push((that) => {
//     attachScript(that, withdrawalValidator);
//   });
//   return this;
// }
