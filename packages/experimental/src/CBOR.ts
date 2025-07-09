import * as Bytes from "./Bytes.js";
import { Data, Effect, ParseResult, pipe, Schema } from "effect";

/**
 * Error type for CBOR-related operations
 *
 * @since 2.0.0
 * @category errors
 */
export class CBORError extends Data.TaggedError("CBORError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Base configuration options for CBOR encoding/decoding
 *
 * @since 2.0.0
 * @category model
 */
export interface BaseCBOROptions {
  /** Tag Uint8Array values */
  readonly tagUint8Array?: boolean;
  /** Use records for encoding */
  readonly useRecords?: boolean;
  /** Maps as objects */
  readonly mapsAsObjects?: boolean;
  /** Treat all integers as bigint when decoding (default: false) */
  readonly integersAsBigInt?: boolean;
}

/**
 * Configuration options for CBOR encoding/decoding
 *
 * @since 2.0.0
 * @category model
 */
export type CBOREncodingOptions =
  | {
      readonly _tag: "canonical";
      readonly integersAsBigInt?: boolean;
    }
  | {
      readonly _tag: "custom";
      /** Use indefinite length encoding for arrays */
      readonly useIndefiniteArrays: boolean;
      /** Use indefinite length encoding for maps */
      readonly useIndefiniteMaps: boolean;
      /** Use definite length encoding for empty collections (CML compatibility) */
      readonly useDefiniteForEmpty: boolean;
      readonly integersAsBigInt: boolean;
    };

/**
 * Default CBOR encoding options for Cardano.
 * Uses custom mode with CML compatibility settings for legacy compatibility.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_ENCODING_OPTIONS: CBOREncodingOptions = {
  _tag: "custom",
  integersAsBigInt: true, // Default to treating integers as bigint for better type safety
  useIndefiniteArrays: true,
  useIndefiniteMaps: true,
  useDefiniteForEmpty: true, // CML compatibility: definite for empty collections
};

/**
 * Helper function to determine if arrays should use indefinite length encoding
 *
 * @since 2.0.0
 * @category utils
 */
const shouldUseIndefiniteArrays = (
  options: CBOREncodingOptions,
  arrayLength: number,
): boolean => {
  switch (options._tag) {
    case "canonical":
      return false; // Canonical mode always uses definite length
    case "custom":
      // Check if we should use definite for empty collections
      if (options.useDefiniteForEmpty && arrayLength === 0) {
        return false;
      }
      return options.useIndefiniteArrays ?? false;
    default:
      return false;
  }
};

/**
 * Helper function to determine if maps should use indefinite length encoding
 *
 * @since 2.0.0
 * @category utils
 */
const shouldUseIndefiniteMaps = (
  options: CBOREncodingOptions,
  mapSize: number,
): boolean => {
  switch (options._tag) {
    case "canonical":
      return false; // Canonical mode always uses definite length
    case "custom":
      // Check if we should use definite for empty collections
      if (options.useDefiniteForEmpty && mapSize === 0) {
        return false;
      }
      return options.useIndefiniteMaps ?? false;
    default:
      return false;
  }
};

/**
 * Encodes data using indefinite length arrays
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeIndefiniteArray = (
  array: unknown[],
  options: CBOREncodingOptions,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const chunks: Uint8Array[] = [];

    // Indefinite-length array marker (major type 4, additional info 31)
    chunks.push(new Uint8Array([0x9f])); // 0b100_11111

    // Encode each element with the same options (recursive)
    for (const item of array) {
      const encoded = yield* encodeCBORValue(item as CBORValue, options);
      chunks.push(encoded);
    }

    // Break marker
    chunks.push(new Uint8Array([0xff]));

    // Combine all chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  });

/**
 * Encodes data using indefinite length maps
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeIndefiniteMap = (
  obj: Record<string, unknown>,
  options: CBOREncodingOptions,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const chunks: Uint8Array[] = [];

    // Indefinite-length map marker (major type 5, additional info 31)
    chunks.push(new Uint8Array([0xbf])); // 0b101_11111

    // Encode each key-value pair with the same options (recursive)
    for (const [key, value] of Object.entries(obj)) {
      const encodedKey = yield* encodeCBORValue(key as CBORValue, options);
      const encodedValue = yield* encodeCBORValue(value as CBORValue, options);
      chunks.push(encodedKey);
      chunks.push(encodedValue);
    }

    // Break marker
    chunks.push(new Uint8Array([0xff]));

    // Combine all chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  });

/**
 * Encodes a CBORValue back to bytes using the specified encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeCBORValue = (
  value: CBORValue,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    // Handle primitives using schema guards
    if (Schema.is(Schema.BigIntFromSelf)(value)) {
      return yield* encodeBigInt(value);
    }
    if (Schema.is(Schema.String)(value)) {
      const utf8Bytes = new TextEncoder().encode(value);
      return yield* encodeTextString(utf8Bytes);
    }
    if (Schema.is(Schema.Uint8ArrayFromSelf)(value)) {
      // if (options.tagUint8Array) {
      //   const byteString = yield* encodeByteString(value);
      //   return yield* encodeTag(64, byteString);
      // } else {
      return yield* encodeByteString(value);
      // }
    }
    if (Schema.is(Schema.Boolean)(value)) {
      return new Uint8Array([value ? 0xf5 : 0xf4]);
    }
    if (Schema.is(Schema.Null)(value)) {
      return new Uint8Array([0xf6]);
    }
    if (Schema.is(Schema.Undefined)(value)) {
      return new Uint8Array([0xf7]);
    }
    if (Schema.is(Schema.Number)(value)) {
      // Encode JS numbers as integer if they are safe integers and options.integersAsBigInt is false, otherwise as float
      if (Number.isNaN(value)) {
        // Half-precision NaN
        return new Uint8Array([0xf9, 0x7e, 0x00]);
      } else if (value === Infinity) {
        // Half-precision Infinity
        return new Uint8Array([0xf9, 0x7c, 0x00]);
      } else if (value === -Infinity) {
        // Half-precision -Infinity
        return new Uint8Array([0xf9, 0xfc, 0x00]);
      } else if (Object.is(value, -0.0)) {
        // Half-precision -0.0
        return new Uint8Array([0xf9, 0x80, 0x00]);
      } else if (
        Number.isInteger(value) &&
        Number.isFinite(value) &&
        options.integersAsBigInt === false &&
        value >= Number.MIN_SAFE_INTEGER &&
        value <= Number.MAX_SAFE_INTEGER
      ) {
        // Encode as integer if options.integersAsBigInt is false and value is a safe integer
        return yield* encodeBigInt(BigInt(value));
      } else {
        // All other numbers: encode as double-precision float
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, value, false); // big-endian
        return new Uint8Array([0xfb, ...new Uint8Array(buffer)]);
      }
    }

    // Handle complex types using schema guards
    if (Schema.is(CBORArraySchema)(value)) {
      return yield* encodeArray(value, options, (item) =>
        encodeCBORValue(item as CBORValue, options),
      );
    }
    if (Schema.is(CBORMapSchema)(value)) {
      const entries: [CBORValue, CBORValue][] = Array.from(value.entries()).map(
        ([key, val]) => [key, val],
      );
      return yield* encodeMap(entries, options, (item) =>
        encodeCBORValue(item as CBORValue, options),
      );
    }

    // Handle tagged values using schema guard
    if (Schema.is(CBORTaggedValueSchema)(value)) {
      const encodedValue = yield* encodeCBORValue(value.value, options);
      return yield* encodeTag(value.tag, encodedValue);
    }

    return yield* new CBORError({
      message: `Cannot encode CBORValue of type ${typeof value}`,
    });
  });

/**
 * Encodes a CBOR tag with the given value
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeTag = (
  tag: number,
  value: Uint8Array,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const chunks: Uint8Array[] = [];

    // Encode tag number using CBOR tag format
    if (tag < 24) {
      chunks.push(new Uint8Array([0xc0 + tag])); // Major type 6, additional info tag
    } else if (tag < 256) {
      chunks.push(new Uint8Array([0xd8, tag])); // Major type 6, 1-byte tag
    } else if (tag < 65536) {
      chunks.push(new Uint8Array([0xd9, tag >> 8, tag & 0xff])); // Major type 6, 2-byte tag
    } else {
      return yield* new CBORError({ message: `Tag ${tag} too large` });
    }

    chunks.push(value);

    // Combine chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  });

/**
 * Encodes a map using configurable encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeMap = (
  entries: readonly [any, any][],
  options: CBOREncodingOptions,
  encodeFn: (data: unknown) => Effect.Effect<Uint8Array, CBORError>,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const useIndefinite = shouldUseIndefiniteMaps(options, entries.length);

    if (useIndefinite) {
      // Indefinite map encoding
      const chunks: Uint8Array[] = [];
      chunks.push(new Uint8Array([0xbf])); // Indefinite map start

      // Encode each key-value pair
      for (const [key, value] of entries) {
        const encodedKey = yield* encodeFn(key);
        const encodedValue = yield* encodeFn(value);
        chunks.push(encodedKey);
        chunks.push(encodedValue);
      }

      chunks.push(new Uint8Array([0xff])); // Indefinite map end

      // Combine chunks
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return result;
    } else {
      // // Definite map encoding
      // const encodedPairs: Uint8Array[] = [];

      // // Encode all key-value pairs
      // for (const { key, value } of entries) {
      //   const encodedKey = yield* encodeFn(key);
      //   const encodedValue = yield* encodeFn(value);
      //   encodedPairs.push(encodedKey);
      //   encodedPairs.push(encodedValue);
      // }
      // Definite map encoding
      const encodedPairs: Uint8Array[] = [];

      // If canonical encoding is requested, sort by encoded keys
      if (options._tag === "canonical") {
        const entriesWithEncodedKeys: {
          key: unknown;
          value: unknown;
          encodedKey: Uint8Array;
        }[] = [];
        for (const [key, value] of entries) {
          const encodedKey = yield* encodeFn(key);
          entriesWithEncodedKeys.push({ key, value, encodedKey });
        }

        // Sort by encoded key bytes (lexicographic order)
        entriesWithEncodedKeys.sort((a, b) => {
          return a.encodedKey.length - b.encodedKey.length;
        });

        // Add pre-encoded keys and encode values
        for (const { encodedKey, value } of entriesWithEncodedKeys) {
          const encodedValue = yield* encodeFn(value);
          encodedPairs.push(encodedKey);
          encodedPairs.push(encodedValue);
        }
      } else {
        // Normal encoding without sorting
        for (const [key, value] of entries) {
          const encodedKey = yield* encodeFn(key);
          const encodedValue = yield* encodeFn(value);
          encodedPairs.push(encodedKey);
          encodedPairs.push(encodedValue);
        }
      }

      // Encode map length
      const mapLength = entries.length;
      let mapHeader: Uint8Array;

      if (mapLength < 24) {
        mapHeader = new Uint8Array([0xa0 + mapLength]); // Major type 5, direct length
      } else if (mapLength < 256) {
        mapHeader = new Uint8Array([0xb8, mapLength]); // Major type 5, 1-byte length
      } else if (mapLength < 65536) {
        mapHeader = new Uint8Array([0xb9, mapLength >> 8, mapLength & 0xff]); // Major type 5, 2-byte length
      } else if (mapLength < 4294967296) {
        // 4-byte length (26 = 0xba)
        mapHeader = new Uint8Array([
          0xba,
          (mapLength >> 24) & 0xff,
          (mapLength >> 16) & 0xff,
          (mapLength >> 8) & 0xff,
          mapLength & 0xff,
        ]); // Major type 5, 4-byte length
      } else if (mapLength < Number.MAX_SAFE_INTEGER) {
        // 8-byte length (27 = 0xbb) - using safe limit below Number.MAX_SAFE_INTEGER
        const mapLengthBig = BigInt(mapLength);
        mapHeader = new Uint8Array([
          0xbb,
          Number((mapLengthBig >> 56n) & 0xffn),
          Number((mapLengthBig >> 48n) & 0xffn),
          Number((mapLengthBig >> 40n) & 0xffn),
          Number((mapLengthBig >> 32n) & 0xffn),
          Number((mapLengthBig >> 24n) & 0xffn),
          Number((mapLengthBig >> 16n) & 0xffn),
          Number((mapLengthBig >> 8n) & 0xffn),
          Number(mapLengthBig & 0xffn),
        ]); // Major type 5, 8-byte length
      } else {
        return yield* new CBORError({ message: `Map too large: ${mapLength}` });
      }

      // Combine header and pairs
      const totalLength =
        mapHeader.length +
        encodedPairs.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;

      result.set(mapHeader, offset);
      offset += mapHeader.length;

      for (const chunk of encodedPairs) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return result;
    }
  });

/**
 * Encodes an array using configurable encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeArray = <A>(
  items: readonly A[],
  options: CBOREncodingOptions,
  encodeFn: (data: A) => Effect.Effect<Uint8Array, CBORError>,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const useIndefinite = shouldUseIndefiniteArrays(options, items.length);

    if (useIndefinite) {
      // Indefinite array encoding
      const chunks: Uint8Array[] = [];
      chunks.push(new Uint8Array([0x9f])); // Indefinite array start

      // Encode each item
      for (const item of items) {
        const encoded = yield* encodeFn(item);
        chunks.push(encoded);
      }

      chunks.push(new Uint8Array([0xff])); // Indefinite array end

      // Combine chunks
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return result;
    } else {
      // Definite array encoding
      const encodedItems: Uint8Array[] = [];
      for (const item of items) {
        const encoded = yield* encodeFn(item);
        encodedItems.push(encoded);
      }

      // Encode array length
      const arrayLength = items.length;
      let arrayHeader: Uint8Array;

      if (arrayLength < 24) {
        arrayHeader = new Uint8Array([0x80 + arrayLength]); // Major type 4, direct length
      } else if (arrayLength < 256) {
        arrayHeader = new Uint8Array([0x98, arrayLength]); // Major type 4, 1-byte length
      } else if (arrayLength < 65536) {
        arrayHeader = new Uint8Array([
          0x99,
          arrayLength >> 8,
          arrayLength & 0xff,
        ]); // Major type 4, 2-byte length
      } else if (arrayLength < 4294967296) {
        // 4-byte length (26 = 0x9a)
        arrayHeader = new Uint8Array([
          0x9a,
          (arrayLength >> 24) & 0xff,
          (arrayLength >> 16) & 0xff,
          (arrayLength >> 8) & 0xff,
          arrayLength & 0xff,
        ]); // Major type 4, 4-byte length
      } else if (arrayLength < Number.MAX_SAFE_INTEGER) {
        // 8-byte length (27 = 0x9b) - using safe limit below Number.MAX_SAFE_INTEGER
        const arrayLengthBig = BigInt(arrayLength);
        arrayHeader = new Uint8Array([
          0x9b,
          Number((arrayLengthBig >> 56n) & 0xffn),
          Number((arrayLengthBig >> 48n) & 0xffn),
          Number((arrayLengthBig >> 40n) & 0xffn),
          Number((arrayLengthBig >> 32n) & 0xffn),
          Number((arrayLengthBig >> 24n) & 0xffn),
          Number((arrayLengthBig >> 16n) & 0xffn),
          Number((arrayLengthBig >> 8n) & 0xffn),
          Number(arrayLengthBig & 0xffn),
        ]); // Major type 4, 8-byte length
      } else {
        return yield* new CBORError({
          message: `Array too large: ${arrayLength}`,
        });
      }

      // Combine header and items
      const totalLength =
        arrayHeader.length +
        encodedItems.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;

      result.set(arrayHeader, offset);
      offset += arrayHeader.length;

      for (const chunk of encodedItems) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return result;
    }
  });

/**
 * Encodes a number using the most compact CBOR representation
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeCompactNumber = (
  value: number | bigint,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    // Convert to number if it's a safe integer
    const numValue =
      typeof value === "bigint"
        ? value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
          ? Number(value)
          : value
        : value;

    // For small integers, use direct encoding
    if (
      typeof numValue === "number" &&
      Number.isInteger(numValue) &&
      numValue >= 0
    ) {
      if (numValue < 24) {
        // Direct encoding in additional info (0-23)
        return new Uint8Array([numValue]);
      } else if (numValue < 256) {
        // 1-byte unsigned integer (24 = 0x18)
        return new Uint8Array([0x18, numValue]);
      } else if (numValue < 65536) {
        // 2-byte unsigned integer (25 = 0x19)
        return new Uint8Array([0x19, numValue >> 8, numValue & 0xff]);
      } else if (numValue < 4294967296) {
        // 4-byte unsigned integer (26 = 0x1a)
        return new Uint8Array([
          0x1a,
          (numValue >> 24) & 0xff,
          (numValue >> 16) & 0xff,
          (numValue >> 8) & 0xff,
          numValue & 0xff,
        ]);
      }
    }

    // For larger numbers or negative numbers, use custom BigInt encoding
    return yield* encodeBigInt(
      typeof value === "bigint" ? value : BigInt(value),
    );
  });

/**
 * Encodes a BigInt value using proper CBOR integer encoding
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeBigInt = (
  value: bigint,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const MAX_SAFE_UINT64 = 18446744073709551615n; // 2^64 - 1

    if (value >= 0n) {
      // Positive integer
      if (value <= MAX_SAFE_UINT64) {
        // Can be represented as standard CBOR integer
        return encodeUnsignedInteger(value);
      } else {
        // Use CBOR tag 2 (positive bignum) for large integers
        return yield* encodePositiveBignum(value);
      }
    } else {
      // Negative integer
      const absoluteValue = -value - 1n;
      if (absoluteValue <= MAX_SAFE_UINT64) {
        // Can be represented as standard CBOR negative integer
        return encodeNegativeInteger(absoluteValue);
      } else {
        // Use CBOR tag 3 (negative bignum) for large negative integers
        // For CBOR tag 3, we encode -(value + 1) as the absolute value
        return yield* encodeNegativeBignum(-value - 1n);
      }
    }
  });

/**
 * Encodes an unsigned integer (major type 0)
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeUnsignedInteger = (value: bigint): Uint8Array => {
  if (value < 24n) {
    // Direct encoding in additional info (0-23)
    return new Uint8Array([Number(value)]);
  } else if (value < 256n) {
    // 1-byte unsigned integer (24 = 0x18)
    return new Uint8Array([0x18, Number(value)]);
  } else if (value < 65536n) {
    // 2-byte unsigned integer (25 = 0x19)
    return new Uint8Array([0x19, Number(value >> 8n), Number(value & 0xffn)]);
  } else if (value < 4294967296n) {
    // 4-byte unsigned integer (26 = 0x1a)
    return new Uint8Array([
      0x1a,
      Number((value >> 24n) & 0xffn),
      Number((value >> 16n) & 0xffn),
      Number((value >> 8n) & 0xffn),
      Number(value & 0xffn),
    ]);
  } else {
    // 8-byte unsigned integer (27 = 0x1b)
    return new Uint8Array([
      0x1b,
      Number((value >> 56n) & 0xffn),
      Number((value >> 48n) & 0xffn),
      Number((value >> 40n) & 0xffn),
      Number((value >> 32n) & 0xffn),
      Number((value >> 24n) & 0xffn),
      Number((value >> 16n) & 0xffn),
      Number((value >> 8n) & 0xffn),
      Number(value & 0xffn),
    ]);
  }
};

/**
 * Encodes a negative integer (major type 1)
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeNegativeInteger = (value: bigint): Uint8Array => {
  if (value < 24n) {
    // Direct encoding in additional info (0-23) with major type 1
    return new Uint8Array([0x20 + Number(value)]);
  } else if (value < 256n) {
    // 1-byte negative integer (24 = 0x18) with major type 1
    return new Uint8Array([0x38, Number(value)]);
  } else if (value < 65536n) {
    // 2-byte negative integer (25 = 0x19) with major type 1
    return new Uint8Array([0x39, Number(value >> 8n), Number(value & 0xffn)]);
  } else if (value < 4294967296n) {
    // 4-byte negative integer (26 = 0x1a) with major type 1
    return new Uint8Array([
      0x3a,
      Number((value >> 24n) & 0xffn),
      Number((value >> 16n) & 0xffn),
      Number((value >> 8n) & 0xffn),
      Number(value & 0xffn),
    ]);
  } else {
    // 8-byte negative integer (27 = 0x1b) with major type 1
    return new Uint8Array([
      0x3b,
      Number((value >> 56n) & 0xffn),
      Number((value >> 48n) & 0xffn),
      Number((value >> 40n) & 0xffn),
      Number((value >> 32n) & 0xffn),
      Number((value >> 24n) & 0xffn),
      Number((value >> 16n) & 0xffn),
      Number((value >> 8n) & 0xffn),
      Number(value & 0xffn),
    ]);
  }
};

/**
 * Encodes a positive big integer using CBOR tag 2 (positive bignum)
 *
 * @since 2.0.0
 * @category encoding
 */
const encodePositiveBignum = (
  value: bigint,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    // Convert BigInt to minimal byte representation
    const bytes = bigintToBytes(value);

    // Encode the byte string
    const byteStringBytes = yield* encodeByteString(bytes);

    // Wrap with CBOR tag 2 (positive bignum)
    return yield* encodeTag(2, byteStringBytes);
  });

