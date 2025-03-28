import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Header = CML.Header;

export class HeaderError extends Data.TaggedError("HeaderError")<{
  message?: string;
}> {}

/**
 * Method free of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Header): Effect.Effect<void, HeaderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HeaderError({
          message: `Header.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Header): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Header): Effect.Effect<Uint8Array, HeaderError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HeaderError({
          message: `Header.toCborBytes failed Header is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Header): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Header): Effect.Effect<Uint8Array, HeaderError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new HeaderError({
          message: `Header.toCanonicalCborBytes failed Header is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Header): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Header.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Header.from_cbor_bytes(cborBytes),
    catch: () => new HeaderError({
      message: `Header.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Header.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Header): Effect.Effect<string, HeaderError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HeaderError({
          message: `Header.toCborHex failed Header is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Header): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Header): Effect.Effect<string, HeaderError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new HeaderError({
          message: `Header.toCanonicalCborHex failed Header is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Header): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Header.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Header.from_cbor_hex(cborBytes),
    catch: () => new HeaderError({
      message: `Header.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Header.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Header): Effect.Effect<string, HeaderError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new HeaderError({
          message: `Header.toJson failed Header is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Header): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Header): Effect.Effect<any, HeaderError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new HeaderError({
          message: `Header.toJsValue failed Header is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Header): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Header.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Header.from_json(json),
    catch: () => new HeaderError({
      message: `Header.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Header.fromJson without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method headerBody of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.headerBody(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const headerBody = Effect.fn(
  (instance: CML.Header): Effect.Effect<CML.HeaderBody, HeaderError> =>
    Effect.try({
      try: () => instance.header_body(),
      catch: () =>
        new HeaderError({
          message: `Header.headerBody failed `,
        }),
    })
);

/**
 * Unsafely calls instance.headerBody without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeHeaderBody(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeHeaderBody failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHeaderBody = (instance: CML.Header): CML.HeaderBody =>
  Effect.runSync(headerBody(instance));

/**
 * Method bodySignature of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Header instance
 * const instance = ... ;
 *   const result = yield* Header.bodySignature(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const bodySignature = Effect.fn(
  (instance: CML.Header): Effect.Effect<CML.KESSignature, HeaderError> =>
    Effect.try({
      try: () => instance.body_signature(),
      catch: () =>
        new HeaderError({
          message: `Header.bodySignature failed `,
        }),
    })
);

/**
 * Unsafely calls instance.bodySignature without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Header instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafeBodySignature(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafeBodySignature failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBodySignature = (instance: CML.Header): CML.KESSignature =>
  Effect.runSync(bodySignature(instance));

/**
 * Static method _new of Header
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Header._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (headerBody: CML.HeaderBody, bodySignature: CML.KESSignature) {
  return yield* Effect.try({
    try: () => CML.Header.new(headerBody, bodySignature),
    catch: () => new HeaderError({
      message: `Header._new failed with parameters: ${headerBody} (HeaderBody), ${bodySignature} (KESSignature). `,
    }),
  });
});

/**
 * Unsafely calls Header._new without Effect wrapper
 * 
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Header.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Header.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (headerBody: CML.HeaderBody, bodySignature: CML.KESSignature) =>
  Effect.runSync(_new(headerBody, bodySignature));
