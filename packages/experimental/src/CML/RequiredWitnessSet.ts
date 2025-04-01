/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RequiredWitnessSet class
 *
 * @since 2.0.0
 * @category Types
 */
export type RequiredWitnessSet = CML.RequiredWitnessSet;

/**
 * Error class for RequiredWitnessSet operations
 *
 * This error is thrown when operations on RequiredWitnessSet instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RequiredWitnessSetError extends Data.TaggedError(
  "RequiredWitnessSetError",
)<{
  message?: string;
}> {}

/**
 * Method free of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RequiredWitnessSet,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RequiredWitnessSet): void =>
  Effect.runSync(free(instance));

/**
 * Method addVkeyKeyHash of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVkeyKeyHash: (
  instance: CML.RequiredWitnessSet,
  hash: CML.Ed25519KeyHash,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, hash: CML.Ed25519KeyHash) =>
    Effect.try({
      try: () => instance.add_vkey_key_hash(hash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addVkeyKeyHash failed with parameters: ${hash} (Ed25519KeyHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addVkeyKeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addVkeyKeyHashUnsafe = (
  instance: CML.RequiredWitnessSet,
  hash: CML.Ed25519KeyHash,
): void => Effect.runSync(addVkeyKeyHash(instance, hash));

/**
 * Method addBootstrap of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap: (
  instance: CML.RequiredWitnessSet,
  address: CML.ByronAddress,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, address: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.add_bootstrap(address),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addBootstrap failed with parameters: ${address} (ByronAddress). Hint: Not all RequiredWitnessSet instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.addBootstrap without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addBootstrapUnsafe = (
  instance: CML.RequiredWitnessSet,
  address: CML.ByronAddress,
): void => Effect.runSync(addBootstrap(instance, address));

/**
 * Method addScriptRef of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addScriptRef: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.add_script_ref(scriptHash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addScriptRef failed with parameters: ${scriptHash} (ScriptHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addScriptRef without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addScriptRefUnsafe = (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
): void => Effect.runSync(addScriptRef(instance, scriptHash));

/**
 * Method addScriptHash of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addScriptHash: (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, scriptHash: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.add_script_hash(scriptHash),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addScriptHash failed with parameters: ${scriptHash} (ScriptHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addScriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addScriptHashUnsafe = (
  instance: CML.RequiredWitnessSet,
  scriptHash: CML.ScriptHash,
): void => Effect.runSync(addScriptHash(instance, scriptHash));

/**
 * Method addPlutusDatumHash of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusDatumHash: (
  instance: CML.RequiredWitnessSet,
  plutusDatum: CML.DatumHash,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, plutusDatum: CML.DatumHash) =>
    Effect.try({
      try: () => instance.add_plutus_datum_hash(plutusDatum),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addPlutusDatumHash failed with parameters: ${plutusDatum} (DatumHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addPlutusDatumHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addPlutusDatumHashUnsafe = (
  instance: CML.RequiredWitnessSet,
  plutusDatum: CML.DatumHash,
): void => Effect.runSync(addPlutusDatumHash(instance, plutusDatum));

/**
 * Method addRedeemerTag of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addRedeemerTag: (
  instance: CML.RequiredWitnessSet,
  redeemer: CML.RedeemerWitnessKey,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, redeemer: CML.RedeemerWitnessKey) =>
    Effect.try({
      try: () => instance.add_redeemer_tag(redeemer),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addRedeemerTag failed with parameters: ${redeemer} (RedeemerWitnessKey). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addRedeemerTag without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addRedeemerTagUnsafe = (
  instance: CML.RequiredWitnessSet,
  redeemer: CML.RedeemerWitnessKey,
): void => Effect.runSync(addRedeemerTag(instance, redeemer));

/**
 * Method addAll of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addAll: (
  instance: CML.RequiredWitnessSet,
  requirements: CML.RequiredWitnessSet,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, requirements: CML.RequiredWitnessSet) =>
    Effect.try({
      try: () => instance.add_all(requirements),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.addAll failed with parameters: ${requirements} (RequiredWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addAll without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addAllUnsafe = (
  instance: CML.RequiredWitnessSet,
  requirements: CML.RequiredWitnessSet,
): void => Effect.runSync(addAll(instance, requirements));

/**
 * Static method _new of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.RequiredWitnessSet,
  RequiredWitnessSetError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RequiredWitnessSet.new(),
    catch: () =>
      new RequiredWitnessSetError({
        message: `RequiredWitnessSet._new failed `,
      }),
  });
});

/**
 * Unsafely calls RequiredWitnessSet._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.RequiredWitnessSet => Effect.runSync(_new());

/**
 * Method withdrawalRequiredWits of RequiredWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const withdrawalRequiredWits: (
  instance: CML.RequiredWitnessSet,
  address: CML.RewardAddress,
) => Effect.Effect<void, RequiredWitnessSetError> = Effect.fn(
  (instance: CML.RequiredWitnessSet, address: CML.RewardAddress) =>
    Effect.try({
      try: () => instance.withdrawal_required_wits(address),
      catch: () =>
        new RequiredWitnessSetError({
          message: `RequiredWitnessSet.withdrawalRequiredWits failed with parameters: ${address} (RewardAddress). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withdrawalRequiredWits without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withdrawalRequiredWitsUnsafe = (
  instance: CML.RequiredWitnessSet,
  address: CML.RewardAddress,
): void => Effect.runSync(withdrawalRequiredWits(instance, address));
