import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type LinearFee = CML.LinearFee;

export class LinearFeeError extends Data.TaggedError("LinearFeeError")<{
  message?: string;
}> {}

/**
 * Method free of LinearFee
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *   const result = yield* LinearFee.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.LinearFee): Effect.Effect<void, LinearFeeError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LinearFee.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LinearFee.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.LinearFee): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LinearFee
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* LinearFee._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  coefficient: bigint,
  constant: bigint,
  refScriptCostPerByte: bigint,
) {
  return yield* Effect.try({
    try: () => CML.LinearFee.new(coefficient, constant, refScriptCostPerByte),
    catch: () =>
      new LinearFeeError({
        message: `LinearFee._new failed with parameters: ${coefficient}, ${constant}, ${refScriptCostPerByte}. `,
      }),
  });
});

/**
 * Unsafely calls LinearFee._new without Effect wrapper
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LinearFee.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LinearFee.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  coefficient: bigint,
  constant: bigint,
  refScriptCostPerByte: bigint,
) => Effect.runSync(_new(coefficient, constant, refScriptCostPerByte));

/**
 * Method coefficient of LinearFee
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *   const result = yield* LinearFee.coefficient(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const coefficient = Effect.fn(
  (instance: CML.LinearFee): Effect.Effect<bigint, LinearFeeError> =>
    Effect.try({
      try: () => instance.coefficient(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.coefficient failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.coefficient without Effect wrapper
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LinearFee.unsafeCoefficient(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LinearFee.unsafeCoefficient failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCoefficient = (instance: CML.LinearFee): bigint =>
  Effect.runSync(coefficient(instance));

/**
 * Method constant of LinearFee
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *   const result = yield* LinearFee.constant(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const constant = Effect.fn(
  (instance: CML.LinearFee): Effect.Effect<bigint, LinearFeeError> =>
    Effect.try({
      try: () => instance.constant(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.constant failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.constant without Effect wrapper
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LinearFee.unsafeConstant(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LinearFee.unsafeConstant failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeConstant = (instance: CML.LinearFee): bigint =>
  Effect.runSync(constant(instance));

/**
 * Method refScriptCostPerByte of LinearFee
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *   const result = yield* LinearFee.refScriptCostPerByte(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const refScriptCostPerByte = Effect.fn(
  (instance: CML.LinearFee): Effect.Effect<bigint, LinearFeeError> =>
    Effect.try({
      try: () => instance.ref_script_cost_per_byte(),
      catch: () =>
        new LinearFeeError({
          message: `LinearFee.refScriptCostPerByte failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.refScriptCostPerByte without Effect wrapper
 *
 * @example
 * import { LinearFee } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LinearFee instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LinearFee.unsafeRefScriptCostPerByte(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LinearFee.unsafeRefScriptCostPerByte failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRefScriptCostPerByte = (instance: CML.LinearFee): bigint =>
  Effect.runSync(refScriptCostPerByte(instance));
