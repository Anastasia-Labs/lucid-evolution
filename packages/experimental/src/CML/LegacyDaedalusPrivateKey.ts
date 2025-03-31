/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LegacyDaedalusPrivateKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type LegacyDaedalusPrivateKey = CML.LegacyDaedalusPrivateKey;

/**
 * Error class for LegacyDaedalusPrivateKey operations
 * 
 * This error is thrown when operations on LegacyDaedalusPrivateKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LegacyDaedalusPrivateKeyError extends Data.TaggedError("LegacyDaedalusPrivateKeyError")<{
  message?: string;
}> {}

/**
 * Method free of LegacyDaedalusPrivateKey
 * 
 * @example
 * import { LegacyDaedalusPrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyDaedalusPrivateKey instance
 * const instance = ... ;
 *   const result = yield* LegacyDaedalusPrivateKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.LegacyDaedalusPrivateKey): Effect.Effect<void, LegacyDaedalusPrivateKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyDaedalusPrivateKeyError({
          message: `LegacyDaedalusPrivateKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { LegacyDaedalusPrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyDaedalusPrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyDaedalusPrivateKey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyDaedalusPrivateKey.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LegacyDaedalusPrivateKey): void =>
  Effect.runSync(free(instance));

/**
 * Method chaincode of LegacyDaedalusPrivateKey
 * 
 * @example
 * import { LegacyDaedalusPrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyDaedalusPrivateKey instance
 * const instance = ... ;
 *   const result = yield* LegacyDaedalusPrivateKey.chaincode(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const chaincode = Effect.fn(
  (instance: CML.LegacyDaedalusPrivateKey): Effect.Effect<Uint8Array, LegacyDaedalusPrivateKeyError> =>
    Effect.try({
      try: () => instance.chaincode(),
      catch: () =>
        new LegacyDaedalusPrivateKeyError({
          message: `LegacyDaedalusPrivateKey.chaincode failed `,
        }),
    })
);

/**
 * Unsafely calls instance.chaincode without Effect wrapper
 * 
 * @example
 * import { LegacyDaedalusPrivateKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyDaedalusPrivateKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyDaedalusPrivateKey.chaincodeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyDaedalusPrivateKey.chaincodeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const chaincodeUnsafe = (instance: CML.LegacyDaedalusPrivateKey): Uint8Array =>
  Effect.runSync(chaincode(instance));
