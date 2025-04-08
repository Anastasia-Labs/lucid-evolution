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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<void, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SignedTxBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method newWithData of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newWithData: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.SignedTxBuilder, SignedTxBuilderError> = Effect.fn(
  function* (
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
  },
);

/**
 * Unsafely calls SignedTxBuilder.newWithData without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newWithDataUnsafe = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
): CML.SignedTxBuilder =>
  Effect.runSync(newWithData(body, witnessSet, isValid, auxiliaryData));

/**
 * Static method newWithoutData of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newWithoutData: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
) => Effect.Effect<CML.SignedTxBuilder, SignedTxBuilderError> = Effect.fn(
  function* (
    body: CML.TransactionBody,
    witnessSet: CML.TransactionWitnessSetBuilder,
    isValid: boolean,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.SignedTxBuilder.new_without_data(body, witnessSet, isValid),
      catch: () =>
        new SignedTxBuilderError({
          message: `SignedTxBuilder.newWithoutData failed with parameters: ${body} (TransactionBody), ${witnessSet} (TransactionWitnessSetBuilder), ${isValid}. `,
        }),
    });
  },
);

/**
 * Unsafely calls SignedTxBuilder.newWithoutData without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newWithoutDataUnsafe = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSetBuilder,
  isValid: boolean,
): CML.SignedTxBuilder =>
  Effect.runSync(newWithoutData(body, witnessSet, isValid));

/**
 * Method buildChecked of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const buildChecked: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.Transaction, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildCheckedUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.Transaction => Effect.runSync(buildChecked(instance));

/**
 * Method buildUnchecked of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const buildUnchecked: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.Transaction, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUncheckedUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.Transaction => Effect.runSync(buildUnchecked(instance));

/**
 * Method addVkey of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVkey: (
  instance: CML.SignedTxBuilder,
  vkey: CML.Vkeywitness,
) => Effect.Effect<void, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder, vkey: CML.Vkeywitness) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap: (
  instance: CML.SignedTxBuilder,
  bootstrap: CML.BootstrapWitness,
) => Effect.Effect<void, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder, bootstrap: CML.BootstrapWitness) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const body: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.TransactionBody, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bodyUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.TransactionBody => Effect.runSync(body(instance));

/**
 * Method witnessSet of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const witnessSet: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.TransactionWitnessSetBuilder, SignedTxBuilderError> =
  Effect.fn((instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const witnessSetUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.TransactionWitnessSetBuilder => Effect.runSync(witnessSet(instance));

/**
 * Method isValid of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const isValid: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<boolean, SignedTxBuilderError> = Effect.fn(
  (instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isValidUnsafe = (instance: CML.SignedTxBuilder): boolean =>
  Effect.runSync(isValid(instance));

/**
 * Method auxiliaryData of SignedTxBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData: (
  instance: CML.SignedTxBuilder,
) => Effect.Effect<CML.AuxiliaryData | undefined, SignedTxBuilderError> =
  Effect.fn((instance: CML.SignedTxBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (
  instance: CML.SignedTxBuilder,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));
