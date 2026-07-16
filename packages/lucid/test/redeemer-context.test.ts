import { describe, expect, test } from "vitest";
import { Effect } from "effect";
import {
  BuildTxWithRedeemer,
  CML,
  Provider,
  Script,
  UTxO,
  makeTxBuilder,
} from "../src/index.js";
import { makeTxConfig } from "../src/tx-builder/TxConfig.js";
import {
  buildCanonicalRedeemerInfo,
  buildRedeemersFromCanonicalContext,
  canonicalRedeemerEntries,
  transactionFixedPointFingerprint,
} from "../src/tx-builder/internal/RedeemerContext.js";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/utils";
import { Data } from "@lucid-evolution/plutus";

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
  slotConfig: { zeroTime: 0, zeroSlot: 0, slotLength: 1_000 },
};

const redeemerData = (value: bigint): CML.PlutusData =>
  CML.PlutusData.from_cbor_hex(Data.to(value));

const redeemerExUnits = (value: bigint): CML.ExUnits =>
  CML.ExUnits.new(value, value + 100n);

const redeemerVal = (value: bigint): CML.RedeemerVal =>
  CML.RedeemerVal.new(redeemerData(value), redeemerExUnits(value));

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

const redeemerLabels = (redeemers: CML.Redeemers): string[] =>
  canonicalRedeemerEntries(redeemers).map(
    (entry) => `${entry.tag}:${entry.index}`,
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

const makeContextTx = (redeemers: CML.Redeemers) => {
  const txHash = "11".repeat(32);
  const inputList = CML.TransactionInputList.new();
  inputList.add(
    CML.TransactionInput.new(CML.TransactionHash.from_hex(txHash), 0n),
  );

  const outputList = CML.TransactionOutputList.new();
  outputList.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(address),
      CML.Value.from_coin(1_000_000n),
    ),
  );

  const policy = CML.ScriptHash.from_hex("00".repeat(28));
  const assetName = CML.AssetName.from_raw_bytes(new Uint8Array([]));
  const mintAssets = CML.MapAssetNameToNonZeroInt64.new();
  mintAssets.insert(assetName, 1n);
  const mint = CML.Mint.new();
  mint.insert_assets(policy, mintAssets);

  const rewardAddress = CML.RewardAddress.new(
    0,
    CML.Credential.new_script(CML.ScriptHash.from_hex("22".repeat(28))),
  );
  const withdrawals = CML.MapRewardAccountToCoin.new();
  withdrawals.insert(rewardAddress, 1n);

  const body = CML.TransactionBody.new(inputList, outputList, 0n);
  body.set_mint(mint);
  body.set_withdrawals(withdrawals);

  const witnessSet = CML.TransactionWitnessSet.new();
  witnessSet.set_redeemers(redeemers);

  const utxo: UTxO = {
    txHash,
    outputIndex: 0,
    address,
    assets: { lovelace: 1_000_000n },
  };

  return {
    tx: CML.Transaction.new(body, witnessSet, true),
    utxo,
  };
};

