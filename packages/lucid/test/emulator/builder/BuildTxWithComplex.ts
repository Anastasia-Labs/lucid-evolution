import { fromText } from "@lucid-evolution/core-utils";
import { Constr, Data } from "@lucid-evolution/plutus";
import { Effect } from "effect";
import {
  applyDoubleCborEncoding,
  BuildTxWithRedeemer,
  getAddressDetails,
  mintingPolicyToId,
  OutRef,
  RewardAddress,
  Script,
  scriptFromNative,
  UTxO,
  validatorToAddress,
  validatorToRewardAddress,
} from "../../../src/index.js";
import scripts from "../../specs/contracts/plutus.json" assert { type: "json" };
import { EmulatorInstance } from "../service/EmulatorInstance.js";
import { User } from "../service/EmulatorUser.js";

const scriptByTitle = (title: string): Script => {
  const compiledCode = scripts.validators.find(
    (validator) => validator.title === title,
  )?.compiledCode;
  if (!compiledCode) throw new Error(`Missing test script: ${title}`);
  return {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(compiledCode),
  };
};

export const BUILD_TX_WITH_COMPLEX_REWARD = 100_000_000n;

const NATIVE_POLICY_EXPIRY_SLOT = 10_000_000;
const MARKER_NAMES = ["CtxMarkerA", "CtxMarkerB", "CtxMarkerC"] as const;

export type StressObservation = {
  inputCheckIndices: bigint[];
  redeemerListIndices: bigint[];
  mintPolicyIndices: bigint[];
  withdrawalIndices: bigint[];
  referenceInputCount: number;
  mintedUnits: string[];
  ownRedeemerListIndex: bigint | undefined;
};

export type BuildTxWithComplexWalletUnits = {
  stressA: string;
  stressB: string;
  stressC: string;
  nativeA: string;
  nativeB: string;
  markerA: string;
  markerB: string;
  markerC: string;
};

export type BuildTxWithComplexTrace = {
  stressInputs: UTxO[];
  referenceInput: UTxO | undefined;
  rewardAddress: RewardAddress;
  walletUnits: BuildTxWithComplexWalletUnits | undefined;
  observations: {
    stressSpends: StressObservation[];
    mintPolicies: StressObservation[];
    withdrawals: StressObservation[];
  };
};

export const stressValidator = (): Script =>
  scriptByTitle("redeemer_indexing.build_tx_with_stress.spend");

export const stressRewardAddress = (): RewardAddress =>
  validatorToRewardAddress("Custom", stressValidator());

export const makeBuildTxWithComplexTrace = (): BuildTxWithComplexTrace => ({
  stressInputs: [],
  referenceInput: undefined,
  rewardAddress: stressRewardAddress(),
  walletUnits: undefined,
  observations: {
    stressSpends: [],
    mintPolicies: [],
    withdrawals: [],
  },
});

const nativePolicyFor = (owner: string): Script =>
  scriptFromNative({
    type: "all",
    scripts: [
      { type: "before", slot: NATIVE_POLICY_EXPIRY_SLOT },
      { type: "sig", keyHash: owner },
    ],
  });

const walletUnitsFor = (
  stressPolicyId: string,
  nativePolicyId: string,
): BuildTxWithComplexWalletUnits => ({
  stressA: stressPolicyId + fromText("CtxStressA"),
  stressB: stressPolicyId + fromText("CtxStressB"),
  stressC: stressPolicyId + fromText("CtxStressC"),
  nativeA: nativePolicyId + fromText("CtxNativeA"),
  nativeB: nativePolicyId + fromText("CtxNativeB"),
  markerA: nativePolicyId + fromText(MARKER_NAMES[0]),
  markerB: nativePolicyId + fromText(MARKER_NAMES[1]),
  markerC: nativePolicyId + fromText(MARKER_NAMES[2]),
});

const markerUnits = (units: BuildTxWithComplexWalletUnits): string[] => [
  units.markerA,
  units.markerB,
  units.markerC,
];

