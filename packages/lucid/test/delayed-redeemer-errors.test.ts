import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import {
  BuildTxWithRedeemer,
  Provider,
  RedeemerBuilder,
  Script,
  TxBuilder,
  UTxO,
  credentialToAddress,
  credentialToRewardAddress,
  makeTxBuilder,
  mintingPolicyToId,
  scriptFromNative,
  validatorToAddress,
  validatorToRewardAddress,
} from "../src/index.js";
import { makeTxConfig } from "../src/tx-builder/TxConfig.js";
import {
  makeReplayConfig,
  replayTxActions,
} from "../src/tx-builder/TxBuilder.js";
import { TxConfig } from "../src/tx-builder/internal/Service.js";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/utils";
import { Data } from "@lucid-evolution/plutus";

const provider = {} as Provider;
const protocolParameters = PROTOCOL_PARAMETERS_DEFAULT;
const costModels = createCostModels(protocolParameters.costModels);
const lucidConfig = {
  provider,
  network: "Custom" as const,
  wallet: undefined,
  txbuilderconfig: makeTxConfig(protocolParameters, costModels),
  costModels,
  protocolParameters,
};

const missingScriptHash = "11".repeat(28);
const keyHash = "22".repeat(28);

const delayedRedeemer: BuildTxWithRedeemer = () => Data.void();

const nativeScript = (): Script =>
  scriptFromNative({
    type: "sig",
    keyHash,
  });

const replay = async (tx: TxBuilder) => {
  const sourceConfig = tx.rawConfig();
  const replayConfig = makeReplayConfig(sourceConfig);
  await Effect.runPromise(
    pipe(
      replayTxActions(sourceConfig.actions),
      Effect.provide(Layer.succeed(TxConfig, { config: replayConfig })),
    ),
  );
};

const utxoAt = (address: string): UTxO => ({
  txHash: "00".repeat(32),
  outputIndex: 0,
  address,
  assets: { lovelace: 2_000_000n },
});

const selectedRedeemerFor = (utxo: UTxO): RedeemerBuilder => ({
  kind: "selected",
  inputs: [utxo],
  makeRedeemer: () => Data.void(),
});

