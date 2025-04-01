/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionWitnessSetBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionWitnessSetBuilder = CML.TransactionWitnessSetBuilder;

/**
 * Error class for TransactionWitnessSetBuilder operations
 *
 * This error is thrown when operations on TransactionWitnessSetBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionWitnessSetBuilderError extends Data.TaggedError(
  "TransactionWitnessSetBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionWitnessSetBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method addVkey of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addVkey: (
  instance: CML.TransactionWitnessSetBuilder,
  vkeyWitness: CML.Vkeywitness,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (instance: CML.TransactionWitnessSetBuilder, vkeyWitness: CML.Vkeywitness) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addVkeyUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  vkeyWitness: CML.Vkeywitness,
): void => Effect.runSync(addVkey(instance, vkeyWitness));

/**
 * Method addBootstrap of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addBootstrap: (
  instance: CML.TransactionWitnessSetBuilder,
  bootstrap: CML.BootstrapWitness,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    bootstrap: CML.BootstrapWitness,
  ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addBootstrapUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  bootstrap: CML.BootstrapWitness,
): void => Effect.runSync(addBootstrap(instance, bootstrap));

/**
 * Method addScript of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addScript: (
  instance: CML.TransactionWitnessSetBuilder,
  script: CML.Script,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (instance: CML.TransactionWitnessSetBuilder, script: CML.Script) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addScriptUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  script: CML.Script,
): void => Effect.runSync(addScript(instance, script));

/**
 * Method getNativeScript of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const getNativeScript: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.NativeScriptList, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getNativeScriptUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.NativeScriptList => Effect.runSync(getNativeScript(instance));

/**
 * Method getPlutusV1Script of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusV1Script: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusV1ScriptList, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getPlutusV1ScriptUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusV1ScriptList => Effect.runSync(getPlutusV1Script(instance));

/**
 * Method getPlutusV2Script of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusV2Script: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusV2ScriptList, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getPlutusV2ScriptUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusV2ScriptList => Effect.runSync(getPlutusV2Script(instance));

/**
 * Method addPlutusDatum of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusDatum: (
  instance: CML.TransactionWitnessSetBuilder,
  plutusDatum: CML.PlutusData,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (instance: CML.TransactionWitnessSetBuilder, plutusDatum: CML.PlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addPlutusDatumUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  plutusDatum: CML.PlutusData,
): void => Effect.runSync(addPlutusDatum(instance, plutusDatum));

/**
 * Method getPlutusDatum of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const getPlutusDatum: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.PlutusDataList, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getPlutusDatumUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.PlutusDataList => Effect.runSync(getPlutusDatum(instance));

/**
 * Method addRedeemer of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addRedeemer: (
  instance: CML.TransactionWitnessSetBuilder,
  redeemer: CML.LegacyRedeemer,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (instance: CML.TransactionWitnessSetBuilder, redeemer: CML.LegacyRedeemer) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addRedeemerUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  redeemer: CML.LegacyRedeemer,
): void => Effect.runSync(addRedeemer(instance, redeemer));

/**
 * Method getRedeemer of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const getRedeemer: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.LegacyRedeemerList, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getRedeemerUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.LegacyRedeemerList => Effect.runSync(getRedeemer(instance));

/**
 * Method addRequiredWits of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addRequiredWits: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    requiredWits: CML.RequiredWitnessSet,
  ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addRequiredWitsUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
): void => Effect.runSync(addRequiredWits(instance, requiredWits));

/**
 * Static method _new of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionWitnessSetBuilder,
  TransactionWitnessSetBuilderError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionWitnessSetBuilder =>
  Effect.runSync(_new());

/**
 * Method addExisting of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const addExisting: (
  instance: CML.TransactionWitnessSetBuilder,
  witSet: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    witSet: CML.TransactionWitnessSet,
  ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addExistingUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  witSet: CML.TransactionWitnessSet,
): void => Effect.runSync(addExisting(instance, witSet));

/**
 * Method build of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const build: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetBuilderError
> = Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.TransactionWitnessSet => Effect.runSync(build(instance));

/**
 * Method remainingWits of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const remainingWits: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<CML.RequiredWitnessSet, TransactionWitnessSetBuilderError> =
  Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const remainingWitsUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.RequiredWitnessSet => Effect.runSync(remainingWits(instance));

/**
 * Method tryBuild of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const tryBuild: (
  instance: CML.TransactionWitnessSetBuilder,
) => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetBuilderError
> = Effect.fn((instance: CML.TransactionWitnessSetBuilder) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const tryBuildUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
): CML.TransactionWitnessSet => Effect.runSync(tryBuild(instance));

/**
 * Method mergeFakeWitness of TransactionWitnessSetBuilder
 *
 * @since 2.0.0
 * @category Methods
 */
export const mergeFakeWitness: (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetBuilderError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSetBuilder,
    requiredWits: CML.RequiredWitnessSet,
  ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const mergeFakeWitnessUnsafe = (
  instance: CML.TransactionWitnessSetBuilder,
  requiredWits: CML.RequiredWitnessSet,
): void => Effect.runSync(mergeFakeWitness(instance, requiredWits));
