use std::{cell::RefCell, collections::HashMap};

use pallas_crypto::hash::{Hash, Hasher};
use uplc::{
    ast::{Data, FakeNamedDeBruijn, NamedDeBruijn, Program},
    machine::{
        cost_model::{initialize_cost_model_with_protocol, CostModel, ExBudget, ParamName},
        Error, Machine,
    },
    protocol::{
        self, ALONZO_PROTOCOL_VERSION, DIJKSTRA_PROTOCOL_VERSION, VAN_ROSSEM_PROTOCOL_VERSION,
    },
    tx::{self, ScriptCache},
    Fragment, Language,
};
use wasm_bindgen::prelude::*;

mod builtin;

/// Upper bound on the scripts kept decoded across calls.
const SCRIPT_CACHE_MAX_SCRIPTS: usize = 64;
/// Upper bound on the serialised size of the scripts kept decoded across calls.
/// A decoded script holds up to about 210 heap bytes per script byte (long
/// lambda chains), so this keeps the cache under about 64 MB.
const SCRIPT_CACHE_MAX_SCRIPT_BYTES: usize = 256 * 1024;

/// The slippage the ledger evaluates with: the machine checks the budget every
/// 200 steps, so a script that goes over budget is charged a little more than
/// its budget before it stops.
const LEDGER_SLIPPAGE: u32 = 200;

thread_local! {
    static SCRIPT_CACHE: RefCell<ScriptCache> = RefCell::new(ScriptCache::with_limits(
        SCRIPT_CACHE_MAX_SCRIPTS,
        SCRIPT_CACHE_MAX_SCRIPT_BYTES,
    ));

    static PROGRAM_CACHE: RefCell<ProgramCache> = RefCell::new(ProgramCache::default());
}

#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
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
        .zip(utxos_bytes_y)
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
    SCRIPT_CACHE
        .try_with(|cache| {
            cache
                .try_borrow_mut()
                .ok()
                .map(|mut cache| eval(&mut cache))
        })
        .ok()
        .flatten()
        .unwrap_or_else(|| eval(&mut ScriptCache::default()))
        .map(|r| {
            r.iter()
                .map(|i| js_sys::Uint8Array::from(&i.0[..]))
                .collect()
        })
        .map_err(|e| e.to_string().into())
}

#[wasm_bindgen]
pub fn apply_params_to_script(
    params_bytes: &[u8],
    plutus_script_bytes: &[u8],
) -> Result<Vec<u8>, JsValue> {
    tx::apply_params_to_script(params_bytes, plutus_script_bytes).map_err(|e| e.to_string().into())
}

/// The outcome of [`eval_program_raw`].
#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EvalProgramResult {
    /// Whether the program succeeded: it did not fail and, for Plutus V3, it
    /// returned unit.
    pub ok: bool,
    /// The CPU the program used. A program that went over budget is charged
    /// what it used up to the point where the machine stopped it.
    pub cpu: u64,
    /// The memory the program used.
    pub mem: u64,
    /// Why the program did not succeed: 0 when it did, 1 when it went over
    /// budget, 2 when it failed in any other way and 3 when a Plutus V3 program
    /// returned something other than unit.
    pub error_kind: u8,
    /// The messages the program traced, in order.
    pub logs: Vec<String>,
}

/// The program succeeded.
pub const EVAL_OK: u8 = 0;
/// The program went over budget.
pub const EVAL_OUT_OF_BUDGET: u8 = 1;
/// The program failed, other than by going over budget.
pub const EVAL_FAILED: u8 = 2;
/// A Plutus V3 program returned something other than unit.
pub const EVAL_NOT_UNIT: u8 = 3;

