import { describe, expect, test } from "vitest";
import {
  applyParamsToScript,
  CML,
  Data,
  Emulator,
  EvaluatorAdapter,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  PROTOCOL_PARAMETERS_DEFAULT,
  ProtocolParameters,
  Script,
  TxSignBuilder,
  UTxO,
  validatorToAddress,
} from "../src/index.js";
import {
  alwaysSucceedV3Script,
  feeThresholdV3Script,
} from "./fixtures/scripts.js";

/*
  Every completed script transaction must satisfy the ledger's collateral
  rule: its collateral inputs minus its collateral return cover
  collateralPercentage of the final fee, and total_collateral, when present,
  equals that balance. The fee here is large enough that 150% of it exceeds
  the default 5 ADA collateral, so the collateral is sized from the fee.
*/

// Execution units cost enough that a script's fee exceeds 5 ADA / 150%.
const EXPENSIVE_PRICES: ProtocolParameters = {
  ...PROTOCOL_PARAMETERS_DEFAULT,
  priceMem: 10,
  priceStep: 0.05,
};

// Always takes the expensive branch of the fee-threshold script.
const expensiveScript: Script = {
  type: "PlutusV3",
  script: applyParamsToScript(feeThresholdV3Script.script, [0n]),
};

const setup = async (
  script: Script = expensiveScript,
  protocolParameters: ProtocolParameters = EXPENSIVE_PRICES,
) => {
  const account = generateEmulatorAccount({ lovelace: 1_000_000_000n });
  const emulator = new Emulator([account], protocolParameters);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);
  const address = await lucid.wallet().address();
  const scriptAddress = validatorToAddress("Custom", script);
  const funded = await lucid
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 100_000_000n },
    )
    .pay.ToAddress(address, { lovelace: 5_000_000n })
    .pay.ToAddress(address, { lovelace: 7_000_000n })
    .complete();
  await lucid.awaitTx(
    await (await funded.sign.withWallet().complete()).submit(),
  );
  const [input] = await lucid.utxosAt(scriptAddress);
  return { emulator, lucid, address, script, input };
};

type Fixture = Awaited<ReturnType<typeof setup>>;

const spend = (
  fixture: Fixture,
  options: Parameters<ReturnType<LucidEvolution["newTx"]>["complete"]>[0] = {},
) =>
  fixture.lucid
    .newTx()
    .collectFrom([fixture.input], Data.void())
    .attach.SpendingValidator(fixture.script)
    .pay.ToAddress(fixture.address, { lovelace: 10_000_000n })
    .complete(options);

const outRefs = (inputs: CML.TransactionInputList | undefined) =>
  Array.from({ length: inputs?.len() ?? 0 }, (_, index) => {
    const input = inputs!.get(index);
    return {
      txHash: input.transaction_id().to_hex(),
      outputIndex: Number(input.index()),
    };
  });

/**
 * Asserts the ledger's collateral rule on the completed transaction, returning
 * the required collateral, then submits it to the emulator, which checks the
 * same rule.
 */
const expectLedgerCollateral = async (
  fixture: Fixture,
  signBuilder: TxSignBuilder,
): Promise<bigint> => {
  const tx = signBuilder.toTransaction();
  const body = tx.body();
  expect(tx.witness_set().redeemers()).toBeDefined();
  const collateralInputs: UTxO[] = await fixture.emulator.getUtxosByOutRef(
    outRefs(body.collateral_inputs()),
  );
  expect(collateralInputs.length).toBeGreaterThan(0);
  const balance =
    collateralInputs.reduce((sum, utxo) => sum + utxo.assets.lovelace, 0n) -
    (body.collateral_return()?.amount().coin() ?? 0n);
  const required =
    (body.fee() * BigInt(EXPENSIVE_PRICES.collateralPercentage) + 99n) / 100n;
  expect(balance).toBeGreaterThanOrEqual(required);
  const totalCollateral = body.total_collateral();
  if (totalCollateral !== undefined) expect(totalCollateral).toBe(balance);
  await fixture.lucid.awaitTx(
    await (await signBuilder.sign.withWallet().complete()).submit(),
  );
  return required;
};

// Returns the same large execution units for every redeemer.
const largeExUnitsEvaluator: EvaluatorAdapter = {
  name: "large-ex-units",
  evaluate: async ({ tx }) => {
    const redeemers = CML.Transaction.from_cbor_hex(tx)
      .witness_set()
      .redeemers()!
      .to_flat_format();
    return Array.from({ length: redeemers.len() }, (_, index) => {
      const redeemer = redeemers.get(index);
      return {
        redeemer_tag: "spend" as const,
        redeemer_index: Number(redeemer.index()),
        ex_units: { mem: 3_000_000, steps: 1_000_000_000 },
      };
    });
  },
};

