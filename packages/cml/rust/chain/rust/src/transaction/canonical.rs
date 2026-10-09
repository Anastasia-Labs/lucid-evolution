use cml_core::{
    error::DeserializeError,
    ordered_hash_map::OrderedHashMap,
    serialization::{Deserialize, Serialize},
};

use crate::plutus::{LegacyRedeemer, Redeemers};

use super::{Transaction, TransactionBody, TransactionOutput};

/// Builds a set from its elements alone: definite length and tag 258.
fn retag<S, T>(set: S) -> S
where
    Vec<T>: From<S>,
    S: From<Vec<T>>,
{
    S::from(Vec::from(set))
}

/// Puts the original datum back on a canonical output. Datum hashes and
/// inline datums are bound to the exact datum bytes.
fn restore_output_datum(
    canonical: TransactionOutput,
    original: &TransactionOutput,
) -> TransactionOutput {
    match (canonical, original.datum()) {
        (TransactionOutput::ConwayFormatTxOut(mut conway), Some(datum)) => {
            conway.datum_option = Some(datum);
            TransactionOutput::ConwayFormatTxOut(conway)
        }
        (canonical, _) => canonical,
    }
}

fn copy_canonical_body(original: &TransactionBody, canonical: TransactionBody) -> TransactionBody {
    let outputs = canonical
        .outputs
        .into_iter()
        .zip(original.outputs.iter())
        .map(|(canonical, original)| restore_output_datum(canonical, original))
        .collect();
    let mut body = TransactionBody::new(retag(canonical.inputs), outputs, canonical.fee);
    body.auxiliary_data_hash = canonical.auxiliary_data_hash;
    body.certs = canonical.certs.map(retag);
    body.collateral_inputs = canonical.collateral_inputs.map(retag);
    body.collateral_return = canonical
        .collateral_return
        .zip(original.collateral_return.as_ref())
        .map(|(canonical, original)| restore_output_datum(canonical, original));
    body.current_treasury_value = canonical.current_treasury_value;
    body.donation = canonical.donation;
    body.mint = canonical.mint;
    body.network_id = canonical.network_id;
    body.proposal_procedures = canonical.proposal_procedures.map(retag);
    body.reference_inputs = canonical.reference_inputs.map(retag);
    body.required_signers = canonical.required_signers.map(retag);
    body.script_data_hash = canonical.script_data_hash;
    body.total_collateral = canonical.total_collateral;
    body.ttl = canonical.ttl;
    body.validity_interval_start = canonical.validity_interval_start;
    body.voting_procedures = canonical.voting_procedures;
    body.withdrawals = canonical.withdrawals;
    body
}

/// Keeps a canonical redeemer only when its Plutus value is unchanged;
/// `PlutusData` equality ignores encodings.
fn restore_redeemer_data(original: &Redeemers, canonical: Redeemers) -> Redeemers {
    match (original, canonical) {
        (
            Redeemers::MapRedeemerKeyToRedeemerVal {
                map_redeemer_key_to_redeemer_val: original,
                ..
            },
            Redeemers::MapRedeemerKeyToRedeemerVal {
                map_redeemer_key_to_redeemer_val: canonical,
                ..
            },
        ) => {
            let mut restored = OrderedHashMap::new();
            for (key, canonical_value) in canonical.take() {
                let value = match original.get(&key) {
                    Some(original_value) if original_value.data != canonical_value.data => {
                        original_value.clone()
                    }
                    _ => canonical_value,
                };
                restored.insert(key, value);
            }
            Redeemers::new_map_redeemer_key_to_redeemer_val(restored)
        }
        // Legacy redeemers are a list, and canonical encoding keeps its order.
        (
            Redeemers::ArrLegacyRedeemer {
                arr_legacy_redeemer: original,
                ..
            },
            Redeemers::ArrLegacyRedeemer {
                arr_legacy_redeemer: canonical,
                ..
            },
        ) => Redeemers::new_arr_legacy_redeemer(
            canonical
                .into_iter()
                .enumerate()
                .map(|(index, canonical)| {
                    let original: &LegacyRedeemer = &original[index];
                    if original.data == canonical.data {
                        canonical
                    } else {
                        original.clone()
                    }
                })
                .collect(),
        ),
        (_, canonical) => canonical,
    }
}