/**
 * Encodes a negative big integer using CBOR tag 3 (negative bignum)
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeNegativeBignum = (
  value: bigint,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    // For CBOR tag 3, the value should already be processed as -(original + 1)
    // Convert BigInt to minimal byte representation
    const bytes = bigintToBytes(value);

    // Encode the byte string
    const byteStringBytes = yield* encodeByteString(bytes);

    // Wrap with CBOR tag 3 (negative bignum)
    return yield* encodeTag(3, byteStringBytes);
  });

/**
 * Converts a BigInt to a byte array in big-endian format
 *
 * @since 2.0.0
 * @category encoding
 */
const bigintToBytes = (value: bigint): Uint8Array => {
  if (value === 0n) {
    return new Uint8Array([0]);
  }

  const bytes: number[] = [];
  let remaining = value;

  while (remaining > 0n) {
    bytes.unshift(Number(remaining & 0xffn));
    remaining >>= 8n;
  }

  return new Uint8Array(bytes);
};

/**
 * Encodes a byte string using CBOR major type 2
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeByteString = (
  bytes: Uint8Array,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const length = bytes.length;
    let headerBytes: Uint8Array;

    if (length < 24) {
      // Direct encoding in additional info (0-23)
      headerBytes = new Uint8Array([0x40 + length]);
    } else if (length < 256) {
      // 1-byte length (24 = 0x58)
      headerBytes = new Uint8Array([0x58, length]);
    } else if (length < 65536) {
      // 2-byte length (25 = 0x59)
      headerBytes = new Uint8Array([0x59, length >> 8, length & 0xff]);
    } else if (length < 4294967296) {
      // 4-byte length (26 = 0x5a)
      headerBytes = new Uint8Array([
        0x5a,
        (length >> 24) & 0xff,
        (length >> 16) & 0xff,
        (length >> 8) & 0xff,
        length & 0xff,
      ]);
    } else {
      return yield* new CBORError({
        message: `Byte string too long: ${length}`,
      });
    }

    // Combine header and data
    const result = new Uint8Array(headerBytes.length + bytes.length);
    result.set(headerBytes, 0);
    result.set(bytes, headerBytes.length);

    return result;
  });

/**
 * Encodes a text string using CBOR major type 3
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeTextString = (
  utf8Bytes: Uint8Array,
): Effect.Effect<Uint8Array, CBORError> =>
  Effect.gen(function* () {
    const length = utf8Bytes.length;
    let headerBytes: Uint8Array;

    if (length < 24) {
      // Direct encoding in additional info (0-23)
      headerBytes = new Uint8Array([0x60 + length]);
    } else if (length < 256) {
      // 1-byte length (24 = 0x78)
      headerBytes = new Uint8Array([0x78, length]);
    } else if (length < 65536) {
      // 2-byte length (25 = 0x79)
      headerBytes = new Uint8Array([0x79, length >> 8, length & 0xff]);
    } else if (length < 4294967296) {
      // 4-byte length (26 = 0x7a)
      headerBytes = new Uint8Array([
        0x7a,
        (length >> 24) & 0xff,
        (length >> 16) & 0xff,
        (length >> 8) & 0xff,
        length & 0xff,
      ]);
    } else {
      return yield* new CBORError({
        message: `Text string too long: ${length}`,
      });
    }

    // Combine header and data
    const result = new Uint8Array(headerBytes.length + utf8Bytes.length);
    result.set(headerBytes, 0);
    result.set(utf8Bytes, headerBytes.length);

    return result;
  });

/**
 * CBOR decoder state for functional decoding
 *
 * @since 2.0.0
 * @category model
 */
