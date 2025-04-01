/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProtocolVersion class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProtocolVersion = CML.ProtocolVersion;

/**
 * Error class for ProtocolVersion operations
 * 
 * This error is thrown when operations on ProtocolVersion instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProtocolVersionError extends Data.TaggedError("ProtocolVersionError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ProtocolVersion) => Effect.Effect<void, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProtocolVersion): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ProtocolVersion) => Effect.Effect<Uint8Array, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCborBytes failed ProtocolVersion is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ProtocolVersion): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ProtocolVersion) => Effect.Effect<Uint8Array, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCanonicalCborBytes failed ProtocolVersion is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ProtocolVersion): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_cbor_bytes(cborBytes),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ProtocolVersion =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ProtocolVersion) => Effect.Effect<string, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCborHex failed ProtocolVersion is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ProtocolVersion) => Effect.Effect<string, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCanonicalCborHex failed ProtocolVersion is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_cbor_hex(cborBytes),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ProtocolVersion =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ProtocolVersion) => Effect.Effect<string, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toJson failed ProtocolVersion is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ProtocolVersion) => Effect.Effect<any, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toJsValue failed ProtocolVersion is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ProtocolVersion): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_json(json),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ProtocolVersion =>
  Effect.runSync(fromJson(json));

/**
 * Method major of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const major: (instance: CML.ProtocolVersion) => Effect.Effect<bigint, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.major(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.major failed `,
        }),
    })
);

/**
 * Unsafely calls instance.major without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const majorUnsafe = (instance: CML.ProtocolVersion): bigint =>
  Effect.runSync(major(instance));

/**
 * Method minor of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minor: (instance: CML.ProtocolVersion) => Effect.Effect<bigint, ProtocolVersionError> = Effect.fn(
  (instance: CML.ProtocolVersion) =>
    Effect.try({
      try: () => instance.minor(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.minor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minor without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minorUnsafe = (instance: CML.ProtocolVersion): bigint =>
  Effect.runSync(minor(instance));

/**
 * Static method _new of ProtocolVersion
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (major: bigint, minor: bigint) => Effect.Effect<CML.ProtocolVersion, ProtocolVersionError> = Effect.fn(function* (major: bigint, minor: bigint) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.new(major, minor),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion._new failed with parameters: ${major}, ${minor}. `,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (major: bigint, minor: bigint): CML.ProtocolVersion =>
  Effect.runSync(_new(major, minor));
