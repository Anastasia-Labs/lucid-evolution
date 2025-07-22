import { Koios } from "../src/koios.js";
import { ProtocolParameters, UTxO } from "@evolution-sdk/core-types";
import { assert, describe, expect, test, vi } from "vitest";
import * as PreprodConstants from "./preprod-constants.js";
import * as _Koios from "../src/internal/koios.js";

describe.skip("Koios", () => {
  const koios = new Koios("https://preprod.koios.rest/api/v1");

  test("getProtocolParameters", async () => {
    try {
      const pp: ProtocolParameters = await koios.getProtocolParameters();
      assert(pp);
    } catch (error) {
      console.error("getProtocolParameters test failed:", error);
      throw error;
    }
  });

  test("getUtxos", async () => {
    try {
      const utxos = await koios.getUtxos(
        "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      );
      assert(utxos);
    } catch (error) {
      console.error("getUtxos test failed:", error);
      throw error;
    }
  });

  test("getUtxosWithUnit", async () => {
    try {
      const utxos = await koios.getUtxosWithUnit(
        "addr_test1wpgexmeunzsykesf42d4eqet5yvzeap6trjnflxqtkcf66g0kpnxt",
        "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
      );
      expect(utxos.length).toBeGreaterThan(0);
    } catch (error) {
      console.error("getUtxosWithUnit test failed:", error);
      throw error;
    }
  });

  test("getUtxoByUnit", async () => {
    try {
      const utxo = await koios.getUtxoByUnit(
        "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
      );
      expect(utxo).toStrictEqual(PreprodConstants.discoveryUTxO);
    } catch (error) {
      console.error("getUtxoByUnit test failed:", error);
      throw error;
    }
  });

  //NOTE:
  // Koios returns the byte field as null, which is not correct
  //{
  //  hash: '6fa54f6a07204543bee0cbdf05e6d1700c86e013c26c9c8ef419f0ba',
  //  size: 2516,
  //  type: 'plutusV2',
  //  bytes: null,
  //  value: null
  //}
  test("getUtxosByOutRef", async () => {
    try {
      const utxos: UTxO[] = await koios.getUtxosByOutRef([
        {
          txHash:
            "b50e73e74a3073bc44f555928702c0ae0f555a43f1afdce34b3294247dce022d",
          outputIndex: 0,
        },
      ]);
      expect(utxos).toStrictEqual([PreprodConstants.discoveryUTxO]);
    } catch (error) {
      console.error("getUtxosByOutRef test failed:", error);
      throw error;
    }
  });

  test("getDelegation", async () => {
    try {
      const delegation = await koios.getDelegation(
        "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
      );
      assert(delegation);
    } catch (error) {
      console.error("getDelegation test failed:", error);
      throw error;
    }
  });

  test("getDatum", async () => {
    try {
      const datum = await koios.getDatum(
        "95472c2f46b89500703ec778304baf1079c58124c254bf4bf8c96e5d73869293",
      );
      expect(datum).toStrictEqual(
        "d87b9fd8799fd8799f9f581c3f2728ec78ef8b0f356e91a5662ff3124add324a7b7f5aeed69362f4581c17942ff3849b623d24e31ec709c1c94c53b9240311820a9601ad4af0581cba4ab50bdecca85162f3b8114739bc5ba3aaa6490e2b1d15ad0f9c66581c25aa4132c7ce7d8f96ee977cd921cba7681891d114d088449d1d63b2581c5309fa786856c1262d095b89adf64fe8a5255ad19142c9c537359e41ff1917701a001b77401a001b774018c818641a000927c0d8799f0a140aff021905dcd8799f9f581c1a550d5f572584e1add125b5712f709ac3b9828ad86581a4759022baff01ffffffff",
      );
    } catch (error) {
      console.error("getDatum test failed:", error);
      throw error;
    }
  });

  test("awaitTx", async () => {
    try {
      const isConfirmed: boolean = await koios.awaitTx(
        "e84eb47208757db8ed101c2114ca8953527b4a6aae51bacf17e991e5c734fec6",
      );
      expect(isConfirmed).toBe(true);
    } catch (error) {
      console.error("awaitTx test failed:", error);
      throw error;
    }
  });

  test("submitTxBadRequest", async () => {
    try {
      await expect(() => koios.submitTx("80")).rejects.toThrowError();
    } catch (error) {
      console.error("submitTxBadRequest test failed:", error);
      throw error;
    }
  });

  test("submitTx sends correct CBOR headers", async () => {
    try {
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
    } catch (error) {
      console.error("submitTx sends correct CBOR headers test failed:", error);
      vi.restoreAllMocks();
      throw error;
    }
  });

  test("evaluates additonal utxos - sample 1", async () => {
    try {
      const redeemers = await koios.evaluateTx(
        PreprodConstants.evalSample1.transaction,
        PreprodConstants.evalSample1.utxos,
      );
      assert.deepStrictEqual(
        redeemers,
        PreprodConstants.evalSample1.redeemersExUnits,
      );
    } catch (error) {
      console.error(
        "evaluates additional utxos - sample 1 test failed:",
        error,
      );
      throw error;
    }
  });

  test("evaluates additinal utxos - sample 2", async () => {
    try {
      const redeemers = await koios.evaluateTx(
        PreprodConstants.evalSample2.transaction,
        PreprodConstants.evalSample2.utxos,
      );
      assert.deepStrictEqual(
        redeemers,
        PreprodConstants.evalSample2.redeemersExUnits,
      );
    } catch (error) {
      console.error(
        "evaluates additional utxos - sample 2 test failed:",
        error,
      );
      throw error;
    }
  });

  test("evaluates additinal utxos - sample 3", async () => {
    try {
      const redeemers = await koios.evaluateTx(
        PreprodConstants.evalSample3.transaction,
        PreprodConstants.evalSample3.utxos,
      );
      assert.deepStrictEqual(
        redeemers,
        PreprodConstants.evalSample3.redeemersExUnits,
      );
    } catch (error) {
      console.error(
        "evaluates additional utxos - sample 3 test failed:",
        error,
      );
      throw error;
    }
  });

  test("evaluates additinal utxos - sample 4", async () => {
    try {
      const redeemers = await koios.evaluateTx(
        PreprodConstants.evalSample4.transaction,
        PreprodConstants.evalSample4.utxos,
      );
      assert.deepStrictEqual(
        redeemers,
        PreprodConstants.evalSample4.redeemersExUnits,
      );
    } catch (error) {
      console.error(
        "evaluates additional utxos - sample 4 test failed:",
        error,
      );
      throw error;
    }
  });
});
