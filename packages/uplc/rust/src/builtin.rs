//! Evaluates one saturated builtin application with the evaluator's own
//! semantics and costs, for callers that step through UPLC programs themselves.

use std::{cell::OnceCell, rc::Rc};

use uplc::{
    ast::{Constant, DeBruijn, Program, Term, Type},
    builtins::DefaultFunction,
    machine::{
        cost_model::{BuiltinCosts, CostModel, ExBudget},
        runtime::{BuiltinRuntime, BuiltinSemantics},
        value::Value,
        Error,
    },
    protocol::{CHANG_PROTOCOL_VERSION, DIJKSTRA_PROTOCOL_VERSION},
    Language,
};
use wasm_bindgen::prelude::*;

#[cfg(test)]
mod tests;

/// How a value of [`eval_builtin_raw`] is encoded: the codes of its
/// `arg_kinds` and of the result's `result_kind`.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BuiltinValueKind {
    /// A flat-encoded program whose body is a constant,
    /// `(program 1.1.0 (con …))`. A result in this form is always version
    /// 1.1.0.
    Flat = 0,
    /// A BLS12-381 G1 point, as its 48-byte compressed encoding.
    G1 = 1,
    /// A BLS12-381 G2 point, as its 96-byte compressed encoding.
    G2 = 2,
    /// A list of BLS12-381 G1 points, as their compressed encodings one after
    /// the other.
    G1List = 3,
    /// A list of BLS12-381 G2 points, as their compressed encodings one after
    /// the other.
    G2List = 4,
    /// An array of BLS12-381 G1 points, as their compressed encodings one after
    /// the other.
    G1Array = 5,
    /// An array of BLS12-381 G2 points, as their compressed encodings one after
    /// the other.
    G2Array = 6,
}

/// Why the builtin given to [`eval_builtin_raw`] did not return a value: the
/// codes of the result's `error_kind`.
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BuiltinErrorKind {
    /// The builtin returned a value.
    Ok = 0,
    /// The builtin is not available to Plutus V3 at the protocol version.
    NotAvailable = 1,
    /// The builtin did not accept its arguments, which fails the application
    /// before it is costed.
    RejectedArguments = 2,
    /// The builtin failed after it was costed.
    Failed = 3,
}

// The same codes as bytes, to match on.
pub const VALUE_FLAT: u8 = BuiltinValueKind::Flat as u8;
pub const VALUE_G1: u8 = BuiltinValueKind::G1 as u8;
pub const VALUE_G2: u8 = BuiltinValueKind::G2 as u8;
pub const VALUE_G1_LIST: u8 = BuiltinValueKind::G1List as u8;
pub const VALUE_G2_LIST: u8 = BuiltinValueKind::G2List as u8;
pub const VALUE_G1_ARRAY: u8 = BuiltinValueKind::G1Array as u8;
pub const VALUE_G2_ARRAY: u8 = BuiltinValueKind::G2Array as u8;

pub const BUILTIN_OK: u8 = BuiltinErrorKind::Ok as u8;
pub const BUILTIN_NOT_AVAILABLE: u8 = BuiltinErrorKind::NotAvailable as u8;
pub const BUILTIN_REJECTED_ARGUMENTS: u8 = BuiltinErrorKind::RejectedArguments as u8;
pub const BUILTIN_FAILED: u8 = BuiltinErrorKind::Failed as u8;

const G1_COMPRESSED_SIZE: usize = 48;
const G2_COMPRESSED_SIZE: usize = 96;

/// The outcome of [`eval_builtin_raw`].
#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EvalBuiltinResult {
    /// Whether the builtin returned a value.
    pub ok: bool,
    /// Why the builtin did not return a value, a [`BuiltinErrorKind`]: 0 when
    /// it did, 1 when it is not available to Plutus V3 at the protocol version,
    /// 2 when it did not accept its arguments (so the machine fails before
    /// costing it) and 3 when it failed after being costed.
    pub error_kind: u8,
    /// How `result` encodes the value, a [`BuiltinValueKind`] as for the
    /// arguments of [`eval_builtin_raw`]; 0 when there is no value.
    pub result_kind: u8,
    /// The value the builtin returned; empty when there is none.
    pub result: Vec<u8>,
    /// The CPU the builtin's cost model charges for this application, under
    /// Plutus' default cost model for Plutus V3 at the protocol version; 0
    /// when the builtin was not costed (error kinds 1 and 2). It leaves out the
    /// machine's own step costs for evaluating the application (the builtin,
    /// each force and each apply).
    pub cpu: u64,
    /// The memory the builtin's cost model charges for this application; see
    /// `cpu`.
    pub mem: u64,
    /// The evaluator's description of why the builtin did not return a value;
    /// empty when it did.
    pub error: String,
}

