/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AuxiliaryData class
 *
 * @since 2.0.0
 * @category Types
 */
export type AuxiliaryData = CML.AuxiliaryData;

/**
 * Error class for AuxiliaryData operations
 * 
 * This error is thrown when operations on AuxiliaryData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AuxiliaryDataError extends Data.TaggedError("AuxiliaryDataError")<{
  message?: string;
}> {}

/**
 * Method free of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.AuxiliaryData) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AuxiliaryData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.AuxiliaryData =>
  Effect.runSync(_new());

/**
 * Method metadata of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const metadata: (instance: CML.AuxiliaryData) => Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const metadataUnsafe = (instance: CML.AuxiliaryData): CML.Metadata | undefined =>
  Effect.runSync(metadata(instance));

/**
 * Method nativeScripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts: (instance: CML.AuxiliaryData) => Effect.Effect<CML.NativeScriptList | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (instance: CML.AuxiliaryData): CML.NativeScriptList | undefined =>
  Effect.runSync(nativeScripts(instance));

/**
 * Method plutusV1Scripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV1Scripts: (instance: CML.AuxiliaryData) => Effect.Effect<CML.PlutusV1ScriptList | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV1ScriptsUnsafe = (instance: CML.AuxiliaryData): CML.PlutusV1ScriptList | undefined =>
  Effect.runSync(plutusV1Scripts(instance));

/**
 * Method plutusV2Scripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV2Scripts: (instance: CML.AuxiliaryData) => Effect.Effect<CML.PlutusV2ScriptList | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV2ScriptsUnsafe = (instance: CML.AuxiliaryData): CML.PlutusV2ScriptList | undefined =>
  Effect.runSync(plutusV2Scripts(instance));

/**
 * Method addMetadata of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addMetadata: (instance: CML.AuxiliaryData, other: CML.Metadata) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData, other: CML.Metadata) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addMetadataUnsafe = (instance: CML.AuxiliaryData, other: CML.Metadata): void =>
  Effect.runSync(addMetadata(instance, other));

/**
 * Method addNativeScripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addNativeScripts: (instance: CML.AuxiliaryData, scripts: CML.NativeScriptList) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.NativeScriptList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addNativeScriptsUnsafe = (instance: CML.AuxiliaryData, scripts: CML.NativeScriptList): void =>
  Effect.runSync(addNativeScripts(instance, scripts));

/**
 * Method addPlutusV1Scripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusV1Scripts: (instance: CML.AuxiliaryData, scripts: CML.PlutusV1ScriptList) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.PlutusV1ScriptList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addPlutusV1ScriptsUnsafe = (instance: CML.AuxiliaryData, scripts: CML.PlutusV1ScriptList): void =>
  Effect.runSync(addPlutusV1Scripts(instance, scripts));

/**
 * Method addPlutusV2Scripts of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addPlutusV2Scripts: (instance: CML.AuxiliaryData, scripts: CML.PlutusV2ScriptList) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData, scripts: CML.PlutusV2ScriptList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addPlutusV2ScriptsUnsafe = (instance: CML.AuxiliaryData, scripts: CML.PlutusV2ScriptList): void =>
  Effect.runSync(addPlutusV2Scripts(instance, scripts));

/**
 * Method add of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.AuxiliaryData, other: CML.AuxiliaryData) => Effect.Effect<void, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData, other: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.AuxiliaryData, other: CML.AuxiliaryData): void =>
  Effect.runSync(add(instance, other));

/**
 * Method toCborBytes of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.AuxiliaryData) => Effect.Effect<Uint8Array, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.AuxiliaryData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.AuxiliaryData) => Effect.Effect<Uint8Array, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.AuxiliaryData): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.AuxiliaryData =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.AuxiliaryData) => Effect.Effect<string, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.AuxiliaryData) => Effect.Effect<string, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.AuxiliaryData =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.AuxiliaryData) => Effect.Effect<string, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.AuxiliaryData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.AuxiliaryData) => Effect.Effect<any, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.AuxiliaryData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.AuxiliaryData =>
  Effect.runSync(fromJson(json));

/**
 * Static method newShelley of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newShelley: (shelley: CML.Metadata) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (shelley: CML.Metadata) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newShelleyUnsafe = (shelley: CML.Metadata): CML.AuxiliaryData =>
  Effect.runSync(newShelley(shelley));

/**
 * Static method newShelleyMa of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newShelleyMa: (shelleyMa: CML.ShelleyMAFormatAuxData) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (shelleyMa: CML.ShelleyMAFormatAuxData) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newShelleyMaUnsafe = (shelleyMa: CML.ShelleyMAFormatAuxData): CML.AuxiliaryData =>
  Effect.runSync(newShelleyMa(shelleyMa));

/**
 * Static method newConway of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newConway: (conway: CML.ConwayFormatAuxData) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError> = Effect.fn(function* (conway: CML.ConwayFormatAuxData) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConwayUnsafe = (conway: CML.ConwayFormatAuxData): CML.AuxiliaryData =>
  Effect.runSync(newConway(conway));

/**
 * Method kind of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.AuxiliaryData) => Effect.Effect<CML.AuxiliaryDataKind, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.AuxiliaryData): CML.AuxiliaryDataKind =>
  Effect.runSync(kind(instance));

/**
 * Method asShelley of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asShelley: (instance: CML.AuxiliaryData) => Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asShelleyUnsafe = (instance: CML.AuxiliaryData): CML.Metadata | undefined =>
  Effect.runSync(asShelley(instance));

/**
 * Method asShelleyMa of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asShelleyMa: (instance: CML.AuxiliaryData) => Effect.Effect<CML.ShelleyMAFormatAuxData | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asShelleyMaUnsafe = (instance: CML.AuxiliaryData): CML.ShelleyMAFormatAuxData | undefined =>
  Effect.runSync(asShelleyMa(instance));

/**
 * Method asConway of AuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asConway: (instance: CML.AuxiliaryData) => Effect.Effect<CML.ConwayFormatAuxData | undefined, AuxiliaryDataError> = Effect.fn(
  (instance: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConwayUnsafe = (instance: CML.AuxiliaryData): CML.ConwayFormatAuxData | undefined =>
  Effect.runSync(asConway(instance));
