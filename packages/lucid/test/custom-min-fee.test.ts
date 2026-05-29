import { expect, test } from "vitest";
import {
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  applyDoubleCborEncoding,
  fromText,
  toScriptRef,
  valueToAssets,
} from "../src/index.js";
import { CML } from "../src/core.js";
import { Effect } from "effect";
import { Assets } from "@lucid-evolution/core-types";
import scripts from "./specs/contracts/plutus.json" assert { type: "json" };

const sumAssets = (left: Assets, right: Assets): Assets => {
  const result = { ...left };
  for (const [unit, amount] of Object.entries(right)) {
    result[unit] = (result[unit] ?? 0n) + amount;
  }
  return result;
};

test("setMinFee keeps change for token-bearing selected inputs", async () => {
  const account = generateEmulatorAccount({ lovelace: 100_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const address = await lucid.wallet().address();
  const unit = "0".repeat(56) + fromText("MintWithdraw");
  const tokenUtxo = {
    txHash: "1".repeat(64),
    outputIndex: 0,
    address,
    assets: { lovelace: 9_622_099_539n, [unit]: 2n },
  };
  const signBuilder = await Effect.runPromise(
    lucid
      .newTx()
      .pay.ToAddressWithData(
        address,
        { kind: "inline", value: "d87980" },
        { lovelace: 10_000_000n },
      )
      .setMinFee(1_000_000n)
      .completeProgram({ presetWalletInputs: [tokenUtxo] }),
  );
  const tx = signBuilder.toTransaction();
  let outputAssets: Assets = {};
  const outputs = tx.body().outputs();
  for (let index = 0; index < outputs.len(); index++) {
    outputAssets = sumAssets(
      outputAssets,
      valueToAssets(outputs.get(index).amount()),
    );
  }

  expect(outputAssets[unit]).toBe(2n);
  expect(outputAssets.lovelace + tx.body().fee()).toBe(
    tokenUtxo.assets.lovelace,
  );
});

test("selected reference-script inputs include the Conway reference-script fee", async () => {
  const account = generateEmulatorAccount({ lovelace: 100_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const address = await lucid.wallet().address();
  const scriptRef = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "mint.mint_multi_validator.mint",
      )!.compiledCode,
    ),
  } as const;
  const scriptRefUtxo = {
    txHash: "2".repeat(64),
    outputIndex: 0,
    address,
    assets: { lovelace: 20_000_000n },
    scriptRef,
  };

  const signBuilder = await Effect.runPromise(
    lucid
      .newTx()
      .pay.ToAddress(address, { lovelace: 2_000_000n })
      .completeProgram({ presetWalletInputs: [scriptRefUtxo] }),
  );
  const signedTx = await signBuilder.sign.withWallet().complete();
  const tx = signedTx.toTransaction();
  const protocolParameters = lucid.config().protocolParameters;
  const minimumFee = CML.min_fee(
    tx,
    CML.LinearFee.new(
      BigInt(protocolParameters.minFeeA),
      BigInt(protocolParameters.minFeeB),
      BigInt(protocolParameters.minFeeRefScriptCostPerByte),
    ),
    CML.ExUnitPrices.new(
      CML.SubCoin.new(
        BigInt(protocolParameters.priceMem * 100_000_000),
        100_000_000n,
      ),
      CML.SubCoin.new(
        BigInt(protocolParameters.priceStep * 100_000_000),
        100_000_000n,
      ),
    ),
    BigInt(toScriptRef(scriptRef).to_cbor_bytes().length),
  );

  expect(tx.body().fee()).toBeGreaterThanOrEqual(minimumFee);
});
