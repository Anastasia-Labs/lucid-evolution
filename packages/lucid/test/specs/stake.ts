import { Effect, pipe } from "effect";
import { NetworkConfig, User } from "./services.js";
import { handleSignSubmit, withLogRetry } from "./utils.js";
import { Network } from "@evolution-sdk/core-types";
import {
  scriptFromNative,
  unixTimeToSlot,
  paymentCredentialOf,
  validatorToRewardAddress,
} from "@evolution-sdk/utils";
import { Data } from "@evolution-sdk/plutus";

const mkSlotRangeStakePolicy = (address: string) => {
  return scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
    ],
  });
};

export const registerStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG") ||
    error.message.includes("StakeKeyRegisteredDELEG")
      ? Effect.log("Stake Already registered")
      : Effect.fail(error),
  ),
  withLogRetry,
  Effect.orDie,
);

export const delegateTo = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const poolId =
    networkConfig.NETWORK == "Preprod"
      ? "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
      : "pool1ynfnjspgckgxjf2zeye8s33jz3e3ndk9pcwp0qzaupzvvd8ukwt";

  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .delegateTo(rewardAddress, poolId)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const deRegisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  // TODO: Withdraw rewards if any, while de-registering stake address
  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerDeregisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG") ||
    error.message.includes("StakeKeyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  withLogRetry,
  Effect.orDie,
);

export const withdrawZero = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .withdraw(rewardAddress, 0n)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const withdrawAllReward = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const { rewards } = yield* Effect.promise(() =>
    user.wallet().getDelegation(),
  );
  const signBuilder = yield* user
    .newTx()
    .withdraw(rewardAddress, rewards)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerNativeStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const stake = mkSlotRangeStakePolicy(addr);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG") ||
    error.message.includes("StakeKeyRegisteredDELEG")
      ? Effect.log("Stake Already registered")
      : Effect.fail(error),
  ),
  withLogRetry,
  Effect.orDie,
);

export const delegateNativeStakeTo = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const poolId =
    networkConfig.NETWORK == "Preprod"
      ? "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
      : "pool1ynfnjspgckgxjf2zeye8s33jz3e3ndk9pcwp0qzaupzvvd8ukwt";
  const addr = yield* Effect.promise(() => user.wallet().address());
  const stake = mkSlotRangeStakePolicy(addr);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);
  const signBuilder = yield* user
    .newTx()
    .delegateTo(rewardAddress, poolId)
    .attach.Script(stake)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const withdrawAllNativeStakeReward = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const stake = mkSlotRangeStakePolicy(addr);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);

  const { rewards } = yield* Effect.promise(() =>
    user.wallet().getDelegation(),
  );
  const signBuilder = yield* user
    .newTx()
    .withdraw(rewardAddress, rewards)
    .attach.Script(stake)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const deRegisterNativeStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const stake = mkSlotRangeStakePolicy(addr);
  const rewardAddress = validatorToRewardAddress(networkConfig.NETWORK, stake);
  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .attach.Script(stake)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);
