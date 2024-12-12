import { Koios } from "../src/koios.js";
import { ProtocolParameters, UTxO } from "@lucid-evolution/core-types";
import { assert, describe, expect, test, vi } from "vitest";
import * as PreprodConstants from "./preprod-constants.js";
import * as _Koios from "../src/internal/koios.js";

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
});
