import { describe, expect, test } from "vitest";
import { Script, UTxO } from "@lucid-evolution/core-types";
import * as CML from "@lucid-evolution/cml";
import {
  generateEmulatorAccount,
  generateEmulatorAccountFromPrivateKey,
} from "@lucid-evolution/provider";
import {
  applyDoubleCborEncoding,
  credentialToRewardAddress,
  validatorToAddress,
  getAddressDetails,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/utils";
import { CardanoInfo, SlotConfig, Utxo, Value } from "scalus";
import {
  protocolParameters,
  ScalusEmulator,
  ScalusEmulatorError,
} from "../src/emulator.js";

const BRAND = Symbol.for("@lucid-evolution/provider/Emulator");
const GENESIS_HASH = "00".repeat(32);
const POLICY = "ab".repeat(28);
const UNIT = POLICY + "746f6b656e";
// Constr 0 [], as CBOR; blake2b-256 of these bytes is DATUM_HASH.
const DATUM = "d87980";
const DATUM_HASH =
  "923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec";
const SCRIPT: Script = {
  type: "PlutusV3",
  script: applyDoubleCborEncoding("450100002499"),
};

/** The reward address of a base address. */
const rewardAddressOf = (address: string) =>
  credentialToRewardAddress(
    "Custom",
    getAddressDetails(address).stakeCredential!,
  );

const newEmulator = (...accounts: Parameters<typeof generateEmulatorAccount>) =>
  new ScalusEmulator(
    [generateEmulatorAccount(...accounts)],
    PROTOCOL_PARAMETERS_DEFAULT,
  );

describe("construction", () => {
  test("a manual-clock emulator carries the emulator brand", () => {
    const emulator = newEmulator({ lovelace: 1n });
    expect((emulator as unknown as Record<symbol, unknown>)[BRAND]).toBe(true);
  });

  test("starts at slot 0, at the time of construction", () => {
    const before = Date.now();
    const emulator = newEmulator({ lovelace: 1n });
    expect(emulator.slot).toBe(0);
    expect(emulator.blockHeight).toBe(0);
    // Slot 0 starts at t0, which Scalus keeps to the millisecond.
    expect(emulator.now()).toBeGreaterThanOrEqual(before);
    expect(emulator.now()).toBeLessThanOrEqual(Date.now());
  });

  test("creates one genesis UTxO per account, at the account's index", async () => {
    // An absent field is undefined, as Lucid's own
    // providers return it.
    const first = generateEmulatorAccount({ lovelace: 5_000_000n });
    const second = generateEmulatorAccount({
      lovelace: 7_000_000n,
      [UNIT]: 3n,
    });
    const emulator = new ScalusEmulator(
      [first, second],
      PROTOCOL_PARAMETERS_DEFAULT,
    );
    expect(await emulator.getUtxos(second.address)).toEqual([
      {
        txHash: GENESIS_HASH,
        outputIndex: 1,
        address: second.address,
        assets: { lovelace: 7_000_000n, [UNIT]: 3n },
      },
    ]);
  });

  test("an inline datum maps to datum, not datumHash", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { inline: DATUM };
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const [utxo] = await emulator.getUtxos(account.address);
    expect(utxo.datum).toBe(DATUM);
    expect(utxo.datumHash).toBeUndefined();
  });

  test("a datum hash maps to datumHash, not datum", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { hash: DATUM_HASH };
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const [utxo] = await emulator.getUtxos(account.address);
    expect(utxo.datumHash).toBe(DATUM_HASH);
    expect(utxo.datum).toBeUndefined();
  });

  test("asHash stores the datum's hash and makes the datum findable", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { asHash: DATUM };
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const [utxo] = await emulator.getUtxos(account.address);
    expect(utxo.datumHash).toBe(DATUM_HASH);
    expect(await emulator.getDatum(DATUM_HASH)).toBe(DATUM);
  });

  test("a reference script comes back as Lucid's { type, script }", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { scriptRef: SCRIPT };
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const [utxo] = await emulator.getUtxos(account.address);
    expect(utxo.scriptRef).toEqual(SCRIPT);
  });

  test("a PlutusV4 reference script is an error that names the UTxO", async () => {
    // Lucid has no PlutusV4 script type, so the UTxO cannot map.
    const emulator = newEmulator({ lovelace: 1n });
    const address = generateEmulatorAccount({}).address;
    emulator.scalus.addUtxo(
      new Utxo(
        "55".repeat(32),
        2,
        address,
        new Value(2_000_000n, []),
      ).withScriptRef({
        type: "PlutusV4",
        script: SCRIPT.script,
      }),
    );
    await expect(emulator.getUtxos(address)).rejects.toThrow(
      `UTxO ${"55".repeat(32)}#2 carries a PlutusV4 script, which Lucid has no script type for.`,
    );
  });

  test("rejects an account that sets more than one datum option", () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { inline: DATUM, hash: DATUM_HASH };
    expect(
      () => new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT),
    ).toThrow("Not allowed to set hash, asHash and inline at the same time.");
  });

  test("treasury defaults to 0 and takes the given value", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    expect(
      await new ScalusEmulator(
        [account],
        PROTOCOL_PARAMETERS_DEFAULT,
      ).getTreasury(),
    ).toBe(0n);
    expect(
      await new ScalusEmulator(
        [account],
        PROTOCOL_PARAMETERS_DEFAULT,
        123n,
      ).getTreasury(),
    ).toBe(123n);
  });
});

