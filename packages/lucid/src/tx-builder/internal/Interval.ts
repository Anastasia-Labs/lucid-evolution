import { Effect } from "effect";
import { UnixTime } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { unixTimeToSlot } from "@lucid-evolution/utils";

export const validFrom = (
  config: TxBuilder.TxBuilderConfig,
  unixTime: UnixTime,
) =>
  Effect.gen(function* () {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
export const validTo = (
  config: TxBuilder.TxBuilderConfig,
  unixTime: UnixTime,
) =>
  Effect.gen(function* () {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
