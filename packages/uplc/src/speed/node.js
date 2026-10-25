"use strict";

// The Node.js entry: the bindings in ./node, recovering from a wasm trap (see
// ../recover-from-trap.js). Each export is assigned by name so that ES module
// imports of this CommonJS file see it.
const bindings = require("./node/uplc_tx.js");
const recovering = require("../recover-from-trap.js")(bindings);

exports.apply_params_to_script = recovering(bindings.apply_params_to_script);
exports.eval_builtin_raw = recovering(bindings.eval_builtin_raw);
exports.eval_phase_two_raw = recovering(bindings.eval_phase_two_raw);
exports.eval_program_raw = recovering(bindings.eval_program_raw);
exports.uplc_build_info = recovering(bindings.uplc_build_info);
exports.BuiltinErrorKind = bindings.BuiltinErrorKind;
exports.BuiltinValueKind = bindings.BuiltinValueKind;
exports.EvalBuiltinResult = bindings.EvalBuiltinResult;
exports.EvalProgramResult = bindings.EvalProgramResult;