describe("protocol parameters", () => {
  test("the Lucid parameters reach Scalus under Scalus names", () => {
    // No two values are equal, so a swap of two fields fails.
    const emulator = new ScalusEmulator(
      [generateEmulatorAccount({ lovelace: 1n })],
      {
        ...PROTOCOL_PARAMETERS_DEFAULT,
        drepDeposit: 499_000_000n,
        protocolMajorVersion: 10,
      },
    );
    expect(emulator.scalus.getProtocolParameters().toObject()).toEqual({
      txFeePerByte: 44,
      txFeeFixed: 155381,
      maxTxSize: 16384,
      maxValueSize: 5000,
      stakeAddressDeposit: 2_000_000n,
      stakePoolDeposit: 500_000_000n,
      dRepDeposit: 499_000_000n,
      govActionDeposit: 100_000_000_000n,
      utxoCostPerByte: 4310n,
      priceMemory: 0.0577,
      priceSteps: 0.0000721,
      maxTxExecutionMemory: 14_000_000n,
      maxTxExecutionSteps: 10_000_000_000n,
      collateralPercentage: 150,
      maxCollateralInputs: 3,
      minFeeRefScriptCostPerByte: 15,
      protocolMajorVersion: 10,
      costModels: PROTOCOL_PARAMETERS_DEFAULT.costModels,
    });
  });

  test("getProtocolParameters maps every field back", async () => {
    expect(await newEmulator({ lovelace: 1n }).getProtocolParameters()).toEqual(
      {
        ...PROTOCOL_PARAMETERS_DEFAULT,
        protocolMajorVersion: 11,
      },
    );
  });

  test("a given protocol major version is kept", async () => {
    const emulator = new ScalusEmulator(
      [generateEmulatorAccount({ lovelace: 1n })],
      { ...PROTOCOL_PARAMETERS_DEFAULT, protocolMajorVersion: 10 },
    );
    expect((await emulator.getProtocolParameters()).protocolMajorVersion).toBe(
      10,
    );
  });

  test("protocolParameters(network) is the network's Scalus preset", () => {
    const preprod = protocolParameters("Preprod");
    const preset = CardanoInfo.preprod().protocolParams;
    expect(preprod.minFeeA).toBe(preset.txFeePerByte);
    expect(preprod.minFeeB).toBe(preset.txFeeFixed);
    expect(preprod.priceMem).toBe(preset.priceMemory);
    expect(preprod.priceStep).toBe(preset.priceSteps);
    expect(preprod.costModels.PlutusV3).toEqual(preset.costModels.PlutusV3);
  });
});

