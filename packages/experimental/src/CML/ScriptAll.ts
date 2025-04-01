/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptAll class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptAll = CML.ScriptAll;

/**
 * Error class for ScriptAll operations
 * 
 * This error is thrown when operations on ScriptAll instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptAllError extends Data.TaggedError("ScriptAllError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ScriptAll) => Effect.Effect<void, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptAll): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ScriptAll) => Effect.Effect<Uint8Array, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCborBytes failed ScriptAll is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptAll): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ScriptAll) => Effect.Effect<Uint8Array, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCanonicalCborBytes failed ScriptAll is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ScriptAll): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptAll
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ScriptAll, ScriptAllError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_cbor_bytes(cborBytes),
    catch: () => new ScriptAllError({
      message: `ScriptAll.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ScriptAll.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ScriptAll =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ScriptAll) => Effect.Effect<string, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCborHex failed ScriptAll is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptAll): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ScriptAll) => Effect.Effect<string, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCanonicalCborHex failed ScriptAll is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptAll): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptAll
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ScriptAll, ScriptAllError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_cbor_hex(cborBytes),
    catch: () => new ScriptAllError({
      message: `ScriptAll.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ScriptAll.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptAll =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ScriptAll) => Effect.Effect<string, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toJson failed ScriptAll is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptAll): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ScriptAll) => Effect.Effect<any, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toJsValue failed ScriptAll is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptAll): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptAll
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ScriptAll, ScriptAllError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_json(json),
    catch: () => new ScriptAllError({
      message: `ScriptAll.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ScriptAll.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptAll =>
  Effect.runSync(fromJson(json));

/**
 * Method nativeScripts of ScriptAll
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts: (instance: CML.ScriptAll) => Effect.Effect<CML.NativeScriptList, ScriptAllError> = Effect.fn(
  (instance: CML.ScriptAll) =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.nativeScripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (instance: CML.ScriptAll): CML.NativeScriptList =>
  Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptAll
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (nativeScripts: CML.NativeScriptList) => Effect.Effect<CML.ScriptAll, ScriptAllError> = Effect.fn(function* (nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.new(nativeScripts),
    catch: () => new ScriptAllError({
      message: `ScriptAll._new failed with parameters: ${nativeScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls ScriptAll._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (nativeScripts: CML.NativeScriptList): CML.ScriptAll =>
  Effect.runSync(_new(nativeScripts));
