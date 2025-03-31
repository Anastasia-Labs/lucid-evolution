/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerWitnessKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerWitnessKey = CML.RedeemerWitnessKey;

/**
 * Error class for RedeemerWitnessKey operations
 * 
 * This error is thrown when operations on RedeemerWitnessKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemerWitnessKeyError extends Data.TaggedError("RedeemerWitnessKeyError")<{
  message?: string;
}> {}

/**
 * Method free of RedeemerWitnessKey
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerWitnessKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerWitnessKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RedeemerWitnessKey): Effect.Effect<void, RedeemerWitnessKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerWitnessKeyError({
          message: `RedeemerWitnessKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerWitnessKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerWitnessKey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerWitnessKey.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerWitnessKey): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RedeemerWitnessKey
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerWitnessKey._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (tag: CML.RedeemerTag, index: bigint) {
  return yield* Effect.try({
    try: () => CML.RedeemerWitnessKey.new(tag, index),
    catch: () => new RedeemerWitnessKeyError({
      message: `RedeemerWitnessKey._new failed with parameters: ${tag} (RedeemerTag), ${index}. `,
    }),
  });
});

/**
 * Unsafely calls RedeemerWitnessKey._new without Effect wrapper
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerWitnessKey._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerWitnessKey._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (tag: CML.RedeemerTag, index: bigint) =>
  Effect.runSync(_new(tag, index));

/**
 * Static method fromRedeemer of RedeemerWitnessKey
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerWitnessKey.fromRedeemer( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRedeemer = Effect.fn(function* (redeemer: CML.LegacyRedeemer) {
  return yield* Effect.try({
    try: () => CML.RedeemerWitnessKey.from_redeemer(redeemer),
    catch: () => new RedeemerWitnessKeyError({
      message: `RedeemerWitnessKey.fromRedeemer failed with parameters: ${redeemer} (LegacyRedeemer). `,
    }),
  });
});

/**
 * Unsafely calls RedeemerWitnessKey.fromRedeemer without Effect wrapper
 * 
 * @example
 * import { RedeemerWitnessKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerWitnessKey.fromRedeemerUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerWitnessKey.fromRedeemerUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRedeemerUnsafe = (redeemer: CML.LegacyRedeemer) =>
  Effect.runSync(fromRedeemer(redeemer));
