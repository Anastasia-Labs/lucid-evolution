use super::*;
use uplc::{
    ast::{Name, NamedDeBruijn},
    machine::Machine,
    protocol::{PLOMIN_PROTOCOL_VERSION, VAN_ROSSEM_PROTOCOL_VERSION},
};

/// The compressed BLS12-381 G1 generator, its negation and the point at
/// infinity.
const G1: &str = "97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb";
const G1_NEG: &str = "b7f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb";
/// The compressed BLS12-381 G2 generator and its negation.
const G2: &str = "93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8";
const G2_NEG: &str = "b3e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8";

fn g1_zero() -> String {
    format!("c0{}", "00".repeat(47))
}

fn g2_zero() -> String {
    format!("c0{}", "00".repeat(95))
}

fn g1(hex: &str) -> String {
    format!("(con bls12_381_G1_element 0x{hex})")
}

fn g2(hex: &str) -> String {
    format!("(con bls12_381_G2_element 0x{hex})")
}

/// The steps the machine charges for `[(force … (builtin f)) a₁ … aₙ]`
/// besides the builtin itself, under Plutus' default Plutus V3 machine costs:
/// the startup cost, then one step for the builtin, each force, each argument
/// constant and each application.
fn overhead(args: usize, forces: u32) -> ExBudget {
    let steps = 1 + i64::from(forces) + 2 * args as i64;

    ExBudget {
        cpu: 100 + 16_000 * steps,
        mem: 100 + 100 * steps,
    }
}

enum Expected {
    /// The builtin returns this constant.
    Returns(String),
    /// The builtin returns a value; only the machine says which.
    Succeeds,
    /// The builtin fails; the machine says how.
    Fails,
}

struct Case {
    builtin: &'static str,
    label: &'static str,
    protocol: u16,
    args: Vec<String>,
    expected: Expected,
}

fn returns(builtin: &'static str, label: &'static str, args: &[&str], result: &str) -> Case {
    Case {
        builtin,
        label,
        protocol: VAN_ROSSEM_PROTOCOL_VERSION,
        args: args.iter().map(|arg| arg.to_string()).collect(),
        expected: Expected::Returns(result.to_string()),
    }
}

fn fails(builtin: &'static str, label: &'static str, args: &[&str]) -> Case {
    Case {
        builtin,
        label,
        protocol: VAN_ROSSEM_PROTOCOL_VERSION,
        args: args.iter().map(|arg| arg.to_string()).collect(),
        expected: Expected::Fails,
    }
}

fn succeeds(builtin: &'static str, label: &'static str, args: &[&str]) -> Case {
    Case {
        expected: Expected::Succeeds,
        ..fails(builtin, label, args)
    }
}

fn at(protocol: u16, case: Case) -> Case {
    Case { protocol, ..case }
}

const INT_1: &str = "(con integer 1)";
const INT_2: &str = "(con integer 2)";
const TRUE: &str = "(con bool True)";
const FALSE: &str = "(con bool False)";
const UNIT: &str = "(con unit ())";
const EMPTY: &str = "(con bytestring #)";

