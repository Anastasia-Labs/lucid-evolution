import { beforeEach, describe, expect, test, vi } from "vitest";
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
  Script,
  UTxO,
  validatorToAddress,
} from "../src/index.js";
import {
  alwaysSucceedV3Script,
  feeThresholdV3Script,
} from "./fixtures/scripts.js";

// Records every real call to the wasm evaluator, without changing results.
type Evaluation = { key: string; tx: string; redeemers: string[] };
const evaluations = vi.hoisted(() => [] as Evaluation[]);

vi.mock("@lucid-evolution/uplc", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@lucid-evolution/uplc")>();
  const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString("hex");
  const key = (value: unknown): unknown =>
    value instanceof Uint8Array
      ? hex(value)
      : Array.isArray(value)
        ? value.map(key)
        : String(value);
  return {
    ...actual,
    eval_phase_two_raw: (
      ...args: Parameters<typeof actual.eval_phase_two_raw>
    ) => {
      const result = actual.eval_phase_two_raw(...args);
      evaluations.push({
        key: JSON.stringify(args.map(key)),
        tx: hex(args[0]),
        redeemers: result.map(hex),
      });
      return result;
    },
  };
});

beforeEach(() => {
  evaluations.length = 0;
});

const recordEvaluations = async <T>(
  run: () => Promise<T>,
): Promise<{ result: T; evaluations: Evaluation[] }> => {
  const start = evaluations.length;
  const result = await run();
  return { result, evaluations: evaluations.slice(start) };
};

const bodyWithoutScriptDataHash = (tx: CML.Transaction): string => {
  const body = JSON.parse(tx.body().to_json());
  delete body.script_data_hash;
  return JSON.stringify(body);
};

const redeemerJson = (redeemers: CML.Redeemers): unknown[] => {
  const flat = redeemers.to_flat_format();
  return Array.from({ length: flat.len() }, (_, index) =>
    JSON.parse(flat.get(index).to_json()),
  );
};

const totalSteps = (evaluation: Evaluation): bigint =>
  evaluation.redeemers.reduce(
    (total, hex) =>
      total + CML.LegacyRedeemer.from_cbor_hex(hex).ex_units().steps(),
    0n,
  );

const evaluatedFee = (evaluation: Evaluation): bigint =>
  CML.Transaction.from_cbor_hex(evaluation.tx).body().fee();

// The completed transaction must carry exactly the ex-units an evaluation of
// its own body returned, and enough collateral for its fee.
const expectFinalEvaluated = (
  tx: CML.Transaction,
  recorded: Evaluation[],
): void => {
  const body = bodyWithoutScriptDataHash(tx);
  const match = recorded
    .filter(
      (evaluation) =>
        bodyWithoutScriptDataHash(
          CML.Transaction.from_cbor_hex(evaluation.tx),
        ) === body,
    )
    .at(-1);
  expect(match).toBeDefined();
  expect(
    match!.redeemers.map((hex) =>
      JSON.parse(CML.LegacyRedeemer.from_cbor_hex(hex).to_json()),
    ),
  ).toEqual(redeemerJson(tx.witness_set().redeemers()!));
  const required =
    (tx.body().fee() *
      BigInt(PROTOCOL_PARAMETERS_DEFAULT.collateralPercentage) +
      99n) /
    100n;
  expect(tx.body().total_collateral()!).toBeGreaterThanOrEqual(required);
};

const setup = async (script: Script = alwaysSucceedV3Script) => {
  const account = generateEmulatorAccount({ lovelace: 1_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);
  const address = await lucid.wallet().address();
  const scriptAddress = validatorToAddress("Custom", script);
  const funded = await lucid
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 20_000_000n },
    )
    .pay.ToAddress(address, { lovelace: 6_000_000n })
    .pay.ToAddress(address, { lovelace: 9_000_000n })
    .complete();
  await lucid.awaitTx(
    await (await funded.sign.withWallet().complete()).submit(),
  );
  const [input] = await lucid.utxosAt(scriptAddress);
  return { account, emulator, lucid, address, script, input };
};

type Fixture = Awaited<ReturnType<typeof setup>>;

// Spends the script UTxO, paying `amount` to the wallet. With
// coinSelection: false the script input alone funds the payment and fee.
const spend = (
  fixture: Fixture,
  options: Parameters<ReturnType<LucidEvolution["newTx"]>["complete"]>[0],
  amount = 10_000_000n,
  lucid = fixture.lucid,
) =>
  lucid
    .newTx()
    .collectFrom([fixture.input], Data.void())
    .attach.SpendingValidator(fixture.script)
    .pay.ToAddress(fixture.address, { lovelace: amount })
    .complete(options);

const spendDelayed = (fixture: Fixture, lucid = fixture.lucid) =>
  lucid
    .newTx()
    .collectFrom([fixture.input], (context) =>
      Data.to(context.inputIndex(fixture.input)!),
    )
    .attach.SpendingValidator(fixture.script)
    .pay.ToAddress(fixture.address, { lovelace: 10_000_000n })
    .complete();

const recordingEvaluator = (
  fixture: Fixture,
  recorded: string[],
): EvaluatorAdapter => ({
  name: "recording",
  evaluate: async ({ tx, additionalUTxOs }) => {
    recorded.push(tx);
    return fixture.emulator.evaluateTx(tx, additionalUTxOs as UTxO[]);
  },
});

