import type {
  Credential,
  DatumHash,
  ScriptType,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import type {
  TraceTransaction,
  TraceUtxo,
  TxGraphTrace,
} from "./model.js";
import { outRefKey } from "./resolve.js";

export type TxGraphTaggerContext = {
  readonly utxo: TraceUtxo;
  readonly direction: "input" | "output";
  readonly transaction: TraceTransaction;
  readonly graph: TxGraphTrace;
};

export type TxGraphTagger = (
  context: TxGraphTaggerContext,
) => string | ReadonlyArray<string> | undefined;

export const tagByAddress =
  (label: string, address: string): TxGraphTagger =>
  ({ utxo }) =>
    utxo.address === address ? label : undefined;

export const tagByCredential =
  (label: string, credential: Credential): TxGraphTagger =>
  ({ utxo }) =>
    credentialEquals(utxo.paymentCredential, credential) ||
    credentialEquals(utxo.stakeCredential, credential)
      ? label
      : undefined;

export const tagByUnit =
  (label: string, unit: Unit | "lovelace"): TxGraphTagger =>
  ({ utxo }) =>
    Object.hasOwn(utxo.assets, unit) ? label : undefined;

export const tagByPolicyId =
  (label: string, policyId: string): TxGraphTagger =>
  ({ utxo }) =>
    Object.keys(utxo.assets).some(
      (unit) => unit !== "lovelace" && unit.startsWith(policyId),
    )
      ? label
      : undefined;

export const tagByDatumHash =
  (label: string, datumHash: DatumHash): TxGraphTagger =>
  ({ utxo }) =>
    utxo.datumHash === datumHash ? label : undefined;

export const tagByDatum =
  (
    label: string,
    predicate: (datum: string, context: TxGraphTaggerContext) => boolean,
  ): TxGraphTagger =>
  (context) =>
    context.utxo.datum && predicate(context.utxo.datum, context)
      ? label
      : undefined;

export type TagByScriptRefOptions = {
  readonly type?: ScriptType;
  readonly hash?: string;
};

export const tagByScriptRef =
  (
    label: string,
    options: TagByScriptRefOptions = {},
  ): TxGraphTagger =>
  ({ utxo }) => {
    if (!utxo.scriptRef) return undefined;
    if (options.type && utxo.scriptRef.type !== options.type) {
      return undefined;
    }
    if (options.hash && utxo.scriptRef.hash !== options.hash) {
      return undefined;
    }
    return label;
  };

export type TagChangeOptions = {
  readonly changeAddress?: string;
  readonly walletAddress?: string;
  readonly knownWalletUtxos?: ReadonlyArray<UTxO>;
};

export const tagChange = (
  label: string,
  options: TagChangeOptions,
): TxGraphTagger => {
  const addresses = new Set(
    [options.changeAddress, options.walletAddress].filter(
      (address): address is string => typeof address === "string",
    ),
  );
  for (const utxo of options.knownWalletUtxos ?? []) {
    addresses.add(utxo.address);
  }
  const knownOutRefs = new Set(
    (options.knownWalletUtxos ?? []).map((utxo) => outRefKey(utxo)),
  );

  return ({ direction, utxo }) => {
    if (direction === "output" && addresses.has(utxo.address)) return label;
    if (direction === "input" && knownOutRefs.has(outRefKey(utxo))) {
      return label;
    }
    return undefined;
  };
};

const credentialEquals = (
  left: Credential | undefined,
  right: Credential,
): boolean => left?.type === right.type && left.hash === right.hash;
