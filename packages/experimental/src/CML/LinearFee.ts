/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LinearFee class
 *
 * @since 2.0.0
 * @category Types
 */
export type LinearFee = CML.LinearFee;

/**
 * Error class for LinearFee operations
 * 
 * This error is thrown when operations on LinearFee instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LinearFeeError extends Data.TaggedError("LinearFeeError")<{
  message?: string;
}> {}

/**
 * Method free of LinearFee
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.LinearFee) => Effect.Effect<void, LinearFeeError> = Effect.fn(
  (instance: CML.LinearFee) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LinearFee): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LinearFee
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (coefficient: bigint, constant: bigint, refScriptCostPerByte: bigint) => Effect.Effect<CML.LinearFee, LinearFeeError> = Effect.fn(function* (coefficient: bigint, constant: bigint, refScriptCostPerByte: bigint) {
  return yield* Effect.try({
    try: () => CML.LinearFee.new(coefficient, constant, refScriptCostPerByte),
    catch: () => new LinearFeeError({
      message: `LinearFee._new failed with parameters: ${coefficient}, ${constant}, ${refScriptCostPerByte}. `,
    }),
  });
});

/**
 * Unsafely calls LinearFee._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (coefficient: bigint, constant: bigint, refScriptCostPerByte: bigint): CML.LinearFee =>
  Effect.runSync(_new(coefficient, constant, refScriptCostPerByte));

/**
 * Method coefficient of LinearFee
 * 
 * @since 2.0.0
 * @category Methods
 */
export const coefficient: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError> = Effect.fn(
  (instance: CML.LinearFee) =>
    Effect.try({
      try: () => instance.coefficient(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.coefficient failed `,
        }),
    })
);

/**
 * Unsafely calls instance.coefficient without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const coefficientUnsafe = (instance: CML.LinearFee): bigint =>
  Effect.runSync(coefficient(instance));

/**
 * Method constant of LinearFee
 * 
 * @since 2.0.0
 * @category Methods
 */
export const constant: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError> = Effect.fn(
  (instance: CML.LinearFee) =>
    Effect.try({
      try: () => instance.constant(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.constant failed `,
        }),
    })
);

/**
 * Unsafely calls instance.constant without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const constantUnsafe = (instance: CML.LinearFee): bigint =>
  Effect.runSync(constant(instance));

/**
 * Method refScriptCostPerByte of LinearFee
 * 
 * @since 2.0.0
 * @category Methods
 */
export const refScriptCostPerByte: (instance: CML.LinearFee) => Effect.Effect<bigint, LinearFeeError> = Effect.fn(
  (instance: CML.LinearFee) =>
    Effect.try({
      try: () => instance.ref_script_cost_per_byte(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.refScriptCostPerByte failed `,
        }),
    })
);

/**
 * Unsafely calls instance.refScriptCostPerByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const refScriptCostPerByteUnsafe = (instance: CML.LinearFee): bigint =>
  Effect.runSync(refScriptCostPerByte(instance));
