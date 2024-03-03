import {
  attachCertificateValidator,
  attachMintingPolicy,
  attachScript,
  attachSpendingValidator,
  attachWithdrawalValidator,
} from "./Attach.js";
import { collectFrom } from "./Collect.js";
import { complete } from "./Complete.js";
import { validFrom, validTo } from "./Interval.js";
import { mintAssets } from "./Mint.js";
import { payToAddress, payToAddressWithData } from "./Pay.js";
import { readFrom } from "./Read.js";
import { Config } from "./types.js";

export function makeTx(config: Config) {
  return {
    readFrom: readFrom(config),
    collectFrom: collectFrom(config),
    attachScript: attachScript(config),
    attachSpendingValidator: attachSpendingValidator(config),
    attachMintingPolicy: attachMintingPolicy(config),
    attachCertificateValidator: attachCertificateValidator(config),
    attachWithdrawalValidator: attachWithdrawalValidator(config),
    payToAddress: payToAddress(config),
    payToAddressWithData: payToAddressWithData(config),
    mintAssets: mintAssets(config),
    validFrom: validFrom(config),
    validTo: validTo(config),
    complete: complete(config),
    config: () => config,
  };
}
