import { Effect, ParseResult, pipe, Schema } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as Numeric from "./Numeric.js";
import * as CBOR from "./CBOR.js";
import { Hex } from "./index.js";

// CDDL specs for native scripts
// native_script =
//   [  script_pubkey
//   // script_all
//   // script_any
//   // script_n_of_k
//   // invalid_before
//   // invalid_hereafter
//   ]

// script_pubkey = (0, addr_keyhash)
// addr_keyhash = hash28
// script_all = (1, [* native_script])
// script_any = (2, [* native_script])
// script_n_of_k = (3, n : int64, [* native_script])
// invalid_before = (4, slot_no)
// invalid_hereafter = (5, slot_no)
// slot_no = uint .size 8

/**
 * Schema for slot numbers used in time-based native script constraints.
 *
 * @since 2.0.0
 * @category schemas
 */
export const SlotNumber = Numeric.Uint8Schema;

export type SlotNumber = typeof SlotNumber.Type;

// /**
//  * @since 2.0.0
//  * @category model
//  */
export type NativeScript =
  | ScriptPubKey
  | ScriptAll
  | ScriptAny
  | ScriptNOfK
  | InvalidBefore
  | InvalidHereafter;

export interface ScriptPubKey {
  readonly _tag: "ScriptPubKey";
  readonly keyHash: KeyHash.KeyHash;
}

export interface ScriptAll {
  readonly _tag: "ScriptAll";
  readonly scripts: readonly NativeScript[];
}

export interface ScriptAny {
  readonly _tag: "ScriptAny";
  readonly scripts: readonly NativeScript[];
}

export interface ScriptNOfK {
  readonly _tag: "ScriptNOfK";
  readonly n: Numeric.Int64;
  readonly scripts: readonly NativeScript[];
}

export interface InvalidBefore {
  readonly _tag: "InvalidBefore";
  readonly slot: SlotNumber;
}

export interface InvalidHereafter {
  readonly _tag: "InvalidHereafter";
  readonly slot: SlotNumber;
}

export type NativeScriptEncoded =
  | ScriptPubKeyEncoded
  | ScriptAllEncoded
  | ScriptAnyEncoded
  | ScriptNOfKEncoded
  | InvalidBeforeEncoded
  | InvalidHereafterEncoded;

export interface ScriptPubKeyEncoded {
  readonly _tag: "ScriptPubKey";
  readonly keyHash: KeyHash.KeyHash;
}
export interface ScriptAllEncoded {
  readonly _tag: "ScriptAll";
  readonly scripts: readonly NativeScriptEncoded[];
}
export interface ScriptAnyEncoded {
  readonly _tag: "ScriptAny";
  readonly scripts: readonly NativeScriptEncoded[];
}
export interface ScriptNOfKEncoded {
  readonly _tag: "ScriptNOfK";
  readonly n: bigint;
  readonly scripts: readonly NativeScriptEncoded[];
}

export interface InvalidBeforeEncoded {
  readonly _tag: "InvalidBefore";
  readonly slot: number;
}

export interface InvalidHereafterEncoded {
  readonly _tag: "InvalidHereafter";
  readonly slot: number;
}

export const ScriptPubKey = Schema.TaggedStruct("ScriptPubKey", {
  keyHash: KeyHash.KeyHash,
});

export const ScriptAll = Schema.TaggedStruct("ScriptAll", {
  scripts: Schema.Array(
    Schema.suspend(
      (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
    ),
  ),
});

export const ScriptAny = Schema.TaggedStruct("ScriptAny", {
  scripts: Schema.Array(
    Schema.suspend(
      (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
    ),
  ),
});

export const ScriptNOfK = Schema.TaggedStruct("ScriptNOfK", {
  n: Numeric.Int64,
  scripts: Schema.Array(
    Schema.suspend(
      (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
    ),
  ),
});

export const InvalidBefore = Schema.TaggedStruct("InvalidBefore", {
  slot: SlotNumber,
});

export const InvalidHereafter = Schema.TaggedStruct("InvalidHereafter", {
  slot: SlotNumber,
});

export const NativeScript = Schema.Union(
  ScriptPubKey,
  ScriptAll,
  ScriptAny,
  ScriptNOfK,
  InvalidBefore,
  InvalidHereafter,
);

const toCBORBytes = (nativeScript: NativeScript): Uint8Array => {
  switch (nativeScript._tag) {
    case "ScriptPubKey": {
      return CBOR.Encode.bytes([0, KeyHash.Encode.bytes(nativeScript.keyHash)]);
    }
    case "ScriptAll": {
      return CBOR.Encode.bytes([
        1,
        nativeScript.scripts.map((script) => toCBORBytes(script)),
      ]);
    }

    case "ScriptAny": {
      return CBOR.Encode.bytes([
        2,
        nativeScript.scripts.map((script) => toCBORBytes(script)),
      ]);
    }
    case "ScriptNOfK": {
      return CBOR.Encode.bytes([
        3,
        nativeScript.n,
        nativeScript.scripts.map((script) => toCBORBytes(script)),
      ]);
    }
    case "InvalidBefore": {
      return CBOR.Encode.bytes([4, nativeScript.slot]);
    }
    case "InvalidHereafter": {
      return CBOR.Encode.bytes([5, nativeScript.slot]);
    }
  }
};

// script_pubkey = (0, addr_keyhash)
// addr_keyhash = hash28
// script_all = (1, [* native_script])
// script_any = (2, [* native_script])
// script_n_of_k = (3, n : int64, [* native_script])
// invalid_before = (4, slot_no)
// invalid_hereafter = (5, slot_no)
// slot_no = uint .size 8

const ScriptPubKeyCBOR = Schema.Tuple(
  Schema.Literal(0),
  Schema.Uint8ArrayFromSelf,
);

const ScriptAllCBOR = Schema.Tuple(
  Schema.Literal(1),
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCBOR> => NativeScriptCBOR),
  ),
);

const ScriptAnyCBOR = Schema.Tuple(
  Schema.Literal(2),
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCBOR> => NativeScriptCBOR),
  ),
);