interface CBORDecoderState {
  readonly bytes: Uint8Array;
  readonly pos: number;
}

/**
 * Helper function to convert bytes to BigInt
 *
 * @since 2.0.0
 * @category decoding
 */
const bytesToBigInt = (bytes: Uint8Array): bigint => {
  let result = 0n;
  for (let i = 0; i < bytes.length; i++) {
    result = (result << 8n) | BigInt(bytes[i]);
  }
  return result;
};

/**
 * Helper function to decode IEEE 754 half-precision float
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeHalf = (value: number): number => {
  // IEEE 754 half-precision float decoding
  const sign = (value & 0x8000) >> 15;
  const exponent = (value & 0x7c00) >> 10;
  const fraction = value & 0x03ff;

  if (exponent === 0) {
    return (sign ? -1 : 1) * Math.pow(2, -14) * (fraction / 1024);
  } else if (exponent === 0x1f) {
    return fraction ? NaN : sign ? -Infinity : Infinity;
  } else {
    return (sign ? -1 : 1) * Math.pow(2, exponent - 15) * (1 + fraction / 1024);
  }
};

/**
 * Read a single byte from the decoder state
 *
 * @since 2.0.0
 * @category decoding
 */
const readByte = (
  state: CBORDecoderState,
): Effect.Effect<readonly [number, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (state.pos >= state.bytes.length) {
      return yield* new CBORError({ message: "Unexpected end of CBOR data" });
    }
    const value = state.bytes[state.pos];
    const newState = { ...state, pos: state.pos + 1 };
    return [value, newState] as const;
  });

