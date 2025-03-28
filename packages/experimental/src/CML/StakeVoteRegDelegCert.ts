import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type StakeVoteRegDelegCert = CML.StakeVoteRegDelegCert;

export class StakeVoteRegDelegCertError extends Data.TaggedError("StakeVoteRegDelegCertError")<{
  message?: string;
}> {}

/**
 * Method free of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<void, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.StakeVoteRegDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.StakeVoteRegDelegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.StakeVoteRegDelegCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeVoteRegDelegCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_cbor_bytes(cborBytes),
    catch: () => new StakeVoteRegDelegCertError({
      message: `StakeVoteRegDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeVoteRegDelegCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_cbor_hex(cborBytes),
    catch: () => new StakeVoteRegDelegCertError({
      message: `StakeVoteRegDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJson failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<any, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJsValue failed StakeVoteRegDelegCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.StakeVoteRegDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeVoteRegDelegCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_json(json),
    catch: () => new StakeVoteRegDelegCertError({
      message: `StakeVoteRegDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromJson without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<CML.Credential, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeStakeCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (instance: CML.StakeVoteRegDelegCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.pool(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<CML.Ed25519KeyHash, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.pool failed `,
        }),
    })
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafePool(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafePool failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePool = (instance: CML.StakeVoteRegDelegCert): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Method dRep of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.dRep(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRep = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<CML.DRep, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.dRep failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeDRep(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeDRep failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDRep = (instance: CML.StakeVoteRegDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Method deposit of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert): Effect.Effect<bigint, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafeDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafeDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDeposit = (instance: CML.StakeVoteRegDelegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of StakeVoteRegDelegCert
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeVoteRegDelegCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.new(stakeCredential, pool, dRep, deposit),
    catch: () => new StakeVoteRegDelegCertError({
      message: `StakeVoteRegDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert._new without Effect wrapper
 * 
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, dRep: CML.DRep, deposit: bigint) =>
  Effect.runSync(_new(stakeCredential, pool, dRep, deposit));