const unitPolicyId = (unit: string): string => unit.slice(0, 56);
const unitAssetName = (unit: string): string => unit.slice(56);

const some = (value: unknown) => new Constr(0, [value]);
const scriptCredential = (scriptHash: string) => new Constr(1, [scriptHash]);
const outputReference = (outRef: OutRef) =>
  new Constr(0, [outRef.txHash, BigInt(outRef.outputIndex)]);

const assetCheck = (unit: string, minQuantity: bigint) =>
  new Constr(0, [unitPolicyId(unit), unitAssetName(unit), minQuantity]);

const inputIndexCheck = (
  at: bigint,
  input: UTxO,
  scriptHash: string,
  unit: string,
) =>
  new Constr(0, [
    at,
    some(outputReference(input)),
    some(scriptCredential(scriptHash)),
    assetCheck(unit, 1n),
  ]);

const mintIndexCheck = (
  at: bigint,
  policyId: string,
  assets: ReadonlyArray<readonly [string, bigint]>,
) =>
  new Constr(0, [
    at,
    policyId,
    assets.map(([unit, quantity]) => assetCheck(unit, quantity)),
  ]);

const withdrawalIndexCheck = (at: bigint, scriptHash: string, amount: bigint) =>
  new Constr(0, [at, scriptCredential(scriptHash), amount]);

const expectedSpend = (input: OutRef, scriptHash: string) =>
  new Constr(0, [outputReference(input), scriptHash]);

const expectedMint = (policyId: string) => new Constr(1, [policyId]);

const expectedWithdraw = (scriptHash: string) =>
  new Constr(2, [scriptCredential(scriptHash)]);

const redeemerIndexCheck = (at: bigint, expectedPurpose: Constr<Data>) =>
  new Constr(0, [at, expectedPurpose]);

const outRefEquals = (left: OutRef, right: OutRef): boolean =>
  left.txHash === right.txHash && left.outputIndex === right.outputIndex;

const findMarkerUnit = (
  input: UTxO,
  units: BuildTxWithComplexWalletUnits,
): string | undefined =>
  markerUnits(units).find((unit) => (input.assets[unit] ?? 0n) > 0n);

const requireIndex = (index: bigint | undefined, message: string): bigint => {
  if (index === undefined) throw new Error(message);
  return index;
};

