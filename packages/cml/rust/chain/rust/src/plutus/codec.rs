//! CBOR traversal shared by PlutusData and its standalone container APIs. It
//! recurses up to a fixed depth and continues deeper nesting on explicit stacks.
use super::traversal::RECURSION_LIMIT;
use super::utils::ConstrPlutusDataEncoding;
use super::{ConstrPlutusData, PlutusData, PlutusMap};
use crate::utils::{read_bounded_bytes, write_bounded_bytes, BigInteger};
use cbor_event::{de::Deserializer, se::Serializer, LenSz, Special, Type};
use cml_core::error::{DeserializeError, DeserializeFailure};
use cml_core::serialization::{fit_sz, CBORReadLen, Deserialize, LenEncoding, Serialize};
use std::io::{BufRead, Seek, SeekFrom, Write};

pub(super) enum WriteTask<'a> {
    Data(&'a PlutusData),
    Constr(&'a ConstrPlutusData),
    Map(&'a PlutusMap),
    List(&'a [PlutusData], LenEncoding),
    End(LenEncoding),
    Raw(Vec<u8>),
    StartKey(&'a PlutusData, &'a PlutusData),
    FinishKey(&'a PlutusData),
    SortedMap(&'a PlutusMap),
}

pub(super) fn serialize<'se, W: Write>(
    first: WriteTask<'_>,
    serializer: &'se mut Serializer<W>,
    canonical: bool,
) -> cbor_event::Result<&'se mut Serializer<W>> {
    match first {
        WriteTask::Data(data) => write_data(data, serializer, canonical, RECURSION_LIMIT)?,
        WriteTask::Constr(constr) => write_constr(constr, serializer, canonical, RECURSION_LIMIT)?,
        WriteTask::Map(map) => write_map(map, serializer, canonical, RECURSION_LIMIT)?,
        task => return serialize_deep(task, serializer, canonical),
    }
    Ok(serializer)
}

/// Writes integers and bytes in place, calling out only for containers. Being
/// inlined into each loop over items keeps scalar items from entering the
/// larger container and fallback writers, which wasm-opt may merge into one
/// function whose every call is costly.
#[inline(always)]
fn write_data<W: Write>(
    data: &PlutusData,
    serializer: &mut Serializer<W>,
    canonical: bool,
    depth: usize,
) -> cbor_event::Result<()> {
    match data {
        PlutusData::Integer(integer) => {
            integer.serialize(serializer, canonical)?;
        }
        PlutusData::Bytes {
            bytes,
            bytes_encoding,
        } => {
            write_bounded_bytes(serializer, bytes, bytes_encoding, canonical)?;
        }
        _ if depth == 0 => {
            serialize_deep(WriteTask::Data(data), serializer, canonical)?;
        }
        _ => write_container(data, serializer, canonical, depth)?,
    }
    Ok(())
}

#[inline(never)]
fn write_container<W: Write>(
    data: &PlutusData,
    serializer: &mut Serializer<W>,
    canonical: bool,
    depth: usize,
) -> cbor_event::Result<()> {
    match data {
        PlutusData::ConstrPlutusData(constr) => write_constr(constr, serializer, canonical, depth),
        PlutusData::Map(map) => write_map(map, serializer, canonical, depth),
        PlutusData::List {
            list,
            list_encoding,
        } => write_list(list, *list_encoding, serializer, canonical, depth),
        PlutusData::Integer(_) | PlutusData::Bytes { .. } => unreachable!("written in place"),
    }
}

fn write_constr<W: Write>(
    constr: &ConstrPlutusData,
    serializer: &mut Serializer<W>,
    canonical: bool,
    depth: usize,
) -> cbor_event::Result<()> {
    let enc = constr
        .encodings
        .as_ref()
        .cloned()
        .unwrap_or_else(|| ConstrPlutusDataEncoding {
            prefer_compact: true,
            ..Default::default()
        });
    if let Some(tag) = ConstrPlutusData::alternative_to_compact_cbor_tag(constr.alternative)
        .filter(|_| enc.prefer_compact)
    {
        serializer.write_tag_sz(tag, fit_sz(tag, enc.tag_encoding, canonical))?;
        write_list(
            &constr.fields,
            enc.fields_encoding,
            serializer,
            canonical,
            depth,
        )
    } else {
        let tag = ConstrPlutusData::GENERAL_FORM_TAG;
        serializer.write_tag_sz(tag, fit_sz(tag, enc.tag_encoding, canonical))?;
        serializer.write_array_sz(enc.len_encoding.to_len_sz(2, canonical))?;
        serializer.write_unsigned_integer_sz(
            constr.alternative,
            fit_sz(constr.alternative, enc.alternative_encoding, canonical),
        )?;
        write_list(
            &constr.fields,
            enc.fields_encoding,
            serializer,
            canonical,
            depth,
        )?;
        write_end(enc.len_encoding, serializer, canonical)
    }
}

fn write_list<W: Write>(
    list: &[PlutusData],
    encoding: LenEncoding,
    serializer: &mut Serializer<W>,
    canonical: bool,
    depth: usize,
) -> cbor_event::Result<()> {
    serializer.write_array_sz(encoding.to_len_sz(list.len() as u64, canonical))?;
    for item in list {
        write_data(item, serializer, canonical, depth - 1)?;
    }
    write_end(encoding, serializer, canonical)
}

fn write_map<W: Write>(
    map: &PlutusMap,
    serializer: &mut Serializer<W>,
    canonical: bool,
    depth: usize,
) -> cbor_event::Result<()> {
    let len_sz = map.encoding.to_len_sz(map.entries.len() as u64, canonical);
    if canonical && map.entries.len() > 1 {
        let mut keys = Vec::with_capacity(map.entries.len());
        for (key, value) in &map.entries {
            let mut buffer = Serializer::new_vec();
            write_data(key, &mut buffer, canonical, depth - 1)?;
            keys.push((buffer.finalize(), value));
        }
        keys.sort_by(|(a, _), (b, _)| a.len().cmp(&b.len()).then_with(|| a.cmp(b)));
        serializer.write_map_sz(len_sz)?;
        for (bytes, value) in keys {
            serializer.write_raw_bytes(&bytes)?;
            write_data(value, serializer, canonical, depth - 1)?;
        }
    } else {
        serializer.write_map_sz(len_sz)?;
        for (key, value) in &map.entries {
            write_data(key, serializer, canonical, depth - 1)?;
            write_data(value, serializer, canonical, depth - 1)?;
        }
    }
    write_end(map.encoding, serializer, canonical)
}

fn write_end<W: Write>(
    encoding: LenEncoding,
    serializer: &mut Serializer<W>,
    canonical: bool,
) -> cbor_event::Result<()> {
    if !canonical && encoding == LenEncoding::Indefinite {
        serializer.write_special(Special::Break)?;
    }
    Ok(())
}

#[cold]
#[inline(never)]
fn serialize_deep<'se, W: Write>(
    first: WriteTask<'_>,
    serializer: &'se mut Serializer<W>,
    canonical: bool,
) -> cbor_event::Result<&'se mut Serializer<W>> {
    use WriteTask::*;
    let mut tasks = vec![first];
    // Canonical maps need the encoded keys before writing their entries. These
    // buffers are also explicit stacks, so maps nested in keys do not recurse.
    let mut key_buffers: Vec<Serializer<Vec<u8>>> = Vec::new();
    let mut key_groups: Vec<Vec<(Vec<u8>, &PlutusData)>> = Vec::new();
    macro_rules! emit {
        ($method:ident($($arg:expr),* $(,)?)) => {
            if let Some(output) = key_buffers.last_mut() {
                output.$method($($arg),*)?;
            } else {
                serializer.$method($($arg),*)?;
            }
        };
    }
    while let Some(task) = tasks.pop() {
        match task {
            Data(data) => match data {
                PlutusData::ConstrPlutusData(constr) => tasks.push(Constr(constr)),
                PlutusData::Map(map) => tasks.push(Map(map)),
                PlutusData::List {
                    list,
                    list_encoding,
                } => tasks.push(List(list, *list_encoding)),
                PlutusData::Integer(integer) => {
                    if let Some(output) = key_buffers.last_mut() {
                        integer.serialize(output, canonical)?;
                    } else {
                        integer.serialize(serializer, canonical)?;
                    }
                }
                PlutusData::Bytes {
                    bytes,
                    bytes_encoding,
                } => {
                    if let Some(output) = key_buffers.last_mut() {
                        write_bounded_bytes(output, bytes, bytes_encoding, canonical)?;
                    } else {
                        write_bounded_bytes(serializer, bytes, bytes_encoding, canonical)?;
                    }
                }
            },
            Constr(constr) => {
                let enc = constr.encodings.as_ref().cloned().unwrap_or_else(|| {
                    ConstrPlutusDataEncoding {
                        prefer_compact: true,
                        ..Default::default()
                    }
                });
                if let Some(tag) =
                    ConstrPlutusData::alternative_to_compact_cbor_tag(constr.alternative)
                        .filter(|_| enc.prefer_compact)
                {
                    emit!(write_tag_sz(tag, fit_sz(tag, enc.tag_encoding, canonical)));
                } else {
                    let tag = ConstrPlutusData::GENERAL_FORM_TAG;
                    emit!(write_tag_sz(tag, fit_sz(tag, enc.tag_encoding, canonical)));
                    emit!(write_array_sz(enc.len_encoding.to_len_sz(2, canonical)));
                    emit!(write_unsigned_integer_sz(
                        constr.alternative,
                        fit_sz(constr.alternative, enc.alternative_encoding, canonical)
                    ));
                    tasks.push(End(enc.len_encoding));
                }
                tasks.push(List(&constr.fields, enc.fields_encoding));
            }
            List(list, encoding) => {
                emit!(write_array_sz(
                    encoding.to_len_sz(list.len() as u64, canonical)
                ));
                tasks.push(End(encoding));
                tasks.extend(list.iter().rev().map(Data));
            }
            Map(map) if canonical && map.entries.len() > 1 => {
                key_groups.push(Vec::with_capacity(map.entries.len()));
                tasks.push(SortedMap(map));
                for (key, value) in map.entries.iter().rev() {
                    tasks.push(StartKey(key, value));
                }
            }
            Map(map) => {
                emit!(write_map_sz(
                    map.encoding.to_len_sz(map.entries.len() as u64, canonical)
                ));
                tasks.push(End(map.encoding));
                for (key, value) in map.entries.iter().rev() {
                    tasks.push(Data(value));
                    tasks.push(Data(key));
                }
            }
            StartKey(key, value) => {
                key_buffers.push(Serializer::new_vec());
                tasks.push(FinishKey(value));
                tasks.push(Data(key));
            }
            FinishKey(value) => {
                let bytes = key_buffers.pop().expect("key buffer").finalize();
                key_groups
                    .last_mut()
                    .expect("key group")
                    .push((bytes, value));
            }
            SortedMap(map) => {
                let mut keys = key_groups.pop().expect("completed map keys");
                keys.sort_by(|(a, _), (b, _)| a.len().cmp(&b.len()).then_with(|| a.cmp(b)));
                emit!(write_map_sz(
                    map.encoding.to_len_sz(map.entries.len() as u64, canonical)
                ));
                tasks.push(End(map.encoding));
                for (bytes, value) in keys.into_iter().rev() {
                    tasks.push(Data(value));
                    tasks.push(Raw(bytes));
                }
            }
            Raw(bytes) => {
                emit!(write_raw_bytes(&bytes));
            }
            End(encoding) if !canonical && encoding == LenEncoding::Indefinite => {
                emit!(write_special(Special::Break));
            }
            End(_) => (),
        }
    }
    Ok(serializer)
}

enum Frame {
    List {
        values: Vec<PlutusData>,
        len: LenSz,
    },
    Map {
        entries: Vec<(PlutusData, PlutusData)>,
        key: Option<PlutusData>,
        len: LenSz,
    },
    Constr {
        constr: ConstrPlutusData,
        fields_len: LenSz,
        general_len: Option<LenSz>,
    },
}

impl Frame {
    fn complete<R: BufRead + Seek>(
        &self,
        raw: &mut Deserializer<R>,
    ) -> Result<bool, DeserializeError> {
        let (length, len) = match self {
            Self::List { values, len } => (values.len(), *len),
            Self::Map { key: Some(_), .. } => return Ok(false),
            Self::Map { entries, len, .. } => (entries.len(), *len),
            Self::Constr {
                constr, fields_len, ..
            } => (constr.fields.len(), *fields_len),
        };
        at_end(raw, len, length)
    }

    fn push(&mut self, value: PlutusData) {
        match self {
            Self::List { values, .. } => values.push(value),
            Self::Constr { constr, .. } => constr.fields.push(value),
            Self::Map { entries, key, .. } => {
                if let Some(key) = key.take() {
                    entries.push((key, value));
                } else {
                    *key = Some(value);
                }
            }
        }
    }

    fn finish<R: BufRead + Seek>(
        self,
        raw: &mut Deserializer<R>,
    ) -> Result<PlutusData, DeserializeError> {
        Ok(match self {
            Self::List { values, len } => PlutusData::List {
                list: values,
                list_encoding: len.into(),
            },
            Self::Map { entries, len, .. } => PlutusData::Map(PlutusMap {
                entries,
                encoding: len.into(),
            }),
            Self::Constr {
                constr,
                general_len,
                ..
            } => {
                if matches!(general_len, Some(LenSz::Indefinite)) {
                    read_break(raw)?;
                }
                PlutusData::ConstrPlutusData(constr)
            }
        })
    }
}

fn read_break<R: BufRead + Seek>(raw: &mut Deserializer<R>) -> Result<(), DeserializeError> {
    if raw.special()? != Special::Break {
        return Err(DeserializeFailure::EndingBreakMissing.into());
    }
    Ok(())
}

/// Reads a constructor up to its fields, returning it with no fields yet, the
/// length of its fields and, in the general form, the length of its array.
fn constr_header<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
) -> Result<(ConstrPlutusData, LenSz, Option<LenSz>), DeserializeError> {
    let (tag, tag_encoding) = raw.tag_sz()?;
    let (alternative, alternative_encoding, general_len) =
        if tag == ConstrPlutusData::GENERAL_FORM_TAG {
            let len = raw.array_sz()?;
            CBORReadLen::new(len).read_elems(2)?;
            let (alternative, encoding) = raw.unsigned_integer_sz()?;
            (alternative, Some(encoding), Some(len))
        } else if let Some(alternative) = ConstrPlutusData::compact_cbor_tag_to_alternative(tag) {
            (alternative, None, None)
        } else {
            return Err(DeserializeFailure::TagMismatch {
                found: tag,
                expected: ConstrPlutusData::GENERAL_FORM_TAG,
            }
            .into());
        };
    let fields_len = raw.array_sz()?;
    let constr = ConstrPlutusData {
        alternative,
        fields: Vec::new(),
        encodings: Some(ConstrPlutusDataEncoding {
            len_encoding: general_len.map(Into::into).unwrap_or_default(),
            fields_encoding: fields_len.into(),
            tag_encoding: Some(tag_encoding),
            alternative_encoding,
            prefer_compact: general_len.is_none(),
        }),
    };
    Ok((constr, fields_len, general_len))
}

