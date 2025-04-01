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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.RedeemerWitnessKey) => Effect.Effect<void, RedeemerWitnessKeyError> = Effect.fn(
  (instance: CML.RedeemerWitnessKey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerWitnessKey): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RedeemerWitnessKey
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (tag: CML.RedeemerTag, index: bigint) => Effect.Effect<CML.RedeemerWitnessKey, RedeemerWitnessKeyError> = Effect.fn(function* (tag: CML.RedeemerTag, index: bigint) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (tag: CML.RedeemerTag, index: bigint): CML.RedeemerWitnessKey =>
  Effect.runSync(_new(tag, index));

/**
 * Static method fromRedeemer of RedeemerWitnessKey
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRedeemer: (redeemer: CML.LegacyRedeemer) => Effect.Effect<CML.RedeemerWitnessKey, RedeemerWitnessKeyError> = Effect.fn(function* (redeemer: CML.LegacyRedeemer) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRedeemerUnsafe = (redeemer: CML.LegacyRedeemer): CML.RedeemerWitnessKey =>
  Effect.runSync(fromRedeemer(redeemer));
