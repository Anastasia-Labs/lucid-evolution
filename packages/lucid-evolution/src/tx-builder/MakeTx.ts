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
  return {};
}
