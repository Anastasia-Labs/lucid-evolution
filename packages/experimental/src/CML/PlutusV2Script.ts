/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV2Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV2Script = CML.PlutusV2Script;

/**
 * Error class for PlutusV2Script operations
 *
 * This error is thrown when operations on PlutusV2Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV2ScriptError extends Data.TaggedError(
  "PlutusV2ScriptError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<void, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV2Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<CML.ScriptHash, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusV2Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method toRawBytes of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toRawBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PlutusV2Script): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PlutusV2Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.PlutusV2Script.from_raw_bytes(bytes),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls PlutusV2Script.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.PlutusV2Script =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toHex failed PlutusV2Script is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PlutusV2Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.PlutusV2Script.from_hex(input),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls PlutusV2Script.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.PlutusV2Script =>
  Effect.runSync(fromHex(input));

/**
 * Method toCborBytes of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCborBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusV2Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<Uint8Array, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCanonicalCborBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.PlutusV2Script,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusV2Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.PlutusV2Script.from_cbor_bytes(cborBytes),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls PlutusV2Script.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.PlutusV2Script => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCborHex failed PlutusV2Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCanonicalCborHex failed PlutusV2Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.PlutusV2Script,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusV2Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.PlutusV2Script.from_cbor_hex(cborBytes),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls PlutusV2Script.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PlutusV2Script =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<string, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toJson failed PlutusV2Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusV2Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.PlutusV2Script,
) => Effect.Effect<any, PlutusV2ScriptError> = Effect.fn(
  (instance: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toJsValue failed PlutusV2Script is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusV2Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusV2Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.PlutusV2Script.from_json(json),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls PlutusV2Script.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PlutusV2Script =>
  Effect.runSync(fromJson(json));
