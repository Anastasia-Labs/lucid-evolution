use js_sys;
use uplc::tx;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn eval_phase_two_raw(
    tx_bytes: &[u8],
    utxos_bytes_x: Vec<js_sys::Uint8Array>,
    utxos_bytes_y: Vec<js_sys::Uint8Array>,
    cost_mdls_bytes: &[u8],
    initial_budget_n: u64,
    initial_budget_d: u64,
    slot_config_x: u64,
    slot_config_y: u64,
    slot_config_z: u32,
    protocol_major_version: Option<f64>,
) -> Result<Vec<js_sys::Uint8Array>, JsValue> {
    // Preserve pre-PV11 behavior for callers that omit the protocol version.
    let protocol = protocol_major_version.unwrap_or(10.0);
    if !(5.0..=11.0).contains(&protocol) || protocol.fract() != 0.0 {
        return Err("Unsupported protocol major version".into());
    }
    let utxos_bytes = utxos_bytes_x
        .into_iter()
        .zip(utxos_bytes_y.into_iter())
        .map(|(x, y)| (x.to_vec(), y.to_vec()))
        .collect::<Vec<(Vec<u8>, Vec<u8>)>>();
    return tx::eval_phase_two_raw_with_protocol(
        tx_bytes,
        &utxos_bytes,
        Some(cost_mdls_bytes),
        (initial_budget_n, initial_budget_d),
        (slot_config_x, slot_config_y, slot_config_z),
        protocol as u16,
        false,
        |_| (),
    )
    .map(|r| r.iter().map(|i| js_sys::Uint8Array::from(&i.0[..])).collect())
    .map_err(|e| e.to_string().into());
}

#[wasm_bindgen]
pub fn apply_params_to_script(
    params_bytes: &[u8],
    plutus_script_bytes: &[u8],
) -> Result<Vec<u8>, JsValue> {
    return tx::apply_params_to_script(params_bytes, plutus_script_bytes)
        .map_err(|e| e.to_string().into());
}
