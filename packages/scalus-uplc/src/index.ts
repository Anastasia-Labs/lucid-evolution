import {
  Assets,
  EvalRedeemer,
  EvaluatorAdapter,
  EvaluationInput,
  RedeemerTag,
  Script,
  UTxO,
} from "@lucid-evolution/core-types";
import { fromHex, toHex } from "@lucid-evolution/core-utils";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { decode, encode } from "cbor-x";
import ScalusLib from "scalus";

export type ScalusEvaluatorOptions = {
  name?: string;
};

type ScalusRedeemer = {
  tag: string;
  index: number;
  budget: {
    memory: number | bigint;
    steps: number | bigint;
  };
};

const SCALUS_TAGS: Record<string, RedeemerTag> = {
  Spend: "spend",
  Mint: "mint",
  Cert: "publish",
  Reward: "withdraw",
  Voting: "vote",
  Proposing: "propose",
};

const concatBytes = (chunks: Uint8Array[]): Uint8Array => {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
};

const cborMapHeader = (length: number): Uint8Array => {
  if (!Number.isSafeInteger(length) || length < 0) {
    throw new Error(`Invalid CBOR map length ${length}`);
  }
  if (length < 24) return Uint8Array.of(0xa0 + length);
  if (length <= 0xff) return Uint8Array.of(0xb8, length);
  if (length <= 0xffff) return Uint8Array.of(0xb9, length >> 8, length & 0xff);
  if (length <= 0xffffffff) {
    return Uint8Array.of(
      0xba,
      (length >>> 24) & 0xff,
      (length >>> 16) & 0xff,
      (length >>> 8) & 0xff,
      length & 0xff,
    );
  }
  throw new Error(`CBOR map length ${length} is too large`);
};

const compareBytes = (a: Uint8Array, b: Uint8Array): number => {
  if (a.length !== b.length) return a.length - b.length;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    if (diff !== 0) return diff;
  }
  return 0;
};

const applyDoubleCborEncoding = (script: string) => {
  try {
    decode(decode(fromHex(script)));
    return script;
  } catch (error) {
    try {
      decode(fromHex(script));
      return toHex(Uint8Array.from(encode(fromHex(script).buffer)));
    } catch (error) {
      return toHex(Uint8Array.from(encode(encode(fromHex(script).buffer))));
    }
  }
};

const assetsToValue = (assets: Assets): CML.Value => {
  const multiAsset = CML.MultiAsset.new();
  const lovelace = assets.lovelace ? BigInt(assets.lovelace) : 0n;
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units
        .filter((unit) => unit !== "lovelace")
        .map((unit) => unit.slice(0, 56)),
    ),
  );

  for (const policy of policies) {
    const assetsValue = CML.MapAssetNameToCoin.new();
    for (const unit of units.filter((unit) => unit.slice(0, 56) === policy)) {
      assetsValue.insert(
        CML.AssetName.from_hex(unit.slice(56)),
        BigInt(assets[unit]),
      );
    }
    multiAsset.insert_assets(CML.ScriptHash.from_hex(policy), assetsValue);
  }

  return CML.Value.new(lovelace, multiAsset);
};

const toScriptRef = (script: Script): CML.Script => {
  switch (script.type) {
    case "Native":
      return CML.Script.new_native(
        CML.NativeScript.from_cbor_hex(script.script),
      );
    case "PlutusV1":
      return CML.Script.new_plutus_v1(
        CML.PlutusV1Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
      );
    case "PlutusV2":
      return CML.Script.new_plutus_v2(
        CML.PlutusV2Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
      );
    case "PlutusV3":
      return CML.Script.new_plutus_v3(
        CML.PlutusV3Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
      );
  }
};

const utxoToTransactionInput = (utxo: UTxO): CML.TransactionInput =>
  CML.TransactionInput.new(
    CML.TransactionHash.from_hex(utxo.txHash),
    BigInt(utxo.outputIndex),
  );

