import { afterEach, describe, expect, test, vi } from "vitest";
import { Kupmios, KupmiosError, OgmiosJsonRpcError } from "../src/index.js";

const txHash = "0".repeat(64);

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Kupmios structured errors", () => {
  test("preserves Ogmios JSON-RPC error code, data, method, and operation", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "evaluateTransaction",
          id: null,
          error: {
            code: 3010,
            message: "Some inputs are already spent",
            data: { badInputs: ["abcd#0"] },
          },
        }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider.evaluateTx("00").catch((cause) => cause);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toBeInstanceOf(OgmiosJsonRpcError);
    expect(error).toMatchObject({
      name: "OgmiosJsonRpcError",
      provider: "Kupmios",
      protocol: "ogmios",
      operation: "evaluateTransaction",
      kind: "json_rpc",
      retryable: false,
      status: 400,
      code: 3010,
      data: { badInputs: ["abcd#0"] },
      method: "evaluateTransaction",
      id: null,
    });
  });

  test("combines JSON-RPC and HTTP retry metadata", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32000, message: "temporarily unavailable" },
        }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "retry-after": "2",
          },
        },
      ),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider.getTreasury().catch((cause) => cause);

    expect(error).toBeInstanceOf(OgmiosJsonRpcError);
    expect(error).toMatchObject({
      code: -32000,
      status: 429,
      retryable: true,
      retryAfterMs: 2_000,
    });
  });

  test("preserves HTTP status and Retry-After metadata", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("rate limited", {
        status: 429,
        headers: { "retry-after": "2" },
      }),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider
      .getTransactionStatus(txHash)
      .catch((cause) => cause);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toMatchObject({
      provider: "Kupmios",
      protocol: "kupo",
      operation: "getTransactionStatus",
      kind: "http",
      status: 429,
      retryable: true,
      retryAfterMs: 2_000,
    });
    expect(error.cause).toBeDefined();
  });

  test("does not mark ordinary client errors retryable", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("bad request", { status: 400 }),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider
      .getTransactionStatus(txHash)
      .catch((cause) => cause);

    expect(error).toMatchObject({
      kind: "http",
      status: 400,
      retryable: false,
    });
  });

  test("classifies invalid provider payloads as decode failures", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ invalid: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider
      .getTransactionStatus(txHash)
      .catch((cause) => cause);

    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toMatchObject({
      protocol: "kupo",
      operation: "getTransactionStatus",
      kind: "decode",
      retryable: false,
    });
  });

  test("classifies provider operation deadlines as retryable timeouts", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async () => await new Promise<Response>(() => undefined),
    );
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const result = provider
      .getTransactionStatus(txHash)
      .catch((cause) => cause);
    await vi.advanceTimersByTimeAsync(10_000);
    const error = await result;

    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toMatchObject({
      protocol: "kupo",
      operation: "getTransactionStatus",
      kind: "timeout",
      retryable: true,
    });
    expect(error.cause).toBeDefined();
  });

  test("turns AbortSignal cancellation into a normal typed Error", async () => {
    const controller = new AbortController();
    controller.abort(new Error("caller cancelled"));
    const fetch = vi.spyOn(globalThis, "fetch");
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");

    const error = await provider
      .getTransactionStatus(txHash, { signal: controller.signal })
      .catch((cause) => cause);

    expect(fetch).not.toHaveBeenCalled();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toMatchObject({
      protocol: "kupo",
      operation: "getTransactionStatus",
      kind: "aborted",
      retryable: false,
    });
    expect(error.cause).toBe(controller.signal.reason);
  });

  test("interrupts an in-flight Kupo request when the caller aborts", async () => {
    let requestSignal: AbortSignal | undefined;
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (input, init) => {
        requestSignal = new Request(input, init).signal;
        return await new Promise<Response>((_resolve, reject) => {
          requestSignal!.addEventListener(
            "abort",
            () => reject(requestSignal!.reason),
            { once: true },
          );
        });
      });
    const provider = new Kupmios("http://kupo.test", "http://ogmios.test");
    const controller = new AbortController();
    const reason = new Error("caller cancelled in flight");

    const result = provider
      .getTransactionStatus(txHash, { signal: controller.signal })
      .catch((cause) => cause);
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    controller.abort(reason);
    const error = await result;

    expect(requestSignal?.aborted).toBe(true);
    expect(error).toBeInstanceOf(KupmiosError);
    expect(error).toMatchObject({
      operation: "getTransactionStatus",
      kind: "aborted",
      retryable: false,
      cause: reason,
    });
  });
});
