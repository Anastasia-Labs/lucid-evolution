import { describe, expect, test, vi } from "vitest";
import { Effect } from "effect";
import {
  BuildTxWithRedeemer,
  CML,
  GovernanceAction,
  GovernanceProposal,
  Provider,
  RedeemerBuilder,
  Script,
  Wallet,
  UTxO,
  credentialToRewardAddress,
  makeTxBuilder,
  scriptFromNative,
  validatorToRewardAddress,
} from "../src/index.js";
import { Data } from "@lucid-evolution/plutus";
import {
  createCostModels,
  mintingPolicyToId,
  PROTOCOL_PARAMETERS_DEFAULT,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { makeTxConfig } from "../src/tx-builder/TxConfig.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";
import {
  PendingRedeemer,
  buildCanonicalRedeemerInfo,
  buildRedeemersFromCanonicalContext,
  canonicalRedeemerEntries,
  registerPendingRedeemer,
} from "../src/tx-builder/internal/RedeemerContext.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

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

const alwaysSucceedScript: Script = {
  type: "PlutusV2",
  script: "49480100002221200101",
};
const secondPlutusV3Script: Script = {
  type: "PlutusV3",
  script: "46010000249900",
};

const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);

const makeWallet = (utxos: UTxO[]): Wallet => ({
  overrideUTxOs: vi.fn(),
  address: async () => address,
  rewardAddress: async () => null,
  getUtxos: async () => utxos,
  getUtxosCore: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  signTx: async () => CML.TransactionWitnessSet.new(),
  signMessage: async () => ({ signature: "", key: "" }),
  submitTx: async () => "00".repeat(32),
});

const makeProvider = (
  evaluateTx: Provider["evaluateTx"] = async () => [
    {
      redeemer_tag: "spend",
      redeemer_index: 0,
      ex_units: { mem: 500_000, steps: 500_000 },
    },
  ],
): Provider => ({
  getProtocolParameters: async () => protocolParameters,
  getUtxos: async () => [],
  getUtxosWithUnit: async () => [],
  getUtxoByUnit: async () => {
    throw new Error("not implemented");
  },
  getUtxosByOutRef: async () => [],
  getDelegation: async () => ({ poolId: null, rewards: 0n }),
  getDatum: async () => Data.void(),
  awaitTx: async () => true,
  submitTx: async () => "00".repeat(32),
  evaluateTx,
});

const redeemerData = (value: bigint): CML.PlutusData =>
  CML.PlutusData.from_cbor_hex(Data.to(value));

const redeemerExUnits = (value: bigint): CML.ExUnits =>
  CML.ExUnits.new(value, value + 100n);

const redeemerVal = (value: bigint): CML.RedeemerVal =>
  CML.RedeemerVal.new(redeemerData(value), redeemerExUnits(value));

const firstCertificate = (tx: CML.Transaction): CML.Certificate | undefined =>
  tx.body().certs()?.get(0);

const legacyRedeemer = (
  tag: CML.RedeemerTag,
  index: bigint,
  value: bigint,
): CML.LegacyRedeemer =>
  CML.LegacyRedeemer.new(
    tag,
    index,
    redeemerData(value),
    redeemerExUnits(value),
  );

const makeRedeemerMap = (
  order: ReadonlyArray<readonly [CML.RedeemerTag, bigint, bigint]>,
): CML.Redeemers => {
  const map = CML.MapRedeemerKeyToRedeemerVal.new();
  for (const [tag, index, value] of order) {
    map.insert(CML.RedeemerKey.new(tag, index), redeemerVal(value));
  }
  return CML.Redeemers.new_map_redeemer_key_to_redeemer_val(map);
};

const makeRedeemerList = (
  order: ReadonlyArray<readonly [CML.RedeemerTag, bigint, bigint]>,
): CML.Redeemers => {
  const list = CML.LegacyRedeemerList.new();
  for (const [tag, index, value] of order) {
    list.add(legacyRedeemer(tag, index, value));
  }
  return CML.Redeemers.new_arr_legacy_redeemer(list);
};

const makeUtxo = (byte: string, outputIndex = 0): UTxO => ({
  txHash: byte.repeat(32),
  outputIndex,
  address,
  assets: { lovelace: 5_000_000n },
});

const makeRichUtxo = (byte: string, outputIndex = 0): UTxO => ({
  ...makeUtxo(byte, outputIndex),
  assets: { lovelace: 1_000_000_000_000n },
});

const makeRewardAddress = (byte: string): CML.RewardAddress =>
  CML.RewardAddress.new(
    0,
    CML.Credential.new_script(CML.ScriptHash.from_hex(byte.repeat(28))),
  );

const rewardAddressBech32 = (rewardAddress: CML.RewardAddress): string =>
  rewardAddress.to_address().to_bech32(undefined);

const governanceAnchor = {
  url: "https://example.com/governance",
  dataHash: "77".repeat(32),
};

const governanceReturnAddress = credentialToRewardAddress("Custom", {
  type: "Key",
  hash: "66".repeat(28),
});

const governanceActionId = {
  txHash: "ab".repeat(32),
  index: 0n,
};

const parameterChangeAction = (policyHash: string): GovernanceAction => {
  const update = CML.ProtocolParamUpdate.new();
  update.set_minfee_a(44n);
  return {
    type: "ParameterChange",
    protocolParamUpdate: update,
    policyHash,
  };
};

const infoProposal = (): GovernanceProposal => ({
  action: { type: "InfoAction" },
  returnAddress: governanceReturnAddress,
  anchor: governanceAnchor,
});

const scriptProposal = (script: Script): GovernanceProposal => ({
  action: parameterChangeAction(mintingPolicyToId(script)),
  returnAddress: governanceReturnAddress,
  anchor: governanceAnchor,
});

