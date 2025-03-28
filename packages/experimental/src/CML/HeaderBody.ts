import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type HeaderBody = CML.HeaderBody;

export class HeaderBodyError extends Data.TaggedError("HeaderBodyError")<{
  message?: string;
}> {}

/**
 * Method free of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<void, HeaderBodyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.HeaderBody): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<Uint8Array, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCborBytes failed HeaderBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.HeaderBody): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<Uint8Array, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCanonicalCborBytes failed HeaderBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.HeaderBody): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HeaderBody.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_cbor_bytes(cborBytes),
    catch: () => new HeaderBodyError({
      message: `HeaderBody.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls HeaderBody.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<string, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCborHex failed HeaderBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.HeaderBody): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<string, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCanonicalCborHex failed HeaderBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.HeaderBody): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HeaderBody.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_cbor_hex(cborBytes),
    catch: () => new HeaderBodyError({
      message: `HeaderBody.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls HeaderBody.fromCborHex without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<string, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toJson failed HeaderBody is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.HeaderBody): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<any, HeaderBodyError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toJsValue failed HeaderBody is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.HeaderBody): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HeaderBody.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_json(json),
    catch: () => new HeaderBodyError({
      message: `HeaderBody.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls HeaderBody.fromJson without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method blockNumber of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.blockNumber(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const blockNumber = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<bigint, HeaderBodyError> =>
    Effect.try({
      try: () => instance.block_number(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockNumber failed `,
        }),
    })
);

/**
 * Unsafely calls instance.blockNumber without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeBlockNumber(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeBlockNumber failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBlockNumber = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(blockNumber(instance));

/**
 * Method slot of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.slot(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const slot = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<bigint, HeaderBodyError> =>
    Effect.try({
      try: () => instance.slot(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.slot failed `,
        }),
    })
);

/**
 * Unsafely calls instance.slot without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeSlot(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeSlot failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSlot = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(slot(instance));

/**
 * Method prevHash of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.prevHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const prevHash = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.BlockHeaderHash | undefined, HeaderBodyError> =>
    Effect.try({
      try: () => instance.prev_hash(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.prevHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.prevHash without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafePrevHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafePrevHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePrevHash = (instance: CML.HeaderBody): CML.BlockHeaderHash | undefined =>
  Effect.runSync(prevHash(instance));

/**
 * Method issuerVkey of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.issuerVkey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const issuerVkey = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.PublicKey, HeaderBodyError> =>
    Effect.try({
      try: () => instance.issuer_vkey(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.issuerVkey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.issuerVkey without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeIssuerVkey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeIssuerVkey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIssuerVkey = (instance: CML.HeaderBody): CML.PublicKey =>
  Effect.runSync(issuerVkey(instance));

/**
 * Method vrfVkey of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.vrfVkey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const vrfVkey = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.VRFVkey, HeaderBodyError> =>
    Effect.try({
      try: () => instance.vrf_vkey(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.vrfVkey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.vrfVkey without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeVrfVkey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeVrfVkey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVrfVkey = (instance: CML.HeaderBody): CML.VRFVkey =>
  Effect.runSync(vrfVkey(instance));

/**
 * Method vrfResult of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.vrfResult(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const vrfResult = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.VRFCert, HeaderBodyError> =>
    Effect.try({
      try: () => instance.vrf_result(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.vrfResult failed `,
        }),
    })
);

/**
 * Unsafely calls instance.vrfResult without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeVrfResult(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeVrfResult failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVrfResult = (instance: CML.HeaderBody): CML.VRFCert =>
  Effect.runSync(vrfResult(instance));

/**
 * Method blockBodySize of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.blockBodySize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const blockBodySize = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<bigint, HeaderBodyError> =>
    Effect.try({
      try: () => instance.block_body_size(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockBodySize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.blockBodySize without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeBlockBodySize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeBlockBodySize failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBlockBodySize = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(blockBodySize(instance));

/**
 * Method blockBodyHash of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.blockBodyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const blockBodyHash = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.BlockBodyHash, HeaderBodyError> =>
    Effect.try({
      try: () => instance.block_body_hash(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockBodyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.blockBodyHash without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeBlockBodyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeBlockBodyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBlockBodyHash = (instance: CML.HeaderBody): CML.BlockBodyHash =>
  Effect.runSync(blockBodyHash(instance));

/**
 * Method operationalCert of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.operationalCert(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const operationalCert = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.OperationalCert, HeaderBodyError> =>
    Effect.try({
      try: () => instance.operational_cert(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.operationalCert failed `,
        }),
    })
);

/**
 * Unsafely calls instance.operationalCert without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeOperationalCert(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeOperationalCert failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOperationalCert = (instance: CML.HeaderBody): CML.OperationalCert =>
  Effect.runSync(operationalCert(instance));

/**
 * Method protocolVersion of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 *   const result = yield* HeaderBody.protocolVersion(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const protocolVersion = Effect.fn(
  (instance: CML.HeaderBody): Effect.Effect<CML.ProtocolVersion, HeaderBodyError> =>
    Effect.try({
      try: () => instance.protocol_version(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.protocolVersion failed `,
        }),
    })
);

/**
 * Unsafely calls instance.protocolVersion without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HeaderBody instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafeProtocolVersion(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafeProtocolVersion failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeProtocolVersion = (instance: CML.HeaderBody): CML.ProtocolVersion =>
  Effect.runSync(protocolVersion(instance));

/**
 * Static method _new of HeaderBody
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HeaderBody._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (blockNumber: bigint, slot: bigint, prevHash: CML.BlockHeaderHash | undefined, issuerVkey: CML.PublicKey, vrfVkey: CML.VRFVkey, vrfResult: CML.VRFCert, blockBodySize: bigint, blockBodyHash: CML.BlockBodyHash, operationalCert: CML.OperationalCert, protocolVersion: CML.ProtocolVersion) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.new(blockNumber, slot, prevHash, issuerVkey, vrfVkey, vrfResult, blockBodySize, blockBodyHash, operationalCert, protocolVersion),
    catch: () => new HeaderBodyError({
      message: `HeaderBody._new failed with parameters: ${blockNumber}, ${slot}, ${prevHash}, ${issuerVkey} (PublicKey), ${vrfVkey} (VRFVkey), ${vrfResult} (VRFCert), ${blockBodySize}, ${blockBodyHash} (BlockBodyHash), ${operationalCert} (OperationalCert), ${protocolVersion} (ProtocolVersion). `,
    }),
  });
});

/**
 * Unsafely calls HeaderBody._new without Effect wrapper
 * 
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HeaderBody.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HeaderBody.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (blockNumber: bigint, slot: bigint, prevHash: CML.BlockHeaderHash | undefined, issuerVkey: CML.PublicKey, vrfVkey: CML.VRFVkey, vrfResult: CML.VRFCert, blockBodySize: bigint, blockBodyHash: CML.BlockBodyHash, operationalCert: CML.OperationalCert, protocolVersion: CML.ProtocolVersion) =>
  Effect.runSync(_new(blockNumber, slot, prevHash, issuerVkey, vrfVkey, vrfResult, blockBodySize, blockBodyHash, operationalCert, protocolVersion));
