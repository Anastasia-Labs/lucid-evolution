import { describe, expect, test } from "vitest";
import { CML } from "../src/core.js";
import { parseTransaction } from "../src/parse.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const makeRewardAccount = () =>
  CML.RewardAddress.new(
    0,
    CML.Credential.new_script(CML.ScriptHash.from_hex("66".repeat(28))),
  );

const rewardAddress = makeRewardAccount().to_address().to_bech32(undefined);

const makeInput = (hashByte: string, outputIndex: number) =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(hashByte.repeat(32)),
    BigInt(outputIndex),
  );

const makeOutput = (lovelace: bigint) =>
  CML.TransactionOutput.new(
    CML.Address.from_bech32(address),
    CML.Value.from_coin(lovelace),
  );

const makeBaseTx = (): CML.Transaction => {
  const inputs = CML.TransactionInputList.new();
  inputs.add(makeInput("11", 0));

  const outputs = CML.TransactionOutputList.new();
  outputs.add(makeOutput(2_000_000n));

  const body = CML.TransactionBody.new(inputs, outputs, 170_000n);
  body.set_validity_interval_start(10n);
  body.set_ttl(20n);

  const referenceInputs = CML.TransactionInputList.new();
  referenceInputs.add(makeInput("22", 1));
  body.set_reference_inputs(referenceInputs);

  const collateralInputs = CML.TransactionInputList.new();
  collateralInputs.add(makeInput("33", 2));
  body.set_collateral_inputs(collateralInputs);
  body.set_collateral_return(makeOutput(1_500_000n));
  body.set_total_collateral(1_000_000n);

  const requiredSigners = CML.Ed25519KeyHashList.new();
  requiredSigners.add(CML.Ed25519KeyHash.from_hex("44".repeat(28)));
  body.set_required_signers(requiredSigners);

  const withdrawals = CML.MapRewardAccountToCoin.new();
  withdrawals.insert(makeRewardAccount(), 123_456n);
  body.set_withdrawals(withdrawals);

  return CML.Transaction.new(body, CML.TransactionWitnessSet.new(), true);
};

const plutusData = (value: bigint): CML.PlutusData =>
  CML.PlutusData.new_integer(CML.BigInteger.from_str(value.toString()));

const redeemerVal = (value: bigint): CML.RedeemerVal =>
  CML.RedeemerVal.new(plutusData(value), CML.ExUnits.new(value, value + 100n));

describe("parseTransaction", () => {
  test("parses body inputs, outputs, validity, collateral, withdrawals, and signers", () => {
    const tx = makeBaseTx();
    const parsed = parseTransaction(tx, {
      label: "basic-flow",
      status: "signed",
    });

    expect(parsed.label).toBe("basic-flow");
    expect(parsed.status).toBe("signed");
    expect(parsed.hash).toBe(CML.hash_transaction(tx.body()).to_hex());
    expect(parsed.fee).toBe("170000");
    expect(parsed.validityInterval).toEqual({
      validFrom: "10",
      validTo: "20",
    });
    expect(parsed.inputs).toEqual([
      { txHash: "11".repeat(32), outputIndex: 0 },
    ]);
    expect(parsed.referenceInputs).toEqual([
      { txHash: "22".repeat(32), outputIndex: 1 },
    ]);
    expect(parsed.collateralInputs).toEqual([
      { txHash: "33".repeat(32), outputIndex: 2 },
    ]);
    expect(parsed.totalCollateral).toBe("1000000");
    expect(parsed.collateralReturn?.assets).toEqual({
      lovelace: "1500000",
    });
    expect(parsed.outputs).toHaveLength(1);
    expect(parsed.outputs[0]).toMatchObject({
      txHash: parsed.hash,
      outputIndex: 0,
      address,
      assets: { lovelace: "2000000" },
      resolution: "resolved",
      tags: [],
    });
    expect(parsed.outputs[0]?.paymentCredential?.type).toBe("Key");
    expect(parsed.withdrawals).toEqual([{ rewardAddress, amount: "123456" }]);
    expect(parsed.requiredSigners).toEqual(["44".repeat(28)]);
  });

  test("normalizes CBOR and toTransaction inputs", () => {
    const tx = makeBaseTx();

    expect(parseTransaction(tx.to_cbor_hex()).hash).toBe(
      CML.hash_transaction(tx.body()).to_hex(),
    );
    expect(parseTransaction({ toTransaction: () => tx }).hash).toBe(
      CML.hash_transaction(tx.body()).to_hex(),
    );
    expect(parseTransaction({ toCBOR: () => tx.to_cbor_hex() }).hash).toBe(
      CML.hash_transaction(tx.body()).to_hex(),
    );
  });

  test("splits minted and burned assets and parses redeemers", () => {
    const inputs = CML.TransactionInputList.new();
    inputs.add(makeInput("11", 0));
    const outputs = CML.TransactionOutputList.new();
    outputs.add(makeOutput(2_000_000n));
    const body = CML.TransactionBody.new(inputs, outputs, 170_000n);

    const policy = CML.ScriptHash.from_hex("55".repeat(28));
    const policyAssets = CML.MapAssetNameToNonZeroInt64.new();
    policyAssets.insert(CML.AssetName.from_hex("aa"), 7n);
    policyAssets.insert(CML.AssetName.from_hex("bb"), -3n);
    const mint = CML.Mint.new();
    mint.insert_assets(policy, policyAssets);
    body.set_mint(mint);

    const redeemerMap = CML.MapRedeemerKeyToRedeemerVal.new();
    redeemerMap.insert(
      CML.RedeemerKey.new(CML.RedeemerTag.Mint, 0n),
      redeemerVal(2n),
    );
    redeemerMap.insert(
      CML.RedeemerKey.new(CML.RedeemerTag.Spend, 0n),
      redeemerVal(1n),
    );
    const witnessSet = CML.TransactionWitnessSet.new();
    witnessSet.set_redeemers(
      CML.Redeemers.new_map_redeemer_key_to_redeemer_val(redeemerMap),
    );

    const parsed = parseTransaction(
      CML.Transaction.new(body, witnessSet, true),
    );
    const mintedUnit = "55".repeat(28) + "aa";
    const burnedUnit = "55".repeat(28) + "bb";

    expect(parsed.mint).toEqual({
      [mintedUnit]: "7",
      [burnedUnit]: "-3",
    });
    expect(parsed.mintedAssets).toEqual({ [mintedUnit]: "7" });
    expect(parsed.burnedAssets).toEqual({ [burnedUnit]: "3" });
    expect(parsed.redeemers).toEqual([
      {
        tag: "spend",
        index: "0",
        redeemerListIndex: 0,
        data: plutusData(1n).to_cbor_hex(),
        exUnits: { mem: "1", steps: "101" },
      },
      {
        tag: "mint",
        index: "0",
        redeemerListIndex: 1,
        data: plutusData(2n).to_cbor_hex(),
        exUnits: { mem: "2", steps: "102" },
      },
    ]);
  });
});
