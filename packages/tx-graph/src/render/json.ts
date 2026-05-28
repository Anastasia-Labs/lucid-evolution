import type { TxGraphTrace } from "../model.js";
import { sortedEdges } from "./common.js";

export const traceToJSON = (trace: TxGraphTrace): TxGraphTrace => ({
  version: 1,
  ...(trace.createdAt ? { createdAt: trace.createdAt } : {}),
  transactions: trace.transactions.map(jsonClone),
  utxos: Object.fromEntries(
    Object.entries(trace.utxos)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, utxo]) => [key, jsonClone(utxo)]),
  ),
  edges: sortedEdges(trace.edges),
  warnings: trace.warnings.map(jsonClone),
  aliases: {
    assets: sortRecord(trace.aliases.assets),
    addresses: sortRecord(trace.aliases.addresses),
  },
});

const sortRecord = (record: Record<string, string>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(record).sort(([left], [right]) => left.localeCompare(right)),
  );

const jsonClone = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;
