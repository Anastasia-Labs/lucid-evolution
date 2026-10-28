import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import * as speed from "../src/speed/node.js";
import * as size from "../src/size/node.js";

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
// Plutus V3 and protocol version 11, or the protocol version a program gives,
// as given by the Haskell evaluator (plutus 1b03c165): the bounds builtins put
// on their arguments, their arguments unlifted before the builtin is costed,
// and Data handled as Plutus handles it.
const programs: {
  name: string;
  flat: string;
  args: string[];
  protocol?: number;
  errorKind: number;
  cpu: number;
  mem: number;
}[] = fixture("programs.json");

// Deeply nested Data in each shape, as given and in the encoding the Cardano
// node uses, nested `depth` times around a leaf.
const DEPTH = 100_000;
const deepData = [
  ["constr", "d87981", "00", "", "d8799f", "ff"],
  ["general constr", "d86682188081", "00", "", "d8669f18809f", "ffff"],
  ["list", "81", "00", "", "9f", "ff"],
  ["map value", "a100", "00", "", "bf00", "ff"],
  ["map key", "a1", "00", "00", "bf", "00ff"],
  ["bytes in list", "81", "4100", "", "9f", "ff"],
].flatMap(([name, prefix, leaf, suffix, nodePrefix, nodeSuffix]) =>
  [
    [prefix, suffix],
    [nodePrefix, nodeSuffix],
  ].map(([prefix, suffix]) => ({
    name,
    cbor: Buffer.from(
      prefix.repeat(DEPTH) + leaf + suffix.repeat(DEPTH),
      "hex",
    ),
  })),
);

// Compares its two arguments and serialises the first, which walks every node
// of both:
// (program 1.1.0 (lam a (lam b (force [(force (builtin ifThenElse))
//   [[(builtin equalsData) a] b]
//   (delay [(lam r (con unit ())) [(builtin serialiseData) a]])
//   (delay (error))]))))
const COMPARE_AND_SERIALISE = Buffer.from(
  "010100225333573466ebc0080044c92637660042c1",
  "hex",
);

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

    test.each(programs)(
      "$name",
      ({ flat, args, protocol, errorKind, cpu, mem }) => {
        const result = uplc.eval_program_raw(
          Buffer.from(flat, "hex"),
          args.map((arg) => Buffer.from(arg, "hex")),
          PLUTUS_V3,
          protocol ?? VAN_ROSSEM,
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
      },
    );

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

    test.each(deepData)(
      `evaluates $name Data nested ${DEPTH} deep`,
      ({ cbor }) => {
        const result = uplc.eval_program_raw(
          COMPARE_AND_SERIALISE,
          [cbor, cbor],
          PLUTUS_V3,
          VAN_ROSSEM,
          costModel,
          2n ** 62n,
          2n ** 62n,
          false,
        );

        expect(result.error_kind).toBe(0);

        // The evaluator still evaluates as before afterwards.
        const { flat, args, errorKind, cpu, mem } = programs[0];
        const next = uplc.eval_program_raw(
          Buffer.from(flat, "hex"),
          args.map((arg) => Buffer.from(arg, "hex")),
          PLUTUS_V3,
          VAN_ROSSEM,
          costModel,
          BUDGET.cpu,
          BUDGET.mem,
          false,
        );
        expect([next.error_kind, Number(next.cpu), Number(next.mem)]).toEqual([
          errorKind,
          cpu,
          mem,
        ]);
      },
    );

    test("decodes a general constr in a list up to its own break", () => {
      const compare = (a: string, b: string) =>
        uplc.eval_program_raw(
          COMPARE_AND_SERIALISE,
          [Buffer.from(a, "hex"), Buffer.from(b, "hex")],
          PLUTUS_V3,
          VAN_ROSSEM,
          costModel,
          BUDGET.cpu,
          BUDGET.mem,
          false,
        ).error_kind;

      // [Constr 128 [], 5], with the constructor in the indefinite and the
      // definite form: the 5 after the constructor stays in the list.
      expect(compare("9fd8669f188080ff05ff", "9fd8668218808005ff")).toBe(0);
      expect(compare("9fd8669f188080ff05ff", "9fd86682188080ff")).toBe(2);
      // {Constr 128 []: 5}: the 5 is the constructor's value.
      expect(compare("a1d8669f188080ff05", "a1d8668218808005")).toBe(0);
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
