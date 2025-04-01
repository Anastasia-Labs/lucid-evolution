/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NetworkId class
 *
 * @since 2.0.0
 * @category Types
 */
export type NetworkId = CML.NetworkId;

/**
 * Error class for NetworkId operations
 *
 * This error is thrown when operations on NetworkId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NetworkIdError extends Data.TaggedError("NetworkIdError")<{
  message?: string;
}> {}

/**
 * Method free of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.NetworkId,
) => Effect.Effect<void, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NetworkId): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.NetworkId,
) => Effect.Effect<Uint8Array, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCborBytes failed NetworkId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NetworkId): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.NetworkId,
) => Effect.Effect<Uint8Array, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCanonicalCborBytes failed NetworkId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.NetworkId,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.NetworkId, NetworkIdError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_cbor_bytes(cborBytes),
    catch: () =>
      new NetworkIdError({
        message: `NetworkId.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls NetworkId.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.NetworkId =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.NetworkId,
) => Effect.Effect<string, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCborHex failed NetworkId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.NetworkId,
) => Effect.Effect<string, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toCanonicalCborHex failed NetworkId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.NetworkId, NetworkIdError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_cbor_hex(cborBytes),
    catch: () =>
      new NetworkIdError({
        message: `NetworkId.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls NetworkId.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.NetworkId =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.NetworkId,
) => Effect.Effect<string, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.toJson failed NetworkId is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NetworkId): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.NetworkId,
) => Effect.Effect<any, NetworkIdError> = Effect.fn((instance: CML.NetworkId) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new NetworkIdError({
        message: `NetworkId.toJsValue failed NetworkId is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NetworkId): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.NetworkId, NetworkIdError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.NetworkId.from_json(json),
    catch: () =>
      new NetworkIdError({
        message: `NetworkId.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls NetworkId.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.NetworkId =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  network: bigint,
) => Effect.Effect<CML.NetworkId, NetworkIdError> = Effect.fn(function* (
  network: bigint,
) {
  return yield* Effect.try({
    try: () => CML.NetworkId.new(network),
    catch: () =>
      new NetworkIdError({
        message: `NetworkId._new failed with parameters: ${network}. `,
      }),
  });
});

/**
 * Unsafely calls NetworkId._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (network: bigint): CML.NetworkId =>
  Effect.runSync(_new(network));

/**
 * Static method mainnet of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const mainnet: () => Effect.Effect<CML.NetworkId, NetworkIdError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.NetworkId.mainnet(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.mainnet failed `,
        }),
    });
  });

/**
 * Unsafely calls NetworkId.mainnet without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const mainnetUnsafe = (): CML.NetworkId => Effect.runSync(mainnet());

/**
 * Static method testnet of NetworkId
 *
 * @since 2.0.0
 * @category Constructors
 */
export const testnet: () => Effect.Effect<CML.NetworkId, NetworkIdError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.NetworkId.testnet(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.testnet failed `,
        }),
    });
  });

/**
 * Unsafely calls NetworkId.testnet without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const testnetUnsafe = (): CML.NetworkId => Effect.runSync(testnet());

/**
 * Method network of NetworkId
 *
 * @since 2.0.0
 * @category Methods
 */
export const network: (
  instance: CML.NetworkId,
) => Effect.Effect<bigint, NetworkIdError> = Effect.fn(
  (instance: CML.NetworkId) =>
    Effect.try({
      try: () => instance.network(),
      catch: () =>
        new NetworkIdError({
          message: `NetworkId.network failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.network without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkUnsafe = (instance: CML.NetworkId): bigint =>
  Effect.runSync(network(instance));
