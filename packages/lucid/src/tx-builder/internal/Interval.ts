import { Effect } from "effect";
import { UnixTime } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { unixTimeToSlot } from "@lucid-evolution/utils";
import { TxConfig } from "./Service.js";

export const validFrom = (unixTime: UnixTime) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
export const validTo = (unixTime: UnixTime) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const slot = unixTimeToSlot(config.lucidConfig.network, unixTime);
    config.txBuilder.set_ttl(BigInt(slot));
  });
