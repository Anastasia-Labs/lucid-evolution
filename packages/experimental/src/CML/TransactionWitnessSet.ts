/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionWitnessSet class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionWitnessSet = CML.TransactionWitnessSet;

/**
 * Error class for TransactionWitnessSet operations
 *
 * This error is thrown when operations on TransactionWitnessSet instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionWitnessSetError extends Data.TaggedError(
  "TransactionWitnessSetError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionWitnessSet): void =>
  Effect.runSync(free(instance));

/**
 * Method addAllWitnesses of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const addAllWitnesses: (
  instance: CML.TransactionWitnessSet,
  other: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet, other: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.add_all_witnesses(other),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.addAllWitnesses failed with parameters: ${other} (TransactionWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addAllWitnesses without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addAllWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  other: CML.TransactionWitnessSet,
): void => Effect.runSync(addAllWitnesses(instance, other));

/**
 * Method languages of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const languages: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.LanguageList, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.languages(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.languages failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.languages without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const languagesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.LanguageList => Effect.runSync(languages(instance));

/**
 * Method toCborBytes of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<Uint8Array, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCborBytes failed TransactionWitnessSet is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionWitnessSet,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<Uint8Array, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCanonicalCborBytes failed TransactionWitnessSet is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.TransactionWitnessSet,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionWitnessSet.from_cbor_bytes(cborBytes),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionWitnessSet.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.TransactionWitnessSet => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCborHex failed TransactionWitnessSet is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionWitnessSet): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCanonicalCborHex failed TransactionWitnessSet is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.TransactionWitnessSet,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.TransactionWitnessSet.from_cbor_hex(cborBytes),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionWitnessSet.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.TransactionWitnessSet => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<string, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toJson failed TransactionWitnessSet is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionWitnessSet): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<any, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toJsValue failed TransactionWitnessSet is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionWitnessSet): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.TransactionWitnessSet.from_json(json),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls TransactionWitnessSet.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TransactionWitnessSet =>
  Effect.runSync(fromJson(json));

/**
 * Method setVkeywitnesses of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setVkeywitnesses: (
  instance: CML.TransactionWitnessSet,
  vkeywitnesses: CML.VkeywitnessList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet, vkeywitnesses: CML.VkeywitnessList) =>
    Effect.try({
      try: () => instance.set_vkeywitnesses(vkeywitnesses),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setVkeywitnesses failed with parameters: ${vkeywitnesses} (VkeywitnessList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setVkeywitnesses without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setVkeywitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  vkeywitnesses: CML.VkeywitnessList,
): void => Effect.runSync(setVkeywitnesses(instance, vkeywitnesses));

/**
 * Method vkeywitnesses of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const vkeywitnesses: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.VkeywitnessList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.vkeywitnesses(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.vkeywitnesses failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.vkeywitnesses without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vkeywitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.VkeywitnessList | undefined => Effect.runSync(vkeywitnesses(instance));

/**
 * Method setNativeScripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setNativeScripts: (
  instance: CML.TransactionWitnessSet,
  nativeScripts: CML.NativeScriptList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet, nativeScripts: CML.NativeScriptList) =>
    Effect.try({
      try: () => instance.set_native_scripts(nativeScripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setNativeScripts failed with parameters: ${nativeScripts} (NativeScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setNativeScripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNativeScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  nativeScripts: CML.NativeScriptList,
): void => Effect.runSync(setNativeScripts(instance, nativeScripts));

/**
 * Method nativeScripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.NativeScriptList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.native_scripts(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.nativeScripts failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.NativeScriptList | undefined => Effect.runSync(nativeScripts(instance));

/**
 * Method setBootstrapWitnesses of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setBootstrapWitnesses: (
  instance: CML.TransactionWitnessSet,
  bootstrapWitnesses: CML.BootstrapWitnessList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    bootstrapWitnesses: CML.BootstrapWitnessList,
  ) =>
    Effect.try({
      try: () => instance.set_bootstrap_witnesses(bootstrapWitnesses),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setBootstrapWitnesses failed with parameters: ${bootstrapWitnesses} (BootstrapWitnessList). Hint: Not all TransactionWitnessSet instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.setBootstrapWitnesses without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setBootstrapWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  bootstrapWitnesses: CML.BootstrapWitnessList,
): void => Effect.runSync(setBootstrapWitnesses(instance, bootstrapWitnesses));

/**
 * Method bootstrapWitnesses of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const bootstrapWitnesses: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.BootstrapWitnessList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.bootstrap_witnesses(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.bootstrapWitnesses failed Hint: Not all TransactionWitnessSet instances can be stringified.`,
      }),
  }),
);

/**
 * Unsafely calls instance.bootstrapWitnesses without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bootstrapWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.BootstrapWitnessList | undefined =>
  Effect.runSync(bootstrapWitnesses(instance));

/**
 * Method setPlutusV1Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV1Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV1Scripts: CML.PlutusV1ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV1Scripts: CML.PlutusV1ScriptList,
  ) =>
    Effect.try({
      try: () => instance.set_plutus_v1_scripts(plutusV1Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV1Scripts failed with parameters: ${plutusV1Scripts} (PlutusV1ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV1Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV1ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV1Scripts: CML.PlutusV1ScriptList,
): void => Effect.runSync(setPlutusV1Scripts(instance, plutusV1Scripts));

/**
 * Method plutusV1Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV1Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV1ScriptList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.plutus_v1_scripts(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.plutusV1Scripts failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.plutusV1Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV1ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV1ScriptList | undefined =>
  Effect.runSync(plutusV1Scripts(instance));

/**
 * Method setPlutusDatums of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusDatums: (
  instance: CML.TransactionWitnessSet,
  plutusDatums: CML.PlutusDataList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet, plutusDatums: CML.PlutusDataList) =>
    Effect.try({
      try: () => instance.set_plutus_datums(plutusDatums),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusDatums failed with parameters: ${plutusDatums} (PlutusDataList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusDatums without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusDatumsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusDatums: CML.PlutusDataList,
): void => Effect.runSync(setPlutusDatums(instance, plutusDatums));

/**
 * Method plutusDatums of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusDatums: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.PlutusDataList | undefined, TransactionWitnessSetError> =
  Effect.fn((instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.plutus_datums(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.plutusDatums failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.plutusDatums without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusDatumsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusDataList | undefined => Effect.runSync(plutusDatums(instance));

/**
 * Method setRedeemers of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setRedeemers: (
  instance: CML.TransactionWitnessSet,
  redeemers: CML.Redeemers,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (instance: CML.TransactionWitnessSet, redeemers: CML.Redeemers) =>
    Effect.try({
      try: () => instance.set_redeemers(redeemers),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setRedeemers failed with parameters: ${redeemers} (Redeemers). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setRedeemers without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setRedeemersUnsafe = (
  instance: CML.TransactionWitnessSet,
  redeemers: CML.Redeemers,
): void => Effect.runSync(setRedeemers(instance, redeemers));

/**
 * Method redeemers of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const redeemers: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<CML.Redeemers | undefined, TransactionWitnessSetError> =
  Effect.fn((instance: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.redeemers(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.redeemers failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.redeemers without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const redeemersUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.Redeemers | undefined => Effect.runSync(redeemers(instance));

/**
 * Method setPlutusV2Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV2Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV2Scripts: CML.PlutusV2ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV2Scripts: CML.PlutusV2ScriptList,
  ) =>
    Effect.try({
      try: () => instance.set_plutus_v2_scripts(plutusV2Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV2Scripts failed with parameters: ${plutusV2Scripts} (PlutusV2ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV2Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV2ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV2Scripts: CML.PlutusV2ScriptList,
): void => Effect.runSync(setPlutusV2Scripts(instance, plutusV2Scripts));

/**
 * Method plutusV2Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV2Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV2ScriptList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.plutus_v2_scripts(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.plutusV2Scripts failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.plutusV2Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV2ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV2ScriptList | undefined =>
  Effect.runSync(plutusV2Scripts(instance));

/**
 * Method setPlutusV3Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV3Scripts: (
  instance: CML.TransactionWitnessSet,
  plutusV3Scripts: CML.PlutusV3ScriptList,
) => Effect.Effect<void, TransactionWitnessSetError> = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV3Scripts: CML.PlutusV3ScriptList,
  ) =>
    Effect.try({
      try: () => instance.set_plutus_v3_scripts(plutusV3Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV3Scripts failed with parameters: ${plutusV3Scripts} (PlutusV3ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV3Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV3ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV3Scripts: CML.PlutusV3ScriptList,
): void => Effect.runSync(setPlutusV3Scripts(instance, plutusV3Scripts));

/**
 * Method plutusV3Scripts of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV3Scripts: (
  instance: CML.TransactionWitnessSet,
) => Effect.Effect<
  CML.PlutusV3ScriptList | undefined,
  TransactionWitnessSetError
> = Effect.fn((instance: CML.TransactionWitnessSet) =>
  Effect.try({
    try: () => instance.plutus_v3_scripts(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.plutusV3Scripts failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.plutusV3Scripts without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV3ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV3ScriptList | undefined =>
  Effect.runSync(plutusV3Scripts(instance));

/**
 * Static method _new of TransactionWitnessSet
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionWitnessSet,
  TransactionWitnessSetError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSet.new(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSet._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionWitnessSet =>
  Effect.runSync(_new());