/// At least one application of every builtin that returns a value, and one that
/// fails, under protocol version 11 unless a case says otherwise.
fn cases() -> Vec<Case> {
    let g1_gen = g1(G1);
    let g1_neg = g1(G1_NEG);
    let g1_zero = g1(&g1_zero());
    let g2_gen = g2(G2);
    let g2_neg = g2(G2_NEG);
    let g2_zero = g2(&g2_zero());
    let g1_bytes = format!("(con bytestring #{G1})");
    let g2_bytes = format!("(con bytestring #{G2})");
    let g1_list = format!("(con (list bls12_381_G1_element) [0x{G1}, 0x{G1}])");
    let g2_list = format!("(con (list bls12_381_G2_element) [0x{G2}, 0x{G2}])");
    let g1_array = format!("(con (array bls12_381_G1_element) [0x{G1}, 0x{G1}])");
    let g2_array = format!("(con (array bls12_381_G2_element) [0x{G2}, 0x{G2}])");
    let long_dst = format!("(con bytestring #{})", "00".repeat(256));
    let value_1 = "(con value [(#aa, [(#bb, 1)])])";
    let value_2 = "(con value [(#aa, [(#bb, 2)])])";
    let value_6 = "(con value [(#aa, [(#bb, 6)])])";
    let value_data = "(con data (Map [(B #aa, Map [(B #bb, I 1)])]))";

    // RFC 8032, section 7.1, test 1.
    let ed25519_key =
        "(con bytestring #d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a)";
    let ed25519_signature = "(con bytestring #e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b)";
    // BIP 340 test vector 0.
    let schnorr_key =
        "(con bytestring #f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9)";
    let schnorr_message = format!("(con bytestring #{})", "00".repeat(32));
    let schnorr_signature = "(con bytestring #e907831f80848d1069a5371b402410364bdf1c5f8307b0084c55f1ce2dca821525f66a4a85ea8b71e482a74f382d2ce5ebeee8fdb2172f477df4900d310536c0)";
    // The secp256k1 generator, and a well-formed signature that does not verify.
    let ecdsa_key =
        "(con bytestring #0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798)";
    let ecdsa_signature = format!("(con bytestring #{})", "01".repeat(64));

    vec![
        // Integers
        returns("addInteger", "1 2", &[INT_1, INT_2], "(con integer 3)"),
        fails("addInteger", "bytestring", &[INT_1, EMPTY]),
        returns(
            "subtractInteger",
            "1 2",
            &[INT_1, INT_2],
            "(con integer -1)",
        ),
        fails("subtractInteger", "bool", &[TRUE, INT_1]),
        returns(
            "multiplyInteger",
            "-3 4",
            &["(con integer -3)", "(con integer 4)"],
            "(con integer -12)",
        ),
        fails("multiplyInteger", "unit", &[UNIT, INT_1]),
        returns(
            "divideInteger",
            "-7 2",
            &["(con integer -7)", INT_2],
            "(con integer -4)",
        ),
        fails("divideInteger", "by zero", &[INT_1, "(con integer 0)"]),
        // Plutus' default cost model for protocol versions 9 and 10 charges
        // divisions, and equalsByteString below, differently from the one for
        // protocol versions 11 and 12.
        at(
            CHANG_PROTOCOL_VERSION,
            returns(
                "divideInteger",
                "-7 2",
                &["(con integer -7)", INT_2],
                "(con integer -4)",
            ),
        ),
        returns(
            "quotientInteger",
            "-7 2",
            &["(con integer -7)", INT_2],
            "(con integer -3)",
        ),
        fails("quotientInteger", "by zero", &[INT_1, "(con integer 0)"]),
        returns(
            "remainderInteger",
            "-7 2",
            &["(con integer -7)", INT_2],
            "(con integer -1)",
        ),
        fails("remainderInteger", "by zero", &[INT_1, "(con integer 0)"]),
        returns(
            "modInteger",
            "-7 2",
            &["(con integer -7)", INT_2],
            "(con integer 1)",
        ),
        fails("modInteger", "by zero", &[INT_1, "(con integer 0)"]),
        returns("equalsInteger", "1 1", &[INT_1, INT_1], TRUE),
        fails("equalsInteger", "string", &[INT_1, "(con string \"1\")"]),
        returns("lessThanInteger", "1 2", &[INT_1, INT_2], TRUE),
        fails("lessThanInteger", "string", &["(con string \"1\")", INT_2]),
        returns("lessThanEqualsInteger", "2 1", &[INT_2, INT_1], FALSE),
        fails(
            "lessThanEqualsInteger",
            "data",
            &["(con data (I 1))", INT_1],
        ),
        // Byte strings
        returns(
            "appendByteString",
            "#01 #0203",
            &["(con bytestring #01)", "(con bytestring #0203)"],
            "(con bytestring #010203)",
        ),
        fails(
            "appendByteString",
            "integer",
            &["(con bytestring #01)", INT_1],
        ),
        returns(
            "consByteString",
            "65 #",
            &["(con integer 65)", EMPTY],
            "(con bytestring #41)",
        ),
        fails("consByteString", "256 #", &["(con integer 256)", EMPTY]),
        returns(
            "sliceByteString",
            "1 2 #00010203",
            &[INT_1, INT_2, "(con bytestring #00010203)"],
            "(con bytestring #0102)",
        ),
        fails("sliceByteString", "integer", &[INT_1, INT_1, INT_1]),
        returns(
            "lengthOfByteString",
            "#0001",
            &["(con bytestring #0001)"],
            INT_2,
        ),
        fails("lengthOfByteString", "string", &["(con string \"\")"]),
        returns(
            "indexByteString",
            "#0a0b 1",
            &["(con bytestring #0a0b)", INT_1],
            "(con integer 11)",
        ),
        fails(
            "indexByteString",
            "out of bounds",
            &["(con bytestring #0a)", INT_1],
        ),
        returns(
            "equalsByteString",
            "#01 #01",
            &["(con bytestring #01)", "(con bytestring #01)"],
            TRUE,
        ),
        fails(
            "equalsByteString",
            "integer",
            &[INT_1, "(con bytestring #01)"],
        ),
        at(
            PLOMIN_PROTOCOL_VERSION,
            returns(
                "equalsByteString",
                "#01 #01",
                &["(con bytestring #01)", "(con bytestring #01)"],
                TRUE,
            ),
        ),
        returns(
            "lessThanByteString",
            "#01 #02",
            &["(con bytestring #01)", "(con bytestring #02)"],
            TRUE,
        ),
        fails("lessThanByteString", "unit", &[UNIT, EMPTY]),
        returns(
            "lessThanEqualsByteString",
            "#02 #02",
            &["(con bytestring #02)", "(con bytestring #02)"],
            TRUE,
        ),
        fails("lessThanEqualsByteString", "bool", &[EMPTY, TRUE]),
        // Hashes
        returns(
            "sha2_256",
            "#",
            &[EMPTY],
            "(con bytestring #e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855)",
        ),
        fails("sha2_256", "string", &["(con string \"\")"]),
        returns(
            "sha3_256",
            "#",
            &[EMPTY],
            "(con bytestring #a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a)",
        ),
        fails("sha3_256", "integer", &[INT_1]),
        returns(
            "blake2b_256",
            "#",
            &[EMPTY],
            "(con bytestring #0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8)",
        ),
        fails("blake2b_256", "integer", &[INT_1]),
        returns(
            "keccak_256",
            "#",
            &[EMPTY],
            "(con bytestring #c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470)",
        ),
        fails("keccak_256", "integer", &[INT_1]),
        returns(
            "blake2b_224",
            "#",
            &[EMPTY],
            "(con bytestring #836cc68931c2e4e3e838602eca1902591d216837bafddfe6f0c8cb07)",
        ),
        fails("blake2b_224", "integer", &[INT_1]),
        returns(
            "ripemd_160",
            "#",
            &[EMPTY],
            "(con bytestring #9c1185a5c5e9fc54612808977ee8f548b2258d31)",
        ),
        fails("ripemd_160", "integer", &[INT_1]),
        // Signatures
        returns(
            "verifyEd25519Signature",
            "RFC 8032 test 1",
            &[ed25519_key, EMPTY, ed25519_signature],
            TRUE,
        ),
        fails(
            "verifyEd25519Signature",
            "short key",
            &["(con bytestring #00)", EMPTY, ed25519_signature],
        ),
        returns(
            "verifyEcdsaSecp256k1Signature",
            "wrong signature",
            &[ecdsa_key, &schnorr_message, &ecdsa_signature],
            FALSE,
        ),
        fails(
            "verifyEcdsaSecp256k1Signature",
            "short message",
            &[ecdsa_key, "(con bytestring #00)", &ecdsa_signature],
        ),
        returns(
            "verifySchnorrSecp256k1Signature",
            "BIP 340 vector 0",
            &[schnorr_key, &schnorr_message, schnorr_signature],
            TRUE,
        ),
        fails(
            "verifySchnorrSecp256k1Signature",
            "short key",
            &["(con bytestring #00)", EMPTY, schnorr_signature],
        ),
        // Strings
        returns(
            "appendString",
            "a b",
            &["(con string \"a\")", "(con string \"b\")"],
            "(con string \"ab\")",
        ),
        fails("appendString", "bytestring", &["(con string \"a\")", EMPTY]),
        returns(
            "equalsString",
            "a a",
            &["(con string \"a\")", "(con string \"a\")"],
            TRUE,
        ),
        fails("equalsString", "integer", &[INT_1, "(con string \"a\")"]),
        returns(
            "encodeUtf8",
            "A",
            &["(con string \"A\")"],
            "(con bytestring #41)",
        ),
        fails("encodeUtf8", "bytestring", &["(con bytestring #41)"]),
        returns(
            "decodeUtf8",
            "#41",
            &["(con bytestring #41)"],
            "(con string \"A\")",
        ),
        fails("decodeUtf8", "invalid UTF-8", &["(con bytestring #ff)"]),
        // Polymorphic builtins
        returns("ifThenElse", "True", &[TRUE, INT_1, INT_2], INT_1),
        fails("ifThenElse", "integer", &[INT_1, INT_1, INT_2]),
        returns("chooseUnit", "()", &[UNIT, INT_2], INT_2),
        fails("chooseUnit", "bool", &[TRUE, INT_2]),
        returns(
            "trace",
            "message",
            &["(con string \"message\")", INT_2],
            INT_2,
        ),
        fails("trace", "integer", &[INT_1, INT_2]),
        returns(
            "fstPair",
            "(1, #02)",
            &["(con (pair integer bytestring) (1, #02))"],
            INT_1,
        ),
        fails("fstPair", "integer", &[INT_1]),
        returns(
            "sndPair",
            "(1, #02)",
            &["(con (pair integer bytestring) (1, #02))"],
            "(con bytestring #02)",
        ),
        fails("sndPair", "list", &["(con (list integer) [1, 2])"]),
        returns(
            "chooseList",
            "[]",
            &["(con (list integer) [])", INT_1, INT_2],
            INT_1,
        ),
        fails("chooseList", "integer", &[INT_1, INT_1, INT_2]),
        returns(
            "mkCons",
            "1 [2]",
            &[INT_1, "(con (list integer) [2])"],
            "(con (list integer) [1, 2])",
        ),
        fails(
            "mkCons",
            "element of another type",
            &[EMPTY, "(con (list integer) [2])"],
        ),
        returns(
            "headList",
            "[4, 5]",
            &["(con (list integer) [4, 5])"],
            "(con integer 4)",
        ),
        fails("headList", "[]", &["(con (list integer) [])"]),
        returns(
            "tailList",
            "[4, 5]",
            &["(con (list integer) [4, 5])"],
            "(con (list integer) [5])",
        ),
        fails("tailList", "[]", &["(con (list integer) [])"]),
        returns("nullList", "[]", &["(con (list integer) [])"], TRUE),
        fails("nullList", "integer", &[INT_1]),
        // Data
        returns(
            "chooseData",
            "I",
            &[
                "(con data (I 0))",
                "(con integer 0)",
                INT_1,
                INT_2,
                "(con integer 3)",
                "(con integer 4)",
            ],
            "(con integer 3)",
        ),
        fails(
            "chooseData",
            "integer",
            &[INT_1, INT_1, INT_1, INT_1, INT_1, INT_1],
        ),
        returns(
            "constrData",
            "1 [I 2]",
            &[INT_1, "(con (list data) [I 2])"],
            "(con data (Constr 1 [I 2]))",
        ),
        fails(
            "constrData",
            "list of integers",
            &[INT_1, "(con (list integer) [2])"],
        ),
        returns(
            "mapData",
            "[(I 1, I 2)]",
            &["(con (list (pair data data)) [(I 1, I 2)])"],
            "(con data (Map [(I 1, I 2)]))",
        ),
        fails("mapData", "list of data", &["(con (list data) [I 1])"]),
        returns(
            "listData",
            "[I 1]",
            &["(con (list data) [I 1])"],
            "(con data (List [I 1]))",
        ),
        fails("listData", "data", &["(con data (I 1))"]),
        returns("iData", "5", &["(con integer 5)"], "(con data (I 5))"),
        fails("iData", "bytestring", &[EMPTY]),
        returns(
            "bData",
            "#aa",
            &["(con bytestring #aa)"],
            "(con data (B #aa))",
        ),
        fails("bData", "integer", &[INT_1]),
        returns(
            "unConstrData",
            "Constr 3 [I 1]",
            &["(con data (Constr 3 [I 1]))"],
            "(con (pair integer (list data)) (3, [I 1]))",
        ),
        fails("unConstrData", "I 0", &["(con data (I 0))"]),
        returns(
            "unMapData",
            "Map [(I 1, B #)]",
            &["(con data (Map [(I 1, B #)]))"],
            "(con (list (pair data data)) [(I 1, B #)])",
        ),
        fails("unMapData", "I 0", &["(con data (I 0))"]),
        returns(
            "unListData",
            "List [I 1]",
            &["(con data (List [I 1]))"],
            "(con (list data) [I 1])",
        ),
        fails("unListData", "I 0", &["(con data (I 0))"]),
        returns("unIData", "I 7", &["(con data (I 7))"], "(con integer 7)"),
        fails("unIData", "B #", &["(con data (B #))"]),
        returns(
            "unBData",
            "B #07",
            &["(con data (B #07))"],
            "(con bytestring #07)",
        ),
        fails("unBData", "I 7", &["(con data (I 7))"]),
        returns(
            "equalsData",
            "I 1 I 1",
            &["(con data (I 1))", "(con data (I 1))"],
            TRUE,
        ),
        fails("equalsData", "integer", &["(con data (I 1))", INT_1]),
        returns(
            "serialiseData",
            "I 1",
            &["(con data (I 1))"],
            "(con bytestring #01)",
        ),
        fails("serialiseData", "integer", &[INT_1]),
        returns(
            "mkPairData",
            "I 1 B #",
            &["(con data (I 1))", "(con data (B #))"],
            "(con (pair data data) (I 1, B #))",
        ),
        fails("mkPairData", "integer", &[INT_1, "(con data (I 1))"]),
        returns("mkNilData", "()", &[UNIT], "(con (list data) [])"),
        fails("mkNilData", "integer", &[INT_1]),
        returns(
            "mkNilPairData",
            "()",
            &[UNIT],
            "(con (list (pair data data)) [])",
        ),
        fails("mkNilPairData", "integer", &[INT_1]),
        // BLS12-381 G1
        returns("bls12_381_G1_add", "G + 0", &[&g1_gen, &g1_zero], &g1_gen),
        returns("bls12_381_G1_add", "G + -G", &[&g1_gen, &g1_neg], &g1_zero),
        fails("bls12_381_G1_add", "integer", &[&g1_gen, INT_1]),
        returns("bls12_381_G1_neg", "G", &[&g1_gen], &g1_neg),
        fails("bls12_381_G1_neg", "G2", &[&g2_gen]),
        returns(
            "bls12_381_G1_scalarMul",
            "0 G",
            &["(con integer 0)", &g1_gen],
            &g1_zero,
        ),
        returns(
            "bls12_381_G1_scalarMul",
            "-1 G",
            &["(con integer -1)", &g1_gen],
            &g1_neg,
        ),
        fails(
            "bls12_381_G1_scalarMul",
            "G 0",
            &[&g1_gen, "(con integer 0)"],
        ),
        returns("bls12_381_G1_equal", "G G", &[&g1_gen, &g1_gen], TRUE),
        fails("bls12_381_G1_equal", "bytestring", &[&g1_gen, &g1_bytes]),
        returns("bls12_381_G1_compress", "G", &[&g1_gen], &g1_bytes),
        fails("bls12_381_G1_compress", "bytestring", &[&g1_bytes]),
        returns("bls12_381_G1_uncompress", "G", &[&g1_bytes], &g1_gen),
        fails("bls12_381_G1_uncompress", "#00", &["(con bytestring #00)"]),
        succeeds(
            "bls12_381_G1_hashToGroup",
            "# #01",
            &[EMPTY, "(con bytestring #01)"],
        ),
        fails(
            "bls12_381_G1_hashToGroup",
            "256-byte DST",
            &[EMPTY, &long_dst],
        ),
        returns(
            "bls12_381_G1_multiScalarMul",
            "[1, 0] [G, G]",
            &["(con (list integer) [1, 0])", &g1_list],
            &g1_gen,
        ),
        fails(
            "bls12_381_G1_multiScalarMul",
            "G2 points",
            &["(con (list integer) [1, 0])", &g2_list],
        ),
        // BLS12-381 G2
        returns("bls12_381_G2_add", "G + 0", &[&g2_gen, &g2_zero], &g2_gen),
        fails("bls12_381_G2_add", "G1", &[&g2_gen, &g1_gen]),
        returns("bls12_381_G2_neg", "G", &[&g2_gen], &g2_neg),
        fails("bls12_381_G2_neg", "G1", &[&g1_gen]),
        returns(
            "bls12_381_G2_scalarMul",
            "0 G",
            &["(con integer 0)", &g2_gen],
            &g2_zero,
        ),
        fails(
            "bls12_381_G2_scalarMul",
            "G 0",
            &[&g2_gen, "(con integer 0)"],
        ),
        returns("bls12_381_G2_equal", "G -G", &[&g2_gen, &g2_neg], FALSE),
        fails("bls12_381_G2_equal", "G1", &[&g2_gen, &g1_gen]),
        returns("bls12_381_G2_compress", "G", &[&g2_gen], &g2_bytes),
        fails("bls12_381_G2_compress", "G1", &[&g1_gen]),
        returns("bls12_381_G2_uncompress", "G", &[&g2_bytes], &g2_gen),
        fails("bls12_381_G2_uncompress", "G1 bytes", &[&g1_bytes]),
        succeeds(
            "bls12_381_G2_hashToGroup",
            "# #01",
            &[EMPTY, "(con bytestring #01)"],
        ),
        fails(
            "bls12_381_G2_hashToGroup",
            "256-byte DST",
            &[EMPTY, &long_dst],
        ),
        returns(
            "bls12_381_G2_multiScalarMul",
            "[0, 1] [G, G]",
            &["(con (list integer) [0, 1])", &g2_list],
            &g2_gen,
        ),
        fails(
            "bls12_381_G2_multiScalarMul",
            "G1 points",
            &["(con (list integer) [0, 1])", &g1_list],
        ),
        // Conversions and bitwise operations
        returns(
            "integerToByteString",
            "big-endian 2 1",
            &[TRUE, INT_2, INT_1],
            "(con bytestring #0001)",
        ),
        fails(
            "integerToByteString",
            "negative",
            &[TRUE, "(con integer 0)", "(con integer -1)"],
        ),
        // Batch 4 reached Plutus V3 with it, at protocol version 9.
        at(
            CHANG_PROTOCOL_VERSION,
            returns(
                "integerToByteString",
                "little-endian 2 1",
                &[FALSE, INT_2, INT_1],
                "(con bytestring #0100)",
            ),
        ),
        returns(
            "byteStringToInteger",
            "big-endian #0100",
            &[TRUE, "(con bytestring #0100)"],
            "(con integer 256)",
        ),
        fails("byteStringToInteger", "integer", &[INT_1, EMPTY]),
        returns(
            "andByteString",
            "truncating #0f #ff0f",
            &[FALSE, "(con bytestring #0f)", "(con bytestring #ff0f)"],
            "(con bytestring #0f)",
        ),
        fails(
            "andByteString",
            "integer",
            &[FALSE, "(con bytestring #0f)", INT_1],
        ),
        // Batch 5 reached Plutus V3 at protocol version 10.
        at(
            CHANG_PROTOCOL_VERSION,
            fails(
                "andByteString",
                "not yet available",
                &[FALSE, "(con bytestring #0f)", "(con bytestring #ff0f)"],
            ),
        ),
        at(
            PLOMIN_PROTOCOL_VERSION,
            returns(
                "andByteString",
                "padding #0f #ff0f",
                &[TRUE, "(con bytestring #0f)", "(con bytestring #ff0f)"],
                "(con bytestring #0f0f)",
            ),
        ),
        returns(
            "orByteString",
            "padding #0f #f000",
            &[TRUE, "(con bytestring #0f)", "(con bytestring #f000)"],
            "(con bytestring #ff00)",
        ),
        fails("orByteString", "integer", &[INT_1, EMPTY, EMPTY]),
        returns(
            "xorByteString",
            "#ff #0f",
            &[FALSE, "(con bytestring #ff)", "(con bytestring #0f)"],
            "(con bytestring #f0)",
        ),
        fails(
            "xorByteString",
            "string",
            &[FALSE, EMPTY, "(con string \"\")"],
        ),
        returns(
            "complementByteString",
            "#0f",
            &["(con bytestring #0f)"],
            "(con bytestring #f0)",
        ),
        fails("complementByteString", "integer", &[INT_1]),
        returns(
            "readBit",
            "#01 0",
            &["(con bytestring #01)", "(con integer 0)"],
            TRUE,
        ),
        fails(
            "readBit",
            "out of bounds",
            &["(con bytestring #01)", "(con integer 8)"],
        ),
        returns(
            "writeBits",
            "#00 [0] True",
            &["(con bytestring #00)", "(con (list integer) [0])", TRUE],
            "(con bytestring #01)",
        ),
        fails(
            "writeBits",
            "out of bounds",
            &["(con bytestring #00)", "(con (list integer) [8])", TRUE],
        ),
        returns(
            "replicateByte",
            "2 255",
            &[INT_2, "(con integer 255)"],
            "(con bytestring #ffff)",
        ),
        fails("replicateByte", "byte 256", &[INT_1, "(con integer 256)"]),
        returns(
            "shiftByteString",
            "#01 1",
            &["(con bytestring #01)", INT_1],
            "(con bytestring #02)",
        ),
        fails("shiftByteString", "integer", &[INT_1, INT_1]),
        // Plutus' semantics variant E takes the shift as a 64-bit integer;
        // variant C, at protocol version 10, takes any integer.
        fails(
            "shiftByteString",
            "#01 2^64",
            &["(con bytestring #01)", "(con integer 18446744073709551616)"],
        ),
        at(
            PLOMIN_PROTOCOL_VERSION,
            returns(
                "shiftByteString",
                "#01 2^64",
                &["(con bytestring #01)", "(con integer 18446744073709551616)"],
                "(con bytestring #00)",
            ),
        ),
        returns(
            "rotateByteString",
            "#01 -1",
            &["(con bytestring #01)", "(con integer -1)"],
            "(con bytestring #80)",
        ),
        fails("rotateByteString", "bool", &["(con bytestring #01)", TRUE]),
        returns(
            "countSetBits",
            "#ff01",
            &["(con bytestring #ff01)"],
            "(con integer 9)",
        ),
        fails("countSetBits", "integer", &[INT_1]),
        returns(
            "findFirstSetBit",
            "#0100",
            &["(con bytestring #0100)"],
            "(con integer 8)",
        ),
        fails("findFirstSetBit", "integer", &[INT_1]),
        // Batch 6 reached Plutus V3 at protocol version 11.
        returns(
            "expModInteger",
            "3 5 7",
            &["(con integer 3)", "(con integer 5)", "(con integer 7)"],
            "(con integer 5)",
        ),
        fails(
            "expModInteger",
            "modulus 0",
            &["(con integer 3)", "(con integer 5)", "(con integer 0)"],
        ),
        at(
            PLOMIN_PROTOCOL_VERSION,
            fails(
                "expModInteger",
                "not yet available",
                &["(con integer 3)", "(con integer 5)", "(con integer 7)"],
            ),
        ),
        returns(
            "dropList",
            "1 [1, 2]",
            &[INT_1, "(con (list integer) [1, 2])"],
            "(con (list integer) [2])",
        ),
        fails("dropList", "integer", &[INT_1, INT_1]),
        returns(
            "lengthOfArray",
            "[1, 2, 3]",
            &["(con (array integer) [1, 2, 3])"],
            "(con integer 3)",
        ),
        fails("lengthOfArray", "list", &["(con (list integer) [1])"]),
        returns(
            "listToArray",
            "[1]",
            &["(con (list integer) [1])"],
            "(con (array integer) [1])",
        ),
        fails("listToArray", "integer", &[INT_1]),
        returns(
            "indexArray",
            "[1, 2, 3] 1",
            &["(con (array integer) [1, 2, 3])", INT_1],
            INT_2,
        ),
        fails(
            "indexArray",
            "out of bounds",
            &["(con (array integer) [1, 2, 3])", "(con integer 3)"],
        ),
        // Arrays of BLS12-381 points cross as their compressed points.
        returns("listToArray", "[G1, G1]", &[&g1_list], &g1_array),
        returns("listToArray", "[G2, G2]", &[&g2_list], &g2_array),
        returns("lengthOfArray", "[G1, G1]", &[&g1_array], INT_2),
        returns("lengthOfArray", "[G2, G2]", &[&g2_array], INT_2),
        returns("indexArray", "[G1, G1] 1", &[&g1_array, INT_1], &g1_gen),
        returns("indexArray", "[G2, G2] 1", &[&g2_array, INT_1], &g2_gen),
        // Values
        returns(
            "insertCoin",
            "#aa #bb 1 []",
            &[
                "(con bytestring #aa)",
                "(con bytestring #bb)",
                INT_1,
                "(con value [])",
            ],
            value_1,
        ),
        fails(
            "insertCoin",
            "integer currency",
            &[INT_1, "(con bytestring #bb)", INT_1, "(con value [])"],
        ),
        at(
            PLOMIN_PROTOCOL_VERSION,
            fails(
                "insertCoin",
                "not yet available",
                &[
                    "(con bytestring #aa)",
                    "(con bytestring #bb)",
                    INT_1,
                    "(con value [])",
                ],
            ),
        ),
        at(
            DIJKSTRA_PROTOCOL_VERSION,
            returns(
                "insertCoin",
                "#aa #bb 1 []",
                &[
                    "(con bytestring #aa)",
                    "(con bytestring #bb)",
                    INT_1,
                    "(con value [])",
                ],
                value_1,
            ),
        ),
        returns(
            "lookupCoin",
            "#aa #bb",
            &["(con bytestring #aa)", "(con bytestring #bb)", value_2],
            INT_2,
        ),
        fails("lookupCoin", "integer", &[EMPTY, EMPTY, INT_1]),
        returns("unionValue", "1 1", &[value_1, value_1], value_2),
        fails("unionValue", "data", &[value_1, value_data]),
        returns("valueContains", "2 1", &[value_2, value_1], TRUE),
        fails("valueContains", "integer", &[value_1, INT_1]),
        returns("valueData", "#aa #bb 1", &[value_1], value_data),
        fails("valueData", "data", &[value_data]),
        returns("unValueData", "#aa #bb 1", &[value_data], value_1),
        fails("unValueData", "I 0", &["(con data (I 0))"]),
        returns("scaleValue", "3 2", &["(con integer 3)", value_2], value_6),
        fails("scaleValue", "value", &[value_1, value_1]),
    ]
}

