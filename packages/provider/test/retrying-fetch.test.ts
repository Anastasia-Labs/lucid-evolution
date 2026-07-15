import { describe, expect, test, vi } from "vitest";
import { with429Retry } from "./retrying-fetch.js";

const asFetch = (implementation: () => Promise<Response>): typeof fetch =>
  implementation as typeof fetch;

describe("with429Retry", () => {
  test("honors a Retry-After delay in seconds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 429,
          headers: { "Retry-After": "2" },
        }),
      )
      .mockResolvedValueOnce(new Response("ok"));
    const sleep = vi.fn().mockResolvedValue(undefined);

    const response = await with429Retry(asFetch(fetchMock), { sleep })(
      "https://example.test",
    );

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(2_000);
  });

  test("honors a Retry-After HTTP date", async () => {
    const now = Date.parse("2026-07-15T12:00:00.000Z");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 429,
          headers: {
            "Retry-After": new Date(now + 3_000).toUTCString(),
          },
        }),
      )
      .mockResolvedValueOnce(new Response("ok"));
    const sleep = vi.fn().mockResolvedValue(undefined);

    await with429Retry(asFetch(fetchMock), {
      now: () => now,
      sleep,
    })("https://example.test");

    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(3_000);
  });

  test("caps an excessive Retry-After delay", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 429,
          headers: { "Retry-After": "3600" },
        }),
      )
      .mockResolvedValueOnce(new Response("ok"));
    const sleep = vi.fn().mockResolvedValue(undefined);

    await with429Retry(asFetch(fetchMock), {
      maxDelayMs: 5_000,
      sleep,
    })("https://example.test");

    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(5_000);
  });

  test("uses capped exponential delays without Retry-After", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 429 }))
      .mockResolvedValueOnce(new Response(null, { status: 429 }))
      .mockResolvedValueOnce(new Response("ok"));
    const sleep = vi.fn().mockResolvedValue(undefined);

    await with429Retry(asFetch(fetchMock), {
      initialDelayMs: 2_000,
      maxDelayMs: 3_000,
      sleep,
    })("https://example.test");

    expect(sleep.mock.calls).toStrictEqual([[2_000], [3_000]]);
  });

  test("returns the final 429 response after the retry bound", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 429 }));
    const sleep = vi.fn().mockResolvedValue(undefined);

    const response = await with429Retry(asFetch(fetchMock), {
      maxRetries: 2,
      sleep,
    })("https://example.test");

    expect(response.status).toBe(429);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  test("does not retry non-429 responses", async () => {
    const response = new Response(null, { status: 503 });
    const fetchMock = vi.fn().mockResolvedValue(response);
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(
      with429Retry(asFetch(fetchMock), { sleep })("https://example.test"),
    ).resolves.toBe(response);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://example.test");
    expect(sleep).not.toHaveBeenCalled();
  });

  test("does not retry errors thrown by fetch", async () => {
    const error = new Error("network failed");
    const fetchMock = vi.fn().mockRejectedValue(error);
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(
      with429Retry(asFetch(fetchMock), { sleep })("https://example.test"),
    ).rejects.toBe(error);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://example.test");
    expect(sleep).not.toHaveBeenCalled();
  });
});
