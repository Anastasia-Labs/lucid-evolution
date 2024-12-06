import { Koios } from "../src/koios.js";
import { ProtocolParameters, UTxO } from "@lucid-evolution/core-types";
import { assert, beforeEach, describe, expect, test, vi } from "vitest";
import * as PreprodConstants from "./preprod-constants.js";
import * as _Koios from "../src/internal/koios.js";
import { Effect } from "effect";

//TODO: improve test assetion
describe.sequential("Koios", () => {
  const koios = new Koios("https://preprod.koios.rest/api/v1");
  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await koios.getProtocolParameters();
    assert(pp);
  });

  test("getUtxos", async () => {
    const utxos = await koios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );
    assert(utxos);
  });

  test("getUtxosWithUnit", async () => {
    const utxos = await koios.getUtxosWithUnit(
      "addr_test1wpgexmeunzsykesf42d4eqet5yvzeap6trjnflxqtkcf66g0kpnxt",
      "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
    );
    expect(utxos.length).toBeGreaterThan(0);
  });

  test("getUtxoByUnit", async () => {
    const utxo = await koios.getUtxoByUnit(
      "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
    );
    expect(utxo).toStrictEqual(PreprodConstants.discoveryUTxO);
  });

  test.skip("getUtxosByOutRef", async () => {
    const utxos: UTxO[] = await koios.getUtxosByOutRef([
      {
        txHash:
          "b50e73e74a3073bc44f555928702c0ae0f555a43f1afdce34b3294247dce022d",
        outputIndex: 0,
      },
    ]);
    expect(utxos).toStrictEqual([PreprodConstants.discoveryUTxO]);
  });

  test("getDelegation", async () => {
    const delegation = await koios.getDelegation(
      "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
    );
    assert(delegation);
  });

  test("getDatum", async () => {
    const datum = await koios.getDatum(
      "95472c2f46b89500703ec778304baf1079c58124c254bf4bf8c96e5d73869293",
    );
    expect(datum).toStrictEqual(
      "d87b9fd8799fd8799f9f581c3f2728ec78ef8b0f356e91a5662ff3124add324a7b7f5aeed69362f4581c17942ff3849b623d24e31ec709c1c94c53b9240311820a9601ad4af0581cba4ab50bdecca85162f3b8114739bc5ba3aaa6490e2b1d15ad0f9c66581c25aa4132c7ce7d8f96ee977cd921cba7681891d114d088449d1d63b2581c5309fa786856c1262d095b89adf64fe8a5255ad19142c9c537359e41ff1917701a001b77401a001b774018c818641a000927c0d8799f0a140aff021905dcd8799f9f581c1a550d5f572584e1add125b5712f709ac3b9828ad86581a4759022baff01ffffffff",
    );
  });

  test("awaitTx", async () => {
    const isConfirmed: boolean = await koios.awaitTx(
      "e84eb47208757db8ed101c2114ca8953527b4a6aae51bacf17e991e5c734fec6",
    );
    expect(isConfirmed).toBe(true);
  });

  test("submitTxBadRequest", async () => {
    await expect(() => koios.submitTx("80")).rejects.toThrowError();
  });
  test("submitTx sends correct CBOR headers", async () => {
    const mockTransaction = PreprodConstants.evalSample1.transaction;
    const expectedTxHash =
      "e84eb47208757db8ed101c2114ca8953527b4a6aae51bacf17e991e5c734fec6";

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "content-type": "application/json",
      }),
      text: () => Promise.resolve(JSON.stringify(expectedTxHash)),
      json: () => Promise.resolve(expectedTxHash),
      body: null,
    } as Response);

    const koios = new Koios("https://preprod.koios.rest/api/v1");
    expect(await koios.submitTx(mockTransaction)).toBe(expectedTxHash);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "https://preprod.koios.rest/api/v1/submittx",
      }),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          get: expect.any(Function),
        }),
        body: expect.any(Uint8Array),
      }),
    );
    const [, options] = fetchSpy.mock.calls[0];
    const headers = options?.headers as Headers;
    expect(headers.get("content-type")).toBe("application/cbor");
    expect(options?.body).toBeInstanceOf(Uint8Array);

    vi.restoreAllMocks();
  });
  test("evaluates additonal utxos - sample 1", async () => {
    const redeemers = await koios.evaluateTx(
      PreprodConstants.evalSample1.transaction,
      PreprodConstants.evalSample1.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample1.redeemersExUnits,
    );
  });

  test("evaluates additinal utxos - sample 2", async () => {
    const redeemers = await koios.evaluateTx(
      PreprodConstants.evalSample2.transaction,
      PreprodConstants.evalSample2.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample2.redeemersExUnits,
    );
  });

  test("evaluates additinal utxos - sample 3", async () => {
    const redeemers = await koios.evaluateTx(
      PreprodConstants.evalSample3.transaction,
      PreprodConstants.evalSample3.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample3.redeemersExUnits,
    );
  });

  test("evaluates additinal utxos - sample 4", async () => {
    const redeemers = await koios.evaluateTx(
      PreprodConstants.evalSample4.transaction,
      PreprodConstants.evalSample4.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample4.redeemersExUnits,
    );
  });

  describe("Token Authentication", () => {
    const MOCK_TOKEN = "test-token-123";
    const BASE_URL = "https://preprod.koios.rest/api/v1";
    let koiosWithToken: Koios;

    beforeEach(() => {
      vi.restoreAllMocks();
      koiosWithToken = new Koios(BASE_URL, MOCK_TOKEN);
    });

    test("getHeadersWithToken utility function", () => {
      // Test with token
      const headersWithToken = _Koios.getHeadersWithToken(MOCK_TOKEN);
      expect(headersWithToken).toEqual({
        Authorization: `Bearer ${MOCK_TOKEN}`,
      });

      // Test without token
      const headersWithoutToken = _Koios.getHeadersWithToken(undefined);
      expect(headersWithoutToken).toEqual({});

      // Test merging with existing headers
      const existingHeaders = { "Content-Type": "application/json" };
      const mergedHeaders = _Koios.getHeadersWithToken(
        MOCK_TOKEN,
        existingHeaders,
      );
      expect(mergedHeaders).toEqual({
        Authorization: `Bearer ${MOCK_TOKEN}`,
        "Content-Type": "application/json",
      });
    });

    test("constructor properly stores token", () => {
      // @ts-expect-error accessing private field for testing
      expect(koiosWithToken.token).toBe(MOCK_TOKEN);

      const koiosWithoutToken = new Koios("https://preprod.koios.rest/api/v1");
      // @ts-expect-error accessing private field for testing
      expect(koiosWithoutToken.token).toBeUndefined();
    });

    test("getProtocolParameters includes token", async () => {
      const mockResponse = [
        {
          min_fee_a: 44,
          min_fee_b: 155381,
          max_tx_size: 16384,
          max_val_size: 5000,
          key_deposit: "2000000",
          pool_deposit: "500000000",
          price_mem: 0.0577,
          price_step: 0.0000721,
          max_tx_ex_mem: 14000000,
          max_tx_ex_steps: 10000000000,
          max_block_ex_mem: 62000000,
          max_block_ex_steps: 20000000000,
          extra_entropy: null,
          protocol_major: 8,
          protocol_minor: 0,
          min_utxo_value: "1000000",
          min_pool_cost: "340000000",
          nonce: "1",
          block_hash: null,
          collateral_percent: 150,
          max_collateral_inputs: 3,
          coins_per_utxo_size: "4310",
          cost_models: {
            PlutusV1: [1],
            PlutusV2: [1],
            PlutusV3: [1],
          },
          epoch_no: 1,
          max_block_size: 90112,
          max_bh_size: 1100,
          min_fee_ref_script_cost_per_byte: 4310,
          max_epoch: 18,
          optimal_pool_count: 500,
          influence: 0.3,
          monetary_expand_rate: 0.003,
          treasury_growth_rate: 0.2,
          decentralisation: 0,
          pvt_motion_no_confidence: 1,
          pvt_committee_normal: 1,
          pvt_committee_no_confidence: 1,
          pvt_hard_fork_initiation: 1,
          pvtpp_security_group: 1,
          dvt_motion_no_confidence: 1,
          dvt_committee_normal: 1,
          dvt_committee_no_confidence: 1,
          dvt_update_to_constitution: 1,
          dvt_hard_fork_initiation: 1,
          dvt_p_p_network_group: 1,
          dvt_p_p_economic_group: 1,
          dvt_p_p_technical_group: 1,
          dvt_p_p_gov_group: 1,
          dvt_treasury_withdrawal: 1,
          committee_min_size: 1,
          committee_max_term_length: 1,
          gov_action_lifetime: 1,
          gov_action_deposit: "1",
          drep_deposit: "1",
          drep_activity: 1,
        },
      ];

      const fetchSpy = vi.spyOn(global, "fetch").mockImplementation(
        async () =>
          ({
            ok: true,
            status: 200,
            statusText: "OK",
            headers: new Headers({ "content-type": "application/json" }),
            json: () => Promise.resolve(mockResponse),
            text: () => Promise.resolve(JSON.stringify(mockResponse)),
          }) as Response,
      );

      await koiosWithToken.getProtocolParameters();

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];

      expect(url.toString()).toBe(`${BASE_URL}/epoch_params?limit=1`);
      expect(options?.method).toBe("GET");
      const headers = options?.headers as Headers;
      expect(headers.get("authorization")).toBe(`Bearer ${MOCK_TOKEN}`);

      fetchSpy.mockRestore();
    });

    test("getDatum includes token", async () => {
      const mockResponse = [
        {
          bytes: "mock-datum",
        },
      ];

      const fetchSpy = vi.spyOn(global, "fetch").mockImplementation(
        async () =>
          ({
            ok: true,
            status: 200,
            statusText: "OK",
            headers: new Headers({ "content-type": "application/json" }),
            json: () => Promise.resolve(mockResponse),
            text: () => Promise.resolve(JSON.stringify(mockResponse)),
          }) as Response,
      );

      const datumHash = "test-datum-hash";
      await koiosWithToken.getDatum(datumHash);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];

      // URL and method verification
      expect(url.toString()).toBe(`${BASE_URL}/datum_info`);
      expect(options?.method).toBe("POST");

      // Headers verification
      const headers = options?.headers as Headers;
      expect(headers.get("authorization")).toBe(`Bearer ${MOCK_TOKEN}`);
      expect(headers.get("content-type")).toBe("application/json");

      // Body verification
      const decoder = new TextDecoder();
      const bodyText = decoder.decode(options?.body as Uint8Array);
      const bodyJson = JSON.parse(bodyText);
      expect(bodyJson).toEqual({
        _datum_hashes: [datumHash],
      });

      fetchSpy.mockRestore();
    });

    test("submitTx includes token with CBOR headers", async () => {
      const mockTransaction = PreprodConstants.evalSample1.transaction;
      const expectedTxHash =
        "e84eb47208757db8ed101c2114ca8953527b4a6aae51bacf17e991e5c734fec6";

      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({
          "content-type": "application/json",
        }),
        text: () => Promise.resolve(JSON.stringify(expectedTxHash)),
        json: () => Promise.resolve(expectedTxHash),
        body: null,
      } as Response);

      expect(await koiosWithToken.submitTx(mockTransaction)).toBe(expectedTxHash);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];

      expect(url.toString()).toBe(`${BASE_URL}/submittx`);
      expect(options?.method).toBe("POST");
      const headers = options?.headers as Headers;
      expect(headers.get("authorization")).toBe(`Bearer ${MOCK_TOKEN}`);
      expect(headers.get("content-type")).toBe("application/cbor");

      fetchSpy.mockRestore();
    });
  });
});