fn constant(text: &str) -> Rc<Constant> {
    let program: Program<Name> = uplc::parser::program(&format!("(program 1.1.0 {text})"))
        .unwrap_or_else(|e| panic!("{text}: {e}"));

    match &program.term {
        Term::Constant(constant) => constant.clone(),
        _ => panic!("{text} is not a constant"),
    }
}

fn encode(text: &str, protocol: u16) -> (u8, Vec<u8>) {
    let semantics = BuiltinSemantics::for_language_and_protocol(&Language::PlutusV3, protocol);

    encode_value(&constant(text), semantics).unwrap()
}

/// What the machine gives for the application of a case's builtin to its
/// arguments, as [`eval_builtin`] would report it.
fn machine_outcome(case: &Case) -> EvalBuiltinResult {
    let fun: DefaultFunction = case.builtin.parse().unwrap();
    let forces = fun.force_count();
    let mut builtin = format!("(builtin {})", case.builtin);
    for _ in 0..forces {
        builtin = format!("(force {builtin})");
    }

    let program: Program<Name> = uplc::parser::program(&format!(
        "(program 1.1.0 [{builtin} {}])",
        case.args.join(" ")
    ))
    .unwrap();
    let program = Program::<NamedDeBruijn>::try_from(program).unwrap();

    let mut machine = Machine::new_with_protocol(
        Language::PlutusV3,
        case.protocol,
        CostModel::default_for_language_and_protocol(&Language::PlutusV3, case.protocol),
        ExBudget::max(),
        // Charge every step as the machine takes it.
        1,
    );

    let result = machine.run_program(program);
    let used = ExBudget::max() - machine.ex_budget;

    let semantics = BuiltinSemantics::for_language_and_protocol(&Language::PlutusV3, case.protocol);

    match result {
        Ok(Term::Constant(ref constant)) => {
            let cost = used - overhead(case.args.len(), forces);
            let (result_kind, result) = encode_value(constant, semantics).unwrap();

            EvalBuiltinResult {
                ok: true,
                error_kind: BUILTIN_OK,
                result_kind,
                result,
                cpu: cost.cpu as u64,
                mem: cost.mem as u64,
                error: String::new(),
            }
        }
        Ok(term) => panic!("{}: returned {}", case.builtin, term.to_pretty()),
        Err(error) => {
            let (error_kind, cost) = if matches!(error, Error::BuiltinNotAvailable(_)) {
                assert_eq!(used, ExBudget { cpu: 0, mem: 0 });
                (BUILTIN_NOT_AVAILABLE, used)
            } else {
                let cost = used - overhead(case.args.len(), forces);
                if cost == (ExBudget { cpu: 0, mem: 0 }) {
                    (BUILTIN_REJECTED_ARGUMENTS, cost)
                } else {
                    (BUILTIN_FAILED, cost)
                }
            };

            EvalBuiltinResult {
                ok: false,
                error_kind,
                result_kind: VALUE_FLAT,
                result: Vec::new(),
                cpu: cost.cpu as u64,
                mem: cost.mem as u64,
                error: error.to_string(),
            }
        }
    }
}