describe("queries", () => {
  const holder = generateEmulatorAccount({ lovelace: 5_000_000n, [UNIT]: 1n });
  const other = generateEmulatorAccount({ lovelace: 6_000_000n });
  const emulator = new ScalusEmulator(
    [holder, other],
    PROTOCOL_PARAMETERS_DEFAULT,
  );
  const outRefs = (utxos: UTxO[]) =>
    utxos.map(({ txHash, outputIndex }) => ({ txHash, outputIndex }));

  test("getUtxos by payment credential", async () => {
    const { paymentCredential } = getAddressDetails(other.address);
    expect(outRefs(await emulator.getUtxos(paymentCredential!))).toEqual([
      { txHash: GENESIS_HASH, outputIndex: 1 },
    ]);
    // The credential type is part of the filter: a key hash is no script hash.
    expect(
      await emulator.getUtxos({ ...paymentCredential!, type: "Script" }),
    ).toEqual([]);
  });

  test("getUtxosWithUnit filters by unit", async () => {
    expect(await emulator.getUtxosWithUnit(holder.address, UNIT)).toHaveLength(
      1,
    );
    expect(await emulator.getUtxosWithUnit(other.address, UNIT)).toEqual([]);
  });

  test("getUtxosByOutRef", async () => {
    const utxos = await emulator.getUtxosByOutRef([
      { txHash: GENESIS_HASH, outputIndex: 1 },
      { txHash: GENESIS_HASH, outputIndex: 7 },
    ]);
    expect(outRefs(utxos)).toEqual([{ txHash: GENESIS_HASH, outputIndex: 1 }]);
  });

  test("getUtxoByUnit finds the one holder", async () => {
    expect((await emulator.getUtxoByUnit(UNIT)).address).toBe(holder.address);
  });

  test("getUtxoByUnit rejects a unit held twice", async () => {
    const twice = new ScalusEmulator(
      [holder, generateEmulatorAccount({ lovelace: 5_000_000n, [UNIT]: 1n })],
      PROTOCOL_PARAMETERS_DEFAULT,
    );
    await expect(twice.getUtxoByUnit(UNIT)).rejects.toThrow(
      "Unit needs to be an NFT or only held by one address.",
    );
  });

  test("getUtxoByUnit resolves to undefined for an unknown unit", async () => {
    expect(await emulator.getUtxoByUnit(POLICY)).toBeUndefined();
  });

  test("a reward account nobody registered", async () => {
    const rewardAddress = rewardAddressOf(holder.address);
    expect(await emulator.getDelegation(rewardAddress)).toEqual({
      poolId: null,
      rewards: 0n,
    });
    expect(await emulator.getRewardAccount(rewardAddress)).toEqual({
      registered: false,
      poolId: null,
      rewards: 0n,
    });
  });

  test("a reward account registered with no pool", async () => {
    const account = generateEmulatorAccountFromPrivateKey({
      lovelace: 100_000_000n,
    });
    const registered = new ScalusEmulator(
      [account],
      PROTOCOL_PARAMETERS_DEFAULT,
    );
    const privateKey = CML.PrivateKey.from_bech32(account.privateKey);
    const keyHash = privateKey.to_public().hash();
    const inputs = CML.TransactionInputList.new();
    inputs.add(
      CML.TransactionInput.new(CML.TransactionHash.from_hex(GENESIS_HASH), 0n),
    );
    const outputs = CML.TransactionOutputList.new();
    // 100 ADA less the 2 ADA key deposit and the 0.2 ADA fee.
    outputs.add(
      CML.TransactionOutput.new(
        CML.Address.from_bech32(account.address),
        CML.Value.from_coin(97_800_000n),
      ),
    );
    const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
    const certs = CML.CertificateList.new();
    certs.add(
      CML.Certificate.new_stake_registration(
        CML.Credential.new_pub_key(keyHash),
      ),
    );
    body.set_certs(certs);
    const witnesses = CML.TransactionWitnessSet.new();
    const vkeys = CML.VkeywitnessList.new();
    vkeys.add(CML.make_vkey_witness(CML.hash_transaction(body), privateKey));
    witnesses.set_vkeywitnesses(vkeys);
    await registered.submitTx(
      CML.Transaction.new(body, witnesses, true).to_cbor_hex(),
    );
    const rewardAddress = credentialToRewardAddress("Custom", {
      type: "Key",
      hash: keyHash.to_hex(),
    });
    expect(await registered.getRewardAccount(rewardAddress)).toEqual({
      registered: true,
      poolId: null,
      rewards: 0n,
    });
  });

  test("an unknown transaction", async () => {
    const txHash = "11".repeat(32);
    expect(await emulator.awaitTx(txHash)).toBe(false);
    expect(await emulator.getTransactionStatus(txHash)).toEqual({
      status: "not_found",
      txHash,
    });
  });

  test("getTransactionStatus rejects with the abort reason", async () => {
    const reason = new Error("stop");
    await expect(
      emulator.getTransactionStatus("11".repeat(32), {
        signal: AbortSignal.abort(reason),
      }),
    ).rejects.toBe(reason);
  });

  test("has no policy query", () => {
    expect("getUtxosWithPolicy" in emulator).toBe(false);
  });
});

