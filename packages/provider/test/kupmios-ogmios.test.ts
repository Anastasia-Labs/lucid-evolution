import { afterEach, describe, expect, test, vi } from "vitest";
import { Kupmios } from "../src/kupmios.js";

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
    protocolParametersUpdate: {
      security: "51/100",
    },
  },
  delegateRepresentativeVotingThresholds: {
    noConfidence: "51/100",
    constitutionalCommittee: {
      default: "51/100",
      stateOfNoConfidence: "51/100",
    },
    constitution: "51/100",
    hardForkInitiation: "51/100",
    protocolParametersUpdate: {
      network: "51/100",
      economic: "51/100",
      technical: "51/100",
      governance: "51/100",
    },
    treasuryWithdrawals: "51/100",
  },
  constitutionalCommitteeMinSize: 7,
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
  minStakePoolCost: { ada: { lovelace: 170_000_000 } },
  minUtxoDepositConstant: { ada: { lovelace: 0 } },
  minUtxoDepositCoefficient: 4_310,
  plutusCostModels: {
    "plutus:v1": [1, 2],
    "plutus:v2": [3, 4],
    "plutus:v3": [5, 6],
  },
  scriptExecutionPrices: {
    memory: "577/10000",
    cpu: "721/10000000",
  },
  maxExecutionUnitsPerTransaction: {
    memory: 14_000_000,
    cpu: 10_000_000_000,
  },
  maxExecutionUnitsPerBlock: {
    memory: 62_000_000,
    cpu: 20_000_000_000,
  },
  maxValueSize: { bytes: 5_000 },
  collateralPercentage: 150,
  maxCollateralInputs: 3,
  version: { major: 10, minor: 0 },
};

const protocolParametersResponse = (result: unknown) =>
  new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      method: "queryLedgerState/protocolParameters",
      result,
      id: null,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  );

const queryProtocolParameters = async (result: unknown) => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    protocolParametersResponse(result),
  );
  return new Kupmios(
    "http://kupo.test",
    "http://ogmios.test",
  ).getProtocolParameters();
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Kupmios Ogmios JSON-RPC handling", () => {
  test("accepts an Ogmios v6 max reference scripts size", async () => {
    await expect(
      queryProtocolParameters({
        ...baseProtocolParameters,
        maxReferenceScriptsSize: { bytes: 204_800 },
      }),
    ).resolves.toBeDefined();
  });

  test("accepts an Ogmios v7 max reference scripts size", async () => {
    await expect(
      queryProtocolParameters({
        ...baseProtocolParameters,
        maxReferenceScriptsSizePerTransaction: { bytes: 204_800 },
      }),
    ).resolves.toBeDefined();
  });

  test("accepts identical Ogmios v6 and v7 max reference scripts sizes", async () => {
    await expect(
      queryProtocolParameters({
        ...baseProtocolParameters,
        maxReferenceScriptsSize: { bytes: 204_800 },
        maxReferenceScriptsSizePerTransaction: { bytes: 204_800 },
      }),
    ).resolves.toBeDefined();
  });

  test("rejects conflicting Ogmios v6 and v7 max reference scripts sizes", async () => {
    await expect(
      queryProtocolParameters({
        ...baseProtocolParameters,
        maxReferenceScriptsSize: { bytes: 204_800 },
        maxReferenceScriptsSizePerTransaction: { bytes: 102_400 },
      }),
    ).rejects.toThrow(
      "Conflicting Ogmios protocol parameters: maxReferenceScriptsSize and maxReferenceScriptsSizePerTransaction differ",
    );
  });

  test("rejects a missing max reference scripts size through schema validation", async () => {
    await expect(
      queryProtocolParameters(baseProtocolParameters),
    ).rejects.toThrow(/maxReferenceScriptsSize/);
  });

  test("rejects a malformed Ogmios v7 max reference scripts size", async () => {
    await expect(
      queryProtocolParameters({
        ...baseProtocolParameters,
        maxReferenceScriptsSizePerTransaction: { bytes: "oops" },
      }),
    ).rejects.toThrow(/bytes/);
  });

  test("converts equivalent Ogmios v6 and v7 protocol parameters identically", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        protocolParametersResponse({
          ...baseProtocolParameters,
          maxReferenceScriptsSize: { bytes: 204_800 },
        }),
      )
      .mockResolvedValueOnce(
        protocolParametersResponse({
          ...baseProtocolParameters,
          maxReferenceScriptsSizePerTransaction: { bytes: 204_800 },
        }),
      );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    const v6 = await kupmios.getProtocolParameters();
    const v7 = await kupmios.getProtocolParameters();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(v7).toStrictEqual(v6);
  });

  test("getDelegation accepts Ogmios reward account summaries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "queryLedgerState/rewardAccountSummaries",
          result: [
            {
              from: "script",
              credential:
                "97161932314329867d0f754f9a3ea055c5b8db0e0fd4c9f48ddff8b1",
              stakePool: {
                id: "pool1e0arfuamnymdkmjztvkryasxv9d8u8key27ajgc4mquz2nr8mk9",
              },
              rewards: { ada: { lovelace: 1505083629601 } },
              deposit: { ada: { lovelace: 2000000 } },
            },
          ],
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      kupmios.getDelegation(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      ),
    ).resolves.toStrictEqual({
      poolId: "pool1e0arfuamnymdkmjztvkryasxv9d8u8key27ajgc4mquz2nr8mk9",
      rewards: 1505083629601n,
    });
  });

  test("getDelegation returns empty delegation for empty Ogmios summaries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "queryLedgerState/rewardAccountSummaries",
          result: [],
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(
      kupmios.getDelegation(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      ),
    ).resolves.toStrictEqual({
      poolId: null,
      rewards: 0n,
    });
  });

  test("evaluateTx surfaces Ogmios JSON-RPC errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "evaluateTransaction",
          error: {
            code: 3010,
            message:
              "Some scripts of the transactions terminated with error(s).",
            data: [
              {
                error: {
                  code: 3004,
                  message:
                    "Unable to create the evaluation context from the given transaction.",
                  data: {
                    reason:
                      "Unknown transaction input (missing from UTxO set): abcd#0",
                  },
                },
              },
            ],
          },
          id: null,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const kupmios = new Kupmios("http://kupo.test", "http://ogmios.test");

    await expect(kupmios.evaluateTx("80")).rejects.toThrow(
      /Ogmios JSON-RPC error 3010: .*Unknown transaction input/,
    );
  });
});
