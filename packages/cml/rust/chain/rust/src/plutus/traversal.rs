//! Operations on Plutus data use an explicit work stack: nesting consumes heap
//! space, independently of the native or WebAssembly call stack.
use super::utils::ConstrPlutusDataEncoding;
use super::{ConstrPlutusData, PlutusData, PlutusMap};
use crate::utils::BigInteger;
use cml_core::serialization::{LenEncoding, StringEncoding};
use std::cmp::Ordering;
use std::hash::{Hash, Hasher};

impl Clone for PlutusData {
    fn clone(&self) -> Self {
        copy(self, false)
    }
}

pub(super) fn copy(root: &PlutusData, node_format: bool) -> PlutusData {
    enum Task<'a> {
        Visit(&'a PlutusData),
        Finish(&'a PlutusData, usize),
    }
    let mut tasks = vec![Task::Visit(root)];
    let mut values = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            Task::Visit(data) => match data {
                PlutusData::Integer(integer) => values.push(PlutusData::Integer(if node_format {
                    BigInteger::from(integer.num.clone())
                } else {
                    integer.clone()
                })),
                PlutusData::Bytes {
                    bytes,
                    bytes_encoding,
                } => values.push(PlutusData::Bytes {
                    bytes: bytes.clone(),
                    bytes_encoding: if node_format {
                        StringEncoding::Canonical
                    } else {
                        bytes_encoding.clone()
                    },
                }),
                PlutusData::List { list, .. } => {
                    tasks.push(Task::Finish(data, values.len()));
                    tasks.extend(list.iter().rev().map(Task::Visit));
                }
                PlutusData::ConstrPlutusData(constr) => {
                    tasks.push(Task::Finish(data, values.len()));
                    tasks.extend(constr.fields.iter().rev().map(Task::Visit));
                }
                PlutusData::Map(map) => {
                    tasks.push(Task::Finish(data, values.len()));
                    for (key, value) in map.entries.iter().rev() {
                        tasks.push(Task::Visit(value));
                        tasks.push(Task::Visit(key));
                    }
                }
            },
            Task::Finish(data, start) => {
                let children = values.split_off(start);
                values.push(match data {
                    PlutusData::List { list_encoding, .. } => PlutusData::List {
                        list_encoding: if node_format {
                            node_len(children.len())
                        } else {
                            *list_encoding
                        },
                        list: children,
                    },
                    PlutusData::ConstrPlutusData(constr) => {
                        PlutusData::ConstrPlutusData(ConstrPlutusData {
                            alternative: constr.alternative,
                            encodings: if node_format {
                                Some(ConstrPlutusDataEncoding {
                                    len_encoding: LenEncoding::Indefinite,
                                    fields_encoding: node_len(children.len()),
                                    prefer_compact: true,
                                    ..Default::default()
                                })
                            } else {
                                constr.encodings.clone()
                            },
                            fields: children,
                        })
                    }
                    PlutusData::Map(map) => {
                        let mut entries = Vec::with_capacity(children.len() / 2);
                        let mut children = children.into_iter();
                        while let Some(key) = children.next() {
                            entries.push((key, children.next().expect("paired map children")));
                        }
                        if node_format {
                            entries.sort_by(|(a, _), (b, _)| a.cmp(b));
                        }
                        PlutusData::Map(PlutusMap {
                            encoding: if node_format {
                                node_len(entries.len())
                            } else {
                                map.encoding
                            },
                            entries,
                        })
                    }
                    _ => unreachable!("only containers have children"),
                });
            }
        }
    }
    values.pop().expect("one root value")
}

fn node_len(length: usize) -> LenEncoding {
    if length == 0 {
        LenEncoding::Canonical
    } else {
        LenEncoding::Indefinite
    }
}

