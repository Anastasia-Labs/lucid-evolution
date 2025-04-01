/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProtocolMagic class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProtocolMagic = CML.ProtocolMagic;

/**
 * Error class for ProtocolMagic operations
 *
 * This error is thrown when operations on ProtocolMagic instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProtocolMagicError extends Data.TaggedError("ProtocolMagicError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolMagic
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ProtocolMagic,
) => Effect.Effect<void, ProtocolMagicError> = Effect.fn(
  (instance: CML.ProtocolMagic) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolMagicError({
          message: `ProtocolMagic.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProtocolMagic): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of ProtocolMagic
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  pm: number,
) => Effect.Effect<CML.ProtocolMagic, ProtocolMagicError> = Effect.fn(
  function* (pm: number) {
    return yield* Effect.try({
      try: () => CML.ProtocolMagic.new(pm),
      catch: () =>
        new ProtocolMagicError({
          message: `ProtocolMagic._new failed with parameters: ${pm}. `,
        }),
    });
  },
);

/**
 * Unsafely calls ProtocolMagic._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (pm: number): CML.ProtocolMagic =>
  Effect.runSync(_new(pm));

/**
 * Method toInt of ProtocolMagic
 *
 * @since 2.0.0
 * @category Methods
 */
export const toInt: (
  instance: CML.ProtocolMagic,
) => Effect.Effect<number, ProtocolMagicError> = Effect.fn(
  (instance: CML.ProtocolMagic) =>
    Effect.try({
      try: () => instance.to_int(),
      catch: () =>
        new ProtocolMagicError({
          message: `ProtocolMagic.toInt failed ProtocolMagic is not valid for number conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toInt without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toIntUnsafe = (instance: CML.ProtocolMagic): number =>
  Effect.runSync(toInt(instance));
