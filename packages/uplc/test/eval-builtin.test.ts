import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import * as speed from "../src/speed/node/uplc_tx.js";
import * as size from "../src/size/node/uplc_tx.js";

// Applications of every builtin, at least one that returns a value and one
// that fails, with the outcome and cost the machine gives for them under
// Plutus' default Plutus V3 cost model. The crate's own tests check each one
// against the value expected of it and against the machine, and that this file
// is current (packages/uplc/rust/src/builtin/tests.rs).
const cases: {
  name: string;
  tag: number;
  protocol: number;
  args: string[];
  argKinds: number[];
  argBytes: string[];
  ok: boolean;
  errorKind: number;
  resultKind: number;
  result: string;
  cpu: number;
  mem: number;
}[] = JSON.parse(
  readFileSync(new URL("./fixtures/builtins.json", import.meta.url), "utf8"),
);

const hex = (bytes: string) => Uint8Array.from(Buffer.from(bytes, "hex"));

const VAN_ROSSEM = 11;
const FLAT = 0;
const G1 = 1;
const G2 = 2;
const G1_LIST = 3;

// The compressed BLS12-381 G1 and G2 generators.
const G1_GENERATOR = hex(
  "97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb",
);
const G2_GENERATOR = hex(
  "93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8",
);

const ADD_INTEGER = 0;
const IF_THEN_ELSE = 26;
const HEAD_LIST = 33;
const TAIL_LIST = 34;
const G1_NEG = 55;
const G2_NEG = 62;

// (program 1.1.0 (con integer 1)), (program 1.1.0 (con bool True)) and
// (program 1.1.0 (lam x x)), flat-encoded.
const ONE = hex(
  cases.find(({ args }) => args[0] === "(con integer 1)")!.argBytes[0],
);
const TRUE = hex(
  cases.find(({ args }) => args[0] === "(con bool True)")!.argBytes[0],
);
const IDENTITY = hex("010100200101");

for (const [build, uplc] of Object.entries({ speed, size })) {
  describe(`${build} build: eval_builtin_raw`, () => {
    test.each(cases)(
      "$name",
      ({ tag, protocol, argKinds, argBytes, ...expected }) => {
        const result = uplc.eval_builtin_raw(
          tag,
          argBytes.map(hex),
          Uint8Array.from(argKinds),
          protocol,
        );

        expect({
          ok: result.ok,
          errorKind: result.error_kind,
          resultKind: result.result_kind,
          result: Buffer.from(result.result).toString("hex"),
          cpu: Number(result.cpu),
          mem: Number(result.mem),
          explained: result.error !== "",
        }).toEqual({
          ok: expected.ok,
          errorKind: expected.errorKind,
          resultKind: expected.resultKind,
          result: expected.result,
          cpu: expected.cpu,
          mem: expected.mem,
          explained: !expected.ok,
        });
      },
    );

    test("passes BLS12-381 points as their compressed bytes", () => {
      for (const [neg, point, kind] of [
        [G1_NEG, G1_GENERATOR, G1],
        [G2_NEG, G2_GENERATOR, G2],
      ] as const) {
        const once = uplc.eval_builtin_raw(
          neg,
          [point],
          Uint8Array.of(kind),
          VAN_ROSSEM,
        );
        expect(once.result_kind).toBe(kind);
        expect(once.result).not.toEqual(point);

        const twice = uplc.eval_builtin_raw(
          neg,
          [once.result],
          Uint8Array.of(kind),
          VAN_ROSSEM,
        );
        expect(twice.result_kind).toBe(kind);
        expect(twice.result).toEqual(point);
      }

      const list = Uint8Array.from([...G1_GENERATOR, ...G1_GENERATOR]);
      const head = uplc.eval_builtin_raw(
        HEAD_LIST,
        [list],
        Uint8Array.of(G1_LIST),
        VAN_ROSSEM,
      );
      expect([head.result_kind, head.result]).toEqual([G1, G1_GENERATOR]);

      const tail = uplc.eval_builtin_raw(
        TAIL_LIST,
        [list],
        Uint8Array.of(G1_LIST),
        VAN_ROSSEM,
      );
      expect([tail.result_kind, tail.result]).toEqual([G1_LIST, G1_GENERATOR]);
    });

    test("rejects malformed or unsupported inputs", () => {
      const eval_ =
        (
          tag: number,
          args: Uint8Array[],
          kinds: number[],
          protocol = VAN_ROSSEM,
        ) =>
        () =>
          uplc.eval_builtin_raw(tag, args, Uint8Array.from(kinds), protocol);

      expect(eval_(ADD_INTEGER, [ONE, ONE], [FLAT, FLAT])).not.toThrow();

      // Unknown builtins, and the Miller-loop ones.
      expect(eval_(101, [], [])).toThrow("Unknown builtin tag 101");
      for (const tag of [68, 69, 70]) {
        expect(eval_(tag, [], [])).toThrow("not supported");
      }

      // Wrong arity, or kinds that do not match the arguments.
      expect(eval_(ADD_INTEGER, [ONE], [FLAT])).toThrow(
        "addInteger takes 2 arguments but got 1",
      );
      expect(eval_(ADD_INTEGER, [ONE, ONE], [FLAT])).toThrow();
      expect(eval_(ADD_INTEGER, [ONE, ONE], [FLAT, 5])).toThrow(
        "Unknown argument kind 5",
      );

      // Protocol versions without Plutus V3, or beyond the latest.
      expect(eval_(ADD_INTEGER, [ONE, ONE], [FLAT, FLAT], 8)).toThrow(
        "Unsupported protocol major version",
      );
      expect(eval_(ADD_INTEGER, [ONE, ONE], [FLAT, FLAT], 13)).toThrow(
        "Unsupported protocol major version",
      );

      // Arguments that do not decode, or are not constants.
      expect(eval_(ADD_INTEGER, [ONE, ONE.slice(0, 1)], [FLAT, FLAT])).toThrow(
        "Invalid flat program",
      );
      expect(
        eval_(IF_THEN_ELSE, [TRUE, IDENTITY, ONE], [FLAT, FLAT, FLAT]),
      ).toThrow("The program is not a constant");

      // Invalid compressed points.
      expect(eval_(G1_NEG, [new Uint8Array(48)], [G1])).toThrow(
        "Invalid compressed point",
      );
      expect(eval_(G2_NEG, [G1_GENERATOR], [G2])).toThrow(
        "Invalid compressed point",
      );
      expect(eval_(HEAD_LIST, [G1_GENERATOR.slice(1)], [G1_LIST])).toThrow(
        "not a multiple of 48",
      );
    });
  });
}