fn case_name(case: &Case) -> String {
    if case.protocol == VAN_ROSSEM_PROTOCOL_VERSION {
        format!("{} {}", case.builtin, case.label)
    } else {
        format!(
            "{} {} (protocol {})",
            case.builtin, case.label, case.protocol
        )
    }
}

/// A case, its arguments as [`eval_builtin`] takes them (kind and bytes), and
/// what it must return.
type ExpectedOutcome = (Case, Vec<(u8, Vec<u8>)>, EvalBuiltinResult);

/// Each case's arguments as [`eval_builtin`] takes them, and what it must
/// return: the expected value, with the outcome and cost the machine gives.
fn expected_outcomes() -> Vec<ExpectedOutcome> {
    cases()
        .into_iter()
        .map(|case| {
            let name = case_name(&case);
            let args = case
                .args
                .iter()
                .map(|arg| encode(arg, case.protocol))
                .collect::<Vec<_>>();
            let outcome = machine_outcome(&case);

            match &case.expected {
                Expected::Returns(result) => {
                    assert!(outcome.ok, "{name}: the machine failed: {}", outcome.error);
                    assert_eq!(
                        (outcome.result_kind, hex::encode(&outcome.result)),
                        {
                            let (kind, bytes) = encode(result, case.protocol);
                            (kind, hex::encode(bytes))
                        },
                        "{name}: the machine returned something else"
                    );
                }
                Expected::Succeeds => assert!(outcome.ok, "{name}: {}", outcome.error),
                Expected::Fails => assert!(!outcome.ok, "{name}: the machine succeeded"),
            }

            (case, args, outcome)
        })
        .collect()
}

