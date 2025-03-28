import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Crc32 = CML.Crc32;

export class Crc32Error extends Data.TaggedError("Crc32Error")<{
  message?: string;
}> {}

/**
 * Method free of Crc32
 * 
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 *   const result = yield* Crc32.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Crc32): Effect.Effect<void, Crc32Error> =>
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
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Crc32.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Crc32.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Crc32): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Crc32
 * 
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Crc32._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
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
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Crc32.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Crc32.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method update of Crc32
 * 
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 *   const result = yield* Crc32.update(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const update = Effect.fn(
  (instance: CML.Crc32, bytes: Uint8Array): Effect.Effect<void, Crc32Error> =>
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
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Crc32.unsafeUpdate(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Crc32.unsafeUpdate failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeUpdate = (instance: CML.Crc32, bytes: Uint8Array): void =>
  Effect.runSync(update(instance, bytes));

/**
 * Method finalize of Crc32
 * 
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 *   const result = yield* Crc32.finalize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const finalize = Effect.fn(
  (instance: CML.Crc32): Effect.Effect<number, Crc32Error> =>
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
 * @example
 * import { Crc32 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Crc32 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Crc32.unsafeFinalize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Crc32.unsafeFinalize failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFinalize = (instance: CML.Crc32): number =>
  Effect.runSync(finalize(instance));
