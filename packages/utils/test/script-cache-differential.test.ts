import { describe, expect, test } from "vitest";
import { decode, encode } from "cbor-x";
import type { Script } from "@lucid-evolution/core-types";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { applyDoubleCborEncoding } from "../src/cbor.js";
import { CML } from "../src/core.js";
import { scriptFromNative } from "../src/native.js";
import { ScriptCache } from "../src/script-cache.js";
import {
  mintingPolicyToId,
  scriptCborBytes,
  toScriptRef,
  validatorToScriptHash,
} from "../src/scripts.js";

// The implementations before memoization, as reference oracles.
const referenceDoubleCborEncoding = (script: string) => {
  try {
    decode(decode(fromHex(script)));
    return script;
  } catch (error) {
    try {
      decode(fromHex(script));
      return toHex(Uint8Array.from(encode(fromHex(script).buffer)));
    } catch (error) {
      return toHex(Uint8Array.from(encode(encode(fromHex(script).buffer))));
    }
  }
};

const referenceScriptHash = ({ type, script }: Script): string => {
  switch (type) {
    case "Native":
      return CML.NativeScript.from_cbor_hex(script).hash().to_hex();
    case "PlutusV1":
      return CML.PlutusScript.from_v1(
        CML.PlutusV1Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      )
        .hash()
        .to_hex();
    case "PlutusV2":
      return CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      )
        .hash()
        .to_hex();
    case "PlutusV3":
      return CML.PlutusScript.from_v3(
        CML.PlutusV3Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      )
        .hash()
        .to_hex();
  }
};

const referenceScriptRef = ({ type, script }: Script): string => {
  switch (type) {
    case "Native":
      return CML.Script.new_native(
        CML.NativeScript.from_cbor_hex(script),
      ).to_cbor_hex();
    case "PlutusV1":
      return CML.Script.new_plutus_v1(
        CML.PlutusV1Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      ).to_cbor_hex();
    case "PlutusV2":
      return CML.Script.new_plutus_v2(
        CML.PlutusV2Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      ).to_cbor_hex();
    case "PlutusV3":
      return CML.Script.new_plutus_v3(
        CML.PlutusV3Script.from_cbor_hex(referenceDoubleCborEncoding(script)),
      ).to_cbor_hex();
  }
};

/** The result of `f`, or the message it throws. */
const outcome = <T>(f: () => T): { value: T } | { error: string } => {
  try {
    return { value: f() };
  } catch (error) {
    return { error: String((error as Error)?.message ?? error) };
  }
};

/** A deterministic pseudo-random byte sequence. */
const prng = (seed: number) => () => {
  seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
  return seed >>> 24;
};

const randomBytes = (next: () => number, length: number) =>
  Uint8Array.from({ length }, () => next());

const bytestring = (bytes: Uint8Array): Uint8Array =>
  Uint8Array.from(encode(bytes.buffer.slice(0)));

/** `\p ctx -> ()` with a large applied argument, encoded as flat. */
const flatHello =
  "01000032323232323223223225333006323253330083371e6eb8c008c028dd5002a4410d48656c6c6f2c20576f726c642100100114a06644646600200200644a66601c00229404c94ccc030cdc79bae301000200414a226600600600260200026eb0c02cc030c030c030c030c030c030c030c030c024dd5180098049baa002375c600260126ea80188c02c0045261365653330043370e900018029baa001132325333009300b002149858dd7180480098031baa0011653330023370e900018019baa0011323253330073009002149858dd7180380098021baa001165734aae7555cf2ab9f5742ae881";

/** A flat program padded with a trailing bytestring of `size` bytes. */
const largeFlat = (size: number, seed: number): string =>
  flatHello + toHex(randomBytes(prng(seed), size));

const layers = (flat: string) => {
  const raw = fromHex(flat);
  const single = bytestring(raw);
  const double = bytestring(single);
  return { raw: flat, single: toHex(single), double: toHex(double) };
};

