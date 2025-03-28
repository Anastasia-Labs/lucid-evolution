import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type UnregDrepCert = CML.UnregDrepCert;

export class UnregDrepCertError extends Data.TaggedError("UnregDrepCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<void, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.UnregDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<Uint8Array, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.UnregDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<Uint8Array, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.UnregDrepCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_cbor_bytes(cborBytes),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_cbor_hex(cborBytes),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJson failed UnregDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<any, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJsValue failed UnregDrepCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.UnregDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_json(json),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromJson without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.drepCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<CML.Credential, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.drepCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.drepCredential without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeDrepCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeDrepCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDrepCredential = (instance: CML.UnregDrepCert): CML.Credential =>
  Effect.runSync(drepCredential(instance));

/**
 * Method deposit of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<bigint, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafeDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafeDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDeposit = (instance: CML.UnregDrepCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (drepCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.new(drepCredential, deposit),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert._new failed with parameters: ${drepCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert._new without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (drepCredential: CML.Credential, deposit: bigint) =>
  Effect.runSync(_new(drepCredential, deposit));
