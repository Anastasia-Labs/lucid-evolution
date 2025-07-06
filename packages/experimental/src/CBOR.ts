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
 * Base configuration options for CBOR encoding
 *
 * @since 2.0.0
 * @category model
 */
export interface BaseCBOREncodingOptions {
  /** Tag Uint8Array values */
  readonly tagUint8Array?: boolean;
  /** Use records for encoding */
  readonly useRecords?: boolean;
  /** Maps as objects */
  readonly mapsAsObjects?: boolean;
}

/**
 * Custom CBOR encoding mode with full control over encoding options
 *
 * @since 2.0.0
 * @category model
 */
export interface CustomCBOREncodingOptions extends BaseCBOREncodingOptions {
  readonly mode: "custom";
  /** Use indefinite length encoding for arrays */
  readonly useIndefiniteArrays?: boolean;
  /** Use indefinite length encoding for maps */
  readonly useIndefiniteMaps?: boolean;
  /** Use definite length encoding for empty collections (CML compatibility) */
  readonly useDefiniteForEmpty?: boolean;
}

/**
 * Canonical CBOR encoding mode for deterministic output
 *
 * @since 2.0.0
 * @category model
 */
export interface CanonicalCBOREncodingOptions extends BaseCBOREncodingOptions {
  readonly mode: "canonical";
}

/**
 * Configuration options for CBOR encoding
 *
 * @since 2.0.0
 * @category model
 */
export type CBOREncodingOptions =
  | CustomCBOREncodingOptions
  | CanonicalCBOREncodingOptions;

/**
 * Default CBOR encoding options for Cardano.
 * Uses custom mode with CML compatibility settings for legacy compatibility.
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_ENCODING_OPTIONS: CBOREncodingOptions = {
  mode: "custom",
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
  useIndefiniteArrays: true,
  useIndefiniteMaps: true,
  useDefiniteForEmpty: true, // CML compatibility: definite for empty collections
};

/**
 * Canonical CBOR encoding options for deterministic output.
 *
 * @since 2.0.0
 * @category constants
 */
export const CANONICAL_ENCODING_OPTIONS: CBOREncodingOptions = {
  mode: "canonical",
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
};

/**
 * Helper function to determine if arrays should use indefinite length encoding
 *
 * @since 2.0.0
 * @category utils
 */
