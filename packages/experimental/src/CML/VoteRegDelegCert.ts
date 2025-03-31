/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoteRegDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type VoteRegDelegCert = CML.VoteRegDelegCert;

/**
 * Error class for VoteRegDelegCert operations
 * 
 * This error is thrown when operations on VoteRegDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoteRegDelegCertError extends Data.TaggedError("VoteRegDelegCertError")<{
  message?: string;
}> {}

/**
 * Method free of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<void, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VoteRegDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<Uint8Array, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toCborBytes failed VoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.VoteRegDelegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<Uint8Array, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toCanonicalCborBytes failed VoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.VoteRegDelegCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VoteRegDelegCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VoteRegDelegCert.from_cbor_bytes(cborBytes),
    catch: () => new VoteRegDelegCertError({
      message: `VoteRegDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls VoteRegDelegCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<string, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toCborHex failed VoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.VoteRegDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<string, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toCanonicalCborHex failed VoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.VoteRegDelegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VoteRegDelegCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.VoteRegDelegCert.from_cbor_hex(cborBytes),
    catch: () => new VoteRegDelegCertError({
      message: `VoteRegDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls VoteRegDelegCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<string, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toJson failed VoteRegDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.VoteRegDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<any, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.toJsValue failed VoteRegDelegCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.VoteRegDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VoteRegDelegCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.VoteRegDelegCert.from_json(json),
    catch: () => new VoteRegDelegCertError({
      message: `VoteRegDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls VoteRegDelegCert.fromJson without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<CML.Credential, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.stakeCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.stakeCredentialUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.VoteRegDelegCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method dRep of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.dRep(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRep = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<CML.DRep, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.dRep failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.dRepUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.dRepUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepUnsafe = (instance: CML.VoteRegDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Method deposit of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* VoteRegDelegCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.VoteRegDelegCert): Effect.Effect<bigint, VoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new VoteRegDelegCertError({
          message: `VoteRegDelegCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteRegDelegCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert.depositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert.depositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.VoteRegDelegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of VoteRegDelegCert
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VoteRegDelegCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential, dRep: CML.DRep, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.VoteRegDelegCert.new(stakeCredential, dRep, deposit),
    catch: () => new VoteRegDelegCertError({
      message: `VoteRegDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${dRep} (DRep), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls VoteRegDelegCert._new without Effect wrapper
 * 
 * @example
 * import { VoteRegDelegCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteRegDelegCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteRegDelegCert._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, dRep: CML.DRep, deposit: bigint) =>
  Effect.runSync(_new(stakeCredential, dRep, deposit));
