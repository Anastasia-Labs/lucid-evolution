import { Effect } from "effect";
import { UnixTime } from "@anastasia-labs/core-types";
import { Config } from "./types.js";
import { makeTx } from "./MakeTx.js";

export const validFrom = (config: Config) => (unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = config.lucid.utils.unixTimeToSlot(unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
  config.programs.push(program);
  return makeTx(config);
};

export const validTo = (config: Config) => (unixTime: UnixTime) => {
  const program = Effect.gen(function* ($) {
    const slot = config.lucid.utils.unixTimeToSlot(unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
  config.programs.push(program);
  return makeTx(config);
};