const shouldUseIndefiniteArrays = (
  options: CBOREncodingOptions,
  arrayLength: number
): boolean => {
  switch (options.mode) {
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
  mapSize: number
): boolean => {
  switch (options.mode) {
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
  options: CBOREncodingOptions
): Uint8Array => {
  const chunks: Uint8Array[] = [];

  // Indefinite-length array marker (major type 4, additional info 31)
  chunks.push(new Uint8Array([0x9f])); // 0b100_11111

  // Encode each element with the same options (recursive)
  for (const item of array) {
    const encoded = encodeCBORValue(item as CBORValue, options);
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
};

/**
 * Encodes data using indefinite length maps
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeIndefiniteMap = (
  obj: Record<string, unknown>,
  options: CBOREncodingOptions
): Uint8Array => {
  const chunks: Uint8Array[] = [];

  // Indefinite-length map marker (major type 5, additional info 31)
  chunks.push(new Uint8Array([0xbf])); // 0b101_11111

  // Encode each key-value pair with the same options (recursive)
  for (const [key, value] of Object.entries(obj)) {
    const encodedKey = encodeCBORValue(key as CBORValue, options);
    const encodedValue = encodeCBORValue(value as CBORValue, options);
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
};

/**
 * Encodes a CBORValue back to bytes using the specified encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeCBORValue = (
  value: CBORValue,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS
): Uint8Array => {
  // Handle primitives
  if (typeof value === "bigint") {
    return encodeBigInt(value);
  }
  if (typeof value === "string") {
    const utf8Bytes = new TextEncoder().encode(value);
    return encodeTextString(utf8Bytes);
  }
  if (value instanceof Uint8Array) {
    if (options.tagUint8Array) {
      return encodeTag(64, encodeByteString(value));
    } else {
      return encodeByteString(value);
    }
  }
  if (typeof value === "boolean") {
    return new Uint8Array([value ? 0xf5 : 0xf4]);
  }
  if (value === null) {
    return new Uint8Array([0xf6]);
  }
  if (value === undefined) {
    return new Uint8Array([0xf7]);
  }
  if (typeof value === "number") {
    return encodeBigInt(BigInt(value));
  }

  // Handle complex types
  if (Array.isArray(value)) {
    return encodeArray(value, options, (item) =>
      encodeCBORValue(item as CBORValue, options)
    );
  }
  if (value instanceof Map) {
    const entries = Array.from(value.entries()).map(([key, val]) => ({
      key,
      value: val,
    }));
    return encodeMap(entries, options, (item) =>
      encodeCBORValue(item as CBORValue, options)
    );
  }

  // Handle tagged values
  if (typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Uint8Array) && !(value instanceof Map)) {
    const obj = value as CBORTaggedValue;
    if ("tag" in obj && "value" in obj && typeof obj.tag === "number") {
      const encodedValue = encodeCBORValue(obj.value, options);
      return encodeTag(obj.tag, encodedValue);
    }
  }

  throw new CBORError({
    message: `Cannot encode CBORValue of type ${typeof value}`,
  });
};





/**
 * Encodes a CBOR tag with the given value
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeTag = (tag: number, value: Uint8Array): Uint8Array => {
  const chunks: Uint8Array[] = [];

  // Encode tag number using CBOR tag format
  if (tag < 24) {
    chunks.push(new Uint8Array([0xc0 + tag])); // Major type 6, additional info tag
  } else if (tag < 256) {
    chunks.push(new Uint8Array([0xd8, tag])); // Major type 6, 1-byte tag
  } else if (tag < 65536) {
    chunks.push(new Uint8Array([0xd9, tag >> 8, tag & 0xff])); // Major type 6, 2-byte tag
  } else {
    throw new CBORError({ message: `Tag ${tag} too large` });
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
};

/**
 * Encodes a map using configurable encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeMap = (
  entries: readonly {
    readonly key: unknown;
    readonly value: unknown;
  }[],
  options: CBOREncodingOptions,
  encodeFn: (data: unknown) => Uint8Array
): Uint8Array => {
  const useIndefinite = shouldUseIndefiniteMaps(options, entries.length);

  if (useIndefinite) {
    // Indefinite map encoding
    const chunks: Uint8Array[] = [];
    chunks.push(new Uint8Array([0xbf])); // Indefinite map start

    // Encode each key-value pair
    for (const { key, value } of entries) {
      chunks.push(encodeFn(key));
      chunks.push(encodeFn(value));
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
    // Definite map encoding
    const encodedPairs: Uint8Array[] = [];

    // Encode all key-value pairs
    for (const { key, value } of entries) {
      encodedPairs.push(encodeFn(key));
      encodedPairs.push(encodeFn(value));
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
    } else {
      throw new CBORError({ message: `Map too large: ${mapLength}` });
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
};

/**
 * Encodes an array using configurable encoding options
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeArray = (
  items: readonly unknown[],
  options: CBOREncodingOptions,
  encodeFn: (data: unknown) => Uint8Array
): Uint8Array => {
  const useIndefinite = shouldUseIndefiniteArrays(options, items.length);

  if (useIndefinite) {
    // Indefinite array encoding
    const chunks: Uint8Array[] = [];
    chunks.push(new Uint8Array([0x9f])); // Indefinite array start

    // Encode each item
    for (const item of items) {
      chunks.push(encodeFn(item));
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
    const encodedItems = items.map(encodeFn);

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
    } else {
      throw new CBORError({ message: `Array too large: ${arrayLength}` });
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
};

/**
 * Encodes a number using the most compact CBOR representation
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeCompactNumber = (value: number | bigint): Uint8Array => {
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
  return encodeBigInt(typeof value === "bigint" ? value : BigInt(value));
};

/**
 * Encodes a BigInt value using proper CBOR integer encoding
 *
 * @since 2.0.0
 * @category encoding
 */
export const encodeBigInt = (value: bigint): Uint8Array => {
  const MAX_SAFE_UINT64 = 18446744073709551615n; // 2^64 - 1

  if (value >= 0n) {
    // Positive integer
    if (value <= MAX_SAFE_UINT64) {
      // Can be represented as standard CBOR integer
      return encodeUnsignedInteger(value);
    } else {
      // Use CBOR tag 2 (positive bignum) for large integers
      return encodePositiveBignum(value);
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
      return encodeNegativeBignum(-value - 1n);
    }
  }
};

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
const encodePositiveBignum = (value: bigint): Uint8Array => {
  // Convert BigInt to minimal byte representation
  const bytes = bigintToBytes(value);

  // Encode the byte string
  const byteStringBytes = encodeByteString(bytes);

  // Wrap with CBOR tag 2 (positive bignum)
  return encodeTag(2, byteStringBytes);
};

/**
 * Encodes a negative big integer using CBOR tag 3 (negative bignum)
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeNegativeBignum = (value: bigint): Uint8Array => {
  // For CBOR tag 3, the value should already be processed as -(original + 1)
  // Convert BigInt to minimal byte representation
  const bytes = bigintToBytes(value);

  // Encode the byte string
  const byteStringBytes = encodeByteString(bytes);

  // Wrap with CBOR tag 3 (negative bignum)
  return encodeTag(3, byteStringBytes);
};

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
const encodeByteString = (bytes: Uint8Array): Uint8Array => {
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
    throw new CBORError({ message: `Byte string too long: ${length}` });
  }

  // Combine header and data
  const result = new Uint8Array(headerBytes.length + bytes.length);
  result.set(headerBytes, 0);
  result.set(bytes, headerBytes.length);

  return result;
};

/**
 * Encodes a text string using CBOR major type 3
 *
 * @since 2.0.0
 * @category encoding
 */
const encodeTextString = (utf8Bytes: Uint8Array): Uint8Array => {
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
    throw new CBORError({ message: `Text string too long: ${length}` });
  }

  // Combine header and data
  const result = new Uint8Array(headerBytes.length + utf8Bytes.length);
  result.set(headerBytes, 0);
  result.set(utf8Bytes, headerBytes.length);

  return result;
};

/**
 * Custom CBOR decoder class that handles negative integers correctly using Effect
 *
 * @since 2.0.0
 * @category decoding
 */
class CBORDecoder {
  private pos = 0;

  constructor(private bytes: Uint8Array) {}

  decode(): Effect.Effect<CBORValue, CBORError> {
    return Effect.gen(this, function* () {
      if (this.pos >= this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Unexpected end of CBOR data" })
        );
      }

      const firstByte = this.bytes[this.pos++];
      const majorType = firstByte >> 5;
      const additionalInfo = firstByte & 0x1f;

      switch (majorType) {
        case 0: // Unsigned integer
          return yield* this.decodeUnsignedInt(additionalInfo);
        case 1: // Negative integer
          return yield* this.decodeNegativeInt(additionalInfo);
        case 2: // Byte string
          return yield* this.decodeByteString(additionalInfo);
        case 3: // Text string
          return yield* this.decodeTextString(additionalInfo);
        case 4: // Array
          return yield* this.decodeArray(additionalInfo);
        case 5: // Map
          return yield* this.decodeMap(additionalInfo);
        case 6: // Tag
          return yield* this.decodeTag(additionalInfo);
        case 7: // Float/simple/break
          return yield* this.decodeFloat(additionalInfo);
        default:
          return yield* Effect.fail(
            new CBORError({ message: `Unknown major type: ${majorType}` })
          );
      }
    });
  }

  private decodeUnsignedInt(
    additionalInfo: number
  ): Effect.Effect<bigint, CBORError> {
    return Effect.gen(this, function* () {
      if (additionalInfo < 24) {
        return BigInt(additionalInfo);
      } else if (additionalInfo === 24) {
        const byte = yield* this.readByte();
        return BigInt(byte);
      } else if (additionalInfo === 25) {
        const uint16 = yield* this.readUint16();
        return BigInt(uint16);
      } else if (additionalInfo === 26) {
        const uint32 = yield* this.readUint32();
        return BigInt(uint32);
      } else if (additionalInfo === 27) {
        return yield* this.readUint64();
      } else {
        return yield* Effect.fail(
          new CBORError({
            message: `Invalid additional info for unsigned int: ${additionalInfo}`,
          })
        );
      }
    });
  }

  private decodeNegativeInt(
    additionalInfo: number
  ): Effect.Effect<bigint, CBORError> {
    return Effect.gen(this, function* () {
      const value = yield* this.decodeUnsignedInt(additionalInfo);
      return -(value + 1n);
    });
  }

  private decodeByteString(
    additionalInfo: number
  ): Effect.Effect<Uint8Array, CBORError> {
    return Effect.gen(this, function* () {
      const lengthBigInt = yield* this.decodeUnsignedInt(additionalInfo);
      const length = Number(lengthBigInt);

      if (this.pos + length > this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Insufficient bytes for byte string" })
        );
      }

      const result = this.bytes.slice(this.pos, this.pos + length);
      this.pos += length;
      return result;
    });
  }

  private decodeTextString(
    additionalInfo: number
  ): Effect.Effect<string, CBORError> {
    return Effect.gen(this, function* () {
      const bytes = yield* this.decodeByteString(additionalInfo);
      return new TextDecoder().decode(bytes);
    });
  }

  private decodeArray(
    additionalInfo: number
  ): Effect.Effect<CBORValue[], CBORError> {
    return Effect.gen(this, function* () {
      if (additionalInfo === 31) {
        // Indefinite length array
        const result: CBORValue[] = [];
        while (this.pos < this.bytes.length) {
          const nextByte = this.bytes[this.pos];
          if (nextByte === 0xff) {
            this.pos++;
            break;
          }
          const item = yield* this.decode();
          result.push(item);
        }
        return result;
      } else {
        // Definite length array
        const lengthBigInt = yield* this.decodeUnsignedInt(additionalInfo);
        const length = Number(lengthBigInt);
        const result: CBORValue[] = [];
        for (let i = 0; i < length; i++) {
          const item = yield* this.decode();
          result.push(item);
        }
        return result;
      }
    });
  }

  private decodeMap(
    additionalInfo: number
  ): Effect.Effect<Map<CBORValue, CBORValue>, CBORError> {
    return Effect.gen(this, function* () {
      const result = new Map<CBORValue, CBORValue>();

      if (additionalInfo === 31) {
        // Indefinite length map
        while (this.pos < this.bytes.length) {
          const nextByte = this.bytes[this.pos];
          if (nextByte === 0xff) {
            this.pos++;
            break;
          }
          const key = yield* this.decode();
          const value = yield* this.decode();
          result.set(key, value);
        }
      } else {
        // Definite length map
        const lengthBigInt = yield* this.decodeUnsignedInt(additionalInfo);
        const length = Number(lengthBigInt);
        for (let i = 0; i < length; i++) {
          const key = yield* this.decode();
          const value = yield* this.decode();
          result.set(key, value);
        }
      }

      return result;
    });
  }

  private decodeTag(
    additionalInfo: number
  ): Effect.Effect<CBORValue, CBORError> {
    return Effect.gen(this, function* () {
      const tagBigInt = yield* this.decodeUnsignedInt(additionalInfo);
      const tag = Number(tagBigInt);
      const value = yield* this.decode();

      // Handle standard CBOR tags
      if (tag === 2) {
        // Positive bignum
        if (value instanceof Uint8Array) {
          return this.bytesToBigInt(value);
        }
        return yield* Effect.fail(
          new CBORError({ message: "Invalid positive bignum value" })
        );
      } else if (tag === 3) {
        // Negative bignum
        if (value instanceof Uint8Array) {
          return -(this.bytesToBigInt(value) + 1n);
        }
        return yield* Effect.fail(
          new CBORError({ message: "Invalid negative bignum value" })
        );
      }

      // For all other tags, return a tagged value object
      return {
        tag: tag,
        value: value,
      };
    });
  }

  private decodeFloat(
    additionalInfo: number
  ): Effect.Effect<CBORValue, CBORError> {
    return Effect.gen(this, function* () {
      if (additionalInfo === 20) {
        return false;
      } else if (additionalInfo === 21) {
        return true;
      } else if (additionalInfo === 22) {
        return null;
      } else if (additionalInfo === 23) {
        return undefined;
      } else if (additionalInfo === 24) {
        const value = yield* this.readByte();
        // Simple values
        return value;
      } else if (additionalInfo === 25) {
        // Half-precision float
        const value = yield* this.readUint16();
        return this.decodeHalf(value);
      } else if (additionalInfo === 26) {
        // Single-precision float
        const value = yield* this.readUint32();
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setUint32(0, value, false);
        return view.getFloat32(0, false);
      } else if (additionalInfo === 27) {
        // Double-precision float
        const value = yield* this.readUint64();
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setBigUint64(0, value, false);
        return view.getFloat64(0, false);
      } else {
        return yield* Effect.fail(
          new CBORError({
            message: `Invalid additional info for float: ${additionalInfo}`,
          })
        );
      }
    });
  }

  private readByte(): Effect.Effect<number, CBORError> {
    return Effect.gen(this, function* () {
      if (this.pos >= this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Unexpected end of CBOR data" })
        );
      }
      return this.bytes[this.pos++];
    });
  }

  private readUint16(): Effect.Effect<number, CBORError> {
    return Effect.gen(this, function* () {
      if (this.pos + 1 >= this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Unexpected end of CBOR data" })
        );
      }
      const value = (this.bytes[this.pos] << 8) | this.bytes[this.pos + 1];
      this.pos += 2;
      return value;
    });
  }

  private readUint32(): Effect.Effect<number, CBORError> {
    return Effect.gen(this, function* () {
      if (this.pos + 3 >= this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Unexpected end of CBOR data" })
        );
      }
      const value =
        (this.bytes[this.pos] << 24) |
        (this.bytes[this.pos + 1] << 16) |
        (this.bytes[this.pos + 2] << 8) |
        this.bytes[this.pos + 3];
      this.pos += 4;
      return value >>> 0; // Convert to unsigned 32-bit
    });
  }

  private readUint64(): Effect.Effect<bigint, CBORError> {
    return Effect.gen(this, function* () {
      if (this.pos + 7 >= this.bytes.length) {
        return yield* Effect.fail(
          new CBORError({ message: "Unexpected end of CBOR data" })
        );
      }

      let result = 0n;
      for (let i = 0; i < 8; i++) {
        result = (result << 8n) | BigInt(this.bytes[this.pos + i]);
      }
      this.pos += 8;
      return result;
    });
  }

  private bytesToBigInt(bytes: Uint8Array): bigint {
    let result = 0n;
    for (let i = 0; i < bytes.length; i++) {
      result = (result << 8n) | BigInt(bytes[i]);
    }
    return result;
  }

  private decodeHalf(value: number): number {
    // IEEE 754 half-precision float decoding
    const sign = (value & 0x8000) >> 15;
    const exponent = (value & 0x7c00) >> 10;
    const fraction = value & 0x03ff;

    if (exponent === 0) {
      return (sign ? -1 : 1) * Math.pow(2, -14) * (fraction / 1024);
    } else if (exponent === 0x1f) {
      return fraction ? NaN : sign ? -Infinity : Infinity;
    } else {
      return (
        (sign ? -1 : 1) * Math.pow(2, exponent - 15) * (1 + fraction / 1024)
      );
    }
  }
}

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