impl Transaction {
    /// A copy of this transaction whose ledger containers use canonical CBOR
    /// while its Plutus data keeps the original encoding.
    ///
    /// Canonical CBOR also re-encodes Plutus data, sorting every Plutus map
    /// by key. A Plutus map is an ordered list of pairs, so sorting it changes
    /// the value that scripts see and the hash of a datum. Inline datums and
    /// witness datums are therefore copied from this transaction unchanged,
    /// and a redeemer keeps its canonical encoding only when its Plutus value
    /// is unchanged.
    ///
    /// The body, the transaction and the redeemers carry no encoding details
    /// of their own, and sets in the body and the witness datums are rebuilt
    /// from their elements, so they are tagged with 258.
    pub fn to_canonical_keeping_plutus_data(&self) -> Result<Self, DeserializeError> {
        let canonical = Self::from_cbor_bytes(&self.to_canonical_cbor_bytes())?;
        let body = copy_canonical_body(&self.body, canonical.body);
        let mut witness_set = canonical.witness_set;
        if let Some(datums) = &self.witness_set.plutus_datums {
            witness_set.plutus_datums = Some(retag(datums.clone()));
        }
        if let Some(original) = &self.witness_set.redeemers {
            if let Some(canonical) = witness_set.redeemers.take() {
                witness_set.redeemers = Some(restore_redeemer_data(original, canonical));
            }
        }
        Ok(Self::new(
            body,
            witness_set,
            canonical.is_valid,
            canonical.auxiliary_data,
        ))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::plutus::PlutusData;

    // {h'616c706861': 5, h'62657461': 7}: canonical CBOR sorts the shorter
    // key first, which changes the Plutus value.
    const TOKEN_MAP: &str = "a245616c70686105446265746107";

    fn transaction(redeemer_data: &str) -> Transaction {
        // Inputs without tag 258, an output with an inline datum, a witness
        // datum and one legacy redeemer, all in indefinite-length arrays.
        let datum = format!("d8799f{TOKEN_MAP}ff");
        let inline = format!("d818{}", cbor_bytes_head(&datum));
        let hex = format!(
            "84a300{inputs}019fa300581d61{addr}011a001e8480028201{inline}ff021a00030d40\
             a2049f{datum}ff059f840000{redeemer_data}820102fff5f6",
            inputs = format!("9f8258{}{}00ff", "20", "11".repeat(32)),
            addr = "22".repeat(28),
        );
        Transaction::from_cbor_bytes(&hex::decode(hex).unwrap()).unwrap()
    }

    fn cbor_bytes_head(hex: &str) -> String {
        let len = hex.len() / 2;
        assert!(len < 256);
        if len < 24 {
            format!("{:02x}{hex}", 0x40 + len)
        } else {
            format!("58{len:02x}{hex}")
        }
    }

    fn redeemer_data(tx: &Transaction) -> PlutusData {
        match tx.witness_set.redeemers.as_ref().unwrap() {
            Redeemers::ArrLegacyRedeemer {
                arr_legacy_redeemer,
                ..
            } => arr_legacy_redeemer[0].data.clone(),
            _ => panic!("expected legacy redeemers"),
        }
    }

    #[test]
    fn keeps_plutus_data_that_canonical_encoding_would_reorder() {
        let tx = transaction(&format!("d87a9f{TOKEN_MAP}ff"));
        let canonical = tx.to_canonical_keeping_plutus_data().unwrap();
        assert_eq!(
            redeemer_data(&canonical).to_cbor_bytes(),
            redeemer_data(&tx).to_cbor_bytes()
        );
        assert_eq!(
            canonical.witness_set.plutus_datums.as_ref().unwrap()[0].to_cbor_bytes(),
            tx.witness_set.plutus_datums.as_ref().unwrap()[0].to_cbor_bytes()
        );
        assert_eq!(
            canonical.body.outputs[0].datum().unwrap().to_cbor_bytes(),
            tx.body.outputs[0].datum().unwrap().to_cbor_bytes()
        );
        // The containers are canonical: definite lengths, and sets tagged.
        let bytes = canonical.to_cbor_bytes();
        assert_eq!(&bytes[..6], &hex::decode("84a300d90102").unwrap()[..]);
    }

    #[test]
    fn re_encodes_plutus_data_whose_value_is_unchanged() {
        let tx = transaction("9f0102ff");
        let canonical = tx.to_canonical_keeping_plutus_data().unwrap();
        assert_eq!(redeemer_data(&canonical), redeemer_data(&tx));
        assert_eq!(
            redeemer_data(&canonical).to_cbor_bytes(),
            hex::decode("820102").unwrap()
        );
    }
}
