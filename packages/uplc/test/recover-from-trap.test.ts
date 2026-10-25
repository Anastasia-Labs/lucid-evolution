import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import * as speed from "../src/speed/node.js";
import * as size from "../src/size/node.js";

const fixture = (name: string) =>
  JSON.parse(
    readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8"),
  );

const costModel = BigInt64Array.from(
  fixture("plutus-v3-cost-model.json").map(BigInt),
);
const builtins: { args: string[]; argBytes: string[] }[] =
  fixture("builtins.json");
const hex = (bytes: string) => Uint8Array.from(Buffer.from(bytes, "hex"));

// (program 1.1.0 (con integer 1)) and (program 1.1.0 (con bool True)),
// flat-encoded.
const ONE = hex(
  builtins.find(({ args }) => args[0] === "(con integer 1)")!.argBytes[0],
);
const TRUE = hex(
  builtins.find(({ args }) => args[0] === "(con bool True)")!.argBytes[0],
);
const ADD_INTEGER = 0;
const FLAT = 0;

// Compares its two arguments and serialises the first (see
// eval-program.test.ts).
const COMPARE_AND_SERIALISE = hex("010100225333573466ebc0080044c92637660042c1");
// (program 1.0.0 (lam x x)), as a CBOR-wrapped script.
const SCRIPT = hex("4e4d01000033222220051200120011");
// Parameters nested 100,001 lists deep: applying them exhausts the wasm stack.
const DEEP_PARAMETERS = hex("81".repeat(100_001) + "00");

for (const [build, uplc] of Object.entries({ speed, size })) {
  describe(`${build} build: recovering from a wasm trap`, () => {
    const evaluate = () =>
      uplc.eval_program_raw(
        COMPARE_AND_SERIALISE,
        [hex("00"), hex("00")],
        3,
        11,
        costModel,
        10_000_000_000n,
        14_000_000n,
        false,
      );
    const add = (a: Uint8Array, b: Uint8Array) =>
      uplc.eval_builtin_raw(ADD_INTEGER, [a, b], Uint8Array.of(FLAT, FLAT), 11);
    // The first call can exhaust the JavaScript stack instead, which leaves
    // the instance short of stack; the next one then traps.
    const trap = () => {
      for (let i = 0; i < 3; i++)
        expect(() =>
          uplc.apply_params_to_script(DEEP_PARAMETERS, SCRIPT),
        ).toThrow();
    };

    test("a shallow evaluation after a trap gets its verdict", () => {
      trap();

      const result = evaluate();
      expect({ ok: result.ok, error_kind: result.error_kind }).toEqual({
        ok: true,
        error_kind: 0,
      });
      expect(JSON.parse(uplc.uplc_build_info()).selfTest).toBe("pass");
    });

    test("a result from before a trap throws when read after recovery", () => {
      const before = evaluate();
      trap();
      const after = evaluate();

      expect(() => before.ok).toThrow("stale");
      expect(() => before.cpu).toThrow("stale");
      expect(after.ok).toBe(true);
    });

    test("freeing a result from before a trap leaves the current results alone", () => {
      const before = Array.from({ length: 16 }, () => add(ONE, ONE));
      trap();
      const rejected = Array.from({ length: 16 }, () => add(ONE, TRUE));
      const read = () =>
        rejected.map(({ ok, error_kind, error }) => ({
          ok,
          error_kind,
          error,
        }));
      const expected = read();

      for (const result of before) result.free();
      const later = Array.from({ length: 16 }, () => add(ONE, ONE));

      expect(read()).toEqual(expected);
      expect(later.every(({ ok }) => ok)).toBe(true);
    });

    test("collecting results from before a trap leaves the current results alone", async () => {
      let collected = 0;
      const registry = new FinalizationRegistry(() => collected++);
      // Results nothing refers to once this returns.
      (() => {
        for (let i = 0; i < 16; i++) registry.register(add(ONE, ONE), null);
      })();
      trap();
      const rejected = Array.from({ length: 16 }, () => add(ONE, TRUE));
      const read = () =>
        rejected.map(({ ok, error_kind, error }) => ({
          ok,
          error_kind,
          error,
        }));
      const expected = read();

      for (let i = 0; i < 50 && collected < 16; i++) {
        globalThis.gc!();
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      // The package's own finalizers ran in the same collections.
      await new Promise((resolve) => setTimeout(resolve, 10));
      const later = Array.from({ length: 16 }, () => add(ONE, ONE));

      expect(collected).toBe(16);
      expect(read()).toEqual(expected);
      expect(later.every(({ ok }) => ok)).toBe(true);
    });

    test("an error is rethrown unchanged", () => {
      let thrown: unknown;
      try {
        uplc.eval_builtin_raw(ADD_INTEGER, [ONE], hex(""), 11);
      } catch (error) {
        thrown = error;
      }

      expect(thrown).toBe("Got 1 arguments but 0 argument kinds");
    });
  });
}

test("ES module imports see every binding of the Node.js entries", () => {
  for (const build of ["speed", "size"]) {
    const entry = fileURLToPath(
      new URL(`../src/${build}/node.js`, import.meta.url),
    );
    const bindings = fileURLToPath(
      new URL(`../src/${build}/node/uplc_tx.js`, import.meta.url),
    );
    const names = (specifier: string) =>
      execFileSync(
        process.execPath,
        [
          "--input-type=module",
          "-e",
          `const m = await import(${JSON.stringify(specifier)}); console.log(JSON.stringify(Object.keys(m).filter((k) => k !== "default").sort()));`,
        ],
        { encoding: "utf8" },
      );

    expect(JSON.parse(names(entry))).toEqual(
      JSON.parse(names(bindings)).filter(
        (name: string) => name !== "__wbg_reset_state",
      ),
    );
  }
});
