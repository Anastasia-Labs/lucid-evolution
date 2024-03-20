import { Effect } from "effect";
import { UnixTime } from "@anastasia-labs/core-types";
import { TxBuilderConfig } from "./types.js";
import { unixTimeToSlot } from "@anastasia-labs/utils";

export const validFrom = (config: TxBuilderConfig, unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
  return program;
};

export const validTo = (config: TxBuilderConfig, unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
  return program;
};
