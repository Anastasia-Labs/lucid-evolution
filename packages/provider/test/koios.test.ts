import { Koios } from "../src/koios/koios.js";
import {
  Datum,
  Delegation,
  ProtocolParameters,
  UTxO,
} from "@lucid-evolution/core-types";
import { assert, describe, expect, test } from "vitest";
import { expectedProtocolParameters } from "./protocolParameters.js";

//TODO: improve test assetion
describe.sequential("Koios", () => {
  const koios = new Koios("https://api.koios.rest/api/v1");
  test("getProtocolParameters", async () => {
    const pp: ProtocolParameters = await koios.getProtocolParameters();
    assert.deepEqual(pp, expectedProtocolParameters);
  });

  test("getUtxos", async () => {
    const utxos: UTxO[] = await koios.getUtxos(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );
    assert(utxos);
  });

  test("getUtxosWithUnit", async () => {
    const utxos: UTxO[] = await koios.getUtxosWithUnit(
      "addr1q8vaadv0h7atv366u6966u4rft2svjlf5uajy8lkpsgdrc24rnskuetxz2u3m5ac22s3njvftxcl2fc8k8kjr088ge0qpn6xhn",
      "85152e10643c1440ba2ba817e3dd1faf7bd7296a8b605efd0f0f2d1844696d656e73696f6e426f78202330313739",
    );
    assert(utxos);
  });

  test("getUtxoByUnit", async () => {
    const utxo: UTxO = await koios.getUtxoByUnit(
      "85152e10643c1440ba2ba817e3dd1faf7bd7296a8b605efd0f0f2d1844696d656e73696f6e426f78202330313739",
    );
    assert(utxo);
  });

  test("getUtxosByOutRef", async () => {
    const utxos: UTxO[] = await koios.getUtxosByOutRef([
      {
        txHash:
          "c6ee20549eab1e565a4bed119bb8c7fc2d11cc5ea5e1e25433a34f0175c0bef6",
        outputIndex: 0,
      },
    ]);
    assert(utxos);
  });

  test("getDelegation", async () => {
    const delegation: Delegation = await koios.getDelegation(
      "stake1uyrx65wjqjgeeksd8hptmcgl5jfyrqkfq0xe8xlp367kphsckq250",
    );
    assert(delegation);
  });

  test("getDatum", async () => {
    const datum: Datum = await koios.getDatum(
      "818ee3db3bbbd04f9f2ce21778cac3ac605802a4fcb00c8b3a58ee2dafc17d46",
    );
    assert(datum);
  });

  test("awaitTx", async () => {
    const isConfirmed: boolean = await koios.awaitTx(
      "f144a8264acf4bdfe2e1241170969c930d64ab6b0996a4a45237b623f1dd670e",
    );
    assert(isConfirmed);
  });

  test("submitTxBadRequest", async () => {
    await expect(() => koios.submitTx("80")).rejects.toThrowError();
  });

  test("evaluateTx", async () => {
    const koios = new Koios("https://preprod.koios.rest/api/v1");
    const cbor =
      "84a800818258202c936b78b683abf90423fd8169d13f36021158be8d76119f530d7f3214f6a8a8000181825839009b619deb6e46ed004e49cb9a158462189cf093bab8eef2765d9b8bf75da571c9ab6fc02a347d0443bb80566c3408b4ee2a1b3a6a5019a2811a0095b6bc021a0002dfc40b58206a2e5bc41ec5f1431d4208c538c04f6666257a060241390b8bd659482ad99fbf0d81825820bd98d572fab0ba5d583d0066a82a63353631253df1d1c7a811b892d28dafee1e010e81581c9b619deb6e46ed004e49cb9a158462189cf093bab8eef2765d9b8bf710825839009b619deb6e46ed004e49cb9a158462189cf093bab8eef2765d9b8bf75da571c9ab6fc02a347d0443bb80566c3408b4ee2a1b3a6a5019a281821b000000024dc50707a1581c22691d3d969ecf5802226290c2fb98e2bc08522d5b726c1f5f400105a1445465737402111a004c4b40a300818258205ee4155d0886da3ff31d482b40e7e0701029018cb0307f658b9458043c7894d458407692903a266d3d7e0775f55485b6608a78a0843b412d8a5dba758e98496ff539ad03b54ce2c3020c734723a2871fb79840715a09180583fdd4b3b2d62b43890b0581840000d879814d48656c6c6f2c20576f726c64218219543b1a007118df068158e758e5010000333232323232322322322232253330093232533300b3371e6eb8c008c034dd500280388008a5032330010013758601e60206020602060206020602060206020601a6ea8c008c034dd50019129998078008a50132533300d3371e6eb8c04400802c5288998018018009808800918070008a4c26caca66600e66e1d20003008375400226464a666018601c0042930b1bae300c001300937540022c6eb8004dd7000ab9a5573aaae7955cfaba157449811e581c9b619deb6e46ed004e49cb9a158462189cf093bab8eef2765d9b8bf7004c010e4d48656c6c6f2c20576f726c64210001f5f6";
    const redeemers = await koios.evaluateTx(cbor);
    assert.equal(Array.from(redeemers).length, 1);
  });
});
