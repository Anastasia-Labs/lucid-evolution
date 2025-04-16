import { Schema, Effect, Data } from "effect";
import { HexStringFilter } from "./Combinator.js";
import { bech32 } from "@scure/base";
import * as Bytes from "./Bytes.js";
import * as CBOR from "./CBOR.js";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Positive from "./Positive.js";
import * as SerdeImpl from "./SerdeImpl.js";
import { ParseError } from "effect/ParseResult";

/**
 * CDDL specs
 * ; address format:
 * ;   [ 8 bit header | payload ];
 * ;
 * ; shelley payment addresses:
 * ;      bit 7: 0
 * ;      bit 6: base/other
 * ;      bit 5: pointer/enterprise [for base: stake cred is keyhash/scripthash]
 * ;      bit 4: payment cred is keyhash/scripthash
 * ;   bits 3-0: network id
 * ;
 * ; reward addresses:
 * ;   bits 7-5: 111
 * ;      bit 4: credential is keyhash/scripthash
 * ;   bits 3-0: network id
 * ;
 * ; byron addresses:
 * ;   bits 7-4: 1000
 * ;
 * ;      0000: base address: keyhash28,keyhash28
 * ;      0001: base address: scripthash28,keyhash28
 * ;      0010: base address: keyhash28,scripthash28
 * ;      0011: base address: scripthash28,scripthash28
 * ;      0100: pointer address: keyhash28, 3 variable length uint
 * ;      0101: pointer address: scripthash28, 3 variable length uint
 * ;      0110: enterprise address: keyhash28
 * ;      0111: enterprise address: scripthash28
 * ;      1000: byron address
 * ;      1110: reward account: keyhash28
 * ;      1111: reward account: scripthash28
 * ;      1001-1101: future formats
 */

/**
 * Address Network ID type - either a testnet (0) or mainnet (1)
 * As defined in CIP-0019
 *
 * @since 2.0.0
 * @category model
 */
export type NetworkId = 0 | 1 | number;

/**
 * Address header kind - used to determine the type of address from its header
 * Following CIP-0019 address types
 *
 * @since 2.0.0
 * @category model
 */
export type AddressTag = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron";

/**
 * Error thrown when address operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class AddressError extends Data.TaggedError("AddressError")<{
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
 * import { Address , Positive } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const pointer = Address.Pointer.make({
 *   slot: Positive.makeOrThrow(1),
 *   txIndex: Positive.makeOrThrow(2),
 *   certIndex: Positive.makeOrThrow(3),
 * });
 * const isValid = Address.isPointer(pointer);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPointer = Schema.is(Pointer);

/**
 * Bech32 address format schema (human-readable addresses)
 * Following CIP-0019 encoding requirements
 *
 * @since 2.0.0
 * @category schemas
 */
export const PaymentAddress = Schema.String.pipe(
  Schema.pattern(/^(addr|addr_test)[1][a-z0-9]+$/i),
).pipe(Schema.brand("PaymentAddress"));

/**
 * Type representing a payment address string in bech32 format
 *
 * @since 2.0.0
 * @category model
 */
export type PaymentAddress = Schema.Schema.Type<typeof PaymentAddress>;

/**
 * Check if the given value is a valid PaymentAddress
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const isValid = Address.isPaymentAddress("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPaymentAddress = Schema.is(PaymentAddress);

/**
 * Reward address format schema (human-readable addresses)
 * Following CIP-0019 encoding requirements
 *
 * @since 2.0.0
 * @category schemas
 */
export const RewardAddress = Schema.String.pipe(
  Schema.pattern(/^(stake|stake_test)[1][a-z0-9]+$/i),
).pipe(Schema.brand("RewardAddress"));

/**
 * Type representing a reward/stake address string in bech32 format
 *
 * @since 2.0.0
 * @category model
 */
export type RewardAddress = Schema.Schema.Type<typeof RewardAddress>;

/**
 * Check if the given value is a valid RewardAddress
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const isValid = Address.isRewardAddress("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isRewardAddress = Schema.is(RewardAddress);

/**
 * Schema for stake reference that can be either a credential or a pointer
 *
 * @since 2.0.0
 * @category schemas
 */
