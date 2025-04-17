import { Effect, Schema } from "effect";
import * as Credential from "./Credential.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as Bytes from "./Bytes.js";

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

export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract network ID from the lower 4 bits
  const networkId = header & 0b00001111;
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  const isStakeKey = (addressType & 0b0001) === 0;
  const stakeCredential: Credential.Credential = isStakeKey
    ? yield* KeyHash.fromBytes(bytes.slice(1, 29))
    : yield* ScriptHash.fromBytes(bytes.slice(1, 29));
  const rewardAccount: RewardAccount = makeOrThrow(networkId, stakeCredential);
  return rewardAccount;
});

export const toBytes = (address: RewardAccount): Uint8Array => {
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
};

export const makeOrThrow = (
  networkId: number,
  stakeCredential: Credential.Credential,
): RewardAccount =>
  RewardAccount.make(
    {
      networkId,
      stakeCredential,
    },
    {
      disableValidation: true,
    },
  );
