import { Effect } from "effect";
import { UnixTime } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { unixTimeToEnclosingSlot } from "@lucid-evolution/plutus";
import { TxConfig } from "./Service.js";

export const validFrom = (unixTime: UnixTime) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const slot = unixTimeToEnclosingSlot(
      unixTime,
      config.lucidConfig.slotConfig,
    );
    config.txBuilder.set_validity_start_interval(BigInt(slot));
  });
export const validTo = (unixTime: UnixTime) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const slot = unixTimeToEnclosingSlot(
      unixTime,
      config.lucidConfig.slotConfig,
    );
    config.txBuilder.set_ttl(BigInt(slot));
  });
