/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptInvalidBefore class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptInvalidBefore = CML.ScriptInvalidBefore;

/**
 * Error class for ScriptInvalidBefore operations
 *
 * This error is thrown when operations on ScriptInvalidBefore instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptInvalidBeforeError extends Data.TaggedError(
  "ScriptInvalidBeforeError",
)<{
  message?: string;
}> {}

/**
 * Method free of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<void, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptInvalidBefore): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<Uint8Array, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toCborBytes failed ScriptInvalidBefore is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.ScriptInvalidBefore,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<Uint8Array, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toCanonicalCborBytes failed ScriptInvalidBefore is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ScriptInvalidBefore,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.ScriptInvalidBefore.from_cbor_bytes(cborBytes),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls ScriptInvalidBefore.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.ScriptInvalidBefore => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toCborHex failed ScriptInvalidBefore is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptInvalidBefore): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toCanonicalCborHex failed ScriptInvalidBefore is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.ScriptInvalidBefore,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.ScriptInvalidBefore.from_cbor_hex(cborBytes),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls ScriptInvalidBefore.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptInvalidBefore =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<string, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toJson failed ScriptInvalidBefore is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptInvalidBefore): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<any, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.toJsValue failed ScriptInvalidBefore is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptInvalidBefore): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.ScriptInvalidBefore.from_json(json),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls ScriptInvalidBefore.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptInvalidBefore =>
  Effect.runSync(fromJson(json));

/**
 * Method before of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Methods
 */
export const before: (
  instance: CML.ScriptInvalidBefore,
) => Effect.Effect<bigint, ScriptInvalidBeforeError> = Effect.fn(
  (instance: CML.ScriptInvalidBefore) =>
    Effect.try({
      try: () => instance.before(),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore.before failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.before without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const beforeUnsafe = (instance: CML.ScriptInvalidBefore): bigint =>
  Effect.runSync(before(instance));

/**
 * Static method _new of ScriptInvalidBefore
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  before: bigint,
) => Effect.Effect<CML.ScriptInvalidBefore, ScriptInvalidBeforeError> =
  Effect.fn(function* (before: bigint) {
    return yield* Effect.try({
      try: () => CML.ScriptInvalidBefore.new(before),
      catch: () =>
        new ScriptInvalidBeforeError({
          message: `ScriptInvalidBefore._new failed with parameters: ${before}. `,
        }),
    });
  });

/**
 * Unsafely calls ScriptInvalidBefore._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (before: bigint): CML.ScriptInvalidBefore =>
  Effect.runSync(_new(before));