/// Whether a container of `len` holding `count` items is complete, consuming
/// its break if one ends it.
fn at_end<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
    len: LenSz,
    count: usize,
) -> Result<bool, DeserializeError> {
    if matches!(len, LenSz::Len(n, _) if count as u64 == n) {
        return Ok(true);
    }
    // Preserve the existing decoder's acceptance of early breaks in
    // definite containers, while returning an error for other specials.
    if raw.cbor_type()? == Type::Special {
        read_break(raw)?;
        return Ok(true);
    }
    Ok(false)
}

pub(super) fn deserialize<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
) -> Result<PlutusData, DeserializeError> {
    read_data(raw, RECURSION_LIMIT)
}

fn constr_frame<R: BufRead + Seek>(raw: &mut Deserializer<R>) -> Result<Frame, DeserializeError> {
    let (constr, fields_len, general_len) = constr_header(raw)?;
    Ok(Frame::Constr {
        constr,
        fields_len,
        general_len,
    })
}

/// Reads integers and bytes in place, calling out only for containers. Being
/// inlined into each loop over items keeps scalar items from entering the
/// larger container and fallback readers, which wasm-opt may merge into one
/// function whose every call is costly.
#[inline(always)]
fn read_data<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
    depth: usize,
) -> Result<PlutusData, DeserializeError> {
    match raw.cbor_type()? {
        Type::UnsignedInteger | Type::NegativeInteger => {
            Ok(PlutusData::Integer(BigInteger::deserialize(raw)?))
        }
        Type::Bytes => {
            let (bytes, bytes_encoding) = read_bounded_bytes(raw)?;
            Ok(PlutusData::Bytes {
                bytes,
                bytes_encoding,
            })
        }
        Type::Array | Type::Map | Type::Tag if depth == 0 => deserialize_deep(raw),
        cbor_type @ (Type::Array | Type::Map | Type::Tag) => read_container(raw, cbor_type, depth),
        _ => Err(DeserializeFailure::NoVariantMatched.into()),
    }
}

