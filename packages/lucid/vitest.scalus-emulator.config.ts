// Runs Lucid's and the provider's Emulator tests against ScalusEmulator.
// Run `pnpm build` first: the shims and the tests import the dist of
// @lucid-evolution/scalus-uplc and @lucid-evolution/provider.
import { defineConfig } from "vitest/config";
import wasm from "vite-plugin-wasm";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Vite ids use forward slashes on every platform; Windows paths do not.
const slashes = (path: string) => path.replace(/\\/g, "/");

const packages = slashes(fileURLToPath(new URL("..", import.meta.url)));
const shims = `${packages}lucid/test/scalus-emulator-shim/`;

/**
 * Routes `find` to a shim, for imports from the tests of a package only:
 * `shimOf` maps the package to the shim file.
 */
const shim = (find: RegExp, shimOf: Record<string, string>) => ({
  find,
  replacement: "$&",
  customResolver: (_: string, importer?: string) => {
    const from = importer && slashes(importer);
    if (!from || from.startsWith(shims)) return null;
    const testDir = Object.keys(shimOf).find((dir) =>
      from.startsWith(`${packages}${dir}/test/`),
    );
    return testDir ? `${shims}${shimOf[testDir]}` : null;
  },
});

/**
 * Tests that cannot run on ScalusEmulator, by the name the JSON reporter
 * gives them, with the reason. The README of @lucid-evolution/scalus-uplc
 * lists them in its divergence tables.
 */
const excludedTests: Record<string, string> = {
  // API surface: Lucid Emulator internals.
  "TxSignBuilder ScriptContexts match serialized ledger ScriptContexts for complex transactions":
    "reads emulator.chain",
  "Emulator should register and then deregister stake address":
    "reads emulator.chain",
  "Emulator should register script stake address with redeemer":
    "reads emulator.chain",
  "BuildTxWithRedeemer emulator integration builds a complex transaction from the final canonical context":
    "reads emulator.chain",
  "Emulator Get Reward Account distinguishes registration state":
    "writes emulator.chain",
  "Emulator submit tx": "replaces emulator.ledger",

  // Ledger rules.
  "Emulator should successfully delegate to stake pool":
    "StakeCertificates: delegates to an unregistered pool; also reads emulator.chain",
  "Emulator should successfully register, delegate, receive rewards, and withdraw them":
    "StakeCertificates: delegates to an unregistered pool; also reads emulator.chain",
  "Emulator should successfully register, delegate, receive rewards, and withdraw 0 rewards":
    "StakeCertificates: delegates to an unregistered pool, which fails before the withdrawal this test expects to fail",
  "Emulator should successfully register and retire stake pool":
    "ValueNotConserved: Lucid's retirement refunds the pool deposit in the transaction",
  // The parity tests run both sides on ScalusEmulator here: the shim's Lucid
  // gives the "Aiken" side `emulator.evaluator` too.
  "emulator evaluator parity delegate to stake pool has the same outcome with Aiken and Scalus evaluators":
    "StakeCertificates: delegates to an unregistered pool",
  "emulator evaluator parity register, delegate, receive rewards, and withdraw them has the same outcome with Aiken and Scalus evaluators":
    "StakeCertificates: delegates to an unregistered pool",
  "emulator evaluator parity register, delegate, receive rewards, and withdraw 0 rewards has the same outcome with Aiken and Scalus evaluators":
    "StakeCertificates: delegates to an unregistered pool",
  "emulator evaluator parity register and retire stake pool has the same outcome with Aiken and Scalus evaluators":
    "ValueNotConserved: Lucid's retirement refunds the pool deposit in the transaction",
  "coin selection counts deposits pays the 'registration and pool delegation' deposit from a wallet of 1.5 ADA UTxOs":
    "StakeCertificates: delegates to an unregistered pool",
  // vitest cuts a value in a test.each name to 40 characters.
  "coin selection counts deposits pays the 'registration with pool and vote deleg…' deposit from a wallet of 1.5 ADA UTxOs":
    "StakeCertificates: delegates to an unregistered pool",
  "coin selection counts refunds and withdrawals as inputs a reward withdrawal pays toward the outputs":
    "StakeCertificates: delegates to an unregistered pool",
  "Emulator collateral checks accepts collateral covering the fee exactly":
    "InvalidScriptDataHash: the transaction has no script data hash",
  "Emulator collateral checks accepts a collateral return that leaves enough collateral":
    "InvalidScriptDataHash: the transaction has no script data hash",
  "Emulator collateral checks rejects more collateral inputs than maxCollateralInputs":
    "InvalidScriptDataHash: the transaction has no script data hash",
  "Emulator reference inputs overlapping inputs protocol version 11 accepts the overlap when no PlutusV3 script runs":
    "Datums: spends a PlutusV2 output that has no datum",
  "Emulator reference inputs overlapping inputs protocol version 11 rejects the overlap when a PlutusV3 script runs":
    "InvalidScriptDataHash: the transaction has no script data hash",
  "Emulator reference inputs overlapping inputs protocol version 11 accepts a PlutusV3 script with disjoint reference inputs":
    "InvalidScriptDataHash: the transaction has no script data hash",
  "Emulator reference inputs overlapping inputs an unset protocol version follows the current mainnet rule":
    "InvalidScriptDataHash: the transaction has no script data hash",

  // Other: neither of the two above.
  "Emulator collateral checks rejects a script transaction without collateral":
    "same rule, Scalus names it FeesOk",
  "Emulator collateral checks rejects collateral below collateralPercentage of the fee":
    "same rule, Scalus names it FeesOk",
  "Emulator collateral checks rejects a collateral return that leaves too little collateral":
    "same rule, Scalus names it FeesOk",
  "Emulator collateral checks rejects a total collateral that differs from the balance":
    "same rule, Scalus names it FeesOk",
  "Emulator collateral checks rejects collateral that keeps native assets":
    "same rule, Scalus names it FeesOk",
  "Emulator collateral checks rejects a collateral return below its minimum ADA":
    "same rule, Scalus names it OutputsHaveNotEnoughCoins",
  "Emulator native reference scripts rejects a spend whose signer does not satisfy the reference script":
    "same rule, Scalus names it ScriptFailure",
  "Emulator native scripts from script references rejects a reference native script whose signer did not sign":
    "same rule, Scalus names it ScriptFailure",
  "Emulator reference inputs overlapping inputs protocol version 9 rejects the overlap":
    "same rule, Scalus names it NonDisjointInputsAndReferenceInputs",
  "Emulator reference inputs overlapping inputs protocol version 10 rejects the overlap":
    "same rule, Scalus names it NonDisjointInputsAndReferenceInputs",
  "Emulator reference inputs overlapping inputs protocol version 8 accepts the overlap":
    "Scalus rejects the overlap at protocol version 8, where the ledger allows it",
  "Treasury donation builds and submits a treasury donation transaction":
    "the donation reaches the treasury at the next epoch boundary, not at once",
  "Emulator Get Protocol Parameters":
    "getProtocolParameters adds protocolMajorVersion 11",
  "Emulator evaluate tx":
    "Scalus and Aiken cost the sample differently under the stale default cost models",
  "default evaluator reuse within one completion a delayed-redeemer completion evaluates each distinct request once":
    "spies on the Aiken evaluator, which the Scalus suite replaces with the emulator's evaluator",
  "static script spend evaluates the collateral-free draft once and the final transaction to a fixed point":
    "spies on the Aiken evaluator, which the Scalus suite replaces with the emulator's evaluator",
  "static script spend automatic coin selection evaluates the draft once and the final transaction once":
    "spies on the Aiken evaluator, which the Scalus suite replaces with the emulator's evaluator",
  "static script spend automatic coin selection evaluates a fee-dependent script in its final context":
    "spies on the Aiken evaluator, which the Scalus suite replaces with the emulator's evaluator",
  "static script spend a script whose cost depends on the fee is evaluated in its final context":
    "spies on the Aiken evaluator, which the Scalus suite replaces with the emulator's evaluator",
};

