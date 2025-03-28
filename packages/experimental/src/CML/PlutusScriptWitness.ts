import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusScriptWitness = CML.PlutusScriptWitness;

export class PlutusScriptWitnessError extends Data.TaggedError("PlutusScriptWitnessError")<{
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
  (instance: CML.PlutusScriptWitness): Effect.Effect<void, PlutusScriptWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusScriptWitnessError({
          message: `PlutusScriptWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = PlutusScriptWitness.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusScriptWitness): void =>
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
    catch: () => new PlutusScriptWitnessError({
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
 *   const result = PlutusScriptWitness.unsafeNewScript( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.unsafeNewScript failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScript = (script: CML.PlutusScript) =>
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
    catch: () => new PlutusScriptWitnessError({
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
 *   const result = PlutusScriptWitness.unsafeNewRef( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.unsafeNewRef failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewRef = (hash: CML.ScriptHash) =>
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
  (instance: CML.PlutusScriptWitness): Effect.Effect<CML.ScriptHash, PlutusScriptWitnessError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusScriptWitnessError({
          message: `PlutusScriptWitness.hash failed `,
        }),
    })
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
 *   const result = PlutusScriptWitness.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusScriptWitness.unsafeHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.PlutusScriptWitness): CML.ScriptHash =>
  Effect.runSync(hash(instance));
