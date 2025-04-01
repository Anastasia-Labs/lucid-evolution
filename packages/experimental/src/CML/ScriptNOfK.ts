/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptNOfK class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptNOfK = CML.ScriptNOfK;

/**
 * Error class for ScriptNOfK operations
 *
 * This error is thrown when operations on ScriptNOfK instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptNOfKError extends Data.TaggedError("ScriptNOfKError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<void, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptNOfK): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<Uint8Array, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCborBytes failed ScriptNOfK is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptNOfK): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<Uint8Array, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCanonicalCborBytes failed ScriptNOfK is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ScriptNOfK,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptNOfK
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptNOfKError({
        message: `ScriptNOfK.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ScriptNOfK =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<string, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCborHex failed ScriptNOfK is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<string, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCanonicalCborHex failed ScriptNOfK is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptNOfK
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptNOfKError({
        message: `ScriptNOfK.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptNOfK =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<string, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toJson failed ScriptNOfK is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<any, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toJsValue failed ScriptNOfK is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptNOfK): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptNOfK
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_json(json),
    catch: () =>
      new ScriptNOfKError({
        message: `ScriptNOfK.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptNOfK =>
  Effect.runSync(fromJson(json));

/**
 * Method n of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const n: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<bigint, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.n(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.n failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.n without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nUnsafe = (instance: CML.ScriptNOfK): bigint =>
  Effect.runSync(n(instance));

/**
 * Method nativeScripts of ScriptNOfK
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts: (
  instance: CML.ScriptNOfK,
) => Effect.Effect<CML.NativeScriptList, ScriptNOfKError> = Effect.fn(
  (instance: CML.ScriptNOfK) =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.nativeScripts failed `,
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
  instance: CML.ScriptNOfK,
): CML.NativeScriptList => Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptNOfK
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  n: bigint,
  nativeScripts: CML.NativeScriptList,
) => Effect.Effect<CML.ScriptNOfK, ScriptNOfKError> = Effect.fn(function* (
  n: bigint,
  nativeScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.new(n, nativeScripts),
    catch: () =>
      new ScriptNOfKError({
        message: `ScriptNOfK._new failed with parameters: ${n}, ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls ScriptNOfK._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  n: bigint,
  nativeScripts: CML.NativeScriptList,
): CML.ScriptNOfK => Effect.runSync(_new(n, nativeScripts));
