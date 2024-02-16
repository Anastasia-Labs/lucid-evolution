import { attachScript, attachSpendingValidator } from "./Attach.js";
import { collectFrom } from "./Collect.js";
import { complete } from "./Complete.js";
import { payToAddress, payToAddressWithData } from "./Pay.js";
import { readFrom } from "./Read.js";
import { Config } from "./types.js";

export function makeTx(config: Config) {
  return {
    readFrom: readFrom(config),
    collectFrom: collectFrom(config),
    attachSpendingValidator: attachSpendingValidator(config),
    attachScript: attachScript(config),
    payToAddress: payToAddress(config),
    payToAddressWithData: payToAddressWithData(config),
    complete: complete(config),
    config: () => config,
  };
}