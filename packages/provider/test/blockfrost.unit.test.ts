import { afterEach, describe, expect, test, vi } from "vitest";
import { Blockfrost } from "../src/blockfrost.js";

afterEach(() => {
  vi.restoreAllMocks();
});

const mockEmptyUtxos = () =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify([]), {
      headers: { "content-type": "application/json" },
    }),
  );

describe("Blockfrost credential queries", () => {
  test("encodes script credentials with the script prefix for getUtxos", async () => {
    const fetchSpy = mockEmptyUtxos();

    await new Blockfrost("https://blockfrost.test").getUtxos({
      type: "Script",
      hash: "00".repeat(28),
    });

    const url = new URL(fetchSpy.mock.calls[0]![0] as string);
    expect(url.pathname).toMatch(/^\/addresses\/script1/);
    expect(url.pathname).toMatch(/\/utxos$/);
    expect(url.searchParams.get("page")).toBe("1");
  });

  test("encodes script credentials with the script prefix for getUtxosWithUnit", async () => {
    const fetchSpy = mockEmptyUtxos();

    await new Blockfrost("https://blockfrost.test").getUtxosWithUnit(
      {
        type: "Script",
        hash: "00".repeat(28),
      },
      "lovelace",
    );

    const url = new URL(fetchSpy.mock.calls[0]![0] as string);
    expect(url.pathname).toMatch(/^\/addresses\/script1/);
    expect(url.pathname).toMatch(/\/utxos\/lovelace$/);
    expect(url.searchParams.get("page")).toBe("1");
  });
});
