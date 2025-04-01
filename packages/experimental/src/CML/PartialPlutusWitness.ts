/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PartialPlutusWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type PartialPlutusWitness = CML.PartialPlutusWitness;

/**
 * Error class for PartialPlutusWitness operations
 * 
 * This error is thrown when operations on PartialPlutusWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PartialPlutusWitnessError extends Data.TaggedError("PartialPlutusWitnessError")<{
  message?: string;
}> {}

/**
 * Method free of PartialPlutusWitness
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PartialPlutusWitness) => Effect.Effect<void, PartialPlutusWitnessError> = Effect.fn(
  (instance: CML.PartialPlutusWitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PartialPlutusWitness): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PartialPlutusWitness
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (script: CML.PlutusScriptWitness, data: CML.PlutusData) => Effect.Effect<CML.PartialPlutusWitness, PartialPlutusWitnessError> = Effect.fn(function* (script: CML.PlutusScriptWitness, data: CML.PlutusData) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (script: CML.PlutusScriptWitness, data: CML.PlutusData): CML.PartialPlutusWitness =>
  Effect.runSync(_new(script, data));

/**
 * Method script of PartialPlutusWitness
 * 
 * @since 2.0.0
 * @category Methods
 */
export const script: (instance: CML.PartialPlutusWitness) => Effect.Effect<CML.PlutusScriptWitness, PartialPlutusWitnessError> = Effect.fn(
  (instance: CML.PartialPlutusWitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptUnsafe = (instance: CML.PartialPlutusWitness): CML.PlutusScriptWitness =>
  Effect.runSync(script(instance));

/**
 * Method data of PartialPlutusWitness
 * 
 * @since 2.0.0
 * @category Methods
 */
export const data: (instance: CML.PartialPlutusWitness) => Effect.Effect<CML.PlutusData, PartialPlutusWitnessError> = Effect.fn(
  (instance: CML.PartialPlutusWitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dataUnsafe = (instance: CML.PartialPlutusWitness): CML.PlutusData =>
  Effect.runSync(data(instance));
