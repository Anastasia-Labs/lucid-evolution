import { Data, Effect, Schema } from "effect";
import * as Positive from "./Positive.js";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as SerdeImpl from "./SerdeImpl.js";
import { ParseError } from "effect/ParseResult";
import * as Bytes from "./Bytes.js";

/**
 * Error thrown when address operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class PointerAddressError extends Data.TaggedError(
  "PointerAddressError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for pointer to a stake registration certificate
 * Contains slot, transaction index, and certificate index information
 *
 * @since 2.0.0
 * @category schemas
 */
export class Pointer extends Schema.TaggedClass<Pointer>("Pointer")("Pointer", {
  slot: Positive.Positive,
  txIndex: Positive.Positive,
  certIndex: Positive.Positive,
}) {}

/**
 * Check if the given value is a valid Pointer
 *
 * @example
 * import { PointerAddress , Positive } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const pointer = PointerAddress.Pointer.make({
 *   slot: Positive.makeOrThrow(1),
 *   txIndex: Positive.makeOrThrow(2),
 *   certIndex: Positive.makeOrThrow(3),
 * });
 * const isValid = PointerAddress.isPointer(pointer);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPointer = Schema.is(Pointer);

/**
 * Pointer address with payment credential and pointer to stake registration
 *
 * @since 2.0.0
 * @category schemas
 */
export class PointerAddress extends Schema.TaggedClass<PointerAddress>(
  "PointerAddress",
)("PointerAddress", {
  networkId: Schema.Number,
  paymentCredential: Credential.Credential,
  pointer: Pointer,
}) {}

export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  // Script payment with pointer
  // Check if the address is a pointer address
  const isPaymentKey = (addressType & 0b0001) === 0;
  const paymentCredential: Credential.Credential = isPaymentKey
    ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
    : yield* ScriptHash.fromBytes(bytes.slice(1, 29));

  // After the credential, we have 3 variable-length integers
  let offset = 29;

  // Decode the slot, txIndex, and certIndex as variable length integers
  const [slot, slotBytesRead] = yield* decodeVariableLength(bytes, offset);
  offset += slotBytesRead;

  const [txIndex, txIndexBytesRead] = yield* decodeVariableLength(
    bytes,
    offset,
  );
  offset += txIndexBytesRead;

  const [certIndex, _] = yield* decodeVariableLength(bytes, offset);

  const pointerAddress = makeOrThrow(
    networkId,
    paymentCredential,
    slot,
    txIndex,
    certIndex,
  );

  return pointerAddress;
});