/** Test files that run Lucid's Emulator but not on ScalusEmulator, with the reason. */
const excludedFiles: Record<string, string> = {
  "provider/test/emulator-ledger-compat.test.ts":
    "tests the Lucid Emulator's internals",
  "provider/test/emulator-ledger-index.test.ts":
    "tests the Lucid Emulator's internals",
};

/** The `.test.ts` files under `dir`, relative to `packages`. */
const testFiles = (dir: string): string[] =>
  readdirSync(`${packages}${dir}`, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? testFiles(`${dir}/${entry.name}`)
      : entry.name.endsWith(".test.ts")
        ? [`${dir}/${entry.name}`]
        : [],
  );

/**
 * Every test file of Lucid and the provider that constructs an Emulator,
 * directly or through the Effect service of lucid/test/emulator, so that a
 * new one runs here unless `excludedFiles` gives a reason.
 */
const emulatorTests = ["lucid/test", "provider/test"]
  .flatMap(testFiles)
  .filter((path) =>
    /\bnew Emulator\(|\bEmulatorInstance\b/.test(
      readFileSync(`${packages}${path}`, "utf8"),
    ),
  );
for (const path of Object.keys(excludedFiles))
  if (!emulatorTests.includes(path))
    throw new Error(`excludedFiles lists ${path}, which runs no Emulator.`);

const escape = (name: string) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default defineConfig({
  root: packages,
  // @ts-ignore
  plugins: [wasm()],
  resolve: {
    alias: [
      shim(/^@lucid-evolution\/provider$/, { lucid: "provider.ts" }),
      shim(/^(\.\.\/)+src(\/index(\.js)?)?$/, {
        lucid: "lucid.ts",
        provider: "provider.ts",
      }),
    ],
  },
  test: {
    pool: "forks",
    reporters: "verbose",
    // Fails every test file when an alias above misses.
    setupFiles: ["lucid/test/scalus-emulator-setup.ts"],
    include: emulatorTests.filter((path) => !(path in excludedFiles)),
    testNamePattern: new RegExp(
      `^(?!(${Object.keys(excludedTests).map(escape).join("|")})$)`,
    ),
    testTimeout: 420_000,
  },
});