const buildDatum = (
  utxo: UTxO,
  builder: CML.TransactionOutputBuilder,
): CML.TransactionOutputBuilder => {
  if (utxo.datumHash && utxo.datum) {
    return builder.with_communication_data(
      CML.PlutusData.from_cbor_hex(utxo.datum),
    );
  }
  if (utxo.datum) {
    return builder.with_data(
      CML.DatumOption.new_datum(CML.PlutusData.from_cbor_hex(utxo.datum)),
    );
  }
  return builder;
};

const buildOutput = (utxo: UTxO): CML.TransactionOutputAmountBuilder => {
  const builder = CML.TransactionOutputBuilder.new().with_address(
    CML.Address.from_bech32(utxo.address),
  );
  return utxo.scriptRef
    ? buildDatum(utxo, builder)
        .with_reference_script(toScriptRef(utxo.scriptRef))
        .next()
    : buildDatum(utxo, builder).next();
};

const utxoToTransactionOutput = (utxo: UTxO): CML.TransactionOutput =>
  buildOutput(utxo).with_value(assetsToValue(utxo.assets)).build().output();

export const buildUtxoMapCbor = (utxos: UTxO[]): Uint8Array => {
  const pairs = utxos
    .map((utxo) => ({
      input: utxoToTransactionInput(utxo).to_cbor_bytes(),
      output: utxoToTransactionOutput(utxo).to_cbor_bytes(),
    }))
    .sort((a, b) => compareBytes(a.input, b.input));

  return concatBytes([
    cborMapHeader(pairs.length),
    ...pairs.flatMap(({ input, output }) => [input, output]),
  ]);
};

const assertSafeInteger = (value: number | bigint, label: string): number => {
  const asNumber = typeof value === "bigint" ? Number(value) : value;
  if (!Number.isSafeInteger(asNumber)) {
    throw new Error(`${label} must be a safe integer`);
  }
  return asNumber;
};

export const mapScalusTag = (tag: string): RedeemerTag => {
  const mapped = SCALUS_TAGS[tag];
  if (!mapped) throw new Error(`Unknown Scalus redeemer tag "${tag}"`);
  return mapped;
};

export const decodeCostModels = (
  costModels: EvaluationInput["context"]["protocolParameters"]["costModels"],
): number[][] =>
  (["PlutusV1", "PlutusV2", "PlutusV3"] as const).map((version) =>
    costModels[version].map((cost, index) =>
      assertSafeInteger(cost, `${version} cost model parameter ${index}`),
    ),
  );

const toEvalRedeemer = (redeemer: ScalusRedeemer): EvalRedeemer => ({
  redeemer_tag: mapScalusTag(redeemer.tag),
  redeemer_index: assertSafeInteger(redeemer.index, "redeemer index"),
  ex_units: {
    mem: assertSafeInteger(redeemer.budget.memory, "redeemer memory budget"),
    steps: assertSafeInteger(redeemer.budget.steps, "redeemer step budget"),
  },
});

export const createScalusEvaluator = (
  options: ScalusEvaluatorOptions = {},
): EvaluatorAdapter => ({
  name: options.name ?? "scalus",
  evaluate: async ({ tx, additionalUTxOs, context }) => {
    const { zeroTime, zeroSlot, slotLength } = context.slotConfig;
    const slotConfig = new ScalusLib.SlotConfig(
      assertSafeInteger(zeroTime, "slot zeroTime"),
      assertSafeInteger(zeroSlot, "slot zeroSlot"),
      assertSafeInteger(slotLength, "slot length"),
    );
    const redeemers = ScalusLib.Scalus.evalPlutusScripts(
      fromHex(tx),
      buildUtxoMapCbor(additionalUTxOs),
      slotConfig,
      decodeCostModels(context.protocolParameters.costModels),
    ) as ScalusRedeemer[];
    return redeemers.map(toEvalRedeemer);
  },
});
