import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { type Socket } from "node:net";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Kupmios } from "../src/index.js";

const baseProtocolParameters = {
  minFeeCoefficient: 44,
  minFeeReferenceScripts: {
    base: 15,
    range: 25_600,
    multiplier: 1.2,
  },
  stakePoolVotingThresholds: {
    noConfidence: "51/100",
    constitutionalCommittee: {
      default: "51/100",
      stateOfNoConfidence: "51/100",
    },
    hardForkInitiation: "51/100",
    protocolParametersUpdate: { security: "51/100" },
  },
  delegateRepresentativeVotingThresholds: {
    noConfidence: "2/3",
    constitutionalCommittee: {
      default: "2/3",
      stateOfNoConfidence: "2/3",
    },
    constitution: "2/3",
    hardForkInitiation: "2/3",
    protocolParametersUpdate: {
      network: "2/3",
      economic: "2/3",
      technical: "2/3",
      governance: "2/3",
    },
    treasuryWithdrawals: "2/3",
  },
  constitutionalCommitteeMinSize: 0,
  constitutionalCommitteeMaxTermLength: 146,
  governanceActionLifetime: 6,
  governanceActionDeposit: { ada: { lovelace: 100_000_000_000 } },
  delegateRepresentativeDeposit: { ada: { lovelace: 500_000_000 } },
  delegateRepresentativeMaxIdleTime: 20,
  minFeeConstant: { ada: { lovelace: 155_381 } },
  maxBlockBodySize: { bytes: 90_112 },
  maxBlockHeaderSize: { bytes: 1_100 },
  maxTransactionSize: { bytes: 16_384 },
  stakeCredentialDeposit: { ada: { lovelace: 2_000_000 } },
  stakePoolDeposit: { ada: { lovelace: 500_000_000 } },
  stakePoolRetirementEpochBound: 18,
  desiredNumberOfStakePools: 500,
  stakePoolPledgeInfluence: "3/10",
  monetaryExpansion: "3/1000",
  treasuryExpansion: "1/5",
  minStakePoolCost: { ada: { lovelace: 340_000_000 } },
  minUtxoDepositConstant: { ada: { lovelace: 0 } },
  minUtxoDepositCoefficient: 4_310,
  plutusCostModels: {
    "plutus:v1": [1],
    "plutus:v2": [2],
    "plutus:v3": [3],
  },
  scriptExecutionPrices: { memory: "577/10000", cpu: "721/10000000" },
  maxExecutionUnitsPerTransaction: { memory: 14_000_000, cpu: 10_000_000_000 },
  maxExecutionUnitsPerBlock: { memory: 62_000_000, cpu: 20_000_000_000 },
  maxValueSize: { bytes: 5_000 },
  collateralPercentage: 150,
  maxCollateralInputs: 3,
  version: { major: 10, minor: 0 },
} as const;

const protocolResponse = (change: Record<string, unknown> = {}) => ({
  jsonrpc: "2.0",
  method: "queryLedgerState/protocolParameters",
  id: null,
  result: {
    ...baseProtocolParameters,
    maxReferenceScriptsSizePerTransaction: { bytes: 204_800 },
    ...change,
  },
});

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

