/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Crc32 class
 *
 * @since 2.0.0
 * @category Types
 */
export type Crc32 = CML.Crc32;

/**
 * Error class for Crc32 operations
 * 
 * This error is thrown when operations on Crc32 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Crc32Error extends Data.TaggedError("Crc32Error")<{
  message?: string;
}> {}

/**
 * Method free of Crc32
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Crc32) => Effect.Effect<void, Crc32Error> = Effect.fn(
  (instance: CML.Crc32) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Crc32Error({
          message: `Crc32.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Crc32): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Crc32
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.Crc32, Crc32Error> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Crc32.new(),
    catch: () => new Crc32Error({
      message: `Crc32._new failed `,
    }),
  });
});

/**
 * Unsafely calls Crc32._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.Crc32 =>
  Effect.runSync(_new());

/**
 * Method update of Crc32
 * 
 * @since 2.0.0
 * @category Methods
 */
export const update: (instance: CML.Crc32, bytes: Uint8Array) => Effect.Effect<void, Crc32Error> = Effect.fn(
  (instance: CML.Crc32, bytes: Uint8Array) =>
    Effect.try({
      try: () => instance.update(bytes),
      catch: () =>
        new Crc32Error({
          message: `Crc32.update failed with parameters: ${bytes}. `,
        }),
    })
);

/**
 * Unsafely calls instance.update without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const updateUnsafe = (instance: CML.Crc32, bytes: Uint8Array): void =>
  Effect.runSync(update(instance, bytes));

/**
 * Method finalize of Crc32
 * 
 * @since 2.0.0
 * @category Methods
 */
export const finalize: (instance: CML.Crc32) => Effect.Effect<number, Crc32Error> = Effect.fn(
  (instance: CML.Crc32) =>
    Effect.try({
      try: () => instance.finalize(),
      catch: () =>
        new Crc32Error({
          message: `Crc32.finalize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.finalize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const finalizeUnsafe = (instance: CML.Crc32): number =>
  Effect.runSync(finalize(instance));
