import { Lovelace } from "@lucid-evolution/core-types";
import { Effect } from "effect";
import { TxBuilderError } from "../../Errors.js";
import { TxConfig } from "./Service.js";

export type TreasuryDonation = {
  readonly donation: Lovelace;
  readonly currentTreasuryValue: Lovelace;
};

const treasuryError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Treasury: ${cause} }` });

const resolveCurrentTreasuryValue = (currentTreasuryValue?: Lovelace) =>
  Effect.gen(function* () {
    if (currentTreasuryValue !== undefined) return currentTreasuryValue;

    const { config } = yield* TxConfig;
    const getTreasury = config.lucidConfig.provider.getTreasury;
    if (!getTreasury) {
      yield* treasuryError(
        "Provider does not support querying the current treasury value. Pass currentTreasuryValue explicitly to donateToTreasury.",
      );
    }

    return yield* Effect.tryPromise({
      try: () => getTreasury!.call(config.lucidConfig.provider),
      catch: treasuryError,
    });
  });

export const donateToTreasury = (
  donation: Lovelace,
  currentTreasuryValue?: Lovelace,
) =>
  Effect.gen(function* () {
    if (donation <= 0n) {
      yield* treasuryError(
        "Treasury donation must be greater than 0 lovelace.",
      );
    }

    const resolvedCurrentTreasuryValue =
      yield* resolveCurrentTreasuryValue(currentTreasuryValue);
    if (resolvedCurrentTreasuryValue < 0n) {
      yield* treasuryError(
        "Current treasury value cannot be negative lovelace.",
      );
    }

    const { config } = yield* TxConfig;
    if (
      config.treasuryDonation &&
      config.treasuryDonation.currentTreasuryValue !==
        resolvedCurrentTreasuryValue
    ) {
      yield* treasuryError(
        "Cannot compose treasury donations with different current treasury values.",
      );
    }

    config.treasuryDonation = {
      currentTreasuryValue: resolvedCurrentTreasuryValue,
      donation: (config.treasuryDonation?.donation ?? 0n) + donation,
    };
  });
