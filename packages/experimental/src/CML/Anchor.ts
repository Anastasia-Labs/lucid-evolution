import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Anchor = CML.Anchor;

export class AnchorError extends Data.TaggedError("AnchorError")<{
  message?: string;
}> {}

/**
 * Method free of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<void, AnchorError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AnchorError({
          message: `Anchor.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Anchor): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<Uint8Array, AnchorError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCborBytes failed Anchor is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Anchor): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<Uint8Array, AnchorError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCanonicalCborBytes failed Anchor is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Anchor): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Anchor.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_cbor_bytes(cborBytes),
    catch: () => new AnchorError({
      message: `Anchor.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Anchor.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<string, AnchorError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCborHex failed Anchor is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Anchor): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<string, AnchorError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCanonicalCborHex failed Anchor is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Anchor): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Anchor.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_cbor_hex(cborBytes),
    catch: () => new AnchorError({
      message: `Anchor.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Anchor.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<string, AnchorError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toJson failed Anchor is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Anchor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<any, AnchorError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toJsValue failed Anchor is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Anchor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Anchor.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_json(json),
    catch: () => new AnchorError({
      message: `Anchor.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Anchor.fromJson without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method anchorUrl of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.anchorUrl(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchorUrl = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<CML.Url, AnchorError> =>
    Effect.try({
      try: () => instance.anchor_url(),
      catch: () =>
        new AnchorError({
          message: `Anchor.anchorUrl failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchorUrl without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeAnchorUrl(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeAnchorUrl failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAnchorUrl = (instance: CML.Anchor): CML.Url =>
  Effect.runSync(anchorUrl(instance));

/**
 * Method anchorDocHash of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Anchor instance
 * const instance = ... ;
 *   const result = yield* Anchor.anchorDocHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchorDocHash = Effect.fn(
  (instance: CML.Anchor): Effect.Effect<CML.AnchorDocHash, AnchorError> =>
    Effect.try({
      try: () => instance.anchor_doc_hash(),
      catch: () =>
        new AnchorError({
          message: `Anchor.anchorDocHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchorDocHash without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Anchor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafeAnchorDocHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafeAnchorDocHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAnchorDocHash = (instance: CML.Anchor): CML.AnchorDocHash =>
  Effect.runSync(anchorDocHash(instance));

/**
 * Static method _new of Anchor
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Anchor._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (anchorUrl: CML.Url, anchorDocHash: CML.AnchorDocHash) {
  return yield* Effect.try({
    try: () => CML.Anchor.new(anchorUrl, anchorDocHash),
    catch: () => new AnchorError({
      message: `Anchor._new failed with parameters: ${anchorUrl} (Url), ${anchorDocHash} (AnchorDocHash). `,
    }),
  });
});

/**
 * Unsafely calls Anchor._new without Effect wrapper
 * 
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Anchor.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Anchor.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (anchorUrl: CML.Url, anchorDocHash: CML.AnchorDocHash) =>
  Effect.runSync(_new(anchorUrl, anchorDocHash));
