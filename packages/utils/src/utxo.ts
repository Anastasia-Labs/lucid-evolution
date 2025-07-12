import { Assets, OutRef, TxOutput, UTxO } from "@evolution-sdk/core-types";
import { CML } from "./core.js";
import { fromScriptRef, toScriptRef } from "./scripts.js";
import { assetsToValue, valueToAssets } from "./value.js";

export const utxoToTransactionOutput = (utxo: UTxO) => {
  return buildOutput(utxo)
    .with_value(assetsToValue(utxo.assets))
    .build()
    .output();
};

export const utxoToTransactionInput = (utxo: UTxO) => {
  return CML.TransactionInput.new(
    CML.TransactionHash.from_hex(utxo.txHash),
    BigInt(utxo.outputIndex),
  );
};

export const utxoToCore = (utxo: UTxO): CML.TransactionUnspentOutput => {
  const out = utxoToTransactionOutput(utxo);
  const utxoCore = CML.TransactionUnspentOutput.new(
    utxoToTransactionInput(utxo),
    out,
  );
  // out.free();
  return utxoCore;
};

export function utxosToCores(utxos: UTxO[]): CML.TransactionUnspentOutput[] {
  const result: CML.TransactionUnspentOutput[] = [];
  for (const utxo of utxos) {
    result.push(utxoToCore(utxo));
  }
  return result;
}

//TODO: test coreToUtxo -> utxoToCore strict equality
export function coreToUtxo(coreUtxo: CML.TransactionUnspentOutput): UTxO {
  const utxo = {
    ...coreToOutRef(coreUtxo.input()),
    ...coreToTxOutput(coreUtxo.output()),
  };
  return utxo;
}

export function coresToUtxos(utxos: CML.TransactionUnspentOutput[]): UTxO[] {
  const result: UTxO[] = [];
  for (let i = 0; i < utxos.length; i++) {
    result.push(coreToUtxo(utxos[i]));
  }
  return result;
}

export function coreToOutRef(input: CML.TransactionInput): OutRef {
  return {
    txHash: input.transaction_id().to_hex(),
    outputIndex: parseInt(input.index().toString()),
  };
}

export function coresToOutRefs(inputs: CML.TransactionInput[]): OutRef[] {
  const result: OutRef[] = [];
  for (let i = 0; i < inputs.length; i++) {
    result.push(coreToOutRef(inputs[i]));
  }
  return result;
}

export function coreToTxOutput(output: CML.TransactionOutput): TxOutput {
  return {
    assets: valueToAssets(output.amount()),
    address: output.address().to_bech32(undefined),
    datumHash: output.datum()?.as_hash()?.to_hex(),
    datum: output.datum()?.as_datum()?.to_cbor_hex(),
    scriptRef: output.script_ref() && fromScriptRef(output.script_ref()!),
  };
}

export function coresToTxOutputs(outputs: CML.TransactionOutput[]): TxOutput[] {
  let result: TxOutput[] = [];
  for (let i = 0; i < outputs.length; i++) {
    result.push(coreToTxOutput(outputs[i]));
  }
  return result;
}

//TODO: disable for now
// export function producedUtxosFrom(unsignedTx: TxComplete): UTxO[] {
//   const result: UTxO[] = [];
//   const hash = unsignedTx.toHash();
//   const outputs = unsignedTx.txComplete.body().outputs();
//   const outputsArray = new Array<CML.TransactionOutput>(outputs.len()).map(
//     (_, index) => outputs.get(index),
//   );
//   coresToTxOutputs(outputsArray).forEach((output, index) => {
//     result.push({
//       outputIndex: index,
//       txHash: hash,
//       ...output,
//     });
//   });
//   return result;
// }

/**
 * Returns a list of UTxOs whose total assets are equal to or greater than the asset value provided
 * @param utxos list of available utxos
 * @param totalAssets minimum total assets required
 * @param includeUTxOsWithScriptRef Whether to include UTxOs with scriptRef or not. default = false
 */
export const selectUTxOs = (
  utxos: UTxO[],
  totalAssets: Assets,
  includeUTxOsWithScriptRef: boolean = false,
) => {
  const selectedUtxos: UTxO[] = [];
  let isSelected = false;
  const assetsRequired = new Map<string, bigint>(Object.entries(totalAssets));
  for (const utxo of utxos) {
    if (!includeUTxOsWithScriptRef && utxo.scriptRef) continue;
    isSelected = false;
    for (const [unit, amount] of assetsRequired) {
      if (Object.hasOwn(utxo.assets, unit)) {
        const utxoAmount = utxo.assets[unit];
        if (utxoAmount >= amount) {
          assetsRequired.delete(unit);
        } else {
          assetsRequired.set(unit, amount - utxoAmount);
        }
        isSelected = true;
      }
    }
    if (isSelected) {
      selectedUtxos.push(utxo);
    }
    if (assetsRequired.size == 0) {
      break;
    }
  }
  if (assetsRequired.size > 0) return [];
  return selectedUtxos;
};