const ScriptNOfKCBOR = Schema.Tuple(
  Schema.Literal(3),
  Schema.BigIntFromSelf,
  Schema.Array(
    Schema.suspend((): Schema.Schema<NativeScriptCBOR> => NativeScriptCBOR),
  ),
);

const InvalidBeforeCBOR = Schema.Tuple(
  Schema.Literal(4),
  Schema.BigIntFromSelf,
);

const InvalidHereafterCBOR = Schema.Tuple(
  Schema.Literal(5),
  Schema.BigIntFromSelf,
);

export type NativeScriptCBOR =
  | readonly [0, Uint8Array]
  | readonly [1, readonly NativeScriptCBOR[]]
  | readonly [2, readonly NativeScriptCBOR[]]
  | readonly [3, bigint, readonly NativeScriptCBOR[]]
  | readonly [4, bigint]
  | readonly [5, bigint];

export const NativeScriptCBOR = Schema.Union(
  ScriptPubKeyCBOR,
  ScriptAllCBOR,
  ScriptAnyCBOR,
  ScriptNOfKCBOR,
  InvalidBeforeCBOR,
  InvalidHereafterCBOR,
);

const NativeScriptCBORDecoder = CBOR.DecodeWithSchema(NativeScriptCBOR);

// Helper function to decode nested CBOR scripts
const fromCBORTuple = (
  cborTuple: NativeScriptCBOR,
): Effect.Effect<NativeScript, never> =>
  Effect.gen(function* () {
    switch (cborTuple[0]) {
      case 0: {
        // ScriptPubKey: [0, keyHash_bytes]
        const [, keyHashBytes] = cborTuple;
        const keyHash = KeyHash.Decode.bytes(keyHashBytes);
        return ScriptPubKey.make({ keyHash });
      }
      case 1: {
        // ScriptAll: [1, [native_script, ...]]
        const [, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromCBORTuple(scriptCBOR);
          scripts.push(script);
        }
        return ScriptAll.make({ scripts });
      }
      case 2: {
        // ScriptAny: [2, [native_script, ...]]
        const [, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromCBORTuple(scriptCBOR);
          scripts.push(script);
        }
        return ScriptAny.make({ scripts });
      }
      case 3: {
        // ScriptNOfK: [3, n, [native_script, ...]]
        const [, n, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromCBORTuple(scriptCBOR);
          scripts.push(script);
        }
        return ScriptNOfK.make({
          n: Numeric.Int64.make(n),
          scripts,
        });
      }
      case 4: {
        // InvalidBefore: [4, slot]
        const [, slot] = cborTuple;
        return InvalidBefore.make({
          slot: Numeric.Uint8Schema.make(Number(slot)),
        });
      }
      case 5: {
        // InvalidHereafter: [5, slot]
        const [, slot] = cborTuple;
        return InvalidHereafter.make({
          slot: Numeric.Uint8Schema.make(Number(slot)),
        });
      }
      default:
        // This should never happen with proper CBOR validation
        throw new Error(`Invalid native script tag: ${cborTuple[0]}`);
    }
  });

export const CBORBytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf,
  NativeScript,
  {
    strict: true,
    encode: (_, __, ___, toI) => ParseResult.succeed(toCBORBytes(toI)),
    decode: (fromA) =>
      pipe(NativeScriptCBORDecoder.bytes(fromA), fromCBORTuple),
  },
);

export const CBORHexSchema = Schema.transformOrFail(
  Hex.HexSchema,
  NativeScript,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(Hex.Encode.hex(toCBORBytes(toA))),
    decode: (fromI) =>
      pipe(Hex.Decode.hex(fromI), NativeScriptCBORDecoder.bytes, fromCBORTuple),
  },
);

export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
  hex: Schema.encodeSync(CBORHexSchema),
};

export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  hex: Schema.decodeUnknownSync(CBORHexSchema),
};

export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
  hex: Schema.encodeEither(CBORHexSchema),
};

export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
  hex: Schema.decodeUnknownEither(CBORHexSchema),
};

export const EncodeEffect = {
  bytes: Schema.encode(CBORBytesSchema),
  hex: Schema.encode(CBORHexSchema),
};

export const DecodeEffect = {
  bytes: Schema.decodeUnknown(CBORBytesSchema),
  hex: Schema.decodeUnknown(CBORHexSchema),
};
