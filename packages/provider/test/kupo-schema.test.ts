import { afterEach, describe, expect, test, vi } from "vitest";
import { Schema as S } from "effect";
import { Kupmios } from "../src/kupmios.js";
import {
  ResolvedUTxOSchema,
  UTxOSchema,
  ValueSchema,
} from "../src/internal/kupo.js";

const decodeValue = S.decodeUnknownSync(ValueSchema);
const decodeUtxo = S.decodeUnknownSync(UTxOSchema);
const decodeResolvedUtxo = S.decodeUnknownSync(ResolvedUTxOSchema);
const assetUnit =
  "0123456789abcdef0123456789abcdef0123456789abcdef01234567.4c75636964";

const kupoUtxo = (coins: number | string) => ({
  transaction_index: 0,
  transaction_id:
    "0000000000000000000000000000000000000000000000000000000000000000",
  output_index: 0,
  address:
    "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
  value: {
    coins,
    assets: {},
  },
  datum_hash: null,
  datum: null,
  script_hash: null,
  script: null,
  created_at: {
    slot_no: 1,
    header_hash:
      "1111111111111111111111111111111111111111111111111111111111111111",
  },
  spent_at: null,
});

const getUrl = (input: unknown): string => {
  if (input instanceof Request) return input.url;
  if (input instanceof URL) return input.href;
  return String(input);
};

const getHeader = (
  input: unknown,
  init: unknown,
  name: string,
): string | null => {
  if (input instanceof Request) return input.headers.get(name);
  if (
    typeof init === "object" &&
    init !== null &&
    "headers" in init &&
    init.headers
  ) {
    return new Headers(init.headers as HeadersInit).get(name);
  }
  return null;
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Kupo ValueSchema", () => {
  test("accepts numeric coins", () => {
    expect(decodeValue({ coins: 9909659524, assets: {} }).coins).toBe(
      9909659524,
    );
  });

  test("accepts string coins without coercing them", () => {
    expect(decodeValue({ coins: "9909659524", assets: {} }).coins).toBe(
      "9909659524",
    );
  });

  test("accepts string native asset quantities without coercing them", () => {
    const decoded = decodeValue({
      coins: 0,
      assets: { [assetUnit]: "9223372036854775807" },
    });

    expect(decoded.assets[assetUnit]).toBe("9223372036854775807");
  });

  test("rejects invalid decimal strings", () => {
    expect(() => decodeValue({ coins: "abc", assets: {} })).toThrow();
    expect(() => decodeValue({ coins: "1.5", assets: {} })).toThrow();
    expect(() =>
      decodeValue({ coins: 0, assets: { [assetUnit]: "abc" } }),
    ).toThrow();
    expect(() =>
      decodeValue({ coins: 0, assets: { [assetUnit]: "1.5" } }),
    ).toThrow();
  });
});

describe("Kupo UTxO schemas", () => {
  test("keeps resolved fields required only in resolved responses", () => {
    const { datum: _datum, script: _script, ...unresolved } = kupoUtxo(1);

    expect(() => decodeUtxo(unresolved)).not.toThrow();
    expect(() => decodeResolvedUtxo(unresolved)).toThrow();
    expect(() => decodeResolvedUtxo(kupoUtxo(1))).not.toThrow();
  });
});

describe("Kupmios Kupo quantity decoding", () => {
  test("requests resolved hashes for every UTxO query", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(
      async () =>
        new Response(JSON.stringify([]), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");
    const address = kupoUtxo(1).address;
    const unit = assetUnit.replace(".", "");
    const txHash = "0".repeat(64);
    const queries = [
      () => kupmios.getUtxos(address),
      () => kupmios.getUtxosWithUnit(address, unit),
      () => kupmios.getUtxosWithPolicy(address, unit.slice(0, 56)),
      () => kupmios.getUtxoByUnit(unit).catch(() => undefined),
      () => kupmios.getUtxosByOutRef([{ txHash, outputIndex: 0 }]),
    ];

    for (const query of queries) {
      fetchSpy.mockClear();
      await query();

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const url = new URL(getUrl(fetchSpy.mock.calls[0]![0]));
      expect(url.searchParams.has("resolve_hashes")).toBe(true);
    }
  });

  test("getUtxos accepts string coins from Kupo", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([kupoUtxo("9909659524")]), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    const utxos = await kupmios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const url = new URL(getUrl(fetchSpy.mock.calls[0]![0]));
    expect(url.searchParams.has("unspent")).toBe(true);
    expect(url.searchParams.has("resolve_hashes")).toBe(true);
    expect(utxos).toHaveLength(1);
    expect(utxos[0]?.assets.lovelace).toBe(9909659524n);
  });

  test("resolves datum and script in a single authenticated request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            ...kupoUtxo("9909659524"),
            datum_hash: "abcd",
            datum_type: "inline",
            datum: "d87980",
            script_hash: "beef",
            script: { language: "native", script: "00" },
          },
        ]),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test", {
      kupoHeader: { "dmtr-api-key": "secret" },
    });

    const utxos = await kupmios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );

    expect(utxos[0]?.datum).toBe("d87980");
    expect(utxos[0]?.scriptRef).toStrictEqual({
      type: "Native",
      script: "00",
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [input, init] = fetchSpy.mock.calls[0]!;
    expect(new URL(getUrl(input)).searchParams.has("resolve_hashes")).toBe(
      true,
    );
    expect(getHeader(input, init, "dmtr-api-key")).toBe("secret");
  });

  test("keeps resolved hash datums represented by datumHash", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            ...kupoUtxo("9909659524"),
            datum_hash: "abcd",
            datum_type: "hash",
            datum: "d87980",
          },
        ]),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    const [utxo] = await kupmios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );

    expect(utxo?.datumHash).toBe("abcd");
    expect(utxo?.datum).toBeUndefined();
  });

  test("getUtxoByUnit rejects when Kupo returns no UTxOs", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      kupmios.getUtxoByUnit(
        "0123456789abcdef0123456789abcdef0123456789abcdef012345674c75636964",
      ),
    ).rejects.toThrow(/Unit not found/);
  });
});
