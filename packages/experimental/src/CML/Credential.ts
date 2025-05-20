/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Credential class
 *
 * @since 2.0.0
 * @category Types
 */
export type Credential = CML.Credential;

/**
 * Error class for Credential operations
 *
 * This error is thrown when operations on Credential instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CredentialError extends Data.TaggedError("CredentialError")<{
  message?: string;
}> {}

/**
 * Method free of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Credential,
) => Effect.Effect<void, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CredentialError({
          message: `Credential.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Credential): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Credential,
) => Effect.Effect<Uint8Array, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CredentialError({
          message: `Credential.toCborBytes failed Credential is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Credential): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Credential,
) => Effect.Effect<Uint8Array, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CredentialError({
          message: `Credential.toCanonicalCborBytes failed Credential is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.Credential,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Credential
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Credential, CredentialError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Credential.from_cbor_bytes(cborBytes),
    catch: () =>
      new CredentialError({
        message: `Credential.decodeCBORBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Credential.decodeCBORBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Credential =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CredentialError({
          message: `Credential.toCborHex failed Credential is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Credential): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CredentialError({
          message: `Credential.toCanonicalCborHex failed Credential is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Credential): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Credential
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Credential, CredentialError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Credential.from_cbor_hex(cborBytes),
    catch: () =>
      new CredentialError({
        message: `Credential.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Credential.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Credential =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CredentialError({
          message: `Credential.toJson failed Credential is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Credential): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Credential,
) => Effect.Effect<any, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CredentialError({
          message: `Credential.toJsValue failed Credential is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Credential): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Credential
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Credential, CredentialError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Credential.from_json(json),
    catch: () =>
      new CredentialError({
        message: `Credential.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Credential.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Credential =>
  Effect.runSync(fromJson(json));

/**
 * Static method newPubKey of Credential
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newPubKey: (
  hash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Credential, CredentialError> = Effect.fn(function* (
  hash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () => CML.Credential.new_pub_key(hash),
    catch: () =>
      new CredentialError({
        message: `Credential.newPubKey failed with parameters: ${hash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls Credential.newPubKey without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPubKeyUnsafe = (hash: CML.Ed25519KeyHash): CML.Credential =>
  Effect.runSync(newPubKey(hash));

/**
 * Static method newScript of Credential
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScript: (
  hash: CML.ScriptHash,
) => Effect.Effect<CML.Credential, CredentialError> = Effect.fn(function* (
  hash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () => CML.Credential.new_script(hash),
    catch: () =>
      new CredentialError({
        message: `Credential.newScript failed with parameters: ${hash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls Credential.newScript without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptUnsafe = (hash: CML.ScriptHash): CML.Credential =>
  Effect.runSync(newScript(hash));

/**
 * Method kind of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.Credential,
) => Effect.Effect<CML.CredentialKind, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new CredentialError({
          message: `Credential.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Credential): CML.CredentialKind =>
  Effect.runSync(kind(instance));

/**
 * Method asPubKey of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPubKey: (
  instance: CML.Credential,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.as_pub_key(),
      catch: () =>
        new CredentialError({
          message: `Credential.asPubKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asPubKey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPubKeyUnsafe = (
  instance: CML.Credential,
): CML.Ed25519KeyHash | undefined => Effect.runSync(asPubKey(instance));

/**
 * Method asScript of Credential
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScript: (
  instance: CML.Credential,
) => Effect.Effect<CML.ScriptHash | undefined, CredentialError> = Effect.fn(
  (instance: CML.Credential) =>
    Effect.try({
      try: () => instance.as_script(),
      catch: () =>
        new CredentialError({
          message: `Credential.asScript failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asScript without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptUnsafe = (
  instance: CML.Credential,
): CML.ScriptHash | undefined => Effect.runSync(asScript(instance));