/**
 * Read a 16-bit unsigned integer from the decoder state
 *
 * @since 2.0.0
 * @category decoding
 */
const readUint16 = (
  state: CBORDecoderState,
): Effect.Effect<readonly [number, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (state.pos + 2 > state.bytes.length) {
      return yield* new CBORError({ message: "Unexpected end of CBOR data" });
    }
    const value = (state.bytes[state.pos] << 8) | state.bytes[state.pos + 1];
    const newState = { ...state, pos: state.pos + 2 };
    return [value, newState] as const;
  });

/**
 * Read a 32-bit unsigned integer from the decoder state
 *
 * @since 2.0.0
 * @category decoding
 */
const readUint32 = (
  state: CBORDecoderState,
): Effect.Effect<readonly [number, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (state.pos + 4 > state.bytes.length) {
      return yield* new CBORError({ message: "Unexpected end of CBOR data" });
    }
    const value =
      (state.bytes[state.pos] << 24) |
      (state.bytes[state.pos + 1] << 16) |
      (state.bytes[state.pos + 2] << 8) |
      state.bytes[state.pos + 3];
    const newState = { ...state, pos: state.pos + 4 };
    return [value >>> 0, newState] as const; // Convert to unsigned 32-bit
  });

/**
 * Read a 64-bit unsigned integer from the decoder state
 *
 * @since 2.0.0
 * @category decoding
 */
