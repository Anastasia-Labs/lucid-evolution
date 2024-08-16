import { assert, describe, expect, test } from "vitest";
import { ProtocolParameters, UTxO } from "@lucid-evolution/core-types";
import { Config, Effect } from "effect";
import { Blockfrost } from "../src/blockfrost.js";
import { discoveryUTxO } from "./constants.js";

export const blockfrost = await Effect.gen(function* () {
  const BLOCKFROST_API_URL = yield* Config.string(
    "VITE_BLOCKFROST_API_URL_PREPROD",
  );
  const BLOCKFROST_KEY = yield* Config.string("VITE_BLOCKFROST_KEY_PREPROD");
  return new Blockfrost(BLOCKFROST_API_URL, BLOCKFROST_KEY);
}).pipe(Effect.runPromise);

describe("Blockfrost", async () => {
  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await blockfrost.getProtocolParameters();
    assert(pp);
  });

  test("getUtxos", async () => {
    const utxos = await blockfrost.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );
    assert(utxos);
  });

  test("getUtxosWithUnit", async () => {
    const utxos = await blockfrost.getUtxosWithUnit(
      "addr_test1wpgexmeunzsykesf42d4eqet5yvzeap6trjnflxqtkcf66g0kpnxt",
      "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
    );
    expect(utxos.length).toBeGreaterThan(0);
  });

  test("getUtxoByUnit", async () => {
    const utxo = await blockfrost.getUtxoByUnit(
      "4a83e031d4c37fc7ca6177a2f3581a8eec2ce155da91f59cfdb3bb28446973636f7665727956616c696461746f72",
    );
    expect(utxo).toStrictEqual(discoveryUTxO);
  });

  test("getUtxosByOutRef", async () => {
    const utxos: UTxO[] = await blockfrost.getUtxosByOutRef([
      {
        txHash:
          "b50e73e74a3073bc44f555928702c0ae0f555a43f1afdce34b3294247dce022d",
        outputIndex: 0,
      },
    ]);
    expect(utxos).toStrictEqual([discoveryUTxO]);
  });

  test("getDelegation", async () => {
    const delegation = await blockfrost.getDelegation(
      "stake_test17zt3vxfjx9pjnpnapa65lx375p2utwxmpc8afj053h0l3vgc8a3g3",
    );
    assert(delegation);
  });

  test("getDatum", async () => {
    const datum = await blockfrost.getDatum(
      "95472c2f46b89500703ec778304baf1079c58124c254bf4bf8c96e5d73869293",
    );
    expect(datum).toStrictEqual(
      "d87b9fd8799fd8799f9f581c3f2728ec78ef8b0f356e91a5662ff3124add324a7b7f5aeed69362f4581c17942ff3849b623d24e31ec709c1c94c53b9240311820a9601ad4af0581cba4ab50bdecca85162f3b8114739bc5ba3aaa6490e2b1d15ad0f9c66581c25aa4132c7ce7d8f96ee977cd921cba7681891d114d088449d1d63b2581c5309fa786856c1262d095b89adf64fe8a5255ad19142c9c537359e41ff1917701a001b77401a001b774018c818641a000927c0d8799f0a140aff021905dcd8799f9f581c1a550d5f572584e1add125b5712f709ac3b9828ad86581a4759022baff01ffffffff",
    );
  });

  test("awaitTx", async () => {
    const isConfirmed: boolean = await blockfrost.awaitTx(
      "2a1f95a9d85bf556a3dc889831593ee963ba491ca7164d930b3af0802a9796d0",
    );
    expect(isConfirmed).toBe(true);
  });

  test("submitTxBadRequest", async () => {
    await expect(() => blockfrost.submitTx("80")).rejects.toThrowError();
  });
});