/**
 * Encode a number as a variable length integer following the Cardano ledger specification
 *
 * @example
 * import { PointerAddress , Positive } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = PointerAddress.encodeVariableLength(Positive.makeOrThrow(128));
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 2);
 * assert(bytes[0] === 0x80);
 * assert(bytes[1] === 0x01);
 *
 * const smallBytes = PointerAddress.encodeVariableLength(Positive.makeOrThrow(42));
 * assert(smallBytes instanceof Uint8Array);
 * assert(smallBytes.length === 1);
 * assert(smallBytes[0] === 42);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeVariableLength = (positive: Positive.Positive) => {
  // Handle the simple case: values less than 128 (0x80, binary 10000000) fit in a single byte
  // with no continuation bit needed
  if (positive.number < 128) {
    return new Uint8Array([positive.number]);
  }

  // For larger values, we need to split the number into 7-bit chunks
  const result: number[] = [];
  let remaining = positive.number;

  // Loop until all bits of the number have been processed
  while (remaining >= 128) {
    // Take the least significant 7 bits (value & 0x7F, binary 01111111)
    // and set the high bit (| 0x80, binary 10000000) to indicate more bytes follow
    result.push((remaining & 0x7f) | 0x80);

    // Shift right by 7 bits (divide by 128) to process the next chunk
    remaining = Math.floor(remaining / 128);
  }

  // Push the final byte (the most significant bits)
  // without setting the high bit, indicating this is the last byte
  result.push(remaining & 0x7f); // Binary: 0xxxxxxx where x are bits from the value

  // Convert the array of bytes to a Uint8Array
  // The bytes are already in little-endian order (least significant byte first)
  return new Uint8Array(result);
};

/**
 * Decode a variable length integer from a Uint8Array
 * Following the Cardano ledger implementation for variable-length integers
 *
 * @example
 * import { PointerAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Create a buffer that encodes the value 128
 * const buffer = new Uint8Array([0x80, 0x01]);
 *
 * const effect = PointerAddress.decodeVariableLength(buffer, 0);
 * const [positive, bytesRead] = Effect.runSync(effect);
 * assert(positive.number === 128);
 * assert(bytesRead === 2);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<
  [Positive.Positive, number],
  PointerAddressError | ParseError
> = Effect.fnUntraced(function* (bytes, offset = 0) {
  // The accumulated decoded value
  let number = 0;

  // Count of bytes processed so far
  let bytesRead = 0;

  // Multiplier for the current byte position (increases by powers of 128)
  // Starts at 1 because the first 7 bits are multiplied by 1
  let multiplier = 1;

  while (true) {
    // Check if we've reached the end of the buffer without finding a complete value
    // This is a safeguard against buffer overruns
    if (offset + bytesRead >= bytes.length) {
      yield* new PointerAddressError({
        message: `Buffer overflow: not enough bytes to decode variable length integer at offset ${offset}`,
      });
    }

    // Read the current byte
    const b = bytes[offset + bytesRead];
    bytesRead++;

    // Extract value bits by masking with 0x7F (binary 01111111)
    // This removes the high continuation bit and keeps only the 7 value bits
    // Then multiply by the current position multiplier and add to accumulated value
    number += (b & 0x7f) * multiplier;

    // Check if this is the last byte by testing the high bit (0x80, binary 10000000)
    // If the high bit is 0, we've reached the end of the encoded integer
    if ((b & 0x80) === 0) {
      // Return the decoded value and the count of bytes read
      const value = yield* Schema.decode(Positive.Positive)({ number });
      return [value, bytesRead] as const;
    }

    // If the high bit is 1, we need to read more bytes
    // Increase the multiplier for the next byte position (each position is worth 128 times more)
    // This is because each byte holds 7 bits of value information
    multiplier *= 128;

    // Continue reading bytes until we find one with the high bit set to 0
  }
});

export const toBytes = (address: PointerAddress) => {
  const paymentBit = address.paymentCredential._tag === "KeyHash" ? 0 : 1;
  const header =
    (0b01 << 6) |
    (0b0 << 5) |
    (paymentBit << 4) |
    (address.networkId & 0b00001111);

  const slotBytes = encodeVariableLength(address.pointer.slot);
  const txIndexBytes = encodeVariableLength(address.pointer.txIndex);
  const certIndexBytes = encodeVariableLength(address.pointer.certIndex);

  // Combine everything
  const totalSize =
    1 + // header
    28 + // payment credential
    slotBytes.length +
    txIndexBytes.length +
    certIndexBytes.length;

  const result = new Uint8Array(totalSize);

  result[0] = header;
  result.set(Bytes.fromHexOrThrow(address.paymentCredential.hash), 1);

  let offset = 29;
  result.set(slotBytes, offset);
  offset += slotBytes.length;

  result.set(txIndexBytes, offset);
  offset += txIndexBytes.length;

  result.set(certIndexBytes, offset);

  return result;
};

export const makeOrThrow = (
  networkId: number,
  paymentCredential: Credential.Credential,
  slot: Positive.Positive,
  txIndex: Positive.Positive,
  certIndex: Positive.Positive,
): PointerAddress =>
  PointerAddress.make(
    {
      networkId,
      paymentCredential,
      pointer: Pointer.make(
        {
          slot: slot,
          txIndex: txIndex,
          certIndex: certIndex,
        },
        {
          disableValidation: true,
        },
      ),
    },
    {
      disableValidation: true,
    },
  );