const readUint64 = (
  state: CBORDecoderState,
): Effect.Effect<readonly [bigint, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (state.pos + 8 > state.bytes.length) {
      return yield* new CBORError({ message: "Unexpected end of CBOR data" });
    }

    let result = 0n;
    for (let i = 0; i < 8; i++) {
      result = (result << 8n) | BigInt(state.bytes[state.pos + i]);
    }
    const newState = { ...state, pos: state.pos + 8 };
    return [result, newState] as const;
  });

/**
 * Decode an unsigned integer from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeUnsignedInt = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [bigint, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (additionalInfo < 24) {
      return [BigInt(additionalInfo), state] as const;
    } else if (additionalInfo === 24) {
      const [byte, newState] = yield* readByte(state);
      return [BigInt(byte), newState] as const;
    } else if (additionalInfo === 25) {
      const [uint16, newState] = yield* readUint16(state);
      return [BigInt(uint16), newState] as const;
    } else if (additionalInfo === 26) {
      const [uint32, newState] = yield* readUint32(state);
      return [BigInt(uint32), newState] as const;
    } else if (additionalInfo === 27) {
      return yield* readUint64(state);
    } else {
      return yield* new CBORError({
        message: `Invalid additional info for unsigned int: ${additionalInfo}`,
      });
    }
  });

/**
 * Decode a negative integer from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeNegativeInt = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [bigint, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    const [value, newState] = yield* decodeUnsignedInt(additionalInfo, state);
    return [-(value + 1n), newState] as const;
  });

/**
 * Decode a byte string from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeByteString = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [Uint8Array, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (additionalInfo === 31) {
      // Indefinite length byte string
      const chunks: Uint8Array[] = [];
      let currentState = state;

      while (true) {
        if (currentState.pos >= currentState.bytes.length) {
          return yield* new CBORError({
            message: "Missing break (0xff) at end of indefinite byte string",
          });
        }

        const firstByte = currentState.bytes[currentState.pos];
        const majorType = firstByte >> 5;
        const addInfo = firstByte & 0x1f;

        // Check for break (0xFF)
        if (firstByte === 0xff) {
          currentState = { ...currentState, pos: currentState.pos + 1 };
          break;
        }

        // Must be a byte string
        if (majorType !== 2) {
          return yield* new CBORError({
            message: "Invalid data in indefinite byte string",
          });
        }

        const stateAfterByte = { ...currentState, pos: currentState.pos + 1 };
        if (
          stateAfterByte.pos < stateAfterByte.bytes.length &&
          stateAfterByte.bytes[stateAfterByte.pos] === 0xff
        ) {
          return yield* new CBORError({
            message: "Unexpected break in byte string context",
          });
        }
        const [chunk, newState] = yield* decodeByteString(
          addInfo,
          stateAfterByte,
        );
        chunks.push(chunk);
        currentState = newState;
      }

      // Combine all chunks
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return [result, currentState] as const;
    } else {
      // Definite length byte string
      const [lengthBigInt, newState] = yield* decodeUnsignedInt(
        additionalInfo,
        state,
      );
      const length = Number(lengthBigInt);

      if (newState.pos + length > newState.bytes.length) {
        return yield* new CBORError({
          message: "Insufficient bytes for byte string",
        });
      }

      const result = newState.bytes.slice(newState.pos, newState.pos + length);
      const finalState = { ...newState, pos: newState.pos + length };
      return [result, finalState] as const;
    }
  });

/**
 * Decode a text string from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeTextString = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [string, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (additionalInfo === 31) {
      // Indefinite length text string
      const chunks: string[] = [];
      let currentState = state;

      let foundBreak = false;
      while (true) {
        if (currentState.pos >= currentState.bytes.length) {
          break;
        }

        const firstByte = currentState.bytes[currentState.pos];
        const majorType = firstByte >> 5;
        const addInfo = firstByte & 0x1f;

        // Check for break (0xFF)
        if (firstByte === 0xff) {
          currentState = { ...currentState, pos: currentState.pos + 1 };
          foundBreak = true;
          break;
        }

        // Must be a text string
        if (majorType !== 3) {
          return yield* new CBORError({
            message: "Invalid data in indefinite text string",
          });
        }

        const stateAfterByte = { ...currentState, pos: currentState.pos + 1 };
        if (
          stateAfterByte.pos < stateAfterByte.bytes.length &&
          stateAfterByte.bytes[stateAfterByte.pos] === 0xff
        ) {
          return yield* new CBORError({
            message: "Unexpected break in text string context",
          });
        }
        const [chunk, newState] = yield* decodeTextString(
          addInfo,
          stateAfterByte,
        );
        chunks.push(chunk);
        currentState = newState;
      }
      if (!foundBreak) {
        return yield* new CBORError({
          message: "Missing break (0xff) at end of indefinite text string",
        });
      }
      // Combine all chunks
      const result = chunks.join("");
      return [result, currentState] as const;
    } else {
      // Definite length text string - use byte string decoder and convert to text
      const [lengthBigInt, newState] = yield* decodeUnsignedInt(
        additionalInfo,
        state,
      );
      const length = Number(lengthBigInt);

      if (newState.pos + length > newState.bytes.length) {
        return yield* new CBORError({
          message: "Insufficient bytes for text string",
        });
      }

      const bytes = newState.bytes.slice(newState.pos, newState.pos + length);
      const finalState = { ...newState, pos: newState.pos + length };
      return [new TextDecoder().decode(bytes), finalState] as const;
    }
  });

/**
 * Decode a CBOR value from the decoder state
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeCBORValue = (
  state: CBORDecoderState,
): Effect.Effect<readonly [CBORValue, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (state.pos >= state.bytes.length) {
      return yield* new CBORError({ message: "Unexpected end of CBOR data" });
    }

    const firstByte = state.bytes[state.pos];
    const majorType = firstByte >> 5;
    const additionalInfo = firstByte & 0x1f;
    const stateAfterByte = { ...state, pos: state.pos + 1 };

    switch (majorType) {
      case 0: // Unsigned integer
        return yield* decodeUnsignedInt(additionalInfo, stateAfterByte);
      case 1: // Negative integer
        return yield* decodeNegativeInt(additionalInfo, stateAfterByte);
      case 2: // Byte string
        return yield* decodeByteString(additionalInfo, stateAfterByte);
      case 3: // Text string
        return yield* decodeTextString(additionalInfo, stateAfterByte);
      case 4: // Array
        return yield* decodeArray(additionalInfo, stateAfterByte);
      case 5: // Map
        return yield* decodeMap(additionalInfo, stateAfterByte);
      case 6: // Tag
        return yield* decodeTag(additionalInfo, stateAfterByte);
      case 7: // Float/simple/break
        return yield* decodeFloat(additionalInfo, stateAfterByte);
      default:
        return yield* new CBORError({
          message: `Unknown major type: ${majorType}`,
        });
    }
  });

/**
 * Decode a CBOR array from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeArray = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [CBORValue[], CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (additionalInfo === 31) {
      // Indefinite length array
      const result: CBORValue[] = [];
      let currentState = state;
      let foundBreak = false;
      while (currentState.pos < currentState.bytes.length) {
        const nextByte = currentState.bytes[currentState.pos];
        if (nextByte === 0xff) {
          currentState = { ...currentState, pos: currentState.pos + 1 };
          foundBreak = true;
          break;
        }
        const [item, newState] = yield* decodeCBORValue(currentState);
        if (
          newState.pos === currentState.pos &&
          currentState.bytes[currentState.pos] === 0xff
        ) {
          return yield* new CBORError({
            message: "Unexpected break in array context",
          });
        }
        result.push(item);
        currentState = newState;
      }
      if (!foundBreak) {
        return yield* new CBORError({
          message: "Missing break (0xff) at end of indefinite array",
        });
      }
      return [result, currentState] as const;
    } else {
      // Definite length array
      const [lengthBigInt, newState] = yield* decodeUnsignedInt(
        additionalInfo,
        state,
      );
      const length = Number(lengthBigInt);
      const result: CBORValue[] = [];
      let currentState = newState;
      for (let i = 0; i < length; i++) {
        const [item, nextState] = yield* decodeCBORValue(currentState);
        result.push(item);
        currentState = nextState;
      }
      return [result, currentState] as const;
    }
  });

/**
 * Decode a CBOR map from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeMap = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<
  readonly [Map<CBORValue, CBORValue>, CBORDecoderState],
  CBORError
> =>
  Effect.gen(function* () {
    const result = new Map<CBORValue, CBORValue>();

    if (additionalInfo === 31) {
      // Indefinite length map
      let currentState = state;
      let foundBreak = false;
      while (currentState.pos < currentState.bytes.length) {
        const nextByte = currentState.bytes[currentState.pos];
        if (nextByte === 0xff) {
          currentState = { ...currentState, pos: currentState.pos + 1 };
          foundBreak = true;
          break;
        }
        // decode key
        const [key, stateAfterKey] = yield* decodeCBORValue(currentState);
        // If we reach a break after a key, that's an error: missing value for map key
        if (
          stateAfterKey.pos < stateAfterKey.bytes.length &&
          stateAfterKey.bytes[stateAfterKey.pos] === 0xff
        ) {
          return yield* new CBORError({
            message: `Unexpected break in map context: missing value for key ${typeof key === "string" ? '"' + key + '"' : String(key)}`,
          });
        }
        // decode value
        if (stateAfterKey.pos >= stateAfterKey.bytes.length) {
          return yield* new CBORError({
            message: `Unexpected end of CBOR data in map context: missing value for key ${typeof key === "string" ? '"' + key + '"' : String(key)}`,
          });
        }
        const [value, stateAfterValue] = yield* decodeCBORValue(stateAfterKey);
        result.set(key, value);
        currentState = stateAfterValue;
      }
      if (!foundBreak) {
        return yield* new CBORError({
          message: "Missing break (0xff) at end of indefinite map",
        });
      }
      return [result, currentState] as const;
    } else {
      // Definite length map
      const [lengthBigInt, newState] = yield* decodeUnsignedInt(
        additionalInfo,
        state,
      );
      const length = Number(lengthBigInt);
      let currentState = newState;
      for (let i = 0; i < length; i++) {
        const [key, stateAfterKey] = yield* decodeCBORValue(currentState);
        const [value, stateAfterValue] = yield* decodeCBORValue(stateAfterKey);
        result.set(key, value);
        currentState = stateAfterValue;
      }
      return [result, currentState] as const;
    }
  });

/**
 * Decode a CBOR tag from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeTag = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [CBORValue, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    const [tagBigInt, stateAfterTag] = yield* decodeUnsignedInt(
      additionalInfo,
      state,
    );
    const tag = Number(tagBigInt);
    const [value, finalState] = yield* decodeCBORValue(stateAfterTag);

    // Handle standard CBOR tags
    if (tag === 2) {
      // Positive bignum
      if (value instanceof Uint8Array) {
        return [bytesToBigInt(value), finalState] as const;
      }
      return yield* new CBORError({ message: "Invalid positive bignum value" });
    } else if (tag === 3) {
      // Negative bignum
      if (value instanceof Uint8Array) {
        return [-(bytesToBigInt(value) + 1n), finalState] as const;
      }
      return yield* new CBORError({ message: "Invalid negative bignum value" });
    }

    // For all other tags, return a tagged value object
    return [
      {
        tag: tag,
        value: value,
      },
      finalState,
    ] as const;
  });

/**
 * Decode a CBOR float/simple value from additional info
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeFloat = (
  additionalInfo: number,
  state: CBORDecoderState,
): Effect.Effect<readonly [CBORValue, CBORDecoderState], CBORError> =>
  Effect.gen(function* () {
    if (additionalInfo <= 19) {
      // Simple values 0-19 (encoded directly in additional info)
      return [additionalInfo, state] as const;
    } else if (additionalInfo === 20) {
      return [false, state] as const;
    } else if (additionalInfo === 21) {
      return [true, state] as const;
    } else if (additionalInfo === 22) {
      return [null, state] as const;
    } else if (additionalInfo === 23) {
      return [undefined, state] as const;
    } else if (additionalInfo === 24) {
      const [value, newState] = yield* readByte(state);
      // Simple values 32-255 (values 0-31 are encoded differently but still valid here)
      return [value, newState] as const;
    } else if (additionalInfo === 25) {
      // Half-precision float
      const [value, newState] = yield* readUint16(state);
      const floatVal = decodeHalf(value);
      // Always return a number for floats, never bigint
      return [floatVal, newState] as const;
    } else if (additionalInfo === 26) {
      // Single-precision float
      const [value, newState] = yield* readUint32(state);
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint32(0, value, false);
      const floatVal = view.getFloat32(0, false);
      return [floatVal, newState] as const;
    } else if (additionalInfo === 27) {
      // Double-precision float
      const [value, newState] = yield* readUint64(state);
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setBigUint64(0, value, false);
      const floatVal = view.getFloat64(0, false);
      return [floatVal, newState] as const;
    } else if (additionalInfo === 31) {
      // Break - should only be encountered when parsing indefinite structures
      return yield* new CBORError({
        message: "Unexpected break in float context",
      });
    } else {
      return yield* new CBORError({
        message: `Invalid additional info for float: ${additionalInfo}`,
      });
    }
  });

/**
 * Decode CBOR bytes to a CBORValue
 *
 * @since 2.0.0
 * @category decoding
 */
