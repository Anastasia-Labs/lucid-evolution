/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptAny class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptAny = CML.ScriptAny;

/**
 * Error class for ScriptAny operations
 *
 * This error is thrown when operations on ScriptAny instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptAnyError extends Data.TaggedError("ScriptAnyError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ScriptAny,
) => Effect.Effect<void, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptAny): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ScriptAny,
) => Effect.Effect<Uint8Array, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCborBytes failed ScriptAny is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptAny): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ScriptAny,
) => Effect.Effect<Uint8Array, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCanonicalCborBytes failed ScriptAny is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ScriptAny,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptAny
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptAny, ScriptAnyError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ScriptAny =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ScriptAny,
) => Effect.Effect<string, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCborHex failed ScriptAny is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ScriptAny,
) => Effect.Effect<string, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCanonicalCborHex failed ScriptAny is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptAny
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptAny, ScriptAnyError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptAny =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ScriptAny,
) => Effect.Effect<string, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toJson failed ScriptAny is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ScriptAny,
) => Effect.Effect<any, ScriptAnyError> = Effect.fn((instance: CML.ScriptAny) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.toJsValue failed ScriptAny is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptAny): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptAny
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptAny, ScriptAnyError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_json(json),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptAny =>
  Effect.runSync(fromJson(json));

/**
 * Method nativeScripts of ScriptAny
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts: (
  instance: CML.ScriptAny,
) => Effect.Effect<CML.NativeScriptList, ScriptAnyError> = Effect.fn(
  (instance: CML.ScriptAny) =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.nativeScripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (
  instance: CML.ScriptAny,
): CML.NativeScriptList => Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptAny
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  nativeScripts: CML.NativeScriptList,
) => Effect.Effect<CML.ScriptAny, ScriptAnyError> = Effect.fn(function* (
  nativeScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.new(nativeScripts),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny._new failed with parameters: ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls ScriptAny._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  nativeScripts: CML.NativeScriptList,
): CML.ScriptAny => Effect.runSync(_new(nativeScripts));