#[test]
fn every_case_evaluates_as_the_machine_does() {
    for (case, args, expected) in expected_outcomes() {
        let fun: DefaultFunction = case.builtin.parse().unwrap();
        let (kinds, args): (Vec<u8>, Vec<Vec<u8>>) = args.into_iter().unzip();

        let result = eval_builtin(fun as u8, &args, &kinds, case.protocol).unwrap();

        assert_eq!(
            (
                result.ok,
                result.error_kind,
                result.result_kind,
                hex::encode(&result.result),
                result.cpu,
                result.mem
            ),
            (
                expected.ok,
                expected.error_kind,
                expected.result_kind,
                hex::encode(&expected.result),
                expected.cpu,
                expected.mem
            ),
            "{}",
            case_name(&case)
        );
        assert_eq!(result.error.is_empty(), result.ok, "{}", case_name(&case));
    }
}

#[test]
fn cases_cover_every_builtin_both_ways() {
    let outcomes = expected_outcomes();

    for tag in 0..=100u8 {
        let fun = DefaultFunction::try_from(tag).unwrap();
        if matches!(tag, 68..=70) {
            continue;
        }

        let outcomes = outcomes
            .iter()
            .filter(|(case, _, _)| case.builtin.parse::<DefaultFunction>().unwrap() == fun)
            .map(|(_, _, outcome)| outcome.ok)
            .collect::<Vec<_>>();

        assert!(outcomes.contains(&true), "{fun} never succeeds");
        assert!(outcomes.contains(&false), "{fun} never fails");
    }
}