const decodeCBORBytes = (
  bytes: Uint8Array,
): Effect.Effect<CBORValue, CBORError> =>
  Effect.gen(function* () {
    const initialState: CBORDecoderState = { bytes, pos: 0 };
    const [value, finalState] = yield* decodeCBORValue(initialState);
    if (finalState.pos !== bytes.length) {
      return yield* new CBORError({
        message: `Extra bytes found after valid CBOR value: pos ${finalState.pos} != length ${bytes.length}`,
      });
    }
    return value;
  });

/**
 * Convert integers to appropriate type based on options
 * Always keeps floating-point values (including NaN, Infinity) as numbers
 *
 * @since 2.0.0
 * @category decoding
 */
const convertIntegersIfNeeded = (
  value: CBORValue,
  options: CBOREncodingOptions,
): CBORValue => {
  if (!options.integersAsBigInt) {
    return convertBigIntsToNumbers(value);
  }
  // Always convert floating-point values to numbers, even when integersAsBigInt is true
  return convertFloatsToNumbers(value);
};

/**
 * Convert bigints to numbers when they fit safely in JavaScript number range
 *
 * @since 2.0.0
 * @category decoding
 */
const convertBigIntsToNumbers = (value: CBORValue): CBORValue => {
  if (typeof value === "bigint") {
    // Convert to number if it fits in safe integer range
    if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
      return Number(value);
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(convertBigIntsToNumbers) as readonly CBORValue[];
  }

  if (value instanceof Map) {
    const newMap = new Map<CBORValue, CBORValue>();
    for (const [k, v] of value) {
      newMap.set(convertBigIntsToNumbers(k), convertBigIntsToNumbers(v));
    }
    return newMap;
  }

  if (
    value &&
    typeof value === "object" &&
    "tag" in value &&
    "value" in value
  ) {
    return {
      tag: value.tag,
      value: convertBigIntsToNumbers(value.value),
    } as CBORTaggedValue;
  }

  return value;
};