/// Evaluates the builtin `tag` applied to `args` as a Plutus V3 script
/// evaluates it at a protocol version, without any program around it: the
/// result, or how it fails, is what the machine gives for the saturated
/// application.
///
/// - `tag`: the builtin's flat tag (0 for addInteger to 100 for scaleValue).
///   The Miller-loop builtins (68 to 70) are not supported, since their
///   results cannot be returned.
/// - `args`: exactly the builtin's arguments, in order, each encoded as the
///   matching entry of `arg_kinds` says, a [`BuiltinValueKind`]: 0 for a
///   flat-encoded `(program 1.1.0 (con …))`, 1 for a compressed G1 point, 2
///   for a compressed G2 point, 3 for a list of G1 points, 4 for a list of G2
///   points, 5 for an array of G1 points and 6 for an array of G2 points, each
///   list or array as the compressed points one after the other. Flat cannot
///   encode BLS12-381 points, so they cross as their compressed bytes.
/// - `protocol_major_version`: from 9 (Chang, which introduced Plutus V3) to
///   12 (Dijkstra). It decides which builtins are available and the semantics
///   they have.
///
/// The result's `cpu` and `mem` are the builtin's charge for the application
/// under Plutus' default Plutus V3 cost model (not the ledger's protocol
/// parameters), excluding the machine's per-step costs.
///
/// Fails only when the inputs are malformed or unsupported: an unknown or
/// Miller-loop tag, a number of arguments other than the builtin's arity, an
/// argument that does not decode as its kind says or is not a constant, an
/// invalid compressed point, a protocol version out of range, or a result that
/// none of the kinds can encode. A builtin that fails is an
/// [`EvalBuiltinResult`] that is not `ok`.
#[wasm_bindgen]
pub fn eval_builtin_raw(
    tag: u8,
    args: Vec<js_sys::Uint8Array>,
    arg_kinds: &[u8],
    protocol_major_version: u16,
) -> Result<EvalBuiltinResult, JsValue> {
    let args = args.iter().map(|arg| arg.to_vec()).collect::<Vec<_>>();

    eval_builtin(tag, &args, arg_kinds, protocol_major_version).map_err(|e| e.into())
}

pub(crate) fn eval_builtin(
    tag: u8,
    args: &[Vec<u8>],
    arg_kinds: &[u8],
    protocol_major_version: u16,
) -> Result<EvalBuiltinResult, String> {
    let fun = DefaultFunction::try_from(tag).map_err(|_| format!("Unknown builtin tag {tag}"))?;

    if matches!(
        fun,
        DefaultFunction::Bls12_381_MillerLoop
            | DefaultFunction::Bls12_381_MulMlResult
            | DefaultFunction::Bls12_381_FinalVerify
    ) {
        return Err(format!(
            "{fun} is not supported: Miller-loop results cannot be passed"
        ));
    }

    if !(CHANG_PROTOCOL_VERSION..=DIJKSTRA_PROTOCOL_VERSION).contains(&protocol_major_version) {
        return Err("Unsupported protocol major version".to_string());
    }

    if args.len() != arg_kinds.len() {
        return Err(format!(
            "Got {} arguments but {} argument kinds",
            args.len(),
            arg_kinds.len()
        ));
    }

    if args.len() != fun.arity() {
        return Err(format!(
            "{fun} takes {} arguments but got {}",
            fun.arity(),
            args.len()
        ));
    }

    let language = Language::PlutusV3;
    let semantics = BuiltinSemantics::for_language_and_protocol(&language, protocol_major_version);

    let args = args
        .iter()
        .zip(arg_kinds)
        .enumerate()
        .map(|(index, (arg, kind))| {
            decode_value(arg, *kind, semantics)
                .map(Value::Con)
                .map_err(|e| format!("Argument {index}: {e}"))
        })
        .collect::<Result<Vec<_>, _>>()?;

    if !fun.is_available_in(&language, protocol_major_version) {
        return Ok(failure(
            BUILTIN_NOT_AVAILABLE,
            ExBudget { cpu: 0, mem: 0 },
            Error::BuiltinNotAvailable(fun),
        ));
    }

    // The machine's order (`Machine::eval_builtin_app`): unlift the arguments,
    // cost the application, then call the builtin.
    let mut runtime = BuiltinRuntime::new(fun);
    for arg in args {
        runtime.push(arg).map_err(|e| e.to_string())?;
    }

    let uncosted = ExBudget { cpu: 0, mem: 0 };

    if let Err(error) = runtime.unlift_arguments(semantics) {
        return Ok(failure(BUILTIN_REJECTED_ARGUMENTS, uncosted, error));
    }

    let cost = match with_default_builtin_costs(protocol_major_version, |costs| {
        runtime.to_ex_budget(costs, semantics)
    }) {
        Ok(cost) => cost,
        Err(error) => return Ok(failure(BUILTIN_REJECTED_ARGUMENTS, uncosted, error)),
    };

    match runtime.call(semantics, &mut Vec::new()) {
        Ok(Value::Con(constant)) => {
            let (result_kind, result) = encode_value(&constant, semantics)
                .map_err(|e| format!("{fun} returned a value that cannot be passed: {e}"))?;

            Ok(EvalBuiltinResult {
                ok: true,
                error_kind: BUILTIN_OK,
                result_kind,
                result,
                cpu: u64::try_from(cost.cpu).unwrap_or(0),
                mem: u64::try_from(cost.mem).unwrap_or(0),
                error: String::new(),
            })
        }
        Ok(_) => Err(format!("{fun} returned something other than a constant")),
        Err(error) => Ok(failure(BUILTIN_FAILED, cost, error)),
    }
}

