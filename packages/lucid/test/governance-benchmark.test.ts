import { Effect, pipe } from "effect";
import { describe, expect, test } from "vitest";
import { AlwaysYesDrepContract, NetworkConfig, User } from "./specs/services";
import * as GovernanceOptimizedEndpoints from "./specs/governance-optimized.js";
import * as GovernanceUnOptimizedEndpoints from "./specs/governance-unoptimized.js";

describe.sequential("Governance Benchmark", () => {
  test("registerDRep", async () => {
    const unoptimizedProgram = pipe(
      GovernanceUnOptimizedEndpoints.registerDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(unoptimizedProgram))._tag).toBe(
      "Success",
    );

    const optimizedProgram = pipe(
      GovernanceOptimizedEndpoints.registerDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(optimizedProgram))._tag).toBe(
      "Success",
    );
  });

  test("updateDRep", async () => {
    const unoptimizedProgram = pipe(
      GovernanceUnOptimizedEndpoints.updateDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(unoptimizedProgram))._tag).toBe(
      "Success",
    );

    const optimizedProgram = pipe(
      GovernanceOptimizedEndpoints.updateDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(optimizedProgram))._tag).toBe(
      "Success",
    );
  });

  test("deregisterDRep", async () => {
    const unoptimizedProgram = pipe(
      GovernanceUnOptimizedEndpoints.deregisterDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(unoptimizedProgram))._tag).toBe(
      "Success",
    );

    const optimizedProgram = pipe(
      GovernanceOptimizedEndpoints.deregisterDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(optimizedProgram))._tag).toBe(
      "Success",
    );
  });

  test("registerScriptDRep", async () => {
    const unoptimizedProgram = pipe(
      GovernanceUnOptimizedEndpoints.registerScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(unoptimizedProgram))._tag).toBe(
      "Success",
    );

    const optimizedProgram = pipe(
      GovernanceOptimizedEndpoints.registerScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(optimizedProgram))._tag).toBe(
      "Success",
    );
  });

  test("deregisterScriptDRep", async () => {
    const unoptimizedProgram = pipe(
      GovernanceUnOptimizedEndpoints.deregisterScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(unoptimizedProgram))._tag).toBe(
      "Success",
    );

    const optimizedProgram = pipe(
      GovernanceOptimizedEndpoints.deregisterScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    expect((await Effect.runPromiseExit(optimizedProgram))._tag).toBe(
      "Success",
    );
  });
});
