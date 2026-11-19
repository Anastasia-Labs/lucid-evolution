import { afterEach, describe, expect, test, vi } from "vitest";
import { Schema as S } from "effect";
import { Nexus } from "../src/nexus.js";
import * as _Nexus from "../src/internal/nexus.js";
import { applyDoubleCborEncoding } from "@lucid-evolution/utils";

afterEach(() => {
  vi.restoreAllMocks();
});

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const textResponse = (body: string, status = 200) =>
  new Response(body, {
    status,
    headers: { "content-type": "text/plain" },
  });

describe("Nexus wire schemas accept explicit nulls", () => {
  // Wire-verified: Nexus serializes missing values as explicit JSON nulls,
  // not absent keys. Every non-required field must decode from null.
  test("AddressUtxoSchema decodes a live-shaped entry with null-bearing keys", () => {
    const decoded = S.decodeUnknownSync(_Nexus.AddressUtxoSchema)({
      txHash: "a".repeat(64),
      txIndex: 0,
      address: "addr_test1qexample",
      stakeAddress: null,
      paymentCred: null,
      value: "1500000",
      datumHash: null,
      inlineDatum: null,
      referenceScript: null,
      assets: null,
      spent: null,
      slot: null,
      blockHash: null,
      blockHeight: null,
      blockTime: null,
      epoch: null,
    });
    expect(_Nexus.toUTxO(decoded)).toEqual({
      txHash: "a".repeat(64),
      outputIndex: 0,
      address: "addr_test1qexample",
      assets: { lovelace: 1_500_000n },
      datumHash: undefined,
      datum: undefined,
      scriptRef: undefined,
    });
  });

  test("nested inlineDatum/referenceScript/asset fields decode from null", () => {
    const decoded = S.decodeUnknownSync(_Nexus.AddressUtxoSchema)({
      txHash: "b".repeat(64),
      txIndex: 1,
      address: "addr_test1qexample",
      value: "2000000",
      inlineDatum: { bytes: null, value: null },
      referenceScript: { hash: null, size: null, type: null, bytes: null },
      assets: [
        { unit: "lovelace", quantity: "1", policyId: null, assetName: null },
      ],
    });
    const utxo = _Nexus.toUTxO(decoded);
    expect(utxo.datum).toBeUndefined();
    expect(utxo.scriptRef).toBeUndefined();
  });

  test("AccountInfoSchema decodes explicit nulls to an unregistered-like state", () => {
    const decoded = S.decodeUnknownSync(_Nexus.AccountInfoSchema)({
      stakeAddress: null,
      active: null,
      poolId: null,
      drepId: null,
      withdrawableAmount: null,
      controlledAmount: null,
    });
    expect(_Nexus.toRewardAccountState(decoded)).toEqual({
      registered: false,
      poolId: null,
      rewards: 0n,
    });
  });

  test("DatumSchema and ProtocolParametersSchema tolerate explicit nulls", () => {
    expect(
      S.decodeUnknownSync(_Nexus.DatumSchema)({
        hash: null,
        cbor: null,
        json: null,
      }).cbor,
    ).toBeNull();

    const pp = _Nexus.toProtocolParameters(
      S.decodeUnknownSync(_Nexus.ProtocolParametersSchema)({
        minFeeA: 44,
        minFeeB: 155381,
        maxTxSize: 16384,
        maxValSize: "5000",
        keyDeposit: "2000000",
        poolDeposit: "500000000",
        drepDeposit: null,
        govActionDeposit: null,
        priceMem: 0.0577,
        priceStep: 0.0000721,
        maxTxExMem: "14000000",
        maxTxExSteps: "10000000000",
        coinsPerUtxoSize: "4310",
        collateralPercent: 150,
        maxCollateralInputs: 3,
        minFeeRefScriptCostPerByte: null,
        protocolMajorVer: null,
        protocolMinorVer: null,
        costModels: {
          PlutusV1: { "0": 0 },
          PlutusV2: { "0": 0 },
          PlutusV3: { "0": 0 },
        },
      }),
    );
    expect(pp.drepDeposit).toBe(0n);
    expect(pp.minFeeRefScriptCostPerByte).toBe(0);
    expect(pp.protocolMajorVersion).toBeUndefined();
  });

  test("OutRefUtxoSchema decodes explicit nulls", () => {
    const decoded = S.decodeUnknownSync(_Nexus.OutRefUtxoSchema)({
      tx_hash: "c".repeat(64),
      output_index: 0,
      owner_addr: "addr_test1qexample",
      owner_stake_addr: null,
      amounts: null,
      lovelace_amount: null,
      data_hash: null,
      inline_datum: null,
      inline_datum_json: null,
      reference_script_hash: null,
      script_ref: null,
      consumed_by_tx: null,
    });
    expect(_Nexus.toUTxOFromOutRef(decoded).assets).toEqual({ lovelace: 0n });
  });

  test("getUtxos decodes a live-shaped page with explicit nulls end-to-end", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse([
        {
          txHash: "d".repeat(64),
          txIndex: 0,
          address: "addr_test1qexample",
          stakeAddress: null,
          paymentCred: null,
          value: "1000000",
          datumHash: null,
          inlineDatum: null,
          referenceScript: null,
          assets: null,
          spent: null,
          slot: null,
          blockHash: null,
          blockHeight: null,
          blockTime: null,
          epoch: null,
        },
      ]),
    );
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await expect(nexus.getUtxos("addr_test1qexample")).resolves.toEqual([
      {
        txHash: "d".repeat(64),
        outputIndex: 0,
        address: "addr_test1qexample",
        assets: { lovelace: 1_000_000n },
        datumHash: undefined,
        datum: undefined,
        scriptRef: undefined,
      },
    ]);
  });
});

