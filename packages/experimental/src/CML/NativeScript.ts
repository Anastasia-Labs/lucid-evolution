/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NativeScript class
 *
 * @since 2.0.0
 * @category Types
 */
export type NativeScript = CML.NativeScript;

/**
 * Error class for NativeScript operations
 * 
 * This error is thrown when operations on NativeScript instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NativeScriptError extends Data.TaggedError("NativeScriptError")<{
  message?: string;
}> {}

/**
 * Method free of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NativeScript) => Effect.Effect<void, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScript): void =>
  Effect.runSync(free(instance));

/**
 * Method getRequiredSigners of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getRequiredSigners: (instance: CML.NativeScript) => Effect.Effect<CML.Ed25519KeyHashList, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.get_required_signers(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.getRequiredSigners failed `,
        }),
    })
);

/**
 * Unsafely calls instance.getRequiredSigners without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getRequiredSignersUnsafe = (instance: CML.NativeScript): CML.Ed25519KeyHashList =>
  Effect.runSync(getRequiredSigners(instance));

/**
 * Method hash of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptHash, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.NativeScript): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method verify of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const verify: (instance: CML.NativeScript, lowerBound: bigint | undefined, upperBound: bigint | undefined, keyHashes: CML.Ed25519KeyHashList) => Effect.Effect<boolean, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript, lowerBound: bigint | undefined, upperBound: bigint | undefined, keyHashes: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.verify(lowerBound, upperBound, keyHashes),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.verify failed with parameters: ${lowerBound}, ${upperBound}, ${keyHashes} (Ed25519KeyHashList). `,
        }),
    })
);

/**
 * Unsafely calls instance.verify without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const verifyUnsafe = (instance: CML.NativeScript, lowerBound: bigint | undefined, upperBound: bigint | undefined, keyHashes: CML.Ed25519KeyHashList): boolean =>
  Effect.runSync(verify(instance, lowerBound, upperBound, keyHashes));

/**
 * Method toCborBytes of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.NativeScript) => Effect.Effect<Uint8Array, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCborBytes failed NativeScript is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NativeScript): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.NativeScript) => Effect.Effect<Uint8Array, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCanonicalCborBytes failed NativeScript is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.NativeScript): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_cbor_bytes(cborBytes),
    catch: () => new NativeScriptError({
      message: `NativeScript.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls NativeScript.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.NativeScript =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCborHex failed NativeScript is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toCanonicalCborHex failed NativeScript is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_cbor_hex(cborBytes),
    catch: () => new NativeScriptError({
      message: `NativeScript.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls NativeScript.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.NativeScript =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.NativeScript) => Effect.Effect<string, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toJson failed NativeScript is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NativeScript): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.NativeScript) => Effect.Effect<any, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.toJsValue failed NativeScript is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NativeScript): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NativeScript.from_json(json),
    catch: () => new NativeScriptError({
      message: `NativeScript.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls NativeScript.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.NativeScript =>
  Effect.runSync(fromJson(json));

/**
 * Static method newScriptPubkey of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptPubkey: (ed25519KeyHash: CML.Ed25519KeyHash) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (ed25519KeyHash: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_pubkey(ed25519KeyHash),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptPubkey failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptPubkey without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptPubkeyUnsafe = (ed25519KeyHash: CML.Ed25519KeyHash): CML.NativeScript =>
  Effect.runSync(newScriptPubkey(ed25519KeyHash));

/**
 * Static method newScriptAll of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptAll: (nativeScripts: CML.NativeScriptList) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_all(nativeScripts),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptAll failed with parameters: ${nativeScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptAll without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptAllUnsafe = (nativeScripts: CML.NativeScriptList): CML.NativeScript =>
  Effect.runSync(newScriptAll(nativeScripts));

/**
 * Static method newScriptAny of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptAny: (nativeScripts: CML.NativeScriptList) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_any(nativeScripts),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptAny failed with parameters: ${nativeScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptAny without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptAnyUnsafe = (nativeScripts: CML.NativeScriptList): CML.NativeScript =>
  Effect.runSync(newScriptAny(nativeScripts));

/**
 * Static method newScriptNOfK of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptNOfK: (n: bigint, nativeScripts: CML.NativeScriptList) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (n: bigint, nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_n_of_k(n, nativeScripts),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptNOfK failed with parameters: ${n}, ${nativeScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptNOfK without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptNOfKUnsafe = (n: bigint, nativeScripts: CML.NativeScriptList): CML.NativeScript =>
  Effect.runSync(newScriptNOfK(n, nativeScripts));

/**
 * Static method newScriptInvalidBefore of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptInvalidBefore: (before: bigint) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (before: bigint) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_invalid_before(before),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptInvalidBefore failed with parameters: ${before}. `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptInvalidBefore without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptInvalidBeforeUnsafe = (before: bigint): CML.NativeScript =>
  Effect.runSync(newScriptInvalidBefore(before));

/**
 * Static method newScriptInvalidHereafter of NativeScript
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newScriptInvalidHereafter: (after: bigint) => Effect.Effect<CML.NativeScript, NativeScriptError> = Effect.fn(function* (after: bigint) {
  return yield* Effect.try({
    try: () => CML.NativeScript.new_script_invalid_hereafter(after),
    catch: () => new NativeScriptError({
      message: `NativeScript.newScriptInvalidHereafter failed with parameters: ${after}. `,
    }),
  });
});

/**
 * Unsafely calls NativeScript.newScriptInvalidHereafter without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newScriptInvalidHereafterUnsafe = (after: bigint): CML.NativeScript =>
  Effect.runSync(newScriptInvalidHereafter(after));

/**
 * Method kind of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.NativeScript) => Effect.Effect<CML.NativeScriptKind, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.NativeScript): CML.NativeScriptKind =>
  Effect.runSync(kind(instance));

/**
 * Method asScriptPubkey of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptPubkey: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptPubkey | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_pubkey(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptPubkey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptPubkey without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptPubkeyUnsafe = (instance: CML.NativeScript): CML.ScriptPubkey | undefined =>
  Effect.runSync(asScriptPubkey(instance));

/**
 * Method asScriptAll of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptAll: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptAll | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_all(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptAll failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptAll without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptAllUnsafe = (instance: CML.NativeScript): CML.ScriptAll | undefined =>
  Effect.runSync(asScriptAll(instance));

/**
 * Method asScriptAny of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptAny: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptAny | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_any(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptAny failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptAny without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptAnyUnsafe = (instance: CML.NativeScript): CML.ScriptAny | undefined =>
  Effect.runSync(asScriptAny(instance));

/**
 * Method asScriptNOfK of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptNOfK: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptNOfK | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_n_of_k(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptNOfK failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptNOfK without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptNOfKUnsafe = (instance: CML.NativeScript): CML.ScriptNOfK | undefined =>
  Effect.runSync(asScriptNOfK(instance));

/**
 * Method asScriptInvalidBefore of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptInvalidBefore: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptInvalidBefore | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_invalid_before(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptInvalidBefore failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptInvalidBefore without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptInvalidBeforeUnsafe = (instance: CML.NativeScript): CML.ScriptInvalidBefore | undefined =>
  Effect.runSync(asScriptInvalidBefore(instance));

/**
 * Method asScriptInvalidHereafter of NativeScript
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asScriptInvalidHereafter: (instance: CML.NativeScript) => Effect.Effect<CML.ScriptInvalidHereafter | undefined, NativeScriptError> = Effect.fn(
  (instance: CML.NativeScript) =>
    Effect.try({
      try: () => instance.as_script_invalid_hereafter(),
      catch: () =>
        new NativeScriptError({
          message: `NativeScript.asScriptInvalidHereafter failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asScriptInvalidHereafter without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asScriptInvalidHereafterUnsafe = (instance: CML.NativeScript): CML.ScriptInvalidHereafter | undefined =>
  Effect.runSync(asScriptInvalidHereafter(instance));
