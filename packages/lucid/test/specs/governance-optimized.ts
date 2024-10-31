import { Effect, pipe } from "effect";
import { AlwaysYesDrepContract, NetworkConfig, User } from "./services";
import { handleSignSubmit, withLogRetry } from "./utils";
import { Data } from "../../src";

const OPTIMIZED = "🔥 Optimized: ";

export const registerDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .register.DRep(rewardAddress)
    .setMinFee(200_000n)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} registerDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(
//   Effect.flatMap(handleSignSubmit),
//   withLogRetry,
//   Effect.orDie
// );

export const deregisterDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .deregister.DRep(rewardAddress)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} deregisterDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const updateDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .updateDRep(rewardAddress)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} updateDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegDRepAlwaysAbstain = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());

  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToDRep(rewardAddress, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} voteDelegDRepAlwaysAbstain`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegDRepAlwaysNoConfidence = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToDRep(rewardAddress, {
      __typename: "AlwaysNoConfidence",
    })
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} voteDelegDRepAlwaysNoConfidence`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const voteDelegPoolAndDRepAlwaysAbstain = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const poolId =
    networkConfig.NETWORK == "Preprod"
      ? "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh"
      : "pool1ynfnjspgckgxjf2zeye8s33jz3e3ndk9pcwp0qzaupzvvd8ukwt";

  const signBuilder = yield* user
    .newTx()
    .delegate.VoteToPoolAndDRep(rewardAddress, poolId, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} voteDelegPoolAndDRepAlwaysAbstain`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

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
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .registerAndDelegate.ToPool(rewardAddress, poolId)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} registerAndDelegateToPool`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerAndDelegateToDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .registerAndDelegate.ToDRep(rewardAddress, {
      __typename: "AlwaysAbstain",
    })
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} registerAndDelegateToDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerAndDelegateToPoolAndDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
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
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} registerAndDelegateToPoolAndDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const registerScriptDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { rewardAddress, script } = yield* AlwaysYesDrepContract;
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .register.DRep(rewardAddress, undefined, Data.void())
    .attach.Script(script)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} registerScriptDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const deregisterScriptDRep = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { rewardAddress, script } = yield* AlwaysYesDrepContract;
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const signBuilder = yield* user
    .newTx()
    .deregister.DRep(rewardAddress, Data.void())
    .attach.Script(script)
    .completeProgram({ presetWalletInputs: walletUTxOs })
    .pipe(
      Effect.tap(Effect.log(`${OPTIMIZED} deregisterScriptDRep`)),
      Effect.withLogSpan("TimeSpan"),
    );
  return signBuilder;
});
// .pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);