describe("completed script transactions satisfy the ledger collateral rule", () => {
  test("with coin selection", async () => {
    const fixture = await setup();
    const required = await expectLedgerCollateral(
      fixture,
      await spend(fixture),
    );
    expect(required).toBeGreaterThan(5_000_000n);
  });

  test("without coin selection", async () => {
    const fixture = await setup();
    const required = await expectLedgerCollateral(
      fixture,
      await spend(fixture, { coinSelection: false }),
    );
    expect(required).toBeGreaterThan(5_000_000n);
  });

  test("with a custom evaluator returning large execution units", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    for (const coinSelection of [true, false]) {
      const [input] = await fixture.lucid.utxosAt(
        validatorToAddress("Custom", fixture.script),
      );
      const required = await expectLedgerCollateral(
        fixture,
        await spend(
          { ...fixture, input },
          { coinSelection, evaluator: largeExUnitsEvaluator },
        ),
      );
      expect(required).toBeGreaterThan(5_000_000n);
      // Send the change back to the script for the next spend.
      if (coinSelection) {
        await fixture.lucid.awaitTx(
          await (
            await (
              await fixture.lucid
                .newTx()
                .pay.ToContract(
                  validatorToAddress("Custom", fixture.script),
                  { kind: "inline", value: Data.void() },
                  { lovelace: 100_000_000n },
                )
                .complete()
            ).sign
              .withWallet()
              .complete()
          ).submit(),
        );
      }
    }
  });

  test("with the provider's evaluator", async () => {
    const fixture = await setup();
    // A minimum fee makes the transaction fee-heavy whatever the provider's
    // execution units.
    const signBuilder = await fixture.lucid
      .newTx()
      .collectFrom([fixture.input], Data.void())
      .attach.SpendingValidator(fixture.script)
      .setMinFee(4_000_000n)
      .complete({ localUPLCEval: false });
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(5_000_000n);
  });

  test("with a delayed RedeemerBuilder", async () => {
    const fixture = await setup();
    const signBuilder = await fixture.lucid
      .newTx()
      .collectFrom([fixture.input], (context) =>
        Data.to(context.inputIndex(fixture.input)!),
      )
      .attach.SpendingValidator(fixture.script)
      .pay.ToAddress(fixture.address, { lovelace: 10_000_000n })
      .complete();
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(5_000_000n);
  });

  test("with a wallet's 5 ADA collateral that cannot cover the fee", async () => {
    const fixture = await setup();
    const fiveAda = (await fixture.lucid.wallet().getUtxos()).find(
      (utxo) => utxo.assets.lovelace === 5_000_000n,
    )!;
    const amounts: bigint[] = [];
    fixture.lucid.wallet().getCollateral = async (amount) => {
      amounts.push(amount!);
      return [fiveAda];
    };
    const required = await expectLedgerCollateral(
      fixture,
      await spend(fixture),
    );
    expect(required).toBeGreaterThan(5_000_000n);
    expect(amounts.length).toBeGreaterThan(0);
  });

  test("with setMinFee above 5 ADA / 150%", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const signBuilder = await fixture.lucid
      .newTx()
      .collectFrom([fixture.input], Data.void())
      .attach.SpendingValidator(fixture.script)
      .setMinFee(8_000_000n)
      .complete();
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThanOrEqual(12_000_000n);
  });

  test("fails clearly when the fee never stops outgrowing the collateral", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    // Execution units, and so the fee, grow with the collateral: every top-up
    // needs another one of 150% of it.
    const evaluator: EvaluatorAdapter = {
      name: "collateral-dependent",
      evaluate: async ({ tx }) => {
        const collateral =
          CML.Transaction.from_cbor_hex(tx).body().total_collateral() ?? 0n;
        return [
          {
            redeemer_tag: "spend",
            redeemer_index: 0,
            ex_units: { mem: 0, steps: Number(collateral * 20n) },
          },
        ];
      },
    };
    await expect(spend(fixture, { evaluator })).rejects.toThrow(
      /did not converge/,
    );
  });
});

// Counts evaluator calls; the execution units may depend on the transaction.
const countingEvaluator = (
  exUnits: (tx: CML.Transaction) => { mem: number; steps: number },
) => {
  const counter = { calls: 0 };
  const evaluator: EvaluatorAdapter = {
    name: "counting",
    evaluate: async ({ tx }) => {
      counter.calls++;
      const transaction = CML.Transaction.from_cbor_hex(tx);
      const redeemers = transaction.witness_set().redeemers()!.to_flat_format();
      return Array.from({ length: redeemers.len() }, (_, index) => ({
        redeemer_tag: "spend" as const,
        redeemer_index: Number(redeemers.get(index).index()),
        ex_units: exUnits(transaction),
      }));
    },
  };
  return { counter, evaluator };
};

