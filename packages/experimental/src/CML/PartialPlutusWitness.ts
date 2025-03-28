import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PartialPlutusWitness = CML.PartialPlutusWitness;

export class PartialPlutusWitnessError extends Data.TaggedError("PartialPlutusWitnessError")<{
  message?: string;
}> {}

/**
 * Method free of PartialPlutusWitness
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 *   const result = yield* PartialPlutusWitness.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PartialPlutusWitness): Effect.Effect<void, PartialPlutusWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PartialPlutusWitnessError({
          message: `PartialPlutusWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PartialPlutusWitness.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PartialPlutusWitness.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PartialPlutusWitness): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PartialPlutusWitness
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PartialPlutusWitness._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (script: CML.PlutusScriptWitness, data: CML.PlutusData) {
  return yield* Effect.try({
    try: () => CML.PartialPlutusWitness.new(script, data),
    catch: () => new PartialPlutusWitnessError({
      message: `PartialPlutusWitness._new failed with parameters: ${script} (PlutusScriptWitness), ${data} (PlutusData). `,
    }),
  });
});

/**
 * Unsafely calls PartialPlutusWitness._new without Effect wrapper
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PartialPlutusWitness.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PartialPlutusWitness.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (script: CML.PlutusScriptWitness, data: CML.PlutusData) =>
  Effect.runSync(_new(script, data));

/**
 * Method script of PartialPlutusWitness
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 *   const result = yield* PartialPlutusWitness.script(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const script = Effect.fn(
  (instance: CML.PartialPlutusWitness): Effect.Effect<CML.PlutusScriptWitness, PartialPlutusWitnessError> =>
    Effect.try({
      try: () => instance.script(),
      catch: () =>
        new PartialPlutusWitnessError({
          message: `PartialPlutusWitness.script failed `,
        }),
    })
);

/**
 * Unsafely calls instance.script without Effect wrapper
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PartialPlutusWitness.unsafeScript(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PartialPlutusWitness.unsafeScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeScript = (instance: CML.PartialPlutusWitness): CML.PlutusScriptWitness =>
  Effect.runSync(script(instance));

/**
 * Method data of PartialPlutusWitness
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 *   const result = yield* PartialPlutusWitness.data(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const data = Effect.fn(
  (instance: CML.PartialPlutusWitness): Effect.Effect<CML.PlutusData, PartialPlutusWitnessError> =>
    Effect.try({
      try: () => instance.data(),
      catch: () =>
        new PartialPlutusWitnessError({
          message: `PartialPlutusWitness.data failed `,
        }),
    })
);

/**
 * Unsafely calls instance.data without Effect wrapper
 * 
 * @example
 * import { PartialPlutusWitness } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PartialPlutusWitness instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PartialPlutusWitness.unsafeData(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PartialPlutusWitness.unsafeData failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeData = (instance: CML.PartialPlutusWitness): CML.PlutusData =>
  Effect.runSync(data(instance));
