/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type Script = CML.Script;

/**
 * Error class for Script operations
 *
 * This error is thrown when operations on Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptError extends Data.TaggedError("ScriptError")<{
  message?: string;
}> {}

/**
 * Method free of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Script) => Effect.Effect<void, ScriptError> =
  Effect.fn((instance: CML.Script) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptError({
          message: `Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash: (
  instance: CML.Script,
) => Effect.Effect<CML.ScriptHash, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new ScriptError({
          message: `Script.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method language of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const language: (
  instance: CML.Script,
) => Effect.Effect<CML.Language | undefined, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.language(),
      catch: () =>
        new ScriptError({
          message: `Script.language failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.language without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const languageUnsafe = (
  instance: CML.Script,
): CML.Language | undefined => Effect.runSync(language(instance));

/**
 * Method toCborBytes of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Script,
) => Effect.Effect<Uint8Array, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptError({
          message: `Script.toCborBytes failed Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Script,
) => Effect.Effect<Uint8Array, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptError({
          message: `Script.toCanonicalCborBytes failed Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Script): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Script.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptError({
        message: `Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Script.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Script =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError> = Effect.fn((instance: CML.Script) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new ScriptError({
        message: `Script.toCborHex failed Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError> = Effect.fn((instance: CML.Script) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new ScriptError({
        message: `Script.toCanonicalCborHex failed Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Script.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptError({
        message: `Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Script.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Script =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Script,
) => Effect.Effect<string, ScriptError> = Effect.fn((instance: CML.Script) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new ScriptError({
        message: `Script.toJson failed Script is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Script,
) => Effect.Effect<any, ScriptError> = Effect.fn((instance: CML.Script) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new ScriptError({
        message: `Script.toJsValue failed Script is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Script.from_json(json),
    catch: () =>
      new ScriptError({
        message: `Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Script.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Script =>
  Effect.runSync(fromJson(json));

/**
 * Static method newNative of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newNative: (
  script: CML.NativeScript,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  script: CML.NativeScript,
) {
  return yield* Effect.try({
    try: () => CML.Script.new_native(script),
    catch: () =>
      new ScriptError({
        message: `Script.newNative failed with parameters: ${script} (NativeScript). `,
      }),
  });
});

/**
 * Unsafely calls Script.newNative without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newNativeUnsafe = (script: CML.NativeScript): CML.Script =>
  Effect.runSync(newNative(script));

/**
 * Static method newPlutusV1 of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV1: (
  script: CML.PlutusV1Script,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  script: CML.PlutusV1Script,
) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v1(script),
    catch: () =>
      new ScriptError({
        message: `Script.newPlutusV1 failed with parameters: ${script} (PlutusV1Script). `,
      }),
  });
});

/**
 * Unsafely calls Script.newPlutusV1 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV1Unsafe = (script: CML.PlutusV1Script): CML.Script =>
  Effect.runSync(newPlutusV1(script));

/**
 * Static method newPlutusV2 of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV2: (
  script: CML.PlutusV2Script,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  script: CML.PlutusV2Script,
) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v2(script),
    catch: () =>
      new ScriptError({
        message: `Script.newPlutusV2 failed with parameters: ${script} (PlutusV2Script). `,
      }),
  });
});

/**
 * Unsafely calls Script.newPlutusV2 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV2Unsafe = (script: CML.PlutusV2Script): CML.Script =>
  Effect.runSync(newPlutusV2(script));

/**
 * Static method newPlutusV3 of Script
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newPlutusV3: (
  script: CML.PlutusV3Script,
) => Effect.Effect<CML.Script, ScriptError> = Effect.fn(function* (
  script: CML.PlutusV3Script,
) {
  return yield* Effect.try({
    try: () => CML.Script.new_plutus_v3(script),
    catch: () =>
      new ScriptError({
        message: `Script.newPlutusV3 failed with parameters: ${script} (PlutusV3Script). `,
      }),
  });
});

/**
 * Unsafely calls Script.newPlutusV3 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newPlutusV3Unsafe = (script: CML.PlutusV3Script): CML.Script =>
  Effect.runSync(newPlutusV3(script));

/**
 * Method kind of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.Script,
) => Effect.Effect<CML.ScriptKind, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new ScriptError({
          message: `Script.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.Script): CML.ScriptKind =>
  Effect.runSync(kind(instance));

/**
 * Method asNative of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const asNative: (
  instance: CML.Script,
) => Effect.Effect<CML.NativeScript | undefined, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.as_native(),
      catch: () =>
        new ScriptError({
          message: `Script.asNative failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asNative without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asNativeUnsafe = (
  instance: CML.Script,
): CML.NativeScript | undefined => Effect.runSync(asNative(instance));

/**
 * Method asPlutusV1 of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV1: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV1Script | undefined, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.as_plutus_v1(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV1 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asPlutusV1 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV1Unsafe = (
  instance: CML.Script,
): CML.PlutusV1Script | undefined => Effect.runSync(asPlutusV1(instance));

/**
 * Method asPlutusV2 of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV2: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV2Script | undefined, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.as_plutus_v2(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV2 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asPlutusV2 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV2Unsafe = (
  instance: CML.Script,
): CML.PlutusV2Script | undefined => Effect.runSync(asPlutusV2(instance));

/**
 * Method asPlutusV3 of Script
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPlutusV3: (
  instance: CML.Script,
) => Effect.Effect<CML.PlutusV3Script | undefined, ScriptError> = Effect.fn(
  (instance: CML.Script) =>
    Effect.try({
      try: () => instance.as_plutus_v3(),
      catch: () =>
        new ScriptError({
          message: `Script.asPlutusV3 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asPlutusV3 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPlutusV3Unsafe = (
  instance: CML.Script,
): CML.PlutusV3Script | undefined => Effect.runSync(asPlutusV3(instance));