const LARGE_EX_UNITS = { mem: 1_000_000, steps: 200_000_000 };
const SMALL_EX_UNITS = { mem: 1_000, steps: 1_000_000 };

// Small execution units for the collateral-free draft, large ones once the
// transaction carries collateral: the collateral sized from the draft's fee
// must grow for the final fee.
const growingExUnits = (tx: CML.Transaction) =>
  (tx.body().collateral_inputs()?.len() ?? 0) > 0
    ? LARGE_EX_UNITS
    : SMALL_EX_UNITS;

const collateralOutRefs = (signBuilder: TxSignBuilder) =>
  outRefs(signBuilder.toTransaction().body().collateral_inputs()).map(
    ({ txHash, outputIndex }) => `${txHash}#${outputIndex}`,
  );

describe("collateral top-up", () => {
  test("a top-up neither reselects inputs nor adds evaluations", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const wallet = fixture.lucid.wallet();
    const getUtxos = wallet.getUtxos.bind(wallet);
    let utxoCalls = 0;
    let collateralCalls = 0;
    wallet.getUtxos = async () => {
      utxoCalls++;
      return getUtxos();
    };
    wallet.getCollateral = async () => {
      collateralCalls++;
      return [];
    };

    // A setCollateral covering any fee needs no top-up.
    const covered = countingEvaluator(() => LARGE_EX_UNITS);
    await spend(fixture, {
      evaluator: covered.evaluator,
      setCollateral: 100_000_000n,
    });
    utxoCalls = 0;
    collateralCalls = 0;

    const toppedUp = countingEvaluator(() => LARGE_EX_UNITS);
    const signBuilder = await spend(fixture, {
      evaluator: toppedUp.evaluator,
    });
    expect(utxoCalls).toBe(1);
    expect(collateralCalls).toBe(1);
    expect(toppedUp.counter.calls).toBeLessThanOrEqual(
      covered.counter.calls + 1,
    );
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(5_000_000n);
  });

  test("a top-up shrinks the collateral return when the input covers it", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const { evaluator } = countingEvaluator(growingExUnits);
    const signBuilder = await spend(fixture, { evaluator });
    const body = signBuilder.toTransaction().body();
    expect(collateralOutRefs(signBuilder)).toHaveLength(1);
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(5_000_000n);
    expect(body.total_collateral()).toBe(required);
  });

  test("a top-up adds a collateral input when the selected ones cannot cover it", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const fiveAda = (await fixture.lucid.wallet().getUtxos()).find(
      (utxo) => utxo.assets.lovelace === 5_000_000n,
    )!;
    // Exactly the default collateral: used without a collateral return.
    fixture.lucid.wallet().getCollateral = async () => [fiveAda];
    const { evaluator } = countingEvaluator(growingExUnits);
    const signBuilder = await spend(fixture, { evaluator });
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral).toHaveLength(2);
    expect(collateral).toContain(`${fiveAda.txHash}#${fiveAda.outputIndex}`);
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(5_000_000n);
  });
});

// Pays each amount to the wallet as its own UTxO, returning those UTxOs.
const fundWallet = async (fixture: Fixture, amounts: bigint[]) => {
  let builder = fixture.lucid.newTx();
  for (const lovelace of amounts) {
    builder = builder.pay.ToAddress(fixture.address, { lovelace });
  }
  const signBuilder = await builder.complete();
  const txHash = await (
    await signBuilder.sign.withWallet().complete()
  ).submit();
  await fixture.lucid.awaitTx(txHash);
  return (await fixture.lucid.wallet().getUtxos())
    .filter((utxo) => utxo.txHash === txHash)
    .filter((utxo) => amounts.includes(utxo.assets.lovelace));
};

const outRefKeys = (utxos: UTxO[]) =>
  utxos.map(({ txHash, outputIndex }) => `${txHash}#${outputIndex}`);

