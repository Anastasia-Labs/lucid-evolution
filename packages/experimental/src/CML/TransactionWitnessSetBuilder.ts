import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionWitnessSetBuilder = CML.TransactionWitnessSetBuilder;

export class TransactionWitnessSetBuilderError extends Data.TaggedError(
  "TransactionWitnessSetBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionWitnessSetBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method addVkey of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addVkey(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVkey = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    vkeyWitness: CML.Vkeywitness,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_vkey(vkeyWitness),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addVkey failed with parameters: ${vkeyWitness} (Vkeywitness). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addVkey without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddVkey(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddVkey failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddVkey = (
  instance: CML.TransactionWitnessSetBuilder,
  vkeyWitness: CML.Vkeywitness,
): void => Effect.runSync(addVkey(instance, vkeyWitness));

/**
 * Method addBootstrap of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addBootstrap(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    bootstrap: CML.BootstrapWitness,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_bootstrap(bootstrap),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addBootstrap failed with parameters: ${bootstrap} (BootstrapWitness). Hint: Not all TransactionWitnessSetBuilder instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.addBootstrap without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddBootstrap(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddBootstrap failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddBootstrap = (
  instance: CML.TransactionWitnessSetBuilder,
  bootstrap: CML.BootstrapWitness,
): void => Effect.runSync(addBootstrap(instance, bootstrap));

/**
 * Method addScript of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addScript(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addScript = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    script: CML.Script,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_script(script),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addScript failed with parameters: ${script} (Script). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addScript without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddScript(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddScript = (
  instance: CML.TransactionWitnessSetBuilder,
  script: CML.Script,
): void => Effect.runSync(addScript(instance, script));

/**
 * Method getNativeScript of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.getNativeScript(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getNativeScript = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.NativeScriptList, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.get_native_script(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.getNativeScript failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getNativeScript without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeGetNativeScript(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeGetNativeScript failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetNativeScript = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.NativeScriptList => Effect.runSync(getNativeScript(instance));

/**
 * Method getPlutusV1Script of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.getPlutusV1Script(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusV1Script = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.PlutusV1ScriptList, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.get_plutus_v1_script(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.getPlutusV1Script failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getPlutusV1Script without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeGetPlutusV1Script(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeGetPlutusV1Script failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetPlutusV1Script = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusV1ScriptList => Effect.runSync(getPlutusV1Script(instance));

/**
 * Method getPlutusV2Script of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.getPlutusV2Script(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusV2Script = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.PlutusV2ScriptList, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.get_plutus_v2_script(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.getPlutusV2Script failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getPlutusV2Script without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeGetPlutusV2Script(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeGetPlutusV2Script failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetPlutusV2Script = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusV2ScriptList => Effect.runSync(getPlutusV2Script(instance));

/**
 * Method addPlutusDatum of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addPlutusDatum(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusDatum = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    plutusDatum: CML.PlutusData,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_plutus_datum(plutusDatum),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addPlutusDatum failed with parameters: ${plutusDatum} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addPlutusDatum without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddPlutusDatum(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddPlutusDatum failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddPlutusDatum = (
  instance: CML.TransactionWitnessSetBuilder,
  plutusDatum: CML.PlutusData,
): void => Effect.runSync(addPlutusDatum(instance, plutusDatum));

/**
 * Method getPlutusDatum of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.getPlutusDatum(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusDatum = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.PlutusDataList, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.get_plutus_datum(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.getPlutusDatum failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getPlutusDatum without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeGetPlutusDatum(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeGetPlutusDatum failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetPlutusDatum = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusDataList => Effect.runSync(getPlutusDatum(instance));

/**
 * Method addRedeemer of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addRedeemer(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addRedeemer = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    redeemer: CML.LegacyRedeemer,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_redeemer(redeemer),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addRedeemer failed with parameters: ${redeemer} (LegacyRedeemer). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addRedeemer without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddRedeemer(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddRedeemer failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddRedeemer = (
  instance: CML.TransactionWitnessSetBuilder,
  redeemer: CML.LegacyRedeemer,
): void => Effect.runSync(addRedeemer(instance, redeemer));

/**
 * Method getRedeemer of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.getRedeemer(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getRedeemer = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.LegacyRedeemerList, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.get_redeemer(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.getRedeemer failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.getRedeemer without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeGetRedeemer(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeGetRedeemer failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetRedeemer = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.LegacyRedeemerList => Effect.runSync(getRedeemer(instance));

/**
 * Method addRequiredWits of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addRequiredWits(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addRequiredWits = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    requiredWits: CML.RequiredWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_required_wits(requiredWits),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addRequiredWits failed with parameters: ${requiredWits} (RequiredWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addRequiredWits without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddRequiredWits(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddRequiredWits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddRequiredWits = (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
): void => Effect.runSync(addRequiredWits(instance, requiredWits));

/**
 * Static method _new of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSetBuilder._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSetBuilder.new(),
    catch: () =>
      new TransactionWitnessSetBuilderError({
        message: `TransactionWitnessSetBuilder._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSetBuilder._new without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method addExisting of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.addExisting(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addExisting = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    witSet: CML.TransactionWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.add_existing(witSet),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.addExisting failed with parameters: ${witSet} (TransactionWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addExisting without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeAddExisting(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeAddExisting failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddExisting = (
  instance: CML.TransactionWitnessSetBuilder,
  witSet: CML.TransactionWitnessSet,
): void => Effect.runSync(addExisting(instance, witSet));

/**
 * Method build of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.build(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<
    CML.TransactionWitnessSet,
    TransactionWitnessSetBuilderError
  > =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.build failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.build without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeBuild(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeBuild failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBuild = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.TransactionWitnessSet => Effect.runSync(build(instance));

/**
 * Method remainingWits of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.remainingWits(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const remainingWits = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<CML.RequiredWitnessSet, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.remaining_wits(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.remainingWits failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.remainingWits without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeRemainingWits(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeRemainingWits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRemainingWits = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.RequiredWitnessSet => Effect.runSync(remainingWits(instance));

/**
 * Method tryBuild of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.tryBuild(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const tryBuild = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
  ): Effect.Effect<
    CML.TransactionWitnessSet,
    TransactionWitnessSetBuilderError
  > =>
    Effect.try({
      try: () => instance.try_build(),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.tryBuild failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.tryBuild without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeTryBuild(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeTryBuild failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTryBuild = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.TransactionWitnessSet => Effect.runSync(tryBuild(instance));

/**
 * Method mergeFakeWitness of TransactionWitnessSetBuilder
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetBuilder.mergeFakeWitness(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const mergeFakeWitness = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    requiredWits: CML.RequiredWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetBuilderError> =>
    Effect.try({
      try: () => instance.merge_fake_witness(requiredWits),
      catch: () =>
        new TransactionWitnessSetBuilderError({
          message: `TransactionWitnessSetBuilder.mergeFakeWitness failed with parameters: ${requiredWits} (RequiredWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.mergeFakeWitness without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetBuilder.unsafeMergeFakeWitness(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetBuilder.unsafeMergeFakeWitness failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMergeFakeWitness = (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
): void => Effect.runSync(mergeFakeWitness(instance, requiredWits));
