import { expect, test } from "vitest";
import {
  Data,
  EvalRedeemer,
  Emulator,
  EvaluatorAdapter,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  PROTOCOL_PARAMETERS_DEFAULT,
  Script,
  TxBuilder,
  applyDoubleCborEncoding,
  fromText,
  toScriptRef,
  valueToAssets,
  validatorToAddress,
} from "../src/index.js";
import { CML } from "../src/core.js";
import { Effect } from "effect";
import { Assets } from "@lucid-evolution/core-types";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";
import scripts from "./specs/contracts/plutus.json" assert { type: "json" };

const sumAssets = (left: Assets, right: Assets): Assets => {
  const result = { ...left };
  for (const [unit, amount] of Object.entries(right)) {
    result[unit] = (result[unit] ?? 0n) + amount;
  }
  return result;
};

const outputHexes = (body: CML.TransactionBody): string[] =>
  Array.from({ length: body.outputs().len() }, (_, index) =>
    body.outputs().get(index).to_cbor_hex(),
  );

const submitTx = async (
  lucid: LucidEvolution,
  tx: TxBuilder,
): Promise<void> => {
  const txHash = await tx
    .complete()
    .then((t) => t.sign.withWallet().complete())
    .then((t) => t.submit());

  await lucid.awaitTx(txHash);
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

test("setMinFee is visible to phase-two script evaluation", async () => {
  const account = generateEmulatorAccount({ lovelace: 100_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const feeCheckingScript: Script = {
    type: "PlutusV3",
    script:
      "59037b59037801010029800aba4aba2aba1aab9faab9eaab9dab9cab9a4888888896600264653001300800198041804800cc0200092225980099b8748008c020dd500144ca60026018003300c300d00191806980718071807000a444a660166e64c8c8cc88ca6002003300630123754015488100400444464b30010038991919911980500119b8a48901280059800800c4cdc52441035b5d2900006899b8a489035b5f20009800800ccdc52441025d2900006914c00402a00530070014029229800805400a002805100920345980099b880014803a266e0120f2010018acc004cdc4000a41000513370066e01208014001480362c80a10141bac3017002375a602a0026466ec0dd4180a8009ba73016001375400713259800800c4cdc52441027b7d00003899b8a489037b5f20003232330010010032259800800c400e264b30010018994c00402a6034003337149101023a200098008054c06c00600a805100a180e00144ca6002015301a00199b8a489023a200098008054c06c006600e66008008004805100a180e0012036301c001406866e29220102207d00003405c6eac00e264b3001001899b8a489025b5d00003899b8a489035b5f20009800800ccdc52441015d00003914c00401e0053004001401d229800803c00a0028039006202e3758007133006375a0060051323371491102682700329800800ccdc01b8d0024800666e292210127000044004444b3001337100049000440062646645300100699b800054800666e2ccdc00012cc004cdc4001240291481822903720323371666e000056600266e2000520148a40c11481b9019002200c33706002901019b8600148080cdc7002001202c375c00680c8dc5245022c2000223233001001003225980099b8700148002266e292210130000038acc004cdc4000a40011337149101012d0033002002337029000000c4cc014cdc2000a402866e2ccdc019b85001480512060003404080808888c8cc004004014896600200310058992cc004006266008603000400d133005301800233003003001405c603000280b0c0040048896600266e2400920008800c6600200733708004900a4cdc599b803370a004900a240c0002801900d0acc004cdc4241015bc4086eb4c004c034dd5002c528c54cc02d2411e3c65787065637465643e204665652062656c6f7720355f3030305f3030300016402830093754005164018300800130043754013149a26cac8009",
  };

  const scriptAddress = validatorToAddress(
    lucid.config().network!,
    feeCheckingScript,
  );

  await submitTx(
    lucid,
    lucid.newTx().pay.ToAddress(scriptAddress, { lovelace: 10_000_000n }),
  );

  const scriptUtxos = await lucid.utxosAt(scriptAddress);
  expect(scriptUtxos).toHaveLength(1);

  await submitTx(
    lucid,
    lucid
      .newTx()
      .attach.Script(feeCheckingScript)
      .collectFrom([scriptUtxos[0]], Data.void())
      .setMinFee(8_000_000n),
  );
});

test("phase-two evaluation reruns when script fees change without new inputs", async () => {
  const account = generateEmulatorAccount({ lovelace: 100_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const scriptAddress = validatorToAddress(
    lucid.config().network!,
    alwaysSucceedV3Script,
  );

  await submitTx(
    lucid,
    lucid.newTx().pay.ToAddress(scriptAddress, { lovelace: 10_000_000n }),
  );

  const scriptUtxos = await lucid.utxosAt(scriptAddress);
  expect(scriptUtxos).toHaveLength(1);

  const evaluatedBodies: { fee: bigint; outputs: string[] }[] = [];
  const evaluator: EvaluatorAdapter = {
    name: "fee-recorder",
    evaluate: async ({ tx }) => {
      const body = CML.Transaction.from_cbor_hex(tx).body();
      evaluatedBodies.push({
        fee: body.fee(),
        outputs: outputHexes(body),
      });
      return [
        {
          redeemer_tag: "spend",
          redeemer_index: 0,
          ex_units: { mem: 10_000_000, steps: 8_000_000_000 },
        } satisfies EvalRedeemer,
      ];
    },
  };

  const signBuilder = await lucid
    .newTx()
    .attach.Script(alwaysSucceedV3Script)
    .collectFrom([scriptUtxos[0]], Data.void())
    .complete({ evaluator });

  const finalBody = signBuilder.toTransaction().body();
  const lastEvaluated = evaluatedBodies.at(-1)!;
  expect(evaluatedBodies.length).toBeGreaterThanOrEqual(2);
  expect(lastEvaluated.fee).toBeGreaterThan(evaluatedBodies[0].fee);
  expect(finalBody.fee()).toBe(lastEvaluated.fee);
  expect(outputHexes(finalBody)).toEqual(lastEvaluated.outputs);
});