describe("applyDoubleCborEncoding", () => {
  const next = prng(7);
  const inputs: string[] = [];
  for (const flat of [flatHello, largeFlat(10_000, 1), largeFlat(70_000, 2)]) {
    const { raw, single, double } = layers(flat);
    inputs.push(raw, single, double, raw.toUpperCase(), single.toUpperCase());
  }
  // Header boundaries of each bytestring length encoding.
  for (const length of [0, 1, 5, 23, 24, 25, 255, 256, 65_535, 65_536]) {
    const payload = randomBytes(next, length);
    const single = bytestring(payload);
    inputs.push(
      toHex(payload),
      toHex(single),
      toHex(bytestring(single)),
      toHex(Uint8Array.of(0x01, ...payload)),
    );
  }
  // Integers, truncated and non-minimal headers, other major types.
  inputs.push(
    "",
    "00",
    "01",
    "17",
    "1818",
    "18",
    "190001",
    "1a00000001",
    "1b0000000000000001",
    "20",
    "3818",
    "40",
    "4100",
    "4101",
    "420101",
    "43414243",
    "4218",
    "5800",
    "580100",
    "58",
    "5901",
    "590001ff",
    "5a00000001ff",
    "5b0000000000000001ff",
    "5f41ff",
    "5f4101ff",
    "4401020304",
    "45440102030405",
    "4618ff",
    "441a00000001",
    "44190001",
    "80",
    "8100",
    "4180",
    "60",
    "6161",
    "a0",
    "c240",
    "d84040",
    "f6",
    "f97e00",
    "ff",
    "1c",
    "41ff",
    "411f",
    "4120",
    "4138",
  );
  // Random short byte strings, some behind bytestring headers. cbor-x takes
  // seconds to reject an unterminated indefinite-length array or map, so
  // those markers are left out.
  for (let i = 0; i < 3000; i++) {
    const body = randomBytes(next, next() % 12).map((byte) =>
      byte === 0x9f || byte === 0xbf ? 0 : byte,
    );
    const choice = next() % 4;
    const bytes =
      choice === 0
        ? body
        : choice === 1
          ? bytestring(body)
          : choice === 2
            ? bytestring(bytestring(body))
            : Uint8Array.of(0x40 + (next() % 30), ...body);
    inputs.push(toHex(bytes));
  }

  test("matches the cbor-x decoding implementation", () => {
    for (const input of inputs) {
      const expected = outcome(() => referenceDoubleCborEncoding(input));
      // Cold, then from the cache.
      expect(
        outcome(() => applyDoubleCborEncoding(input)),
        input,
      ).toEqual(expected);
      expect(
        outcome(() => applyDoubleCborEncoding(input)),
        input,
      ).toEqual(expected);
    }
  });

  test("rejects what the original rejects", () => {
    for (const input of ["0", "abc", "zz", "4501zz0000", "q".repeat(4000)]) {
      const expected = outcome(() => referenceDoubleCborEncoding(input));
      expect("error" in expected).toBe(true);
      expect(outcome(() => applyDoubleCborEncoding(input))).toEqual(expected);
    }
    for (const input of [undefined, null, 42] as unknown as string[]) {
      expect(outcome(() => applyDoubleCborEncoding(input))).toEqual(
        outcome(() => referenceDoubleCborEncoding(input)),
      );
    }
  });
});