describe("Nexus internal mappers", () => {
  test("toUTxO maps an address UTxO with a native asset, inline datum, and reference script", () => {
    const scriptBytes = "5901";
    const utxo = _Nexus.toUTxO({
      txHash: "a".repeat(64),
      txIndex: 0,
      address: "addr_test1qexample",
      value: "1500000",
      inlineDatum: { bytes: "d87980" },
      referenceScript: { type: "plutusV2", bytes: scriptBytes },
      assets: [{ unit: `${"11".repeat(28)}4c75636964`, quantity: "7" }],
    });

    expect(utxo).toEqual({
      txHash: "a".repeat(64),
      outputIndex: 0,
      address: "addr_test1qexample",
      assets: {
        lovelace: 1_500_000n,
        [`${"11".repeat(28)}4c75636964`]: 7n,
      },
      datumHash: undefined,
      datum: "d87980",
      scriptRef: {
        type: "PlutusV2",
        script: applyDoubleCborEncoding(scriptBytes),
      },
    });
  });

  test("toUTxO falls back to the datum hash when there is no inline datum", () => {
    const utxo = _Nexus.toUTxO({
      txHash: "b".repeat(64),
      txIndex: 1,
      address: "addr_test1qexample",
      value: "2000000",
      datumHash: "c".repeat(64),
    });

    expect(utxo.datum).toBeUndefined();
    expect(utxo.datumHash).toBe("c".repeat(64));
    expect(utxo.scriptRef).toBeUndefined();
  });

  test.each([
    ["plutusV1", "PlutusV1"],
    ["PLUTUS_V1", "PlutusV1"],
    ["plutusV3", "PlutusV3"],
    ["native", "Native"],
    ["timelock", "Native"],
    ["plutusV2", "PlutusV2"],
    ["unknown", "PlutusV2"],
  ] as const)(
    "normalizes reference script type %s to %s",
    (wireType, expectedType) => {
      const utxo = _Nexus.toUTxO({
        txHash: "d".repeat(64),
        txIndex: 0,
        address: "addr_test1qexample",
        value: "1000000",
        referenceScript: { type: wireType, bytes: "5901" },
      });
      expect(utxo.scriptRef?.type).toBe(expectedType);
    },
  );

  test("toUTxOFromOutRef maps the snake_case out-ref DTO", () => {
    const utxo = _Nexus.toUTxOFromOutRef({
      tx_hash: "e".repeat(64),
      output_index: 2,
      owner_addr: "addr_test1qexample",
      amounts: [
        { unit: "lovelace", quantity: "3000000" },
        { unit: `${"22".repeat(28)}4e4654`, quantity: "1" },
      ],
      data_hash: "f".repeat(64),
      inline_datum: null,
    });

    expect(utxo).toEqual({
      txHash: "e".repeat(64),
      outputIndex: 2,
      address: "addr_test1qexample",
      assets: {
        lovelace: 3_000_000n,
        [`${"22".repeat(28)}4e4654`]: 1n,
      },
      datumHash: "f".repeat(64),
      datum: undefined,
      scriptRef: undefined,
    });
  });

  test("toUTxOFromOutRef falls back to lovelace_amount when amounts omits lovelace", () => {
    const utxo = _Nexus.toUTxOFromOutRef({
      tx_hash: "1".repeat(64),
      output_index: 0,
      owner_addr: "addr_test1qexample",
      lovelace_amount: 5_000_000,
    });

    expect(utxo.assets).toEqual({ lovelace: 5_000_000n });
  });

  // "4342abcd" is a double-CBOR-encoded bytestring (43 wraps 42 wraps abcd),
  // so applyDoubleCborEncoding leaves it untouched — assertions stay literal.
  const doubleEncodedScript = "4342abcd";

  test.each([
    ["8200", "Native"],
    ["8201", "PlutusV1"],
    ["8202", "PlutusV2"],
    ["8203", "PlutusV3"],
  ] as const)(
    "unwrapScriptRef strips the %s language tag and maps it to %s",
    (tag, expectedType) => {
      expect(_Nexus.unwrapScriptRef(`${tag}${doubleEncodedScript}`)).toEqual({
        type: expectedType,
        script: doubleEncodedScript,
      });
    },
  );

  test("unwrapScriptRef falls back to PlutusV2 with the whole string when no language tag is present", () => {
    expect(_Nexus.unwrapScriptRef(doubleEncodedScript)).toEqual({
      type: "PlutusV2",
      script: doubleEncodedScript,
    });
  });

  test("toUTxOFromOutRef unwraps a language-tagged script_ref", () => {
    const utxo = _Nexus.toUTxOFromOutRef({
      tx_hash: "2".repeat(64),
      output_index: 0,
      owner_addr: "addr_test1qexample",
      script_ref: `8202${doubleEncodedScript}`,
    });

    expect(utxo.scriptRef).toEqual({
      type: "PlutusV2",
      script: doubleEncodedScript,
    });
  });

  test("toUTxOFromOutRef treats an untagged script_ref as PlutusV2 (fallback)", () => {
    const utxo = _Nexus.toUTxOFromOutRef({
      tx_hash: "2".repeat(64),
      output_index: 0,
      owner_addr: "addr_test1qexample",
      script_ref: doubleEncodedScript,
    });

    expect(utxo.scriptRef).toEqual({
      type: "PlutusV2",
      script: doubleEncodedScript,
    });
  });

  test("toUTxO defensively unwraps a language-tagged referenceScript.bytes", () => {
    const utxo = _Nexus.toUTxO({
      txHash: "3".repeat(64),
      txIndex: 0,
      address: "addr_test1qexample",
      value: "1000000",
      referenceScript: {
        type: "plutusV2",
        bytes: `8203${doubleEncodedScript}`,
      },
    });

    // The embedded 8203 tag wins over the declared plutusV2 type.
    expect(utxo.scriptRef).toEqual({
      type: "PlutusV3",
      script: doubleEncodedScript,
    });
  });

  test("toProtocolParameters sorts numeric-keyed cost models and keeps insertion order for op-name keys", () => {
    const pp = _Nexus.toProtocolParameters({
      minFeeA: 44,
      minFeeB: 155381,
      maxTxSize: 16384,
      maxValSize: "5000",
      keyDeposit: "2000000",
      poolDeposit: "500000000",
      priceMem: 0.0577,
      priceStep: 0.0000721,
      maxTxExMem: "14000000",
      maxTxExSteps: "10000000000",
      coinsPerUtxoSize: "4310",
      collateralPercent: 150,
      maxCollateralInputs: 3,
      costModels: {
        PlutusV1: { "2": 22, "0": 0, "1": 11 },
        PlutusV2: { addInteger: 100, subtractInteger: 200 },
        PlutusV3: { "0": 5 },
      },
    });

    expect(pp.costModels.PlutusV1).toEqual([0, 11, 22]);
    expect(pp.costModels.PlutusV2).toEqual([100, 200]);
    expect(pp.costModels.PlutusV3).toEqual([5]);
    expect(pp.maxValSize).toBe(5000);
    expect(pp.keyDeposit).toBe(2_000_000n);
    expect(pp.drepDeposit).toBe(0n);
  });

  test("toProtocolParameters throws when a required cost model is missing", () => {
    expect(() =>
      _Nexus.toProtocolParameters({
        minFeeA: 44,
        minFeeB: 155381,
        maxTxSize: 16384,
        maxValSize: "5000",
        keyDeposit: "2000000",
        poolDeposit: "500000000",
        priceMem: 0.0577,
        priceStep: 0.0000721,
        maxTxExMem: "14000000",
        maxTxExSteps: "10000000000",
        coinsPerUtxoSize: "4310",
        collateralPercent: 150,
        maxCollateralInputs: 3,
        costModels: {
          PlutusV1: { "0": 0 },
          PlutusV2: { "0": 0 },
        },
      }),
    ).toThrowError(/missing cost model/);
  });

  test("toRewardAccountState maps an active delegated account", () => {
    expect(
      _Nexus.toRewardAccountState({
        active: true,
        poolId: "pool1abc",
        withdrawableAmount: "1234",
      }),
    ).toEqual({ registered: true, poolId: "pool1abc", rewards: 1234n });
  });

  test.each([
    ["spend", "spend"],
    ["mint", "mint"],
    ["certificate", "publish"],
    ["cert", "publish"],
    ["withdrawal", "withdraw"],
    ["reward", "withdraw"],
    ["voting", "vote"],
    ["proposing", "propose"],
    ["SPEND", "spend"],
  ] as const)("toEvalRedeemers maps redeemerTag %s to %s", (wire, lucid) => {
    const [redeemer] = _Nexus.toEvalRedeemers([
      { redeemerTag: wire, index: 0, exUnits: { mem: 1, steps: 2 } },
    ]);
    expect(redeemer).toEqual({
      ex_units: { mem: 1, steps: 2 },
      redeemer_index: 0,
      redeemer_tag: lucid,
    });
  });

  test("toEvalRedeemers throws on an unrecognized redeemer tag", () => {
    expect(() =>
      _Nexus.toEvalRedeemers([
        { redeemerTag: "unknown", index: 0, exUnits: { mem: 1, steps: 2 } },
      ]),
    ).toThrowError(/Unknown redeemer tag/);
  });
});

