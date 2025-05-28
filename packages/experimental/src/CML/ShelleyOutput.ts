import {
    Data,
    Effect,
    FastCheck,
    Inspectable,
    ParseResult,
    pipe,
    Schema,
} from "effect";
import { Bytes } from "../index.js";
import * as CBOR from "../CBOR.js";
import * as Hex from "../Hex.js";
import * as Value from "./Value.js";
import { Address } from "../index.js";

/**
 * CDDL specs (Shelley era)
 * shelley_transaction_output = [address, amount : value, ? hash32]
 * hash32 = bytes .size 32
 * value = coin/ [coin, multiasset<positive_coin>]
 * coin = uint
 */

/**
 * Represents a Shelley era transaction output with address, value, and optional datum hash
 *
 * @since 2.0.0
 * @category schemas
 */
class ShelleyTransactionOutput
    extends Schema.TaggedClass<ShelleyTransactionOutput>(
        "ShelleyTransactionOutput",
    )("ShelleyTransactionOutput", {
        address: Address.Address,
        value: Schema.BigIntFromSelf,
        datumHash: Schema.optional(Schema.Uint8ArrayFromSelf), // Optional hash32 (32 bytes)
    }) {
    [Inspectable.NodeInspectSymbol]() {
        return {
            _tag: "ShelleyTransactionOutput",
            address: this.address,
            value: this.value,
            datumHash: this.datumHash,
        };
    }
}

/**
 * Error class for ShelleyTransactionOutput operations
 *
 * @since 2.0.0
 * @category errors
 */
class ShelleyTransactionOutputError extends Data.TaggedError(
    "ShelleyTransactionOutputError",
)<{
    message?: string;
    cause?: unknown;
}> {}

/**
 * Check if the given value is a valid ShelleyTransactionOutput
 *
 * @example
 * import { ShelleyTransactionOutput, Address, Value } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const address = Address.decodeBech32OrThrow("addr_test1qq...");
 * const amount = Value.make(1000000n);
 * const output = ShelleyTransactionOutput.make({ address, amount });
 * const isValid = ShelleyTransactionOutput.isShelleyTransactionOutput(output);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
const isShelleyTransactionOutput = Schema.is(ShelleyTransactionOutput);

/**
 * Schema for transforming between CBOR bytes and ShelleyTransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const CBORBytes = Schema.transform(
    Schema.Uint8ArrayFromSelf.annotations({
        identifier: "CBORBytes",
    }),
    ShelleyTransactionOutput,
    {
        strict: true,
        encode: (toI, toA) => {
            const addressBytes = Address.encodeBytesOrThrow(toA.address);
            const outputArray: unknown[] = [addressBytes, toA.value];
            if (toA.datumHash) {
                outputArray.push(toA.datumHash);
            }
            return CBOR.encodeAsBytesOrThrow(outputArray);
        },
        decode: (fromI, fromA) => {
            const decoded = CBOR.decodeBytesOrThrow(fromA);
            if (
                !Array.isArray(decoded) || decoded.length < 2 ||
                decoded.length > 3
            ) {
                throw new Error("Expected CBOR array with 2 or 3 elements");
            }

            const [addressBytes, value, datumHash] = decoded;
            const address = Address.decodeBytesOrThrow(addressBytes);

            return new ShelleyTransactionOutput({
                address,
                value,
                datumHash,
            });
        },
    },
);

/**
 * Schema for transforming between CBOR hex and ShelleyTransactionOutput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const CBORHex = Schema.transform(
    Hex.HexString.pipe(Schema.typeSchema).annotations({
        identifier: "CBORHex",
    }),
    ShelleyTransactionOutput,
    {
        strict: true,
        encode: (toI, toA) => {
            const addressBytes = Address.encodeBytesOrThrow(toA.address);
            const outputArray: unknown[] = [addressBytes, toA.value];
            if (toA.datumHash) {
                outputArray.push(toA.datumHash);
            }
            const cborBytes = CBOR.encodeAsBytesOrThrow(outputArray);
            return Hex.fromBytes(cborBytes);
        },
        decode: (fromI, fromA) => {
            const cborBytes = Hex.toBytes(fromA);
            const decoded = CBOR.decodeBytesOrThrow(cborBytes);
            if (
                !Array.isArray(decoded) || decoded.length < 2 ||
                decoded.length > 3
            ) {
                throw new Error("Expected CBOR array with 2 or 3 elements");
            }

            const [addressBytes, value, datumHash] = decoded;
            const address = Address.decodeBytesOrThrow(addressBytes);

            return new ShelleyTransactionOutput({
                address,
                value,
                datumHash,
            });
        },
    },
);

/**
 * Check if two ShelleyTransactionOutput instances are equal.
 *
 * @example
 * import { ShelleyTransactionOutput, Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const address = Address.decodeBech32OrThrow("addr_test1...");
 * const value = 1000000n;
 * const output1 = new ShelleyTransactionOutput({ address, value });
 * const output2 = new ShelleyTransactionOutput({ address, value });
 * const output3 = new ShelleyTransactionOutput({ address, value: 2000000n });
 *
 * assert(ShelleyTransactionOutput.equals(output1, output2) === true);
 * assert(ShelleyTransactionOutput.equals(output1, output3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (
    a: ShelleyTransactionOutput,
    b: ShelleyTransactionOutput,
): boolean => {
    return (
        a._tag === b._tag &&
        a.value === b.value &&
        Address.equals(a.address, b.address) &&
        // Compare datumHash
        ((a.datumHash === undefined && b.datumHash === undefined) ||
            (a.datumHash !== undefined &&
                b.datumHash !== undefined &&
                a.datumHash.length === b.datumHash.length &&
                a.datumHash.every((byte, i) => byte === b.datumHash![i])))
    );
};

/**
 * Generator for creating random ShelleyTransactionOutput instances for testing
 *
 * @since 2.0.0
 * @category generators
 */
const generator = FastCheck.tuple(
    Address.generator,
    FastCheck.bigInt({ min: 1n, max: 1000000000n }),
    FastCheck.option(FastCheck.uint8Array({ minLength: 32, maxLength: 32 })),
).map(
    ([address, value, datumHash]) =>
        new ShelleyTransactionOutput({
            address,
            value,
            datumHash: datumHash ?? undefined,
        }),
);

export {
    CBORBytes,
    CBORHex,
    equals,
    generator,
    isShelleyTransactionOutput,
    ShelleyTransactionOutput,
    ShelleyTransactionOutputError,
};
