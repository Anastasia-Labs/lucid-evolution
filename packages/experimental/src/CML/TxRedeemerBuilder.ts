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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<void, TxRedeemerBuilderError> = Effect.fn(
  (instance: CML.TxRedeemerBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TxRedeemerBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method build of TxRedeemerBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const build: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.Redeemers, TxRedeemerBuilderError> = Effect.fn(
  (instance: CML.TxRedeemerBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TxRedeemerBuilder): CML.Redeemers =>
  Effect.runSync(build(instance));

/**
 * Method setExunits of TxRedeemerBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const setExunits: (
  instance: CML.TxRedeemerBuilder,
  redeemer: CML.RedeemerWitnessKey,
  exUnits: CML.ExUnits,
) => Effect.Effect<void, TxRedeemerBuilderError> = Effect.fn(
  (
    instance: CML.TxRedeemerBuilder,
    redeemer: CML.RedeemerWitnessKey,
    exUnits: CML.ExUnits,
  ) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const draftBody: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.TransactionBody, TxRedeemerBuilderError> = Effect.fn(
  (instance: CML.TxRedeemerBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const draftBodyUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.TransactionBody => Effect.runSync(draftBody(instance));

/**
 * Method auxiliaryData of TxRedeemerBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.AuxiliaryData | undefined, TxRedeemerBuilderError> =
  Effect.fn((instance: CML.TxRedeemerBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));

/**
 * Method draftTx of TxRedeemerBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const draftTx: (
  instance: CML.TxRedeemerBuilder,
) => Effect.Effect<CML.Transaction, TxRedeemerBuilderError> = Effect.fn(
  (instance: CML.TxRedeemerBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const draftTxUnsafe = (
  instance: CML.TxRedeemerBuilder,
): CML.Transaction => Effect.runSync(draftTx(instance));