fn failure(error_kind: u8, cost: ExBudget, error: Error) -> EvalBuiltinResult {
    EvalBuiltinResult {
        ok: false,
        error_kind,
        result_kind: VALUE_FLAT,
        result: Vec::new(),
        cpu: u64::try_from(cost.cpu).unwrap_or(0),
        mem: u64::try_from(cost.mem).unwrap_or(0),
        error: error.to_string(),
    }
}

/// Decodes an argument of [`eval_builtin_raw`].
pub(crate) fn decode_value(
    bytes: &[u8],
    kind: u8,
    semantics: BuiltinSemantics,
) -> Result<Rc<Constant>, String> {
    match kind {
        VALUE_FLAT => {
            let program = Program::<DeBruijn>::from_flat(bytes)
                .map_err(|e| format!("Invalid flat program: {e}"))?;

            match &program.term {
                Term::Constant(constant) => Ok(constant.clone()),
                _ => Err("The program is not a constant".to_string()),
            }
        }
        VALUE_G1 => uncompress(DefaultFunction::Bls12_381_G1_Uncompress, bytes, semantics),
        VALUE_G2 => uncompress(DefaultFunction::Bls12_381_G2_Uncompress, bytes, semantics),
        VALUE_G1_LIST | VALUE_G1_ARRAY => uncompress_all(
            DefaultFunction::Bls12_381_G1_Uncompress,
            Type::Bls12_381G1Element,
            G1_COMPRESSED_SIZE,
            kind == VALUE_G1_ARRAY,
            bytes,
            semantics,
        ),
        VALUE_G2_LIST | VALUE_G2_ARRAY => uncompress_all(
            DefaultFunction::Bls12_381_G2_Uncompress,
            Type::Bls12_381G2Element,
            G2_COMPRESSED_SIZE,
            kind == VALUE_G2_ARRAY,
            bytes,
            semantics,
        ),
        _ => Err(format!("Unknown argument kind {kind}")),
    }
}

