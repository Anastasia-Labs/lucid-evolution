/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DRep class
 *
 * @since 2.0.0
 * @category Types
 */
export type DRep = CML.DRep;

/**
 * Error class for DRep operations
 * 
 * This error is thrown when operations on DRep instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DRepError extends Data.TaggedError("DRepError")<{
  message?: string;
}> {}

/**
 * Method free of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.DRep) => Effect.Effect<void, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DRepError({
          message: `DRep.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DRep): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.DRep) => Effect.Effect<Uint8Array, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DRepError({
          message: `DRep.toCborBytes failed DRep is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DRep): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.DRep) => Effect.Effect<Uint8Array, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DRepError({
          message: `DRep.toCanonicalCborBytes failed DRep is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DRep): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DRep.from_cbor_bytes(cborBytes),
    catch: () => new DRepError({
      message: `DRep.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls DRep.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.DRep =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.DRep) => Effect.Effect<string, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DRepError({
          message: `DRep.toCborHex failed DRep is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.DRep) => Effect.Effect<string, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DRepError({
          message: `DRep.toCanonicalCborHex failed DRep is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.DRep.from_cbor_hex(cborBytes),
    catch: () => new DRepError({
      message: `DRep.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls DRep.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.DRep =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.DRep) => Effect.Effect<string, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DRepError({
          message: `DRep.toJson failed DRep is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DRep): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.DRep) => Effect.Effect<any, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DRepError({
          message: `DRep.toJsValue failed DRep is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DRep): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.DRep.from_json(json),
    catch: () => new DRepError({
      message: `DRep.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls DRep.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.DRep =>
  Effect.runSync(fromJson(json));

/**
 * Static method newKey of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newKey: (pool: CML.Ed25519KeyHash) => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* (pool: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.DRep.new_key(pool),
    catch: () => new DRepError({
      message: `DRep.newKey failed with parameters: ${pool} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls DRep.newKey without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newKeyUnsafe = (pool: CML.Ed25519KeyHash): CML.DRep =>
  Effect.runSync(newKey(pool));

/**
 * Static method newScript of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScript: (scriptHash: CML.ScriptHash) => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* (scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.DRep.new_script(scriptHash),
    catch: () => new DRepError({
      message: `DRep.newScript failed with parameters: ${scriptHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls DRep.newScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptUnsafe = (scriptHash: CML.ScriptHash): CML.DRep =>
  Effect.runSync(newScript(scriptHash));

/**
 * Static method newAlwaysAbstain of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newAlwaysAbstain: () => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.DRep.new_always_abstain(),
    catch: () => new DRepError({
      message: `DRep.newAlwaysAbstain failed `,
    }),
  });
});

/**
 * Unsafely calls DRep.newAlwaysAbstain without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlwaysAbstainUnsafe = (): CML.DRep =>
  Effect.runSync(newAlwaysAbstain());

/**
 * Static method newAlwaysNoConfidence of DRep
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newAlwaysNoConfidence: () => Effect.Effect<CML.DRep, DRepError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.DRep.new_always_no_confidence(),
    catch: () => new DRepError({
      message: `DRep.newAlwaysNoConfidence failed `,
    }),
  });
});

/**
 * Unsafely calls DRep.newAlwaysNoConfidence without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newAlwaysNoConfidenceUnsafe = (): CML.DRep =>
  Effect.runSync(newAlwaysNoConfidence());

/**
 * Method kind of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.DRep) => Effect.Effect<CML.DRepKind, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new DRepError({
          message: `DRep.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.DRep): CML.DRepKind =>
  Effect.runSync(kind(instance));

/**
 * Method asKey of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asKey: (instance: CML.DRep) => Effect.Effect<CML.Ed25519KeyHash | undefined, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.as_key(),
      catch: () =>
        new DRepError({
          message: `DRep.asKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asKey without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asKeyUnsafe = (instance: CML.DRep): CML.Ed25519KeyHash | undefined =>
  Effect.runSync(asKey(instance));

/**
 * Method asScript of DRep
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScript: (instance: CML.DRep) => Effect.Effect<CML.ScriptHash | undefined, DRepError> = Effect.fn(
  (instance: CML.DRep) =>
    Effect.try({
      try: () => instance.as_script(),
      catch: () =>
        new DRepError({
          message: `DRep.asScript failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScript without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptUnsafe = (instance: CML.DRep): CML.ScriptHash | undefined =>
  Effect.runSync(asScript(instance));
