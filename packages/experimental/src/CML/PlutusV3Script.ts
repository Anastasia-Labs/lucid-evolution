/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV3Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV3Script = CML.PlutusV3Script;

/**
 * Error class for PlutusV3Script operations
 * 
 * This error is thrown when operations on PlutusV3Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV3ScriptError extends Data.TaggedError("PlutusV3ScriptError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PlutusV3Script) => Effect.Effect<void, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV3Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash: (instance: CML.PlutusV3Script) => Effect.Effect<CML.ScriptHash, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusV3Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method toRawBytes of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.PlutusV3Script) => Effect.Effect<Uint8Array, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toRawBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PlutusV3Script): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_raw_bytes(bytes),
    catch: () => new PlutusV3ScriptError({
      message: `PlutusV3Script.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.PlutusV3Script =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.PlutusV3Script) => Effect.Effect<string, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toHex failed PlutusV3Script is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptError> = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_hex(input),
    catch: () => new PlutusV3ScriptError({
      message: `PlutusV3Script.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.PlutusV3Script =>
  Effect.runSync(fromHex(input));

/**
 * Method toCborBytes of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.PlutusV3Script) => Effect.Effect<Uint8Array, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCborBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusV3Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.PlutusV3Script) => Effect.Effect<Uint8Array, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCanonicalCborBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PlutusV3Script): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_cbor_bytes(cborBytes),
    catch: () => new PlutusV3ScriptError({
      message: `PlutusV3Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PlutusV3Script =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.PlutusV3Script) => Effect.Effect<string, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCborHex failed PlutusV3Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.PlutusV3Script) => Effect.Effect<string, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCanonicalCborHex failed PlutusV3Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_cbor_hex(cborBytes),
    catch: () => new PlutusV3ScriptError({
      message: `PlutusV3Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PlutusV3Script =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.PlutusV3Script) => Effect.Effect<string, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toJson failed PlutusV3Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.PlutusV3Script) => Effect.Effect<any, PlutusV3ScriptError> = Effect.fn(
  (instance: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toJsValue failed PlutusV3Script is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusV3Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusV3Script
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_json(json),
    catch: () => new PlutusV3ScriptError({
      message: `PlutusV3Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PlutusV3Script =>
  Effect.runSync(fromJson(json));