const buildStressRedeemer = (config: {
  stressAddress: string;
  stressPolicyId: string;
  stressRewardAddress: RewardAddress;
  units: BuildTxWithComplexWalletUnits;
  bucket: StressObservation[];
}): BuildTxWithRedeemer => {
  return (ctx) => {
    const stressInputs = ctx.inputs.filter(
      (input) =>
        input.address === config.stressAddress &&
        findMarkerUnit(input, config.units) !== undefined,
    );

    const inputChecks = stressInputs.map((input) =>
      inputIndexCheck(
        requireIndex(
          ctx.inputIndex(input),
          "missing stress input index in BuildTxWithComplex",
        ),
        input,
        config.stressPolicyId,
        findMarkerUnit(input, config.units)!,
      ),
    );

    const mintChecks = [
      mintIndexCheck(
        requireIndex(
          ctx.mintPolicyIndex(config.stressPolicyId),
          "missing stress mint policy index in BuildTxWithComplex",
        ),
        config.stressPolicyId,
        [
          [config.units.stressA, 1n],
          [config.units.stressB, 2n],
          [config.units.stressC, 3n],
        ],
      ),
      mintIndexCheck(
        requireIndex(
          ctx.mintPolicyIndex(unitPolicyId(config.units.nativeA)),
          "missing native mint policy index in BuildTxWithComplex",
        ),
        unitPolicyId(config.units.nativeA),
        [
          [config.units.nativeA, 1n],
          [config.units.nativeB, 1n],
        ],
      ),
    ];

    const withdrawalCheck = withdrawalIndexCheck(
      requireIndex(
        ctx.withdrawalIndex(config.stressRewardAddress),
        "missing stress withdrawal index in BuildTxWithComplex",
      ),
      config.stressPolicyId,
      BUILD_TX_WITH_COMPLEX_REWARD,
    );

    const spendRedeemerChecks = stressInputs.map((input) => {
      const purpose = ctx.redeemers.find(
        (redeemerPurpose) =>
          redeemerPurpose.tag === "spend" &&
          outRefEquals(redeemerPurpose.input, input),
      );
      if (!purpose) {
        throw new Error("missing stress spend redeemer purpose");
      }
      return redeemerIndexCheck(
        requireIndex(
          ctx.redeemerIndex(purpose),
          "missing stress spend redeemer index",
        ),
        expectedSpend(input, config.stressPolicyId),
      );
    });

    const mintPurpose = ctx.redeemers.find(
      (purpose) =>
        purpose.tag === "mint" && purpose.policyId === config.stressPolicyId,
    );
    if (!mintPurpose) throw new Error("missing stress mint redeemer purpose");

    const withdrawPurpose = ctx.redeemers.find(
      (purpose) =>
        purpose.tag === "withdraw" &&
        purpose.rewardAddress === config.stressRewardAddress,
    );
    if (!withdrawPurpose) {
      throw new Error("missing stress withdrawal redeemer purpose");
    }

    const redeemerChecks = [
      ...spendRedeemerChecks,
      redeemerIndexCheck(
        requireIndex(ctx.redeemerIndex(mintPurpose), "missing mint redeemer"),
        expectedMint(config.stressPolicyId),
      ),
      redeemerIndexCheck(
        requireIndex(
          ctx.redeemerIndex(withdrawPurpose),
          "missing withdrawal redeemer",
        ),
        expectedWithdraw(config.stressPolicyId),
      ),
    ];

    config.bucket.push({
      inputCheckIndices: inputChecks.map((check) => check.fields[0] as bigint),
      redeemerListIndices: redeemerChecks.map(
        (check) => check.fields[0] as bigint,
      ),
      mintPolicyIndices: mintChecks.map((check) => check.fields[0] as bigint),
      withdrawalIndices: [withdrawalCheck.fields[0] as bigint],
      referenceInputCount: ctx.referenceInputs.length,
      mintedUnits: Object.keys(ctx.mint).sort(),
      ownRedeemerListIndex: ctx.redeemerIndex(ctx.ownPurpose),
    });

    return Data.to(
      new Constr(0, [
        inputChecks,
        redeemerChecks,
        mintChecks,
        [withdrawalCheck],
      ]),
    );
  };
};

/**
 * Fixture setup transaction: creates the stress script inputs and reference
 * script UTxO consumed/read by the actual BuildTxWithRedeemer stress tx.
 */
export const depositBuildTxWithComplexSetup = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const walletAddress = yield* Effect.promise(() => user.wallet().address());
  const owner = getAddressDetails(walletAddress).paymentCredential?.hash;
  if (!owner) throw new Error("Missing wallet payment credential");

  const stress = stressValidator();
  const stressAddress = validatorToAddress("Custom", stress);
  const stressPolicyId = mintingPolicyToId(stress);
  const nativePolicy = nativePolicyFor(owner);
  const nativePolicyId = mintingPolicyToId(nativePolicy);
  const units = walletUnitsFor(stressPolicyId, nativePolicyId);

  return yield* user
    .newTx()
    .mintAssets({
      [units.markerA]: 1n,
      [units.markerB]: 1n,
      [units.markerC]: 1n,
    })
    .pay.ToAddressWithData(
      stressAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 10_000_000n, [units.markerA]: 1n },
    )
    .pay.ToAddressWithData(
      stressAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 11_000_000n, [units.markerB]: 1n },
    )
    .pay.ToAddressWithData(
      stressAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 12_000_000n, [units.markerC]: 1n },
    )
    .pay.ToAddressWithData(
      walletAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 15_000_000n },
      stress,
    )
    .validTo(emulator.now() + 300_000)
    .attach.MintingPolicy(nativePolicy)
    .addSigner(walletAddress)
    .completeProgram();
});

