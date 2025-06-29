import { Effect, ParseResult, pipe, Schema } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as Numeric from "./Numeric.js";
import * as CBOR from "./CBOR.js";
import { Hex } from "./index.js";
import * as NativeScriptCDDL from "./NativeScriptCDDL.js";
import * as NativeScriptJSON from "./NativeScriptJSON.js";

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

/**
 * Convert a NativeScript to its CDDL representation.
 *
 * @example
 * import { toNativeScriptCDDL } from "@lucid-evolution/experimental";
 * import { ScriptPubKey, KeyHash } from "@lucid-evolution/experimental";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const script = new ScriptPubKey({ keyHash });
 * const cddl = toNativeScriptCDDL(script);
 *
 * @since 2.0.0
 * @category encoding
 */
export const toNativeScriptCDDL = (
  nativeScript: NativeScript,
): NativeScriptCDDL.NativeScriptCDDL => {
  switch (nativeScript._tag) {
    case "ScriptPubKey": {
      return [0, KeyHash.Encode.bytes(nativeScript.keyHash)];
    }
    case "ScriptAll": {
      return [
        1,
        nativeScript.scripts.map((script: NativeScript) =>
          toNativeScriptCDDL(script),
        ),
      ];
    }
    case "ScriptAny": {
      return [
        2,
        nativeScript.scripts.map((script: NativeScript) =>
          toNativeScriptCDDL(script),
        ),
      ];
    }
    case "ScriptNOfK": {
      return [
        3,
        nativeScript.n,
        nativeScript.scripts.map((script: NativeScript) =>
          toNativeScriptCDDL(script),
        ),
      ];
    }
    case "InvalidBefore": {
      return [4, BigInt(nativeScript.slot)];
    }
    case "InvalidHereafter": {
      return [5, BigInt(nativeScript.slot)];
    }
    default:
      throw new Error(
        `Exhaustive check failed: Unhandled case '${(nativeScript as unknown as { _tag: string })._tag}' encountered.`,
      );
  }
};

/**
 * Convert a CDDL representation back to a NativeScript.
 *
 * This function recursively decodes nested CBOR scripts and constructs
 * the appropriate NativeScript instances.
 *
 * @example
 * import { fromNativeScriptCDDL } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const cddl: NativeScriptCDDL.NativeScriptCDDL = [0, keyHashBytes];
 * const scriptEffect = fromNativeScriptCDDL(cddl);
 * const script = Effect.runSync(scriptEffect);
 *
 * @since 2.0.0
 * @category decoding
 */