fn json_string(text: &str) -> String {
    let mut json = String::from("\"");
    for c in text.chars() {
        match c {
            '"' => json.push_str("\\\""),
            '\\' => json.push_str("\\\\"),
            c if (c as u32) < 0x20 => json.push_str(&format!("\\u{:04x}", c as u32)),
            c => json.push(c),
        }
    }
    json.push('"');
    json
}

fn json_list(items: impl IntoIterator<Item = String>) -> String {
    format!("[{}]", items.into_iter().collect::<Vec<_>>().join(", "))
}

/// The cases as `test/fixtures/builtins.json`, for the package's tests of the
/// wasm builds.
fn fixture() -> String {
    let rows = expected_outcomes()
        .into_iter()
        .map(|(case, args, outcome)| {
            let fun: DefaultFunction = case.builtin.parse().unwrap();

            format!(
                concat!(
                    "  {{\n",
                    "    \"name\": {},\n",
                    "    \"tag\": {},\n",
                    "    \"protocol\": {},\n",
                    "    \"args\": {},\n",
                    "    \"argKinds\": {},\n",
                    "    \"argBytes\": {},\n",
                    "    \"ok\": {},\n",
                    "    \"errorKind\": {},\n",
                    "    \"resultKind\": {},\n",
                    "    \"result\": {},\n",
                    "    \"cpu\": {},\n",
                    "    \"mem\": {}\n",
                    "  }}"
                ),
                json_string(&case_name(&case)),
                fun as u8,
                case.protocol,
                json_list(case.args.iter().map(|arg| json_string(arg))),
                json_list(args.iter().map(|(kind, _)| kind.to_string())),
                json_list(
                    args.iter()
                        .map(|(_, bytes)| json_string(&hex::encode(bytes)))
                ),
                outcome.ok,
                outcome.error_kind,
                outcome.result_kind,
                json_string(&hex::encode(&outcome.result)),
                outcome.cpu,
                outcome.mem,
            )
        })
        .collect::<Vec<_>>();

    format!("[\n{}\n]\n", rows.join(",\n"))
}