/// Evaluates a UPLC program applied to Data arguments, outside of any
/// transaction: the caller builds whatever arguments the program expects,
/// including its script context.
///
/// - `program_flat`: the program, flat-encoded without a CBOR wrapper.
/// - `args_cbor`: the arguments, each one CBOR-encoded Data, applied in order.
/// - `language`: the Plutus version to evaluate as, 1, 2 or 3.
/// - `protocol_major_version`: the protocol version whose semantics to use,
///   from 5 (Alonzo) to 12 (Dijkstra).
/// - `cost_model`: the cost model parameters, every one the evaluator knows
///   for this Plutus version (350 for Plutus V3), in the ledger's order.
/// - `budget_cpu`, `budget_mem`: the budget.
/// - `strict_budget`: charge every step as the machine takes it, and stop the
///   program as soon as it goes over budget, instead of charging steps and
///   checking the budget every 200 steps as the ledger does. Only the cost of a
///   program that fails differs: the ledger does not charge the steps it took
///   since the budget was last checked.
///
/// Fails only when the inputs are malformed or unsupported. A program that fails
/// is an [`EvalProgramResult`] that is not `ok`.
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn eval_program_raw(
    program_flat: &[u8],
    args_cbor: Vec<js_sys::Uint8Array>,
    language: u8,
    protocol_major_version: u16,
    cost_model: Vec<i64>,
    budget_cpu: u64,
    budget_mem: u64,
    strict_budget: bool,
) -> Result<EvalProgramResult, JsValue> {
    let args = args_cbor.iter().map(|arg| arg.to_vec()).collect::<Vec<_>>();

    eval_program(
        program_flat,
        &args,
        language,
        protocol_major_version,
        &cost_model,
        budget_cpu,
        budget_mem,
        strict_budget,
    )
    .map_err(|e| e.into())
}

