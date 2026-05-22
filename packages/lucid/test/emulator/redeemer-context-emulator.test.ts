import { describe, expect } from "vitest";
import { it } from "@effect/vitest";
import { Effect, Layer, pipe } from "effect";
import { EmulatorInstance } from "./service/EmulatorInstance.js";
import { User } from "./service/EmulatorUser.js";
import * as BuildTxWithComplexExecutor from "./executor/BuildTxWithComplexExecutor.js";

const TestEnvironment = pipe(
  Layer.provide(User.layer, EmulatorInstance.layer),
  Layer.merge(EmulatorInstance.layer),
);

describe("BuildTxWithRedeemer emulator integration", () => {
  it.effect(
    "builds a complex transaction from the final canonical context",
    () =>
      Effect.gen(function* () {
        const { observations } =
          yield* BuildTxWithComplexExecutor.buildTxWithComplex;

        expect(
          [
            observations.stressSpends.length,
            observations.mintPolicies.length,
            observations.withdrawals.length,
          ].every((count) => count > 0),
        ).toBe(true);
      }).pipe(Effect.provide(TestEnvironment)),
  );
});
