import {
  Data,
  Effect,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import * as Natural from "./Natural.js";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as Pointer from "./Pointer.js";
import * as ScriptHash from "./ScriptHash.js";
import * as NetworkId from "./NetworkId.js";
import { Hex } from "./index.js";

/**
 * Error thrown when address operations fail
 *
 * @since 2.0.0
 * @category model
 */
class PointerAddressError extends Data.TaggedError("PointerAddressError")<{
  message: string;
  cause?: unknown;
}> {}

declare const NominalType: unique symbol;
interface PointerAddress {
  readonly [NominalType]: unique symbol;
}

/**
 * Pointer address with payment credential and pointer to stake registration
 *
 * @since 2.0.0
 * @category schemas
 */
class PointerAddress extends Schema.TaggedClass<PointerAddress>(
  "PointerAddress",
)("PointerAddress", {
  networkId: NetworkId.NetworkId,
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

const Bytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf,
  PointerAddress,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      Effect.gen(function* () {
        const paymentBit = toA.paymentCredential._tag === "KeyHash" ? 0 : 1;
        const header =
          (0b01 << 6) |
          (0b0 << 5) |
          (paymentBit << 4) |
          (toA.networkId & 0b00001111);
        const result = new Uint8Array(29);
        result[0] = header;
        const paymentCredentialBytes = Hex.toBytes(toA.paymentCredential.hash);
        result.set(paymentCredentialBytes, 1);
        const slotBytes = yield* encodeVariableLength(toA.pointer.slot);
        const txIndexBytes = yield* encodeVariableLength(toA.pointer.txIndex);
        const certIndexBytes = yield* encodeVariableLength(
          toA.pointer.certIndex,
        );
        let offset = 29;
        result.set(slotBytes, offset);
        offset += slotBytes.length;
        result.set(txIndexBytes, offset);
        offset += txIndexBytes.length;
        result.set(certIndexBytes, offset);
        return result;
      }),
    decode: (fromI, options, ast, fromA) =>
      Effect.gen(function* () {
        const header = fromA[0];
        // Extract network ID from the lower 4 bits
        const networkId = header & 0b00001111;
        // Extract address type from the upper 4 bits (bits 4-7)
        const addressType = header >> 4;

        // Script payment with pointer
        // Check if the address is a pointer address
        const isPaymentKey = (addressType & 0b0001) === 0;
        const paymentCredential: Credential.Credential = isPaymentKey
          ? yield* ParseResult.decode(KeyHash.Bytes)(fromA.slice(1, 29))
          : yield* ParseResult.decode(ScriptHash.Bytes)(fromA.slice(1, 29));

        // After the credential, we have 3 variable-length integers
        let offset = 29;

        // Decode the slot, txIndex, and certIndex as variable length integers
        const [slot, slotBytesRead] = yield* decodeVariableLength(
          fromA,
          offset,
        );
        offset += slotBytesRead;

        const [txIndex, txIndexBytesRead] = yield* decodeVariableLength(
          fromA,
          offset,
        );
        offset += txIndexBytesRead;

        const [certIndex, _] = yield* decodeVariableLength(fromA, offset);

        return yield* ParseResult.decode(PointerAddress)({
          _tag: "PointerAddress",
          networkId,
          paymentCredential,
          pointer: Pointer.make(slot, txIndex, certIndex),
        });
      }).pipe(
        Effect.catchTag("PointerAddressError", (e) =>
          Effect.fail(new ParseResult.Type(ast, fromA, e.message)),
        ),
      ),
  },
);

const HexString = Schema.transformOrFail(Hex.HexString, PointerAddress, {
  strict: true,
  encode: (toI, options, ast, toA) =>
    pipe(ParseResult.encode(Bytes)(toA), Effect.map(Hex.fromBytes)),
  decode: (fromI, options, ast) =>
    pipe(Hex.toBytes(fromI), ParseResult.decode(Bytes)),
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
const encodeVariableLength = (natural: Natural.Natural) =>
  Effect.gen(function* () {
    // Handle the simple case: values less than 128 (0x80, binary 10000000) fit in a single byte
    // with no continuation bit needed
    if (natural < 128) {
      return new Uint8Array([natural]);
    }
    // For larger values, we need to split the number into 7-bit chunks
    const result: number[] = [];
    let remaining = natural;
    // Loop until all bits of the number have been processed
    while (remaining >= 128) {
      // Take the least significant 7 bits (value & 0x7F, binary 01111111)
      // and set the high bit (| 0x80, binary 10000000) to indicate more bytes follow
      result.push((remaining & 0x7f) | 0x80);
      // Shift right by 7 bits (divide by 128) to process the next chunk
      remaining = yield* ParseResult.decode(Natural.Natural)(
        Math.floor(remaining / 128),
      );
    }
    // Push the final byte (the most significant bits)
    // without setting the high bit, indicating this is the last byte
    result.push(remaining & 0x7f); // Binary: 0xxxxxxx where x are bits from the value
    // Convert the array of bytes to a Uint8Array
    // The bytes are already in little-endian order (least significant byte first)
    return new Uint8Array(result);
  });

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
 * assert(natural === 128);
 * assert(bytesRead === 2);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const decodeVariableLength: (
  bytes: Uint8Array,
  offset?: number | undefined,
) => Effect.Effect<
  [Natural.Natural, number],
  PointerAddressError | ParseResult.ParseIssue
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
      // const value = yield* Schema.decode(Natural.Natural)({ number });
      const value = yield* ParseResult.decode(Natural.Natural)(number);
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
 * Check if two PointerAddress instances are equal.
 *
 * @example
 * import { PointerAddress, KeyHash, Natural , NetworkId } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create two identical addresses
 * const address1 = PointerAddress.make(
 *   NetworkId.makeOrThrow(0),
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * const address2 = PointerAddress.make(
 *   NetworkId.makeOrThrow(0),
 *   paymentKeyHash,
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3)
 * );
 * const address3 = PointerAddress.make(
 *   NetworkId.makeOrThrow(1),
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
const equals = (a: PointerAddress, b: PointerAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    a.paymentCredential._tag === b.paymentCredential._tag &&
    a.pointer.slot === b.pointer.slot &&
    a.pointer.txIndex === b.pointer.txIndex &&
    a.pointer.certIndex === b.pointer.certIndex &&
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
 *   assert(address.pointer.slot > 0);
 *   assert(address.pointer.txIndex > 0);
 *   assert(address.pointer.certIndex > 0);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
const generator = FastCheck.tuple(
  NetworkId.generator,
  Credential.generator,
  Natural.generator,
  Natural.generator,
  Natural.generator,
).map(
  ([networkId, paymentCredential, slot, txIndex, certIndex]) =>
    new PointerAddress({
      networkId,
      paymentCredential,
      pointer: Pointer.make(slot, txIndex, certIndex),
    }),
);

export { PointerAddress, Bytes, HexString, equals, generator };