/// Encodes a value [`eval_builtin_raw`] returns, as its kind and bytes.
pub(crate) fn encode_value(
    constant: &Rc<Constant>,
    semantics: BuiltinSemantics,
) -> Result<(u8, Vec<u8>), String> {
    match constant.as_ref() {
        Constant::Bls12_381G1Element(_) => Ok((
            VALUE_G1,
            compress(DefaultFunction::Bls12_381_G1_Compress, constant, semantics)?,
        )),
        Constant::Bls12_381G2Element(_) => Ok((
            VALUE_G2,
            compress(DefaultFunction::Bls12_381_G2_Compress, constant, semantics)?,
        )),
        Constant::ProtoList(Type::Bls12_381G1Element, items) => Ok((
            VALUE_G1_LIST,
            compress_all(DefaultFunction::Bls12_381_G1_Compress, items, semantics)?,
        )),
        Constant::ProtoList(Type::Bls12_381G2Element, items) => Ok((
            VALUE_G2_LIST,
            compress_all(DefaultFunction::Bls12_381_G2_Compress, items, semantics)?,
        )),
        Constant::ProtoArray(Type::Bls12_381G1Element, items) => Ok((
            VALUE_G1_ARRAY,
            compress_all(DefaultFunction::Bls12_381_G1_Compress, items, semantics)?,
        )),
        Constant::ProtoArray(Type::Bls12_381G2Element, items) => Ok((
            VALUE_G2_ARRAY,
            compress_all(DefaultFunction::Bls12_381_G2_Compress, items, semantics)?,
        )),
        _ => Program {
            version: (1, 1, 0),
            term: Term::<DeBruijn>::Constant(constant.clone()),
        }
        .to_flat()
        .map(|flat| (VALUE_FLAT, flat))
        .map_err(|e| e.to_string()),
    }
}

/// Applies a builtin that cannot fail on well-typed arguments.
fn apply(
    fun: DefaultFunction,
    arg: Value,
    semantics: BuiltinSemantics,
) -> Result<Rc<Constant>, String> {
    let mut runtime = BuiltinRuntime::new(fun);
    runtime.push(arg).map_err(|e| e.to_string())?;
    runtime
        .unlift_arguments(semantics)
        .map_err(|e| e.to_string())?;

    match runtime.call(semantics, &mut Vec::new()) {
        Ok(Value::Con(constant)) => Ok(constant),
        Ok(_) => Err(format!("{fun} returned something other than a constant")),
        Err(e) => Err(e.to_string()),
    }
}

fn uncompress(
    fun: DefaultFunction,
    bytes: &[u8],
    semantics: BuiltinSemantics,
) -> Result<Rc<Constant>, String> {
    apply(fun, Value::byte_string(bytes.to_vec()), semantics)
        .map_err(|e| format!("Invalid compressed point: {e}"))
}

/// Uncompresses a list, or an array, of points.
fn uncompress_all(
    fun: DefaultFunction,
    typ: Type,
    size: usize,
    array: bool,
    bytes: &[u8],
    semantics: BuiltinSemantics,
) -> Result<Rc<Constant>, String> {
    if !bytes.len().is_multiple_of(size) {
        return Err(format!(
            "A list or array of compressed points is {} bytes long, not a multiple of {size}",
            bytes.len()
        ));
    }

    let items = bytes
        .chunks(size)
        .map(|point| uncompress(fun, point, semantics))
        .collect::<Result<Vec<_>, _>>()?;

    Ok(Rc::new(if array {
        Constant::ProtoArray(typ, items.into())
    } else {
        Constant::ProtoList(typ, items.into())
    }))
}

fn compress(
    fun: DefaultFunction,
    point: &Rc<Constant>,
    semantics: BuiltinSemantics,
) -> Result<Vec<u8>, String> {
    match apply(fun, Value::Con(point.clone()), semantics)?.as_ref() {
        Constant::ByteString(bytes) => Ok(bytes.clone()),
        _ => Err(format!("{fun} returned something other than bytes")),
    }
}

fn compress_all(
    fun: DefaultFunction,
    points: &[Rc<Constant>],
    semantics: BuiltinSemantics,
) -> Result<Vec<u8>, String> {
    points.iter().try_fold(Vec::new(), |mut bytes, point| {
        bytes.extend(compress(fun, point, semantics)?);
        Ok(bytes)
    })
}

thread_local! {
    /// Plutus' default Plutus V3 builtin costs, for each protocol version from
    /// 9 to 12.
    static DEFAULT_BUILTIN_COSTS: [OnceCell<BuiltinCosts>; 4] = Default::default();
}

/// Applies `f` to Plutus' default builtin costs for Plutus V3 at a protocol
/// version from 9 to 12 (`CostModel::default_for_language_and_protocol`),
/// built once per version.
fn with_default_builtin_costs<T>(
    protocol_major_version: u16,
    f: impl FnOnce(&BuiltinCosts) -> T,
) -> T {
    let index = usize::from(protocol_major_version - CHANG_PROTOCOL_VERSION);

    DEFAULT_BUILTIN_COSTS.with(|costs| {
        f(costs[index].get_or_init(|| {
            CostModel::default_for_language_and_protocol(
                &Language::PlutusV3,
                protocol_major_version,
            )
            .builtin_costs
        }))
    })
}
