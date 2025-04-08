/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ByronTxOut class
 *
 * @since 2.0.0
 * @category Types
 */
export type ByronTxOut = CML.ByronTxOut;

/**
 * Error class for ByronTxOut operations
 *
 * This error is thrown when operations on ByronTxOut instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ByronTxOutError extends Data.TaggedError("ByronTxOutError")<{
  message?: string;
}> {}

/**
 * Method free of ByronTxOut
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ByronTxOut,
) => Effect.Effect<void, ByronTxOutError> = Effect.fn(
  (instance: CML.ByronTxOut) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ByronTxOut): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ByronTxOut
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ByronTxOut,
) => Effect.Effect<Uint8Array, ByronTxOutError> = Effect.fn(
  (instance: CML.ByronTxOut) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ByronTxOut): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of ByronTxOut
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ByronTxOut =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ByronTxOut
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ByronTxOut,
) => Effect.Effect<string, ByronTxOutError> = Effect.fn(
  (instance: CML.ByronTxOut) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ByronTxOut): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of ByronTxOut
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError> = Effect.fn(function* (
  cborBytes: string,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ByronTxOut =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method address of ByronTxOut
 *
 * @since 2.0.0
 * @category Methods
 */
export const address: (
  instance: CML.ByronTxOut,
) => Effect.Effect<CML.ByronAddress, ByronTxOutError> = Effect.fn(
  (instance: CML.ByronTxOut) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressUnsafe = (instance: CML.ByronTxOut): CML.ByronAddress =>
  Effect.runSync(address(instance));

/**
 * Method amount of ByronTxOut
 *
 * @since 2.0.0
 * @category Methods
 */
export const amount: (
  instance: CML.ByronTxOut,
) => Effect.Effect<bigint, ByronTxOutError> = Effect.fn(
  (instance: CML.ByronTxOut) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const amountUnsafe = (instance: CML.ByronTxOut): bigint =>
  Effect.runSync(amount(instance));

/**
 * Static method _new of ByronTxOut
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  address: CML.ByronAddress,
  amount: bigint,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError> = Effect.fn(function* (
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  address: CML.ByronAddress,
  amount: bigint,
): CML.ByronTxOut => Effect.runSync(_new(address, amount));
