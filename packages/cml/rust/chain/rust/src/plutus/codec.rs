//! CBOR traversal shared by PlutusData and its standalone container APIs.
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
        if matches!(len, LenSz::Len(n, _) if length as u64 == n) {
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

fn constr_frame<R: BufRead + Seek>(raw: &mut Deserializer<R>) -> Result<Frame, DeserializeError> {
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
    Ok(Frame::Constr {
        constr: ConstrPlutusData {
            alternative,
            fields: Vec::new(),
            encodings: Some(ConstrPlutusDataEncoding {
                len_encoding: general_len.map(Into::into).unwrap_or_default(),
                fields_encoding: fields_len.into(),
                tag_encoding: Some(tag_encoding),
                alternative_encoding,
                prefer_compact: general_len.is_none(),
            }),
        },
        fields_len,
        general_len,
    })
}

pub(super) fn deserialize<R: BufRead + Seek>(
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