describe("collateral input limits", () => {
  test("a top-up that would exceed maxCollateralInputs replays once with fresh collateral", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const small = await fundWallet(fixture, [
      2_000_000n,
      2_000_000n,
      2_000_000n,
    ]);
    const wallet = fixture.lucid.wallet();
    const getUtxos = wallet.getUtxos.bind(wallet);
    let utxoCalls = 0;
    wallet.getUtxos = async () => {
      utxoCalls++;
      return getUtxos();
    };
    // Three small candidates make the initial collateral, at the cap of 3.
    wallet.getCollateral = async () => small;
    const { evaluator } = countingEvaluator(growingExUnits);
    const signBuilder = await spend(fixture, { evaluator });
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral).toHaveLength(1);
    expect(outRefKeys(small)).not.toContain(collateral[0]);
    // The replay reuses the wallet's UTxOs.
    expect(utxoCalls).toBe(1);
    const required = await expectLedgerCollateral(fixture, signBuilder);
    expect(required).toBeGreaterThan(6_000_000n);
  });

  test("a delayed completion replays once with fresh collateral", async () => {
    const fixture = await setup(alwaysSucceedV3Script);
    const small = await fundWallet(fixture, [
      2_000_000n,
      2_000_000n,
      2_000_000n,
    ]);
    fixture.lucid.wallet().getCollateral = async () => small;
    const { evaluator } = countingEvaluator(growingExUnits);
    const signBuilder = await fixture.lucid
      .newTx()
      .collectFrom([fixture.input], (context) =>
        Data.to(context.inputIndex(fixture.input)!),
      )
      .attach.SpendingValidator(fixture.script)
      .pay.ToAddress(fixture.address, { lovelace: 10_000_000n })
      .complete({ evaluator });
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral).toHaveLength(1);
    expect(outRefKeys(small)).not.toContain(collateral[0]);
    await expectLedgerCollateral(fixture, signBuilder);
  });

  test("a top-up past a cap of one input replays with a single larger input", async () => {
    const fixture = await setup(alwaysSucceedV3Script, {
      ...EXPENSIVE_PRICES,
      maxCollateralInputs: 1,
    });
    const fiveAda = (await fixture.lucid.wallet().getUtxos()).find(
      (utxo) => utxo.assets.lovelace === 5_000_000n,
    )!;
    // Exactly the default collateral, so a top-up needs a second input.
    fixture.lucid.wallet().getCollateral = async () => [fiveAda];
    const { evaluator } = countingEvaluator(growingExUnits);
    const signBuilder = await spend(fixture, { evaluator });
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral).toHaveLength(1);
    expect(collateral).not.toContain(
      `${fiveAda.txHash}#${fiveAda.outputIndex}`,
    );
    await expectLedgerCollateral(fixture, signBuilder);
  });

  test("fails clearly when the replay cannot cover the collateral either", async () => {
    const fixture = await setup(alwaysSucceedV3Script, {
      ...EXPENSIVE_PRICES,
      maxCollateralInputs: 1,
    });
    const smallUTxOs = (await fixture.lucid.wallet().getUtxos()).filter(
      (utxo) => utxo.assets.lovelace < 10_000_000n,
    );
    const fiveAda = smallUTxOs.find(
      (utxo) => utxo.assets.lovelace === 5_000_000n,
    )!;
    let collateralCalls = 0;
    fixture.lucid.wallet().getCollateral = async () => {
      collateralCalls++;
      return [fiveAda];
    };
    const { evaluator } = countingEvaluator(growingExUnits);
    // The script input pays for the transaction; no wallet UTxO covers the
    // final collateral on its own.
    await expect(
      spend(fixture, { evaluator, presetWalletInputs: smallUTxOs }),
    ).rejects.toThrow(
      /not have enough funds to cover the required \d+ Lovelace collateral/,
    );
    expect(collateralCalls).toBe(1);
  });

  test("initial collateral selection uses maxCollateralInputs below 3", async () => {
    const fixture = await setup(alwaysSucceedV3Script, {
      ...PROTOCOL_PARAMETERS_DEFAULT,
      maxCollateralInputs: 1,
    });
    const small = await fundWallet(fixture, [
      2_000_000n,
      2_000_000n,
      2_000_000n,
    ]);
    // Covering 5 ADA from these takes three inputs, more than allowed.
    fixture.lucid.wallet().getCollateral = async () => small;
    const signBuilder = await spend(fixture);
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral).toHaveLength(1);
    expect(outRefKeys(small)).not.toContain(collateral[0]);
    await expectLedgerCollateral(fixture, signBuilder);
  });

  test("initial collateral selection uses maxCollateralInputs above 3", async () => {
    const fixture = await setup(alwaysSucceedV3Script, {
      ...PROTOCOL_PARAMETERS_DEFAULT,
      maxCollateralInputs: 4,
    });
    const amounts = [1_600_000n, 1_600_000n, 1_600_000n, 1_600_000n];
    const small = await fundWallet(fixture, amounts);
    // Covering 5 ADA from the wallet's candidates takes four inputs.
    fixture.lucid.wallet().getCollateral = async () => small;
    const signBuilder = await spend(fixture);
    const collateral = collateralOutRefs(signBuilder);
    expect(collateral.sort()).toEqual(outRefKeys(small).sort());
    await expectLedgerCollateral(fixture, signBuilder);
  });
});
