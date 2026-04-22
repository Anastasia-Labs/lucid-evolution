import { afterEach, describe, expect, test, vi } from "vitest";
import { Schema as S } from "effect";
import { Kupmios } from "../src/kupmios.js";
import { ValueSchema } from "../src/internal/kupo.js";

const decodeValue = S.decodeUnknownSync(ValueSchema);
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
  script_hash: null,
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

describe("Kupmios Kupo quantity decoding", () => {
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
    expect(utxos).toHaveLength(1);
    expect(utxos[0]?.assets.lovelace).toBe(9909659524n);
  });

  test("forwards Kupo headers to datum and script lookups", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (input) => {
        const url = getUrl(input);
        if (url === "http://kupo.test/datums/abcd") {
          return new Response(JSON.stringify({ datum: "d87980" }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
        if (url === "http://kupo.test/scripts/beef") {
          return new Response(
            JSON.stringify({ language: "native", script: "00" }),
            {
              status: 200,
              headers: { "content-type": "application/json" },
            },
          );
        }
        return new Response(
          JSON.stringify([
            {
              ...kupoUtxo("9909659524"),
              datum_hash: "abcd",
              datum_type: "inline",
              script_hash: "beef",
            },
          ]),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      });
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
    expect(
      fetchSpy.mock.calls.every(
        ([input, init]) => getHeader(input, init, "dmtr-api-key") === "secret",
      ),
    ).toBe(true);
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