#[inline(never)]
fn read_container<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
    cbor_type: Type,
    depth: usize,
) -> Result<PlutusData, DeserializeError> {
    match cbor_type {
        Type::Array => {
            let len = raw.array_sz()?;
            let list = read_items(raw, len, depth)?;
            Ok(PlutusData::List {
                list,
                list_encoding: len.into(),
            })
        }
        Type::Map => read_map(raw, depth),
        // The only other container type is a tag.
        _ => match read_tagged(raw)? {
            Tagged::Integer(integer) => Ok(PlutusData::Integer(integer)),
            Tagged::Constr(mut constr, fields_len, general_len) => {
                constr.fields = read_items(raw, fields_len, depth)?;
                if matches!(general_len, Some(LenSz::Indefinite)) {
                    read_break(raw)?;
                }
                Ok(PlutusData::ConstrPlutusData(constr))
            }
        },
    }
}

fn read_map<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
    depth: usize,
) -> Result<PlutusData, DeserializeError> {
    let len = raw.map_sz()?;
    let mut entries = Vec::new();
    while !at_end(raw, len, entries.len())? {
        let key = read_data(raw, depth - 1)?;
        entries.push((key, read_data(raw, depth - 1)?));
    }
    Ok(PlutusData::Map(PlutusMap {
        entries,
        encoding: len.into(),
    }))
}

