import { Effect, ParseResult, pipe, Schema } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as Numeric from "./Numeric.js";
import * as CBOR from "./CBOR.js";
import { Hex } from "./index.js";
import { NodeInspectSymbol } from "effect/Inspectable";

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

export class ScriptPubKey extends Schema.TaggedClass<ScriptPubKey>(
  "ScriptPubKey",
)("ScriptPubKey", {
  keyHash: KeyHash.KeyHash,
}) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      keyHash: this.keyHash,
    };
  }
}

export class ScriptAll extends Schema.TaggedClass<ScriptAll>("ScriptAll")(
  "ScriptAll",
  {
    scripts: Schema.Array(
      Schema.suspend(
        (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
      ),
    ),
  },
) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      scripts: this.scripts.map((script) => script),
    };
  }
}

export class ScriptAny extends Schema.TaggedClass<ScriptAny>("ScriptAny")(
  "ScriptAny",
  {
    scripts: Schema.Array(
      Schema.suspend(
        (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
      ),
    ),
  },
) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      scripts: this.scripts.map((script) => script),
    };
  }
}

export class ScriptNOfK extends Schema.TaggedClass<ScriptNOfK>("ScriptNOfK")(
  "ScriptNOfK",
  {
    n: Numeric.Int64,
    scripts: Schema.Array(
      Schema.suspend(
        (): Schema.Schema<NativeScript, NativeScriptEncoded> => NativeScript,
      ),
    ),
  },
) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      n: this.n,
      scripts: this.scripts.map((script) => script),
    };
  }
}

export class InvalidBefore extends Schema.TaggedClass<InvalidBefore>(
  "InvalidBefore",
)("InvalidBefore", {
  slot: SlotNumber,
}) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      slot: this.slot,
    };
  }
}

export class InvalidHereafter extends Schema.TaggedClass<InvalidHereafter>(
  "InvalidHereafter",
)("InvalidHereafter", {
  slot: SlotNumber,
}) {
  // Inspectable
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      slot: this.slot,
    };
  }
}

export const NativeScript = Schema.Union(
  ScriptPubKey,
  ScriptAll,
  ScriptAny,
  ScriptNOfK,
  InvalidBefore,
  InvalidHereafter,
);

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

const toCBORTuple = (nativeScript: NativeScript): NativeScriptCBOR => {
  switch (nativeScript._tag) {
    case "ScriptPubKey": {
      return [0, KeyHash.Encode.bytes(nativeScript.keyHash)];
    }
    case "ScriptAll": {
      return [1, nativeScript.scripts.map((script) => toCBORTuple(script))];
    }
    case "ScriptAny": {
      return [2, nativeScript.scripts.map((script) => toCBORTuple(script))];
    }
    case "ScriptNOfK": {
      return [
        3,
        nativeScript.n,
        nativeScript.scripts.map((script) => toCBORTuple(script)),
      ];
    }
    case "InvalidBefore": {
      return [4, BigInt(nativeScript.slot)];
    }
    case "InvalidHereafter": {
      return [5, BigInt(nativeScript.slot)];
    }
  }
};

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
    encode: (_, __, ___, toI) =>
      ParseResult.succeed(CBOR.Encode.bytes(toCBORTuple(toI))),
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
      ParseResult.succeed(CBOR.Encode.hex(toCBORTuple(toA))),
    decode: (fromI) => pipe(NativeScriptCBORDecoder.hex(fromI), fromCBORTuple),
  },
);

export const Encode = {
  cborBytes: Schema.encodeSync(CBORBytesSchema),
  cborHex: Schema.encodeSync(CBORHexSchema),
};

export const Decode = {
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
};

export const EncodeEither = {
  cborBytes: Schema.encodeEither(CBORBytesSchema),
  cborHex: Schema.encodeEither(CBORHexSchema),
};

export const DecodeEither = {
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
};

export const EncodeEffect = {
  cborBytes: Schema.encode(CBORBytesSchema),
  cborHex: Schema.encode(CBORHexSchema),
};

export const DecodeEffect = {
  cborBytes: Schema.decodeUnknown(CBORBytesSchema),
  cborHex: Schema.decodeUnknown(CBORHexSchema),
};