describe("default evaluator reuse within one completion", () => {
  test("a delayed-redeemer completion evaluates each distinct request once", async () => {
    const fixture = await setup();
    const first = await recordEvaluations(() => spendDelayed(fixture));
    expect(first.evaluations.length).toBeGreaterThan(0);
    const keys = first.evaluations.map((evaluation) => evaluation.key);
    expect(new Set(keys).size).toBe(keys.length);
    expectFinalEvaluated(first.result.toTransaction(), first.evaluations);

    // Separate completions do not share results.
    const second = await recordEvaluations(() => spendDelayed(fixture));
    expect(second.evaluations.map((evaluation) => evaluation.key)).toEqual(
      keys,
    );
    expect(second.result.toCBOR()).toBe(first.result.toCBOR());

    await fixture.lucid.awaitTx(
      await (await first.result.sign.withWallet().complete()).submit(),
    );
  });

  test("custom evaluators still receive every request", async () => {
    const fixture = await setup();
    const fromOptions: string[] = [];
    await recordEvaluations(() =>
      fixture.lucid
        .newTx()
        .collectFrom([fixture.input], (context) =>
          Data.to(context.inputIndex(fixture.input)!),
        )
        .attach.SpendingValidator(fixture.script)
        .pay.ToAddress(fixture.address, { lovelace: 10_000_000n })
        .complete({ evaluator: recordingEvaluator(fixture, fromOptions) }),
    );
    const configured: string[] = [];
    const configuredLucid = await Lucid(fixture.emulator, "Custom", {
      evaluator: recordingEvaluator(fixture, configured),
    });
    configuredLucid.selectWallet.fromSeed(fixture.account.seedPhrase);
    const { evaluations: wasm } = await recordEvaluations(() =>
      spendDelayed(fixture, configuredLucid),
    );

    expect(wasm).toHaveLength(0);
    // The delayed fixed point repeats its final request; a custom evaluator
    // is asked again rather than served a remembered result.
    for (const recorded of [fromOptions, configured]) {
      expect(recorded.length).toBeGreaterThan(new Set(recorded).size);
    }
  });
});

describe("static completion with coinSelection: false", () => {
  test("evaluates the collateral-free draft once and the final transaction to a fixed point", async () => {
    const fixture = await setup();
    const { result, evaluations: recorded } = await recordEvaluations(() =>
      spend(fixture, { coinSelection: false }),
    );
    expect(recorded).toHaveLength(2);
    expectFinalEvaluated(result.toTransaction(), recorded);
    await fixture.lucid.awaitTx(
      await (await result.sign.withWallet().complete()).submit(),
    );
  });

  test("automatic coin selection evaluates each distinct request once", async () => {
    const fixture = await setup();
    const { result, evaluations: recorded } = await recordEvaluations(() =>
      spend(fixture, { coinSelection: true }),
    );
    const keys = recorded.map((evaluation) => evaluation.key);
    expect(new Set(keys).size).toBe(keys.length);
    expectFinalEvaluated(result.toTransaction(), recorded);
  });

  test("an unfunded payment is still refused", async () => {
    const fixture = await setup();
    await expect(
      spend(fixture, { coinSelection: false }, 20_000_000n),
    ).rejects.toThrow(/insufficient|enough|balance|negative/i);
  });

  test("collateral below the final fee's requirement is refused", async () => {
    const fixture = await setup();
    await expect(
      spend(fixture, { coinSelection: false, setCollateral: 0n }),
    ).rejects.toThrow(
      /Final transaction requires \d+ Lovelace collateral, but only \d+ was selected/,
    );
  });

  test("a script whose cost depends on the fee is evaluated in its final context", async () => {
    const withThreshold = (threshold: bigint): Script => ({
      type: "PlutusV3",
      script: applyParamsToScript(feeThresholdV3Script.script, [threshold]),
    });

    // Below the threshold for any fee: find the provisional and final fees.
    const probe = await setup(withThreshold(100_000_000n));
    const probed = await recordEvaluations(() =>
      spend(probe, { coinSelection: false }),
    );
    const provisionalFee = evaluatedFee(probed.evaluations[0]);
    const finalFee = probed.result.toTransaction().body().fee();
    expect(finalFee).toBeGreaterThan(provisionalFee);

    // A threshold between the two: the provisional draft takes the cheap
    // branch and the final transaction the expensive one.
    const threshold = (provisionalFee + finalFee) / 2n;
    const fixture = await setup(withThreshold(threshold));
    const { result, evaluations: recorded } = await recordEvaluations(() =>
      spend(fixture, { coinSelection: false, setCollateral: 1_000_000n }),
    );
    expect(recorded.length).toBeGreaterThanOrEqual(3);
    expect(totalSteps(recorded.at(-1)!)).toBeGreaterThan(
      totalSteps(recorded[0]),
    );
    expectFinalEvaluated(result.toTransaction(), recorded);
    await expect(
      spend(fixture, { coinSelection: false, setCollateral: 0n }),
    ).rejects.toThrow(/Final transaction requires \d+ Lovelace collateral/);

    await fixture.lucid.awaitTx(
      await (await result.sign.withWallet().complete()).submit(),
    );
  });
});
