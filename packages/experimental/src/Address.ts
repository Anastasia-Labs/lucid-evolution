import { Schema, Effect, Data } from "effect";
import { HexStringFilter } from "./Combinator.js";
import { bech32 } from "@scure/base";
import * as Bytes from "./Bytes.js";
import * as CBOR from "cbor-x";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";

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
export const Pointer = Schema.TaggedStruct("Pointer", {
  slot: Schema.Number,
  txIndex: Schema.Number,
  certIndex: Schema.Number,
});

/**
 * Type representing a pointer to a stake registration
 *
 * @since 2.0.0
 * @category model
 */
export type Pointer = Schema.Schema.Type<typeof Pointer>;

/**
 * Check if the given value is a valid Pointer
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 *
 * const pointer = { _tag: "Pointer", slot: 1, txIndex: 2, certIndex: 3 };
 * const isValid = Address.isPointer(pointer);
 * // Returns true if pointer is valid
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
 *
 * const isValid = Address.isPaymentAddress("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * // Returns true if address is a valid payment address
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
 *
 * const isValid = Address.isRewardAddress("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
 * // Returns true if address is a valid reward address
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
export const BaseAddress = Schema.TaggedStruct("BaseAddress", {
  networkId: Schema.Number,
  paymentCredential: Credential.Credential,
  stakeCredential: Credential.Credential,
});

/**
 * Type representing a base address with payment and stake credentials
 *
 * @since 2.0.0
 * @category model
 */
export interface BaseAddress extends Schema.Schema.Type<typeof BaseAddress> {}

/**
 * Enterprise address with only payment credential
 *
 * @since 2.0.0
 * @category schemas
 */
export const EnterpriseAddress = Schema.TaggedStruct("EnterpriseAddress", {
  networkId: Schema.Number,
  paymentCredential: Credential.Credential,
});

/**
 * Type representing an enterprise address with only payment credential
 *
 * @since 2.0.0
 * @category model
 */
export interface EnterpriseAddress
  extends Schema.Schema.Type<typeof EnterpriseAddress> {}

/**
 * Pointer address with payment credential and pointer to stake registration
 *
 * @since 2.0.0
 * @category schemas
 */
export const PointerAddress = Schema.TaggedStruct("PointerAddress", {
  networkId: Schema.Number,
  paymentCredential: Credential.Credential,
  pointer: Pointer,
});

/**
 * Type representing a pointer address with payment credential and pointer
 *
 * @since 2.0.0
 * @category model
 */
export interface PointerAddress
  extends Schema.Schema.Type<typeof PointerAddress> {}

/**
 * Reward/stake address with only staking credential
 *
 * @since 2.0.0
 * @category schemas
 */
export const RewardAccount = Schema.TaggedStruct("RewardAccount", {
  networkId: Schema.Number,
  stakeCredential: Credential.Credential,
});

/**
 * Type representing a reward/stake address with only staking credential
 *
 * @since 2.0.0
 * @category model
 */
export interface RewardAccount
  extends Schema.Schema.Type<typeof RewardAccount> {}

/**
 * Byron legacy address format
 *
 * @since 2.0.0
 * @category schemas
 */
export const ByronAddress = Schema.TaggedStruct("ByronAddress", {
  bytes: Schema.String.pipe(HexStringFilter),
});

/**
 * Type representing a Byron legacy address
 *
 * @since 2.0.0
 * @category model
 */
