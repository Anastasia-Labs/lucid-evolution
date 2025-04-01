/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TxRedeemerBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TxRedeemerBuilder = CML.TxRedeemerBuilder;

/**
 * Error class for TxRedeemerBuilder operations
 *
 * This error is thrown when operations on TxRedeemerBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TxRedeemerBuilderError extends Data.TaggedError(
  "TxRedeemerBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
  ): Effect.Effect<void, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TxRedeemerBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method build of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.build(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
  ): Effect.Effect<CML.Redeemers, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.build failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.build without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.buildUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.buildUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TxRedeemerBuilder): CML.Redeemers =>
  Effect.runSync(build(instance));

/**
 * Method setExunits of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.setExunits(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setExunits = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
    redeemer: CML.RedeemerWitnessKey,
    exUnits: CML.ExUnits,
  ): Effect.Effect<void, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.set_exunits(redeemer, exUnits),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.setExunits failed with parameters: ${redeemer} (RedeemerWitnessKey), ${exUnits} (ExUnits). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setExunits without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.setExunitsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.setExunitsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExunitsUnsafe = (
  instance: CML.TxRedeemerBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
): void => Effect.runSync(setExunits(instance, redeemer, exUnits));

/**
 * Method draftBody of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.draftBody(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const draftBody = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
  ): Effect.Effect<CML.TransactionBody, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.draft_body(),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.draftBody failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.draftBody without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.draftBodyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.draftBodyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const draftBodyUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.TransactionBody => Effect.runSync(draftBody(instance));

/**
 * Method auxiliaryData of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.auxiliaryData(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
  ): Effect.Effect<CML.AuxiliaryData | undefined, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.auxiliary_data(),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.auxiliaryData failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.auxiliaryData without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.auxiliaryDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.auxiliaryDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));

/**
 * Method draftTx of TxRedeemerBuilder
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *   const result = yield* TxRedeemerBuilder.draftTx(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const draftTx = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
  ): Effect.Effect<CML.Transaction, TxRedeemerBuilderError> =>
    Effect.try({
      try: () => instance.draft_tx(),
      catch: () =>
        new TxRedeemerBuilderError({
          message: `TxRedeemerBuilder.draftTx failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.draftTx without Effect wrapper
 *
 * @example
 * import { TxRedeemerBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TxRedeemerBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TxRedeemerBuilder.draftTxUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TxRedeemerBuilder.draftTxUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const draftTxUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.Transaction => Effect.runSync(draftTx(instance));