export const StakeReference = Schema.UndefinedOr(
  Schema.Union(Credential.Credential, Pointer),
);

/**
 * Type representing a reference to staking information
 * Can be a credential (key hash or script hash) or a pointer
 *
 * @since 2.0.0
 * @category model
 */
export type StakeReference = Schema.Schema.Type<typeof StakeReference>;

/**
 * Base address with both payment and staking credentials
 *
 * @since 2.0.0
 * @category schemas
 */
export class BaseAddress extends Schema.TaggedClass<BaseAddress>("BaseAddress")(
  "BaseAddress",
  {
    networkId: Schema.Number,
    paymentCredential: Credential.Credential,
    stakeCredential: Credential.Credential,
  },
) {}

/**
 * Enterprise address with only payment credential
 *
 * @since 2.0.0
 * @category schemas
 */
export class EnterpriseAddress extends Schema.TaggedClass<EnterpriseAddress>(
  "EnterpriseAddress",
)("EnterpriseAddress", {
  networkId: Schema.Number,
  paymentCredential: Credential.Credential,
}) {}

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

/**
 * Reward/stake address with only staking credential
 *
 * @since 2.0.0
 * @category schemas
 */
export class RewardAccount extends Schema.TaggedClass<RewardAccount>(
  "RewardAccount",
)("RewardAccount", {
  networkId: Schema.Number,
  stakeCredential: Credential.Credential,
}) {}

/**
 * Byron legacy address format
 *
 * @since 2.0.0
 * @category schemas
 */
export class ByronAddress extends Schema.TaggedClass<ByronAddress>(
  "ByronAddress",
)("ByronAddress", {
  bytes: Schema.String.pipe(HexStringFilter),
}) {}

/**
 * Union schema representing all possible address formats
 * Discriminated by the 'kind' field
 *
 * @since 2.0.0
 * @category schemas
 */
export const Address = Schema.Union(
  BaseAddress,
  EnterpriseAddress,
  PointerAddress,
  RewardAccount,
  ByronAddress,
);

/**
 * Type inferred from the AddressInfo schema
 *
 * @since 2.0.0
 * @category model
 */
export type Address =
  | BaseAddress
  | EnterpriseAddress
  | PointerAddress
  | RewardAccount
  | ByronAddress;

/**
 * Get raw bytes from address string (either format)
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.bytesFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const bytes = Effect.runSync(effect);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const bytesFromBech32 = (
  bech32Address: string,
): Effect.Effect<Uint8Array, AddressError> =>
  Effect.try({
    try: () => bech32.decodeToBytes(bech32Address).bytes,
    catch: (cause) =>
      new AddressError({
        message: `${cause}`,
      }),
  });

/**
 * Parse header from address
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.headerFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const header = Effect.runSync(effect);
 * assert(typeof header === "number");
 * assert(header === 0 || header === 1); // typically 0 for testnet, 1 for mainnet
 *
 * @since 2.0.0
 * @category transformation
 */
export const headerFromBech32 = (
  bech32Address: string,
): Effect.Effect<number, AddressError> =>
  Effect.map(bytesFromBech32(bech32Address), (bytes) => bytes[0]);

/**
 * Get address tag from header byte
 * Shifts the header byte to the right by 4 bits to isolate the address type
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const tag = Address.addressTagFromHeader(0);
 * assert(tag === "Base");
 *
 * @since 2.0.0
 * @category transformation
 */
export const addressTagFromHeader = (header: number): AddressTag => {
  const addressType = header >> 4;
  switch (addressType) {
    case 0b0000:
    case 0b0001:
    case 0b0010:
    case 0b0011:
      return "Base";
    case 0b0100:
    case 0b0101:
      return "Pointer";
    case 0b0110:
    case 0b0111:
      return "Enterprise";
    case 0b1000:
      return "Byron";
    case 0b1110:
    case 0b1111:
      return "Reward";
    default:
      throw new AddressError({
        message: `Unknown address header: ${header}`,
      });
  }
};

/**
 * Get address kind from address string
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.addressTagFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const tag = Effect.runSync(effect);
 * assert(tag === "Base");
 *
 * @since 2.0.0
 * @category transformation
 */
