import { Data, Effect, FastCheck, Inspectable, Schema } from "effect";
import * as Natural from "./Natural.js";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as Pointer from "./Pointer.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Network from "./Network.js";
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

// /**
//  * Phantom symbol for nominal type
//  *
//  * @since 2.0.0
//  * @category model
//  */
// export const NominalType: unique symbol = Symbol.for(
//   "@lucid-evolution/experimental/PointerAddress"
// );

// /**
//  * @since 2.0.0
//  */
// export type NominalType = typeof NominalType;

export declare const NominalType: unique symbol;
export interface PointerAddress {
  readonly [NominalType]: unique symbol;
}

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
  pointer: Pointer.Pointer,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "PointerAddress",
      networkId: this.networkId,
      paymentCredential: this.paymentCredential,
      pointer: this.pointer,
    };
  }
}

/**
 * Create a PointerAddress from bytes.
 *
 * @example
 * import { PointerAddress, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Sample pointer address bytes - this is a placeholder example
 * const bytes = Bytes.fromHexOrThrow("4059f801786707f961faf991fd73036405431a3f5d3a97fc03eefcad05a6a685bbcb848908a2f1be9397eabf0998d2c0cde9c1e206");
 * const addressEffect = PointerAddress.fromBytes(bytes);
 * const address = Effect.runSync(addressEffect);
 * assert(address._tag === "PointerAddress");
 *
 * @since 2.0.0
 * @category constructors
 */
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
 * import { PointerAddress , Natural } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = PointerAddress.encodeVariableLength(Natural.makeOrThrow(128));
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 2);
 * assert(bytes[0] === 0x80);
 * assert(bytes[1] === 0x01);
 *
 * const smallBytes = PointerAddress.encodeVariableLength(Natural.makeOrThrow(42));
 * assert(smallBytes instanceof Uint8Array);
 * assert(smallBytes.length === 1);
 * assert(smallBytes[0] === 42);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeVariableLength = (natural: Natural.Natural) => {
  // Handle the simple case: values less than 128 (0x80, binary 10000000) fit in a single byte
  // with no continuation bit needed
  if (natural.number < 128) {
    return new Uint8Array([natural.number]);
  }

  // For larger values, we need to split the number into 7-bit chunks
  const result: number[] = [];
  let remaining = natural.number;

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
 * const [natural, bytesRead] = Effect.runSync(effect);
 * assert(natural.number === 128);
 * assert(bytesRead === 2);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<
  [Natural.Natural, number],
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
      const value = yield* Schema.decode(Natural.Natural)({ number });
      return [value, bytesRead] as const;
    }

    // If the high bit is 1, we need to read more bytes
    // Increase the multiplier for the next byte position (each position is worth 128 times more)
    // This is because each byte holds 7 bits of value information
    multiplier *= 128;

    // Continue reading bytes until we find one with the high bit set to 0
  }
});

/**
 * Convert a PointerAddress to bytes.
 *
 * @example
 * import { PointerAddress, KeyHash, Natural } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create payment credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create pointer address
 * const address = PointerAddress.makeOrThrow(
 *   0,
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * const bytes = PointerAddress.toBytes(address);
 * assert(bytes instanceof Uint8Array);
 *
 * @since 2.0.0
 * @category transformation
 */
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

/**
 * Create a PointerAddress from components, throws on error.
 *
 * @example
 * import { PointerAddress, KeyHash, Natural } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create payment credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create pointer address
 * const address = PointerAddress.makeOrThrow(
 *   0,
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * assert(address._tag === "PointerAddress");
 * assert(address.networkId === 0);
 * assert(address.pointer.slot.number === 1);
 * assert(address.pointer.txIndex.number === 2);
 * assert(address.pointer.certIndex.number === 3);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow = (
  networkId: number,
  paymentCredential: Credential.Credential,
  slot: Natural.Natural,
  txIndex: Natural.Natural,
  certIndex: Natural.Natural,
): PointerAddress =>
  PointerAddress.make(
    {
      networkId,
      paymentCredential,
      pointer: Pointer.Pointer.make(
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

/**
 * Check if two PointerAddress instances are equal.
 *
 * @example
 * import { PointerAddress, KeyHash, Natural } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create two identical addresses
 * const address1 = PointerAddress.makeOrThrow(
 *   0,
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * const address2 = PointerAddress.makeOrThrow(
 *   0,
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * const address3 = PointerAddress.makeOrThrow(
 *   1,
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 *
 * assert(PointerAddress.equals(address1, address2) === true);
 * assert(PointerAddress.equals(address1, address3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PointerAddress, b: PointerAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    a.paymentCredential._tag === b.paymentCredential._tag &&
    a.pointer.slot.number === b.pointer.slot.number &&
    a.pointer.txIndex.number === b.pointer.txIndex.number &&
    a.pointer.certIndex.number === b.pointer.certIndex.number &&
    a.paymentCredential.hash === b.paymentCredential.hash
  );
};

/**
 * Generate a random PointerAddress.
 *
 * @example
 * import { PointerAddress } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PointerAddress.generator, 20);
 * randomSamples.forEach((address) => {
 *   assert(address._tag === "PointerAddress");
 *   assert(typeof address.networkId === "number");
 *   assert(address.pointer.slot.number > 0);
 *   assert(address.pointer.txIndex.number > 0);
 *   assert(address.pointer.certIndex.number > 0);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Network.generator,
  Credential.generator,
  Natural.generator,
  Natural.generator,
  Natural.generator,
).map(([networkId, paymentCredential, slot, txIndex, certIndex]) =>
  makeOrThrow(networkId, paymentCredential, slot, txIndex, certIndex),
);