/**
 * CBOR value schema that represents all valid CBOR types
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORValueSchema: Schema.Schema<CBORValue> = 
  Schema.Union(
    Schema.BigIntFromSelf, // Integers (positive and negative)
    Schema.String, // Text strings
    Schema.Uint8ArrayFromSelf, // Byte strings
    Schema.Boolean, // Boolean values
    Schema.Null, // Null
    Schema.Undefined, // Undefined
    Schema.Number, // Float values
    Schema.Array(Schema.suspend(() => CBORValueSchema)), // Arrays
    Schema.ReadonlyMapFromSelf({
      key: Schema.suspend(() => CBORValueSchema),
      value: Schema.suspend(() => CBORValueSchema),
    }), // Maps
    CBORTaggedValueSchema // Tagged values
  )

/**
 * Core CBOR schema for transforming between Uint8Array and CBORValue
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) =>
  Schema.transformOrFail(
    Schema.Uint8ArrayFromSelf,
    CBORValueSchema,
    {
      strict: true,
      encode: (fromI, _, ast, toA) =>
        Effect.try({
          try: () => encodeCBORValue(toA, options),
          catch: (error) =>
            new ParseResult.Type(
              ast,
              toA,
              `Failed to encode CBOR value: ${String(error)}`
            ),
        }),
      decode: (fromA, _, ast) =>
        Effect.gen(function* () {
          if (fromA.length === 0) {
            return yield* Effect.fail(
              new ParseResult.Type(ast, fromA, "Empty CBOR bytes")
            );
          }

          const decoder = new CBORDecoder(fromA);
          const decoded = yield* decoder
            .decode()
            .pipe(
              Effect.mapError(
                (error) =>
                  new ParseResult.Type(
                    ast,
                    fromA,
                    `Failed to decode CBOR bytes: ${String(error)}`
                  )
              )
            );

          return decoded;
        }),
    }
  );

/**
 * CBOR hex schema for transforming between hex strings and CBORValue
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) =>
  Schema.transformOrFail(
    Bytes.HexSchema,
    CBORValueSchema,
    {
      strict: true,
      encode: (fromI, _, ast, toA) =>
        pipe(
          Effect.try({
            try: () => encodeCBORValue(toA, options),
            catch: (error) =>
              new ParseResult.Type(
                ast,
                toA,
                `Failed to encode CBOR value: ${String(error)}`
              ),
          }),
          Effect.map(Bytes.Encode.hex)
        ),
      decode: (fromA, _, ast) =>
        pipe(
          Effect.try({
            try: () => Bytes.Decode.hex(fromA),
            catch: (error) =>
              new ParseResult.Type(
                ast,
                fromA,
                `Invalid hex string: ${String(error)}`
              ),
          }),
          Effect.flatMap((bytes) => ParseResult.decode(CBORBytesSchema(options))(bytes))
        ),
    }
  );

/**
 * CBOR encoding utilities with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encodeSync(CBORBytesSchema(options))(value),
  hex: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encodeSync(CBORHexSchema(options))(value),
};

/**
 * CBOR decoding utilities with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: (bytes: Uint8Array, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decodeSync(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decodeSync(CBORHexSchema(options))(hex),
};

export const EncodeEither = {
  bytes: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encodeEither(CBORBytesSchema(options))(value),
  hex: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encodeEither(CBORHexSchema(options))(value),
};

export const DecodeEither = {
  bytes: (bytes: Uint8Array, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decodeEither(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decodeEither(CBORHexSchema(options))(hex),
};

export const EncodeEffect = {
  bytes: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encode(CBORBytesSchema(options))(value),
  hex: (value: CBORValue, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.encode(CBORHexSchema(options))(value),
};

export const DecodeEffect = {
  bytes: (bytes: Uint8Array, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decode(CBORBytesSchema(options))(bytes),
  hex: (hex: string, options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS) => 
    Schema.decode(CBORHexSchema(options))(hex),
};





