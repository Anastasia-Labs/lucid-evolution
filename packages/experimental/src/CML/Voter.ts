import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Voter = CML.Voter;

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
 *   const result = Voter.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Voter): void =>
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
 *   const result = Voter.unsafeKeyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeyHash = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
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
 *   const result = Voter.unsafeScriptHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeScriptHash = (instance: CML.Voter): CML.ScriptHash | undefined =>
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
 *   const result = Voter.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Voter): Uint8Array =>
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
 *   const result = Voter.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Voter): Uint8Array =>
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
 *   const result = Voter.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = Voter.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Voter): string =>
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
 *   const result = Voter.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Voter): string =>
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
 *   const result = Voter.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = Voter.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Voter): string =>
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
 *   const result = Voter.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Voter): any =>
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
 *   const result = Voter.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
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
 *   const result = Voter.unsafeNewConstitutionalCommitteeHotKeyHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeNewConstitutionalCommitteeHotKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewConstitutionalCommitteeHotKeyHash = (ed25519KeyHash: CML.Ed25519KeyHash) =>
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
 *   const result = Voter.unsafeNewConstitutionalCommitteeHotScriptHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeNewConstitutionalCommitteeHotScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewConstitutionalCommitteeHotScriptHash = (scriptHash: CML.ScriptHash) =>
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
 *   const result = Voter.unsafeNewDRepKeyHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeNewDRepKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewDRepKeyHash = (ed25519KeyHash: CML.Ed25519KeyHash) =>
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
 *   const result = Voter.unsafeNewDRepScriptHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeNewDRepScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewDRepScriptHash = (scriptHash: CML.ScriptHash) =>
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
 *   const result = Voter.unsafeNewStakingPoolKeyHash( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeNewStakingPoolKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewStakingPoolKeyHash = (ed25519KeyHash: CML.Ed25519KeyHash) =>
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
 *   const result = Voter.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.Voter): CML.VoterKind =>
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
 *   const result = Voter.unsafeAsConstitutionalCommitteeHotKeyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeAsConstitutionalCommitteeHotKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsConstitutionalCommitteeHotKeyHash = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
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
 *   const result = Voter.unsafeAsConstitutionalCommitteeHotScriptHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeAsConstitutionalCommitteeHotScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsConstitutionalCommitteeHotScriptHash = (instance: CML.Voter): CML.ScriptHash | undefined =>
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
 *   const result = Voter.unsafeAsDRepKeyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeAsDRepKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsDRepKeyHash = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
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
 *   const result = Voter.unsafeAsDRepScriptHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeAsDRepScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsDRepScriptHash = (instance: CML.Voter): CML.ScriptHash | undefined =>
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
 *   const result = Voter.unsafeAsStakingPoolKeyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Voter.unsafeAsStakingPoolKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsStakingPoolKeyHash = (instance: CML.Voter): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asStakingPoolKeyHash(instance));
