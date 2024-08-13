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
): Uint8Array[];
/**
 * @param {Uint8Array} params_bytes
 * @param {Uint8Array} plutus_script_bytes
 * @returns {Uint8Array}
 */
export function apply_params_to_script(
  params_bytes: Uint8Array,
  plutus_script_bytes: Uint8Array,
): Uint8Array;
