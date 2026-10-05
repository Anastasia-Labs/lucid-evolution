import { describe, expect, test } from "vitest";
import {
  CML,
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  RedeemerContext,
  validatorToAddress,
} from "../src/index.js";
import { canonicalTransaction } from "../src/CanonicalTransaction.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";

// {h'616c706861': 5, h'62657461': 7}: "alpha" precedes "beta", but canonical
// CBOR sorts shorter keys first and would put "beta" first.
const tokenMap = "a245616c70686105446265746107";
const datum = `d8799f${tokenMap}9f${tokenMap}ffff`;
const redeemerData = `d87a9f${tokenMap}ff`;

const datumHash = (cbor: string): string =>
  CML.hash_plutus_data(CML.PlutusData.from_cbor_hex(cbor)).to_hex();

type DataView = {
  inlineDatums: string[];
  witnessDatums: string[];
  redeemerData: string[];
  redeemerExUnits: { mem: bigint; steps: bigint }[];
};

const plutusDataOf = (tx: CML.Transaction): DataView => {
  const body = tx.body();
  const outputs = body.outputs();
  const inlineDatums: string[] = [];
  for (let index = 0; index < outputs.len(); index++) {
    const inline = outputs.get(index).datum()?.as_datum();
    if (inline) inlineDatums.push(inline.to_cbor_hex());
  }
  const witnessSet = tx.witness_set();
  const datums = witnessSet.plutus_datums();
  const redeemers = witnessSet.redeemers()?.to_flat_format();
  return {
    inlineDatums,
    witnessDatums: Array.from({ length: datums?.len() ?? 0 }, (_, index) =>
      datums!.get(index).to_cbor_hex(),
    ),
    redeemerData: Array.from({ length: redeemers?.len() ?? 0 }, (_, index) =>
      redeemers!.get(index).data().to_cbor_hex(),
    ),
    redeemerExUnits: Array.from(
      { length: redeemers?.len() ?? 0 },
      (_, index) => ({
        mem: redeemers!.get(index).ex_units().mem(),
        steps: redeemers!.get(index).ex_units().steps(),
      }),
    ),
  };
};

const expectOriginalPlutusData = (tx: CML.Transaction): void => {
  const view = plutusDataOf(tx);
  expect(view.inlineDatums).toEqual([datum]);
  expect(view.witnessDatums).toEqual([datum]);
  expect(view.redeemerData).toEqual([redeemerData, redeemerData]);
  for (const exUnits of view.redeemerExUnits) {
    expect(exUnits.mem).toBeGreaterThan(0n);
    expect(exUnits.steps).toBeGreaterThan(0n);
  }
  const auxiliaryData = tx.auxiliary_data();
  expect(auxiliaryData).toBeDefined();
  expect(CML.hash_auxiliary_data(auxiliaryData!).to_hex()).toBe(
    tx.body().auxiliary_data_hash()?.to_hex(),
  );
};

test("the fixture's Plutus maps are not in canonical order", () => {
  const canonical = CML.PlutusData.from_cbor_hex(datum).to_canonical_cbor_hex();
  expect(canonical).not.toBe(datum);
  expect(datumHash(canonical)).not.toBe(datumHash(datum));
});

describe.each(["static", "canonical", "delayed"] as const)(
  "%s completion keeps ordered Plutus data",
  (mode) => {
    test("inline datums, witness datums and redeemer data survive completion and canonical serialization", async () => {
      const account = generateEmulatorAccount({ lovelace: 1_000_000_000n });
      const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
      const lucid = await Lucid(emulator, "Custom");
      lucid.selectWallet.fromSeed(account.seedPhrase);
      const address = await lucid.wallet().address();
      const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);

      const setup = await lucid
        .newTx()
        .pay.ToContract(
          scriptAddress,
          { kind: "inline", value: datum },
          { lovelace: 20_000_000n },
        )
        .pay.ToContract(
          scriptAddress,
          { kind: "asHash", value: datum },
          { lovelace: 20_000_000n },
        )
        .pay.ToAddressWithData(
          address,
          { kind: "inline", value: datum },
          { lovelace: 2_000_000n },
        )
        .complete();
      await lucid.awaitTx(
        await (await setup.sign.withWallet().complete()).submit(),
      );

      const scriptUtxos = await lucid.utxosAt(scriptAddress);
      const inlineInput = scriptUtxos.find((utxo) => utxo.datum != null)!;
      const hashInput = scriptUtxos.find((utxo) => utxo.datumHash != null)!;
      const reference = (await lucid.utxosAt(address)).find(
        (utxo) => utxo.datum != null,
      )!;
      expect(inlineInput.datum).toBe(datum);
      expect(reference.datum).toBe(datum);
      expect(hashInput.datumHash).toBe(datumHash(datum));

      let callbacks = 0;
      const redeemer =
        mode === "delayed"
          ? (context: RedeemerContext) => {
              callbacks++;
              const output = context.outputs.find(
                (output) => output.datum != null,
              );
              // Delayed redeemers see the datum the transaction will carry.
              expect(output?.datum).toBe(datum);
              return redeemerData;
            }
          : redeemerData;
      const completed = await lucid
        .newTx()
        .collectFrom([inlineInput], redeemer)
        .collectFrom([{ ...hashInput, datum }], redeemer)
        .readFrom([reference])
        .attach.SpendingValidator(alwaysSucceedV3Script)
        .attachMetadata(674, { msg: ["ordered Plutus data"] })
        // Below the minimum, so the builder tops the output up to min ADA.
        .pay.ToAddressWithData(
          address,
          { kind: "inline", value: datum },
          { lovelace: 1n },
        )
        .complete({ canonical: mode === "canonical" });
      expect(callbacks > 0).toBe(mode === "delayed");

      const signed = await completed.sign.withWallet().complete();
      const completedTx = completed.toTransaction();
      const signedTx = CML.Transaction.from_cbor_hex(signed.toCBOR());
      const canonicalCompletedTx = CML.Transaction.from_cbor_hex(
        completed.toCBOR({ canonical: true }),
      );
      const canonicalSignedTx = CML.Transaction.from_cbor_hex(
        signed.toCBOR({ canonical: true }),
      );
      for (const tx of [
        completedTx,
        signedTx,
        canonicalCompletedTx,
        canonicalSignedTx,
      ]) {
        expectOriginalPlutusData(tx);
      }

      // Canonical and delayed completion already produce a canonical body,
      // so serializing canonically again must not change its hash.
      const canonicalSubmission = mode !== "static";
      if (canonicalSubmission) {
        for (const tx of [canonicalCompletedTx, canonicalSignedTx]) {
          expect(CML.hash_transaction(tx.body()).to_hex()).toBe(
            completed.toHash(),
          );
        }
      }

      const outputs = completedTx.body().outputs();
      const outputIndex = Array.from(
        { length: outputs.len() },
        (_, index) => index,
      ).find((index) => outputs.get(index).datum()?.as_datum() !== undefined)!;
      const minimumAda = CML.min_ada_required(
        outputs.get(outputIndex),
        PROTOCOL_PARAMETERS_DEFAULT.coinsPerUtxoByte,
      );
      expect(outputs.get(outputIndex).amount().coin()).toBe(minimumAda);

      const txHash = await signed.submit({ canonical: canonicalSubmission });
      expect(txHash).toBe(completed.toHash());
      await lucid.awaitTx(txHash);
      const [created] = await lucid.utxosByOutRef([{ txHash, outputIndex }]);
      expect(created.datum).toBe(datum);
      expect(created.assets.lovelace).toBe(minimumAda);
    });
  },
);