export const fromNativeScriptCDDL = (
  cborTuple: NativeScriptCDDL.NativeScriptCDDL,
): Effect.Effect<NativeScript, never> =>
  Effect.gen(function* () {
    switch (cborTuple[0]) {
      case 0: {
        // ScriptPubKey: [0, keyHash_bytes]
        const [, keyHashBytes] = cborTuple;
        const keyHash = KeyHash.Decode.bytes(keyHashBytes);
        return new ScriptPubKey({ keyHash });
      }
      case 1: {
        // ScriptAll: [1, [native_script, ...]]
        const [, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromNativeScriptCDDL(scriptCBOR);
          scripts.push(script);
        }
        return new ScriptAll({ scripts });
      }
      case 2: {
        // ScriptAny: [2, [native_script, ...]]
        const [, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromNativeScriptCDDL(scriptCBOR);
          scripts.push(script);
        }
        return new ScriptAny({ scripts });
      }
      case 3: {
        // ScriptNOfK: [3, n, [native_script, ...]]
        const [, n, scriptCBORs] = cborTuple;
        const scripts: NativeScript[] = [];
        for (const scriptCBOR of scriptCBORs) {
          const script = yield* fromNativeScriptCDDL(scriptCBOR);
          scripts.push(script);
        }
        return new ScriptNOfK({
          n: Numeric.Int64.make(n),
          scripts,
        });
      }
      case 4: {
        // InvalidBefore: [4, slot]
        const [, slot] = cborTuple;
        return new InvalidBefore({
          slot: Number(slot),
        });
      }
      case 5: {
        // InvalidHereafter: [5, slot]
        const [, slot] = cborTuple;
        return new InvalidHereafter({
          slot: Number(slot),
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
      ParseResult.succeed(CBOR.Encode().bytes(toNativeScriptCDDL(toI))),
    decode: (fromA) =>
      pipe(NativeScriptCDDL.CDDLDecoder.bytes(fromA), fromNativeScriptCDDL),
  },
);

export const CBORHexSchema = Schema.transformOrFail(
  Hex.HexSchema,
  NativeScript,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(CBOR.Encode().hex(toNativeScriptCDDL(toA))),
    decode: (fromI) =>
      pipe(NativeScriptCDDL.CDDLDecoder.hex(fromI), fromNativeScriptCDDL),
  },
);

/**
 * Schema transformer for converting between NativeJSON and NativeScript.
 *
 * @since 2.0.0
 * @category schemas
 */
const NativeJSON = Schema.transformOrFail(
  NativeScriptJSON.NativeJSONSchema,
  NativeScript,
  {
    strict: true,
    encode: (_, __, ___, toI) => nativeScriptToNativeJSON(toI),
    decode: (fromA) => nativeJSONToNativeScript(fromA),
  },
);

export const Encode = {
  cborBytes: Schema.encodeSync(CBORBytesSchema),
  cborHex: Schema.encodeSync(CBORHexSchema),
  json: Schema.encodeSync(NativeJSON),
};

export const Decode = {
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  json: Schema.decodeUnknownSync(NativeJSON),
};

export const EncodeEither = {
  cborBytes: Schema.encodeEither(CBORBytesSchema),
  cborHex: Schema.encodeEither(CBORHexSchema),
  json: Schema.encodeEither(NativeJSON),
};

export const DecodeEither = {
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  json: Schema.decodeUnknownEither(NativeJSON),
};

export const EncodeEffect = {
  cborBytes: Schema.encode(CBORBytesSchema),
  cborHex: Schema.encode(CBORHexSchema),
  json: Schema.encode(NativeJSON),
};

export const DecodeEffect = {
  cborBytes: Schema.decodeUnknown(CBORBytesSchema),
  cborHex: Schema.decodeUnknown(CBORHexSchema),
  json: Schema.decodeUnknown(NativeJSON),
};

/**
 * Convert a NativeJSON to a NativeScript.
 *
 * @example
 * import { nativeJSONToNativeScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const json = { type: "sig", keyHash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" };
 * const scriptEffect = nativeJSONToNativeScript(json);
 * const script = Effect.runSync(scriptEffect);
 *
 * @since 2.0.0
 * @category conversion
 */
export const nativeJSONToNativeScript = (
  nativeJSON: NativeScriptJSON.NativeJSON,
): Effect.Effect<NativeScript, never> =>
  Effect.gen(function* () {
    switch (nativeJSON.type) {
      case "sig": {
        const keyHash = KeyHash.Decode.hex(nativeJSON.keyHash);
        return new ScriptPubKey({ keyHash });
      }
      case "before": {
        return new InvalidBefore({ slot: nativeJSON.slot });
      }
      case "after": {
        return new InvalidHereafter({ slot: nativeJSON.slot });
      }
      case "all": {
        const scripts = yield* Effect.forEach(
          nativeJSON.scripts,
          nativeJSONToNativeScript,
        );
        return new ScriptAll({ scripts });
      }
      case "any": {
        const scripts = yield* Effect.forEach(
          nativeJSON.scripts,
          nativeJSONToNativeScript,
        );
        return new ScriptAny({ scripts });
      }
      case "atLeast": {
        const scripts = yield* Effect.forEach(
          nativeJSON.scripts,
          nativeJSONToNativeScript,
        );
        return new ScriptNOfK({
          n: Numeric.Int64.make(BigInt(nativeJSON.required)),
          scripts,
        });
      }
    }
  });

/**
 * Convert a NativeScript to a NativeJSON.
 *
 * @example
 * import { nativeScriptToNativeJSON } from "@lucid-evolution/experimental";
 * import { ScriptPubKey, KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const script = new ScriptPubKey({ keyHash });
 * const jsonEffect = nativeScriptToNativeJSON(script);
 * const json = Effect.runSync(jsonEffect);
 *
 * @since 2.0.0
 * @category conversion
 */
export const nativeScriptToNativeJSON = (
  nativeScript: NativeScript,
): Effect.Effect<NativeScriptJSON.NativeJSON, never> =>
  Effect.gen(function* () {
    switch (nativeScript._tag) {
      case "ScriptPubKey": {
        return {
          type: "sig" as const,
          keyHash: KeyHash.Encode.hex(nativeScript.keyHash),
        };
      }
      case "ScriptAll": {
        const scripts = yield* Effect.forEach(
          nativeScript.scripts,
          nativeScriptToNativeJSON,
        );
        return {
          type: "all" as const,
          scripts,
        };
      }
      case "ScriptAny": {
        const scripts = yield* Effect.forEach(
          nativeScript.scripts,
          nativeScriptToNativeJSON,
        );
        return {
          type: "any" as const,
          scripts,
        };
      }
      case "ScriptNOfK": {
        const scripts = yield* Effect.forEach(
          nativeScript.scripts,
          nativeScriptToNativeJSON,
        );
        return {
          type: "atLeast" as const,
          required: Number(nativeScript.n),
          scripts,
        };
      }
      case "InvalidBefore": {
        return {
          type: "before" as const,
          slot: nativeScript.slot,
        };
      }
      case "InvalidHereafter": {
        return {
          type: "after" as const,
          slot: nativeScript.slot,
        };
      }
      default:
        throw new Error(
          `Exhaustive check failed: Unhandled case '${(nativeScript as unknown as { _tag: string })._tag}' encountered.`,
        );
    }
  });
