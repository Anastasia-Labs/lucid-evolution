//! Operations on Plutus data recurse up to a fixed depth and continue deeper
//! nesting on an explicit work stack: past that depth, nesting consumes heap
//! space, independently of the native or WebAssembly call stack.
use super::utils::ConstrPlutusDataEncoding;
use super::{ConstrPlutusData, PlutusData, PlutusMap};
use crate::utils::BigInteger;
use cml_core::serialization::{LenEncoding, StringEncoding};
use std::cell::Cell;
use std::cmp::Ordering;
use std::hash::{Hash, Hasher};

/// The nesting depth up to which operations recurse on the call stack.
pub(super) const RECURSION_LIMIT: usize = 32;

impl Clone for PlutusData {
    fn clone(&self) -> Self {
        copy(self, false)
    }
}

/// The children of a container in encoding order: map keys precede their values.
enum Children<'a> {
    Items(std::slice::Iter<'a, PlutusData>),
    Entries(
        std::slice::Iter<'a, (PlutusData, PlutusData)>,
        Option<&'a PlutusData>,
    ),
}

impl<'a> Children<'a> {
    fn of(data: &'a PlutusData) -> Option<Self> {
        match data {
            PlutusData::ConstrPlutusData(constr) => Some(Self::Items(constr.fields.iter())),
            PlutusData::List { list, .. } => Some(Self::Items(list.iter())),
            PlutusData::Map(map) => Some(Self::Entries(map.entries.iter(), None)),
            PlutusData::Integer(_) | PlutusData::Bytes { .. } => None,
        }
    }
}

impl<'a> Iterator for Children<'a> {
    type Item = &'a PlutusData;

    fn next(&mut self) -> Option<Self::Item> {
        match self {
            Self::Items(items) => items.next(),
            Self::Entries(entries, value) => value.take().or_else(|| {
                let (key, next) = entries.next()?;
                *value = Some(next);
                Some(key)
            }),
        }
    }
}

/// The copied children of a container, with each map key held until its value is copied.
enum Copied {
    Items(Vec<PlutusData>),
    Entries(Vec<(PlutusData, PlutusData)>, Option<PlutusData>),
}

impl Copied {
    fn push(&mut self, data: PlutusData) {
        match self {
            Self::Items(items) => items.push(data),
            Self::Entries(entries, key) => match key.take() {
                Some(key) => entries.push((key, data)),
                None => *key = Some(data),
            },
        }
    }
}

struct Frame<'a> {
    source: &'a PlutusData,
    children: Children<'a>,
    copied: Copied,
}

impl<'a> Frame<'a> {
    fn new(source: &'a PlutusData) -> Option<Self> {
        let copied = match source {
            PlutusData::ConstrPlutusData(constr) => {
                Copied::Items(Vec::with_capacity(constr.fields.len()))
            }
            PlutusData::List { list, .. } => Copied::Items(Vec::with_capacity(list.len())),
            PlutusData::Map(map) => Copied::Entries(Vec::with_capacity(map.entries.len()), None),
            PlutusData::Integer(_) | PlutusData::Bytes { .. } => return None,
        };
        Some(Self {
            source,
            children: Children::of(source)?,
            copied,
        })
    }

    fn finish(self, node_format: bool) -> PlutusData {
        build(self.source, self.copied, node_format)
    }
}

fn build(source: &PlutusData, copied: Copied, node_format: bool) -> PlutusData {
    match (source, copied) {
        (PlutusData::ConstrPlutusData(constr), Copied::Items(fields)) => {
            copied_constr(constr, fields, node_format)
        }
        (PlutusData::List { list_encoding, .. }, Copied::Items(list)) => {
            copied_list(*list_encoding, list, node_format)
        }
        (PlutusData::Map(map), Copied::Entries(entries, None)) => {
            copied_map(map, entries, node_format)
        }
        _ => unreachable!("children copied as their container holds them"),
    }
}

