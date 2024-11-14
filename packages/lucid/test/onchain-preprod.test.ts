import { describe, it } from "@effect/vitest";
import { Effect, pipe } from "effect";
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
import * as MetadataEndpoint from "./specs/metadata.js";
import * as WalletEndpoint from "./specs/wallet.js";

import * as DatumEndpoint from "./specs/datums.js";

describe("Onchain Preprod Test",
  () => {
    it.live("MultiValidator - registerStake", () =>
      pipe(
        MultiValidatorEndpoints.registerStake,
        Effect.provide(User.layer),
        Effect.provide(StakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - registerStakeAndDelegateToPool", () =>
      pipe(
        MultiValidatorEndpoints.registerStakeAndDelegateToPool,
        Effect.provide(User.layer),
        Effect.provide(SimpleStakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - deRegisterStake", () =>
      pipe(
        MultiValidatorEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(SimpleStakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - DespositFunds", () =>
      pipe(
        MultiValidatorEndpoints.depositFunds,
        Effect.provide(User.layer),
        Effect.provide(StakeContract.layer),
        Effect.provide(MintContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - CollectFunds", () =>
      pipe(
        MultiValidatorEndpoints.collectFunds,
        Effect.provide(User.layer),
        Effect.provide(StakeContract.layer),
        Effect.provide(MintContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - registerSimpleStake", () =>
      pipe(
        MultiValidatorEndpoints.registerSimpleStake,
        Effect.provide(User.layer),
        Effect.provide(SimpleStakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - mintAndWithdrawSimpleStake", () =>
      pipe(
        MultiValidatorEndpoints.mintAndWithdraw,
        Effect.provide(User.layer),
        Effect.provide(SimpleMintContract.layer),
        Effect.provide(SimpleStakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("MultiValidator - deRegisterStake", () =>
      pipe(
        MultiValidatorEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(SimpleStakeContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Metadata", () =>
      pipe(
        MetadataEndpoint.payWithMetadata,
        Effect.provide(User.layer),
        Effect.provide(HelloContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("DespositFunds", () =>
      pipe(
        HelloEndpoints.depositFunds,
        Effect.provide(User.layer),
        Effect.provide(HelloContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("CollectFunds", () =>
      pipe(
        HelloEndpoints.collectFunds,
        Effect.provide(User.layer),
        Effect.provide(HelloContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("DespositFunds, lock reference script", () =>
      pipe(
        HelloEndpoints.depositFundsLockRefScript,
        Effect.provide(User.layer),
        Effect.provide(HelloContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("CollectFunds , reading from reference script", () =>
      pipe(
        HelloEndpoints.collectFundsReadFrom,
        Effect.provide(User.layer),
        Effect.provide(HelloContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerStake", () =>
      pipe(
        StakeEndpoints.registerStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterStake", () =>
      pipe(
        StakeEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerStake/deRegisterStake", () =>
      pipe(
        StakeEndpoints.registerDeregisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerStake", () =>
      pipe(
        StakeEndpoints.registerStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("voteDelegDRepAlwaysAbstain", () =>
      pipe(
        GovernanceEndpoints.voteDelegDRepAlwaysAbstain,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("voteDelegDRepAlwaysNoConfidence", () =>
      pipe(
        GovernanceEndpoints.voteDelegDRepAlwaysNoConfidence,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("voteDelegPoolAndDRepAlwaysAbstain", () =>
      pipe(
        GovernanceEndpoints.voteDelegPoolAndDRepAlwaysAbstain,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("delegateTo", () =>
      pipe(
        StakeEndpoints.delegateTo,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("withdrawAllReward", () =>
      pipe(
        StakeEndpoints.withdrawAllReward,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("withdrawZero", () =>
      pipe(
        StakeEndpoints.withdrawZero,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterStake", () =>
      pipe(
        StakeEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerAndDelegateToPool", () =>
      pipe(
        GovernanceEndpoints.registerAndDelegateToPool,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterStake", () =>
      pipe(
        StakeEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerNativeStake", () =>
      pipe(
        StakeEndpoints.registerNativeStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("delegateNativeStakeTo", () =>
      pipe(
        StakeEndpoints.delegateNativeStakeTo,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("withdrawAllNativeStake", () =>
      pipe(
        StakeEndpoints.withdrawAllNativeStakeReward,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterNativeStake", () =>
      pipe(
        StakeEndpoints.deRegisterNativeStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerAndDelegateToDRep", () =>
      pipe(
        GovernanceEndpoints.registerAndDelegateToDRep,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterStake", () =>
      pipe(
        StakeEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerAndDelegateToPoolAndDRep", () =>
      pipe(
        GovernanceEndpoints.registerAndDelegateToPoolAndDRep,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deRegisterStake", () =>
      pipe(
        StakeEndpoints.deRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Parametrized Contract - Deposit Funds", () =>
      pipe(
        ParametrizedEndpoints.depositFunds,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Parametrized Contract - Collect Funds", () =>
      pipe(
        ParametrizedEndpoints.collectFunds,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Mint Token", () =>
      pipe(
        MintBurnEndpoints.mint,
        Effect.provide(User.layer),
        Effect.provide(MintContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Burn Token", () =>
      pipe(
        MintBurnEndpoints.burn,
        Effect.provide(User.layer),
        Effect.provide(MintContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Mint/Burn Token", () =>
      pipe(
        MintBurnEndpoints.mintburn,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Mint Token, Second Test", () =>
      pipe(
        MintBurnEndpoints.mint2,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Burn Token, Second Test", () =>
      pipe(
        MintBurnEndpoints.burn2,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("Mint Test - Pay", () =>
      pipe(
        MintBurnEndpoints.pay,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    // Helps recycle utxos when the coin selection algorithm is set to Largest first
    // and reduce UTxO bloat in wallet
    it.live("recycleUTxOs", () =>
      pipe(
        WalletEndpoint.recycleUTxOs,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("payWithAsHashDatum", () =>
      pipe(
        DatumEndpoint.payWithAsHashDatum,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerDRep", () =>
      pipe(
        GovernanceEndpoints.registerDRep,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("updateDRep", () =>
      pipe(
        GovernanceEndpoints.updateDRep,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deregisterDRep", () =>
      pipe(
        GovernanceEndpoints.deregisterDRep,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("registerScriptDRep", () =>
      pipe(
        GovernanceEndpoints.registerScriptDRep,
        Effect.provide(User.layer),
        Effect.provide(AlwaysYesDrepContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("deregisterScriptDRep", () =>
      pipe(
        GovernanceEndpoints.deregisterScriptDRep,
        Effect.provide(User.layer),
        Effect.provide(AlwaysYesDrepContract.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("composeMintTx", () =>
      pipe(
        ComposeEndpoints.composeMintTx,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("multiTxCompose", () =>
      pipe(
        ComposeEndpoints.multiTxCompose,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("composeMintAndRegisterStake", () =>
      pipe(
        ComposeEndpoints.composeMintAndRegisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("composeMintAndDeregisterStake", () =>
      pipe(
        ComposeEndpoints.composeMintAndDeregisterStake,
        Effect.provide(User.layer),
        Effect.provide(NetworkConfig.layerPreprod)
      )
    );

    it.live("composeDepositFundsLockRefScriptAndRegisterDrep", () =>
      pipe(
        ComposeEndpoints.composeDepositFundsLockRefScriptAndRegisterDrep,
        Effect.provide(User.layer),
        Effect.provide(AlwaysYesDrepContract.layer),
        Effect.provide(NetworkConfig.layerPreprod),
        Effect.provide(HelloContract.layer)
      )
    );

    it.live("composeCollectFundsReadFromAndDeregisterDrep", () =>
      pipe(
        ComposeEndpoints.composeCollectFundsReadFromAndDeregisterDrep,
        Effect.provide(User.layer),
        Effect.provide(AlwaysYesDrepContract.layer),
        Effect.provide(NetworkConfig.layerPreprod),
        Effect.provide(HelloContract.layer)
      )
    );
  },
  { sequential: true }
);
