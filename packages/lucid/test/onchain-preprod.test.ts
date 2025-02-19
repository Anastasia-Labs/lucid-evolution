import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import {
  HelloContract,
  StakeContract,
  MintContract,
  User,
  NetworkConfig,
  SimpleStakeContract,
  SimpleMintContract,
  AlwaysYesDrepContract,
} from "./specs/services.js";
import * as HelloEndpoints from "./specs/hello.js";
import * as StakeEndpoints from "./specs/stake.js";
import * as GovernanceEndpoints from "./specs/governance.js";
import * as ComposeEndpoints from "./specs/compose.js";
import * as MultiValidatorEndpoints from "./specs/multi-validators.js";
import * as MintBurnEndpoints from "./specs/mint-burn.js";
import * as ParametrizedEndpoints from "./specs/hello-params.js";
import * as TxChain from "./specs/tx-chaining.js";
import * as MetadataEndpoint from "./specs/metadata.js";
import * as WalletEndpoint from "./specs/wallet.js";

import * as DatumEndpoint from "./specs/datums.js";

describe.sequential("Onchain testing", () => {
  test.skip("TxChain", async () => {
    const program = pipe(
      TxChain.depositFundsCollect,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - registerStake", async () => {
    const program = pipe(
      MultiValidatorEndpoints.registerStake,
      Effect.provide(User.layer),
      Effect.provide(SimpleStakeContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - mintAndWithdrawSimpleStake", async () => {
    const program = pipe(
      MultiValidatorEndpoints.mintAndWithdraw,
      Effect.provide(User.layer),
      Effect.provide(SimpleMintContract.layer),
      Effect.provide(SimpleStakeContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - deRegisterStake", async () => {
    const program = pipe(
      MultiValidatorEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(SimpleStakeContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - registerStakeAndDelegateToPool", async () => {
    const program = pipe(
      MultiValidatorEndpoints.registerStakeAndDelegateToPool,
      Effect.provide(User.layer),
      Effect.provide(SimpleStakeContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("MultiValidator - deRegisterStake", async () => {
    const program = pipe(
      MultiValidatorEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(SimpleStakeContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.skip("MultiValidator - DespositFunds", async () => {
    const program = pipe(
      MultiValidatorEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.skip("MultiValidator - CollectFunds", async () => {
    const program = pipe(
      MultiValidatorEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(StakeContract.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Metadata", async () => {
    const program = pipe(
      MetadataEndpoint.payWithMetadata,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    console.log(exit);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds", async () => {
    const program = pipe(
      HelloEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("CollectFunds", async () => {
    const program = pipe(
      HelloEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("DespositFunds, lock reference script", async () => {
    const program = pipe(
      HelloEndpoints.depositFundsLockRefScript,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test.skip("CollectFunds , reading from reference script", async () => {
    const program = pipe(
      HelloEndpoints.collectFundsReadFrom,
      Effect.provide(User.layer),
      Effect.provide(HelloContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerStake", async () => {
    const program = pipe(
      StakeEndpoints.registerStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("voteDelegDRepAlwaysAbstain", async () => {
    const program = pipe(
      GovernanceEndpoints.voteDelegDRepAlwaysAbstain,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("voteDelegDRepAlwaysNoConfidence", async () => {
    const program = pipe(
      GovernanceEndpoints.voteDelegDRepAlwaysNoConfidence,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("voteDelegPoolAndDRepAlwaysAbstain", async () => {
    const program = pipe(
      GovernanceEndpoints.voteDelegPoolAndDRepAlwaysAbstain,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("delegateTo", async () => {
    const program = pipe(
      StakeEndpoints.delegateTo,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawAllReward", async () => {
    const program = pipe(
      StakeEndpoints.withdrawAllReward,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawZero", async () => {
    const program = pipe(
      StakeEndpoints.withdrawZero,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerAndDelegateToPool", async () => {
    const program = pipe(
      GovernanceEndpoints.registerAndDelegateToPool,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerNativeStake", async () => {
    const program = pipe(
      StakeEndpoints.registerNativeStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("delegateNativeStakeTo", async () => {
    const program = pipe(
      StakeEndpoints.delegateNativeStakeTo,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("withdrawAllNativeStake", async () => {
    const program = pipe(
      StakeEndpoints.withdrawAllNativeStakeReward,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterNativeStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterNativeStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerAndDelegateToDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.registerAndDelegateToDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerAndDelegateToPoolAndDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.registerAndDelegateToPoolAndDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deRegisterStake", async () => {
    const program = pipe(
      StakeEndpoints.deRegisterStake,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Parametrized Contract - Deposit Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.depositFunds,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Parametrized Contract - Collect Funds", async () => {
    const program = pipe(
      ParametrizedEndpoints.collectFunds,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mint,
      Effect.provide(User.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.burn,
      Effect.provide(User.layer),
      Effect.provide(MintContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint/Burn Token", async () => {
    const program = pipe(
      MintBurnEndpoints.mintburn,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Mint Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.mint2,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Burn Token, Second Test", async () => {
    const program = pipe(
      MintBurnEndpoints.burn2,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("Mint Test - Pay", async () => {
    const program = pipe(
      MintBurnEndpoints.pay,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  // Helps recycle utxos when the coin selection algorithm is set to Largest first
  // and reduce UTxO bloat in wallet
  test("recycleUTxOs", async () => {
    const program = pipe(
      WalletEndpoint.recycleUTxOs,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("payWithAsHashDatum", async () => {
    const program = pipe(
      DatumEndpoint.payWithAsHashDatum,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    console.log("exit :>> ", exit);
    expect(exit._tag).toBe("Success");
  });

  test("registerDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.registerDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("updateDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.updateDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deregisterDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.deregisterDRep,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerScriptDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.registerScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deregisterScriptDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.deregisterScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("composeMintTx", async () => {
    const program = pipe(
      ComposeEndpoints.composeMintTx,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("multiTxCompose", async () => {
    const program = pipe(
      ComposeEndpoints.multiTxCompose,
      Effect.provide(User.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("composeDepositFundsLockRefScriptAndRegisterDrep", async () => {
    const program = pipe(
      ComposeEndpoints.composeDepositFundsLockRefScriptAndRegisterDrep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
      Effect.provide(HelloContract.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("composeCollectFundsReadFromAndDeregisterDrep", async () => {
    const program = pipe(
      ComposeEndpoints.composeCollectFundsReadFromAndDeregisterDrep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
      Effect.provide(HelloContract.layer),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("registerAndDelegateToPoolAndScriptDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.registerAndDelegateToPoolAndScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });

  test("deregisterScriptDRep", async () => {
    const program = pipe(
      GovernanceEndpoints.deregisterStakeScriptDRep,
      Effect.provide(User.layer),
      Effect.provide(AlwaysYesDrepContract.layer),
      Effect.provide(NetworkConfig.layerPreprod),
    );
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
  });
});
