import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionMetadatum = CML.TransactionMetadatum;

export class TransactionMetadatumError extends Data.TaggedError("TransactionMetadatumError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<void, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionMetadatum): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<Uint8Array, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toCborBytes failed TransactionMetadatum is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.TransactionMetadatum): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.from_cbor_bytes(cborBytes),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toJson of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<string, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJson failed TransactionMetadatum is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.TransactionMetadatum): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsonValue of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.toJsonValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsonValue = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<any, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.to_json_value(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.toJsonValue failed TransactionMetadatum is not valid for any conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJsonValue without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeToJsonValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeToJsonValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsonValue = (instance: CML.TransactionMetadatum): any =>
  Effect.runSync(toJsonValue(instance));

/**
 * Static method fromJson of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.from_json(json),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.fromJson without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newMap of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newMap( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newMap = Effect.fn(function* (map: CML.MetadatumMap) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_map(map),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newMap failed with parameters: ${map} (MetadatumMap). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newMap without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeNewMap( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeNewMap failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewMap = (map: CML.MetadatumMap) =>
  Effect.runSync(newMap(map));

/**
 * Static method newList of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newList( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newList = Effect.fn(function* (elements: CML.MetadatumList) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_list(elements),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newList failed with parameters: ${elements} (MetadatumList). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newList without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeNewList( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeNewList failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewList = (elements: CML.MetadatumList) =>
  Effect.runSync(newList(elements));

/**
 * Static method newInt of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newInt( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newInt = Effect.fn(function* (int: CML.Int) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_int(int),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newInt failed with parameters: ${int} (Int). `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newInt without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeNewInt( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeNewInt failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewInt = (int: CML.Int) =>
  Effect.runSync(newInt(int));

/**
 * Static method newBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_bytes(bytes),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeNewBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeNewBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewBytes = (bytes: Uint8Array) =>
  Effect.runSync(newBytes(bytes));

/**
 * Static method newText of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionMetadatum.newText( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newText = Effect.fn(function* (text: string) {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatum.new_text(text),
    catch: () => new TransactionMetadatumError({
      message: `TransactionMetadatum.newText failed with parameters: ${text}. `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatum.newText without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeNewText( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeNewText failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewText = (text: string) =>
  Effect.runSync(newText(text));

/**
 * Method kind of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.TransactionMetadatumKind, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.TransactionMetadatum): CML.TransactionMetadatumKind =>
  Effect.runSync(kind(instance));

/**
 * Method asMap of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asMap(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asMap = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.MetadatumMap | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_map(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asMap failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asMap without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeAsMap(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeAsMap failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsMap = (instance: CML.TransactionMetadatum): CML.MetadatumMap | undefined =>
  Effect.runSync(asMap(instance));

/**
 * Method asList of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asList(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asList = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.MetadatumList | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_list(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asList failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asList without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeAsList(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeAsList failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsList = (instance: CML.TransactionMetadatum): CML.MetadatumList | undefined =>
  Effect.runSync(asList(instance));

/**
 * Method asInt of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asInt(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asInt = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<CML.Int | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_int(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asInt failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asInt without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeAsInt(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeAsInt failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsInt = (instance: CML.TransactionMetadatum): CML.Int | undefined =>
  Effect.runSync(asInt(instance));

/**
 * Method asBytes of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asBytes = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<Uint8Array | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_bytes(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asBytes failed Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.asBytes without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeAsBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeAsBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsBytes = (instance: CML.TransactionMetadatum): Uint8Array | undefined =>
  Effect.runSync(asBytes(instance));

/**
 * Method asText of TransactionMetadatum
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatum.asText(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asText = Effect.fn(
  (instance: CML.TransactionMetadatum): Effect.Effect<string | undefined, TransactionMetadatumError> =>
    Effect.try({
      try: () => instance.as_text(),
      catch: () =>
        new TransactionMetadatumError({
          message: `TransactionMetadatum.asText failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asText without Effect wrapper
 * 
 * @example
 * import { TransactionMetadatum } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionMetadatum instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatum.unsafeAsText(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatum.unsafeAsText failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsText = (instance: CML.TransactionMetadatum): string | undefined =>
  Effect.runSync(asText(instance));
