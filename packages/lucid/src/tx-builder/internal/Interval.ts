import { Effect } from "effect";
import { UnixTime } from "@lucid-evolution/core-types";
import { TxBuilderConfig } from "../types.js";
import { unixTimeToSlot } from "@lucid-evolution/utils";

export const validFrom = (config: TxBuilderConfig, unixTime: UnixTime) =>
  Effect.gen(function* () {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
export const validTo = (config: TxBuilderConfig, unixTime: UnixTime) =>
  Effect.gen(function* () {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
