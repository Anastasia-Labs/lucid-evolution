import { Effect, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";

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
