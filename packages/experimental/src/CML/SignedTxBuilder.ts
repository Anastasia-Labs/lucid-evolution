/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SignedTxBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type SignedTxBuilder = CML.SignedTxBuilder;

/**
 * Error class for SignedTxBuilder operations
 *
 * This error is thrown when operations on SignedTxBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SignedTxBuilderError extends Data.TaggedError(
  "SignedTxBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.SignedTxBuilder): Effect.Effect<void, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SignedTxBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method newWithData of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SignedTxBuilder.newWithData( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newWithData = Effect.fn(function* (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) {
  return yield* Effect.try({
    try: () =>
      CML.SignedTxBuilder.new_with_data(
        body,
        witnessSet,
        isValid,
        auxiliaryData,
      ),
    catch: () =>
      new SignedTxBuilderError({
        message: `SignedTxBuilder.newWithData failed with parameters: ${body} (TransactionBody), ${witnessSet} (TransactionWitnessSetBuilder), ${isValid}, ${auxiliaryData} (AuxiliaryData). `,
      }),
  });
});

/**
 * Unsafely calls SignedTxBuilder.newWithData without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.newWithDataUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.newWithDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newWithDataUnsafe = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.runSync(newWithData(body, witnessSet, isValid, auxiliaryData));

/**
 * Static method newWithoutData of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SignedTxBuilder.newWithoutData( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newWithoutData = Effect.fn(function* (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
) {
  return yield* Effect.try({
    try: () => CML.SignedTxBuilder.new_without_data(body, witnessSet, isValid),
    catch: () =>
      new SignedTxBuilderError({
        message: `SignedTxBuilder.newWithoutData failed with parameters: ${body} (TransactionBody), ${witnessSet} (TransactionWitnessSetBuilder), ${isValid}. `,
      }),
  });
});

/**
 * Unsafely calls SignedTxBuilder.newWithoutData without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.newWithoutDataUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.newWithoutDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newWithoutDataUnsafe = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
) => Effect.runSync(newWithoutData(body, witnessSet, isValid));

/**
 * Method buildChecked of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.buildChecked(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const buildChecked = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<CML.Transaction, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.build_checked(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.buildChecked failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.buildChecked without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.buildCheckedUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.buildCheckedUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildCheckedUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.Transaction => Effect.runSync(buildChecked(instance));

/**
 * Method buildUnchecked of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.buildUnchecked(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const buildUnchecked = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<CML.Transaction, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.build_unchecked(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.buildUnchecked failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.buildUnchecked without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.buildUncheckedUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.buildUncheckedUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUncheckedUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.Transaction => Effect.runSync(buildUnchecked(instance));

/**
 * Method addVkey of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.addVkey(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVkey = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
    vkey: CML.Vkeywitness,
  ): Effect.Effect<void, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.add_vkey(vkey),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.addVkey failed with parameters: ${vkey} (Vkeywitness). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addVkey without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.addVkeyUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.addVkeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addVkeyUnsafe = (
  instance: CML.SignedTxBuilder,
  vkey: CML.Vkeywitness,
): void => Effect.runSync(addVkey(instance, vkey));

/**
 * Method addBootstrap of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.addBootstrap(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
    bootstrap: CML.BootstrapWitness,
  ): Effect.Effect<void, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.add_bootstrap(bootstrap),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.addBootstrap failed with parameters: ${bootstrap} (BootstrapWitness). Hint: Not all SignedTxBuilder instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.addBootstrap without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.addBootstrapUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.addBootstrapUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addBootstrapUnsafe = (
  instance: CML.SignedTxBuilder,
  bootstrap: CML.BootstrapWitness,
): void => Effect.runSync(addBootstrap(instance, bootstrap));

/**
 * Method body of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.body(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const body = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<CML.TransactionBody, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.body(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.body failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.body without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.bodyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.bodyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bodyUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.TransactionBody => Effect.runSync(body(instance));

/**
 * Method witnessSet of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.witnessSet(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const witnessSet = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<CML.TransactionWitnessSetBuilder, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.witness_set(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.witnessSet failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.witnessSet without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.witnessSetUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.witnessSetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const witnessSetUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.TransactionWitnessSetBuilder => Effect.runSync(witnessSet(instance));

/**
 * Method isValid of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.isValid(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const isValid = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<boolean, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.is_valid(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.isValid failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isValid without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.isValidUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.isValidUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isValidUnsafe = (instance: CML.SignedTxBuilder): boolean =>
  Effect.runSync(isValid(instance));

/**
 * Method auxiliaryData of SignedTxBuilder
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *   const result = yield* SignedTxBuilder.auxiliaryData(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData = Effect.fn(
  (
    instance: CML.SignedTxBuilder,
  ): Effect.Effect<CML.AuxiliaryData | undefined, SignedTxBuilderError> =>
    Effect.try({
      try: () => instance.auxiliary_data(),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.auxiliaryData failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.auxiliaryData without Effect wrapper
 *
 * @example
 * import { SignedTxBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SignedTxBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SignedTxBuilder.auxiliaryDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SignedTxBuilder.auxiliaryDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));