const httpFixture = async (
  handle: (request: IncomingMessage, response: ServerResponse) => void,
) => {
  const sockets = new Set<Socket>();
  const connected = deferred<void>();
  const drained = deferred<void>();
  const server = createServer(handle);
  server.on("connection", (socket) => {
    sockets.add(socket);
    connected.resolve();
    socket.once("close", () => {
      sockets.delete(socket);
      if (sockets.size === 0) drained.resolve();
    });
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string")
    throw new Error("missing HTTP fixture address");
  return {
    url: `http://127.0.0.1:${address.port}`,
    connected: connected.promise,
    drained: drained.promise,
    liveSockets: () => sockets.size,
    close: async () => {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    },
  };
};

const send = (response: ServerResponse, body: unknown) => {
  response.writeHead(200, {
    "content-type": "application/json",
    connection: "close",
  });
  response.end(JSON.stringify(body));
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Kupmios fetchImpl", () => {
  test("sends requests through fetchImpl instead of the global fetch", async () => {
    const globalFetch = vi.spyOn(globalThis, "fetch");
    const urls: string[] = [];
    const fetchImpl: typeof fetch = async (input) => {
      urls.push(String(input));
      return new Response(JSON.stringify(protocolResponse()), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };
    const parameters = await new Kupmios(
      "http://kupo.test",
      "http://ogmios.test",
      { fetchImpl },
    ).getProtocolParameters();
    expect(urls).toEqual(["http://ogmios.test/"]);
    expect(globalFetch).not.toHaveBeenCalled();
    expect(parameters).toMatchObject({ minFeeA: 44, minFeeB: 155_381 });
  });

  test("keeps headers, abort signal and decoding the same as the default transport", async () => {
    const requests: string[] = [];
    const fixture = await httpFixture((request, response) => {
      requests.push(request.headers["x-owned"]?.toString() ?? "default");
      send(response, protocolResponse());
    });
    const calls: RequestInit[] = [];
    const fetchImpl: typeof fetch = (input, init) => {
      calls.push(init ?? {});
      return fetch(input, init);
    };
    try {
      const owned = await new Kupmios(fixture.url, fixture.url, {
        fetchImpl,
        ogmiosHeader: { "x-owned": "attempt" },
      }).getProtocolParameters();
      const normal = await new Kupmios(
        fixture.url,
        fixture.url,
      ).getProtocolParameters();
      expect(calls).toHaveLength(1);
      expect(calls[0]?.signal).toBeInstanceOf(AbortSignal);
      expect(requests).toEqual(["attempt", "default"]);
      expect(owned).toEqual(normal);
      expect(owned).toMatchObject({
        minFeeA: 44,
        minFeeB: 155_381,
        coinsPerUtxoByte: 4_310n,
        maxTxSize: 16_384,
      });
    } finally {
      await fixture.close();
    }
  });

  test("an abort from fetchImpl rejects the request and closes the connection", async () => {
    const entered = deferred<void>();
    let lateResponse: ServerResponse | undefined;
    const fixture = await httpFixture((_, response) => {
      lateResponse = response;
      entered.resolve();
    });
    const controller = new AbortController();
    let calls = 0;
    const fetchImpl: typeof fetch = (input, init) => {
      calls++;
      return fetch(input, {
        ...init,
        signal: AbortSignal.any([
          controller.signal,
          ...(init?.signal ? [init.signal] : []),
        ]),
      });
    };
    const settled = new Kupmios(fixture.url, fixture.url, {
      fetchImpl,
      requestTimeoutMs: 2_000,
    })
      .getProtocolParameters()
      .then(
        () => "success",
        () => "rejected",
      );
    try {
      await entered.promise;
      expect(calls).toBe(1);
      controller.abort(new Error("caller gave up"));
      expect(await settled).toBe("rejected");
      if (lateResponse === undefined) throw new Error("missing held response");
      send(lateResponse, protocolResponse());
      await fixture.drained;
      expect(fixture.liveSockets()).toBe(0);
    } finally {
      controller.abort();
      await fixture.close();
      await settled;
    }
  });

  test("requestTimeoutMs aborts the signal passed to fetchImpl", async () => {
    const fixture = await httpFixture(() => {});
    let suppliedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (input, init) => {
      suppliedSignal = init?.signal;
      return fetch(input, init);
    };
    try {
      await expect(
        new Kupmios(fixture.url, fixture.url, {
          fetchImpl,
          requestTimeoutMs: 50,
        }).getProtocolParameters(),
      ).rejects.toMatchObject({ kind: "timeout" });
      expect(suppliedSignal?.aborted).toBe(true);
      await fixture.drained;
      expect(fixture.liveSockets()).toBe(0);
    } finally {
      await fixture.close();
    }
  });

  test("a malformed response is still refused by the decoder", async () => {
    const fixture = await httpFixture((_, response) =>
      send(response, protocolResponse({ minFeeCoefficient: "poisoned" })),
    );
    let calls = 0;
    const fetchImpl: typeof fetch = (input, init) => {
      calls++;
      return fetch(input, init);
    };
    try {
      await expect(
        new Kupmios(fixture.url, fixture.url, {
          fetchImpl,
        }).getProtocolParameters(),
      ).rejects.toThrow(/Expected number/);
      expect(calls).toBe(1);
    } finally {
      await fixture.close();
    }
  });

  test("an error thrown by fetchImpl is a transport error", async () => {
    const fixture = await httpFixture((_, response) => {
      response.writeHead(200, { "content-type": "application/json" });
      response.write("x".repeat(128));
    });
    const fetchImpl: typeof fetch = async (input, init) => {
      const response = await fetch(input, init);
      // A transport that limits response size and refuses this one.
      await response.body?.cancel();
      throw new Error("response byte limit exceeded");
    };
    try {
      await expect(
        new Kupmios(fixture.url, fixture.url, {
          fetchImpl,
          requestTimeoutMs: 2_000,
        }).getProtocolParameters(),
      ).rejects.toMatchObject({ kind: "transport" });
      await fixture.drained;
      expect(fixture.liveSockets()).toBe(0);
    } finally {
      await fixture.close();
    }
  });

  test("an already aborted fetchImpl signal fails before opening a connection", async () => {
    const fixture = await httpFixture((_, response) =>
      send(response, protocolResponse()),
    );
    const controller = new AbortController();
    controller.abort(new Error("already cancelled"));
    const fetchImpl: typeof fetch = (input, init) =>
      fetch(input, { ...init, signal: controller.signal });
    try {
      await expect(
        new Kupmios(fixture.url, fixture.url, {
          fetchImpl,
        }).getProtocolParameters(),
      ).rejects.toMatchObject({ kind: "transport" });
      expect(fixture.liveSockets()).toBe(0);
    } finally {
      await fixture.close();
    }
  });
});
