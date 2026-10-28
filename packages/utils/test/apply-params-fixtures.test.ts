import { describe, expect, test } from "vitest";
import { decode } from "cbor-x";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { Constr, Data } from "@lucid-evolution/plutus";
import { applyParamsToScript } from "../src/scripts.js";
import { applyParamsCases } from "./fixtures/apply-params-cases.js";
import { appliedScripts } from "./fixtures/apply-params-expected.js";

/**
 * Cases whose pinned result differs from what the @harmoniclabs based
 * implementation (utils 0.2.6 and earlier) gave. That implementation
 * re-encoded each parameter: it kept only the first 64 bytes of a byte string
 * over 64 bytes, encoded some negative integers in a longer form than needed
 * and wrote integers over 64 bytes unchunked; it threw on integers below
 * -2^64. Every other case gives the same bytes as it did.
 */
const changedCases = [
  "helloV2, integer 12",
  "helloV2, integer 14",
  "alwaysYesDrepV3, integer 12",
  "alwaysYesDrepV3, integer 14",
  "helloV2, big integer 4",
  "alwaysYesDrepV3, big integer 4",
  "alwaysYesDrepV3, bytes 6",
  "alwaysYesDrepV3, bytes 7",
  "helloV2, bytes 6",
  "helloV2, bytes 7",
  "alwaysYesDrepV3, list 4",
  "alwaysYesDrepV3, map 2",
  "helloV2, map 2",
  "helloV2, every kind",
  "spendingV2, every kind",
  "alwaysYesDrepV3, every kind",
  "dataSerialiseEchoV3, every kind",
  "helloWorldParamsV3, every kind",
  "simpleMintV3, every kind",
  "stakeMultiValidatorV3, every kind",
  "mintMultiValidatorV3, every kind",
  "helloV2, big integer 1",
  "helloV2, big integer 3",
  "helloV2, big integer 5",
  "alwaysYesDrepV3, big integer 1",
  "alwaysYesDrepV3, big integer 3",
  "alwaysYesDrepV3, big integer 5",
  "alwaysYesDrepV3, nested",
  "alwaysYesDrepV3, every integer",
  "alwaysYesDrepV3, typed parameters",
];

/** Flat writes a byte string in chunks of at most 255 bytes. */
const FLAT_CHUNK_BYTES = 255;

const appliedFlatHex = (applied: string): string =>
  toHex(decode(decode(fromHex(applied))));

/** The constrs with an index over 127 in `data`, outermost first. */
const generalFormConstrs = (data: Data): Constr<Data>[] => {
  const found: Constr<Data>[] = [];
  const stack: Data[] = [data];
  while (stack.length > 0) {
    const item = stack.pop()!;
    if (item instanceof Constr) {
      if (BigInt(item.index) > 127n) found.push(item);
      stack.push(...item.fields);
    } else if (Array.isArray(item)) {
      stack.push(...item);
    } else if (item instanceof Map) {
      for (const [key, value] of item) stack.push(key, value);
    }
  }
  return found;
};

/**
 * The data constant a parameter is applied as: its `Data.to` encoding, except
 * that a constr with an index over 127, which `Data.to` writes as
 * `d866 9f <index> <fields> ff`, is written with a definite pair,
 * `d866 82 <index> <fields>` (as the earlier implementation also wrote it).
 */
const appliedDataCbor = (data: Data): string =>
  generalFormConstrs(data).reduce((cbor, constr) => {
    // None of the fixtures nests a general form constr in another one.
    expect(generalFormConstrs(constr)).toHaveLength(1);
    const indefinite = Data.to(constr);
    expect(indefinite.startsWith("d8669f")).toBe(true);
    expect(cbor).toContain(indefinite);
    return cbor.replace(indefinite, "d86682" + indefinite.slice(6, -2));
  }, Data.to(data));

describe("applyParamsToScript fixtures", () => {
  test("every case has a distinct name and a pinned result", () => {
    const names = applyParamsCases.map(({ name }) => name);
    expect(new Set(names).size).toBe(names.length);
    expect(Object.keys(appliedScripts).sort()).toEqual([...names].sort());
    for (const name of changedCases) expect(names).toContain(name);
  });

  test.each(applyParamsCases.map((c) => [c.name, c] as const))(
    "%s",
    (name, { script, params, type }) => {
      expect(applyParamsToScript(script, params as never, type as never)).toBe(
        appliedScripts[name],
      );
    },
  );

  test.each(changedCases)(
    "%s embeds each parameter's Data.to encoding",
    (name) => {
      const { script, params, type } = applyParamsCases.find(
        (c) => c.name === name,
      )!;
      const parameters = (
        type ? Data.castTo(params as never, type as never) : params
      ) as Data[];
      const flat = appliedFlatHex(
        applyParamsToScript(script, params as never, type as never),
      );
      for (const parameter of parameters) {
        const cbor = appliedDataCbor(parameter);
        // A longer encoding is split by flat chunk headers.
        expect(cbor.length / 2).toBeLessThanOrEqual(FLAT_CHUNK_BYTES);
        expect(flat).toContain(cbor);
      }
    },
  );
});