enum Tagged {
    Integer(BigInteger),
    Constr(ConstrPlutusData, LenSz, Option<LenSz>),
}

/// Reads a big integer, or a constructor up to its fields.
fn read_tagged<R: BufRead + Seek>(raw: &mut Deserializer<R>) -> Result<Tagged, DeserializeError> {
    let position = raw
        .as_mut_ref()
        .stream_position()
        .map_err(cbor_event::Error::IoError)?;
    let tag = raw.tag()?;
    raw.as_mut_ref()
        .seek(SeekFrom::Start(position))
        .map_err(cbor_event::Error::IoError)?;
    if tag == 2 || tag == 3 {
        Ok(Tagged::Integer(BigInteger::deserialize(raw)?))
    } else {
        let (constr, fields_len, general_len) = constr_header(raw)?;
        Ok(Tagged::Constr(constr, fields_len, general_len))
    }
}

fn read_items<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
    len: LenSz,
    depth: usize,
) -> Result<Vec<PlutusData>, DeserializeError> {
    let mut items = Vec::new();
    while !at_end(raw, len, items.len())? {
        items.push(read_data(raw, depth - 1)?);
    }
    Ok(items)
}

#[cold]
#[inline(never)]
fn deserialize_deep<R: BufRead + Seek>(
    raw: &mut Deserializer<R>,
) -> Result<PlutusData, DeserializeError> {
    let mut frames: Vec<Frame> = Vec::new();
    loop {
        let value = if frames
            .last()
            .map(|frame| frame.complete(raw))
            .transpose()?
            .unwrap_or(false)
        {
            frames.pop().expect("completed frame").finish(raw)?
        } else {
            match raw.cbor_type()? {
                Type::Array => {
                    frames.push(Frame::List {
                        values: Vec::new(),
                        len: raw.array_sz()?,
                    });
                    continue;
                }
                Type::Map => {
                    frames.push(Frame::Map {
                        entries: Vec::new(),
                        key: None,
                        len: raw.map_sz()?,
                    });
                    continue;
                }
                // Peeks at the tag itself: calling `read_tagged` here as well
                // would keep wasm-opt from inlining it into `read_container`.
                Type::Tag => {
                    let position = raw
                        .as_mut_ref()
                        .stream_position()
                        .map_err(cbor_event::Error::IoError)?;
                    let tag = raw.tag()?;
                    raw.as_mut_ref()
                        .seek(SeekFrom::Start(position))
                        .map_err(cbor_event::Error::IoError)?;
                    if tag == 2 || tag == 3 {
                        PlutusData::Integer(BigInteger::deserialize(raw)?)
                    } else {
                        frames.push(constr_frame(raw)?);
                        continue;
                    }
                }
                Type::UnsignedInteger | Type::NegativeInteger => {
                    PlutusData::Integer(BigInteger::deserialize(raw)?)
                }
                Type::Bytes => {
                    let (bytes, bytes_encoding) = read_bounded_bytes(raw)?;
                    PlutusData::Bytes {
                        bytes,
                        bytes_encoding,
                    }
                }
                _ => return Err(DeserializeFailure::NoVariantMatched.into()),
            }
        };
        if let Some(frame) = frames.last_mut() {
            frame.push(value);
        } else {
            return Ok(value);
        }
    }
}

