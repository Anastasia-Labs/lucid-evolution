import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, pipe, Record, Option } from "effect";
import { User } from "./service/EmulatorUser";
import { EmulatorInstance } from "./service/EmulatorInstance";
import * as MintExecutor from "./executor/MintExecutor";

const TestEnvironmentPrivateKey = pipe(
  Layer.provide(User.layerPrivateKeyUser, EmulatorInstance.layer),
  Layer.merge(EmulatorInstance.layer),
);

describe("Emulator", () => {
  it.effect("should successfully mint tokens with composed transaction", () =>
    Effect.gen(function* () {
      const { assetId, quantity, userUTxOs } = yield* MintExecutor.mintAndPay();
      const hasAsset = userUTxOs.some(
        (utxo) =>
          Record.has(utxo.assets, assetId) &&
          Record.get(utxo.assets, assetId).pipe(Option.getOrElse(() => 0n)) ===
            quantity,
      );
      expect(hasAsset).toBe(true);
    }).pipe(Effect.provide(TestEnvironmentPrivateKey)),
  );
});
