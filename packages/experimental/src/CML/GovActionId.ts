/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML GovActionId class
 *
 * @since 2.0.0
 * @category Types
 */
export type GovActionId = CML.GovActionId;

/**
 * Error class for GovActionId operations
 *
 * This error is thrown when operations on GovActionId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GovActionIdError extends Data.TaggedError("GovActionIdError")<{
  message?: string;
}> {}

/**
 * Method free of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.GovActionId,
) => Effect.Effect<void, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.GovActionId): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.GovActionId,
) => Effect.Effect<Uint8Array, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCborBytes failed GovActionId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.GovActionId): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.GovActionId,
) => Effect.Effect<Uint8Array, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCanonicalCborBytes failed GovActionId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.GovActionId,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of GovActionId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.GovActionId, GovActionIdError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_cbor_bytes(cborBytes),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.GovActionId =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCborHex failed GovActionId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.GovActionId): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCanonicalCborHex failed GovActionId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.GovActionId): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of GovActionId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.GovActionId, GovActionIdError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_cbor_hex(cborBytes),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.GovActionId =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toJson failed GovActionId is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.GovActionId): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.GovActionId,
) => Effect.Effect<any, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toJsValue failed GovActionId is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.GovActionId): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of GovActionId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.GovActionId, GovActionIdError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_json(json),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.GovActionId =>
  Effect.runSync(fromJson(json));

/**
 * Method transactionId of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const transactionId: (
  instance: CML.GovActionId,
) => Effect.Effect<CML.TransactionHash, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.transaction_id(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.transactionId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.transactionId without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionIdUnsafe = (
  instance: CML.GovActionId,
): CML.TransactionHash => Effect.runSync(transactionId(instance));

/**
 * Method govActionIndex of GovActionId
 *
 * @since 2.0.0
 * @category Methods
 */
export const govActionIndex: (
  instance: CML.GovActionId,
) => Effect.Effect<bigint, GovActionIdError> = Effect.fn(
  (instance: CML.GovActionId) =>
    Effect.try({
      try: () => instance.gov_action_index(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.govActionIndex failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.govActionIndex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const govActionIndexUnsafe = (instance: CML.GovActionId): bigint =>
  Effect.runSync(govActionIndex(instance));

/**
 * Static method _new of GovActionId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) => Effect.Effect<CML.GovActionId, GovActionIdError> = Effect.fn(function* (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) {
  return yield* Effect.try({
    try: () => CML.GovActionId.new(transactionId, govActionIndex),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId._new failed with parameters: ${transactionId} (TransactionHash), ${govActionIndex}. `,
      }),
  });
});

/**
 * Unsafely calls GovActionId._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
): CML.GovActionId => Effect.runSync(_new(transactionId, govActionIndex));