#[cfg(test)]
mod tests {
    //! Each operation must give the same result, error and stream position at
    //! any recursion depth, including zero, where it runs fully iteratively.
    use super::super::traversal::{compare, copy_within, hash_within};
    use super::*;
    use std::collections::hash_map::DefaultHasher;
    use std::hash::Hasher;
    use std::io::Cursor;

    /// Xorshift, for reproducible inputs.
    struct Rng(u64);

    impl Rng {
        fn below(&mut self, n: u64) -> u64 {
            self.0 ^= self.0 << 13;
            self.0 ^= self.0 >> 7;
            self.0 ^= self.0 << 17;
            self.0 % n
        }

        fn chance(&mut self, percent: u64) -> bool {
            self.below(100) < percent
        }

        fn pick<T: Copy>(&mut self, items: &[T]) -> T {
            items[self.below(items.len() as u64) as usize]
        }

        /// A depth below which the operations under test switch to iteration.
        fn depth(&mut self) -> usize {
            if self.chance(80) {
                self.below(6) as usize
            } else {
                RECURSION_LIMIT
            }
        }
    }

    /// Writes a CBOR head, sometimes in a longer form than needed.
    fn head(out: &mut Vec<u8>, major: u8, value: u64, rng: &mut Rng) {
        let minimal = match value {
            0..=23 => 0,
            24..=0xff => 1,
            0x100..=0xffff => 2,
            0x1_0000..=0xffff_ffff => 4,
            _ => 8,
        };
        // Wider lengths are avoided on byte strings, whose content would be absent.
        let widths: &[usize] = if major == 2 { &[1, 2] } else { &[1, 2, 4, 8] };
        let width = if rng.chance(10) {
            rng.pick(widths).max(minimal)
        } else {
            minimal
        };
        let initial = major << 5;
        match width {
            0 => out.push(initial | value as u8),
            1 => out.extend([initial | 24, value as u8]),
            2 => {
                out.push(initial | 25);
                out.extend((value as u16).to_be_bytes());
            }
            4 => {
                out.push(initial | 26);
                out.extend((value as u32).to_be_bytes());
            }
            _ => {
                out.push(initial | 27);
                out.extend(value.to_be_bytes());
            }
        }
    }

