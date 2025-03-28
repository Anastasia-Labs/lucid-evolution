import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Credential = CML.Credential;

export class CredentialError extends Data.TaggedError("CredentialError")<{
  message?: string;
}> {}

/**
 * Method free of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Credential): Effect.Effect<void, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Credential): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Credential): Effect.Effect<Uint8Array, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Credential): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Credential): Effect.Effect<Uint8Array, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.Credential,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Credential.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Credential.from_cbor_bytes(cborBytes),
    catch: () =>
      new CredentialError({
        message: `Credential.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Credential.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Credential): Effect.Effect<string, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Credential): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Credential): Effect.Effect<string, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Credential): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Credential.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Credential): Effect.Effect<string, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Credential): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Credential): Effect.Effect<any, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Credential): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Credential.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newPubKey of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Credential.newPubKey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newPubKey = Effect.fn(function* (hash: CML.Ed25519KeyHash) {
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeNewPubKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeNewPubKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewPubKey = (hash: CML.Ed25519KeyHash) =>
  Effect.runSync(newPubKey(hash));

/**
 * Static method newScript of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Credential.newScript( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newScript = Effect.fn(function* (hash: CML.ScriptHash) {
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeNewScript( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeNewScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewScript = (hash: CML.ScriptHash) =>
  Effect.runSync(newScript(hash));

/**
 * Method kind of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.Credential,
  ): Effect.Effect<CML.CredentialKind, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Credential): CML.CredentialKind =>
  Effect.runSync(kind(instance));

/**
 * Method asPubKey of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.asPubKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPubKey = Effect.fn(
  (
    instance: CML.Credential,
  ): Effect.Effect<CML.Ed25519KeyHash | undefined, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeAsPubKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeAsPubKey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsPubKey = (
  instance: CML.Credential,
): CML.Ed25519KeyHash | undefined => Effect.runSync(asPubKey(instance));

/**
 * Method asScript of Credential
 *
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Credential instance
 * const instance = ... ;
 *   const result = yield* Credential.asScript(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asScript = Effect.fn(
  (
    instance: CML.Credential,
  ): Effect.Effect<CML.ScriptHash | undefined, CredentialError> =>
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
 * @example
 * import { Credential } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Credential instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Credential.unsafeAsScript(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Credential.unsafeAsScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsScript = (
  instance: CML.Credential,
): CML.ScriptHash | undefined => Effect.runSync(asScript(instance));
