/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Voter class
 *
 * @since 2.0.0
 * @category Types
 */
export type Voter = CML.Voter;

/**
 * Error class for Voter operations
 * 
 * This error is thrown when operations on Voter instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoterError extends Data.TaggedError("VoterError")<{
  message?: string;
}> {}

/**
 * Method free of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Voter): Effect.Effect<void, VoterError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoterError({
          message: `Voter.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Voter): void =>
  Effect.runSync(free(instance));

/**
 * Method keyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.keyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.keyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.keyHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.keyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyHashUnsafe = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(keyHash(instance));

/**
 * Method scriptHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.scriptHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.ScriptHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.scriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.scriptHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.scriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptHashUnsafe = (instance: CML.Voter): CML.ScriptHash | undefined =>
  Effect.runSync(scriptHash(instance));

/**
 * Method toCborBytes of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Voter): Effect.Effect<Uint8Array, VoterError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VoterError({
          message: `Voter.toCborBytes failed Voter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Voter): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Voter): Effect.Effect<Uint8Array, VoterError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VoterError({
          message: `Voter.toCanonicalCborBytes failed Voter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Voter): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Voter.from_cbor_bytes(cborBytes),
    catch: () => new VoterError({
      message: `Voter.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Voter.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Voter): Effect.Effect<string, VoterError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VoterError({
          message: `Voter.toCborHex failed Voter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Voter): Effect.Effect<string, VoterError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VoterError({
          message: `Voter.toCanonicalCborHex failed Voter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Voter.from_cbor_hex(cborBytes),
    catch: () => new VoterError({
      message: `Voter.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Voter.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Voter): Effect.Effect<string, VoterError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VoterError({
          message: `Voter.toJson failed Voter is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Voter): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Voter): Effect.Effect<any, VoterError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VoterError({
          message: `Voter.toJsValue failed Voter is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Voter): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Voter.from_json(json),
    catch: () => new VoterError({
      message: `Voter.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Voter.fromJson without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newConstitutionalCommitteeHotKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.newConstitutionalCommitteeHotKeyHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newConstitutionalCommitteeHotKeyHash = Effect.fn(function* (ed25519KeyHash: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.Voter.new_constitutional_committee_hot_key_hash(ed25519KeyHash),
    catch: () => new VoterError({
      message: `Voter.newConstitutionalCommitteeHotKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls Voter.newConstitutionalCommitteeHotKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.newConstitutionalCommitteeHotKeyHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.newConstitutionalCommitteeHotKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstitutionalCommitteeHotKeyHashUnsafe = (ed25519KeyHash: CML.Ed25519KeyHash) =>
  Effect.runSync(newConstitutionalCommitteeHotKeyHash(ed25519KeyHash));

/**
 * Static method newConstitutionalCommitteeHotScriptHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.newConstitutionalCommitteeHotScriptHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newConstitutionalCommitteeHotScriptHash = Effect.fn(function* (scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.Voter.new_constitutional_committee_hot_script_hash(scriptHash),
    catch: () => new VoterError({
      message: `Voter.newConstitutionalCommitteeHotScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls Voter.newConstitutionalCommitteeHotScriptHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.newConstitutionalCommitteeHotScriptHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.newConstitutionalCommitteeHotScriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstitutionalCommitteeHotScriptHashUnsafe = (scriptHash: CML.ScriptHash) =>
  Effect.runSync(newConstitutionalCommitteeHotScriptHash(scriptHash));

/**
 * Static method newDRepKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.newDRepKeyHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newDRepKeyHash = Effect.fn(function* (ed25519KeyHash: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.Voter.new_d_rep_key_hash(ed25519KeyHash),
    catch: () => new VoterError({
      message: `Voter.newDRepKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls Voter.newDRepKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.newDRepKeyHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.newDRepKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDRepKeyHashUnsafe = (ed25519KeyHash: CML.Ed25519KeyHash) =>
  Effect.runSync(newDRepKeyHash(ed25519KeyHash));

/**
 * Static method newDRepScriptHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.newDRepScriptHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newDRepScriptHash = Effect.fn(function* (scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.Voter.new_d_rep_script_hash(scriptHash),
    catch: () => new VoterError({
      message: `Voter.newDRepScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls Voter.newDRepScriptHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.newDRepScriptHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.newDRepScriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newDRepScriptHashUnsafe = (scriptHash: CML.ScriptHash) =>
  Effect.runSync(newDRepScriptHash(scriptHash));

/**
 * Static method newStakingPoolKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Voter.newStakingPoolKeyHash( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newStakingPoolKeyHash = Effect.fn(function* (ed25519KeyHash: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.Voter.new_staking_pool_key_hash(ed25519KeyHash),
    catch: () => new VoterError({
      message: `Voter.newStakingPoolKeyHash failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls Voter.newStakingPoolKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.newStakingPoolKeyHashUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.newStakingPoolKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newStakingPoolKeyHashUnsafe = (ed25519KeyHash: CML.Ed25519KeyHash) =>
  Effect.runSync(newStakingPoolKeyHash(ed25519KeyHash));

/**
 * Method kind of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.VoterKind, VoterError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new VoterError({
          message: `Voter.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.kindUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Voter): CML.VoterKind =>
  Effect.runSync(kind(instance));

/**
 * Method asConstitutionalCommitteeHotKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.asConstitutionalCommitteeHotKeyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asConstitutionalCommitteeHotKeyHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.as_constitutional_committee_hot_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asConstitutionalCommitteeHotKeyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asConstitutionalCommitteeHotKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.asConstitutionalCommitteeHotKeyHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.asConstitutionalCommitteeHotKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstitutionalCommitteeHotKeyHashUnsafe = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asConstitutionalCommitteeHotKeyHash(instance));

/**
 * Method asConstitutionalCommitteeHotScriptHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.asConstitutionalCommitteeHotScriptHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asConstitutionalCommitteeHotScriptHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.ScriptHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.as_constitutional_committee_hot_script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asConstitutionalCommitteeHotScriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asConstitutionalCommitteeHotScriptHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.asConstitutionalCommitteeHotScriptHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.asConstitutionalCommitteeHotScriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstitutionalCommitteeHotScriptHashUnsafe = (instance: CML.Voter): CML.ScriptHash | undefined =>
  Effect.runSync(asConstitutionalCommitteeHotScriptHash(instance));

/**
 * Method asDRepKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.asDRepKeyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asDRepKeyHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.as_d_rep_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asDRepKeyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asDRepKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.asDRepKeyHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.asDRepKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDRepKeyHashUnsafe = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asDRepKeyHash(instance));

/**
 * Method asDRepScriptHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.asDRepScriptHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asDRepScriptHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.ScriptHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.as_d_rep_script_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asDRepScriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asDRepScriptHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.asDRepScriptHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.asDRepScriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asDRepScriptHashUnsafe = (instance: CML.Voter): CML.ScriptHash | undefined =>
  Effect.runSync(asDRepScriptHash(instance));

/**
 * Method asStakingPoolKeyHash of Voter
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Voter instance
 * const instance = ... ;
 *   const result = yield* Voter.asStakingPoolKeyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asStakingPoolKeyHash = Effect.fn(
  (instance: CML.Voter): Effect.Effect<CML.Ed25519KeyHash | undefined, VoterError> =>
    Effect.try({
      try: () => instance.as_staking_pool_key_hash(),
      catch: () =>
        new VoterError({
          message: `Voter.asStakingPoolKeyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asStakingPoolKeyHash without Effect wrapper
 * 
 * @example
 * import { Voter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Voter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Voter.asStakingPoolKeyHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.asStakingPoolKeyHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asStakingPoolKeyHashUnsafe = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asStakingPoolKeyHash(instance));
