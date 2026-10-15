/* tslint:disable */
/* eslint-disable */
export function eval_phase_two_raw(
  tx_bytes: Uint8Array,
  utxos_bytes_x: Uint8Array[],
  utxos_bytes_y: Uint8Array[],
  cost_mdls_bytes: Uint8Array,
  initial_budget_n: bigint,
  initial_budget_d: bigint,
  slot_config_x: bigint,
  slot_config_y: bigint,
  slot_config_z: number,
  protocol_major_version?: number | null,
): Uint8Array[];
export function apply_params_to_script(
  params_bytes: Uint8Array,
  plutus_script_bytes: Uint8Array,
): Uint8Array;
/**
 * Evaluates a UPLC program applied to Data arguments, outside of any
 * transaction: the caller builds whatever arguments the program expects,
 * including its script context.
 *
 * - `program_flat`: the program, flat-encoded without a CBOR wrapper.
 * - `args_cbor`: the arguments, each one CBOR-encoded Data, applied in order.
 * - `language`: the Plutus version to evaluate as, 1, 2 or 3.
 * - `protocol_major_version`: the protocol version whose semantics to use,
 *   from 5 (Alonzo) to 12 (Dijkstra).
 * - `cost_model`: the cost model parameters, every one the evaluator knows
 *   for this Plutus version (350 for Plutus V3), in the ledger's order.
 * - `budget_cpu`, `budget_mem`: the budget.
 * - `strict_budget`: charge every step as the machine takes it, and stop the
 *   program as soon as it goes over budget, instead of charging steps and
 *   checking the budget every 200 steps as the ledger does. Only the cost of a
 *   program that fails differs: the ledger does not charge the steps it took
 *   since the budget was last checked.
 *
 * Fails only when the inputs are malformed or unsupported. A program that fails
 * is an [`EvalProgramResult`] that is not `ok`.
 */
export function eval_program_raw(
  program_flat: Uint8Array,
  args_cbor: Uint8Array[],
  language: number,
  protocol_major_version: number,
  cost_model: BigInt64Array,
  budget_cpu: bigint,
  budget_mem: bigint,
  strict_budget: boolean,
): EvalProgramResult;
/**
 * Describes this build of the evaluator as JSON: the uplc crate it was built
 * from, the length of each Plutus version's cost model, and a digest of what a
 * fixed set of programs evaluate to, with their costs, under Plutus V3 and the
 * latest protocol version. Two builds with the same digest agree on those
 * programs; `selfTest` says whether this one gives the expected results.
 */
export function uplc_build_info(): string;
/**
 * The outcome of [`eval_program_raw`].
 */
export class EvalProgramResult {
  private constructor();
  free(): void;
  /**
   * Whether the program succeeded: it did not fail and, for Plutus V3, it
   * returned unit.
   */
  ok: boolean;
  /**
   * The CPU the program used. A program that went over budget is charged
   * what it used up to the point where the machine stopped it.
   */
  cpu: bigint;
  /**
   * The memory the program used.
   */
  mem: bigint;
  /**
   * Why the program did not succeed: 0 when it did, 1 when it went over
   * budget, 2 when it failed in any other way and 3 when a Plutus V3 program
   * returned something other than unit.
   */
  error_kind: number;
  /**
   * The messages the program traced, in order.
   */
  logs: string[];
}
