import { assert, describe, expect, test } from "vitest";
import { ProtocolParameters, UTxO } from "@evolution-sdk/core-types";
import { Config, Effect } from "effect";
import { Blockfrost } from "../src/blockfrost.js";
import * as PreprodConstants from "./preprod-constants.js";

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
      // "addr_test1wpgexmeunzsykesf42d4eqet5yvzeap6trjnflxqtkcf66g0kpnxt", // this contract has too many utxos
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
    expect(utxo).toStrictEqual(PreprodConstants.discoveryUTxO);
  });

  test("getUtxosByOutRef", async () => {
    const utxos: UTxO[] = await blockfrost.getUtxosByOutRef([
      {
        txHash:
          "b50e73e74a3073bc44f555928702c0ae0f555a43f1afdce34b3294247dce022d",
        outputIndex: 0,
      },
    ]);
    expect(utxos).toStrictEqual([PreprodConstants.discoveryUTxO]);
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

  test("evaluates additonal utxos - sample 1", async () => {
    const redeemers = await blockfrost.evaluateTx(
      PreprodConstants.evalSample1.transaction,
      PreprodConstants.evalSample1.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample1.redeemersExUnits,
    );
  });

  test("evaluates additinal utxos - sample 2", async () => {
    const redeemers = await blockfrost.evaluateTx(
      PreprodConstants.evalSample2.transaction,
      PreprodConstants.evalSample2.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample2.redeemersExUnits,
    );
  });
  // NOTE: The following transaction doesn't work with Blockfrost's TX evaluation.
  // This is likely because they have not upgraded from Ogmios 5.6 to Ogmios 6.0 or to the latest version.
  // Error: Could not evaluate the transaction: {"type":"jsonwsp/fault","version":"1.0","servicename":"ogmios","fault":{"code":"client","string":"Invalid request: failed to decode payload from base64 or base16."},"reflection":{"id":"17f6c075-6d70-444e-a0e5-7cbbd064508c"}}.
  // Transaction: 84ac00828258209dec9370f3c40d5934f4ea67dcacf22f0cdb74acbbecf4638ae141748e9c6601008258209dec9370f3c40d5934f4ea67dcacf22f0cdb74acbbecf4638ae141748e9c66010101828258390091d2bdc73e1de0d2cc776d3dc4e58db5d0ebca3772dac052aa49fdc8c2ab6459a71e7172b510aadb5b60f6da53a7116e45ca7f60c4145a61821a002d0c9ea1581c6af660f258a83733ab5bbf1c779286d3d9c7881ccad209fe6d0ffc9ba14c4d5954455354544f4b454e321a08f0d1808258390091d2bdc73e1de0d2cc776d3dc4e58db5d0ebca3772dac052aa49fdc8c2ab6459a71e7172b510aadb5b60f6da53a7116e45ca7f60c4145a61821b0000000253dcc429a2581c6af660f258a83733ab5bbf1c779286d3d9c7881ccad209fe6d0ffc9ba14c4d5954455354544f4b454e321aa9df8c80581cc993b4822e24f62fbb291bef2feea56dc70d93122dcb15715b0427aea14c4d5954455354544f4b454e311a77359400021a00095dfb031a039152bc05a2581df05724eab01c199500967c1f96e827811e6618b9bf521f6b46c427007800581df0c0c837b81dd43f25cc77446ad70d669379bdab898d83922adff1d86500081a0391502809a1581caacd6c58a4894b4ca6c3ea429fcd4318b301d9c0eec7f031d08a0780a35820e6bc4fcf950a505075ce1e9206c48a58dbb4255fdafdec9617f12c538ed025b1205820c784a5780f4637fa9027e6eedabc24e425a458a481b1be6ae4dee6d7081dbb7b2058209cc2aa27327ee7b4ca48c0cf2fa035579cfc1d16fcc6222bd673b02dfc393e55200b58203c95151f49608a1dde1bc4cd4f25a50733e271792fec4b05f0f949ac599c8bb70d818258209dec9370f3c40d5934f4ea67dcacf22f0cdb74acbbecf4638ae141748e9c660101108258390091d2bdc73e1de0d2cc776d3dc4e58db5d0ebca3772dac052aa49fdc8c2ab6459a71e7172b510aadb5b60f6da53a7116e45ca7f60c4145a61821b000000025399d6e4a2581cc993b4822e24f62fbb291bef2feea56dc70d93122dcb15715b0427aea14c4d5954455354544f4b454e311a77359400581c6af660f258a83733ab5bbf1c779286d3d9c7881ccad209fe6d0ffc9ba14c4d5954455354544f4b454e321aa9df8c80111a004c4b401284825820fa957d2b1dd37de2281dff8dd58c245baf1a7600067e3512056276c1787eb1e90082582023be0164e07ec84dea989dc4fb58017defc17849679b7dd36d59ae19d0e5a07800825820a8275eccb3dae1b8ae58837aa22d3c1cbe4df15e5ebc869bd0d710e50b6c44b000825820b8fd5caa1dc06c6bb1c713cf9f948012454cfdc028a34c47270dd253780fd20e00a10584840000d87b80821a0001e8f41a021657a9840100d879808219d24f1a012255d08403009fd8799f581c91d2bdc73e1de0d2cc776d3dc4e58db5d0ebca3772dac052aa49fdc8581cc2ab6459a71e7172b510aadb5b60f6da53a7116e45ca7f60c4145a61ffff821a000457311a054b95e4840301d87980821a00011b351a0132060af5f6
  test.skip("evaluates additinal utxos - sample 3", async () => {
    const redeemers = await blockfrost.evaluateTx(
      PreprodConstants.evalSample3.transaction,
      PreprodConstants.evalSample3.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample3.redeemersExUnits,
    );
  });

  test("evaluates additinal utxos - sample 4", async () => {
    const redeemers = await blockfrost.evaluateTx(
      PreprodConstants.evalSample4.transaction,
      PreprodConstants.evalSample4.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample4.redeemersExUnits,
    );
  });
});
