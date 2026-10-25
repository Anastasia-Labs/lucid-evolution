/* @ts-self-types="./uplc_tx.d.ts" */

/**
 * Why the builtin given to [`eval_builtin_raw`] did not return a value: the
 * codes of the result's `error_kind`.
 * @enum {0 | 1 | 2 | 3}
 */
const BuiltinErrorKind = Object.freeze({
    /**
     * The builtin returned a value.
     */
    Ok: 0, "0": "Ok",
    /**
     * The builtin is not available to Plutus V3 at the protocol version.
     */
    NotAvailable: 1, "1": "NotAvailable",
    /**
     * The builtin did not accept its arguments, which fails the application
     * before it is costed.
     */
    RejectedArguments: 2, "2": "RejectedArguments",
    /**
     * The builtin failed after it was costed.
     */
    Failed: 3, "3": "Failed",
});
exports.BuiltinErrorKind = BuiltinErrorKind;

/**
 * How a value of [`eval_builtin_raw`] is encoded: the codes of its
 * `arg_kinds` and of the result's `result_kind`.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6}
 */
const BuiltinValueKind = Object.freeze({
    /**
     * A flat-encoded program whose body is a constant,
     * `(program 1.1.0 (con …))`. A result in this form is always version
     * 1.1.0.
     */
    Flat: 0, "0": "Flat",
    /**
     * A BLS12-381 G1 point, as its 48-byte compressed encoding.
     */
    G1: 1, "1": "G1",
    /**
     * A BLS12-381 G2 point, as its 96-byte compressed encoding.
     */
    G2: 2, "2": "G2",
    /**
     * A list of BLS12-381 G1 points, as their compressed encodings one after
     * the other.
     */
    G1List: 3, "3": "G1List",
    /**
     * A list of BLS12-381 G2 points, as their compressed encodings one after
     * the other.
     */
    G2List: 4, "4": "G2List",
    /**
     * An array of BLS12-381 G1 points, as their compressed encodings one after
     * the other.
     */
    G1Array: 5, "5": "G1Array",
    /**
     * An array of BLS12-381 G2 points, as their compressed encodings one after
     * the other.
     */
    G2Array: 6, "6": "G2Array",
});
exports.BuiltinValueKind = BuiltinValueKind;

/**
 * The outcome of [`eval_builtin_raw`].
 */