describe("delayed redeemer missing script errors", () => {
  test("certificate action signatures accept delayed redeemers", () => {
    const rewardAddress = credentialToRewardAddress("Custom", {
      type: "Script",
      hash: missingScriptHash,
    });
    const poolId =
      "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq0l0f7j";
    const drep = { __typename: "AlwaysAbstain" as const };

    const builders = [
      makeTxBuilder(lucidConfig).deRegisterStake(
        rewardAddress,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).deregister.Stake(
        rewardAddress,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).delegateTo(
        rewardAddress,
        poolId,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).delegate.ToPool(
        rewardAddress,
        poolId,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).register.DRep(
        rewardAddress,
        undefined,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).deregister.DRep(
        rewardAddress,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).delegate.VoteToDRep(
        rewardAddress,
        drep,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).delegate.VoteToPoolAndDRep(
        rewardAddress,
        poolId,
        drep,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).registerAndDelegate.ToPool(
        rewardAddress,
        poolId,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).registerAndDelegate.ToDRep(
        rewardAddress,
        drep,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).registerAndDelegate.ToPoolAndDRep(
        rewardAddress,
        poolId,
        drep,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).updateDRep(
        rewardAddress,
        undefined,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).authCommitteeHot(
        rewardAddress,
        rewardAddress,
        delayedRedeemer,
      ),
      makeTxBuilder(lucidConfig).resignCommitteeHot(
        rewardAddress,
        undefined,
        delayedRedeemer,
      ),
    ];

    expect(
      builders.every(
        (builder) => builder.rawConfig().actions[0]?.hasDelayedRedeemer,
      ),
    ).toBe(true);
  });

  test("collectFrom selected redeemer preserves missing spending script error", async () => {
    const scriptAddress = credentialToAddress("Custom", {
      type: "Script",
      hash: missingScriptHash,
    });
    const utxo = utxoAt(scriptAddress);

    await expect(
      replay(
        makeTxBuilder(lucidConfig).collectFrom(
          [utxo],
          selectedRedeemerFor(utxo),
        ),
      ),
    ).rejects.toThrow(
      new RegExp(`MISSING_SCRIPT:.*script_hash: ${missingScriptHash}`),
    );
  });

  test("withdraw redeemer preserves missing withdrawal script error", async () => {
    const rewardAddress = credentialToRewardAddress("Custom", {
      type: "Script",
      hash: missingScriptHash,
    });

    await expect(
      replay(
        makeTxBuilder(lucidConfig).withdraw(rewardAddress, 1n, delayedRedeemer),
      ),
    ).rejects.toThrow(
      new RegExp(`MISSING_SCRIPT:.*script_hash: ${missingScriptHash}`),
    );
  });

  test("mint redeemer preserves missing policy error", async () => {
    await expect(
      replay(
        makeTxBuilder(lucidConfig).mintAssets(
          { [missingScriptHash]: 1n },
          delayedRedeemer,
        ),
      ),
    ).rejects.toThrow(
      new RegExp(`MISSING_POLICY:.*policy_id: ${missingScriptHash}`),
    );
  });

  test("certificate redeemer preserves missing certificate script error", async () => {
    const rewardAddress = credentialToRewardAddress("Custom", {
      type: "Script",
      hash: missingScriptHash,
    });

    await expect(
      replay(
        makeTxBuilder(lucidConfig).deregister.Stake(
          rewardAddress,
          delayedRedeemer,
        ),
      ),
    ).rejects.toThrow(
      new RegExp(`MISSING_SCRIPT:.*script_hash: ${missingScriptHash}`),
    );
  });

  test("delayed redeemers still reject native and key witnesses clearly", async () => {
    const native = nativeScript();
    const nativePolicyId = mintingPolicyToId(native);
    const nativeAddress = validatorToAddress("Custom", native);
    const nativeRewardAddress = validatorToRewardAddress("Custom", native);
    const nativeUtxo = utxoAt(nativeAddress);
    const keyRewardAddress = credentialToRewardAddress("Custom", {
      type: "Key",
      hash: keyHash,
    });

    await expect(
      replay(
        makeTxBuilder(lucidConfig)
          .attach.SpendingValidator(native)
          .collectFrom([nativeUtxo], selectedRedeemerFor(nativeUtxo)),
      ),
    ).rejects.toThrow(
      /Delayed collectFrom redeemer requires at least one Plutus spend witness/,
    );

    await expect(
      replay(
        makeTxBuilder(lucidConfig)
          .attach.MintingPolicy(native)
          .mintAssets({ [nativePolicyId]: 1n }, delayedRedeemer),
      ),
    ).rejects.toThrow(
      /Delayed mintAssets redeemer requires a Plutus mint witness/,
    );

    await expect(
      replay(
        makeTxBuilder(lucidConfig).withdraw(
          keyRewardAddress,
          1n,
          delayedRedeemer,
        ),
      ),
    ).rejects.toThrow(
      /Delayed withdraw redeemer requires a Plutus withdrawal witness/,
    );

    await expect(
      replay(
        makeTxBuilder(lucidConfig).deregister.Stake(
          keyRewardAddress,
          delayedRedeemer,
        ),
      ),
    ).rejects.toThrow(
      /Delayed certificate redeemer requires a Plutus certificate witness/,
    );

    await expect(
      replay(
        makeTxBuilder(lucidConfig)
          .attach.CertificateValidator(native)
          .deregister.Stake(nativeRewardAddress, delayedRedeemer),
      ),
    ).rejects.toThrow(
      /Delayed certificate redeemer requires a Plutus certificate witness/,
    );
  });
});
