import { OutRef, TxOutput, UTxO } from "@lucid-evolution/core-types";
import { CML } from "./core.js";
import { fromScriptRef, toScriptRef } from "./scripts.js";
import { assetsToValue, valueToAssets } from "./value.js";

export const utxoToTransactionOutput = (utxo: UTxO) => {
  const datumOption = (utxo: UTxO) => {
    if (utxo.datumHash)
      return CML.DatumOption.new_hash(CML.DatumHash.from_hex(utxo.datumHash));
    // inline datum
    if (utxo.datum)
      return CML.DatumOption.new_datum(
        CML.PlutusData.from_cbor_hex(utxo.datum)
      );
    return undefined;
  };
  return CML.TransactionOutput.new(
    CML.Address.from_bech32(utxo.address),
    assetsToValue(utxo.assets),
    datumOption(utxo),
    utxo.scriptRef ? toScriptRef(utxo.scriptRef) : undefined
  );
};

export const utxoToTransactionInput = (utxo: UTxO) => {
  return CML.TransactionInput.new(
    CML.TransactionHash.from_hex(utxo.txHash),
    BigInt(utxo.outputIndex)
  );
};

export function utxoToCore(utxo: UTxO): CML.TransactionUnspentOutput {
  return CML.TransactionUnspentOutput.new(
    utxoToTransactionInput(utxo),
    utxoToTransactionOutput(utxo)
  );
}
export function utxosToCores(utxos: UTxO[]): CML.TransactionUnspentOutput[] {
  const result: CML.TransactionUnspentOutput[] = [];
  for (const utxo of utxos) {
    result.push(utxoToCore(utxo));
  }
  return result;
}

export function coreToUtxo(coreUtxo: CML.TransactionUnspentOutput): UTxO {
  return {
    ...coreToOutRef(CML.TransactionInput.from_cbor_hex(coreUtxo.to_cbor_hex())),
    ...coreToTxOutput(
      CML.TransactionOutput.from_cbor_hex(coreUtxo.to_cbor_hex())
    ),
  };
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

export function coresToOutRefs(inputs: Array<CML.TransactionInput>): OutRef[] {
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
