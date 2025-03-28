import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProtocolMagic = CML.ProtocolMagic;

export class ProtocolMagicError extends Data.TaggedError("ProtocolMagicError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolMagic
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolMagic instance
 * const instance = ... ;
 *   const result = yield* ProtocolMagic.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ProtocolMagic): Effect.Effect<void, ProtocolMagicError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolMagicError({
          message: `ProtocolMagic.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolMagic instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolMagic.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolMagic.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProtocolMagic): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of ProtocolMagic
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolMagic._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (pm: number) {
  return yield* Effect.try({
    try: () => CML.ProtocolMagic.new(pm),
    catch: () => new ProtocolMagicError({
      message: `ProtocolMagic._new failed with parameters: ${pm}. `,
    }),
  });
});

/**
 * Unsafely calls ProtocolMagic._new without Effect wrapper
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolMagic.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolMagic.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (pm: number) =>
  Effect.runSync(_new(pm));

/**
 * Method toInt of ProtocolMagic
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolMagic instance
 * const instance = ... ;
 *   const result = yield* ProtocolMagic.toInt(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toInt = Effect.fn(
  (instance: CML.ProtocolMagic): Effect.Effect<number, ProtocolMagicError> =>
    Effect.try({
      try: () => instance.to_int(),
      catch: () =>
        new ProtocolMagicError({
          message: `ProtocolMagic.toInt failed ProtocolMagic is not valid for number conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toInt without Effect wrapper
 * 
 * @example
 * import { ProtocolMagic } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolMagic instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolMagic.unsafeToInt(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolMagic.unsafeToInt failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToInt = (instance: CML.ProtocolMagic): number =>
  Effect.runSync(toInt(instance));
