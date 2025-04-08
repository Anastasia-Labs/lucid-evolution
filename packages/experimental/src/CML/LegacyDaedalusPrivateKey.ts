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
export class LegacyDaedalusPrivateKeyError extends Data.TaggedError(
  "LegacyDaedalusPrivateKeyError",
)<{
  message?: string;
}> {}

/**
 * Method free of LegacyDaedalusPrivateKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.LegacyDaedalusPrivateKey,
) => Effect.Effect<void, LegacyDaedalusPrivateKeyError> = Effect.fn(
  (instance: CML.LegacyDaedalusPrivateKey) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyDaedalusPrivateKeyError({
          message: `LegacyDaedalusPrivateKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LegacyDaedalusPrivateKey): void =>
  Effect.runSync(free(instance));

/**
 * Method chaincode of LegacyDaedalusPrivateKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const chaincode: (
  instance: CML.LegacyDaedalusPrivateKey,
) => Effect.Effect<Uint8Array, LegacyDaedalusPrivateKeyError> = Effect.fn(
  (instance: CML.LegacyDaedalusPrivateKey) =>
    Effect.try({
      try: () => instance.chaincode(),
      catch: () =>
        new LegacyDaedalusPrivateKeyError({
          message: `LegacyDaedalusPrivateKey.chaincode failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.chaincode without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const chaincodeUnsafe = (
  instance: CML.LegacyDaedalusPrivateKey,
): Uint8Array => Effect.runSync(chaincode(instance));
