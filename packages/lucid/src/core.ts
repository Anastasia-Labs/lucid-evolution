import { Effect } from "effect";

export * as CML from "@lucid-evolution/cml";

export const makeReturn = <A, E>(program: Effect.Effect<A, E>) => {
  return {
    unsafeRun: () => Effect.runPromise(program),
    safeRun: () => Effect.runPromise(Effect.either(program)),
    program: () => program,
  };
};
