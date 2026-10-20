import { ScalusEmulator } from "@lucid-evolution/scalus-uplc/emulator";
import { Lucid as lucid } from "../../src/index.js";

export { Emulator } from "./emulator.js";

/**
 * Lucid, with `evaluator: provider.evaluator` for a ScalusEmulator unless
 * the test sets its own evaluator. `localUPLCEval: false`
 * needs nothing: it calls `provider.evaluateTx`, the same evaluation.
 */
export const Lucid: typeof lucid = (provider, network, options = {}) =>
  lucid(
    provider,
    network,
    provider instanceof ScalusEmulator && !options.evaluator
      ? { ...options, evaluator: provider.evaluator }
      : options,
  );
