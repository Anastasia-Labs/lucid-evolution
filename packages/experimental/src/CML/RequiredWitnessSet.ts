import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RequiredWitnessSet = CML.RequiredWitnessSet;

export class RequiredWitnessSetError extends Data.TaggedError("RequiredWitnessSetError")<{
  message?: string;
}> {}

/**
 * Method free of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RequiredWitnessSet): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RequiredWitnessSet): void =>
  Effect.runSync(free(instance));

/**
 * Method addVkeyKeyHash of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addVkeyKeyHash(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addVkeyKeyHash = Effect.fn(
  (instance: CML.RequiredWitnessSet, hash: CML.Ed25519KeyHash): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_vkey_key_hash(hash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addVkeyKeyHash failed with parameters: ${hash} (Ed25519KeyHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addVkeyKeyHash without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddVkeyKeyHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddVkeyKeyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddVkeyKeyHash = (instance: CML.RequiredWitnessSet, hash: CML.Ed25519KeyHash): void =>
  Effect.runSync(addVkeyKeyHash(instance, hash));

/**
 * Method addBootstrap of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addBootstrap(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap = Effect.fn(
  (instance: CML.RequiredWitnessSet, address: CML.ByronAddress): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_bootstrap(address),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addBootstrap failed with parameters: ${address} (ByronAddress). Hint: Not all RequiredWitnessSet instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.addBootstrap without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddBootstrap(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddBootstrap failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddBootstrap = (instance: CML.RequiredWitnessSet, address: CML.ByronAddress): void =>
  Effect.runSync(addBootstrap(instance, address));

/**
 * Method addScriptRef of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addScriptRef(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addScriptRef = Effect.fn(
  (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_script_ref(scriptHash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addScriptRef failed with parameters: ${scriptHash} (ScriptHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addScriptRef without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddScriptRef(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddScriptRef failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddScriptRef = (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash): void =>
  Effect.runSync(addScriptRef(instance, scriptHash));

/**
 * Method addScriptHash of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addScriptHash(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addScriptHash = Effect.fn(
  (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_script_hash(scriptHash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addScriptHash without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddScriptHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddScriptHash = (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash): void =>
  Effect.runSync(addScriptHash(instance, scriptHash));

/**
 * Method addPlutusDatumHash of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addPlutusDatumHash(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusDatumHash = Effect.fn(
  (instance: CML.RequiredWitnessSet, plutusDatum: CML.DatumHash): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_plutus_datum_hash(plutusDatum),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addPlutusDatumHash failed with parameters: ${plutusDatum} (DatumHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.addPlutusDatumHash without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddPlutusDatumHash(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddPlutusDatumHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddPlutusDatumHash = (instance: CML.RequiredWitnessSet, plutusDatum: CML.DatumHash): void =>
  Effect.runSync(addPlutusDatumHash(instance, plutusDatum));

/**
 * Method addRedeemerTag of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addRedeemerTag(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addRedeemerTag = Effect.fn(
  (instance: CML.RequiredWitnessSet, redeemer: CML.RedeemerWitnessKey): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_redeemer_tag(redeemer),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addRedeemerTag failed with parameters: ${redeemer} (RedeemerWitnessKey). `,
        }),
    })
);

/**
 * Unsafely calls instance.addRedeemerTag without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddRedeemerTag(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddRedeemerTag failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddRedeemerTag = (instance: CML.RequiredWitnessSet, redeemer: CML.RedeemerWitnessKey): void =>
  Effect.runSync(addRedeemerTag(instance, redeemer));

/**
 * Method addAll of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.addAll(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addAll = Effect.fn(
  (instance: CML.RequiredWitnessSet, requirements: CML.RequiredWitnessSet): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.add_all(requirements),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addAll failed with parameters: ${requirements} (RequiredWitnessSet). `,
        }),
    })
);

/**
 * Unsafely calls instance.addAll without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeAddAll(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeAddAll failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddAll = (instance: CML.RequiredWitnessSet, requirements: CML.RequiredWitnessSet): void =>
  Effect.runSync(addAll(instance, requirements));

/**
 * Static method _new of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RequiredWitnessSet._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RequiredWitnessSet.new(),
    catch: () => new RequiredWitnessSetError({
      message: `RequiredWitnessSet._new failed `,
    }),
  });
});

/**
 * Unsafely calls RequiredWitnessSet._new without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method withdrawalRequiredWits of RequiredWitnessSet
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 *   const result = yield* RequiredWitnessSet.withdrawalRequiredWits(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withdrawalRequiredWits = Effect.fn(
  (instance: CML.RequiredWitnessSet, address: CML.RewardAddress): Effect.Effect<void, RequiredWitnessSetError> =>
    Effect.try({
      try: () => instance.withdrawal_required_wits(address),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.withdrawalRequiredWits failed with parameters: ${address} (RewardAddress). `,
        }),
    })
);

/**
 * Unsafely calls instance.withdrawalRequiredWits without Effect wrapper
 * 
 * @example
 * import { RequiredWitnessSet } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RequiredWitnessSet instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RequiredWitnessSet.unsafeWithdrawalRequiredWits(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RequiredWitnessSet.unsafeWithdrawalRequiredWits failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithdrawalRequiredWits = (instance: CML.RequiredWitnessSet, address: CML.RewardAddress): void =>
  Effect.runSync(withdrawalRequiredWits(instance, address));