/// `test/fixtures/builtins.json` holds the cases above. Set
/// `UPDATE_BUILTIN_FIXTURE=1` to rewrite it after changing them.
#[test]
fn builtin_fixture_is_current() {
    let path = concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../test/fixtures/builtins.json"
    );
    let fixture = fixture();

    if std::env::var_os("UPDATE_BUILTIN_FIXTURE").is_some() {
        std::fs::write(path, &fixture).unwrap();
    }

    assert!(
        std::fs::read_to_string(path).unwrap_or_default() == fixture,
        "{path} is out of date; rerun with UPDATE_BUILTIN_FIXTURE=1"
    );
}

/// A constant as a flat-encoded program, whatever its type.
fn flat(text: &str) -> Vec<u8> {
    Program {
        version: (1, 1, 0),
        term: Term::<DeBruijn>::Constant(constant(text)),
    }
    .to_flat()
    .unwrap()
}

fn eval(tag: DefaultFunction, args: &[(u8, Vec<u8>)]) -> Result<EvalBuiltinResult, String> {
    let (kinds, args): (Vec<u8>, Vec<Vec<u8>>) = args.iter().cloned().unzip();

    eval_builtin(tag as u8, &args, &kinds, VAN_ROSSEM_PROTOCOL_VERSION)
}