const makeTx = ({
  inputs = [makeUtxo("11")],
  outputs = [{ address, lovelace: 1_000_000n }],
  mintPolicies = [],
  withdrawals = [],
  redeemers,
}: {
  inputs?: UTxO[];
  outputs?: ReadonlyArray<Readonly<{ address: string; lovelace: bigint }>>;
  mintPolicies?: ReadonlyArray<
    Readonly<{ policyId: string; quantity: bigint }>
  >;
  withdrawals?: ReadonlyArray<
    Readonly<{ rewardAddress: CML.RewardAddress; amount: bigint }>
  >;
  redeemers?: CML.Redeemers;
}) => {
  const inputList = CML.TransactionInputList.new();
  for (const input of inputs) {
    inputList.add(
      CML.TransactionInput.new(
        CML.TransactionHash.from_hex(input.txHash),
        BigInt(input.outputIndex),
      ),
    );
  }

  const outputList = CML.TransactionOutputList.new();
  for (const output of outputs) {
    outputList.add(
      CML.TransactionOutput.new(
        CML.Address.from_bech32(output.address),
        CML.Value.from_coin(output.lovelace),
      ),
    );
  }

  const body = CML.TransactionBody.new(inputList, outputList, 0n);

  if (mintPolicies.length > 0) {
    const mint = CML.Mint.new();
    for (const { policyId, quantity } of mintPolicies) {
      const assets = CML.MapAssetNameToNonZeroInt64.new();
      assets.insert(CML.AssetName.from_raw_bytes(new Uint8Array([])), quantity);
      mint.insert_assets(CML.ScriptHash.from_hex(policyId), assets);
    }
    body.set_mint(mint);
  }

  if (withdrawals.length > 0) {
    const cmlWithdrawals = CML.MapRewardAccountToCoin.new();
    for (const withdrawal of withdrawals) {
      cmlWithdrawals.insert(withdrawal.rewardAddress, withdrawal.amount);
    }
    body.set_withdrawals(cmlWithdrawals);
  }

  const witnessSet = CML.TransactionWitnessSet.new();
  if (redeemers) witnessSet.set_redeemers(redeemers);
  return CML.Transaction.new(body, witnessSet, true);
};