export const addressTagFromBech32 = (
  bech32Address: string,
): Effect.Effect<AddressTag, AddressError> =>
  Effect.map(headerFromBech32(bech32Address), (header) =>
    addressTagFromHeader(header),
  );

/**
 * Extract network ID from address by applying a bit mask to isolate the network identifier
 * Network ID is stored in the lower 4 bits of the header byte (bits 0-3)
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.networkIdFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const networkId = Effect.runSync(effect);
 * assert(networkId === 1); // 1 for mainnet
 *
 * // For testnet addresses:
 * const testnetEffect = Address.networkIdFromBech32("addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae");
 * const testnetId = Effect.runSync(testnetEffect);
 * assert(testnetId === 0); // 0 for testnet
 *
 * @since 2.0.0
 * @category transformation
 */
export const networkIdFromBech32 = (
  bech32Address: string,
): Effect.Effect<NetworkId, AddressError> =>
  // Apply bit mask 0b00001111 (0x0F) to extract only the last 4 bits
  // representing the network ID (0 for testnet, 1 for mainnet)
  Effect.map(bytesFromBech32(bech32Address), (bytes) => bytes[0] & 0b00001111);

/**
 * Decode a variable length integer from a Uint8Array
 * Following the Cardano ledger implementation for variable-length integers
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Create a buffer that encodes the value 128
 * const buffer = new Uint8Array([0x80, 0x01]);
 *
 * const effect = Address.decodeVariableLength(buffer, 0);
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
) => Effect.Effect<[Positive.Positive, number], AddressError | ParseError> =
  Effect.fnUntraced(function* (bytes, offset = 0) {
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
        yield* new AddressError({
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

/**
 * Encode a number as a variable length integer following the Cardano ledger specification
 *
 * @example
 * import { Address , Positive } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Address.encodeVariableLength(Positive.makeOrThrow(128));
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 2);
 * assert(bytes[0] === 0x80);
 * assert(bytes[1] === 0x01);
 *
 * const smallBytes = Address.encodeVariableLength(Positive.makeOrThrow(42));
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
 * Convert bytes to an address structure
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * assert(address._tag === "BaseAddress");
 * assert(address.networkId === 1);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBytes: SerdeImpl.FromBytes<
  Address,
  | AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | ParseError
> = Effect.fnUntraced(function* (bytes: Uint8Array) {
  const header = bytes[0];

  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;

  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  switch (addressType) {
    // Base address types (0000, 0001, 0010, 0011)
    // Format: [payment credential, stake credential]
    case 0b0000: // Key payment, Key stake
    case 0b0001: // Script payment, Key stake
    case 0b0010: // Key payment, Script stake
    case 0b0011: {
      // Script payment, Script stake
      const isPaymentKey = (addressType & 0b0001) === 0;
      const paymentCredential: Credential.Credential = isPaymentKey
        ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
        : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
      const isStakeKey = (addressType & 0b0010) === 0;
      const stakeCredential: Credential.Credential = isStakeKey
        ? yield* KeyHash.fromBytes(bytes.slice(29, 57))
        : yield* ScriptHash.fromBytes(bytes.slice(29, 57));
      const baseAddress: BaseAddress = BaseAddress.make(
        {
          networkId,
          paymentCredential,
          stakeCredential,
        },
        {
          disableValidation: true,
        },
      );
      return baseAddress;
    }

    // Enterprise address types (0110, 0111)
    // Format: [payment credential only]
    case 0b0110: // Key payment
    case 0b0111: {
      // Script payment
      const isPaymentKey = (addressType & 0b0001) === 0;
      const paymentCredential: Credential.Credential = isPaymentKey
        ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
        : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
      const enterpriseAddress: EnterpriseAddress = EnterpriseAddress.make(
        {
          networkId,
          paymentCredential,
        },
        {
          disableValidation: true,
        },
      );
      return enterpriseAddress;
    }

    // Pointer address types (0100, 0101)
    // Format: [payment credential, variable length integers for slot, txIndex, certIndex]
    case 0b0100: // Key payment with pointer
    case 0b0101: {
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
      const pointer: Pointer = Pointer.make(
        { slot, txIndex, certIndex },
        { disableValidation: true },
      );

      const pointerAddress: PointerAddress = PointerAddress.make(
        {
          networkId,
          paymentCredential,
          pointer,
        },
        { disableValidation: true },
      );

      return pointerAddress;
    }

    case 0b1110:
    case 0b1111: {
      const isStakeKey = (addressType & 0b0001) === 0;
      const stakeCredential: Credential.Credential = isStakeKey
        ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
        : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
      const rewardAccount: RewardAccount = RewardAccount.make(
        {
          networkId,
          stakeCredential,
        },
        {
          disableValidation: true,
        },
      );
      return rewardAccount;
    }

    case 0b1000: {
      return ByronAddress.make(
        {
          bytes: yield* Bytes.toHex(bytes),
        },
        { disableValidation: true },
      );
    }

    default:
      return yield* new AddressError({
        message: `Unknown address type: ${addressType}`,
      });
  }
});

/**
 * Parse the complete address structure into a typed representation
 * This decodes the address format according to CIP-0019 specification
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const address = Effect.runSync(effect);
 * assert(address._tag === "BaseAddress");
 * assert(address.networkId === 1);
 *
 * const stakeEffect = Address.fromBech32("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
 * const stakeAddress = Effect.runSync(stakeEffect);
 * assert(stakeAddress._tag === "RewardAccount");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBech32: SerdeImpl.FromBech32<
  Address,
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | AddressError
  | ParseError
> = Effect.fnUntraced(function* (bech32Address) {
  const bytes = yield* bytesFromBech32(bech32Address);
  return yield* fromBytes(bytes);
});

/**
 * Serialize a PaymentAddress to JSON format
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const json = Address.paymentAddressToJson("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(typeof json === "string");
 * assert(JSON.parse(json).address === "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const paymentAddressToJson = (address: string): string =>
  JSON.stringify({
    address,
  });

/**
 * Convert address to bytes
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * const addressEffect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.map(Address.toBytes)
 * );
 *
 * const bytes = Effect.runSync(addressEffect);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBytes = (address: Address) => {
  switch (address._tag) {
    case "BaseAddress": {
      // Preallocate array of exact size ( 1 byte header + 28 bytes payment credential + 28 bytes stake credential )
      const result = new Uint8Array(57);
      const paymentBit = address.paymentCredential._tag === "KeyHash" ? 0 : 1;
      const stakeBit = address.stakeCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b00 << 6) |
        (stakeBit << 5) |
        (paymentBit << 4) |
        (address.networkId & 0b00001111);

      result[0] = header;
      const paymentCredentialBytes = Bytes.fromHexOrThrow(
        address.paymentCredential.hash,
      );
      result.set(paymentCredentialBytes, 1);
      const stakeCredentialBytes = Bytes.fromHexOrThrow(
        address.stakeCredential.hash,
      );
      result.set(stakeCredentialBytes, 29);

      return result;
    }

    case "EnterpriseAddress": {
      // Prea-allocate array of exact size ( 1 byte header + 28 bytes payment credential )
      const result = new Uint8Array(29);
      const paymentBit = address.paymentCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b01 << 6) |
        (0b1 << 5) |
        (paymentBit << 4) |
        (address.networkId & 0b00001111);

      result[0] = header;

      const paymentCredentialBytes = Bytes.fromHexOrThrow(
        address.paymentCredential.hash,
      );
      result.set(paymentCredentialBytes, 1);

      return result;
    }

    case "PointerAddress": {
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
    }

    case "RewardAccount": {
      // Preallocate array of exact size ( 1 byte header + 28 bytes stake credential )
      const result = new Uint8Array(29);
      const stakingBit = address.stakeCredential._tag === "KeyHash" ? 0 : 1;
      const header =
        (0b111 << 5) | (stakingBit << 4) | (address.networkId & 0b00001111);

      result[0] = header;
      const stakeCredentialBytes = Bytes.fromHexOrThrow(
        address.stakeCredential.hash,
      );
      result.set(stakeCredentialBytes, 1);

      return result;
    }
    case "ByronAddress":
      return Bytes.fromHexOrThrow(address.bytes);
  }
};

/**
 * Convert address to hex string
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * const effect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.map(Address.toHex)
 * );
 *
 * const hex = Effect.runSync(effect);
 * assert(typeof hex === "string");
 * assert(hex.length > 0);
 * assert(/^[0-9a-f]+$/i.test(hex));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toHex = (address: Address) => Bytes.toHexOrThrow(toBytes(address));

/**
 * Convert address to bech32 format
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * // First create an address from bytes
 * const bytesEffect = pipe(
 *   Address.fromBytes(Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251")),
 *   Effect.map(Address.toBech32)
 * );
 *
 * const bech32 = Effect.runSync(bytesEffect);
 * assert(typeof bech32 === "string");
 * assert(bech32.startsWith("addr1"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBech32 = (address: Address): string => {
  const bytes = toBytes(address);
  let prefix: string;
  switch (address._tag) {
    case "BaseAddress":
    case "EnterpriseAddress":
    case "PointerAddress":
      prefix = address.networkId === 0 ? "addr_test" : "addr";
      break;
    case "RewardAccount":
      prefix = address.networkId === 0 ? "stake_test" : "stake";
      break;
    case "ByronAddress":
      prefix = "";
      break;
  }
  const words = bech32.toWords(bytes);
  return bech32.encode(prefix, words, false);
};

/**
 * Extended address information with both structured data and serialized formats
 * Contains the address structure and its serialized representations
 *
 * @since 2.0.0
 * @category model
 */