/**
 * Convert floating-point values to numbers while keeping integers as bigint
 * This ensures NaN, Infinity, and -Infinity are always returned as JavaScript numbers
 *
 * @since 2.0.0
 * @category decoding
 */
const convertFloatsToNumbers = (value: CBORValue): CBORValue => {
  // Keep floating-point numbers as numbers (including NaN, Infinity, -Infinity)
  if (typeof value === "number") {
    return value;
  }

  // Keep bigints as bigints (integers)
  if (typeof value === "bigint") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(convertFloatsToNumbers) as readonly CBORValue[];
  }

  if (value instanceof Map) {
    const newMap = new Map<CBORValue, CBORValue>();
    for (const [k, v] of value) {
      newMap.set(convertFloatsToNumbers(k), convertFloatsToNumbers(v));
    }
    return newMap;
  }

  if (
    value &&
    typeof value === "object" &&
    "tag" in value &&
    "value" in value
  ) {
    return {
      tag: value.tag,
      value: convertFloatsToNumbers(value.value),
    } as CBORTaggedValue;
  }

  return value;
};

/**
 * Type representing all valid CBOR values
 *
 * @since 2.0.0
 * @category model
 */
export type CBORValue =
  | bigint
  | string
  | Uint8Array
  | boolean
  | null
  | undefined
  | number
  | readonly CBORValue[]
  | ReadonlyMap<CBORValue, CBORValue>
  | CBORTaggedValue;

