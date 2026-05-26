import { describe, expect, test, vi } from "vitest";
import { Effect } from "effect";
import {
  BuildTxWithRedeemer,
  CML,
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

const makeRewardAddress = (byte: string): CML.RewardAddress =>
  CML.RewardAddress.new(
    0,
    CML.Credential.new_script(CML.ScriptHash.from_hex(byte.repeat(28))),
  );

const rewardAddressBech32 = (rewardAddress: CML.RewardAddress): string =>
  rewardAddress.to_address().to_bech32(undefined);

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