describe("script hashes and reference scripts", () => {
  const scripts: Script[] = [];
  for (const flat of [flatHello, largeFlat(10_000, 3), largeFlat(10_000, 4)]) {
    const { raw, single, double } = layers(flat);
    for (const type of ["PlutusV1", "PlutusV2", "PlutusV3"] as const) {
      for (const script of [raw, single, double, single.toUpperCase()]) {
        scripts.push({ type, script });
      }
    }
  }
  scripts.push(
    scriptFromNative({
      type: "sig",
      keyHash: "b861eeadde300385d88aaa98cad0f0ed1f95419bbb9971a0fb7c96fb",
    }),
    scriptFromNative({
      type: "all",
      scripts: [
        { type: "after", slot: 1000 },
        {
          type: "atLeast",
          required: 1,
          scripts: [
            {
              type: "sig",
              keyHash:
                "b862eeadde300385d88aaa98cad0f0ed1f95419bbb9971a0fb7c96fb",
            },
            { type: "before", slot: 99999 },
          ],
        },
      ],
    }),
  );

  test("validatorToScriptHash matches the uncached hash", () => {
    for (const script of scripts) {
      const expected = referenceScriptHash(script);
      expect(validatorToScriptHash(script)).toBe(expected);
      expect(validatorToScriptHash({ ...script })).toBe(expected);
      expect(mintingPolicyToId(script)).toBe(expected);
    }
  });

  test("toScriptRef matches the uncached conversion", () => {
    for (const script of scripts) {
      const expected = referenceScriptRef(script);
      for (let round = 0; round < 2; round++) {
        const scriptRef = toScriptRef(script);
        expect(scriptRef.to_cbor_hex()).toBe(expected);
        scriptRef.free();
      }
    }
  });

  test("scriptCborBytes returns a copy of the script CBOR", () => {
    const script = scripts[1];
    const first = scriptCborBytes(script);
    expect(toHex(first)).toBe(referenceDoubleCborEncoding(script.script));
    first.fill(0);
    expect(toHex(scriptCborBytes(script))).toBe(
      referenceDoubleCborEncoding(script.script),
    );
  });

  test("invalid scripts throw the original errors", () => {
    const invalid: Script[] = [
      { type: "PlutusV3", script: "zz" },
      { type: "Native", script: "00" },
      { type: "Native", script: "zz" },
      { type: "Unknown" as "Native", script: "4100" },
    ];
    for (const script of invalid) {
      const expected = outcome(() => referenceScriptHash(script));
      // The reference returns undefined for an unknown type; the original
      // implementation threw.
      const hash = outcome(() => validatorToScriptHash(script));
      expect("error" in hash, script.script).toBe(true);
      if ("error" in expected) expect(hash).toEqual(expected);
      expect("error" in outcome(() => toScriptRef(script))).toBe(true);
    }
  });
});

describe("ScriptCache", () => {
  test("evicts the oldest entry past its capacity", () => {
    const cache = new ScriptCache<number>(3, Infinity);
    for (let i = 0; i < 5; i++) cache.set("t", `s${i}`, i);
    expect(cache.size).toBe(3);
    expect(cache.get("t", "s0")).toBeUndefined();
    expect(cache.get("t", "s1")).toBeUndefined();
    expect(cache.get("t", "s4")).toBe(4);
  });

  test("keeps namespaces apart", () => {
    const cache = new ScriptCache<string>(10, Infinity);
    cache.set("PlutusV2", "4100", "two");
    cache.set("PlutusV3", "4100", "three");
    expect(cache.get("PlutusV2", "4100")).toBe("two");
    expect(cache.get("PlutusV3", "4100")).toBe("three");
  });

  test("stays within its weight budget", () => {
    const cache = new ScriptCache<string>(100, 10_000, (v) => v.length);
    for (let i = 0; i < 20; i++) cache.set("t", "ab".repeat(1000) + i, "x");
    expect(cache.size).toBeLessThanOrEqual(5);
    cache.set("t", "ab".repeat(10_000), "too big");
    expect(cache.get("t", "ab".repeat(10_000))).toBeUndefined();
  });

  test("tells apart long scripts that share a fingerprint", () => {
    // Same length, head, tail and samples: only one unsampled byte differs.
    const base = "ab".repeat(20_000);
    const variant = (i: number) =>
      base.slice(0, 20_001) + i.toString(16) + base.slice(20_002);
    const cache = new ScriptCache<number>(100, Infinity);
    for (let i = 0; i < 10; i++) cache.set("t", variant(i), i);
    // At most four entries per fingerprint are kept.
    expect(cache.size).toBe(4);
    for (let i = 0; i < 6; i++)
      expect(cache.get("t", variant(i))).toBe(undefined);
    for (let i = 6; i < 10; i++) expect(cache.get("t", variant(i))).toBe(i);
    expect(cache.get("t", base)).toBeUndefined();
  });

  test("replaces an existing entry", () => {
    const cache = new ScriptCache<number>(10, Infinity);
    cache.set("t", "aa", 1);
    cache.set("t", "aa", 2);
    expect(cache.size).toBe(1);
    expect(cache.get("t", "aa")).toBe(2);
  });

  test("getOrCompute stores nothing when compute throws", () => {
    const cache = new ScriptCache<number>(10, Infinity);
    expect(() =>
      cache.getOrCompute("t", "aa", () => {
        throw new Error("boom");
      }),
    ).toThrow("boom");
    expect(cache.size).toBe(0);
    expect(cache.getOrCompute("t", "aa", () => 7)).toBe(7);
    expect(cache.getOrCompute("t", "aa", () => 8)).toBe(7);
  });
});
