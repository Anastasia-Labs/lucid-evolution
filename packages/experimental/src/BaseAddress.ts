import { Effect, FastCheck, Inspectable, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";
import * as Network from "./Network.js";

export declare const NominalType: unique symbol;

export interface BaseAddress {
  readonly [NominalType]: unique symbol;
}

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
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "BaseAddress",
      networkId: this.networkId,
      paymentCredential: this.paymentCredential,
      stakeCredential: this.stakeCredential,
    };
  }
}

/**
 * Create a BaseAddress from bytes.
 *
 * @example
 * import { BaseAddress, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // Sample address bytes
 * const bytes = Bytes.fromHexOrThrow("100607f9006603f3dd1cf8fc033cfb0718064e013bfdfb84fc5105d1006f1603021707060342fe0505000107fbd206d2aa000141fb0602079b");
 * const addressEffect = BaseAddress.fromBytes(bytes);
 * const address = Effect.runSync(addressEffect);
 * assert(address._tag === "BaseAddress");
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

  // Script payment, Script stake
  const isPaymentKey = (addressType & 0b0001) === 0;
  const paymentCredential: Credential.Credential = isPaymentKey
    ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
    : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
  const isStakeKey = (addressType & 0b0010) === 0;
  const stakeCredential: Credential.Credential = isStakeKey
    ? yield* KeyHash.fromBytes(bytes.slice(29, 57))
    : yield* ScriptHash.fromBytes(bytes.slice(29, 57));
  const baseAddress: BaseAddress = makeOrThrow(
    networkId,
    paymentCredential,
    stakeCredential,
  );
  return baseAddress;
});

/**
 * Convert a BaseAddress to bytes.
 *
 * @example
 * import { BaseAddress, Credential, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create payment and stake credentials
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const stakeKeyHash = KeyHash.makeOrThrow("530245ff0704032c031302cf01fb06010521a7fd024404010004f814");
 *
 * // Create base address
 * const address = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
 * const bytes = BaseAddress.toBytes(address);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 57);
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes = (address: BaseAddress): Uint8Array => {
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
};

/**
 * Create a BaseAddress from network ID and credentials, throws on error.
 *
 * @example
 * import { BaseAddress, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create payment and stake credentials
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const stakeKeyHash = KeyHash.makeOrThrow("530245ff0704032c031302cf01fb06010521a7fd024404010004f814");
 *
 * // Create base address
 * const address = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
 * assert(address._tag === "BaseAddress");
 * assert(address.networkId === 0);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow = (
  networkId: number,
  paymentCredential: Credential.Credential,
  stakeCredential: Credential.Credential,
): BaseAddress =>
  BaseAddress.make(
    {
      networkId,
      paymentCredential,
      stakeCredential,
    },
    {
      disableValidation: true,
    },
  );

/**
 * Check if two BaseAddress instances are equal.
 *
 * @example
 * import { BaseAddress, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create credentials
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const stakeKeyHash = KeyHash.makeOrThrow("530245ff0704032c031302cf01fb06010521a7fd024404010004f814");
 *
 * // Create two identical addresses
 * const address1 = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
 * const address2 = BaseAddress.makeOrThrow(0, paymentKeyHash, stakeKeyHash);
 * const address3 = BaseAddress.makeOrThrow(1, paymentKeyHash, stakeKeyHash);
 *
 * assert(BaseAddress.equals(address1, address2) === true);
 * assert(BaseAddress.equals(address1, address3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: BaseAddress, b: BaseAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    Credential.equals(a.paymentCredential, b.paymentCredential) &&
    Credential.equals(a.stakeCredential, b.stakeCredential)
  );
};

/**
 * Generate a random BaseAddress.
 *
 * @example
 * import { BaseAddress } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(BaseAddress.generator, 20);
 * randomSamples.forEach((address) => {
 *   assert(address._tag === "BaseAddress");
 *   assert(typeof address.networkId === "number");
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Network.generator,
  Credential.generator,
  Credential.generator,
).map(([networkId, paymentCredential, stakeCredential]) => {
  return makeOrThrow(networkId, paymentCredential, stakeCredential);
});