describe("Nexus provider requests", () => {
  test("sends the API key header and network query param", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse([]));
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await nexus.getUtxos("addr_test1qexample");

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(new URL(url as string).searchParams.get("network")).toBe(
      "CARDANO_PREPROD",
    );
    expect(new URL(url as string).pathname).toBe(
      "/api/addresses/addr_test1qexample/utxos",
    );
    const headers = init?.headers as Headers;
    expect(new Headers(headers).get("x-api-key")).toBe("test-key");
  });

  test("paginates until a batch smaller than the page size is returned", async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => ({
      txHash: i.toString(16).padStart(64, "0"),
      txIndex: 0,
      address: "addr_test1qexample",
      value: "1000000",
    }));
    const lastPage = [
      {
        txHash: "f".repeat(64),
        txIndex: 0,
        address: "addr_test1qexample",
        value: "2000000",
      },
    ];
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse(fullPage))
      .mockResolvedValueOnce(jsonResponse(lastPage));
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    const utxos = await nexus.getUtxos("addr_test1qexample");

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(utxos).toHaveLength(101);
  });

  test("maps a 404 reward account to an unregistered state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ error: "not found" }, 404),
    );
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await expect(
      nexus.getRewardAccount(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      ),
    ).resolves.toEqual({ registered: false, poolId: null, rewards: 0n });
  });

  test("surfaces the error envelope message, not the raw body, on failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ error: "invalid api key" }, 401),
    );
    const nexus = new Nexus({ apiKey: "bad-key", network: "Preprod" });

    await expect(nexus.getProtocolParameters()).rejects.toThrow(
      /invalid api key/,
    );
  });

  test("submitTx trims a quoted plain-text tx hash", async () => {
    const txHash = "a".repeat(64);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      textResponse(`"${txHash}"`),
    );
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await expect(nexus.submitTx("84a300...")).resolves.toBe(txHash);
  });

  test("getUtxoByUnit locates via the asset endpoint then fetches the full UTxO via the out-ref endpoint", async () => {
    const doubleEncodedScript = "4342abcd";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      // 1st call: GET /api/assets/{unit}/utxos — locates the out-ref (thin entry).
      .mockResolvedValueOnce(
        jsonResponse([
          {
            txHash: "a".repeat(64),
            txIndex: 3,
            address: "addr_test1qexample",
            value: "1500000",
            datumHash: null,
            inlineDatum: null,
            referenceScript: null,
          },
        ]),
      )
      // 2nd call: POST /api/transactions/utxos — full data incl. tagged script_ref.
      .mockResolvedValueOnce(
        jsonResponse([
          {
            tx_hash: "a".repeat(64),
            output_index: 3,
            owner_addr: "addr_test1qexample",
            amounts: [
              { unit: "lovelace", quantity: "1500000" },
              { unit: `${"11".repeat(28)}4e4654`, quantity: "1" },
            ],
            inline_datum: "d87980",
            script_ref: `8202${doubleEncodedScript}`,
          },
        ]),
      );
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    const utxo = await nexus.getUtxoByUnit(`${"11".repeat(28)}4e4654`);

    expect(utxo).toEqual({
      txHash: "a".repeat(64),
      outputIndex: 3,
      address: "addr_test1qexample",
      assets: { lovelace: 1_500_000n, [`${"11".repeat(28)}4e4654`]: 1n },
      datumHash: undefined,
      datum: "d87980",
      scriptRef: { type: "PlutusV2", script: doubleEncodedScript },
    });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    const [firstUrl] = fetchSpy.mock.calls[0]!;
    expect(new URL(firstUrl as string).pathname).toBe(
      `/api/assets/${"11".repeat(28)}4e4654/utxos`,
    );
    const [secondUrl, secondInit] = fetchSpy.mock.calls[1]!;
    expect(new URL(secondUrl as string).pathname).toBe(
      "/api/transactions/utxos",
    );
    expect(secondInit?.method).toBe("POST");
    const rawBody = secondInit?.body;
    const bodyText =
      typeof rawBody === "string"
        ? rawBody
        : new TextDecoder().decode(rawBody as Uint8Array);
    expect(JSON.parse(bodyText)).toEqual([
      { txHash: "a".repeat(64), outputIndex: 3 },
    ]);
  });

  test("getUtxoByUnit throws when the unit is not found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse([]));
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await expect(nexus.getUtxoByUnit("a".repeat(60))).rejects.toThrow(
      "Unit not found",
    );
  });

  test("getUtxoByUnit throws when the unit is held by more than one UTxO", async () => {
    const dto = {
      txHash: "a".repeat(64),
      txIndex: 0,
      address: "addr_test1qexample",
      value: "1000000",
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse([dto, { ...dto, txIndex: 1 }]),
    );
    const nexus = new Nexus({ apiKey: "test-key", network: "Preprod" });

    await expect(nexus.getUtxoByUnit("a".repeat(60))).rejects.toThrow(
      "Unit needs to be an NFT or only held by one address.",
    );
  });
});
