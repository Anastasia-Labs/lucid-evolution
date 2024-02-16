import { Effect } from "effect";
import { Address, OutputData, TxComplete } from "../mod.js";
import { Config } from "./types.js";
import {
  GetUTxosCoreError,
  WalletAddressError,
  makeRunTimeError,
} from "./Errors.js";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export const complete =
  (config: Config) =>
  (options?: {
    change?: { address?: Address; outputData?: OutputData };
    coinSelection?: boolean;
    nativeUplc?: boolean;
  }) => {
    const program = Effect.gen(function* ($) {
      // if (
      //   [
      //     options?.change?.outputData?.hash,
      //     options?.change?.outputData?.asHash,
      //     options?.change?.outputData?.inline,
      //   ].filter((b) => b)
      //     .length > 1
      // ) {
      //   throw new Error(
      //     "Not allowed to set hash, asHash and inline at the same time.",
      //   );
      // }

      // let task = this.tasks.shift();
      // while (task) {
      //   await task(this);
      //   task = this.tasks.shift();
      // }
      yield* $(Effect.all(config.programs, { concurrency: "unbounded" }));

      const utxos = yield* $(
        Effect.tryPromise({
          try: () => config.lucid.wallet.getUtxosCore(),
          catch: (_e) => new GetUTxosCoreError(),
        })
      );

      // const changeAddress: C.Address = addressFromWithNetworkCheck(
      //   options?.change?.address || (await this.lucid.wallet.address()),
      //   this.lucid,
      // );
      const changeAddress = yield* $(
        Effect.tryPromise({
          try: () => config.lucid.wallet.address(),
          catch: (_e) => new WalletAddressError(),
        })
      );
      if (options?.coinSelection || options?.coinSelection === undefined) {
        for (const utxo of utxos) {
          const input =
            CML.SingleInputBuilder.from_transaction_unspent_output(
              utxo
            ).payment_key();
          config.txBuilder.add_input(input);
        }
        config.txBuilder.select_utxos(
          CML.CoinSelectionStrategyCIP2.LargestFirst
        );
        // config.txBuilder.add_inputs_from(
        //   utxos,
        //   changeAddress,
        //   Uint32Array.from([
        //     200, // weight ideal > 100 inputs
        //     1000, // weight ideal < 100 inputs
        //     1500, // weight assets if plutus
        //     800, // weight assets if not plutus
        //     800, // weight distance if not plutus
        //     5000, // weight utxos
        //   ])
        // );
      }

      // this.txBuilder.balance(
      //   changeAddress,
      //   (() => {
      //     if (options?.change?.outputData?.hash) {
      //       return C.Datum.new_data_hash(
      //         C.DataHash.from_hex(
      //           options.change.outputData.hash,
      //         ),
      //       );
      //     } else if (options?.change?.outputData?.asHash) {
      //       this.txBuilder.add_plutus_data(
      //         C.PlutusData.from_bytes(fromHex(options.change.outputData.asHash)),
      //       );
      //       return C.Datum.new_data_hash(
      //         C.hash_plutus_data(
      //           C.PlutusData.from_bytes(
      //             fromHex(options.change.outputData.asHash),
      //           ),
      //         ),
      //       );
      //     } else if (options?.change?.outputData?.inline) {
      //       return C.Datum.new_data(
      //         C.Data.new(
      //           C.PlutusData.from_bytes(
      //             fromHex(options.change.outputData.inline),
      //           ),
      //         ),
      //       );
      //     } else {
      //       return undefined;
      //     }
      //   })(),
      // );

      // const utxoSet = this.inputUTxOs ??
      //   coresToUtxos(await this.lucid.wallet.getUtxosCore());
      // return new TxComplete(
      //   this.lucid,
      //   await this.txBuilder.construct(
      //     utxos,
      //     changeAddress,
      //     options?.nativeUplc === undefined ? true : options?.nativeUplc
      //   ),
      //   utxoSet
      // );

      return new TxComplete(
        config.lucid,
        config.txBuilder
          .build(
            CML.ChangeSelectionAlgo.Default,
            CML.Address.from_bech32(changeAddress)
          )
          .build_unchecked()
      );
    }).pipe(Effect.catchAllDefect(makeRunTimeError));
    return {
      unsafeRun: () => Effect.runPromise(program),
      run: () => Effect.runPromise(Effect.either(program)),
      program: () => program,
    };
  };
