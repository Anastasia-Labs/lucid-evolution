/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusScriptWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusScriptWitness = CML.PlutusScriptWitness;

/**
 * Error class for PlutusScriptWitness operations
 *
 * This error is thrown when operations on PlutusScriptWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusScriptWitnessError extends Data.TaggedError(
  "PlutusScriptWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusScriptWitness
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScriptWitness instance
 * const instance = ... ;
 *   const result = yield* PlutusScriptWitness.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.PlutusScriptWitness,
  ): Effect.Effect<void, PlutusScriptWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusScriptWitnessError({
          message: `PlutusScriptWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScriptWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScriptWitness.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusScriptWitness): void =>
  Effect.runSync(free(instance));

/**
 * Static method newScript of PlutusScriptWitness
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusScriptWitness.newScript( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScript = Effect.fn(function* (script: CML.PlutusScript) {
  return yield* Effect.try({
    try: () => CML.PlutusScriptWitness.new_script(script),
    catch: () =>
      new PlutusScriptWitnessError({
        message: `PlutusScriptWitness.newScript failed with parameters: ${script} (PlutusScript). `,
      }),
  });
});

/**
 * Unsafely calls PlutusScriptWitness.newScript without Effect wrapper
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScriptWitness.newScriptUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.newScriptUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptUnsafe = (script: CML.PlutusScript) =>
  Effect.runSync(newScript(script));

/**
 * Static method newRef of PlutusScriptWitness
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusScriptWitness.newRef( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newRef = Effect.fn(function* (hash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.PlutusScriptWitness.new_ref(hash),
    catch: () =>
      new PlutusScriptWitnessError({
        message: `PlutusScriptWitness.newRef failed with parameters: ${hash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls PlutusScriptWitness.newRef without Effect wrapper
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScriptWitness.newRefUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.newRefUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newRefUnsafe = (hash: CML.ScriptHash) =>
  Effect.runSync(newRef(hash));

/**
 * Method hash of PlutusScriptWitness
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusScriptWitness instance
 * const instance = ... ;
 *   const result = yield* PlutusScriptWitness.hash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (
    instance: CML.PlutusScriptWitness,
  ): Effect.Effect<CML.ScriptHash, PlutusScriptWitnessError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusScriptWitnessError({
          message: `PlutusScriptWitness.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @example
 * import { PlutusScriptWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusScriptWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusScriptWitness.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.hashUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusScriptWitness): CML.ScriptHash =>
  Effect.runSync(hash(instance));
