/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Nonce class
 *
 * @since 2.0.0
 * @category Types
 */
export type Nonce = CML.Nonce;

/**
 * Error class for Nonce operations
 * 
 * This error is thrown when operations on Nonce instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NonceError extends Data.TaggedError("NonceError")<{
  message?: string;
}> {}

/**
 * Method free of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Nonce) => Effect.Effect<void, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NonceError({
          message: `Nonce.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Nonce): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.Nonce) => Effect.Effect<Uint8Array, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCborBytes failed Nonce is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Nonce): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.Nonce) => Effect.Effect<Uint8Array, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCanonicalCborBytes failed Nonce is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Nonce): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Nonce
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Nonce, NonceError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_cbor_bytes(cborBytes),
    catch: () => new NonceError({
      message: `Nonce.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Nonce.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Nonce =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.Nonce) => Effect.Effect<string, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCborHex failed Nonce is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Nonce): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.Nonce) => Effect.Effect<string, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCanonicalCborHex failed Nonce is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Nonce): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Nonce
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Nonce, NonceError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_cbor_hex(cborBytes),
    catch: () => new NonceError({
      message: `Nonce.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Nonce.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Nonce =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Nonce) => Effect.Effect<string, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NonceError({
          message: `Nonce.toJson failed Nonce is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Nonce): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Nonce) => Effect.Effect<any, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NonceError({
          message: `Nonce.toJsValue failed Nonce is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Nonce): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Nonce
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Nonce, NonceError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_json(json),
    catch: () => new NonceError({
      message: `Nonce.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Nonce.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Nonce =>
  Effect.runSync(fromJson(json));

/**
 * Static method newIdentity of Nonce
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newIdentity: () => Effect.Effect<CML.Nonce, NonceError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Nonce.new_identity(),
    catch: () => new NonceError({
      message: `Nonce.newIdentity failed `,
    }),
  });
});

/**
 * Unsafely calls Nonce.newIdentity without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newIdentityUnsafe = (): CML.Nonce =>
  Effect.runSync(newIdentity());

/**
 * Static method newHash of Nonce
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newHash: (hash: CML.NonceHash) => Effect.Effect<CML.Nonce, NonceError> = Effect.fn(function* (hash: CML.NonceHash) {
  return yield* Effect.try({
    try: () => CML.Nonce.new_hash(hash),
    catch: () => new NonceError({
      message: `Nonce.newHash failed with parameters: ${hash} (NonceHash). `,
    }),
  });
});

/**
 * Unsafely calls Nonce.newHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newHashUnsafe = (hash: CML.NonceHash): CML.Nonce =>
  Effect.runSync(newHash(hash));

/**
 * Method kind of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.Nonce) => Effect.Effect<CML.NonceKind, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new NonceError({
          message: `Nonce.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Nonce): CML.NonceKind =>
  Effect.runSync(kind(instance));

/**
 * Method asHash of Nonce
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asHash: (instance: CML.Nonce) => Effect.Effect<CML.NonceHash | undefined, NonceError> = Effect.fn(
  (instance: CML.Nonce) =>
    Effect.try({
      try: () => instance.as_hash(),
      catch: () =>
        new NonceError({
          message: `Nonce.asHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asHashUnsafe = (instance: CML.Nonce): CML.NonceHash | undefined =>
  Effect.runSync(asHash(instance));
