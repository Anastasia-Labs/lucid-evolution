import { describe, expect, test } from "vitest";
import { Constr, Data } from "../src/index.js";

const depth = 10_000;
const cases = [
  {
    name: "constructor",
    prefix: "d87981",
    nodePrefix: "d8799f",
    nodeSuffix: "ff",
    leaf: "00",
    suffix: "",
    wrap: (data: Data): Data => new Constr(0, [data]),
  },
  {
    name: "list",
    prefix: "81",
    nodePrefix: "9f",
    nodeSuffix: "ff",
    leaf: "00",
    suffix: "",
    wrap: (data: Data): Data => [data],
  },
  {
    name: "map value",
    prefix: "a100",
    nodePrefix: "bf00",
    nodeSuffix: "ff",
    leaf: "00",
    suffix: "",
    wrap: (data: Data): Data => new Map([[0n, data]]),
  },
  {
    name: "map key",
    prefix: "a1",
    nodePrefix: "bf",
    nodeSuffix: "00ff",
    leaf: "00",
    suffix: "00",
    wrap: (data: Data): Data => new Map([[data, 0n]]),
  },
  {
    name: "bytes in list",
    prefix: "81",
    nodePrefix: "9f",
    nodeSuffix: "ff",
    leaf: "4100",
    suffix: "",
    wrap: (data: Data): Data => [data],
  },
];

describe("deep Plutus data", () => {
  for (const {
    name,
    prefix,
    nodePrefix,
    nodeSuffix,
    leaf,
    suffix,
    wrap,
  } of cases) {
    const raw = prefix.repeat(depth) + leaf + suffix.repeat(depth);
    const node = nodePrefix.repeat(depth) + leaf + nodeSuffix.repeat(depth);
    test(`decodes and re-encodes ${name} at depth ${depth}`, () => {
      for (const input of [raw, node]) {
        const decoded = Data.from(input);
        expect(Data.to(decoded, undefined, { canonical: true })).toBe(raw);
        expect(Data.to(decoded)).toBe(node);
      }
    });
    test(`encodes constructed ${name} at depth ${depth}`, () => {
      let data: Data = leaf === "4100" ? "00" : 0n;
      for (let i = 0; i < depth; i++) data = wrap(data);
      expect(Data.to(data, undefined, { canonical: true })).toBe(raw);
      expect(Data.to(data)).toBe(node);
    });
  }
  test("orders structurally different deep map keys", () => {
    const key0 = "81".repeat(depth) + "00";
    const key1 = "81".repeat(depth) + "01";
    const data = Data.from(`a2${key1}01${key0}00`);
    expect(Data.to(data, undefined, { canonical: true })).toBe(
      `a2${key0}00${key1}01`,
    );
    const nodeKey = "9f".repeat(depth);
    const endKey = "ff".repeat(depth);
    expect(Data.to(data)).toBe(
      `bf${nodeKey}00${endKey}00${nodeKey}01${endKey}01ff`,
    );
  });

  test("keeps duplicate-key semantics below a deep list", () => {
    const prefix = "81".repeat(depth);
    const data = Data.from(prefix + "a200010002");
    expect(Data.to(data, undefined, { canonical: true })).toBe(
      prefix + "a10001",
    );
  });

  test("copies repeated composite-key values independently", () => {
    const data = Data.from("a28100810181008102") as Map<Data, Data>;
    const values = [...data.values()];
    expect(values).toEqual([[1n], [1n]]);
    expect(values[0]).not.toBe(values[1]);
  });

  test("compares map keys before normalizing their duplicate entries", () => {
    const data = Data.from("a2a20001000203a1000104") as Map<Data, Data>;
    expect([...data.values()]).toEqual([3n, 4n]);
  });
});
