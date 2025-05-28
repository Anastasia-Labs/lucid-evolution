import {
    Data,
    Effect,
    FastCheck,
    Inspectable,
    ParseResult,
    pipe,
    Schema,
} from "effect";
import * as CBOR from "../CBOR.js";
import * as Hex from "../Hex.js";
import { Address } from "../index.js";

/**
 * CDDL specs
 * babbage_transaction_output = {0 : address, 1 : value, ? 2 : datum_option, ? 3 : script_ref}
 * datum_option = [0, hash32// 1, data]
 * script_ref = #6.24(bytes .cbor script)
 */

/**
 * Represents a Babbage era transaction output with address, value, and optional datum and script reference
 *
 * @since 2.0.0
 * @category schemas
 */
class BabbageTransactionOutput
    extends Schema.TaggedClass<BabbageTransactionOutput>(
        "BabbageTransactionOutput",
    )("BabbageTransactionOutput", {
        address: Address.Address,
        value: Schema.BigIntFromSelf,
        datumOption: Schema.optional(Schema.Uint8ArrayFromSelf), // CBOR encoded datum_option
        scriptRef: Schema.optional(Schema.Uint8ArrayFromSelf), // CBOR encoded script_ref
    }) {
    [Inspectable.NodeInspectSymbol]() {
        return {
            _tag: "BabbageTransactionOutput",
            address: this.address,
            value: this.value,
            datumOption: this.datumOption,
            scriptRef: this.scriptRef,
        };
    }
}

/**
 * Error thrown when BabbageTransactionOutput operations fail
 *
 * @since 2.0.0
 * @category errors
 */
class BabbageTransactionOutputError extends Data.TaggedError(
    "BabbageTransactionOutputError",
)<{
    message: string;
    cause?: unknown;
}> {}

/**
 * Check if the given value is a valid BabbageTransactionOutput
 *
 * @example
 * import { BabbageTransactionOutput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const addressBytes = new Uint8Array([...]);
 * const value = 1000000n;
 * const output = new BabbageTransactionOutput({ address: addressBytes, value });
 * const isValid = BabbageTransactionOutput.isBabbageTransactionOutput(output);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
const isBabbageTransactionOutput = Schema.is(BabbageTransactionOutput);

/**
 * Schema for transforming between CBOR bytes and BabbageTransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const CBORBytes = Schema.transformOrFail(
    Schema.Uint8ArrayFromSelf.annotations({
        identifier: "CBORBytes",
    }),
    BabbageTransactionOutput,
    {
        strict: true,
        encode: (toI, options, ast, toA) =>
            pipe(
                ParseResult.encode(Address.Bytes)(toA.address),
                Effect.map((addressBytes) => {
                    const map = new Map<number, unknown>([
                        [0, addressBytes],
                        [1, toA.value],
                    ]);

                    if (toA.datumOption) {
                        map.set(2, toA.datumOption);
                    }

                    if (toA.scriptRef) {
                        map.set(3, toA.scriptRef);
                    }

                    return CBOR.encodeAsBytesOrThrow(map);
                }),
            ),
        decode: (fromA, options, ast, fromI) =>
            pipe(
                CBOR.decodeBytes(fromA),
                Effect.mapError(
                    (error) => new ParseResult.Type(ast, fromA, error.message),
                ),
                Effect.flatMap((decoded) => {
                    if (!(decoded instanceof Map)) {
                        return ParseResult.fail(
                            new ParseResult.Type(
                                ast,
                                fromA,
                                "Expected CBOR Map",
                            ),
                        );
                    }

                    const addressBytes = decoded.get(0);
                    if (
                        !addressBytes || !(addressBytes instanceof Uint8Array)
                    ) {
                        return ParseResult.fail(
                            new ParseResult.Type(
                                ast,
                                fromA,
                                "Missing or invalid address at key 0",
                            ),
                        );
                    }

                    const value = decoded.get(1);
                    if (typeof value !== "bigint") {
                        return ParseResult.fail(
                            new ParseResult.Type(
                                ast,
                                fromA,
                                "Missing or invalid value at key 1",
                            ),
                        );
                    }

                    return pipe(
                        ParseResult.decode(Address.Bytes)(addressBytes),
                        Effect.map((address) => {
                            const datumOption = decoded.get(2) as
                                | Uint8Array
                                | undefined;
                            const scriptRef = decoded.get(3) as
                                | Uint8Array
                                | undefined;

                            return new BabbageTransactionOutput({
                                address,
                                value,
                                datumOption,
                                scriptRef,
                            });
                        }),
                    );
                }),
            ),
    },
);

/**
 * Schema for transforming between CBOR hex and BabbageTransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const CBORHex = Schema.transformOrFail(
    Hex.HexString.pipe(Schema.typeSchema).annotations({
        identifier: "CBORHex",
    }),
    BabbageTransactionOutput,
    {
        strict: true,
        encode: (toI, options, ast, toA) =>
            pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
        decode: (fromA, options, ast) =>
            pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
    },
);

/**
 * Check if two BabbageTransactionOutput instances are equal.
 *
 * @example
 * import { BabbageTransactionOutput, Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const address = Address.decodeBech32OrThrow("addr_test1...");
 * const value = 1000000n;
 * const output1 = new BabbageTransactionOutput({ address, value });
 * const output2 = new BabbageTransactionOutput({ address, value });
 * const output3 = new BabbageTransactionOutput({ address, value: 2000000n });
 *
 * assert(BabbageTransactionOutput.equals(output1, output2) === true);
 * assert(BabbageTransactionOutput.equals(output1, output3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (
    a: BabbageTransactionOutput,
    b: BabbageTransactionOutput,
): boolean => {
    return (
        a._tag === b._tag &&
        a.value === b.value &&
        Address.equals(a.address, b.address) &&
        // Compare datumOption
        ((a.datumOption === undefined && b.datumOption === undefined) ||
            (a.datumOption !== undefined &&
                b.datumOption !== undefined &&
                a.datumOption.length === b.datumOption.length &&
                a.datumOption.every((byte, i) =>
                    byte === b.datumOption![i]
                ))) &&
        // Compare scriptRef
        ((a.scriptRef === undefined && b.scriptRef === undefined) ||
            (a.scriptRef !== undefined &&
                b.scriptRef !== undefined &&
                a.scriptRef.length === b.scriptRef.length &&
                a.scriptRef.every((byte, i) => byte === b.scriptRef![i])))
    );
};

/**
 * Generator for creating random BabbageTransactionOutput instances for testing
 *
 * @since 2.0.0
 * @category generators
 */
const generator = FastCheck.tuple(
    Address.generator,
    FastCheck.bigInt({ min: 1n, max: 1000000000n }),
    FastCheck.option(FastCheck.uint8Array({ minLength: 1, maxLength: 100 })),
    FastCheck.option(FastCheck.uint8Array({ minLength: 1, maxLength: 200 })),
).map(
    ([address, value, datumOption, scriptRef]) =>
        new BabbageTransactionOutput({
            address,
            value,
            datumOption: datumOption ?? undefined,
            scriptRef: scriptRef ?? undefined,
        }),
);

export {
    BabbageTransactionOutput,
    BabbageTransactionOutputError,
    CBORBytes,
    CBORHex,
    equals,
    generator,
    isBabbageTransactionOutput,
};
