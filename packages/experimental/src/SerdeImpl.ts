import { Effect } from "effect";

export type ToCBORBytes<T> = (value: T) => Uint8Array;

export type ToCBOR<T> = (value: T) => string;

export type FromCBOR<Output, Error> = (
  cborHex: string,
) => Effect.Effect<Output, Error>;

export type FromCBOROrThrow<T> = (cborHex: string) => T;

export type FromCBORBytes<Output, Error> = (
  cborBytes: Uint8Array,
) => Effect.Effect<Output, Error>;

export type FromCBORBytesOrThrow<T> = (cborBytes: Uint8Array) => T;

export type FromBytes<Output, Error> = (
  bytes: Uint8Array,
) => Effect.Effect<Output, Error>;

export type FromHex<Output, Error> = (
  hex: string,
) => Effect.Effect<Output, Error>;

export type FromBech32<Output, Error> = (
  bech32: string,
) => Effect.Effect<Output, Error>;

export type FromString<Output, Error> = (
  str: string,
) => Effect.Effect<Output, Error>;

export type ToBytes<T> = (value: T) => Uint8Array;

export type Make<Output, Error> = (
  hash: string,
) => Effect.Effect<Output, Error>;

export type MakeOrThrow<T> = (hash: string) => T;