describe("time", () => {
  test("awaitBlock moves 20 slots a block, awaitSlot one slot", () => {
    const emulator = newEmulator({ lovelace: 1n });
    const t0 = emulator.now();
    emulator.awaitBlock(3);
    expect([emulator.slot, emulator.now(), emulator.blockHeight]).toEqual([
      60,
      t0 + 60_000,
      3,
    ]);
    emulator.awaitSlot(5);
    expect([emulator.slot, emulator.blockHeight]).toEqual([65, 3]);
    emulator.awaitSlot(15);
    expect([emulator.slot, emulator.blockHeight]).toEqual([80, 4]);
    emulator.awaitBlock();
    emulator.awaitSlot();
    expect(emulator.slot).toBe(101);
  });
});

describe("wall clock", () => {
  const forPreprod = () => ScalusEmulator.forNetwork("Preprod", { utxos: [] });

  test("starts at the slot that contains now, without the brand", () => {
    const before = SlotConfig.preprod.timeToSlot(Date.now());
    const emulator = forPreprod();
    expect(emulator.slot).toBeGreaterThanOrEqual(Math.floor(before));
    expect(emulator.slot).toBeLessThanOrEqual(
      SlotConfig.preprod.timeToSlot(Date.now()),
    );
    expect(BRAND in emulator).toBe(false);
  });

  test("defaults to the network's parameters", async () => {
    expect(await forPreprod().getProtocolParameters()).toEqual(
      protocolParameters("Preprod"),
    );
  });

  test("takes the given UTxOs and parameters", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    const utxo: UTxO = {
      txHash: "22".repeat(32),
      outputIndex: 3,
      address: account.address,
      assets: { lovelace: 5_000_000n },
    };
    const emulator = ScalusEmulator.forNetwork("Preprod", {
      utxos: [utxo],
      protocolParameters: PROTOCOL_PARAMETERS_DEFAULT,
      treasury: 9n,
    });
    expect(await emulator.getUtxos(account.address)).toEqual([utxo]);
    expect((await emulator.getProtocolParameters()).costModels).toEqual(
      PROTOCOL_PARAMETERS_DEFAULT.costModels,
    );
    expect(await emulator.getTreasury()).toBe(9n);
  });

  test("awaitSlot and awaitBlock throw", () => {
    const WALL_CLOCK = "A wall-clock ScalusEmulator follows Date.now().";
    const emulator = forPreprod();
    expect(() => emulator.awaitSlot()).toThrow(WALL_CLOCK);
    expect(() => emulator.awaitBlock()).toThrow(WALL_CLOCK);
  });
});

