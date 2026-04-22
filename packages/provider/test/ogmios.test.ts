import { describe, expect, test } from "vitest";
import { toOgmiosUTxOs } from "../src/internal/ogmios.js";

const baseUtxo = {
  txHash: "0000000000000000000000000000000000000000000000000000000000000000",
  outputIndex: 0,
  address:
    "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
  datumHash: undefined,
  datum: undefined,
  scriptRef: undefined,
};

describe("Ogmios UTxO encoding", () => {
  test("rejects unsafe lovelace quantities before JSON number conversion", () => {
    expect(() =>
      toOgmiosUTxOs([
        {
          ...baseUtxo,
          assets: { lovelace: BigInt(Number.MAX_SAFE_INTEGER) + 1n },
        },
      ]),
    ).toThrow(/non-negative safe integers/);
  });

  test("rejects unsafe native asset quantities before JSON number conversion", () => {
    expect(() =>
      toOgmiosUTxOs([
        {
          ...baseUtxo,
          assets: {
            lovelace: 1n,
            "0123456789abcdef0123456789abcdef0123456789abcdef012345674c75636964":
              BigInt(Number.MAX_SAFE_INTEGER) + 1n,
          },
        },
      ]),
    ).toThrow(/non-negative safe integers/);
  });
});
