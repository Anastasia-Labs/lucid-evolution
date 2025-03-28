import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AuxiliaryData = CML.AuxiliaryData;

export class AuxiliaryDataError extends Data.TaggedError("AuxiliaryDataError")<{
  message?: string;
}> {}

/**
 * Method free of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AuxiliaryData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.new(),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData._new failed `,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData._new without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method metadata of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.metadata(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const metadata = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.metadata(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.metadata failed `,
        }),
    })
);

/**
 * Unsafely calls instance.metadata without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeMetadata(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeMetadata failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMetadata = (instance: CML.AuxiliaryData): CML.Metadata | undefined =>
  Effect.runSync(metadata(instance));

/**
 * Method nativeScripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.nativeScripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.NativeScriptList | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.nativeScripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeNativeScripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeNativeScripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScripts = (instance: CML.AuxiliaryData): CML.NativeScriptList | undefined =>
  Effect.runSync(nativeScripts(instance));

/**
 * Method plutusV1Scripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.plutusV1Scripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV1Scripts = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.PlutusV1ScriptList | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.plutus_v1_scripts(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.plutusV1Scripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusV1Scripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafePlutusV1Scripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafePlutusV1Scripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusV1Scripts = (instance: CML.AuxiliaryData): CML.PlutusV1ScriptList | undefined =>
  Effect.runSync(plutusV1Scripts(instance));

/**
 * Method plutusV2Scripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.plutusV2Scripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV2Scripts = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.PlutusV2ScriptList | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.plutus_v2_scripts(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.plutusV2Scripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusV2Scripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafePlutusV2Scripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafePlutusV2Scripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusV2Scripts = (instance: CML.AuxiliaryData): CML.PlutusV2ScriptList | undefined =>
  Effect.runSync(plutusV2Scripts(instance));

/**
 * Method addMetadata of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.addMetadata(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addMetadata = Effect.fn(
  (instance: CML.AuxiliaryData, other: CML.Metadata): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.add_metadata(other),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.addMetadata failed with parameters: ${other} (Metadata). `,
        }),
    })
);

/**
 * Unsafely calls instance.addMetadata without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAddMetadata(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAddMetadata failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddMetadata = (instance: CML.AuxiliaryData, other: CML.Metadata): void =>
  Effect.runSync(addMetadata(instance, other));

/**
 * Method addNativeScripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.addNativeScripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addNativeScripts = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.NativeScriptList): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.add_native_scripts(scripts),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.addNativeScripts failed with parameters: ${scripts} (NativeScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.addNativeScripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAddNativeScripts(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAddNativeScripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddNativeScripts = (instance: CML.AuxiliaryData, scripts: CML.NativeScriptList): void =>
  Effect.runSync(addNativeScripts(instance, scripts));

/**
 * Method addPlutusV1Scripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.addPlutusV1Scripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusV1Scripts = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.PlutusV1ScriptList): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.add_plutus_v1_scripts(scripts),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.addPlutusV1Scripts failed with parameters: ${scripts} (PlutusV1ScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.addPlutusV1Scripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAddPlutusV1Scripts(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAddPlutusV1Scripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddPlutusV1Scripts = (instance: CML.AuxiliaryData, scripts: CML.PlutusV1ScriptList): void =>
  Effect.runSync(addPlutusV1Scripts(instance, scripts));

/**
 * Method addPlutusV2Scripts of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.addPlutusV2Scripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusV2Scripts = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.PlutusV2ScriptList): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.add_plutus_v2_scripts(scripts),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.addPlutusV2Scripts failed with parameters: ${scripts} (PlutusV2ScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.addPlutusV2Scripts without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAddPlutusV2Scripts(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAddPlutusV2Scripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddPlutusV2Scripts = (instance: CML.AuxiliaryData, scripts: CML.PlutusV2ScriptList): void =>
  Effect.runSync(addPlutusV2Scripts(instance, scripts));

/**
 * Method add of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.AuxiliaryData, other: CML.AuxiliaryData): Effect.Effect<void, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.add(other),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.add failed with parameters: ${other} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.AuxiliaryData, other: CML.AuxiliaryData): void =>
  Effect.runSync(add(instance, other));

/**
 * Method toCborBytes of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<Uint8Array, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toCborBytes failed AuxiliaryData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.AuxiliaryData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<Uint8Array, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toCanonicalCborBytes failed AuxiliaryData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.AuxiliaryData): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.from_cbor_bytes(cborBytes),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<string, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toCborHex failed AuxiliaryData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<string, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toCanonicalCborHex failed AuxiliaryData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.from_cbor_hex(cborBytes),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.fromCborHex without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<string, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toJson failed AuxiliaryData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<any, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.toJsValue failed AuxiliaryData is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.AuxiliaryData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.from_json(json),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.fromJson without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newShelley of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.newShelley( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newShelley = Effect.fn(function* (shelley: CML.Metadata) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.new_shelley(shelley),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.newShelley failed with parameters: ${shelley} (Metadata). `,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.newShelley without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeNewShelley( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeNewShelley failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewShelley = (shelley: CML.Metadata) =>
  Effect.runSync(newShelley(shelley));

/**
 * Static method newShelleyMa of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.newShelleyMa( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newShelleyMa = Effect.fn(function* (shelleyMa: CML.ShelleyMAFormatAuxData) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.new_shelley_ma(shelleyMa),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.newShelleyMa failed with parameters: ${shelleyMa} (ShelleyMAFormatAuxData). `,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.newShelleyMa without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeNewShelleyMa( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeNewShelleyMa failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewShelleyMa = (shelleyMa: CML.ShelleyMAFormatAuxData) =>
  Effect.runSync(newShelleyMa(shelleyMa));

/**
 * Static method newConway of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AuxiliaryData.newConway( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newConway = Effect.fn(function* (conway: CML.ConwayFormatAuxData) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryData.new_conway(conway),
    catch: () => new AuxiliaryDataError({
      message: `AuxiliaryData.newConway failed with parameters: ${conway} (ConwayFormatAuxData). `,
    }),
  });
});

/**
 * Unsafely calls AuxiliaryData.newConway without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeNewConway( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeNewConway failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewConway = (conway: CML.ConwayFormatAuxData) =>
  Effect.runSync(newConway(conway));

/**
 * Method kind of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.AuxiliaryDataKind, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.AuxiliaryData): CML.AuxiliaryDataKind =>
  Effect.runSync(kind(instance));

/**
 * Method asShelley of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.asShelley(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asShelley = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.as_shelley(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.asShelley failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asShelley without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAsShelley(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAsShelley failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsShelley = (instance: CML.AuxiliaryData): CML.Metadata | undefined =>
  Effect.runSync(asShelley(instance));

/**
 * Method asShelleyMa of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.asShelleyMa(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asShelleyMa = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.ShelleyMAFormatAuxData | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.as_shelley_ma(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.asShelleyMa failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asShelleyMa without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAsShelleyMa(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAsShelleyMa failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsShelleyMa = (instance: CML.AuxiliaryData): CML.ShelleyMAFormatAuxData | undefined =>
  Effect.runSync(asShelleyMa(instance));

/**
 * Method asConway of AuxiliaryData
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryData.asConway(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asConway = Effect.fn(
  (instance: CML.AuxiliaryData): Effect.Effect<CML.ConwayFormatAuxData | undefined, AuxiliaryDataError> =>
    Effect.try({
      try: () => instance.as_conway(),
      catch: () =>
        new AuxiliaryDataError({
          message: `AuxiliaryData.asConway failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asConway without Effect wrapper
 * 
 * @example
 * import { AuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryData.unsafeAsConway(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryData.unsafeAsConway failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsConway = (instance: CML.AuxiliaryData): CML.ConwayFormatAuxData | undefined =>
  Effect.runSync(asConway(instance));
