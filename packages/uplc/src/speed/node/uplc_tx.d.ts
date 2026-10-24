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
 * Evaluates the builtin `tag` applied to `args` as a Plutus V3 script
 * evaluates it at a protocol version, without any program around it: the
 * result, or how it fails, is what the machine gives for the saturated
 * application.
 *
 * - `tag`: the builtin's flat tag (0 for addInteger to 100 for scaleValue).
 *   The Miller-loop builtins (68 to 70) are not supported, since their
 *   results cannot be returned.
 * - `args`: exactly the builtin's arguments, in order, each encoded as the
 *   matching entry of `arg_kinds` says: 0 for a flat-encoded
 *   `(program 1.1.0 (con …))`, 1 for a compressed G1 point, 2 for a
 *   compressed G2 point, 3 for a list of G1 points and 4 for a list of G2
 *   points, each list as the compressed points one after the other. Flat
 *   cannot encode BLS12-381 points, so they cross as their compressed bytes.
 * - `protocol_major_version`: from 9 (Chang, which introduced Plutus V3) to
 *   12 (Dijkstra). It decides which builtins are available and the semantics
 *   they have.
 *
 * The result's `cpu` and `mem` are what the machine charges for the
 * application under Plutus' default Plutus V3 cost model, not the ledger's
 * protocol parameters.
 *
 * Fails only when the inputs are malformed or unsupported: an unknown or
 * Miller-loop tag, a number of arguments other than the builtin's arity, an
 * argument that does not decode as its kind says or is not a constant, an
 * invalid compressed point, a protocol version out of range, or a result that
 * none of the kinds can encode. A builtin that fails is an
 * [`EvalBuiltinResult`] that is not `ok`.
 */
export function eval_builtin_raw(
  tag: number,
  args: Uint8Array[],
  arg_kinds: Uint8Array,
  protocol_major_version: number,
): EvalBuiltinResult;
/**
 * The outcome of [`eval_builtin_raw`].
 */
export class EvalBuiltinResult {
  private constructor();
  free(): void;
  /**
   * Whether the builtin returned a value.
   */
  ok: boolean;
  /**
   * Why the builtin did not return a value: 0 when it did, 1 when it is
   * not available to Plutus V3 at the protocol version, 2 when it did not
   * accept its arguments (so the machine fails before costing it) and 3 when
   * it failed after being costed.
   */
  error_kind: number;
  /**
   * How `result` encodes the value, with the same codes as the arguments
   * of [`eval_builtin_raw`]; 0 when there is no value.
   */
  result_kind: number;
  /**
   * The value the builtin returned; empty when there is none.
   */
  result: Uint8Array;
  /**
   * The CPU the machine charges for this application, under Plutus' default
   * cost model for Plutus V3 at the protocol version; 0 when the builtin was
   * not costed (error kinds 1 and 2).
   */
  cpu: bigint;
  /**
   * The memory the machine charges for this application; see `cpu`.
   */
  mem: bigint;
  /**
   * The evaluator's description of why the builtin did not return a value;
   * empty when it did.
   */
  error: string;
}
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