fn copied_constr(
    constr: &ConstrPlutusData,
    fields: Vec<PlutusData>,
    node_format: bool,
) -> PlutusData {
    PlutusData::ConstrPlutusData(ConstrPlutusData {
        alternative: constr.alternative,
        encodings: if node_format {
            Some(ConstrPlutusDataEncoding {
                len_encoding: LenEncoding::Indefinite,
                fields_encoding: node_len(fields.len()),
                prefer_compact: true,
                ..Default::default()
            })
        } else {
            constr.encodings.clone()
        },
        fields,
    })
}

fn copied_list(list_encoding: LenEncoding, list: Vec<PlutusData>, node_format: bool) -> PlutusData {
    PlutusData::List {
        list_encoding: if node_format {
            node_len(list.len())
        } else {
            list_encoding
        },
        list,
    }
}

fn copied_map(
    map: &PlutusMap,
    mut entries: Vec<(PlutusData, PlutusData)>,
    node_format: bool,
) -> PlutusData {
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

#[inline]
fn copy_leaf(data: &PlutusData, node_format: bool) -> PlutusData {
    match data {
        PlutusData::Integer(integer) => PlutusData::Integer(if node_format {
            BigInteger::from(integer.num.clone())
        } else {
            integer.clone()
        }),
        PlutusData::Bytes {
            bytes,
            bytes_encoding,
        } => PlutusData::Bytes {
            bytes: bytes.clone(),
            bytes_encoding: if node_format {
                StringEncoding::Canonical
            } else {
                bytes_encoding.clone()
            },
        },
        _ => unreachable!("a container is not a leaf"),
    }
}

pub(super) fn copy(root: &PlutusData, node_format: bool) -> PlutusData {
    if node_format {
        copy_within::<true>(root, RECURSION_LIMIT)
    } else {
        copy_within::<false>(root, RECURSION_LIMIT)
    }
}

/// Copies `data`, recursing into at most `depth` levels of containers before
/// continuing iteratively.
pub(super) fn copy_within<const NODE_FORMAT: bool>(data: &PlutusData, depth: usize) -> PlutusData {
    let node_format = NODE_FORMAT;
    let copy = |child| copy_within::<NODE_FORMAT>(child, depth - 1);
    match data {
        PlutusData::Integer(_) | PlutusData::Bytes { .. } => copy_leaf(data, node_format),
        _ if depth == 0 => copy_deep(data, node_format),
        PlutusData::ConstrPlutusData(constr) => copied_constr(
            constr,
            constr.fields.iter().map(copy).collect(),
            node_format,
        ),
        PlutusData::List {
            list,
            list_encoding,
        } => copied_list(*list_encoding, list.iter().map(copy).collect(), node_format),
        PlutusData::Map(map) => copied_map(
            map,
            map.entries
                .iter()
                .map(|(key, value)| (copy(key), copy(value)))
                .collect(),
            node_format,
        ),
    }
}

/// Copies one frame per container; integers and bytes are copied in place.
#[cold]
#[inline(never)]
fn copy_deep(root: &PlutusData, node_format: bool) -> PlutusData {
    let Some(frame) = Frame::new(root) else {
        return copy_leaf(root, node_format);
    };
    let mut stack = vec![frame];
    loop {
        let frame = stack.last_mut().expect("a frame per open container");
        let mut container = None;
        for child in &mut frame.children {
            match Frame::new(child) {
                Some(child) => {
                    container = Some(child);
                    break;
                }
                None => frame.copied.push(copy_leaf(child, node_format)),
            }
        }
        if let Some(child) = container {
            stack.push(child);
            continue;
        }
        let data = stack
            .pop()
            .expect("a frame per open container")
            .finish(node_format);
        match stack.last_mut() {
            Some(parent) => parent.copied.push(data),
            None => return data,
        }
    }
}

fn node_len(length: usize) -> LenEncoding {
    if length == 0 {
        LenEncoding::Canonical
    } else {
        LenEncoding::Indefinite
    }
}

thread_local! {
    /// The number of nested container drops in progress on this thread.
    static DROP_DEPTH: Cell<usize> = const { Cell::new(0) };
}

impl Drop for PlutusData {
    #[inline]
    fn drop(&mut self) {
        let has_children = match self {
            PlutusData::ConstrPlutusData(constr) => !constr.fields.is_empty(),
            PlutusData::Map(map) => !map.entries.is_empty(),
            PlutusData::List { list, .. } => !list.is_empty(),
            PlutusData::Integer(_) | PlutusData::Bytes { .. } => false,
        };
        if has_children {
            release(self);
        }
    }
}

/// Drops the children of a container, which recursively drop their own up to
/// the recursion limit. Deeper descendants are released by `release_deep`.
#[inline(never)]
fn release(data: &mut PlutusData) {
    let depth = DROP_DEPTH.get();
    if depth == RECURSION_LIMIT {
        return release_deep(data);
    }
    DROP_DEPTH.set(depth + 1);
    match data {
        PlutusData::ConstrPlutusData(constr) => drop(std::mem::take(&mut constr.fields)),
        PlutusData::Map(map) => drop(std::mem::take(&mut map.entries)),
        PlutusData::List { list, .. } => drop(std::mem::take(list)),
        PlutusData::Integer(_) | PlutusData::Bytes { .. } => (),
    }
    DROP_DEPTH.set(depth);
}

/// Moves the descendants of `root` onto a work stack, emptying each before its
/// drop so that no drop descends further.
#[cold]
#[inline(never)]
fn release_deep(root: &mut PlutusData) {
    let mut pending = Vec::new();
    move_children(root, &mut pending);
    while let Some(mut data) = pending.pop() {
        move_children(&mut data, &mut pending);
    }
}

fn move_children(data: &mut PlutusData, pending: &mut Vec<PlutusData>) {
    match data {
        PlutusData::ConstrPlutusData(constr) => pending.append(&mut constr.fields),
        PlutusData::Map(map) => {
            for (key, value) in map.entries.drain(..) {
                pending.push(key);
                pending.push(value);
            }
        }
        PlutusData::List { list, .. } => pending.append(list),
        PlutusData::Integer(_) | PlutusData::Bytes { .. } => (),
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
        compare(self, other, RECURSION_LIMIT)
    }
}

/// Compares `a` with `b`, recursing into at most `depth` levels of containers
/// before continuing iteratively.
pub(super) fn compare(a: &PlutusData, b: &PlutusData, depth: usize) -> Ordering {
    let order = rank(a).cmp(&rank(b));
    if order != Ordering::Equal {
        return order;
    }
    match (a, b) {
        (PlutusData::Integer(a), PlutusData::Integer(b)) => a.cmp(b),
        (PlutusData::Bytes { bytes: a, .. }, PlutusData::Bytes { bytes: b, .. }) => a.cmp(b),
        _ if depth == 0 => compare_deep(a, b),
        (PlutusData::ConstrPlutusData(a), PlutusData::ConstrPlutusData(b)) => a
            .alternative
            .cmp(&b.alternative)
            .then_with(|| compare_items(&a.fields, &b.fields, depth)),
        (PlutusData::List { list: a, .. }, PlutusData::List { list: b, .. }) => {
            compare_items(a, b, depth)
        }
        (PlutusData::Map(a), PlutusData::Map(b)) => {
            for ((a_key, a_value), (b_key, b_value)) in a.entries.iter().zip(&b.entries) {
                let order = compare(a_key, b_key, depth - 1)
                    .then_with(|| compare(a_value, b_value, depth - 1));
                if order != Ordering::Equal {
                    return order;
                }
            }
            a.entries.len().cmp(&b.entries.len())
        }
        _ => unreachable!("matching ranks"),
    }
}

fn compare_items(a: &[PlutusData], b: &[PlutusData], depth: usize) -> Ordering {
    for (a, b) in a.iter().zip(b) {
        let order = compare(a, b, depth - 1);
        if order != Ordering::Equal {
            return order;
        }
    }
    a.len().cmp(&b.len())
}

#[cold]
#[inline(never)]
fn compare_deep(left: &PlutusData, right: &PlutusData) -> Ordering {
    // Each frame holds the children of two equal-kind containers still to compare.
    let mut pending: Vec<(Children, Children)> = Vec::new();
    let (mut a, mut b) = (left, right);
    loop {
        let order = rank(a).cmp(&rank(b));
        if order != Ordering::Equal {
            return order;
        }
        let order = match (a, b) {
            (PlutusData::Integer(a), PlutusData::Integer(b)) => a.cmp(b),
            (PlutusData::Bytes { bytes: a, .. }, PlutusData::Bytes { bytes: b, .. }) => a.cmp(b),
            (PlutusData::ConstrPlutusData(x), PlutusData::ConstrPlutusData(y))
                if x.alternative != y.alternative =>
            {
                x.alternative.cmp(&y.alternative)
            }
            _ => {
                pending.push((
                    Children::of(a).expect("a container"),
                    Children::of(b).expect("a container"),
                ));
                Ordering::Equal
            }
        };
        if order != Ordering::Equal {
            return order;
        }
        loop {
            let Some((left, right)) = pending.last_mut() else {
                return Ordering::Equal;
            };
            match (left.next(), right.next()) {
                (Some(left), Some(right)) => {
                    (a, b) = (left, right);
                    break;
                }
                (None, None) => {
                    pending.pop();
                }
                (None, Some(_)) => return Ordering::Less,
                (Some(_), None) => return Ordering::Greater,
            }
        }
    }
}

impl Hash for PlutusData {
    fn hash<H: Hasher>(&self, state: &mut H) {
        hash_within(self, state, RECURSION_LIMIT);
    }
}

/// Hashes `data`, recursing into at most `depth` levels of containers before
/// continuing iteratively.
pub(super) fn hash_within<H: Hasher>(data: &PlutusData, state: &mut H, depth: usize) {
    if depth == 0 {
        return hash_deep(data, state);
    }
    std::mem::discriminant(data).hash(state);
    match data {
        PlutusData::ConstrPlutusData(constr) => {
            constr.alternative.hash(state);
            constr.fields.len().hash(state);
            for field in &constr.fields {
                hash_within(field, state, depth - 1);
            }
        }
        PlutusData::Map(map) => {
            map.entries.len().hash(state);
            for (key, value) in &map.entries {
                hash_within(key, state, depth - 1);
                hash_within(value, state, depth - 1);
            }
        }
        PlutusData::List { list, .. } => {
            list.len().hash(state);
            for item in list {
                hash_within(item, state, depth - 1);
            }
        }
        PlutusData::Integer(integer) => Hash::hash(integer, state),
        PlutusData::Bytes { bytes, .. } => bytes.hash(state),
    }
}

#[cold]
#[inline(never)]
fn hash_deep<H: Hasher>(root: &PlutusData, state: &mut H) {
    let mut pending: Vec<Children> = Vec::new();
    let mut data = root;
    loop {
        std::mem::discriminant(data).hash(state);
        match data {
            PlutusData::ConstrPlutusData(constr) => {
                constr.alternative.hash(state);
                constr.fields.len().hash(state);
                pending.push(Children::Items(constr.fields.iter()));
            }
            PlutusData::Map(map) => {
                map.entries.len().hash(state);
                pending.push(Children::Entries(map.entries.iter(), None));
            }
            PlutusData::List { list, .. } => {
                list.len().hash(state);
                pending.push(Children::Items(list.iter()));
            }
            PlutusData::Integer(integer) => Hash::hash(integer, state),
            PlutusData::Bytes { bytes, .. } => bytes.hash(state),
        }
        data = loop {
            let Some(children) = pending.last_mut() else {
                return;
            };
            match children.next() {
                Some(child) => break child,
                None => {
                    pending.pop();
                }
            }
        };
    }
}
