import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionBody = CML.TransactionBody;

export class TransactionBodyError extends Data.TaggedError(
  "TransactionBodyError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionBody): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionBody): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<Uint8Array, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCborBytes failed TransactionBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.TransactionBody): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<Uint8Array, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCanonicalCborBytes failed TransactionBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.TransactionBody,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionBody.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionBody.from_cbor_bytes(cborBytes),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TransactionBody.fromCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<string, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCborHex failed TransactionBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.TransactionBody): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<string, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toCanonicalCborHex failed TransactionBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.TransactionBody,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionBody.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionBody.from_cbor_hex(cborBytes),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls TransactionBody.fromCborHex without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<string, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toJson failed TransactionBody is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.TransactionBody): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.TransactionBody): Effect.Effect<any, TransactionBodyError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.toJsValue failed TransactionBody is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.TransactionBody): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionBody.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionBody.from_json(json),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls TransactionBody.fromJson without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method inputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.inputs(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const inputs = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.TransactionInputList, TransactionBodyError> =>
    Effect.try({
      try: () => instance.inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.inputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.inputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeInputs(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInputs = (
  instance: CML.TransactionBody,
): CML.TransactionInputList => Effect.runSync(inputs(instance));

/**
 * Method outputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.outputs(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const outputs = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.TransactionOutputList, TransactionBodyError> =>
    Effect.try({
      try: () => instance.outputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.outputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.outputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeOutputs(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeOutputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOutputs = (
  instance: CML.TransactionBody,
): CML.TransactionOutputList => Effect.runSync(outputs(instance));

/**
 * Method fee of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.fee(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const fee = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint, TransactionBodyError> =>
    Effect.try({
      try: () => instance.fee(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.fee failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.fee without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeFee(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeFee failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFee = (instance: CML.TransactionBody): bigint =>
  Effect.runSync(fee(instance));

/**
 * Method setTtl of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setTtl(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setTtl = Effect.fn(
  (
    instance: CML.TransactionBody,
    ttl: bigint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_ttl(ttl),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setTtl failed with parameters: ${ttl}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setTtl without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetTtl(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetTtl failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetTtl = (
  instance: CML.TransactionBody,
  ttl: bigint,
): void => Effect.runSync(setTtl(instance, ttl));

/**
 * Method ttl of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.ttl(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ttl = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.ttl(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.ttl failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ttl without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeTtl(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeTtl failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTtl = (instance: CML.TransactionBody): bigint | undefined =>
  Effect.runSync(ttl(instance));

/**
 * Method setCerts of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setCerts(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCerts = Effect.fn(
  (
    instance: CML.TransactionBody,
    certs: CML.CertificateList,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_certs(certs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCerts failed with parameters: ${certs} (CertificateList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCerts without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetCerts(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetCerts failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCerts = (
  instance: CML.TransactionBody,
  certs: CML.CertificateList,
): void => Effect.runSync(setCerts(instance, certs));

/**
 * Method certs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.certs(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const certs = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.CertificateList | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.certs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.certs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.certs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeCerts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeCerts failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCerts = (
  instance: CML.TransactionBody,
): CML.CertificateList | undefined => Effect.runSync(certs(instance));

/**
 * Method setWithdrawals of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setWithdrawals(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setWithdrawals = Effect.fn(
  (
    instance: CML.TransactionBody,
    withdrawals: CML.MapRewardAccountToCoin,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_withdrawals(withdrawals),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setWithdrawals failed with parameters: ${withdrawals} (MapRewardAccountToCoin). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setWithdrawals without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetWithdrawals(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetWithdrawals failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetWithdrawals = (
  instance: CML.TransactionBody,
  withdrawals: CML.MapRewardAccountToCoin,
): void => Effect.runSync(setWithdrawals(instance, withdrawals));

/**
 * Method withdrawals of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.withdrawals(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withdrawals = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<
    CML.MapRewardAccountToCoin | undefined,
    TransactionBodyError
  > =>
    Effect.try({
      try: () => instance.withdrawals(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.withdrawals failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.withdrawals without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeWithdrawals(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeWithdrawals failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithdrawals = (
  instance: CML.TransactionBody,
): CML.MapRewardAccountToCoin | undefined =>
  Effect.runSync(withdrawals(instance));

/**
 * Method setAuxiliaryDataHash of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setAuxiliaryDataHash(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setAuxiliaryDataHash = Effect.fn(
  (
    instance: CML.TransactionBody,
    auxiliaryDataHash: CML.AuxiliaryDataHash,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_auxiliary_data_hash(auxiliaryDataHash),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setAuxiliaryDataHash failed with parameters: ${auxiliaryDataHash} (AuxiliaryDataHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setAuxiliaryDataHash without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetAuxiliaryDataHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetAuxiliaryDataHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetAuxiliaryDataHash = (
  instance: CML.TransactionBody,
  auxiliaryDataHash: CML.AuxiliaryDataHash,
): void => Effect.runSync(setAuxiliaryDataHash(instance, auxiliaryDataHash));

/**
 * Method auxiliaryDataHash of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.auxiliaryDataHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryDataHash = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.AuxiliaryDataHash | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.auxiliary_data_hash(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.auxiliaryDataHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.auxiliaryDataHash without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeAuxiliaryDataHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeAuxiliaryDataHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAuxiliaryDataHash = (
  instance: CML.TransactionBody,
): CML.AuxiliaryDataHash | undefined =>
  Effect.runSync(auxiliaryDataHash(instance));

/**
 * Method setValidityIntervalStart of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setValidityIntervalStart(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setValidityIntervalStart = Effect.fn(
  (
    instance: CML.TransactionBody,
    validityIntervalStart: bigint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_validity_interval_start(validityIntervalStart),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setValidityIntervalStart failed with parameters: ${validityIntervalStart}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setValidityIntervalStart without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetValidityIntervalStart(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetValidityIntervalStart failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetValidityIntervalStart = (
  instance: CML.TransactionBody,
  validityIntervalStart: bigint,
): void =>
  Effect.runSync(setValidityIntervalStart(instance, validityIntervalStart));

/**
 * Method validityIntervalStart of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.validityIntervalStart(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const validityIntervalStart = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.validity_interval_start(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.validityIntervalStart failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.validityIntervalStart without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeValidityIntervalStart(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeValidityIntervalStart failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeValidityIntervalStart = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(validityIntervalStart(instance));

/**
 * Method setMint of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setMint(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setMint = Effect.fn(
  (
    instance: CML.TransactionBody,
    mint: CML.Mint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_mint(mint),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setMint failed with parameters: ${mint} (Mint). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setMint without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetMint(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetMint failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMint = (
  instance: CML.TransactionBody,
  mint: CML.Mint,
): void => Effect.runSync(setMint(instance, mint));

/**
 * Method mint of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.mint(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const mint = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.Mint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.mint(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.mint failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.mint without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeMint(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeMint failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMint = (
  instance: CML.TransactionBody,
): CML.Mint | undefined => Effect.runSync(mint(instance));

/**
 * Method setScriptDataHash of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setScriptDataHash(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setScriptDataHash = Effect.fn(
  (
    instance: CML.TransactionBody,
    scriptDataHash: CML.ScriptDataHash,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_script_data_hash(scriptDataHash),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setScriptDataHash failed with parameters: ${scriptDataHash} (ScriptDataHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setScriptDataHash without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetScriptDataHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetScriptDataHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetScriptDataHash = (
  instance: CML.TransactionBody,
  scriptDataHash: CML.ScriptDataHash,
): void => Effect.runSync(setScriptDataHash(instance, scriptDataHash));

/**
 * Method scriptDataHash of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.scriptDataHash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptDataHash = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.ScriptDataHash | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.script_data_hash(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.scriptDataHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptDataHash without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeScriptDataHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeScriptDataHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeScriptDataHash = (
  instance: CML.TransactionBody,
): CML.ScriptDataHash | undefined => Effect.runSync(scriptDataHash(instance));

/**
 * Method setCollateralInputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setCollateralInputs(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralInputs = Effect.fn(
  (
    instance: CML.TransactionBody,
    collateralInputs: CML.TransactionInputList,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_collateral_inputs(collateralInputs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCollateralInputs failed with parameters: ${collateralInputs} (TransactionInputList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCollateralInputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetCollateralInputs(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetCollateralInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCollateralInputs = (
  instance: CML.TransactionBody,
  collateralInputs: CML.TransactionInputList,
): void => Effect.runSync(setCollateralInputs(instance, collateralInputs));

/**
 * Method collateralInputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.collateralInputs(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const collateralInputs = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<
    CML.TransactionInputList | undefined,
    TransactionBodyError
  > =>
    Effect.try({
      try: () => instance.collateral_inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.collateralInputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.collateralInputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeCollateralInputs(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeCollateralInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCollateralInputs = (
  instance: CML.TransactionBody,
): CML.TransactionInputList | undefined =>
  Effect.runSync(collateralInputs(instance));

/**
 * Method setRequiredSigners of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setRequiredSigners(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setRequiredSigners = Effect.fn(
  (
    instance: CML.TransactionBody,
    requiredSigners: CML.Ed25519KeyHashList,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_required_signers(requiredSigners),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setRequiredSigners failed with parameters: ${requiredSigners} (Ed25519KeyHashList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setRequiredSigners without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetRequiredSigners(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetRequiredSigners failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetRequiredSigners = (
  instance: CML.TransactionBody,
  requiredSigners: CML.Ed25519KeyHashList,
): void => Effect.runSync(setRequiredSigners(instance, requiredSigners));

/**
 * Method requiredSigners of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.requiredSigners(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const requiredSigners = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.Ed25519KeyHashList | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.required_signers(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.requiredSigners failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.requiredSigners without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeRequiredSigners(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeRequiredSigners failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRequiredSigners = (
  instance: CML.TransactionBody,
): CML.Ed25519KeyHashList | undefined =>
  Effect.runSync(requiredSigners(instance));

/**
 * Method setNetworkId of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setNetworkId(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setNetworkId = Effect.fn(
  (
    instance: CML.TransactionBody,
    networkId: CML.NetworkId,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_network_id(networkId),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setNetworkId failed with parameters: ${networkId} (NetworkId). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setNetworkId without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetNetworkId(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetNetworkId failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetNetworkId = (
  instance: CML.TransactionBody,
  networkId: CML.NetworkId,
): void => Effect.runSync(setNetworkId(instance, networkId));

/**
 * Method networkId of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.networkId(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.NetworkId | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.networkId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeNetworkId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeNetworkId failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNetworkId = (
  instance: CML.TransactionBody,
): CML.NetworkId | undefined => Effect.runSync(networkId(instance));

/**
 * Method setCollateralReturn of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setCollateralReturn(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralReturn = Effect.fn(
  (
    instance: CML.TransactionBody,
    collateralReturn: CML.TransactionOutput,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_collateral_return(collateralReturn),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCollateralReturn failed with parameters: ${collateralReturn} (TransactionOutput). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCollateralReturn without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetCollateralReturn(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetCollateralReturn failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCollateralReturn = (
  instance: CML.TransactionBody,
  collateralReturn: CML.TransactionOutput,
): void => Effect.runSync(setCollateralReturn(instance, collateralReturn));

/**
 * Method collateralReturn of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.collateralReturn(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const collateralReturn = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.TransactionOutput | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.collateral_return(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.collateralReturn failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.collateralReturn without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeCollateralReturn(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeCollateralReturn failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCollateralReturn = (
  instance: CML.TransactionBody,
): CML.TransactionOutput | undefined =>
  Effect.runSync(collateralReturn(instance));

/**
 * Method setTotalCollateral of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setTotalCollateral(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setTotalCollateral = Effect.fn(
  (
    instance: CML.TransactionBody,
    totalCollateral: bigint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_total_collateral(totalCollateral),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setTotalCollateral failed with parameters: ${totalCollateral}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setTotalCollateral without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetTotalCollateral(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetTotalCollateral failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetTotalCollateral = (
  instance: CML.TransactionBody,
  totalCollateral: bigint,
): void => Effect.runSync(setTotalCollateral(instance, totalCollateral));

/**
 * Method totalCollateral of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.totalCollateral(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const totalCollateral = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.total_collateral(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.totalCollateral failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.totalCollateral without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeTotalCollateral(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeTotalCollateral failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTotalCollateral = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(totalCollateral(instance));

/**
 * Method setReferenceInputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setReferenceInputs(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setReferenceInputs = Effect.fn(
  (
    instance: CML.TransactionBody,
    referenceInputs: CML.TransactionInputList,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_reference_inputs(referenceInputs),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setReferenceInputs failed with parameters: ${referenceInputs} (TransactionInputList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setReferenceInputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetReferenceInputs(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetReferenceInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetReferenceInputs = (
  instance: CML.TransactionBody,
  referenceInputs: CML.TransactionInputList,
): void => Effect.runSync(setReferenceInputs(instance, referenceInputs));

/**
 * Method referenceInputs of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.referenceInputs(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const referenceInputs = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<
    CML.TransactionInputList | undefined,
    TransactionBodyError
  > =>
    Effect.try({
      try: () => instance.reference_inputs(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.referenceInputs failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.referenceInputs without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeReferenceInputs(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeReferenceInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeReferenceInputs = (
  instance: CML.TransactionBody,
): CML.TransactionInputList | undefined =>
  Effect.runSync(referenceInputs(instance));

/**
 * Method setVotingProcedures of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setVotingProcedures(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setVotingProcedures = Effect.fn(
  (
    instance: CML.TransactionBody,
    votingProcedures: CML.VotingProcedures,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_voting_procedures(votingProcedures),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setVotingProcedures failed with parameters: ${votingProcedures} (VotingProcedures). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setVotingProcedures without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetVotingProcedures(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetVotingProcedures failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetVotingProcedures = (
  instance: CML.TransactionBody,
  votingProcedures: CML.VotingProcedures,
): void => Effect.runSync(setVotingProcedures(instance, votingProcedures));

/**
 * Method votingProcedures of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.votingProcedures(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const votingProcedures = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<CML.VotingProcedures | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.voting_procedures(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.votingProcedures failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.votingProcedures without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeVotingProcedures(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeVotingProcedures failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVotingProcedures = (
  instance: CML.TransactionBody,
): CML.VotingProcedures | undefined =>
  Effect.runSync(votingProcedures(instance));

/**
 * Method setProposalProcedures of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setProposalProcedures(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setProposalProcedures = Effect.fn(
  (
    instance: CML.TransactionBody,
    proposalProcedures: CML.ProposalProcedureList,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_proposal_procedures(proposalProcedures),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setProposalProcedures failed with parameters: ${proposalProcedures} (ProposalProcedureList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setProposalProcedures without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetProposalProcedures(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetProposalProcedures failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetProposalProcedures = (
  instance: CML.TransactionBody,
  proposalProcedures: CML.ProposalProcedureList,
): void => Effect.runSync(setProposalProcedures(instance, proposalProcedures));

/**
 * Method proposalProcedures of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.proposalProcedures(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const proposalProcedures = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<
    CML.ProposalProcedureList | undefined,
    TransactionBodyError
  > =>
    Effect.try({
      try: () => instance.proposal_procedures(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.proposalProcedures failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.proposalProcedures without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeProposalProcedures(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeProposalProcedures failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeProposalProcedures = (
  instance: CML.TransactionBody,
): CML.ProposalProcedureList | undefined =>
  Effect.runSync(proposalProcedures(instance));

/**
 * Method setCurrentTreasuryValue of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setCurrentTreasuryValue(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setCurrentTreasuryValue = Effect.fn(
  (
    instance: CML.TransactionBody,
    currentTreasuryValue: bigint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_current_treasury_value(currentTreasuryValue),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setCurrentTreasuryValue failed with parameters: ${currentTreasuryValue}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setCurrentTreasuryValue without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetCurrentTreasuryValue(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetCurrentTreasuryValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCurrentTreasuryValue = (
  instance: CML.TransactionBody,
  currentTreasuryValue: bigint,
): void =>
  Effect.runSync(setCurrentTreasuryValue(instance, currentTreasuryValue));

/**
 * Method currentTreasuryValue of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.currentTreasuryValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const currentTreasuryValue = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.current_treasury_value(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.currentTreasuryValue failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.currentTreasuryValue without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeCurrentTreasuryValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeCurrentTreasuryValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCurrentTreasuryValue = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(currentTreasuryValue(instance));

/**
 * Method setDonation of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.setDonation(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDonation = Effect.fn(
  (
    instance: CML.TransactionBody,
    donation: bigint,
  ): Effect.Effect<void, TransactionBodyError> =>
    Effect.try({
      try: () => instance.set_donation(donation),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.setDonation failed with parameters: ${donation}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDonation without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeSetDonation(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeSetDonation failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDonation = (
  instance: CML.TransactionBody,
  donation: bigint,
): void => Effect.runSync(setDonation(instance, donation));

/**
 * Method donation of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *   const result = yield* TransactionBody.donation(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const donation = Effect.fn(
  (
    instance: CML.TransactionBody,
  ): Effect.Effect<bigint | undefined, TransactionBodyError> =>
    Effect.try({
      try: () => instance.donation(),
      catch: () =>
        new TransactionBodyError({
          message: `TransactionBody.donation failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.donation without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBody instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafeDonation(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafeDonation failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDonation = (
  instance: CML.TransactionBody,
): bigint | undefined => Effect.runSync(donation(instance));

/**
 * Static method _new of TransactionBody
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionBody._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint,
) {
  return yield* Effect.try({
    try: () => CML.TransactionBody.new(inputs, outputs, fee),
    catch: () =>
      new TransactionBodyError({
        message: `TransactionBody._new failed with parameters: ${inputs} (TransactionInputList), ${outputs} (TransactionOutputList), ${fee}. `,
      }),
  });
});

/**
 * Unsafely calls TransactionBody._new without Effect wrapper
 *
 * @example
 * import { TransactionBody } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBody.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBody.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  inputs: CML.TransactionInputList,
  outputs: CML.TransactionOutputList,
  fee: bigint,
) => Effect.runSync(_new(inputs, outputs, fee));