export type AddressDetails = Address & {
  address: {
    bech32: string;
    hex: string;
  };
};

/**
 * Extract detailed information from a bech32 address
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.addressDetailsFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const details = Effect.runSync(effect);
 * assert(details._tag === "BaseAddress");
 * assert(details.networkId === 1);
 * assert(details.address.bech32 === "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(typeof details.address.hex === "string");
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromBech32: SerdeImpl.FromBech32<
  AddressDetails,
  | Bytes.BytesError
  | AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | ParseError
> = Effect.fnUntraced(function* (bech32Address) {
  const decodedAddress = yield* fromBech32(bech32Address);
  const hex = toHex(decodedAddress);
  return {
    ...decodedAddress,
    address: {
      bech32: bech32Address,
      hex,
    },
  };
});

/**
 * Extract detailed information from a hex-encoded address
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.addressDetailsFromHex("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const details = Effect.runSync(effect);
 * assert(details._tag === "BaseAddress");
 * assert(details.networkId === 1);
 * assert(typeof details.address.bech32 === "string");
 * assert(details.address.hex === "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromHex: SerdeImpl.FromHex<
  AddressDetails,
  | Bytes.BytesError
  | AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | ParseError
> = Effect.fnUntraced(function* (hexAddress) {
  const hex = yield* Bytes.fromHex(hexAddress);
  const decodedAddress = yield* fromBytes(hex);
  const bech32 = toBech32(decodedAddress);
  return {
    ...decodedAddress,
    address: {
      bech32,
      hex: hexAddress,
    },
  };
});

/**
 * Extract address details from a string (auto-detects bech32 or hex format)
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // From bech32
 * const bech32Effect = Address.addressDetailsFromString("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const bech32Details = Effect.runSync(bech32Effect);
 * assert(bech32Details._tag === "BaseAddress");
 *
 * // From hex
 * const hexEffect = Address.addressDetailsFromString("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const hexDetails = Effect.runSync(hexEffect);
 * assert(hexDetails._tag === "BaseAddress");
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromString = Effect.fnUntraced(function* (
  stringAddress: string,
) {
  const isBech32 =
    isPaymentAddress(stringAddress) || isRewardAddress(stringAddress);
  if (isBech32) {
    return yield* addressDetailsFromBech32(stringAddress);
  } else {
    return yield* addressDetailsFromHex(stringAddress);
  }
});

/**
 * Encode a Cardano address to CBOR format
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x")
 *   .pipe(Effect.map(Address.toCBOR));
 *
 * const cborHex = Effect.runSync(effect);
 * assert(typeof cborHex === "string");
 * assert(cborHex.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR = (address: Address) =>
  Bytes.toHexOrThrow(CBOR.encodeOrThrow(toBytes(address)));
