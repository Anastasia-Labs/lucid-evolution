import { Effect } from "effect";
import { UnixTime } from "@anastasia-labs/core-types";
import { Config } from "./types.js";
import { makeTx } from "./MakeTx.js";
import { unixTimeToSlot } from "@anastasia-labs/utils";

export const validFrom = (config: Config, unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
  return program;
};

export const validTo = (config: Config, unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
  return program;
};