impl Drop for PlutusData {
    fn drop(&mut self) {
        fn detach(data: &mut PlutusData, pending: &mut Vec<PlutusData>) {
            match data {
                PlutusData::ConstrPlutusData(constr) => pending.append(&mut constr.fields),
                PlutusData::List { list, .. } => pending.append(list),
                PlutusData::Map(map) => {
                    for (key, value) in map.entries.drain(..) {
                        pending.push(key);
                        pending.push(value);
                    }
                }
                _ => (),
            }
        }
        let mut pending = Vec::new();
        detach(self, &mut pending);
        while let Some(mut data) = pending.pop() {
            detach(&mut data, &mut pending);
            // `data` now has no children, so its Drop cannot descend again.
        }
    }
}

fn rank(data: &PlutusData) -> u8 {
    match data {
        PlutusData::ConstrPlutusData(_) => 0,
        PlutusData::Map(_) => 1,
        PlutusData::List { .. } => 2,
        PlutusData::Integer(_) => 3,
        PlutusData::Bytes { .. } => 4,
    }
}

impl PartialEq for PlutusData {
    fn eq(&self, other: &Self) -> bool {
        self.cmp(other) == Ordering::Equal
    }
}
impl Eq for PlutusData {}
impl PartialOrd for PlutusData {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}
impl Ord for PlutusData {
    fn cmp(&self, other: &Self) -> Ordering {
        enum Task<'a> {
            Data(&'a PlutusData, &'a PlutusData),
            Length(usize, usize),
        }
        let mut pending = vec![Task::Data(self, other)];
        while let Some(task) = pending.pop() {
            let order = match task {
                Task::Length(a, b) => a.cmp(&b),
                Task::Data(a, b) => {
                    let order = rank(a).cmp(&rank(b));
                    if order != Ordering::Equal {
                        return order;
                    }
                    match (a, b) {
                        (PlutusData::Integer(a), PlutusData::Integer(b)) => a.cmp(b),
                        (
                            PlutusData::Bytes { bytes: a, .. },
                            PlutusData::Bytes { bytes: b, .. },
                        ) => a.cmp(b),
                        (PlutusData::ConstrPlutusData(a), PlutusData::ConstrPlutusData(b)) => {
                            let order = a.alternative.cmp(&b.alternative);
                            if order != Ordering::Equal {
                                return order;
                            }
                            pending.push(Task::Length(a.fields.len(), b.fields.len()));
                            pending.extend(
                                a.fields
                                    .iter()
                                    .zip(&b.fields)
                                    .rev()
                                    .map(|(a, b)| Task::Data(a, b)),
                            );
                            Ordering::Equal
                        }
                        (PlutusData::List { list: a, .. }, PlutusData::List { list: b, .. }) => {
                            pending.push(Task::Length(a.len(), b.len()));
                            pending.extend(a.iter().zip(b).rev().map(|(a, b)| Task::Data(a, b)));
                            Ordering::Equal
                        }
                        (PlutusData::Map(a), PlutusData::Map(b)) => {
                            pending.push(Task::Length(a.entries.len(), b.entries.len()));
                            for ((ak, av), (bk, bv)) in a.entries.iter().zip(&b.entries).rev() {
                                pending.push(Task::Data(av, bv));
                                pending.push(Task::Data(ak, bk));
                            }
                            Ordering::Equal
                        }
                        _ => unreachable!("matching ranks"),
                    }
                }
            };
            if order != Ordering::Equal {
                return order;
            }
        }
        Ordering::Equal
    }
}

impl Hash for PlutusData {
    fn hash<H: Hasher>(&self, state: &mut H) {
        let mut pending = vec![self];
        while let Some(data) = pending.pop() {
            std::mem::discriminant(data).hash(state);
            match data {
                PlutusData::ConstrPlutusData(constr) => {
                    constr.alternative.hash(state);
                    constr.fields.len().hash(state);
                    pending.extend(constr.fields.iter().rev());
                }
                PlutusData::Map(map) => {
                    map.entries.len().hash(state);
                    for (key, value) in map.entries.iter().rev() {
                        pending.push(value);
                        pending.push(key);
                    }
                }
                PlutusData::List { list, .. } => {
                    list.len().hash(state);
                    pending.extend(list.iter().rev());
                }
                PlutusData::Integer(integer) => Hash::hash(integer, state),
                PlutusData::Bytes { bytes, .. } => bytes.hash(state),
            }
        }
    }
}