export interface ByronAddress extends Schema.Schema.Type<typeof ByronAddress> {}

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
 *
 * const effect = Address.bytesFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const bytes = Effect.runSync(effect);
 * // Returns Uint8Array representing the binary address
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
 *
 * const effect = Address.headerFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const header = Effect.runSync(effect);
 * // Returns a number (e.g., 0) representing the header byte
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
 *
 * const tag = Address.addressTagFromHeader(0);
 * // Returns "Base"
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
 *
 * const effect = Address.addressTagFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const tag = Effect.runSync(effect);
 * // Returns "Base"
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
 *
 * const effect = Address.networkIdFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const networkId = Effect.runSync(effect);
 * // Returns 1 for mainnet
 *
 * // For testnet addresses:
 * const testnetEffect = Address.networkIdFromBech32("addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae");
 * const testnetId = Effect.runSync(testnetEffect);
 * // Returns 0 for testnet
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
 *
 * // Create a buffer that encodes the value 128
 * const buffer = new Uint8Array([0x80, 0x01]);
 *
 * const effect = Address.decodeVariableLength(buffer, 0);
 * const [value, bytesRead] = Effect.runSync(effect);
 * // Returns [128, 2]
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeVariableLength: (
  bytes: Uint8Array<ArrayBufferLike>,
  offset?: number | undefined,
) => Effect.Effect<number[], AddressError> = Effect.fnUntraced(function* (
  bytes,
  offset = 0,
) {
  // The accumulated decoded value
  let value = 0;

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
    value += (b & 0x7f) * multiplier;

    // Check if this is the last byte by testing the high bit (0x80, binary 10000000)
    // If the high bit is 0, we've reached the end of the encoded integer
    if ((b & 0x80) === 0) {
      // Return the decoded value and the count of bytes read
      return [value, bytesRead];
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
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const effect = Address.encodeVariableLength(128);
 * const bytes = Effect.runSync(effect);
 * // Returns Uint8Array([0x80, 0x01])
 *
 * const smallEffect = Address.encodeVariableLength(42);
 * const smallBytes = Effect.runSync(smallEffect);
 * // Returns Uint8Array([42])
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeVariableLength: (
  value: number,
) => Effect.Effect<Uint8Array<ArrayBuffer>, AddressError> = Effect.fnUntraced(
  function* (value) {
    // Variable length integers cannot represent negative numbers
    // Throw an error if a negative value is provided
    if (value < 0) {
      yield* new AddressError({
        message: `Cannot encode negative number as variable length integer: ${value}`,
      });
    }

    // Handle the simple case: values less than 128 (0x80, binary 10000000) fit in a single byte
    // with no continuation bit needed
    if (value < 128) {
      return new Uint8Array([value]);
    }

    // For larger values, we need to split the number into 7-bit chunks
    const result: number[] = [];
    let remaining = value;

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
  },
);

/**
 * Convert bytes to an address structure
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * // const effect = Address.fromBytes(addressBytes);
 * // const address = Effect.runSync(effect);
 * // Returns a structured Address object
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBytes =
  // : (
  //   bytes: Uint8Array<ArrayBufferLike>
  // ) => Effect.Effect<
  //   | BaseAddress
  //   | EnterpriseAddress
  //   | PointerAddress
  //   | RewardAccount
  //   | ByronAddress,
  //   AddressError
  // > =
  Effect.fnUntraced(function* (bytes: Uint8Array) {
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
          : {
              _tag: "ScriptHash",
              hash: yield* Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
            };
        // {
        //   _tag: isPaymentKey ? "KeyHash" : "ScriptHash",
        //   hash: Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
        // };
        const isStakeKey = (addressType & 0b0010) === 0;
        const stakeCredential: Credential.Credential = isStakeKey
          ? yield* KeyHash.fromBytes(bytes.slice(29, 57))
          : {
              _tag: "ScriptHash",
              hash: yield* Bytes.toHex!(bytes.slice(29, 57)), // Stake credential hash (28 bytes)
            };
        // {
        //   _tag: isStakeKey ? "KeyHash" : "ScriptHash",
        //   hash: Bytes.toHex!(bytes.slice(29, 57)), // Stake credential hash (28 bytes)
        // };
        const baseAddress: BaseAddress = {
          _tag: "BaseAddress",
          networkId,
          paymentCredential,
          stakeCredential,
        };
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
          : {
              _tag: "ScriptHash",
              hash: yield* Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
            };
        // {
        //   _tag: isPaymentKey ? "KeyHash" : "ScriptHash",
        //   hash: Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
        // };
        const enterpriseAddress: EnterpriseAddress = {
          _tag: "EnterpriseAddress",
          networkId,
          paymentCredential,
        };
        return enterpriseAddress;
      }

      // Pointer address types (0100, 0101)
      // Format: [payment credential, variable length integers for slot, txIndex, certIndex]
      case 0b0100: // Key payment with pointer
      case 0b0101: {
        // Script payment with pointer
        // Check if the address is a pointer address
        const isPaymentKey = (addressType & 0b0001) === 0;
        // Payment credential is in bytes 1-29 (28 bytes)
        const paymentCredential: Credential.Credential = isPaymentKey
          ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
          : {
              _tag: "ScriptHash",
              hash: yield* Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
            };
        //  {
        //   _tag: isPaymentKey ? "KeyHash" : "ScriptHash",
        //   hash: Bytes.toHex!(bytes.slice(1, 29)), // Payment credential hash (28 bytes)
        // };

        // After the credential, we have 3 variable-length integers
        let offset = 29;

        // Decode the slot, txIndex, and certIndex as variable length integers
        const [slot, slotBytesRead] = yield* decodeVariableLength(
          bytes,
          offset,
        );
        offset += slotBytesRead;

        const [txIndex, txIndexBytesRead] = yield* decodeVariableLength(
          bytes,
          offset,
        );
        offset += txIndexBytesRead;

        const [certIndex, _] = yield* decodeVariableLength(bytes, offset);
        const pointer: Pointer = {
          _tag: "Pointer",
          slot,
          txIndex,
          certIndex,
        };

        const pointerAddress: PointerAddress = {
          _tag: "PointerAddress",
          networkId,
          paymentCredential,
          pointer,
        };

        return pointerAddress;
      }

      case 0b1110:
      case 0b1111: {
        const isStakeKey = (addressType & 0b0001) === 0;
        const stakeCredential: Credential.Credential = isStakeKey
          ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
          : {
              _tag: "ScriptHash",
              hash: yield* Bytes.toHex!(bytes.slice(1, 29)), // Staking credential hash (28 bytes)
            };
        // {
        //   _tag: isStakeKey ? "KeyHash" : "ScriptHash",
        //   hash: Bytes.toHex!(bytes.slice(1, 29)), // Staking credential hash (28 bytes)
        // };
        const rewardAccount: RewardAccount = {
          _tag: "RewardAccount",
          networkId,
          stakeCredential,
        };
        return rewardAccount;
      }

      case 0b1000: {
        return {
          _tag: "ByronAddress",
          bytes: yield* Bytes.toHex!(bytes), // Byron address (hex format)
        } as ByronAddress;
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
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const address = Effect.runSync(effect);
 * // Returns a structured Address object with _tag: "BaseAddress"
 *
 * const stakeEffect = Address.fromBech32("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
 * const stakeAddress = Effect.runSync(stakeEffect);
 * // Returns a structured Address object with _tag: "RewardAccount"
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBech32 =
  // : (
  //   bech32Address: string
  // )
  // => Effect.Effect<
  //   | ByronAddress
  //   | BaseAddress
  //   | EnterpriseAddress
  //   | PointerAddress
  //   | RewardAccount,
  //   AddressError
  // > =
  Effect.fnUntraced(function* (bech32Address) {
    const bytes = yield* bytesFromBech32(bech32Address);
    return yield* fromBytes(bytes);
  });

/**
 * Serialize a PaymentAddress to JSON format
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 *
 * const json = Address.paymentAddressToJson("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * // Returns '{"address":"addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"}'
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
 * import { Effect , pipe } from "effect";
 *
 * const addressEffect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.flatMap(Address.toBytes)
 * );
 *
 * const bytes = Effect.runSync(addressEffect);
 * // Returns Uint8Array of the binary address representation
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBytes =
  // : (
  //   address: Address
  // ) => Effect.Effect<Uint8Array<ArrayBufferLike>, AddressError> =
  Effect.fnUntraced(function* (address: Address) {
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

        const slotBytes = yield* encodeVariableLength(address.pointer.slot);
        const txIndexBytes = yield* encodeVariableLength(
          address.pointer.txIndex,
        );
        const certIndexBytes = yield* encodeVariableLength(
          address.pointer.certIndex,
        );

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
  });

/**
 * Convert address to hex string
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect , pipe } from "effect";
 *
 * const effect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.flatMap(Address.toHex)
 * );
 *
 * const hex = Effect.runSync(effect);
 * // Returns hex string like "01af2f..."
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toHex = (address: Address) =>
  // = (address: Address): Effect.Effect<string, AddressError> =>
  Effect.flatMap(toBytes(address), (bytes) => Bytes.toHex(bytes));

/**
 * Convert address to bech32 format
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect , pipe } from "effect";
 *
 * // First create an address from bytes
 * const bytesEffect = pipe(
 *   Address.fromBytes(Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251")),
 *   Effect.flatMap(Address.toBech32)
 * );
 *
 * const bech32 = Effect.runSync(bytesEffect);
 * // Returns bech32 encoded address like "addr1..."
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBech32: (
  address: Address,
) => Effect.Effect<string, AddressError, never> = Effect.fnUntraced(
  function* (address) {
    const bytes = yield* toBytes(address);
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
        return yield* new AddressError({
          message: `Byron address is not supported for bech32 conversion`,
        });
    }
    const words = bech32.toWords(bytes);
    return bech32.encode(prefix, words, false);
  },
);

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
 *
 * const effect = Address.addressDetailsFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const details = Effect.runSync(effect);
 * // Returns object with network ID, credentials, and encoding details
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromBech32 =
  // : (
  //   bech32Address: string
  // ) => Effect.Effect<AddressDetails, AddressError> =
  Effect.fnUntraced(function* (bech32Address) {
    const decodedAddress = yield* fromBech32(bech32Address);
    const hex = yield* toHex(decodedAddress);
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
 *
 * const effect = Address.addressDetailsFromHex("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const details = Effect.runSync(effect);
 * // Returns object with network ID, credentials, and encoding details
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromHex =
  // : (
  //   hexAddress: string
  // ) => Effect.Effect<AddressDetails, AddressError> =
  Effect.fnUntraced(function* (hexAddress) {
    const decodedAddress = yield* fromBytes(Bytes.fromHexOrThrow(hexAddress));
    const bech32 = yield* toBech32(decodedAddress);
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
 *
 * // From bech32
 * const bech32Effect = Address.addressDetailsFromString("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 *
 * // From hex
 * const hexEffect = Address.addressDetailsFromString("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 *
 * const details = Effect.runSync(bech32Effect);
 * // Returns complete address details regardless of input format
 *
 * @since 2.0.0
 * @category constructors
 */
export const addressDetailsFromString =
  // : (
  //   stringAddress: string
  // ) => Effect.Effect<AddressDetails, AddressError> =
  Effect.fnUntraced(function* (stringAddress) {
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
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x")
 *   .pipe(Effect.flatMap(Address.toCBOR));
 *
 * const cborHex = Effect.runSync(effect);
 * // Returns hex string of the CBOR-encoded address
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR = (address: Address) =>
  Effect.map(toBytes(address), (bytes) => Bytes.toHex!(CBOR.encode(bytes)));