describe("submission", () => {
  test("a rejected transaction throws ScalusEmulatorError with the Scalus result", async () => {
    const emulator = newEmulator({ lovelace: 1n });
    const error = await emulator.submitTx("00").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ScalusEmulatorError);
    const { errorRule, logs, message } = error as ScalusEmulatorError;
    expect(errorRule).toBe("InvalidTransaction");
    expect((error as ScalusEmulatorError).error).toEqual(expect.any(String));
    expect(logs).toEqual([]);
    expect(message).toBe(
      `InvalidTransaction: ${(error as ScalusEmulatorError).error}`,
    );
  });
});

/**
 * Submits a transaction that spends a script UTxO with one redeemer, pays
 * collateral from the account's genesis UTxO and carries no script data
 * hash, as Lucid's provider tests build them.
 */
const spendScriptUtxo = (script: Script, datum?: string) => {
  const account = generateEmulatorAccountFromPrivateKey({
    lovelace: 100_000_000n,
  });
  const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const scriptUtxo = "11".repeat(32);
  emulator.addUtxo({
    txHash: scriptUtxo,
    outputIndex: 0,
    address: validatorToAddress("Custom", script),
    assets: { lovelace: 10_000_000n },
    datum,
  });
  const input = (txHash: string) =>
    CML.TransactionInput.new(CML.TransactionHash.from_hex(txHash), 0n);
  const inputs = CML.TransactionInputList.new();
  inputs.add(input(scriptUtxo));
  const outputs = CML.TransactionOutputList.new();
  outputs.add(
    CML.TransactionOutput.new(
      CML.Address.from_bech32(account.address),
      CML.Value.from_coin(9_800_000n),
    ),
  );
  const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
  const collateral = CML.TransactionInputList.new();
  collateral.add(input(GENESIS_HASH));
  body.set_collateral_inputs(collateral);
  const witnesses = CML.TransactionWitnessSet.new();
  const vkeys = CML.VkeywitnessList.new();
  vkeys.add(
    CML.make_vkey_witness(
      CML.hash_transaction(body),
      CML.PrivateKey.from_bech32(account.privateKey),
    ),
  );
  witnesses.set_vkeywitnesses(vkeys);
  if (script.type === "PlutusV2") {
    const scripts = CML.PlutusV2ScriptList.new();
    scripts.add(CML.PlutusV2Script.from_cbor_hex(script.script));
    witnesses.set_plutus_v2_scripts(scripts);
  } else {
    const scripts = CML.PlutusV3ScriptList.new();
    scripts.add(CML.PlutusV3Script.from_cbor_hex(script.script));
    witnesses.set_plutus_v3_scripts(scripts);
  }
  const redeemers = CML.LegacyRedeemerList.new();
  redeemers.add(
    CML.LegacyRedeemer.new(
      CML.RedeemerTag.Spend,
      0n,
      CML.PlutusData.new_integer(CML.BigInteger.from_str("0")),
      CML.ExUnits.new(0n, 0n),
    ),
  );
  witnesses.set_redeemers(CML.Redeemers.new_arr_legacy_redeemer(redeemers));
  return emulator
    .submitTx(CML.Transaction.new(body, witnesses, true).to_cbor_hex())
    .catch((error: ScalusEmulatorError) => error.errorRule);
};

// Lucid's provider tests that Scalus rejects by a ledger rule.
describe("ledger rules that Lucid's Emulator does not check", () => {
  test("a script spend with no script data hash is InvalidScriptDataHash", async () => {
    // The ledger: PPViewHashesDontMatch.
    expect(await spendScriptUtxo(SCRIPT, DATUM)).toBe("InvalidScriptDataHash");
  });

  test("spending a PlutusV2 output that has no datum is Datums", async () => {
    // The ledger: UnspendableUTxONoDatumHash.
    const v2: Script = { type: "PlutusV2", script: SCRIPT.script };
    expect(await spendScriptUtxo(v2)).toBe("Datums");
  });
});