describe("context-dependent redeemers", () => {
  test("static config replay uses action snapshots without mutating source debug state", async () => {
    const assets = { lovelace: 2_000_000n };
    const tx = makeTxBuilder(lucidConfig).pay.ToAddress(address, assets);
    assets.lovelace = 10_000_000n;

    const replayedConfig = await tx.config();

    expect(replayedConfig.payToOutputs).toHaveLength(1);
    expect(replayedConfig.payToOutputs[0].assets.lovelace).toBe(2_000_000n);
    expect(tx.rawConfig().payToOutputs).toHaveLength(0);
  });

  test("compose merges minted assets without double-counting parent assets", () => {
    const unit = "aa".repeat(28) + "01";
    const firstMint = makeTxBuilder(lucidConfig).mintAssets({ [unit]: 5n });
    const secondMint = makeTxBuilder(lucidConfig).mintAssets({ [unit]: 7n });
    const emptyTx = makeTxBuilder(lucidConfig);

    const composed = makeTxBuilder(lucidConfig)
      .compose(firstMint)
      .compose(emptyTx);
    expect(composed.rawConfig().mintedAssets).toEqual({ [unit]: 5n });

    const composedWithMoreMint = makeTxBuilder(lucidConfig)
      .compose(firstMint)
      .compose(secondMint);
    expect(composedWithMoreMint.rawConfig().mintedAssets).toEqual({
      [unit]: 12n,
    });
  });

  test("config rejects delayed redeemers", async () => {
    const redeemer: BuildTxWithRedeemer = (ctx) => {
      ctx.inputs[0]?.txHash;
      ctx.referenceInputs[0]?.assets;
      return Data.void();
    };

    await expect(
      makeTxBuilder(lucidConfig)
        .collectFrom(
          [
            {
              txHash: "00".repeat(32),
              outputIndex: 0,
              address,
              assets: { lovelace: 2_000_000n },
            },
          ],
          redeemer,
        )
        .config(),
    ).rejects.toThrow(/BuildTxWithRedeemer|RedeemerBuilder/);
  });

  test("redeemer context exposes canonical tx body and resolved UTxO inputs in one field", async () => {
    const { tx, utxo } = makeContextTx(
      makeRedeemerMap([[CML.RedeemerTag.Spend, 0n, 1n]]),
    );
    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [utxo]),
    );

    const redeemer: BuildTxWithRedeemer = (ctx) => {
      expect(ctx.txBody.to_canonical_cbor_hex()).toBe(
        tx.body().to_canonical_cbor_hex(),
      );
      expect(ctx.inputs).toEqual([utxo]);
      expect(ctx.referenceInputs).toEqual([]);

      return Data.to(BigInt(ctx.inputs.length));
    };

    const redeemers = await Effect.runPromise(
      buildRedeemersFromCanonicalContext(info, [
        {
          id: 1,
          actionId: 0,
          source: redeemer,
          purposeKey: {
            tag: "spend",
            input: { txHash: utxo.txHash, outputIndex: utxo.outputIndex },
          },
        },
      ]),
    );

    expect(redeemers.get(1)).toBe(Data.to(1n));
  });

  test("canonical input resolution prefers the most complete duplicate UTxO", async () => {
    const { tx, utxo } = makeContextTx(
      makeRedeemerMap([[CML.RedeemerTag.Spend, 0n, 1n]]),
    );
    const scriptRef: Script = { type: "PlutusV3", script: "00" };
    const lessComplete: UTxO = {
      ...utxo,
      datumHash: "12".repeat(32),
    };
    const moreComplete: UTxO = {
      ...utxo,
      datum: Data.void(),
      scriptRef,
    };

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [lessComplete, moreComplete]),
    );

    expect(info.inputs[0].datum).toBe(Data.void());
    expect(info.inputs[0].scriptRef).toEqual(scriptRef);
  });

  test("canonical redeemer entries are sorted independently of map insertion order", () => {
    const redeemers = makeRedeemerMap([
      [CML.RedeemerTag.Reward, 0n, 3n],
      [CML.RedeemerTag.Mint, 0n, 2n],
      [CML.RedeemerTag.Spend, 0n, 1n],
    ]);

    expect(redeemerLabels(redeemers)).toEqual([
      "spend:0",
      "mint:0",
      "withdraw:0",
    ]);
  });

  test("canonical redeemer entries are sorted independently of legacy array order", () => {
    const redeemers = makeRedeemerList([
      [CML.RedeemerTag.Reward, 0n, 3n],
      [CML.RedeemerTag.Mint, 0n, 2n],
      [CML.RedeemerTag.Spend, 0n, 1n],
    ]);

    expect(redeemerLabels(redeemers)).toEqual([
      "spend:0",
      "mint:0",
      "withdraw:0",
    ]);
  });

  test("redeemerListIndex follows canonical redeemer order while purpose index remains body index", async () => {
    const { tx, utxo } = makeContextTx(
      makeRedeemerMap([
        [CML.RedeemerTag.Reward, 0n, 3n],
        [CML.RedeemerTag.Mint, 0n, 2n],
        [CML.RedeemerTag.Spend, 0n, 1n],
      ]),
    );

    const info = await Effect.runPromise(
      buildCanonicalRedeemerInfo(tx, [utxo]),
    );

    expect(
      info.redeemers.map(
        (purpose) =>
          `${purpose.tag}:${purpose.index}:${purpose.redeemerListIndex}`,
      ),
    ).toEqual(["spend:0:0", "mint:0:1", "withdraw:0:2"]);
  });

  test("fixed-point fingerprint is stable across equivalent redeemer map insertion order", () => {
    const first = makeContextTx(
      makeRedeemerMap([
        [CML.RedeemerTag.Reward, 0n, 3n],
        [CML.RedeemerTag.Mint, 0n, 2n],
        [CML.RedeemerTag.Spend, 0n, 1n],
      ]),
    );
    const second = makeContextTx(
      makeRedeemerMap([
        [CML.RedeemerTag.Spend, 0n, 1n],
        [CML.RedeemerTag.Reward, 0n, 3n],
        [CML.RedeemerTag.Mint, 0n, 2n],
      ]),
    );

    expect(transactionFixedPointFingerprint(first.tx)).toEqual(
      transactionFixedPointFingerprint(second.tx),
    );
  });
});
