import { Label } from "@lucid-evolution/core-types";
import * as TxBuilder from "../TxBuilder.js";
import { Effect } from "effect";
import { CML } from "../../core.js";
import * as S from "@effect/schema/Schema";
import { toHex } from "@lucid-evolution/core-utils";

export const attachMetadata = (
  config: TxBuilder.TxBuilderConfig,
  label: Label,
  metadata: TransactionMetadata,
) =>
  Effect.gen(function* () {
    const auxiliaryData = CML.AuxiliaryData.new();
    const meta = CML.Metadata.new();
    meta.set(
      BigInt(label),
      CML.TransactionMetadatum.from_json(
        JSON.stringify(toCardanoMetadata(metadata)),
      ),
    );
    auxiliaryData.add_metadata(meta);
    config.txBuilder.add_auxiliary_data(auxiliaryData);
    auxiliaryData.free();
    meta.free();
  });

//CDDL conformance
//   transaction_metadatum =
//   { * transaction_metadatum => transaction_metadatum }
// / [ * transaction_metadatum ]
// / int
// / bytes .size (0..64)
// / text .size (0..64)

export type CardanoMetadata =
  | {
      string: string;
    }
  | {
      int: number;
    }
  | {
      bytes: string;
    }
  | {
      list: ReadonlyArray<CardanoMetadata>;
    }
  | {
      map: ReadonlyArray<{
        k: CardanoMetadata;
        v: CardanoMetadata;
      }>;
    };

export type TransactionMetadata =
  | string
  | number
  | Uint8Array
  | ReadonlyArray<TransactionMetadata>
  | { [key: string]: TransactionMetadata };

const TextSchema = S.String.pipe(S.maxLength(64));

const TransactionMetadataSchema: S.Schema<TransactionMetadata> = S.Union(
  TextSchema,
  S.Number,
  S.Uint8ArrayFromSelf,
  S.Array(S.suspend(() => TransactionMetadataSchema)),
  S.Record(
    S.String,
    S.suspend(() => TransactionMetadataSchema),
  ),
);

export const toCardanoMetadata = (
  json: TransactionMetadata,
): CardanoMetadata => {
  const d = S.asserts(TransactionMetadataSchema)(json);
  if (S.is(TextSchema)(json)) {
    return { string: json };
  }
  if (typeof json === "number") {
    return { int: json };
  }
  if (json instanceof Uint8Array) {
    return { bytes: toHex(json) };
  }
  if (Array.isArray(json)) {
    return { list: json.map((value) => toCardanoMetadata(value)) };
  }
  if (typeof json === "object" && json !== null) {
    const mapEntries = Object.entries(json).map(([k, v]) => ({
      k: toCardanoMetadata(k),
      v: toCardanoMetadata(v),
    }));
    return { map: mapEntries };
  }
  throw new Error("Unsupported type");
};
