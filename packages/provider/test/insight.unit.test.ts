import { afterEach, describe, expect, test, vi } from "vitest";
import { Insight, InsightNetwork } from "../src/insight.js";

afterEach(() => {
  vi.restoreAllMocks();
});

const mockEmptyUtxos = () =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify([]), {
      headers: { "content-type": "application/json" },
    }),
  );

describe("Insight", () => {
  test.each([
    ["Mainnet", "mainnet.insight.iagon.com"],
    ["Preprod", "preprod.insight.iagon.com"],
  ])("%s goes to %s with the key", async (network, host) => {
    const fetchSpy = mockEmptyUtxos();

    await new Insight({
      network: network as InsightNetwork,
      apiKey: "key",
    }).getUtxos({ type: "Key", hash: "00".repeat(28) });

    const url = new URL(fetchSpy.mock.calls[0]![0] as string);
    expect(url.host).toBe(host);
    expect(url.pathname).toMatch(/^\/api\/v0\/addresses\/addr_vkh1/);
    const init = fetchSpy.mock.calls[0]![1] as RequestInit;
    expect(init.headers).toMatchObject({ project_id: "key" });
  });

  test("rejects a network Insight does not serve", () => {
    expect(
      () =>
        new Insight({
          network: "Preview" as InsightNetwork,
          apiKey: "key",
        }),
    ).toThrow("Insight serves Mainnet and Preprod, not Preview.");
  });

  test("rejects a missing key", () => {
    expect(() => new Insight({ network: "Preprod", apiKey: "" })).toThrow(
      "Insight needs an API key.",
    );
  });

  test("passes the request timeout on", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init!.signal!.addEventListener("abort", () =>
            reject(init!.signal!.reason),
          );
        }),
    );
    const provider = new Insight({
      network: "Preprod",
      apiKey: "key",
      requestTimeoutMs: 20,
    });
    await expect(provider.getProtocolParameters()).rejects.toMatchObject({
      name: "TimeoutError",
    });
  });
});
