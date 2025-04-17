import { Effect, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";

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

export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  // Script payment
  const isPaymentKey = (addressType & 0b0001) === 0;
  const paymentCredential: Credential.Credential = isPaymentKey
    ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
    : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
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
