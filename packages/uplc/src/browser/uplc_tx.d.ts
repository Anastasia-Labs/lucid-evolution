/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} tx_bytes
* @param {(Uint8Array)[]} utxos_bytes_x
* @param {(Uint8Array)[]} utxos_bytes_y
* @param {Uint8Array} cost_mdls_bytes
* @param {bigint} initial_budget_n
* @param {bigint} initial_budget_d
* @param {bigint} slot_config_x
* @param {bigint} slot_config_y
* @param {number} slot_config_z
* @returns {(Uint8Array)[]}
*/
export function eval_phase_two_raw(tx_bytes: Uint8Array, utxos_bytes_x: (Uint8Array)[], utxos_bytes_y: (Uint8Array)[], cost_mdls_bytes: Uint8Array, initial_budget_n: bigint, initial_budget_d: bigint, slot_config_x: bigint, slot_config_y: bigint, slot_config_z: number): (Uint8Array)[];
/**
* @param {Uint8Array} params_bytes
* @param {Uint8Array} plutus_script_bytes
* @returns {Uint8Array}
*/
export function apply_params_to_script(params_bytes: Uint8Array, plutus_script_bytes: Uint8Array): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly eval_phase_two_raw: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly apply_params_to_script: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