/**
 * Union type for specifying sorting order in function "sortUTxOs"
 */
export type SortOrder =
  /**
   * Largest amount of "lovelace" with least number of unique assets first
   */
  | "LargestFirst"
  /**
   * Smallest amount of "lovelace" with least number of unique assets first
   */
  | "SmallestFirst"
  /**
   * Lexicographically sorted as per ledger rules
   */
  | "Canonical";

/**
 * Sorts an array of UTXOs according to specified sort order ("LargestFirst" by default).
 * The provided array is cloned and reference to the new sorted array is returned.
 *
 * @param {UTxO[]} utxos - The array of UTXO objects to be sorted.
 * @param {SortOrder} [order="LargestFirst"] - The order in which to sort the UTXOs.
 * @returns {UTxO[]} - The sorted array of UTXOs.
 *
 */
export const sortUTxOs = (
  utxos: UTxO[],
  order: SortOrder = "LargestFirst",
): UTxO[] => {
  switch (order) {
    case "LargestFirst":
      return [...utxos].sort(largestFirst);
    case "SmallestFirst":
      return [...utxos].sort(smallestFirst);
    case "Canonical":
      return [...utxos].sort(canonical);
  }
};

const largestFirst = (a: UTxO, b: UTxO) => {
  const lovelaceA = Number(a.assets["lovelace"]);
  const lovelaceB = Number(b.assets["lovelace"]);

  if (lovelaceA === lovelaceB) {
    return Object.keys(a.assets).length - Object.keys(b.assets).length;
  }
  return -1 * (lovelaceA - lovelaceB);
};

const smallestFirst = (a: UTxO, b: UTxO) => {
  const lovelaceA = Number(a.assets["lovelace"]);
  const lovelaceB = Number(b.assets["lovelace"]);

  if (lovelaceA == lovelaceB) {
    return Object.keys(a.assets).length - Object.keys(b.assets).length;
  }
  return lovelaceA - lovelaceB;
};

const canonical = (a: UTxO, b: UTxO) => {
  if (a.txHash < b.txHash) {
    return -1;
  } else if (a.txHash > b.txHash) {
    return 1;
  } else {
    return a.outputIndex - b.outputIndex;
  }
};

//TODO: add
// sortBy -> sort by amount of specific unit

export const isEqualUTxO = (self: UTxO, that: UTxO) =>
  self.txHash === that.txHash && self.outputIndex === that.outputIndex;

/**
 * Provides an array of input indices for given "indexInputs" UTxOs.
 * Indices obtained from the list of transaction inputs which are
 * ordered as per ledger rules.
 *
 * @param indexInputs Input utxos whose indices need to be returned
 * @param allInputs All the inputs utxos being spent by the transaction
 * @param sorted Whether the provided "allInputs" are sorted canonically or not
 * @returns Input indices of utxos as they appear in "indexInputs"
 */
export function getInputIndices(
  indexInputs: UTxO[],
  allInputs: UTxO[],
  sorted: Boolean = false,
): bigint[] {
  const sortedInputs = sorted ? allInputs : sortUTxOs(allInputs, "Canonical");
  const indicesMap = new Map<string, bigint>();

  sortedInputs.forEach((value, index) => {
    indicesMap.set(value.txHash + value.outputIndex, BigInt(index));
  });

  return indexInputs.flatMap((value) => {
    const index = indicesMap.get(value.txHash + value.outputIndex);
    if (index !== undefined) return index;
    else return [];
  });
}
//TODO: add
// sortCanonical -> sorting following ledger rules
// sortBy -> sort by amount of specific unit

export const calculateMinLovelaceFromUTxO = (
  coinsPerUtxoByte: bigint,
  utxo: UTxO,
): bigint =>
  buildOutput(utxo)
    .with_asset_and_min_required_coin(
      assetsToValue(utxo.assets).multi_asset(),
      coinsPerUtxoByte,
    )
    .build()
    .output()
    .amount()
    .coin();

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

const buildDatum = (
  utxo: UTxO,
  builder: CML.TransactionOutputBuilder,
): CML.TransactionOutputBuilder => {
  // with DatumHash
  if (utxo.datumHash && utxo.datum)
    return builder.with_communication_data(
      CML.PlutusData.from_cbor_hex(utxo.datum),
    );
  // with InlineDatum
  if (utxo.datum)
    return builder.with_data(
      CML.DatumOption.new_datum(CML.PlutusData.from_cbor_hex(utxo.datum)),
    );
  return builder;
};