    fn bytes(out: &mut Vec<u8>, rng: &mut Rng) {
        let len = rng.pick(&[0, 1, 3, 28, 64, 65, 100]);
        let content: Vec<u8> = (0..len).map(|_| rng.below(4) as u8).collect();
        if len > 0 && rng.chance(20) {
            out.push(0x5f);
            for chunk in content.chunks(1 + rng.below(64) as usize) {
                head(out, 2, chunk.len() as u64, rng);
                out.extend(chunk);
            }
            out.push(0xff);
        } else {
            head(out, 2, len as u64, rng);
            out.extend(content);
        }
    }

    /// Writes an array or map of `len` items, with a definite or indefinite
    /// length, and sometimes a definite length ended early by a break.
    fn items(out: &mut Vec<u8>, rng: &mut Rng, depth: u32, len: u64, map: bool) {
        let major = if map { 5 } else { 4 };
        let indefinite = rng.chance(40);
        let early_break = !indefinite && rng.chance(5);
        if indefinite {
            out.push(major << 5 | 31);
        } else {
            head(out, major, len + early_break as u64, rng);
        }
        for _ in 0..len * (1 + map as u64) {
            data(out, rng, depth - 1);
        }
        if indefinite || early_break {
            out.push(0xff);
        }
    }

    fn data(out: &mut Vec<u8>, rng: &mut Rng, depth: u32) {
        let kind = rng.below(12);
        if depth == 0 || kind < 4 {
            match rng.below(5) {
                0 => head(out, 0, rng.below(30), rng),
                1 => head(out, 1, rng.below(30), rng),
                2 => head(out, 0, u64::MAX - rng.below(2), rng),
                3 => {
                    out.push(0xc2 + rng.below(2) as u8);
                    bytes(out, rng);
                }
                _ => bytes(out, rng),
            }
            return;
        }
        if kind == 11 && rng.chance(10) {
            // A chain of lists deeper than the recursion limit.
            out.resize(out.len() + 60 + rng.below(80) as usize, 0x81);
            return data(out, rng, 0);
        }
        let len = rng.below(4);
        match kind {
            4 | 5 => items(out, rng, depth, len, false),
            6 | 7 => {
                let alternative = rng.pick(&[0, 1, 6, 7, 127, 128, 1000]);
                if alternative <= 6 && rng.chance(80) {
                    head(out, 6, 121 + alternative, rng);
                    items(out, rng, depth, len, false);
                } else if (7..=127).contains(&alternative) && rng.chance(80) {
                    head(out, 6, 1280 + alternative - 7, rng);
                    items(out, rng, depth, len, false);
                } else {
                    head(out, 6, ConstrPlutusData::GENERAL_FORM_TAG, rng);
                    let indefinite = rng.chance(50);
                    out.push(if indefinite { 0x9f } else { 0x82 });
                    head(out, 0, alternative, rng);
                    items(out, rng, depth, len, false);
                    if indefinite {
                        out.push(0xff);
                    }
                }
            }
            _ => items(out, rng, depth, len, true),
        }
    }

