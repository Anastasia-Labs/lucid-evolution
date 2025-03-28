import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ByronTxOut = CML.ByronTxOut;

export class ByronTxOutError extends Data.TaggedError("ByronTxOutError")<{
  message?: string;
}> {}

/**
 * Method free of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *   const result = yield* ByronTxOut.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ByronTxOut): Effect.Effect<void, ByronTxOutError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ByronTxOutError({
          message: `ByronTxOut.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ByronTxOut): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *   const result = yield* ByronTxOut.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ByronTxOut): Effect.Effect<Uint8Array, ByronTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ByronTxOutError({
          message: `ByronTxOut.toCborBytes failed ByronTxOut is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ByronTxOut): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronTxOut.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ByronTxOut.from_cbor_bytes(cborBytes),
    catch: () =>
      new ByronTxOutError({
        message: `ByronTxOut.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ByronTxOut.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *   const result = yield* ByronTxOut.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ByronTxOut): Effect.Effect<string, ByronTxOutError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ByronTxOutError({
          message: `ByronTxOut.toCborHex failed ByronTxOut is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ByronTxOut): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronTxOut.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ByronTxOut.from_cbor_hex(cborBytes),
    catch: () =>
      new ByronTxOutError({
        message: `ByronTxOut.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ByronTxOut.fromCborHex without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method address of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *   const result = yield* ByronTxOut.address(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const address = Effect.fn(
  (
    instance: CML.ByronTxOut,
  ): Effect.Effect<CML.ByronAddress, ByronTxOutError> =>
    Effect.try({
      try: () => instance.address(),
      catch: () =>
        new ByronTxOutError({
          message: `ByronTxOut.address failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.address without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeAddress failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddress = (instance: CML.ByronTxOut): CML.ByronAddress =>
  Effect.runSync(address(instance));

/**
 * Method amount of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *   const result = yield* ByronTxOut.amount(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount = Effect.fn(
  (instance: CML.ByronTxOut): Effect.Effect<bigint, ByronTxOutError> =>
    Effect.try({
      try: () => instance.amount(),
      catch: () =>
        new ByronTxOutError({
          message: `ByronTxOut.amount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.amount without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronTxOut instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafeAmount(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafeAmount failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAmount = (instance: CML.ByronTxOut): bigint =>
  Effect.runSync(amount(instance));

/**
 * Static method _new of ByronTxOut
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronTxOut._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  address: CML.ByronAddress,
  amount: bigint,
) {
  return yield* Effect.try({
    try: () => CML.ByronTxOut.new(address, amount),
    catch: () =>
      new ByronTxOutError({
        message: `ByronTxOut._new failed with parameters: ${address} (ByronAddress), ${amount}. `,
      }),
  });
});

/**
 * Unsafely calls ByronTxOut._new without Effect wrapper
 *
 * @example
 * import { ByronTxOut } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronTxOut.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronTxOut.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (address: CML.ByronAddress, amount: bigint) =>
  Effect.runSync(_new(address, amount));
