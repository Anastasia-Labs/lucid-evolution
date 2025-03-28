import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Nonce = CML.Nonce;

export class NonceError extends Data.TaggedError("NonceError")<{
  message?: string;
}> {}

/**
 * Method free of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<void, NonceError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NonceError({
          message: `Nonce.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Nonce): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<Uint8Array, NonceError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCborBytes failed Nonce is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Nonce): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<Uint8Array, NonceError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCanonicalCborBytes failed Nonce is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Nonce): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Nonce.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_cbor_bytes(cborBytes),
    catch: () =>
      new NonceError({
        message: `Nonce.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Nonce.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<string, NonceError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCborHex failed Nonce is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Nonce): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<string, NonceError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NonceError({
          message: `Nonce.toCanonicalCborHex failed Nonce is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Nonce): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Nonce.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_cbor_hex(cborBytes),
    catch: () =>
      new NonceError({
        message: `Nonce.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Nonce.fromCborHex without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<string, NonceError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NonceError({
          message: `Nonce.toJson failed Nonce is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Nonce): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<any, NonceError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NonceError({
          message: `Nonce.toJsValue failed Nonce is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Nonce): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Nonce.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Nonce.from_json(json),
    catch: () =>
      new NonceError({
        message: `Nonce.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Nonce.fromJson without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newIdentity of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Nonce.newIdentity();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newIdentity = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Nonce.new_identity(),
    catch: () =>
      new NonceError({
        message: `Nonce.newIdentity failed `,
      }),
  });
});

/**
 * Unsafely calls Nonce.newIdentity without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeNewIdentity();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeNewIdentity failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewIdentity = () => Effect.runSync(newIdentity());

/**
 * Static method newHash of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Nonce.newHash( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newHash = Effect.fn(function* (hash: CML.NonceHash) {
  return yield* Effect.try({
    try: () => CML.Nonce.new_hash(hash),
    catch: () =>
      new NonceError({
        message: `Nonce.newHash failed with parameters: ${hash} (NonceHash). `,
      }),
  });
});

/**
 * Unsafely calls Nonce.newHash without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeNewHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeNewHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewHash = (hash: CML.NonceHash) =>
  Effect.runSync(newHash(hash));

/**
 * Method kind of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<CML.NonceKind, NonceError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new NonceError({
          message: `Nonce.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeKind failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Nonce): CML.NonceKind =>
  Effect.runSync(kind(instance));

/**
 * Method asHash of Nonce
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *   const result = yield* Nonce.asHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asHash = Effect.fn(
  (instance: CML.Nonce): Effect.Effect<CML.NonceHash | undefined, NonceError> =>
    Effect.try({
      try: () => instance.as_hash(),
      catch: () =>
        new NonceError({
          message: `Nonce.asHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asHash without Effect wrapper
 *
 * @example
 * import { Nonce } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Nonce instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Nonce.unsafeAsHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Nonce.unsafeAsHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsHash = (instance: CML.Nonce): CML.NonceHash | undefined =>
  Effect.runSync(asHash(instance));