/**
 * Type representing a tagged CBOR value
 *
 * @since 2.0.0
 * @category model
 */
export interface CBORTaggedValue {
  readonly tag: number;
  readonly value: CBORValue;
}

/**
 * CBOR tagged value schema for tagged CBOR values
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORTaggedValueSchema = Schema.Struct({
  tag: Schema.Number,
  value: Schema.suspend(() => CBORValueSchema),
});

export const CBORArraySchema = Schema.Array(
  Schema.suspend(() => CBORValueSchema),
);

export const CBORMapSchema = Schema.ReadonlyMapFromSelf({
  key: Schema.suspend(() => CBORValueSchema),
  value: Schema.suspend(() => CBORValueSchema),
});

/**
 * CBOR value schema that represents all valid CBOR types
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORValueSchema: Schema.Schema<CBORValue> = Schema.Union(
  Schema.BigIntFromSelf, // Integers (positive and negative)
  Schema.String, // Text strings
  Schema.Uint8ArrayFromSelf, // Byte strings
  Schema.Boolean, // Boolean values
  Schema.Null, // Null
  Schema.Undefined, // Undefined
  Schema.Number, // Float values
  CBORArraySchema,
  CBORMapSchema,
  CBORTaggedValueSchema, // Tagged values
).annotations({
  identifier: "CBORValue",
});

/**
 * Core CBOR schema for transforming between Uint8Array and CBORValue
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) =>
  Schema.transformOrFail(Schema.Uint8ArrayFromSelf, CBORValueSchema, {
    strict: true,
    encode: (_, __, ast, toA) =>
      Effect.flatMap(encodeCBORValue(toA, options), (result) =>
        Effect.succeed(result),
      ).pipe(
        Effect.mapError(
          (error) =>
            new ParseResult.Type(
              ast,
              toA,
              `Failed to encode CBOR value: ${String(error)}`,
            ),
        ),
      ),
    decode: (_, __, ast, fromA) =>
      Effect.gen(function* () {
        if (fromA.length === 0) {
          return yield* ParseResult.fail(
            new ParseResult.Type(ast, fromA, "Empty CBOR bytes"),
          );
        }

        const decoded = yield* decodeCBORBytes(fromA).pipe(
          Effect.mapError(
            (error) =>
              new ParseResult.Type(
                ast,
                fromA,
                `Failed to decode CBOR bytes: ${String(error)}`,
              ),
          ),
        );

        // Apply integer conversion based on options
        return convertIntegersIfNeeded(decoded, options);
      }),
  });

/**
 * CBOR hex schema for transforming between hex strings and CBORValue
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) =>
  Schema.transformOrFail(Bytes.HexSchema, CBORValueSchema, {
    strict: true,
    encode: (_, __, ast, toA) =>
      Effect.flatMap(encodeCBORValue(toA, options), (bytes) =>
        Effect.succeed(Bytes.Encode.hex(bytes)),
      ).pipe(
        Effect.mapError(
          (error) =>
            new ParseResult.Type(
              ast,
              toA,
              `Failed to encode CBOR value: ${String(error)}`,
            ),
        ),
      ),
    decode: (_, __, ast, fromA) =>
      pipe(
        Effect.try({
          try: () => Bytes.Decode.hex(fromA),
          catch: (error) =>
            new ParseResult.Type(
              ast,
              fromA,
              `Invalid hex string: ${String(error)}`,
            ),
        }),
        Effect.flatMap((bytes) =>
          ParseResult.decode(CBORBytesSchema(options))(bytes),
        ),
      ),
  });

/**
 * CBOR encoding utilities with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encodeSync(CBORBytesSchema(options))(value),
  hex: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encodeSync(CBORHexSchema(options))(value),
};

/**
 * CBOR decoding utilities with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: (
    bytes: Uint8Array,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.decodeSync(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) =>
    Schema.decodeSync(CBORHexSchema(options))(hex),
};

export const EncodeEither = {
  bytes: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encodeEither(CBORBytesSchema(options))(value),
  hex: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encodeEither(CBORHexSchema(options))(value),
};

export const DecodeEither = {
  bytes: (
    bytes: Uint8Array,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.decodeEither(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) =>
    Schema.decodeEither(CBORHexSchema(options))(hex),
};

export const EncodeEffect = {
  bytes: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encode(CBORBytesSchema(options))(value),
  hex: (
    value: CBORValue,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.encode(CBORHexSchema(options))(value),
};

export const DecodeEffect = {
  bytes: (
    bytes: Uint8Array,
    options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
  ) => Schema.decode(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) =>
    Schema.decode(CBORHexSchema(options))(hex),
};