describe("context-dependent redeemers internal coverage", () => {
  test("BuildTxWithRedeemer can derive redeemer data from an outputIndex callback", async () => {
    const utxo = makeUtxo("11");
    const tx = makeTx({
      inputs: [utxo],
      outputs: [
        { address, lovelace: 1_000_000n },
        { address, lovelace: 2_000_000n },
        { address, lovelace: 3_000_000n },
      ],
      redeemers: makeRedeemerMap([[CML.RedeemerTag.Spend, 0n, 1n]]),
    });

    const source: BuildTxWithRedeemer = (ctx) => {
      expect(ctx.ownPurpose.tag).toBe("spend");
      return Data.to(
        ctx.outputIndex((output) => output.assets.lovelace === 2_000_000n) ??
          999n,
      );
    };

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [utxo]),
    );
    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 7,
          actionId: 0,
          source,
          purposeKey: {
            tag: "spend",
            input: { txHash: utxo.txHash, outputIndex: utxo.outputIndex },
          },
        },
      ]),
    );

    expect(redeemers.get(7)).toBe(Data.to(1n));
  });

  test("mint callbacks receive full mint map and own mint purpose", async () => {
    const policyA = "10".repeat(28);
    const policyB = "20".repeat(28);
    const tx = makeTx({
      mintPolicies: [
        { policyId: policyA, quantity: 5n },
        { policyId: policyB, quantity: 7n },
      ],
      redeemers: makeRedeemerMap([[CML.RedeemerTag.Mint, 0n, 1n]]),
    });

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [makeUtxo("11")]),
    );
    const mintPurpose = info.redeemers.find(
      (purpose) => purpose.tag === "mint",
    );
    expect(mintPurpose?.tag).toBe("mint");
    if (!mintPurpose || mintPurpose.tag !== "mint") {
      throw new Error("missing mint purpose");
    }

    const source: BuildTxWithRedeemer = (ctx) => {
      expect(ctx.ownPurpose).toEqual(mintPurpose);
      expect(ctx.mint[policyA]).toBe(5n);
      expect(ctx.mint[policyB]).toBe(7n);
      expect(ctx.mintPolicyIndex(ctx.ownPurpose.policyId)).toBe(
        ctx.ownPurpose.index,
      );
      return Data.to(BigInt(Object.keys(ctx.mint).length));
    };

    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 8,
          actionId: 0,
          source,
          purposeKey: { tag: "mint", policyId: mintPurpose.policyId },
        },
      ]),
    );

    expect(redeemers.get(8)).toBe(Data.to(2n));
  });

  test("withdrawal callbacks receive withdrawal index and own withdrawal purpose", async () => {
    const firstRewardAddress = makeRewardAddress("22");
    const secondRewardAddress = makeRewardAddress("33");
    const tx = makeTx({
      withdrawals: [
        { rewardAddress: firstRewardAddress, amount: 11n },
        { rewardAddress: secondRewardAddress, amount: 22n },
      ],
      redeemers: makeRedeemerMap([[CML.RedeemerTag.Reward, 1n, 1n]]),
    });

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [makeUtxo("11")]),
    );
    const withdrawPurpose = info.redeemers.find(
      (purpose) => purpose.tag === "withdraw",
    );
    expect(withdrawPurpose?.tag).toBe("withdraw");
    if (!withdrawPurpose || withdrawPurpose.tag !== "withdraw") {
      throw new Error("missing withdrawal purpose");
    }

    const source: BuildTxWithRedeemer = (ctx) => {
      expect(ctx.ownPurpose).toEqual(withdrawPurpose);
      const index = ctx.withdrawalIndex(ctx.ownPurpose.rewardAddress);
      expect(index).toBe(ctx.ownPurpose.index);
      expect(ctx.withdrawals[Number(index)]?.rewardAddress).toBe(
        ctx.ownPurpose.rewardAddress,
      );
      return Data.to(index ?? 999n);
    };

    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 9,
          actionId: 0,
          source,
          purposeKey: {
            tag: "withdraw",
            rewardAddress: withdrawPurpose.rewardAddress,
          },
        },
      ]),
    );

    expect(redeemers.get(9)).toBe(Data.to(1n));
    expect(withdrawPurpose.rewardAddress).toBe(
      rewardAddressBech32(secondRewardAddress),
    );
  });

  test("redeemerIndex resolves canonical redeemer-list positions for map redeemers", async () => {
    const policyId = "44".repeat(28);
    const rewardAddress = makeRewardAddress("55");
    const utxo = makeUtxo("11");
    const tx = makeTx({
      inputs: [utxo],
      mintPolicies: [{ policyId, quantity: 1n }],
      withdrawals: [{ rewardAddress, amount: 1n }],
      redeemers: makeRedeemerMap([
        [CML.RedeemerTag.Reward, 0n, 3n],
        [CML.RedeemerTag.Mint, 0n, 2n],
        [CML.RedeemerTag.Spend, 0n, 1n],
      ]),
    });

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [utxo]),
    );
    const mintPurpose = info.redeemers.find(
      (purpose) => purpose.tag === "mint",
    );
    expect(mintPurpose?.tag).toBe("mint");
    if (!mintPurpose || mintPurpose.tag !== "mint") {
      throw new Error("missing mint purpose");
    }

    const source: BuildTxWithRedeemer = (ctx) => {
      expect(
        ctx.redeemers.map((purpose) => ctx.redeemerIndex(purpose)),
      ).toEqual([0n, 1n, 2n]);
      return Data.to(ctx.redeemerIndex(ctx.ownPurpose) ?? 999n);
    };

    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 10,
          actionId: 0,
          source,
          purposeKey: { tag: "mint", policyId: mintPurpose.policyId },
        },
      ]),
    );

    expect(redeemers.get(10)).toBe(Data.to(1n));
  });

  test("duplicate final redeemer purposes are rejected before callbacks run", async () => {
    const utxo = makeUtxo("11");
    const tx = makeTx({
      inputs: [utxo],
      redeemers: makeRedeemerList([
        [CML.RedeemerTag.Spend, 0n, 1n],
        [CML.RedeemerTag.Spend, 0n, 2n],
      ]),
    });

    await expect(
      Effect.runPromise(buildCanonicalRedeemerInfo(tx, [utxo])),
    ).rejects.toThrow(/Duplicate final redeemer purpose: spend:0/);
  });

  test("duplicate pending witness purposes are rejected at registration", async () => {
    const config = makeTxBuilder(lucidConfig).rawConfig();
    const pending: PendingRedeemer = {
      id: 1,
      actionId: 0,
      source: () => Data.void(),
      purposeKey: {
        tag: "spend",
        input: { txHash: "66".repeat(32), outputIndex: 0 },
      },
    };

    await Effect.runPromise(registerPendingRedeemer(config, pending));

    await expect(
      Effect.runPromise(
        registerPendingRedeemer(config, {
          ...pending,
          id: 2,
        }),
      ),
    ).rejects.toThrow(/Duplicate script witness purpose: spend:/);
  });

  test("selected RedeemerBuilder computes once and reuses the result for grouped purposes", async () => {
    const firstUtxo = makeUtxo("11");
    const secondUtxo = makeUtxo("22");
    const tx = makeTx({
      inputs: [firstUtxo, secondUtxo],
      redeemers: makeRedeemerMap([
        [CML.RedeemerTag.Spend, 0n, 1n],
        [CML.RedeemerTag.Spend, 1n, 2n],
      ]),
    });
    const makeRedeemer = vi.fn((indices: bigint[]) =>
      Data.to(indices[0] * 10n + indices[1]),
    );
    const source: RedeemerBuilder = {
      kind: "selected",
      inputs: [secondUtxo, firstUtxo],
      makeRedeemer,
    };

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [firstUtxo, secondUtxo]),
    );
    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 11,
          actionId: 0,
          source,
          purposeKey: {
            tag: "spend",
            input: { txHash: firstUtxo.txHash, outputIndex: 0 },
          },
        },
        {
          id: 11,
          actionId: 0,
          source,
          purposeKey: {
            tag: "spend",
            input: { txHash: secondUtxo.txHash, outputIndex: 0 },
          },
        },
      ]),
    );

    expect(makeRedeemer).toHaveBeenCalledTimes(1);
    expect(makeRedeemer).toHaveBeenCalledWith([1n, 0n]);
    expect(redeemers).toEqual(new Map([[11, Data.to(10n)]]));
  });

  test("builder memoizes selected RedeemerBuilder across fixed-point attempts", async () => {
    const walletInput = makeUtxo("70");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptUtxo: UTxO = {
      txHash: "71".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 500_000, steps: 500_000 },
      },
    ]);
    const makeRedeemer = vi.fn((indices: bigint[]) => Data.to(indices[0]));
    const redeemer: RedeemerBuilder = {
      kind: "selected",
      inputs: [scriptUtxo],
      makeRedeemer,
    };

    await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom([scriptUtxo], redeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    expect(makeRedeemer).toHaveBeenCalledTimes(1);
  });

  test("builder converges context-dependent spend redeemers with provider evaluation", async () => {
    const walletInput = makeUtxo("77");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptUtxo: UTxO = {
      txHash: "88".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 500_000, steps: 500_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) =>
      Data.to(ctx.redeemerIndex(ctx.ownPurpose) ?? 999n),
    );

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom([scriptUtxo], stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const redeemers = signBuilder.toTransaction().witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("spend");
    expect(redeemer.index).toBe(0n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(0n).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(500_000n);
    expect(redeemer.exUnits.steps()).toBe(500_000n);
    expect(evaluateTx).toHaveBeenCalled();
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("registerStake with redeemer emits witnessed RegCert and publish redeemer", async () => {
    const walletInput = makeUtxo("b0");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedV3Script,
    );
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "publish",
        redeemer_index: 0,
        ex_units: { mem: 600_000, steps: 700_000 },
      },
    ]);

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.CertificateValidator(alwaysSucceedV3Script)
      .registerStake(scriptRewardAddress, Data.void())
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const cert = firstCertificate(tx);
    expect(cert).toBeDefined();
    expect(cert!.kind()).toBe(CML.CertificateKind.RegCert);
    expect(cert!.as_reg_cert()?.deposit()).toBe(
      lucidConfig.protocolParameters.keyDeposit,
    );

    const redeemers = tx.witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("publish");
    expect(redeemer.index).toBe(0n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      CML.PlutusData.from_cbor_hex(Data.void()).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(600_000n);
    expect(redeemer.exUnits.steps()).toBe(700_000n);
    expect(evaluateTx).toHaveBeenCalled();
  });

  test("register.Stake with redeemer uses the same witnessed registration path", async () => {
    const walletInput = makeUtxo("b1");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedV3Script,
    );
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "publish",
        redeemer_index: 0,
        ex_units: { mem: 610_000, steps: 710_000 },
      },
    ]);

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.CertificateValidator(alwaysSucceedV3Script)
      .register.Stake(scriptRewardAddress, Data.void())
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const cert = firstCertificate(tx);
    expect(cert).toBeDefined();
    expect(cert!.kind()).toBe(CML.CertificateKind.RegCert);
    expect(cert!.as_reg_cert()?.deposit()).toBe(
      lucidConfig.protocolParameters.keyDeposit,
    );

    const redeemers = tx.witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("publish");
    expect(redeemer.index).toBe(0n);
    expect(redeemer.exUnits.mem()).toBe(610_000n);
    expect(redeemer.exUnits.steps()).toBe(710_000n);
  });

  test("registerStake without redeemer remains witnessless StakeRegistration", async () => {
    const walletInput = makeUtxo("b2");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedV3Script,
    );

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .registerStake(scriptRewardAddress)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const cert = firstCertificate(tx);
    expect(cert).toBeDefined();
    expect(cert!.kind()).toBe(CML.CertificateKind.StakeRegistration);
    expect(cert!.as_stake_registration()).toBeDefined();
    expect(cert!.as_reg_cert()).toBeUndefined();
    expect(tx.witness_set().redeemers()).toBeUndefined();
  });

  test("context-dependent registerStake redeemer can inspect event NFT mint", async () => {
    const walletInput = makeUtxo("b3");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedV3Script,
    );
    const policyId = mintingPolicyToId(alwaysSucceedV3Script);
    const eventNft = `${policyId}01`;
    const mintedAssets = { [eventNft]: 1n };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "mint",
        redeemer_index: 0,
        ex_units: { mem: 500_000, steps: 600_000 },
      },
      {
        redeemer_tag: "publish",
        redeemer_index: 0,
        ex_units: { mem: 700_000, steps: 800_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("publish");
      expect(ctx.ownPurpose.index).toBe(0n);
      expect(ctx.mint[eventNft]).toBe(1n);
      return Data.to(ctx.mint[eventNft] ?? 0n);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.MintingPolicy(alwaysSucceedV3Script)
      .attach.CertificateValidator(alwaysSucceedV3Script)
      .mintAssets(mintedAssets, Data.void())
      .registerStake(scriptRewardAddress, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const redeemers = signBuilder.toTransaction().witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const publishRedeemer = canonicalRedeemerEntries(redeemers!).find(
      ({ tag }) => tag === "publish",
    );
    expect(publishRedeemer).toBeDefined();
    expect(publishRedeemer!.index).toBe(0n);
    expect(publishRedeemer!.data.to_canonical_cbor_hex()).toBe(
      redeemerData(1n).to_canonical_cbor_hex(),
    );
    expect(publishRedeemer!.exUnits.mem()).toBe(700_000n);
    expect(publishRedeemer!.exUnits.steps()).toBe(800_000n);
    expect(evaluateTx).toHaveBeenCalled();
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("registerStake plain redeemer on key and native credentials emits no Plutus redeemer", async () => {
    const keyWalletInput = makeUtxo("b4");
    keyWalletInput.assets = { lovelace: 100_000_000n };
    const keyRewardAddress = credentialToRewardAddress("Custom", {
      type: "Key",
      hash: "33".repeat(28),
    });

    const keySignBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([keyWalletInput]),
    })
      .registerStake(keyRewardAddress, Data.void())
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [keyWalletInput],
      });

    const keyTx = keySignBuilder.toTransaction();
    expect(firstCertificate(keyTx)?.kind()).toBe(CML.CertificateKind.RegCert);
    expect(firstCertificate(keyTx)?.as_reg_cert()?.deposit()).toBe(
      lucidConfig.protocolParameters.keyDeposit,
    );
    expect(keyTx.witness_set().redeemers()).toBeUndefined();

    const nativeWalletInput = makeUtxo("b5");
    nativeWalletInput.assets = { lovelace: 100_000_000n };
    const nativeScript = scriptFromNative({
      type: "sig",
      keyHash: "34".repeat(28),
    });
    const nativeRewardAddress = validatorToRewardAddress(
      "Custom",
      nativeScript,
    );

    const nativeSignBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([nativeWalletInput]),
    })
      .attach.CertificateValidator(nativeScript)
      .registerStake(nativeRewardAddress, Data.void())
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [nativeWalletInput],
      });

    const nativeTx = nativeSignBuilder.toTransaction();
    expect(firstCertificate(nativeTx)?.kind()).toBe(
      CML.CertificateKind.RegCert,
    );
    expect(firstCertificate(nativeTx)?.as_reg_cert()?.deposit()).toBe(
      lucidConfig.protocolParameters.keyDeposit,
    );
    expect(nativeTx.witness_set().redeemers()).toBeUndefined();
  });

  test("registerStake redeemer preserves missing script and reward validation errors", async () => {
    const missingScriptHash = "35".repeat(28);
    const missingScriptRewardAddress = credentialToRewardAddress("Custom", {
      type: "Script",
      hash: missingScriptHash,
    });

    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([]),
      })
        .registerStake(missingScriptRewardAddress, Data.void())
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [],
        }),
    ).rejects.toThrow(
      new RegExp(`MISSING_SCRIPT:.*script_hash: ${missingScriptHash}`),
    );

    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([]),
      })
        .registerStake(address, Data.void())
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [],
        }),
    ).rejects.toThrow(/Stake:.*MISSING_REWARD_TYPE/);
  });

  test("propose adds a witnessless governance proposal with the default deposit", async () => {
    const walletInput = makeRichUtxo("c0");

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .propose(infoProposal())
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const proposals = signBuilder.toTransaction().body().proposal_procedures();
    expect(proposals).toBeDefined();
    expect(proposals!.len()).toBe(1);
    const proposal = proposals!.get(0);
    expect(proposal.deposit()).toBe(
      lucidConfig.protocolParameters.govActionDeposit,
    );
    expect(proposal.gov_action().kind()).toBe(CML.GovActionKind.InfoAction);
    expect(proposal.reward_account().to_address().to_bech32(undefined)).toBe(
      governanceReturnAddress,
    );
    expect(proposal.anchor().anchor_url().get()).toBe(governanceAnchor.url);
    expect(
      signBuilder.toTransaction().witness_set().redeemers(),
    ).toBeUndefined();
  });

  test("propose builds all typed governance action variants", async () => {
    const walletInput = makeRichUtxo("d0");
    const actions: GovernanceAction[] = [
      { ...parameterChangeAction("70".repeat(28)), policyHash: undefined },
      {
        type: "HardForkInitiation",
        actionId: governanceActionId,
        protocolVersion: { major: 11n, minor: 1n },
      },
      {
        type: "TreasuryWithdrawals",
        withdrawals: [
          {
            rewardAddress: governanceReturnAddress,
            amount: 1_000_000n,
          },
        ],
      },
      { type: "NoConfidence", actionId: governanceActionId },
      {
        type: "UpdateCommittee",
        actionId: governanceActionId,
        remove: [{ type: "Key", hash: "71".repeat(28) }],
        add: [
          {
            credential: { type: "Key", hash: "72".repeat(28) },
            epoch: 12n,
          },
        ],
        threshold: { numerator: 1n, denominator: 2n },
      },
      {
        type: "NewConstitution",
        actionId: governanceActionId,
        constitution: { anchor: governanceAnchor },
      },
      { type: "InfoAction" },
    ];

    let builder = makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    });
    for (const action of actions) {
      builder = builder.propose({
        action,
        returnAddress: governanceReturnAddress,
        anchor: governanceAnchor,
      });
    }

    const signBuilder = await builder.complete({
      localUPLCEval: false,
      presetWalletInputs: [walletInput],
    });

    const proposals = signBuilder.toTransaction().body().proposal_procedures();
    expect(proposals?.len()).toBe(actions.length);
    expect(
      Array.from({ length: proposals!.len() }, (_, index) =>
        proposals!.get(index).gov_action().kind(),
      ),
    ).toEqual([
      CML.GovActionKind.ParameterChangeAction,
      CML.GovActionKind.HardForkInitiationAction,
      CML.GovActionKind.TreasuryWithdrawalsAction,
      CML.GovActionKind.NoConfidence,
      CML.GovActionKind.UpdateCommittee,
      CML.GovActionKind.NewConstitution,
      CML.GovActionKind.InfoAction,
    ]);
    expect(
      signBuilder.toTransaction().witness_set().redeemers(),
    ).toBeUndefined();
  });

  test("propose rejects duplicate treasury withdrawal addresses", async () => {
    const walletInput = makeRichUtxo("e5");
    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([walletInput]),
      })
        .propose({
          action: {
            type: "TreasuryWithdrawals",
            withdrawals: [
              {
                rewardAddress: governanceReturnAddress,
                amount: 1_000_000n,
              },
              {
                rewardAddress: governanceReturnAddress,
                amount: 2_000_000n,
              },
            ],
          },
          returnAddress: governanceReturnAddress,
          anchor: governanceAnchor,
        })
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [walletInput],
        }),
    ).rejects.toThrow(/Duplicate treasury withdrawal address/);
  });

  test("propose supports native-script governance action witnesses without Plutus redeemers", async () => {
    const walletInput = makeRichUtxo("c1");
    const nativeScript = scriptFromNative({
      type: "sig",
      keyHash: "67".repeat(28),
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .attach.ProposeValidator(nativeScript)
      .propose(scriptProposal(nativeScript))
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const proposals = tx.body().proposal_procedures();
    expect(proposals?.len()).toBe(1);
    expect(proposals!.get(0).gov_action().script_hash()?.to_hex()).toBe(
      mintingPolicyToId(nativeScript),
    );
    expect(tx.witness_set().redeemers()).toBeUndefined();
  });

  test("propose supports Plutus governance action witnesses with static redeemers", async () => {
    const walletInput = makeRichUtxo("c2");
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "propose",
        redeemer_index: 0,
        ex_units: { mem: 620_000, steps: 720_000 },
      },
    ]);

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.ProposeValidator(alwaysSucceedV3Script)
      .propose(scriptProposal(alwaysSucceedV3Script), Data.to(42n))
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const proposals = tx.body().proposal_procedures();
    expect(proposals?.len()).toBe(1);
    expect(proposals!.get(0).gov_action().kind()).toBe(
      CML.GovActionKind.ParameterChangeAction,
    );

    const redeemers = tx.witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("propose");
    expect(redeemer.index).toBe(0n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(42n).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(620_000n);
    expect(redeemer.exUnits.steps()).toBe(720_000n);
    expect(evaluateTx).toHaveBeenCalled();
  });

  test("context-dependent propose redeemers count all proposal procedures", async () => {
    const walletInput = makeRichUtxo("c3");
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "propose",
        redeemer_index: 1,
        ex_units: { mem: 630_000, steps: 730_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("propose");
      expect(ctx.ownPurpose.index).toBe(1n);
      expect(ctx.redeemerIndex(ctx.ownPurpose)).toBe(0n);
      return Data.to(ctx.ownPurpose.index);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.ProposeValidator(alwaysSucceedV3Script)
      .propose(infoProposal())
      .propose(scriptProposal(alwaysSucceedV3Script), stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const proposals = signBuilder.toTransaction().body().proposal_procedures();
    expect(proposals?.len()).toBe(2);
    const redeemers = signBuilder.toTransaction().witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("propose");
    expect(redeemer.index).toBe(1n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(1n).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(630_000n);
    expect(redeemer.exUnits.steps()).toBe(730_000n);
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("propose context skips native governance witnesses before Plutus proposals", async () => {
    const walletInput = makeRichUtxo("c6");
    const nativeScript = scriptFromNative({
      type: "sig",
      keyHash: "6c".repeat(28),
    });
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "propose",
        redeemer_index: 1,
        ex_units: { mem: 631_000, steps: 731_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("propose");
      expect(ctx.ownPurpose.index).toBe(1n);
      return Data.to(77n);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.ProposeValidator(nativeScript)
      .attach.ProposeValidator(alwaysSucceedV3Script)
      .propose(scriptProposal(nativeScript))
      .propose(scriptProposal(alwaysSucceedV3Script), stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    expect(tx.body().proposal_procedures()?.len()).toBe(2);
    const [redeemer] = canonicalRedeemerEntries(tx.witness_set().redeemers()!);
    expect(redeemer.tag).toBe("propose");
    expect(redeemer.index).toBe(1n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(77n).to_canonical_cbor_hex(),
    );

    const [context] = signBuilder.toScriptContexts();
    expect(context.scriptContextScriptInfo).toHaveProperty("ProposingScript");
    if (!("ProposingScript" in context.scriptContextScriptInfo)) {
      throw new Error("Expected a proposing script context.");
    }
    const [index, proposal] = context.scriptContextScriptInfo.ProposingScript;
    expect(index).toBe(1n);
    expect(proposal.ppGovernanceAction).toHaveProperty("ParameterChange");
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("propose preserves missing script and missing redeemer errors", async () => {
    const missingScriptHash = "68".repeat(28);
    const missingScriptProposal: GovernanceProposal = {
      ...infoProposal(),
      action: parameterChangeAction(missingScriptHash),
    };

    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([]),
      })
        .propose(missingScriptProposal, Data.void())
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [],
        }),
    ).rejects.toThrow(
      new RegExp(`MISSING_SCRIPT:.*script_hash: ${missingScriptHash}`),
    );

    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([]),
      })
        .attach.ProposeValidator(alwaysSucceedV3Script)
        .propose(scriptProposal(alwaysSucceedV3Script))
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [],
        }),
    ).rejects.toThrow(/GovernanceAction:.*MISSING_REDEEMER/);
  });

  test("governance Plutus witnesses reject PlutusV1 and PlutusV2", async () => {
    const walletInput = makeRichUtxo("e1");
    for (const type of ["PlutusV1", "PlutusV2"] as const) {
      const legacyScript: Script = { ...alwaysSucceedScript, type };
      const voter = {
        type: "DRep" as const,
        credential: {
          type: "Script" as const,
          hash: mintingPolicyToId(legacyScript),
        },
      };
      await expect(
        makeTxBuilder({
          ...lucidConfig,
          wallet: makeWallet([walletInput]),
        })
          .attach.VoteValidator(legacyScript)
          .vote(voter, governanceActionId, "Yes", undefined, Data.void())
          .complete({
            localUPLCEval: false,
            presetWalletInputs: [walletInput],
          }),
      ).rejects.toThrow(
        /GovernanceAction:.*Governance voting scripts must use PlutusV3/,
      );

      await expect(
        makeTxBuilder({
          ...lucidConfig,
          wallet: makeWallet([walletInput]),
        })
          .attach.ProposeValidator(legacyScript)
          .propose(scriptProposal(legacyScript), Data.void())
          .complete({
            localUPLCEval: false,
            presetWalletInputs: [walletInput],
          }),
      ).rejects.toThrow(
        /GovernanceAction:.*Governance proposal scripts must use PlutusV3/,
      );
    }
  });

  test("native governance witnesses ignore delayed redeemer callbacks", async () => {
    const walletInput = makeRichUtxo("e2");
    const nativeScript = scriptFromNative({
      type: "sig",
      keyHash: "75".repeat(28),
    });
    const voter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: mintingPolicyToId(nativeScript),
      },
    };
    const delayedRedeemer = vi.fn<BuildTxWithRedeemer>(() => Data.void());

    const proposalTx = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .attach.ProposeValidator(nativeScript)
      .propose(scriptProposal(nativeScript), delayedRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });
    const voteTx = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .attach.VoteValidator(nativeScript)
      .vote(voter, governanceActionId, "Yes", undefined, delayedRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    expect(delayedRedeemer).not.toHaveBeenCalled();
    expect(
      proposalTx.toTransaction().witness_set().redeemers(),
    ).toBeUndefined();
    expect(voteTx.toTransaction().witness_set().redeemers()).toBeUndefined();
  });

  test("vote adds key DRep voting procedures without Plutus redeemers", async () => {
    const walletInput = makeRichUtxo("c4");
    const voter = {
      type: "DRep" as const,
      credential: { type: "Key" as const, hash: "69".repeat(28) },
    };

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .vote(voter, governanceActionId, "Yes")
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const votingProcedures = signBuilder
      .toTransaction()
      .body()
      .voting_procedures();
    expect(votingProcedures).toBeDefined();
    expect(votingProcedures!.len()).toBe(1);
    const cmlVoter = votingProcedures!.keys().get(0);
    expect(cmlVoter.as_d_rep_key_hash()?.to_hex()).toBe(voter.credential.hash);
    const actionVotes = votingProcedures!.get(cmlVoter)!;
    expect(actionVotes.len()).toBe(1);
    expect(actionVotes.get(actionVotes.keys().get(0))!.vote()).toBe(
      CML.Vote.Yes,
    );
    expect(
      signBuilder.toTransaction().witness_set().redeemers(),
    ).toBeUndefined();
  });

  test("vote builds committee and stake pool voter procedures without Plutus redeemers", async () => {
    const walletInput = makeRichUtxo("d1");
    const committeeVoter = {
      type: "ConstitutionalCommittee" as const,
      credential: { type: "Key" as const, hash: "73".repeat(28) },
    };
    const stakePoolVoter = {
      type: "StakePool" as const,
      hash: "74".repeat(28),
    };

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      wallet: makeWallet([walletInput]),
    })
      .vote(committeeVoter, governanceActionId, "No")
      .vote(stakePoolVoter, governanceActionId, "Abstain")
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const votingProcedures = signBuilder
      .toTransaction()
      .body()
      .voting_procedures();
    expect(votingProcedures?.len()).toBe(2);
    const voters = Array.from({ length: votingProcedures!.len() }, (_, index) =>
      votingProcedures!.keys().get(index).kind(),
    );
    expect(voters).toEqual([
      CML.VoterKind.ConstitutionalCommitteeHotKeyHash,
      CML.VoterKind.StakingPoolKeyHash,
    ]);
    expect(
      signBuilder.toTransaction().witness_set().redeemers(),
    ).toBeUndefined();
  });

  test("vote supports Plutus DRep witnesses and context-dependent redeemers", async () => {
    const walletInput = makeRichUtxo("c5");
    const voter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: mintingPolicyToId(alwaysSucceedV3Script),
      },
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "vote",
        redeemer_index: 0,
        ex_units: { mem: 640_000, steps: 740_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("vote");
      expect(ctx.ownPurpose.index).toBe(0n);
      return Data.to(ctx.ownPurpose.index + 9n);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.VoteValidator(alwaysSucceedV3Script)
      .vote(voter, governanceActionId, "Abstain", undefined, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    const votingProcedures = tx.body().voting_procedures();
    expect(votingProcedures?.len()).toBe(1);
    const redeemers = tx.witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("vote");
    expect(redeemer.index).toBe(0n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(9n).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(640_000n);
    expect(redeemer.exUnits.steps()).toBe(740_000n);
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("vote context counts key voters before Plutus voting witnesses", async () => {
    const walletInput = makeRichUtxo("c7");
    const keyVoter = {
      type: "DRep" as const,
      credential: { type: "Key" as const, hash: "6d".repeat(28) },
    };
    const scriptHash = mintingPolicyToId(alwaysSucceedV3Script);
    const scriptVoter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: scriptHash,
      },
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "vote",
        redeemer_index: 1,
        ex_units: { mem: 641_000, steps: 741_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("vote");
      expect(ctx.ownPurpose.index).toBe(1n);
      return Data.to(88n);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.VoteValidator(alwaysSucceedV3Script)
      .vote(keyVoter, governanceActionId, "No")
      .vote(scriptVoter, governanceActionId, "Yes", undefined, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    expect(tx.body().voting_procedures()?.len()).toBe(2);
    const [redeemer] = canonicalRedeemerEntries(tx.witness_set().redeemers()!);
    expect(redeemer.tag).toBe("vote");
    expect(redeemer.index).toBe(1n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(88n).to_canonical_cbor_hex(),
    );

    const [context] = signBuilder.toScriptContexts();
    expect(context.scriptContextScriptInfo).toHaveProperty("VotingScript");
    if (!("VotingScript" in context.scriptContextScriptInfo)) {
      throw new Error("Expected a voting script context.");
    }
    expect(context.scriptContextScriptInfo.VotingScript[0]).toEqual({
      DRepVoter: [{ ScriptCredential: [scriptHash] }],
    });
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("vote context counts native voting witnesses before Plutus voters", async () => {
    const walletInput = makeRichUtxo("c8");
    const nativeScript = scriptFromNative({
      type: "sig",
      keyHash: "6e".repeat(28),
    });
    const nativeVoter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: mintingPolicyToId(nativeScript),
      },
    };
    const scriptHash = mintingPolicyToId(alwaysSucceedV3Script);
    const plutusVoter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: scriptHash,
      },
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "vote",
        redeemer_index: 1,
        ex_units: { mem: 642_000, steps: 742_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("vote");
      expect(ctx.ownPurpose.index).toBe(1n);
      return Data.to(99n);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.VoteValidator(nativeScript)
      .attach.VoteValidator(alwaysSucceedV3Script)
      .vote(nativeVoter, governanceActionId, "No")
      .vote(plutusVoter, governanceActionId, "Yes", undefined, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const tx = signBuilder.toTransaction();
    expect(tx.body().voting_procedures()?.len()).toBe(2);
    const [redeemer] = canonicalRedeemerEntries(tx.witness_set().redeemers()!);
    expect(redeemer.tag).toBe("vote");
    expect(redeemer.index).toBe(1n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(99n).to_canonical_cbor_hex(),
    );

    const [context] = signBuilder.toScriptContexts();
    expect(context.scriptContextScriptInfo).toHaveProperty("VotingScript");
    if (!("VotingScript" in context.scriptContextScriptInfo)) {
      throw new Error("Expected a voting script context.");
    }
    expect(context.scriptContextScriptInfo.VotingScript[0]).toEqual({
      DRepVoter: [{ ScriptCredential: [scriptHash] }],
    });
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("vote remaps Plutus witness order to canonical ledger voter indexes", async () => {
    const walletInput = makeRichUtxo("e3");
    const candidates = [alwaysSucceedV3Script, secondPlutusV3Script].map(
      (script, index) => {
        const hash = mintingPolicyToId(script);
        return {
          script,
          hash,
          voter: {
            type: "DRep" as const,
            credential: { type: "Script" as const, hash },
          },
          data: BigInt(index + 11),
        };
      },
    );
    const insertionOrder = [...candidates].sort((left, right) =>
      right.hash.localeCompare(left.hash),
    );
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async (txHex) => {
      const tx = CML.Transaction.from_cbor_hex(txHex);
      const entries = canonicalRedeemerEntries(tx.witness_set().redeemers()!);
      expect(entries.map(({ index }) => index)).toEqual([0n, 1n]);
      return entries.map(({ index }) => ({
        redeemer_tag: "vote" as const,
        redeemer_index: Number(index),
        ex_units: {
          mem: 650_000 + Number(index),
          steps: 750_000 + Number(index),
        },
      }));
    });

    let builder = makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.VoteValidator(alwaysSucceedV3Script)
      .attach.VoteValidator(secondPlutusV3Script);
    insertionOrder.forEach((candidate, index) => {
      builder = builder.vote(
        candidate.voter,
        { ...governanceActionId, index: BigInt(index) },
        "Yes",
        undefined,
        Data.to(candidate.data),
      );
    });

    const tx = (
      await builder.complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      })
    ).toTransaction();
    const voters = CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes())
      .body()
      .voting_procedures()!
      .keys();
    const canonicalHashes = Array.from({ length: voters.len() }, (_, index) =>
      voters.get(index).script_hash()!.to_hex(),
    );
    expect(insertionOrder.map(({ hash }) => hash)).toEqual(
      [...canonicalHashes].reverse(),
    );

    const entries = canonicalRedeemerEntries(tx.witness_set().redeemers()!);
    for (const entry of entries) {
      const voterHash = voters.get(Number(entry.index)).script_hash()!.to_hex();
      const expected = candidates.find(({ hash }) => hash === voterHash)!;
      expect(entry.data.to_canonical_cbor_hex()).toBe(
        redeemerData(expected.data).to_canonical_cbor_hex(),
      );
      expect(entry.exUnits.mem()).toBe(650_000n + entry.index);
      expect(entry.exUnits.steps()).toBe(750_000n + entry.index);
    }
    expect(evaluateTx).toHaveBeenCalled();
  });

  test("vote rejects duplicate Plutus redeemers for the same voter", async () => {
    const walletInput = makeRichUtxo("e4");
    const voter = {
      type: "DRep" as const,
      credential: {
        type: "Script" as const,
        hash: mintingPolicyToId(alwaysSucceedV3Script),
      },
    };
    await expect(
      makeTxBuilder({
        ...lucidConfig,
        wallet: makeWallet([walletInput]),
      })
        .attach.VoteValidator(alwaysSucceedV3Script)
        .vote(voter, governanceActionId, "Yes", undefined, Data.to(1n))
        .vote(
          voter,
          { ...governanceActionId, index: 1n },
          "No",
          undefined,
          Data.to(2n),
        )
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [walletInput],
        }),
    ).rejects.toThrow(
      /GovernanceAction:.*Multiple Plutus voting procedures for the same voter/,
    );
  });

  test("builder converges context-dependent certificate redeemers with provider evaluation", async () => {
    const walletInput = makeUtxo("7a");
    walletInput.assets = { lovelace: 100_000_000n };
    const keyRewardAddress = credentialToRewardAddress("Custom", {
      type: "Key",
      hash: "12".repeat(28),
    });
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedScript,
    );
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "publish",
        redeemer_index: 1,
        ex_units: { mem: 600_000, steps: 700_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("publish");
      return Data.to(ctx.ownPurpose.index);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.CertificateValidator(alwaysSucceedScript)
      .register.Stake(keyRewardAddress)
      .deregister.Stake(scriptRewardAddress, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const redeemers = signBuilder.toTransaction().witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const [redeemer] = canonicalRedeemerEntries(redeemers!);
    expect(redeemer.tag).toBe("publish");
    expect(redeemer.index).toBe(1n);
    expect(redeemer.data.to_canonical_cbor_hex()).toBe(
      redeemerData(1n).to_canonical_cbor_hex(),
    );
    expect(redeemer.exUnits.mem()).toBe(600_000n);
    expect(redeemer.exUnits.steps()).toBe(700_000n);
    expect(evaluateTx).toHaveBeenCalled();
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("builder converges context-dependent committee certificate redeemers with provider evaluation", async () => {
    const walletInput = makeUtxo("7b");
    walletInput.assets = { lovelace: 100_000_000n };
    const keyRewardAddress = credentialToRewardAddress("Custom", {
      type: "Key",
      hash: "13".repeat(28),
    });
    const scriptRewardAddress = validatorToRewardAddress(
      "Custom",
      alwaysSucceedScript,
    );
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "publish",
        redeemer_index: 0,
        ex_units: { mem: 610_000, steps: 710_000 },
      },
      {
        redeemer_tag: "publish",
        redeemer_index: 1,
        ex_units: { mem: 620_000, steps: 720_000 },
      },
    ]);
    const stableRedeemer = vi.fn<BuildTxWithRedeemer>((ctx) => {
      expect(ctx.ownPurpose.tag).toBe("publish");
      return Data.to(ctx.ownPurpose.index);
    });

    const signBuilder = await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet: makeWallet([walletInput]),
    })
      .attach.CertificateValidator(alwaysSucceedScript)
      .authCommitteeHot(scriptRewardAddress, keyRewardAddress, stableRedeemer)
      .resignCommitteeHot(scriptRewardAddress, undefined, stableRedeemer)
      .complete({
        localUPLCEval: false,
        presetWalletInputs: [walletInput],
      });

    const redeemers = signBuilder.toTransaction().witness_set().redeemers();
    expect(redeemers).toBeDefined();
    const entries = canonicalRedeemerEntries(redeemers!);
    expect(entries.map(({ tag, index }) => [tag, index])).toEqual([
      ["publish", 0n],
      ["publish", 1n],
    ]);
    expect(entries[0].data.to_canonical_cbor_hex()).toBe(
      redeemerData(0n).to_canonical_cbor_hex(),
    );
    expect(entries[1].data.to_canonical_cbor_hex()).toBe(
      redeemerData(1n).to_canonical_cbor_hex(),
    );
    expect(entries[0].exUnits.mem()).toBe(610_000n);
    expect(entries[0].exUnits.steps()).toBe(710_000n);
    expect(entries[1].exUnits.mem()).toBe(620_000n);
    expect(entries[1].exUnits.steps()).toBe(720_000n);
    expect(evaluateTx).toHaveBeenCalled();
    expect(stableRedeemer).toHaveBeenCalled();
  });

  test("builder fetches wallet inputs once for delayed fixed-point attempts", async () => {
    const walletInput = makeUtxo("78");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptUtxo: UTxO = {
      txHash: "79".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 500_000, steps: 500_000 },
      },
    ]);
    const getUtxos = vi.fn(async () => [walletInput]);
    const wallet = {
      ...makeWallet([]),
      getUtxos,
    };
    const stableRedeemer: BuildTxWithRedeemer = (ctx) =>
      Data.to(ctx.redeemerIndex(ctx.ownPurpose) ?? 999n);

    await makeTxBuilder({
      ...lucidConfig,
      provider: makeProvider(evaluateTx),
      wallet,
    })
      .attach.SpendingValidator(alwaysSucceedScript)
      .collectFrom([scriptUtxo], stableRedeemer)
      .complete({
        localUPLCEval: false,
      });

    expect(getUtxos).toHaveBeenCalledTimes(1);
  });

  test("builder rejects non-converging context-dependent redeemers after max attempts", async () => {
    const walletInput = makeUtxo("99");
    walletInput.assets = { lovelace: 100_000_000n };
    const scriptUtxo: UTxO = {
      txHash: "aa".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    };
    const evaluateTx = vi.fn<Provider["evaluateTx"]>(async () => [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: 500_000, steps: 500_000 },
      },
    ]);
    let callCount = 0;
    const changingRedeemer: BuildTxWithRedeemer = () => {
      callCount += 1;
      return Data.to(BigInt(callCount));
    };

    await expect(
      makeTxBuilder({
        ...lucidConfig,
        provider: makeProvider(evaluateTx),
        wallet: makeWallet([walletInput]),
      })
        .attach.SpendingValidator(alwaysSucceedScript)
        .collectFrom([scriptUtxo], changingRedeemer)
        .complete({
          localUPLCEval: false,
          presetWalletInputs: [walletInput],
        }),
    ).rejects.toThrow(/did not converge after 8 attempts/);

    expect(callCount).toBe(8);
    expect(evaluateTx).toHaveBeenCalled();
  });
});
