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
export class PlutusScriptWitnessError extends Data.TaggedError("PlutusScriptWitnessError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusScriptWitness
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PlutusScriptWitness) => Effect.Effect<void, PlutusScriptWitnessError> = Effect.fn(
  (instance: CML.PlutusScriptWitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusScriptWitness): void =>
  Effect.runSync(free(instance));

/**
 * Static method newScript of PlutusScriptWitness
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScript: (script: CML.PlutusScript) => Effect.Effect<CML.PlutusScriptWitness, PlutusScriptWitnessError> = Effect.fn(function* (script: CML.PlutusScript) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptUnsafe = (script: CML.PlutusScript): CML.PlutusScriptWitness =>
  Effect.runSync(newScript(script));

/**
 * Static method newRef of PlutusScriptWitness
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newRef: (hash: CML.ScriptHash) => Effect.Effect<CML.PlutusScriptWitness, PlutusScriptWitnessError> = Effect.fn(function* (hash: CML.ScriptHash) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newRefUnsafe = (hash: CML.ScriptHash): CML.PlutusScriptWitness =>
  Effect.runSync(newRef(hash));

/**
 * Method hash of PlutusScriptWitness
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash: (instance: CML.PlutusScriptWitness) => Effect.Effect<CML.ScriptHash, PlutusScriptWitnessError> = Effect.fn(
  (instance: CML.PlutusScriptWitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusScriptWitness): CML.ScriptHash =>
  Effect.runSync(hash(instance));