#[test]
fn bls_points_round_trip() {
    let g1 = hex::decode(G1).unwrap();
    let g2 = hex::decode(G2).unwrap();

    // A point is passed and returned as its compressed bytes.
    for (neg, point, kind) in [
        (DefaultFunction::Bls12_381_G1_Neg, &g1, VALUE_G1),
        (DefaultFunction::Bls12_381_G2_Neg, &g2, VALUE_G2),
    ] {
        let once = eval(neg, &[(kind, point.clone())]).unwrap();
        assert_eq!(once.result_kind, kind);
        assert_ne!(&once.result, point);

        let twice = eval(neg, &[(kind, once.result)]).unwrap();
        assert_eq!((twice.result_kind, &twice.result), (kind, point));
    }

    // Lists of points too, including empty ones, which flat can also encode.
    let g1_list = [g1.clone(), hex::decode(G1_NEG).unwrap()].concat();
    let tail = eval(
        DefaultFunction::TailList,
        &[(VALUE_G1_LIST, g1_list.clone())],
    )
    .unwrap();
    assert_eq!(
        (tail.result_kind, tail.result),
        (VALUE_G1_LIST, g1_list[48..].to_vec())
    );

    let head = eval(DefaultFunction::HeadList, &[(VALUE_G1_LIST, g1_list)]).unwrap();
    assert_eq!((head.result_kind, head.result), (VALUE_G1, g1.clone()));

    let cons = eval(
        DefaultFunction::MkCons,
        &[
            (VALUE_G2, g2.clone()),
            (VALUE_FLAT, flat("(con (list bls12_381_G2_element) [])")),
        ],
    )
    .unwrap();
    assert_eq!((cons.result_kind, cons.result), (VALUE_G2_LIST, g2.clone()));

    let empty = eval(DefaultFunction::TailList, &[(VALUE_G2_LIST, g2)]).unwrap();
    assert_eq!((empty.result_kind, empty.result), (VALUE_G2_LIST, vec![]));

    let null = eval(DefaultFunction::NullList, &[(VALUE_G1_LIST, vec![])]).unwrap();
    assert_eq!(null.result, flat(TRUE));
}

#[test]
fn rejects_malformed_or_unsupported_inputs() {
    let one = (VALUE_FLAT, flat(INT_1));
    let g1 = hex::decode(G1).unwrap();

    // Unknown builtins, and the Miller-loop ones.
    for tag in [101, 127, 255, 68, 69, 70] {
        assert!(
            eval_builtin(tag, &[], &[], VAN_ROSSEM_PROTOCOL_VERSION).is_err(),
            "{tag}"
        );
    }

    // Wrong arity.
    assert!(eval(DefaultFunction::AddInteger, std::slice::from_ref(&one)).is_err());
    assert!(eval(
        DefaultFunction::AddInteger,
        &[one.clone(), one.clone(), one.clone()]
    )
    .is_err());
    assert!(eval(DefaultFunction::AddInteger, &[one.clone(), one.clone()]).is_ok());

    // Kinds that do not match the arguments.
    let args = [flat(INT_1), flat(INT_1)];
    assert!(eval_builtin(0, &args, &[VALUE_FLAT], VAN_ROSSEM_PROTOCOL_VERSION).is_err());
    assert!(eval_builtin(0, &args, &[VALUE_FLAT, 7], VAN_ROSSEM_PROTOCOL_VERSION).is_err());

    // Protocol versions without Plutus V3, or beyond the latest.
    for (protocol, supported) in [(8, false), (9, true), (12, true), (13, false)] {
        assert_eq!(
            eval_builtin(0, &args, &[VALUE_FLAT; 2], protocol).is_ok(),
            supported,
            "{protocol}"
        );
    }

    // Arguments that do not decode, or are not constants.
    let truncated = &flat(INT_1)[..1];
    assert!(eval(
        DefaultFunction::AddInteger,
        &[one.clone(), (VALUE_FLAT, truncated.to_vec())]
    )
    .is_err());
    let lambda =
        Program::<DeBruijn>::try_from(uplc::parser::program("(program 1.1.0 (lam x x))").unwrap())
            .unwrap()
            .to_flat()
            .unwrap();
    assert!(eval(
        DefaultFunction::IfThenElse,
        &[(VALUE_FLAT, flat(TRUE)), (VALUE_FLAT, lambda), one.clone()]
    )
    .is_err());

    // Invalid compressed points.
    assert!(eval(
        DefaultFunction::Bls12_381_G1_Neg,
        &[(VALUE_G1, vec![0; 48])]
    )
    .is_err());
    assert!(eval(
        DefaultFunction::Bls12_381_G1_Neg,
        &[(VALUE_G1, g1[..47].to_vec())]
    )
    .is_err());
    assert!(eval(DefaultFunction::Bls12_381_G2_Neg, &[(VALUE_G2, g1.clone())]).is_err());
    assert!(eval(
        DefaultFunction::NullList,
        &[(VALUE_G1_LIST, g1[..47].to_vec())]
    )
    .is_err());
    assert!(eval(DefaultFunction::NullList, &[(VALUE_G2_LIST, g1.clone())]).is_err());
    assert!(eval(
        DefaultFunction::LengthOfArray,
        &[(VALUE_G1_ARRAY, g1[..47].to_vec())]
    )
    .is_err());
    assert!(eval(DefaultFunction::LengthOfArray, &[(VALUE_G2_ARRAY, g1)]).is_err());
}
