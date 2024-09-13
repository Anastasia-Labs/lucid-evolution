import { Effect, pipe } from "effect";
import {
  AlwaysYesDrepContract,
  NetworkConfig,
  SimpleStakeContract,
  User,
} from "./services";
import { handleSignSubmit, withLogRetry } from "./utils";
import { Data } from "../../src";

export const registerDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .register.DRep(rewardAddress)
    .setMinFee(200_000n)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) => Effect.fail(error)),
  withLogRetry,
  Effect.orDie,
);

export const deregisterDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .deregister.DRep(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const updateDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .updateDRep(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegDRepAlwaysAbstain = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToDRep(rewardAddress, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegDRepAlwaysNoConfidence = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToDRep(rewardAddress, {
      __typename: "AlwaysNoConfidence",
    })
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegPoolAndDRepAlwaysAbstain = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const poolId =
    networkConfig.NETWORK == "Preprod"
      ? "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
      : "pool1ynfnjspgckgxjf2zeye8s33jz3e3ndk9pcwp0qzaupzvvd8ukwt";

  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToPoolAndDRep(rewardAddress, poolId, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerAndDelegateToPool = Effect.gen(function* ($) {
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
    .registerAndDelegate.ToPool(rewardAddress, poolId)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerAndDelegateToDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerAndDelegate.ToDRep(rewardAddress, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerAndDelegateToPoolAndDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const networkConfig = yield* NetworkConfig;
  const poolId =
    networkConfig.NETWORK == "Preprod"
      ? "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
      : "pool1ynfnjspgckgxjf2zeye8s33jz3e3ndk9pcwp0qzaupzvvd8ukwt";
  const signBuilder = yield* user
    .newTx()
    .registerAndDelegate.ToPoolAndDRep(rewardAddress, poolId, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerScriptDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { rewardAddress, script } = yield* AlwaysYesDrepContract;
  const signBuilder = yield* user
    .newTx()
    .register.DRep(rewardAddress, undefined, Data.void())
    .attach.Script(script)
    .setMinFee(200_000n)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) => Effect.fail(error)),
  withLogRetry,
  Effect.orDie,
);

export const deregisterScriptDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { rewardAddress, script } = yield* AlwaysYesDrepContract;
  const signBuilder = yield* user
    .newTx()
    .deregister.DRep(rewardAddress, Data.void())
    .attach.Script(script)
    .setMinFee(200_000n)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) => Effect.fail(error)),
  withLogRetry,
  Effect.orDie,
);