describe("canonicalTransaction", () => {
  const makeTransaction = (
    redeemers: CML.Redeemers,
    outputDatum: string,
  ): CML.Transaction => {
    const inputs = CML.TransactionInputList.new();
    inputs.add(
      CML.TransactionInput.new(
        CML.TransactionHash.from_hex("11".repeat(32)),
        0n,
      ),
    );
    const address = CML.Address.from_bech32(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    );
    const outputs = CML.TransactionOutputList.new();
    outputs.add(
      CML.TransactionOutput.new(
        address,
        CML.Value.from_coin(2_000_000n),
        CML.DatumOption.new_datum(CML.PlutusData.from_cbor_hex(outputDatum)),
      ),
    );
    const body = CML.TransactionBody.new(inputs, outputs, 200_000n);
    const witnessSet = CML.TransactionWitnessSet.new();
    const datums = CML.PlutusDataList.new();
    datums.add(CML.PlutusData.from_cbor_hex(outputDatum));
    witnessSet.set_plutus_datums(datums);
    witnessSet.set_redeemers(redeemers);
    return CML.Transaction.new(body, witnessSet, true);
  };

  const exUnits = () => CML.ExUnits.new(1n, 2n);
  const plutusData = (cbor: string) => CML.PlutusData.from_cbor_hex(cbor);
  // An indefinite-length list whose value canonical encoding does not change.
  const listData = "9f0102ff";

  test("keeps map-format redeemer data whose order canonical encoding would change", () => {
    const map = CML.MapRedeemerKeyToRedeemerVal.new();
    map.insert(
      CML.RedeemerKey.new(CML.RedeemerTag.Spend, 0n),
      CML.RedeemerVal.new(plutusData(redeemerData), exUnits()),
    );
    map.insert(
      CML.RedeemerKey.new(CML.RedeemerTag.Mint, 0n),
      CML.RedeemerVal.new(plutusData(listData), exUnits()),
    );
    const tx = makeTransaction(
      CML.Redeemers.new_map_redeemer_key_to_redeemer_val(map),
      datum,
    );
    const canonical = canonicalTransaction(tx);
    const view = plutusDataOf(canonical);
    expect(view.inlineDatums).toEqual([datum]);
    expect(view.witnessDatums).toEqual([datum]);
    // The reordered map keeps its original bytes; the list only changes
    // encoding, so it takes the compact canonical form.
    expect(view.redeemerData).toEqual([redeemerData, "820102"]);
  });

  test("keeps legacy redeemer data whose order canonical encoding would change", () => {
    const list = CML.LegacyRedeemerList.new();
    list.add(
      CML.LegacyRedeemer.new(
        CML.RedeemerTag.Spend,
        0n,
        plutusData(redeemerData),
        exUnits(),
      ),
    );
    list.add(
      CML.LegacyRedeemer.new(
        CML.RedeemerTag.Mint,
        0n,
        plutusData(listData),
        exUnits(),
      ),
    );
    const tx = makeTransaction(
      CML.Redeemers.new_arr_legacy_redeemer(list),
      datum,
    );
    const view = plutusDataOf(canonicalTransaction(tx));
    expect(view.inlineDatums).toEqual([datum]);
    expect(view.witnessDatums).toEqual([datum]);
    expect(view.redeemerData).toEqual([redeemerData, "820102"]);
  });

  test("matches to_canonical_cbor_bytes when no Plutus data is reordered", () => {
    const list = CML.LegacyRedeemerList.new();
    list.add(
      CML.LegacyRedeemer.new(
        CML.RedeemerTag.Spend,
        0n,
        plutusData("d87980"),
        exUnits(),
      ),
    );
    const tx = makeTransaction(
      CML.Redeemers.new_arr_legacy_redeemer(list),
      "d87980",
    );
    expect(canonicalTransaction(tx).to_cbor_hex()).toBe(
      tx.to_canonical_cbor_hex(),
    );
  });
});
