use cml_chain::plutus::PlutusData;
use cml_core::serialization::{Deserialize, Serialize};
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

const DEPTH: usize = 10_000;

#[test]
fn deep_data_roundtrips_and_ownership() {
    std::thread::Builder::new()
        .stack_size(256 * 1024)
        .spawn(|| {
            for (prefix, leaf, suffix) in [
                ("d87981", "00", ""),
                ("d86682188081", "00", ""),
                ("81", "00", ""),
                ("a100", "00", ""),
                ("a1", "00", "00"),
                ("81", "4100", ""),
            ] {
                let bytes =
                    hex::decode(prefix.repeat(DEPTH) + leaf + &suffix.repeat(DEPTH)).unwrap();
                let data = PlutusData::from_cbor_bytes(&bytes).unwrap();
                assert_eq!(data.to_cbor_bytes(), bytes);
                assert_eq!(data.to_canonical_cbor_bytes(), bytes);
                let copy = data.clone();
                assert!(data == copy);
                assert_eq!(data.cmp(&copy), std::cmp::Ordering::Equal);
                let mut a = DefaultHasher::new();
                let mut b = DefaultHasher::new();
                Hash::hash(&data, &mut a);
                Hash::hash(&copy, &mut b);
                assert_eq!(a.finish(), b.finish());
                let node_format = data.to_cardano_node_format();
                assert_eq!(node_format.to_canonical_cbor_bytes(), bytes);
                drop(data);
                assert_eq!(copy.to_cbor_bytes(), bytes);
                drop(copy);
                drop(node_format);
            }
        })
        .unwrap()
        .join()
        .unwrap();
}

#[test]
fn deep_map_keys_keep_their_ordering() {
    let key0 = "81".repeat(DEPTH) + "00";
    let key1 = "81".repeat(DEPTH) + "01";
    let raw = hex::decode(format!("a2{key1}01{key0}00")).unwrap();
    let expected = hex::decode(format!("a2{key0}00{key1}01")).unwrap();
    let data = PlutusData::from_cbor_bytes(&raw).unwrap();
    assert_eq!(data.to_cbor_bytes(), raw);
    assert_eq!(data.to_canonical_cbor_bytes(), expected);
    assert_eq!(
        data.to_cardano_node_format().to_canonical_cbor_bytes(),
        expected
    );
}

#[test]
fn incomplete_deep_values_return_errors() {
    for raw in [
        "81".repeat(DEPTH),
        "9f".repeat(DEPTH) + "00" + &"ff".repeat(DEPTH - 1),
        "a100".repeat(DEPTH),
    ] {
        assert!(PlutusData::from_cbor_bytes(&hex::decode(raw).unwrap()).is_err());
        assert_eq!(
            PlutusData::from_cbor_bytes(&[0]).unwrap().to_cbor_bytes(),
            vec![0]
        );
    }
}