    /// CBOR for a random value, then variants with a mutated byte or truncated.
    fn inputs(rng: &mut Rng, depth: u32) -> Vec<Vec<u8>> {
        let mut raw = Vec::new();
        data(&mut raw, rng, depth);
        let mut variants = vec![raw.clone()];
        for _ in 0..2 {
            let mut mutated = raw.clone();
            let at = rng.below(raw.len() as u64) as usize;
            mutated[at] = rng.pick(&[
                0xff, 0x00, 0xf6, 0x9f, 0xbf, 0xd8, 0x41, 0x80, 0xa0, 0x1b, 0x81, 0xc2,
            ]);
            variants.push(mutated);
        }
        variants.push(raw[..rng.below(raw.len() as u64) as usize].to_vec());
        variants
    }

    fn decode(raw: &[u8], depth: usize) -> (Result<PlutusData, DeserializeError>, u64) {
        let mut deserializer = Deserializer::from(Cursor::new(raw));
        let result = read_data(&mut deserializer, depth);
        let position = deserializer.as_mut_ref().stream_position().unwrap();
        (result, position)
    }

    fn encode(data: &PlutusData, canonical: bool, depth: usize) -> Vec<u8> {
        let mut serializer = Serializer::new_vec();
        write_data(data, &mut serializer, canonical, depth).unwrap();
        serializer.finalize()
    }