class EvalBuiltinResult {
    static __wrap(ptr) {
        const obj = Object.create(EvalBuiltinResult.prototype);
        obj.__wbg_ptr = ptr;
        Object.defineProperty(obj, '__wbg_inst', { value: __wbg_instance_id, writable: true });

        EvalBuiltinResultFinalization.register(obj, { ptr, instance: __wbg_instance_id }, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EvalBuiltinResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        __wbg_call_guard();
        wasm.__wbg_evalbuiltinresult_free(ptr, 0);

    }
    /**
     * The CPU the builtin's cost model charges for this application, under
     * Plutus' default cost model for Plutus V3 at the protocol version; 0
     * when the builtin was not costed (error kinds 1 and 2). It leaves out the
     * machine's own step costs for evaluating the application (the builtin,
     * each force and each apply).
     * @returns {bigint}
     */
    get cpu() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_cpu(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Why the builtin did not return a value, a [`BuiltinErrorKind`]: 0 when
     * it did, 1 when it is not available to Plutus V3 at the protocol version,
     * 2 when it did not accept its arguments (so the machine fails before
     * costing it) and 3 when it failed after being costed.
     * @returns {number}
     */
    get error_kind() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_error_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * The evaluator's description of why the builtin did not return a value;
     * empty when it did.
     * @returns {string}
     */
    get error() {
        let deferred1_0;
        let deferred1_1;
        try {
            if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
                throw new Error('Invalid stale object from previous Wasm instance');
            }
            let ret;
            __wbg_call_guard();
            ret = wasm.__wbg_get_evalbuiltinresult_error(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            __wbg_call_guard();
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * The memory the builtin's cost model charges for this application; see
     * `cpu`.
     * @returns {bigint}
     */
    get mem() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_mem(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Whether the builtin returned a value.
     * @returns {boolean}
     */
    get ok() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_ok(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * How `result` encodes the value, a [`BuiltinValueKind`] as for the
     * arguments of [`eval_builtin_raw`]; 0 when there is no value.
     * @returns {number}
     */
    get result_kind() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_result_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * The value the builtin returned; empty when there is none.
     * @returns {Uint8Array}
     */
    get result() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalbuiltinresult_result(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * The CPU the builtin's cost model charges for this application, under
     * Plutus' default cost model for Plutus V3 at the protocol version; 0
     * when the builtin was not costed (error kinds 1 and 2). It leaves out the
     * machine's own step costs for evaluating the application (the builtin,
     * each force and each apply).
     * @param {bigint} arg0
     */
    set cpu(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_cpu(this.__wbg_ptr, arg0);
    }
    /**
     * Why the builtin did not return a value, a [`BuiltinErrorKind`]: 0 when
     * it did, 1 when it is not available to Plutus V3 at the protocol version,
     * 2 when it did not accept its arguments (so the machine fails before
     * costing it) and 3 when it failed after being costed.
     * @param {number} arg0
     */
    set error_kind(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_error_kind(this.__wbg_ptr, arg0);
    }
    /**
     * The evaluator's description of why the builtin did not return a value;
     * empty when it did.
     * @param {string} arg0
     */
    set error(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_error(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The memory the builtin's cost model charges for this application; see
     * `cpu`.
     * @param {bigint} arg0
     */
    set mem(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_mem(this.__wbg_ptr, arg0);
    }
    /**
     * Whether the builtin returned a value.
     * @param {boolean} arg0
     */
    set ok(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_ok(this.__wbg_ptr, arg0);
    }
    /**
     * How `result` encodes the value, a [`BuiltinValueKind`] as for the
     * arguments of [`eval_builtin_raw`]; 0 when there is no value.
     * @param {number} arg0
     */
    set result_kind(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_result_kind(this.__wbg_ptr, arg0);
    }
    /**
     * The value the builtin returned; empty when there is none.
     * @param {Uint8Array} arg0
     */
    set result(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        __wbg_call_guard();
        wasm.__wbg_set_evalbuiltinresult_result(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) EvalBuiltinResult.prototype[Symbol.dispose] = EvalBuiltinResult.prototype.free;
exports.EvalBuiltinResult = EvalBuiltinResult;

/**
 * The outcome of [`eval_program_raw`].
 */
class EvalProgramResult {
    static __wrap(ptr) {
        const obj = Object.create(EvalProgramResult.prototype);
        obj.__wbg_ptr = ptr;
        Object.defineProperty(obj, '__wbg_inst', { value: __wbg_instance_id, writable: true });

        EvalProgramResultFinalization.register(obj, { ptr, instance: __wbg_instance_id }, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EvalProgramResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        __wbg_call_guard();
        wasm.__wbg_evalprogramresult_free(ptr, 0);

    }
    /**
     * The CPU the program used. A program that went over budget is charged
     * what it used up to the point where the machine stopped it.
     * @returns {bigint}
     */
    get cpu() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalprogramresult_cpu(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Why the program did not succeed: 0 when it did, 1 when it went over
     * budget, 2 when it failed in any other way and 3 when a Plutus V3 program
     * returned something other than unit.
     * @returns {number}
     */
    get error_kind() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalprogramresult_error_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * The messages the program traced, in order.
     * @returns {string[]}
     */
    get logs() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalprogramresult_logs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The memory the program used.
     * @returns {bigint}
     */
    get mem() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalprogramresult_mem(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Whether the program succeeded: it did not fail and, for Plutus V3, it
     * returned unit.
     * @returns {boolean}
     */
    get ok() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.__wbg_get_evalprogramresult_ok(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The CPU the program used. A program that went over budget is charged
     * what it used up to the point where the machine stopped it.
     * @param {bigint} arg0
     */
    set cpu(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalprogramresult_cpu(this.__wbg_ptr, arg0);
    }
    /**
     * Why the program did not succeed: 0 when it did, 1 when it went over
     * budget, 2 when it failed in any other way and 3 when a Plutus V3 program
     * returned something other than unit.
     * @param {number} arg0
     */
    set error_kind(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalprogramresult_error_kind(this.__wbg_ptr, arg0);
    }
    /**
     * The messages the program traced, in order.
     * @param {string[]} arg0
     */
    set logs(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        __wbg_call_guard();
        wasm.__wbg_set_evalprogramresult_logs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The memory the program used.
     * @param {bigint} arg0
     */
    set mem(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalprogramresult_mem(this.__wbg_ptr, arg0);
    }
    /**
     * Whether the program succeeded: it did not fail and, for Plutus V3, it
     * returned unit.
     * @param {boolean} arg0
     */
    set ok(arg0) {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.__wbg_set_evalprogramresult_ok(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) EvalProgramResult.prototype[Symbol.dispose] = EvalProgramResult.prototype.free;
exports.EvalProgramResult = EvalProgramResult;

function __wbg_reset_state () {
    __wbg_instance_id++;
    cachedBigUint64ArrayMemory0 = null;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    if (typeof numBytesDecoded !== 'undefined') numBytesDecoded = 0;
    if (typeof WASM_VECTOR_LEN !== 'undefined') WASM_VECTOR_LEN = 0;
    __wbg_reinit_scheduled = false;
    wasmInstance = new WebAssembly.Instance(wasmModule, __wbg_get_imports());
    wasm = wasmInstance.exports;
    wasm.__wbindgen_start();
}
exports.__wbg_reset_state = __wbg_reset_state;

/**
 * @param {Uint8Array} params_bytes
 * @param {Uint8Array} plutus_script_bytes
 * @returns {Uint8Array}
 */
function apply_params_to_script(params_bytes, plutus_script_bytes) {
    const ptr0 = passArray8ToWasm0(params_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(plutus_script_bytes, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    let ret;
    __wbg_call_guard();
    ret = wasm.apply_params_to_script(ptr0, len0, ptr1, len1);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v3;
}
exports.apply_params_to_script = apply_params_to_script;

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
 *   matching entry of `arg_kinds` says, a [`BuiltinValueKind`]: 0 for a
 *   flat-encoded `(program 1.1.0 (con …))`, 1 for a compressed G1 point, 2
 *   for a compressed G2 point, 3 for a list of G1 points, 4 for a list of G2
 *   points, 5 for an array of G1 points and 6 for an array of G2 points, each
 *   list or array as the compressed points one after the other. Flat cannot
 *   encode BLS12-381 points, so they cross as their compressed bytes.
 * - `protocol_major_version`: from 9 (Chang, which introduced Plutus V3) to
 *   12 (Dijkstra). It decides which builtins are available and the semantics
 *   they have.
 *
 * The result's `cpu` and `mem` are the builtin's charge for the application
 * under Plutus' default Plutus V3 cost model (not the ledger's protocol
 * parameters), excluding the machine's per-step costs.
 *
 * Fails only when the inputs are malformed or unsupported: an unknown or
 * Miller-loop tag, a number of arguments other than the builtin's arity, an
 * argument that does not decode as its kind says or is not a constant, an
 * invalid compressed point, a protocol version out of range, or a result that
 * none of the kinds can encode. A builtin that fails is an
 * [`EvalBuiltinResult`] that is not `ok`.
 * @param {number} tag
 * @param {Uint8Array[]} args
 * @param {Uint8Array} arg_kinds
 * @param {number} protocol_major_version
 * @returns {EvalBuiltinResult}
 */
function eval_builtin_raw(tag, args, arg_kinds, protocol_major_version) {
    const ptr0 = passArrayJsValueToWasm0(args, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(arg_kinds, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    let ret;
    __wbg_call_guard();
    ret = wasm.eval_builtin_raw(tag, ptr0, len0, ptr1, len1, protocol_major_version);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return EvalBuiltinResult.__wrap(ret[0]);
}
exports.eval_builtin_raw = eval_builtin_raw;

/**
 * @param {Uint8Array} tx_bytes
 * @param {Uint8Array[]} utxos_bytes_x
 * @param {Uint8Array[]} utxos_bytes_y
 * @param {Uint8Array} cost_mdls_bytes
 * @param {bigint} initial_budget_n
 * @param {bigint} initial_budget_d
 * @param {bigint} slot_config_x
 * @param {bigint} slot_config_y
 * @param {number} slot_config_z
 * @param {number | null} [protocol_major_version]
 * @returns {Uint8Array[]}
 */
function eval_phase_two_raw(tx_bytes, utxos_bytes_x, utxos_bytes_y, cost_mdls_bytes, initial_budget_n, initial_budget_d, slot_config_x, slot_config_y, slot_config_z, protocol_major_version) {
    const ptr0 = passArray8ToWasm0(tx_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(utxos_bytes_x, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayJsValueToWasm0(utxos_bytes_y, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(cost_mdls_bytes, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    let ret;
    __wbg_call_guard();
    ret = wasm.eval_phase_two_raw(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, initial_budget_n, initial_budget_d, slot_config_x, slot_config_y, slot_config_z, !isLikeNone(protocol_major_version), isLikeNone(protocol_major_version) ? 0 : protocol_major_version);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v5 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v5;
}
exports.eval_phase_two_raw = eval_phase_two_raw;

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
 * @param {Uint8Array} program_flat
 * @param {Uint8Array[]} args_cbor
 * @param {number} language
 * @param {number} protocol_major_version
 * @param {BigInt64Array} cost_model
 * @param {bigint} budget_cpu
 * @param {bigint} budget_mem
 * @param {boolean} strict_budget
 * @returns {EvalProgramResult}
 */
function eval_program_raw(program_flat, args_cbor, language, protocol_major_version, cost_model, budget_cpu, budget_mem, strict_budget) {
    const ptr0 = passArray8ToWasm0(program_flat, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(args_cbor, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray64ToWasm0(cost_model, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    let ret;
    __wbg_call_guard();
    ret = wasm.eval_program_raw(ptr0, len0, ptr1, len1, language, protocol_major_version, ptr2, len2, budget_cpu, budget_mem, strict_budget);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return EvalProgramResult.__wrap(ret[0]);
}
exports.eval_program_raw = eval_program_raw;

/**
 * Describes this build of the evaluator as JSON: the uplc crate it was built
 * from, the length of each Plutus version's cost model, and a digest of what a
 * fixed set of programs evaluate to, with their costs, under Plutus V3 and the
 * latest protocol version. Two builds with the same digest agree on those
 * programs; `selfTest` says whether this one gives the expected results.
 * @returns {string}
 */
function uplc_build_info() {
    let deferred1_0;
    let deferred1_1;
    try {
        let ret;
        __wbg_call_guard();
        ret = wasm.uplc_build_info();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        __wbg_call_guard();
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}
exports.uplc_build_info = uplc_build_info;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_string_get_b0ca35b86a603356: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_344f42d3211c4765: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_length_1f0964f4a5e2c6d8: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_from_slice_77cdfb7977362f3c: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_prototypesetcall_4770620bbe4688a0: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./uplc_tx_bg.js": import0,
    };
}

function __wbg_call_guard() {
    if (__wbg_reinit_scheduled) {
        __wbg_reset_state();
        return;
    }
}


let __wbg_instance_id = 0;
const EvalBuiltinResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(({ ptr, instance }) => {
    if (instance === __wbg_instance_id) wasm.__wbg_evalbuiltinresult_free(ptr, 1);
});
const EvalProgramResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(({ ptr, instance }) => {
    if (instance === __wbg_instance_id) wasm.__wbg_evalprogramresult_free(ptr, 1);
});

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedBigUint64ArrayMemory0 = null;
function getBigUint64ArrayMemory0() {
    if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) {
        cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachedBigUint64ArrayMemory0;
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getBigUint64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let __wbg_reinit_scheduled = false;

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function decodeText(ptr, len) {
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

const wasmPath = `${__dirname}/uplc_tx_bg.wasm`;
const wasmBytes = require('fs').readFileSync(wasmPath);
const wasmModule = new WebAssembly.Module(wasmBytes);
let wasmInstance = new WebAssembly.Instance(wasmModule, __wbg_get_imports());
let wasm = wasmInstance.exports;
wasm.__wbindgen_start();
