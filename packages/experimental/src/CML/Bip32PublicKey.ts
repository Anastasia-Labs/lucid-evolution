import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Bip32PublicKey = CML.Bip32PublicKey;

export class Bip32PublicKeyError extends Data.TaggedError("Bip32PublicKeyError")<{
  message?: string;
}> {}

/**
 * Method free of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Bip32PublicKey): Effect.Effect<void, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Bip32PublicKey): void =>
  Effect.runSync(free(instance));

/**
 * Method derive of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.derive(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const derive = Effect.fn(
  (instance: CML.Bip32PublicKey, index: number): Effect.Effect<CML.Bip32PublicKey, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.derive(index),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.derive failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.derive without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeDerive(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeDerive failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDerive = (instance: CML.Bip32PublicKey, index: number): CML.Bip32PublicKey =>
  Effect.runSync(derive(instance, index));

/**
 * Method toRawKey of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.toRawKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawKey = Effect.fn(
  (instance: CML.Bip32PublicKey): Effect.Effect<CML.PublicKey, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.to_raw_key(),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.toRawKey failed Bip32PublicKey is not valid for PublicKey conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toRawKey without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeToRawKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeToRawKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawKey = (instance: CML.Bip32PublicKey): CML.PublicKey =>
  Effect.runSync(toRawKey(instance));

/**
 * Static method fromRawBytes of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PublicKey.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Bip32PublicKey.from_raw_bytes(bytes),
    catch: () => new Bip32PublicKeyError({
      message: `Bip32PublicKey.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Bip32PublicKey.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toRawBytes of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.Bip32PublicKey): Effect.Effect<Uint8Array, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.toRawBytes failed Bip32PublicKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.Bip32PublicKey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromBech32 of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Bip32PublicKey.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.Bip32PublicKey.from_bech32(bech32Str),
    catch: () => new Bip32PublicKeyError({
      message: `Bip32PublicKey.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls Bip32PublicKey.fromBech32 without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toBech32 of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.toBech32(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.Bip32PublicKey): Effect.Effect<string, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.to_bech32(),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.toBech32 failed Bip32PublicKey is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeToBech32(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.Bip32PublicKey): string =>
  Effect.runSync(toBech32(instance));

/**
 * Method chaincode of Bip32PublicKey
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 *   const result = yield* Bip32PublicKey.chaincode(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const chaincode = Effect.fn(
  (instance: CML.Bip32PublicKey): Effect.Effect<Uint8Array, Bip32PublicKeyError> =>
    Effect.try({
      try: () => instance.chaincode(),
      catch: () =>
        new Bip32PublicKeyError({
          message: `Bip32PublicKey.chaincode failed `,
        }),
    })
);

/**
 * Unsafely calls instance.chaincode without Effect wrapper
 * 
 * @example
 * import { Bip32PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Bip32PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Bip32PublicKey.unsafeChaincode(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Bip32PublicKey.unsafeChaincode failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeChaincode = (instance: CML.Bip32PublicKey): Uint8Array =>
  Effect.runSync(chaincode(instance));
