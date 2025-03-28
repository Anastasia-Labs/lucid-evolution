import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type UnregCert = CML.UnregCert;

export class UnregCertError extends Data.TaggedError("UnregCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<void, UnregCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.UnregCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<Uint8Array, UnregCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.UnregCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<Uint8Array, UnregCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.UnregCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnregCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new UnregCertError({
        message: `UnregCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.UnregCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.UnregCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnregCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_hex(cborBytes),
    catch: () =>
      new UnregCertError({
        message: `UnregCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJson failed UnregCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.UnregCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<any, UnregCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJsValue failed UnregCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.UnregCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnregCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_json(json),
    catch: () =>
      new UnregCertError({
        message: `UnregCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls UnregCert.fromJson without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.stakeCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<CML.Credential, UnregCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeStakeCredential failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (
  instance: CML.UnregCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method deposit of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.deposit(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<bigint, UnregCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.deposit failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafeDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafeDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDeposit = (instance: CML.UnregCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregCert
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnregCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  stakeCredential: CML.Credential,
  deposit: bigint,
) {
  return yield* Effect.try({
    try: () => CML.UnregCert.new(stakeCredential, deposit),
    catch: () =>
      new UnregCertError({
        message: `UnregCert._new failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
      }),
  });
});

/**
 * Unsafely calls UnregCert._new without Effect wrapper
 *
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (stakeCredential: CML.Credential, deposit: bigint) =>
  Effect.runSync(_new(stakeCredential, deposit));
