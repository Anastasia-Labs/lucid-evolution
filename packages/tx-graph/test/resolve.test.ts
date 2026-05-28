import { describe, expect, test } from "vitest";
import type { UTxO } from "@lucid-evolution/core-types";
import type { TraceOutRef, TraceTransaction, TraceUtxo } from "../src/model.js";
import {
  createResolutionCache,
  outRefKey,
  parseOutRefKey,
  toTraceUtxo,
  type TxGraphResolutionProvider,
} from "../src/resolve.js";

const address =
  "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950";

const ref = (byte: string, outputIndex: number): TraceOutRef => ({
  txHash: byte.repeat(32),
  outputIndex,
});

const utxo = (
  outRef: TraceOutRef,
  lovelace: bigint,
  extraAssets: UTxO["assets"] = {},
): UTxO => ({
  ...outRef,
  address,
  assets: {
    ...extraAssets,
    lovelace,
  },
});

const traceUtxo = (
  outRef: TraceOutRef,
  lovelace: string,
  tags: string[] = [],
): TraceUtxo => ({
  ...outRef,
  address,
  assets: { lovelace },
  resolution: "resolved",
  tags,
});

describe("resolution cache", () => {
  test("uses scenario cache before provider lookup", async () => {
    const cache = createResolutionCache();
    const inputRef = ref("11", 0);
    const produced = traceUtxo(inputRef, "2000000", ["produced"]);
    const transaction = {
      outputs: [produced],
    } satisfies Pick<TraceTransaction, "outputs">;
    let providerCalls = 0;
    const provider: TxGraphResolutionProvider = {
      getUtxosByOutRef: async () => {
        providerCalls += 1;
        return [utxo(inputRef, 3_000_000n)];
      },
    };

    cache.addTransactionOutputs(transaction);
    const result = await cache.resolveOutRefs([inputRef], { provider });

    expect(providerCalls).toBe(0);
    expect(result.utxos).toEqual([produced]);
    expect(result.sources).toEqual({
      [outRefKey(inputRef)]: "scenario-cache",
    });
    expect(result.warnings).toEqual([]);
  });

  test("falls back to provider and converts UTxOs into JSON-stable trace UTxOs", async () => {
    const cache = createResolutionCache();
    const inputRef = ref("22", 1);
    const provider: TxGraphResolutionProvider = {
      getUtxosByOutRef: async (outRefs) => {
        expect(outRefs).toEqual([inputRef]);
        return [
          utxo(inputRef, 4_000_000n, {
            ["aa".repeat(28) + "01"]: 7n,
          }),
        ];
      },
    };

    const result = await cache.resolveOutRefs([inputRef], { provider });

    expect(result.sources).toEqual({
      [outRefKey(inputRef)]: "provider",
    });
    expect(result.utxos[0]).toMatchObject({
      ...inputRef,
      address,
      assets: {
        ["aa".repeat(28) + "01"]: "7",
        lovelace: "4000000",
      },
      resolution: "resolved",
      tags: [],
    });
    expect(JSON.stringify(result.utxos[0])).toContain('"4000000"');
  });

  test("preserves provider misses as unresolved placeholder nodes", async () => {
    const cache = createResolutionCache();
    const resolvedRef = ref("33", 0);
    const missingRef = ref("44", 1);
    const provider: TxGraphResolutionProvider = {
      getUtxosByOutRef: async () => [utxo(resolvedRef, 5_000_000n)],
    };

    const result = await cache.resolveOutRefs([resolvedRef, missingRef], {
      provider,
    });

    expect(result.sources).toEqual({
      [outRefKey(resolvedRef)]: "provider",
      [outRefKey(missingRef)]: "unresolved",
    });
    expect(result.utxos[0]).toMatchObject({
      ...resolvedRef,
      resolution: "resolved",
    });
    expect(result.utxos[1]).toEqual({
      ...missingRef,
      address: "unresolved",
      assets: {},
      resolution: "unresolved",
      unresolvedReason: "provider-miss",
      tags: [],
    });
  });

  test("uses preloaded and user resolver UTxOs for offline resolution", async () => {
    const cache = createResolutionCache();
    const knownRef = ref("55", 0);
    const resolverRef = ref("66", 1);
    const missingRef = ref("77", 2);

    cache.addResolvedUtxos([toTraceUtxo(utxo(knownRef, 6_000_000n))]);
    const result = await cache.resolveOutRefs(
      [knownRef, resolverRef, missingRef],
      {
        resolver: async (outRefs) => {
          expect(outRefs).toEqual([resolverRef, missingRef]);
          return [utxo(resolverRef, 7_000_000n)];
        },
      },
    );

    expect(result.sources).toEqual({
      [outRefKey(knownRef)]: "known-utxos",
      [outRefKey(resolverRef)]: "resolver",
      [outRefKey(missingRef)]: "unresolved",
    });
    expect(result.utxos.map((resolved) => resolved.resolution)).toEqual([
      "resolved",
      "resolved",
      "unresolved",
    ]);
    expect(result.utxos[2]?.unresolvedReason).toBe("resolver-miss");
  });

  test("normalizes preloaded all-zero hash UTxOs as genesis", async () => {
    const cache = createResolutionCache();
    const genesisRef = ref("00", 0);
    let providerCalls = 0;
    const provider: TxGraphResolutionProvider = {
      getUtxosByOutRef: async () => {
        providerCalls += 1;
        throw new Error("genesis should not be provider-resolved");
      },
    };

    cache.addResolvedUtxos([utxo(genesisRef, 9_000_000n)]);
    const result = await cache.resolveOutRefs([genesisRef], { provider });

    expect(providerCalls).toBe(0);
    expect(cache.getKnownUtxo(genesisRef)).toMatchObject({
      ...genesisRef,
      assets: { lovelace: "9000000" },
      resolution: "genesis",
      tags: ["genesis"],
    });
    expect(result.sources).toEqual({
      [outRefKey(genesisRef)]: "genesis",
    });
    expect(result.utxos[0]).toMatchObject({
      ...genesisRef,
      assets: { lovelace: "9000000" },
      resolution: "genesis",
      tags: ["genesis"],
    });
    expect(result.warnings).toEqual([]);
  });

  test("round-trips out ref keys", () => {
    const inputRef = ref("88", 9);

    expect(parseOutRefKey(outRefKey(inputRef))).toEqual(inputRef);
    expect(() => parseOutRefKey("bad-key")).toThrow("Invalid out ref key");
  });
});
