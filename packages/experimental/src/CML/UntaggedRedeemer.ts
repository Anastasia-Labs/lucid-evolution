/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UntaggedRedeemer class
 *
 * @since 2.0.0
 * @category Types
 */
export type UntaggedRedeemer = CML.UntaggedRedeemer;

/**
 * Error class for UntaggedRedeemer operations
 *
 * This error is thrown when operations on UntaggedRedeemer instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UntaggedRedeemerError extends Data.TaggedError(
  "UntaggedRedeemerError",
)<{
  message?: string;
}> {}

/**
 * Method free of UntaggedRedeemer
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.UntaggedRedeemer,
) => Effect.Effect<void, UntaggedRedeemerError> = Effect.fn(
  (instance: CML.UntaggedRedeemer) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UntaggedRedeemerError({
          message: `UntaggedRedeemer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UntaggedRedeemer): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of UntaggedRedeemer
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) => Effect.Effect<CML.UntaggedRedeemer, UntaggedRedeemerError> = Effect.fn(
  function* (data: CML.PlutusData, exUnits: CML.ExUnits) {
    return yield* Effect.try({
      try: () => CML.UntaggedRedeemer.new(data, exUnits),
      catch: () =>
        new UntaggedRedeemerError({
          message: `UntaggedRedeemer._new failed with parameters: ${data} (PlutusData), ${exUnits} (ExUnits). `,
        }),
    });
  },
);

/**
 * Unsafely calls UntaggedRedeemer._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
): CML.UntaggedRedeemer => Effect.runSync(_new(data, exUnits));
