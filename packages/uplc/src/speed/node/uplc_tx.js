
let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextEncoder, TextDecoder } = require(`util`);

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

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
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
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

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_0.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}
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
module.exports.eval_phase_two_raw = function(tx_bytes, utxos_bytes_x, utxos_bytes_y, cost_mdls_bytes, initial_budget_n, initial_budget_d, slot_config_x, slot_config_y, slot_config_z, protocol_major_version) {
    const ptr0 = passArray8ToWasm0(tx_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(utxos_bytes_x, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayJsValueToWasm0(utxos_bytes_y, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(cost_mdls_bytes, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.eval_phase_two_raw(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, initial_budget_n, initial_budget_d, slot_config_x, slot_config_y, slot_config_z, !isLikeNone(protocol_major_version), isLikeNone(protocol_major_version) ? 0 : protocol_major_version);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v5 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v5;
};

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8Array} params_bytes
 * @param {Uint8Array} plutus_script_bytes
 * @returns {Uint8Array}
 */
module.exports.apply_params_to_script = function(params_bytes, plutus_script_bytes) {
    const ptr0 = passArray8ToWasm0(params_bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(plutus_script_bytes, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.apply_params_to_script(ptr0, len0, ptr1, len1);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v3;
};

let cachedBigUint64ArrayMemory0 = null;

function getBigUint64ArrayMemory0() {
    if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) {
        cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachedBigUint64ArrayMemory0;
}

function passArray64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getBigUint64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
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
module.exports.eval_program_raw = function(program_flat, args_cbor, language, protocol_major_version, cost_model, budget_cpu, budget_mem, strict_budget) {
    const ptr0 = passArray8ToWasm0(program_flat, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(args_cbor, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray64ToWasm0(cost_model, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.eval_program_raw(ptr0, len0, ptr1, len1, language, protocol_major_version, ptr2, len2, budget_cpu, budget_mem, strict_budget);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return EvalProgramResult.__wrap(ret[0]);
};

/**
 * Describes this build of the evaluator as JSON: the uplc crate it was built
 * from, the length of each Plutus version's cost model, and a digest of what a
 * fixed set of programs evaluate to, with their costs, under Plutus V3 and the
 * latest protocol version. Two builds with the same digest agree on those
 * programs; `selfTest` says whether this one gives the expected results.
 * @returns {string}
 */
module.exports.uplc_build_info = function() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.uplc_build_info();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
};

const EvalProgramResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_evalprogramresult_free(ptr >>> 0, 1));
/**
 * The outcome of [`eval_program_raw`].
 */
class EvalProgramResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EvalProgramResult.prototype);
        obj.__wbg_ptr = ptr;
        EvalProgramResultFinalization.register(obj, obj.__wbg_ptr, obj);
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
        wasm.__wbg_evalprogramresult_free(ptr, 0);
    }
    /**
     * Whether the program succeeded: it did not fail and, for Plutus V3, it
     * returned unit.
     * @returns {boolean}
     */
    get ok() {
        const ret = wasm.__wbg_get_evalprogramresult_ok(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether the program succeeded: it did not fail and, for Plutus V3, it
     * returned unit.
     * @param {boolean} arg0
     */
    set ok(arg0) {
        wasm.__wbg_set_evalprogramresult_ok(this.__wbg_ptr, arg0);
    }
    /**
     * The CPU the program used. A program that went over budget is charged
     * what it used up to the point where the machine stopped it.
     * @returns {bigint}
     */
    get cpu() {
        const ret = wasm.__wbg_get_evalprogramresult_cpu(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * The CPU the program used. A program that went over budget is charged
     * what it used up to the point where the machine stopped it.
     * @param {bigint} arg0
     */
    set cpu(arg0) {
        wasm.__wbg_set_evalprogramresult_cpu(this.__wbg_ptr, arg0);
    }
    /**
     * The memory the program used.
     * @returns {bigint}
     */
    get mem() {
        const ret = wasm.__wbg_get_evalprogramresult_mem(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * The memory the program used.
     * @param {bigint} arg0
     */
    set mem(arg0) {
        wasm.__wbg_set_evalprogramresult_mem(this.__wbg_ptr, arg0);
    }
    /**
     * Why the program did not succeed: 0 when it did, 1 when it went over
     * budget, 2 when it failed in any other way and 3 when a Plutus V3 program
     * returned something other than unit.
     * @returns {number}
     */
    get error_kind() {
        const ret = wasm.__wbg_get_evalprogramresult_error_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * Why the program did not succeed: 0 when it did, 1 when it went over
     * budget, 2 when it failed in any other way and 3 when a Plutus V3 program
     * returned something other than unit.
     * @param {number} arg0
     */
    set error_kind(arg0) {
        wasm.__wbg_set_evalprogramresult_error_kind(this.__wbg_ptr, arg0);
    }
    /**
     * The messages the program traced, in order.
     * @returns {string[]}
     */
    get logs() {
        const ret = wasm.__wbg_get_evalprogramresult_logs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The messages the program traced, in order.
     * @param {string[]} arg0
     */
    set logs(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_evalprogramresult_logs(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.EvalProgramResult = EvalProgramResult;

module.exports.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
};

module.exports.__wbg_length_a446193dc22c12f8 = function(arg0) {
    const ret = arg0.length;
    return ret;
};

module.exports.__wbg_new_a12002a7f91c75be = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

module.exports.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

module.exports.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

module.exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'uplc_tx_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

wasm.__wbindgen_start();