/// Describes this build of the evaluator as JSON: the uplc crate it was built
/// from, the length of each Plutus version's cost model, and a digest of what a
/// fixed set of programs evaluate to, with their costs, under Plutus V3 and the
/// latest protocol version. Two builds with the same digest agree on those
/// programs; `selfTest` says whether this one gives the expected results.
#[wasm_bindgen]
pub fn uplc_build_info() -> String {
    let (digest, failures) = self_test();

    format!(
        r#"{{"uplc":"{} {}","protocolMajorVersion":{},"costModelLengths":{{"PlutusV1":{},"PlutusV2":{},"PlutusV3":{}}},"semanticsDigest":"{}","selfTest":{}}}"#,
        env!("UPLC_VERSION"),
        env!("UPLC_SOURCE"),
        VAN_ROSSEM_PROTOCOL_VERSION,
        ParamName::V1.len(),
        ParamName::V2.len(),
        ParamName::V3.len(),
        digest,
        if failures.is_empty() {
            r#""pass""#.to_string()
        } else {
            format!(r#"{{"failed":["{}"]}}"#, failures.join(r#"",""#))
        },
    )
}

#[allow(clippy::too_many_arguments)]
fn eval_program(
    program_flat: &[u8],
    args_cbor: &[Vec<u8>],
    language: u8,
    protocol_major_version: u16,
    cost_model: &[i64],
    budget_cpu: u64,
    budget_mem: u64,
    strict_budget: bool,
) -> Result<EvalProgramResult, String> {
    let (language, params) = match language {
        1 => (Language::PlutusV1, ParamName::V1.len()),
        2 => (Language::PlutusV2, ParamName::V2.len()),
        3 => (Language::PlutusV3, ParamName::V3.len()),
        _ => return Err(format!("Unsupported Plutus version {language}")),
    };

    if !(ALONZO_PROTOCOL_VERSION..=DIJKSTRA_PROTOCOL_VERSION).contains(&protocol_major_version) {
        return Err("Unsupported protocol major version".to_string());
    }

    // The evaluator prices any parameter missing from the cost model as
    // prohibitively expensive, which would only show up as a script going over
    // budget, so insist on all of them.
    if cost_model.len() != params {
        return Err(format!(
            "Expected {params} cost model parameters for {language:?} but got {}",
            cost_model.len()
        ));
    }

    let budget = ExBudget {
        cpu: i64::try_from(budget_cpu).map_err(|_| "CPU budget out of range")?,
        mem: i64::try_from(budget_mem).map_err(|_| "Memory budget out of range")?,
    };

    // Decoded straight into the evaluator's own Data, which decodes, converts
    // and drops without recursing, so the depth of an argument is not limited
    // by the stack.
    let args = args_cbor
        .iter()
        .map(|arg| Data::decode_fragment(arg).map_err(|e| format!("Invalid Data argument: {e}")))
        .collect::<Result<Vec<Data>, _>>()?;

    let program = with_program_cache(|cache| cache.program(program_flat))?;

    if !protocol::is_uplc_version_available(&language, protocol_major_version, program.version) {
        let (major, minor, patch) = program.version;
        return Err(format!(
            "UPLC {major}.{minor}.{patch} is not available to {language:?} at protocol version {protocol_major_version}"
        ));
    }

    let program = args
        .into_iter()
        .fold(program, |program, arg| program.apply_data(arg));

    let costs = initialize_cost_model_with_protocol(&language, protocol_major_version, cost_model);

    Ok(run(
        program,
        &language,
        protocol_major_version,
        costs,
        budget,
        if strict_budget { 1 } else { LEDGER_SLIPPAGE },
    ))
}

fn run(
    program: Program<NamedDeBruijn>,
    language: &Language,
    protocol_major_version: u16,
    costs: CostModel,
    budget: ExBudget,
    slippage: u32,
) -> EvalProgramResult {
    let mut machine = Machine::new_with_protocol(
        language.clone(),
        protocol_major_version,
        costs,
        budget,
        slippage,
    );

    let result = machine.run_program(program);

    let used = budget - machine.ex_budget;

    let error_kind = match &result {
        Err(Error::OutOfExError(_)) => EVAL_OUT_OF_BUDGET,
        Err(_) | Ok(uplc::ast::Term::Error) => EVAL_FAILED,
        Ok(uplc::ast::Term::Constant(constant))
            if *language != Language::PlutusV3
                || matches!(constant.as_ref(), uplc::ast::Constant::Unit) =>
        {
            EVAL_OK
        }
        Ok(_) if *language != Language::PlutusV3 => EVAL_OK,
        Ok(_) => EVAL_NOT_UNIT,
    };

    EvalProgramResult {
        ok: error_kind == EVAL_OK,
        cpu: u64::try_from(used.cpu).unwrap_or(0),
        mem: u64::try_from(used.mem).unwrap_or(0),
        error_kind,
        logs: machine
            .traces
            .into_iter()
            .filter_map(uplc::machine::Trace::unwrap_log)
            .collect(),
    }
}

/// Decoded flat programs, keyed by the hash of their bytes, so that a program
/// run many times is decoded once. The least recently used programs are evicted
/// to stay within the same limits as the script cache.
#[derive(Default)]
struct ProgramCache {
    programs: HashMap<Hash<32>, CachedProgram>,
    flat_bytes: usize,
    clock: u64,
}

struct CachedProgram {
    program: Program<NamedDeBruijn>,
    flat_len: usize,
    last_used: u64,
}

impl ProgramCache {
    fn program(&mut self, flat: &[u8]) -> Result<Program<NamedDeBruijn>, String> {
        self.clock += 1;

        let key = Hasher::<256>::hash(flat);

        if let Some(cached) = self.programs.get_mut(&key) {
            cached.last_used = self.clock;
            return Ok(cached.program.clone());
        }

        let program: Program<NamedDeBruijn> = Program::<FakeNamedDeBruijn>::from_flat(flat)
            .map_err(|e| format!("Invalid flat program: {e}"))?
            .into();

        if flat.len() <= SCRIPT_CACHE_MAX_SCRIPT_BYTES {
            while self.programs.len() >= SCRIPT_CACHE_MAX_SCRIPTS
                || self.flat_bytes + flat.len() > SCRIPT_CACHE_MAX_SCRIPT_BYTES
            {
                let oldest = *self
                    .programs
                    .iter()
                    .min_by_key(|(_, cached)| cached.last_used)
                    .map(|(key, _)| key)
                    .expect("a full cache holds at least one program");

                if let Some(evicted) = self.programs.remove(&oldest) {
                    self.flat_bytes -= evicted.flat_len;
                }
            }

            self.flat_bytes += flat.len();
            self.programs.insert(
                key,
                CachedProgram {
                    program: program.clone(),
                    flat_len: flat.len(),
                    last_used: self.clock,
                },
            );
        }

        Ok(program)
    }
}

/// Runs `f` with the program cache or, if an earlier call trapped while using
/// it, with a fresh one (see [`eval_phase_two_raw`]).
fn with_program_cache<T>(f: impl Fn(&mut ProgramCache) -> T) -> T {
    PROGRAM_CACHE
        .try_with(|cache| cache.try_borrow_mut().ok().map(|mut cache| f(&mut cache)))
        .ok()
        .flatten()
        .unwrap_or_else(|| f(&mut ProgramCache::default()))
}

/// Programs whose results pin down the semantics this build evaluates with:
/// CIP-138 arrays, CIP-153 values, constr tags and integer operands beyond 32
/// bits, and builtins whose inputs a wasm build used to mishandle. Each comes
/// with its expected result, or `None` when it must fail.
const SELF_TEST: &[(&str, &str, Option<&str>)] = &[
    (
        "indexArray",
        "[(force (builtin indexArray)) (con (array integer) [1, 2, 3]) (con integer 1)]",
        Some("(con integer 2)"),
    ),
    (
        "indexArray beyond Int64",
        "[(force (builtin indexArray)) (con (array integer) [1]) (con integer 18446744073709551616)]",
        None,
    ),
    (
        "lookupCoin",
        "[(builtin lookupCoin) (con bytestring #aa) (con bytestring #aa) (con value [(#aa, [(#aa, 100)]), (#bb, [(#aa, 1)])])]",
        Some("(con integer 100)"),
    ),
    (
        "case constr 2^32+1",
        "(case (constr 4294967297) (con integer 0) (con integer 1))",
        None,
    ),
    (
        "case constr 2^64-1",
        "(case (constr 18446744073709551615) (con integer 0))",
        None,
    ),
    (
        "case bool",
        "(case (con bool True) (con integer 0) (con integer 1))",
        Some("(con integer 1)"),
    ),
    (
        "sliceByteString 2^32",
        "[(builtin sliceByteString) (con integer 4294967296) (con integer 1) (con bytestring #00)]",
        Some("(con bytestring #)"),
    ),
    (
        "sliceByteString below Int64",
        "[(builtin sliceByteString) (con integer -9223372036854775809) (con integer 1) (con bytestring #00)]",
        None,
    ),
    (
        "indexByteString 2^32",
        "[(builtin indexByteString) (con bytestring #00) (con integer 4294967296)]",
        None,
    ),
    (
        "expModInteger",
        "[(builtin expModInteger) (con integer 3) (con integer 5) (con integer 7)]",
        Some("(con integer 5)"),
    ),
    (
        "verifySchnorrSecp256k1Signature short key",
        "[(builtin verifySchnorrSecp256k1Signature) (con bytestring #00) (con bytestring #) (con bytestring #00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)]",
        None,
    ),
];

/// Evaluates [`SELF_TEST`] and returns the hex blake2b-256 digest of the
/// results and costs, with the names of the programs whose result was not the
/// expected one.
fn self_test() -> (String, Vec<&'static str>) {
    let language = Language::PlutusV3;
    let mut transcript = String::new();
    let mut failures = Vec::new();

    for (name, term, expected) in SELF_TEST {
        let program = uplc::parser::program(&format!("(program 1.1.0 {term})"))
            .ok()
            .and_then(|program| Program::<NamedDeBruijn>::try_from(program).ok());

        let Some(program) = program else {
            failures.push(*name);
            continue;
        };

        let mut machine = Machine::new_with_protocol(
            language.clone(),
            VAN_ROSSEM_PROTOCOL_VERSION,
            CostModel::default_for_language_and_protocol(&language, VAN_ROSSEM_PROTOCOL_VERSION),
            ExBudget::max(),
            LEDGER_SLIPPAGE,
        );

        let result = machine
            .run_program(program)
            .ok()
            .map(|term| term.to_pretty());
        let used = ExBudget::max() - machine.ex_budget;

        if result.as_deref() != *expected {
            failures.push(*name);
        }

        transcript.push_str(&format!(
            "{name}\t{}\t{}\t{}\n",
            result.as_deref().unwrap_or("error"),
            used.cpu,
            used.mem
        ));
    }

    (
        hex::encode(Hasher::<256>::hash(transcript.as_bytes())),
        failures,
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use uplc::ast::{DeBruijn, Name};

    const UNIT: &[u8] = &[0xd8, 0x79, 0x80];

    fn cost_model() -> Vec<i64> {
        let json = include_str!("../../test/fixtures/plutus-v3-cost-model.json");
        json.trim_matches(|c: char| c == '[' || c == ']' || c.is_whitespace())
            .split(',')
            .map(|n| n.trim().parse().unwrap())
            .collect()
    }

    fn flat(program: &str) -> Vec<u8> {
        let program: Program<Name> = uplc::parser::program(program).unwrap();
        Program::<DeBruijn>::try_from(program)
            .unwrap()
            .to_flat()
            .unwrap()
    }

    fn eval(language: u8, program: &[u8], budget: (u64, u64)) -> EvalProgramResult {
        eval_program(
            program,
            &[UNIT.to_vec()],
            language,
            VAN_ROSSEM_PROTOCOL_VERSION,
            &cost_model(),
            budget.0,
            budget.1,
            false,
        )
        .unwrap()
    }

    const BUDGET: (u64, u64) = (10_000_000_000, 14_000_000);

    #[test]
    fn self_test_passes() {
        assert_eq!(self_test().1, Vec::<&str>::new());
    }

    #[test]
    fn evaluates_a_program_applied_to_its_arguments() {
        let program = flat(
            r#"(program 1.1.0 (lam ctx [(lam _ [(force (builtin trace)) (con string "hello") (con unit ())]) [(builtin unConstrData) ctx]]))"#,
        );

        let result = eval(3, &program, BUDGET);

        assert!(result.ok);
        assert_eq!(result.error_kind, EVAL_OK);
        assert_eq!(result.logs, vec!["hello".to_string()]);
        assert!(result.cpu > 0 && result.mem > 0);
    }

    /// Deeply nested Data in each shape, as given and in the encoding the
    /// Cardano node uses, nested `depth` times around a leaf.
    fn deep_data(depth: usize) -> Vec<(&'static str, Vec<u8>)> {
        [
            ("constr", "d87981", "00", "", "d8799f", "ff"),
            (
                "general constr",
                "d86682188081",
                "00",
                "",
                "d8669f18809f",
                "ffff",
            ),
            ("list", "81", "00", "", "9f", "ff"),
            ("map value", "a100", "00", "", "bf00", "ff"),
            ("map key", "a1", "00", "00", "bf", "00ff"),
            ("bytes in list", "81", "4100", "", "9f", "ff"),
        ]
        .into_iter()
        .flat_map(|(name, prefix, leaf, suffix, node_prefix, node_suffix)| {
            [(name, prefix, suffix), (name, node_prefix, node_suffix)].map(
                |(name, prefix, suffix)| {
                    let hex = prefix.repeat(depth) + leaf + &suffix.repeat(depth);
                    (name, hex::decode(hex).unwrap())
                },
            )
        })
        .collect()
    }

    /// Compares its two arguments and serialises the first, which walks every
    /// node of both. It fails unless they are equal.
    const COMPARE_AND_SERIALISE: &str = "(program 1.1.0 (lam a (lam b (force [(force (builtin ifThenElse)) [[(builtin equalsData) a] b] (delay [(lam r (con unit ())) [(builtin serialiseData) a]]) (delay (error))]))))";

    #[test]
    fn evaluates_deeply_nested_data_arguments() {
        let program = flat(COMPARE_AND_SERIALISE);

        for (name, data) in deep_data(100_000) {
            let result = eval_program(
                &program,
                &[data.clone(), data],
                3,
                VAN_ROSSEM_PROTOCOL_VERSION,
                &cost_model(),
                u64::MAX >> 1,
                u64::MAX >> 1,
                false,
            )
            .unwrap();

            assert_eq!((name, result.error_kind), (name, EVAL_OK));
        }
    }

    #[test]
    fn decodes_arguments_as_plutus_does() {
        let compare = |a: &str, b: &str| {
            eval_program(
                &flat(COMPARE_AND_SERIALISE),
                &[hex::decode(a).unwrap(), hex::decode(b).unwrap()],
                3,
                VAN_ROSSEM_PROTOCOL_VERSION,
                &cost_model(),
                u64::MAX >> 1,
                u64::MAX >> 1,
                false,
            )
        };

        // A tag 102 constructor in an indefinite array ends at its own break,
        // not at the break of the list holding it: both are [Constr 0 [], 1].
        let result = compare("9fd8669f0080ff01ff", "9fd8798001ff").unwrap();
        assert_eq!(result.error_kind, EVAL_OK);

        // A big integer tag outside its head byte, and a tag 102 constructor
        // that is not an (index, fields) pair, are not Data.
        assert!(compare("d8024101", "01").is_err());
        assert!(compare("d86683008000", "d87980").is_err());
    }

    /// Applies the parameters, given as a CBOR array of Data, to a program of
    /// two parameters.
    fn apply_params(params: &str) -> Vec<u8> {
        let script = Program::<DeBruijn>::try_from(
            uplc::parser::program("(program 1.1.0 (lam a (lam b (con unit ()))))").unwrap(),
        )
        .unwrap()
        .to_cbor()
        .unwrap();

        apply_params_to_script(&hex::decode(params).unwrap(), &script).unwrap()
    }

    /// The program of two parameters applied to `arguments`, CBOR-wrapped.
    fn applied_to(arguments: &str) -> Vec<u8> {
        Program::<DeBruijn>::try_from(
            uplc::parser::program(&format!(
                "(program 1.1.0 {})",
                arguments.split(" , ").fold(
                    "(lam a (lam b (con unit ())))".to_string(),
                    |program, argument| format!("[{program} (con data {argument})]")
                )
            ))
            .unwrap(),
        )
        .unwrap()
        .to_cbor()
        .unwrap()
    }

    #[test]
    fn applies_each_parameter_after_a_general_constr() {
        // [Constr 128 [], 1], the constructor in the indefinite form: two
        // parameters.
        assert_eq!(
            apply_params("9fd8669f188080ff01ff"),
            applied_to("(Constr 128 []) , (I 1)")
        );
        // The same in the definite form.
        assert_eq!(
            apply_params("9fd8668218808001ff"),
            applied_to("(Constr 128 []) , (I 1)")
        );
        // [[Constr 128 [], 5]]: one parameter, a list.
        assert_eq!(
            apply_params("9f9fd8669f188080ff05ffff"),
            applied_to("(List [Constr 128 [], I 5])")
        );
    }

    #[test]
    fn tells_why_a_program_did_not_succeed() {
        let returns_true = flat("(program 1.1.0 (lam ctx (con bool True)))");
        let fails = flat("(program 1.1.0 (lam ctx (error)))");

        assert_eq!(eval(3, &returns_true, BUDGET).error_kind, EVAL_NOT_UNIT);
        assert_eq!(eval(3, &fails, BUDGET).error_kind, EVAL_FAILED);
        assert_eq!(
            eval(3, &returns_true, (1000, 1000)).error_kind,
            EVAL_OUT_OF_BUDGET
        );
        assert!(!eval(3, &fails, BUDGET).ok);

        // Only Plutus V3 programs must return unit.
        let v2_cost_model_len = ParamName::V2.len();
        let result = eval_program(
            &flat("(program 1.0.0 (lam ctx (con bool True)))"),
            &[UNIT.to_vec()],
            2,
            VAN_ROSSEM_PROTOCOL_VERSION,
            &vec![0; v2_cost_model_len],
            BUDGET.0,
            BUDGET.1,
            false,
        )
        .unwrap();
        assert_eq!((result.ok, result.error_kind), (true, EVAL_OK));
    }

    #[test]
    fn strict_budget_stops_as_soon_as_the_budget_runs_out() {
        // Loops forever.
        let program = flat("(program 1.1.0 (lam ctx [(lam x [x x]) (lam x [x x])]))");
        let run = |strict_budget| {
            eval_program(
                &program,
                &[UNIT.to_vec()],
                3,
                VAN_ROSSEM_PROTOCOL_VERSION,
                &cost_model(),
                1_000_000,
                1_000_000,
                strict_budget,
            )
            .unwrap()
        };

        let strict = run(true);
        let ledger = run(false);

        assert_eq!(strict.error_kind, EVAL_OUT_OF_BUDGET);
        assert_eq!(ledger.error_kind, EVAL_OUT_OF_BUDGET);
        assert!(strict.cpu > 1_000_000 && strict.cpu <= 1_000_000 + 16_000);
        assert!(ledger.cpu > strict.cpu);

        // A program within budget costs the same either way.
        let program = flat("(program 1.1.0 (lam ctx (con unit ())))");
        let costs = [true, false].map(|strict_budget| {
            let result = eval_program(
                &program,
                &[UNIT.to_vec()],
                3,
                VAN_ROSSEM_PROTOCOL_VERSION,
                &cost_model(),
                BUDGET.0,
                BUDGET.1,
                strict_budget,
            )
            .unwrap();
            (result.cpu, result.mem)
        });
        assert_eq!(costs[0], costs[1]);
    }

    #[test]
    fn rejects_malformed_or_unsupported_inputs() {
        let program = flat("(program 1.1.0 (lam ctx (con unit ())))");
        let costs = cost_model();
        let eval = |program: &[u8], arg: &[u8], language, protocol, costs: &[i64], cpu| {
            eval_program(
                program,
                &[arg.to_vec()],
                language,
                protocol,
                costs,
                cpu,
                1000,
                false,
            )
        };

        assert!(eval(&program, UNIT, 3, 11, &costs, 1000).is_ok());
        assert!(eval(&program, UNIT, 0, 11, &costs, 1000).is_err());
        assert!(eval(&program, UNIT, 4, 11, &costs, 1000).is_err());
        assert!(eval(&program, UNIT, 3, 4, &costs, 1000).is_err());
        assert!(eval(&program, UNIT, 3, 12, &costs, 1000).is_ok());
        assert!(eval(&program, UNIT, 3, 13, &costs, 1000).is_err());
        assert!(eval(&program, UNIT, 3, 11, &costs[..349], 1000).is_err());
        assert!(eval(&program, UNIT, 3, 11, &[&costs[..], &[0]].concat(), 1000).is_err());
        assert!(eval(&program, UNIT, 3, 11, &costs, u64::MAX).is_err());
        assert!(eval(&program, &[0xd8, 0x79], 3, 11, &costs, 1000).is_err());
        // Arguments decode as Plutus decodes Data: a byte string in a single
        // chunk of more than 64 bytes is not Data.
        let bytes = |n: u8| [&[0x58, n][..], &vec![0; n.into()]].concat();
        assert!(eval(&program, &bytes(64), 3, 11, &costs, 1000).is_ok());
        assert!(eval(&program, &bytes(65), 3, 11, &costs, 1000).is_err());
        assert!(eval(&program[..2], UNIT, 3, 11, &costs, 1000).is_err());

        // UPLC versions become available as the ledger allows them.
        let v1_costs = vec![0; ParamName::V1.len()];
        assert!(eval(&program, UNIT, 1, 10, &v1_costs, 1000).is_err());
        assert!(eval(&program, UNIT, 1, 11, &v1_costs, 1000).is_ok());
        let program = flat("(program 1.2.0 (lam ctx (con unit ())))");
        assert!(eval(&program, UNIT, 3, 11, &costs, 1000).is_err());
        assert!(eval(&program, UNIT, 3, 12, &costs, 1000).is_ok());
    }

    #[test]
    fn program_cache_keeps_the_most_recently_used_programs() {
        let mut cache = ProgramCache::default();
        let programs = (0..=SCRIPT_CACHE_MAX_SCRIPTS)
            .map(|i| flat(&format!("(program 1.1.0 (con integer {i}))")))
            .collect::<Vec<_>>();

        for program in &programs {
            cache.program(program).unwrap();
        }
        assert_eq!(cache.programs.len(), SCRIPT_CACHE_MAX_SCRIPTS);
        assert!(!cache
            .programs
            .contains_key(&Hasher::<256>::hash(&programs[0])));

        // Using a program keeps it; the next one in line is evicted instead.
        cache.program(&programs[1]).unwrap();
        cache.program(&programs[0]).unwrap();
        assert!(cache
            .programs
            .contains_key(&Hasher::<256>::hash(&programs[1])));
        assert!(!cache
            .programs
            .contains_key(&Hasher::<256>::hash(&programs[2])));
        assert_eq!(
            cache.flat_bytes,
            cache
                .programs
                .values()
                .map(|cached| cached.flat_len)
                .sum::<usize>()
        );

        // A cached program evaluates as a freshly decoded one.
        let program = &programs[0];
        assert_eq!(
            cache.program(program).unwrap(),
            Program::<FakeNamedDeBruijn>::from_flat(program)
                .unwrap()
                .into()
        );
    }

    #[test]
    fn program_cache_skips_programs_larger_than_its_limit() {
        let mut cache = ProgramCache::default();
        let program = flat(&format!(
            "(program 1.1.0 (con bytestring #{}))",
            "00".repeat(SCRIPT_CACHE_MAX_SCRIPT_BYTES)
        ));

        assert!(cache.program(&program).is_ok());
        assert!(cache.programs.is_empty());
        assert_eq!(cache.flat_bytes, 0);
    }
}
