import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import * as speed from "../src/speed/node/uplc_tx.js";
import * as size from "../src/size/node/uplc_tx.js";

const fixture = (name: string) =>
  JSON.parse(
    readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8"),
  );

// The Plutus V3 cost model parameters of plutus-core 1.71 (plutus 1b03c165),
// which the costs in programs.json were computed with.
const costModel = BigInt64Array.from(
  fixture("plutus-v3-cost-model.json").map(BigInt),
);

// Programs applied to CBOR Data arguments, with their outcome and cost under
// Plutus V3 and protocol version 11 as given by the Haskell evaluator
// (`uplc evaluate -S E -t`, plutus 1b03c165): the bounds builtins put on their
// arguments, and their arguments unlifted before the builtin is costed.
const programs: {
  name: string;
  flat: string;
  args: string[];
  errorKind: number;
  cpu: number;
  mem: number;
}[] = fixture("programs.json");

const PLUTUS_V3 = 3;
const VAN_ROSSEM = 11;
const BUDGET = { cpu: 10_000_000_000n, mem: 14_000_000n };

for (const [build, uplc] of Object.entries({ speed, size })) {
  describe(`${build} build`, () => {
    test("reports how it was built", () => {
      const info = JSON.parse(uplc.uplc_build_info());

      expect(info.selfTest).toBe("pass");
      expect(info.protocolMajorVersion).toBe(VAN_ROSSEM);
      expect(info.costModelLengths.PlutusV3).toBe(costModel.length);
    });

    test.each(programs)("$name", ({ flat, args, errorKind, cpu, mem }) => {
      const result = uplc.eval_program_raw(
        Buffer.from(flat, "hex"),
        args.map((arg) => Buffer.from(arg, "hex")),
        PLUTUS_V3,
        VAN_ROSSEM,
        costModel,
        BUDGET.cpu,
        BUDGET.mem,
        // Budget like the ledger and the Haskell evaluator, which never charge
        // the steps a failing program took since the budget was last checked.
        false,
      );

      expect({
        ok: result.ok,
        errorKind: result.error_kind,
        cpu: Number(result.cpu),
        mem: Number(result.mem),
      }).toEqual({ ok: errorKind === 0, errorKind, cpu, mem });
    });

    test("stops a program that goes over budget", () => {
      const { flat, args } = programs.find(
        ({ name }) => name === "expMod 2^8191-1",
      )!;
      const result = uplc.eval_program_raw(
        Buffer.from(flat, "hex"),
        args.map((arg) => Buffer.from(arg, "hex")),
        PLUTUS_V3,
        VAN_ROSSEM,
        costModel,
        1_000_000n,
        BUDGET.mem,
        true,
      );

      expect(result.ok).toBe(false);
      expect(result.error_kind).toBe(1);
    });

    test("rejects an unknown Plutus version", () => {
      expect(() =>
        uplc.eval_program_raw(
          Buffer.from(programs[0].flat, "hex"),
          [],
          4,
          VAN_ROSSEM,
          costModel,
          BUDGET.cpu,
          BUDGET.mem,
          true,
        ),
      ).toThrow("Unsupported Plutus version 4");
    });
  });
}
