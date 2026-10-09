use std::cell::RefCell;

use js_sys;
use uplc::tx::{self, ScriptCache};
use wasm_bindgen::prelude::*;

/// Upper bound on the scripts kept decoded across calls.
const SCRIPT_CACHE_MAX_SCRIPTS: usize = 64;
/// Upper bound on the serialised size of the scripts kept decoded across calls.
/// A decoded script holds up to about 210 heap bytes per script byte (long
/// lambda chains), so this keeps the cache under about 64 MB.
const SCRIPT_CACHE_MAX_SCRIPT_BYTES: usize = 256 * 1024;

thread_local! {
    static SCRIPT_CACHE: RefCell<ScriptCache> = RefCell::new(ScriptCache::with_limits(
        SCRIPT_CACHE_MAX_SCRIPTS,
        SCRIPT_CACHE_MAX_SCRIPT_BYTES,
    ));
}

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
    let eval = |script_cache: &mut ScriptCache| {
        tx::eval_phase_two_raw_with_script_cache(
            tx_bytes,
            &utxos_bytes,
            Some(cost_mdls_bytes),
            (initial_budget_n, initial_budget_d),
            (slot_config_x, slot_config_y, slot_config_z),
            protocol as u16,
            false,
            |_| (),
            script_cache,
        )
    };
    // A trap during an earlier call (wasm aborts without unwinding) leaves the
    // cache borrowed for good; evaluate with a fresh cache instead of panicking
    // on every later call.
    return SCRIPT_CACHE
        .try_with(|cache| cache.try_borrow_mut().ok().map(|mut cache| eval(&mut cache)))
        .ok()
        .flatten()
        .unwrap_or_else(|| eval(&mut ScriptCache::default()))
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
