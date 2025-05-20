import { Effect, FastCheck, Inspectable, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";
import * as Network from "./Network.js";

export declare const NominalType: unique symbol;
export interface EnterpriseAddress {
  readonly [NominalType]: unique symbol;
}

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
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "EnterpriseAddress",
      networkId: this.networkId,
      paymentCredential: this.paymentCredential,
    };
  }
}

export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  // Script payment
  const isPaymentKey = (addressType & 0b0001) === 0;
  const paymentCredential: Credential.Credential = isPaymentKey
    ? yield* KeyHash.decodeBytes(bytes.slice(1, 29))
    : yield* ScriptHash.decodeBytes(bytes.slice(1, 29));
  const enterpriseAddress: EnterpriseAddress = makeOrThrow(
    networkId,
    paymentCredential,
  );
  return enterpriseAddress;
});

export const toBytes = (address: EnterpriseAddress): Uint8Array => {
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
};

/**
 * Create an EnterpriseAddress from network ID and payment credential, throws on error.
 *
 * @example
 * import { EnterpriseAddress, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create payment credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create enterprise address
 * const address = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
 * assert(address._tag === "EnterpriseAddress");
 * assert(address.networkId === 0);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow = (
  networkId: number,
  paymentCredential: Credential.Credential,
): EnterpriseAddress =>
  EnterpriseAddress.make(
    {
      networkId,
      paymentCredential,
    },
    {
      disableValidation: true,
    },
  );

/**
 * Check if two EnterpriseAddress instances are equal.
 *
 * @example
 * import { EnterpriseAddress, KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * // Create credential
 * const paymentKeyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * // Create two identical addresses
 * const address1 = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
 * const address2 = EnterpriseAddress.makeOrThrow(0, paymentKeyHash);
 * const address3 = EnterpriseAddress.makeOrThrow(1, paymentKeyHash);
 *
 * assert(EnterpriseAddress.equals(address1, address2) === true);
 * assert(EnterpriseAddress.equals(address1, address3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: EnterpriseAddress, b: EnterpriseAddress): boolean => {
  return (
    a.networkId === b.networkId &&
    a.paymentCredential._tag === b.paymentCredential._tag &&
    a.paymentCredential.hash === b.paymentCredential.hash
  );
};

/**
 * Generate a random EnterpriseAddress.
 *
 * @example
 * import { EnterpriseAddress } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(EnterpriseAddress.generator, 20);
 * randomSamples.forEach((address) => {
 *   assert(address._tag === "EnterpriseAddress");
 *   assert(typeof address.networkId === "number");
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.tuple(
  Network.generator,
  Credential.generator,
).map(([networkId, paymentCredential]) => {
  return makeOrThrow(networkId, paymentCredential);
});
