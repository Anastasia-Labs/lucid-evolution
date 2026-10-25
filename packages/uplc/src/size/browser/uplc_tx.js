/* @ts-self-types="./uplc_tx.d.ts" */
import * as wasm from "./uplc_tx_bg.wasm";
import { __wbg_set_wasm } from "./uplc_tx_bg.js";

__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    BuiltinErrorKind, BuiltinValueKind, EvalBuiltinResult, EvalProgramResult, apply_params_to_script, eval_builtin_raw, eval_phase_two_raw, eval_program_raw, uplc_build_info
} from "./uplc_tx_bg.js";