describe("test helpers", () => {
  test("addUtxo adds a Lucid UTxO to the ledger", async () => {
    const emulator = newEmulator({ lovelace: 1n });
    const utxo: UTxO = {
      txHash: "33".repeat(32),
      outputIndex: 0,
      address: generateEmulatorAccount({}).address,
      assets: { lovelace: 2_000_000n },
      datum: DATUM,
      scriptRef: SCRIPT,
    };
    emulator.addUtxo(utxo);
    expect(await emulator.getUtxosByOutRef([utxo])).toEqual([utxo]);
  });

  test("addUtxo stores the datum of a datum-hash UTxO, so getDatum finds it", async () => {
    const emulator = newEmulator({ lovelace: 1n });
    const utxo: UTxO = {
      txHash: "33".repeat(32),
      outputIndex: 0,
      address: generateEmulatorAccount({}).address,
      assets: { lovelace: 2_000_000n },
      datumHash: DATUM_HASH,
      datum: DATUM,
    };
    emulator.addUtxo(utxo);
    expect(await emulator.getDatum(DATUM_HASH)).toBe(DATUM);
    expect(await emulator.getUtxosByOutRef([utxo])).toEqual([
      { ...utxo, datum: undefined },
    ]);
  });

  test("addUtxo rejects a datum that does not match the datum hash", async () => {
    const emulator = newEmulator({ lovelace: 1n });
    // Constr 1 [], whose hash is not DATUM_HASH.
    const otherDatum = "d87a80";
    const utxo: UTxO = {
      txHash: "33".repeat(32),
      outputIndex: 0,
      address: generateEmulatorAccount({}).address,
      assets: { lovelace: 2_000_000n },
      datumHash: DATUM_HASH,
      datum: otherDatum,
    };
    expect(() => emulator.addUtxo(utxo)).toThrow(
      `The datum of UTxO ${"33".repeat(32)}#0 does not match its datum hash ${DATUM_HASH}.`,
    );
    expect(emulator.scalus.getUtxos({ outRefs: [utxo] })).toEqual([]);
  });

  test("addUtxo takes a datum hash with the datum the emulator knows for it", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    account.outputData = { asHash: DATUM };
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const utxo: UTxO = {
      txHash: "33".repeat(32),
      outputIndex: 0,
      address: account.address,
      assets: { lovelace: 2_000_000n },
      datumHash: DATUM_HASH,
      datum: DATUM,
    };
    emulator.addUtxo(utxo);
    expect(await emulator.getUtxosByOutRef([utxo])).toEqual([
      { ...utxo, datum: undefined },
    ]);
  });

  test("snapshot branches the ledger, the clock and the brand", async () => {
    const account = generateEmulatorAccount({ lovelace: 5_000_000n });
    const emulator = new ScalusEmulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const copy = emulator.snapshot();
    copy.awaitBlock();
    copy.addUtxo({
      txHash: "44".repeat(32),
      outputIndex: 0,
      address: account.address,
      assets: { lovelace: 2_000_000n },
    });
    expect(copy).toBeInstanceOf(ScalusEmulator);
    expect(copy.scalus).not.toBe(emulator.scalus);
    expect([emulator.slot, copy.slot]).toEqual([0, 20]);
    expect(await emulator.getUtxos(account.address)).toHaveLength(1);
    expect(await copy.getUtxos(account.address)).toHaveLength(2);
    expect((copy as unknown as Record<symbol, unknown>)[BRAND]).toBe(true);
    expect(
      BRAND in ScalusEmulator.forNetwork("Preprod", { utxos: [] }).snapshot(),
    ).toBe(false);
  });

  test("exposes none of the Lucid Emulator's writable internals", () => {
    const emulator = newEmulator({ lovelace: 1n });
    for (const member of [
      "ledger",
      "mempool",
      "chain",
      "datumTable",
      "transactionHistory",
    ])
      expect(member in emulator).toBe(false);
  });
});
