import { UTxO } from "@lucid-evolution/core-types";
import { Emulator } from "../src/index.js";

/**
 * Puts `utxo` into the emulator's ledger, with no transaction. Writes the
 * ledger entry of Lucid's Emulator; calls `addUtxo` on ScalusEmulator, which
 * has no `ledger`, when the Scalus suite runs these tests.
 */
export const addUtxo = (emulator: Emulator, utxo: UTxO): void => {
  if ("addUtxo" in emulator)
    (emulator as unknown as { addUtxo: (utxo: UTxO) => void }).addUtxo(utxo);
  else emulator.ledger[utxo.txHash + utxo.outputIndex] = { utxo, spent: false };
};
