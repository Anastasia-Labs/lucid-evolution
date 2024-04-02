import { OutRef, TxOutput, UTxO } from "@lucid-evolution/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { fromScriptRef, toScriptRef } from "./scripts.js";
import { assetsToValue, valueToAssets } from "./value.js";

export const utxoToTransactionOutput = (utxo: UTxO) => {
  const address: CML.Address = (() => {
    try {
      return CML.Address.from_bech32(utxo.address);
    } catch (_e) {
      return CML.ByronAddress.from_base58(utxo.address).to_address();
    }
  })();
  const datumOption = (() => {
    if (utxo.datumHash) {
      return CML.DatumOption.new_hash(CML.DatumHash.from_hex(utxo.datumHash));
    }
    // inline datum
    if (!utxo.datumHash && utxo.datum) {
      return CML.DatumOption.new_datum(
        CML.PlutusData.from_cbor_hex(utxo.datum),
      );
    }
  })();
  const scriptRef = (() => {
    if (utxo.scriptRef) {
      return toScriptRef(utxo.scriptRef);
    }
  })();
  return CML.TransactionOutput.new(
    address,
    assetsToValue(utxo.assets),
    datumOption,
    scriptRef,
  );
};

export const utxoToTransactionInput = (utxo: UTxO) => {
  return CML.TransactionInput.new(
    CML.TransactionHash.from_hex(utxo.txHash),
    BigInt(utxo.outputIndex),
  );
};

export function utxoToCore(utxo: UTxO): CML.TransactionUnspentOutput {
  const address: CML.Address = (() => {
    try {
      return CML.Address.from_bech32(utxo.address);
    } catch (_e) {
      return CML.ByronAddress.from_base58(utxo.address).to_address();
    }
  })();
  const datumOption = (() => {
    if (utxo.datumHash) {
      return CML.DatumOption.new_hash(CML.DatumHash.from_hex(utxo.datumHash));
    }
    // inline datum
    if (!utxo.datumHash && utxo.datum) {
      return CML.DatumOption.new_datum(
        CML.PlutusData.from_cbor_hex(utxo.datum),
      );
    }
  })();
  const scriptRef = (() => {
    if (utxo.scriptRef) {
      return toScriptRef(utxo.scriptRef);
    }
  })();

  const output = CML.TransactionOutput.new(
    address,
    assetsToValue(utxo.assets),
    datumOption,
    scriptRef,
  );

  return CML.TransactionUnspentOutput.new(
    CML.TransactionInput.new(
      CML.TransactionHash.from_hex(utxo.txHash),
      BigInt(utxo.outputIndex),
    ),
    output,
  );
}
export function utxosToCores(utxos: UTxO[]): CML.TransactionUnspentOutput[] {
  const result: Array<CML.TransactionUnspentOutput> = [];
  utxos.map(utxoToCore).forEach((utxo) => result.push(utxo));
  return result;
}

export function coreToUtxo(coreUtxo: CML.TransactionUnspentOutput): UTxO {
  return {
    ...coreToOutRef(CML.TransactionInput.from_cbor_hex(coreUtxo.to_cbor_hex())),
    ...coreToTxOutput(
      CML.TransactionOutput.from_cbor_hex(coreUtxo.to_cbor_hex()),
    ),
  };
}

export function coresToUtxos(
  utxos: Array<CML.TransactionUnspentOutput>,
): UTxO[] {
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

export function coresToTxOutputs(
  outputs: Array<CML.TransactionOutput>,
): TxOutput[] {
  const result: TxOutput[] = [];
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