    fn hash(data: &PlutusData, depth: usize) -> u64 {
        let mut hasher = DefaultHasher::new();
        hash_within(data, &mut hasher, depth);
        hasher.finish()
    }

    #[test]
    fn decoding_is_independent_of_recursion_depth() {
        let mut rng = Rng(0x2545_f491_4f6c_dd1d);
        let (mut values, mut errors) = (0, 0);
        for round in 0..20_000 {
            for raw in inputs(&mut rng, 1 + round % 6) {
                let depth = rng.depth();
                let (expected, position) = decode(&raw, 0);
                let (actual, actual_position) = decode(&raw, depth);
                let context = format!("{} at depth {depth}", hex::encode(&raw));
                assert_eq!(actual_position, position, "{context}");
                match (actual, expected) {
                    (Ok(actual), Ok(expected)) => {
                        assert_eq!(format!("{actual:?}"), format!("{expected:?}"), "{context}");
                        values += 1;
                    }
                    (Err(actual), Err(expected)) => {
                        assert_eq!(actual.to_string(), expected.to_string(), "{context}");
                        errors += 1;
                    }
                    (actual, expected) => panic!("{}: {:?} != {:?}", context, actual, expected),
                }
            }
        }
        assert!(values > 10_000 && errors > 10_000);
    }

    #[test]
    fn other_operations_are_independent_of_recursion_depth() {
        let mut rng = Rng(0x9e37_79b9_7f4a_7c15);
        let mut tested = 0;
        for round in 0..20_000 {
            let variants = inputs(&mut rng, 1 + round % 6);
            let (Ok(data), _) = decode(&variants[0], RECURSION_LIMIT) else {
                continue;
            };
            let context = hex::encode(&variants[0]);
            for canonical in [false, true] {
                let depth = rng.depth();
                assert_eq!(
                    encode(&data, canonical, depth),
                    encode(&data, canonical, 0),
                    "{context} at depth {depth}"
                );
            }
            let depth = rng.depth();
            assert_eq!(
                format!("{:?}", copy_within::<false>(&data, depth)),
                format!("{:?}", data),
                "{context} at depth {depth}"
            );
            assert_eq!(
                format!("{:?}", copy_within::<true>(&data, depth)),
                format!("{:?}", copy_within::<true>(&data, 0)),
                "{context} at depth {depth}"
            );
            assert_eq!(
                hash(&data, depth),
                hash(&data, 0),
                "{context} at depth {depth}"
            );
            if let (Ok(other), _) = decode(&variants[1], RECURSION_LIMIT) {
                for (a, b) in [(&data, &other), (&other, &data)] {
                    assert_eq!(
                        compare(a, b, depth),
                        compare(a, b, 0),
                        "{context} at depth {depth}"
                    );
                }
            }
            tested += 1;
        }
        assert!(tested > 10_000);
    }
}
