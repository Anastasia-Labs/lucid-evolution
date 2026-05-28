import { Effect } from "effect";
import { CML, PoolParams, paymentCredentialOf } from "../../../src/index.js";
import { User } from "../service/EmulatorUser.js";

const poolParams = Effect.gen(function* () {
  const { user, rewardAddress } = yield* User;
  const address = yield* Effect.promise(() => user.wallet().address());
  const paymentCredential = paymentCredentialOf(address);
  if (paymentCredential.type !== "Key") {
    return yield* Effect.die("Pool registration requires a key payment wallet");
  }

  return {
    poolId: CML.Ed25519KeyHash.from_hex(paymentCredential.hash).to_bech32(
      "pool",
    ),
    vrfKeyHash: "00".repeat(32),
    pledge: 0n,
    cost: 340_000_000n,
    margin: 1,
    rewardAddress,
    owners: [rewardAddress],
    relays: [],
  } satisfies PoolParams;
});

export const registerDRep = Effect.gen(function* () {
  const { user, rewardAddress } = yield* User;
  return yield* user.newTx().register.DRep(rewardAddress).completeProgram();
});

export const delegateVoteToAlwaysAbstain = Effect.gen(function* () {
  const { user, rewardAddress } = yield* User;
  return yield* user
    .newTx()
    .delegate.VoteToDRep(rewardAddress, { __typename: "AlwaysAbstain" })
    .completeProgram();
});

export const registerPool = Effect.gen(function* () {
  const { user } = yield* User;
  const params = yield* poolParams;
  const signBuilder = yield* user
    .newTx()
    .register.Pool(params)
    .completeProgram();
  return { signBuilder, poolId: params.poolId } as const;
});

export const retirePool = (poolId: string) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const signBuilder = yield* user
      .newTx()
      .retire.Pool(poolId, 1n)
      .completeProgram();
    return signBuilder;
  });
