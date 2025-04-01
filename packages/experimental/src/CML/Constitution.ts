/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Constitution class
 *
 * @since 2.0.0
 * @category Types
 */
export type Constitution = CML.Constitution;

/**
 * Error class for Constitution operations
 * 
 * This error is thrown when operations on Constitution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ConstitutionError extends Data.TaggedError("ConstitutionError")<{
  message?: string;
}> {}

/**
 * Method free of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Constitution) => Effect.Effect<void, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Constitution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.Constitution) => Effect.Effect<Uint8Array, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCborBytes failed Constitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Constitution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.Constitution) => Effect.Effect<Uint8Array, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCanonicalCborBytes failed Constitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Constitution): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Constitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Constitution, ConstitutionError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_cbor_bytes(cborBytes),
    catch: () => new ConstitutionError({
      message: `Constitution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Constitution =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.Constitution) => Effect.Effect<string, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCborHex failed Constitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.Constitution) => Effect.Effect<string, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCanonicalCborHex failed Constitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Constitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Constitution, ConstitutionError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_cbor_hex(cborBytes),
    catch: () => new ConstitutionError({
      message: `Constitution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Constitution =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Constitution) => Effect.Effect<string, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toJson failed Constitution is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Constitution) => Effect.Effect<any, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toJsValue failed Constitution is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Constitution): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Constitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Constitution, ConstitutionError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_json(json),
    catch: () => new ConstitutionError({
      message: `Constitution.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Constitution =>
  Effect.runSync(fromJson(json));

/**
 * Method anchor of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor: (instance: CML.Constitution) => Effect.Effect<CML.Anchor, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.Constitution): CML.Anchor =>
  Effect.runSync(anchor(instance));

/**
 * Method scriptHash of Constitution
 * 
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash: (instance: CML.Constitution) => Effect.Effect<CML.ScriptHash | undefined, ConstitutionError> = Effect.fn(
  (instance: CML.Constitution) =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.scriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptHashUnsafe = (instance: CML.Constitution): CML.ScriptHash | undefined =>
  Effect.runSync(scriptHash(instance));

/**
 * Static method _new of Constitution
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (anchor: CML.Anchor, scriptHash: CML.ScriptHash) => Effect.Effect<CML.Constitution, ConstitutionError> = Effect.fn(function* (anchor: CML.Anchor, scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.Constitution.new(anchor, scriptHash),
    catch: () => new ConstitutionError({
      message: `Constitution._new failed with parameters: ${anchor} (Anchor), ${scriptHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls Constitution._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (anchor: CML.Anchor, scriptHash: CML.ScriptHash): CML.Constitution =>
  Effect.runSync(_new(anchor, scriptHash));