/**
 * Actual stress transaction: reads the setup reference input, spends the setup
 * script inputs, mints, withdraws, and builds redeemers from canonical context.
 */
export const buildTxWithComplex = (trace = makeBuildTxWithComplexTrace()) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { user } = yield* User;
    const walletAddress = yield* Effect.promise(() => user.wallet().address());
    const owner = getAddressDetails(walletAddress).paymentCredential?.hash;
    if (!owner) throw new Error("Missing wallet payment credential");

    const stress = stressValidator();
    const stressAddress = validatorToAddress("Custom", stress);
    const stressPolicyId = mintingPolicyToId(stress);
    const rewardAddress = stressRewardAddress();
    const nativePolicy = nativePolicyFor(owner);
    const nativePolicyId = mintingPolicyToId(nativePolicy);
    const units = walletUnitsFor(stressPolicyId, nativePolicyId);

    const stressInputs = yield* Effect.promise(() =>
      user.utxosAt(stressAddress),
    );
    const referenceInput = (yield* Effect.promise(() =>
      user.wallet().getUtxos(),
    )).find((utxo) => utxo.scriptRef?.script === stress.script);
    if (!referenceInput)
      throw new Error("Missing stress reference script UTxO");

    trace.stressInputs = stressInputs;
    trace.referenceInput = referenceInput;
    trace.rewardAddress = rewardAddress;
    trace.walletUnits = units;

    const spendRedeemer = buildStressRedeemer({
      stressAddress,
      stressPolicyId,
      stressRewardAddress: rewardAddress,
      units,
      bucket: trace.observations.stressSpends,
    });
    const mintRedeemer = buildStressRedeemer({
      stressAddress,
      stressPolicyId,
      stressRewardAddress: rewardAddress,
      units,
      bucket: trace.observations.mintPolicies,
    });
    const withdrawRedeemer = buildStressRedeemer({
      stressAddress,
      stressPolicyId,
      stressRewardAddress: rewardAddress,
      units,
      bucket: trace.observations.withdrawals,
    });

    return yield* user
      .newTx()
      .readFrom([referenceInput])
      .collectFrom(stressInputs, spendRedeemer)
      .mintAssets(
        {
          [units.stressA]: 1n,
          [units.stressB]: 2n,
          [units.stressC]: 3n,
        },
        mintRedeemer,
      )
      .mintAssets({
        [units.nativeA]: 1n,
        [units.nativeB]: 1n,
      })
      .withdraw(rewardAddress, BUILD_TX_WITH_COMPLEX_REWARD, withdrawRedeemer)
      .pay.ToAddressWithData(
        stressAddress,
        { kind: "inline", value: Data.void() },
        { lovelace: 2_500_000n },
      )
      .pay.ToAddressWithData(
        stressAddress,
        { kind: "inline", value: Data.void() },
        { lovelace: 2_600_000n },
      )
      .pay.ToAddressWithData(
        stressAddress,
        { kind: "inline", value: Data.void() },
        { lovelace: 2_700_000n },
      )
      .pay.ToAddress(walletAddress, {
        lovelace: 3_000_000n,
        [units.stressA]: 1n,
        [units.nativeA]: 1n,
      })
      .pay.ToAddress(walletAddress, {
        lovelace: 3_000_000n,
        [units.stressB]: 2n,
        [units.stressC]: 3n,
        [units.nativeB]: 1n,
      })
      .validTo(emulator.now() + 300_000)
      .attach.SpendingValidator(stress)
      .attach.MintingPolicy(stress)
      .attach.MintingPolicy(nativePolicy)
      .attach.WithdrawalValidator(stress)
      .addSigner(walletAddress)
      .completeProgram();
  });
