import { CML, makeReturn } from "../core.js";
import { LucidConfig } from "../evolution-sdk/LucidEvolution.js";
import { Effect } from "effect";
import * as S from "@effect/schema/Schema";
//TODO: move to commont utils
import {
  PrivateKey,
  TransactionWitnesses,
  Wallet,
} from "@evolution-sdk/core-types";
import { TransactionSignError } from "../Errors.js";
import { TxSigned } from "../tx-submit/TxSubmit.js";
import * as CompleteTxSigner from "./internal/CompleteTxSigner.js";
import { Either } from "effect/Either";
import * as Sign from "./internal/Sign.js";
import { CBORHex, Hash } from "../tx-builder/types.js";

export interface TxSignBuilderConfig {
  txComplete: CML.Transaction;
  witnessSetBuilder: CML.TransactionWitnessSetBuilder;
  programs: Effect.Effect<void, TransactionSignError, never>[];
  wallet: Wallet | undefined;
  fee: number;
  exUnits: { cpu: number; mem: number } | null;
}

export interface TxSignBuilder {
  sign: {
    /** Signs the transaction with a wallet. */
    withWallet: () => TxSignBuilder;
    /** Signs the transaction with a private key. */
    withPrivateKey: (privateKey: PrivateKey) => TxSignBuilder;
  };
  partialSign: {
    /** Partially signs the transaction with a wallet. */
    withWallet: () => Promise<TransactionWitnesses>;
    /** Partially signs the transaction with a wallet and returns an effect. */
    withWalletEffect: () => Effect.Effect<
      TransactionWitnesses,
      TransactionSignError
    >;
    /** Safely partially signs the transaction with a wallet. */
    withWalletSafe: () => Promise<
      Either<TransactionWitnesses, TransactionSignError>
    >;
    /** Partially signs the transaction with a private key. */
    withPrivateKey: (privateKey: PrivateKey) => Promise<TransactionWitnesses>;
    /** Partially signs the transaction with a private key and returns an effect. */
    withPrivateKeyEffect: (
      privateKey: PrivateKey,
    ) => Effect.Effect<TransactionWitnesses, TransactionSignError>;
    /** Safely partially signs the transaction with a private key. */
    withPrivateKeySafe: (
      privateKey: PrivateKey,
    ) => Promise<Either<TransactionWitnesses, TransactionSignError>>;
  };
  /** Assembles the transaction with the given witnesses.  */
  assemble: (witnesses: TransactionWitnesses[]) => TxSignBuilder;
  /**
   * Converts the transaction to CBOR (Concise Binary Object Representation) format.
   *
   * Supports both canonical and non-canonical formats.
   *
   * Canonical format follows [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) rules
   *
   * Non-canonical format example:
   * ```typescript
   * .toCBOR();
   * ```
   * Canonical format example:
   * ```typescript
   * .toCBOR({ canonical: true });
   * ```
   */
  toCBOR: (options?: { canonical: boolean }) => CBORHex;
  toTransaction: () => CML.Transaction;
  /** Converts the transaction body to JSON format. */
  toJSON: () => object;
  /** Computes the hash of the transaction body. */
  toHash: () => Hash;
  complete: () => Promise<TxSigned>;
  /** Completes the transaction and returns an effect. */
  completeProgram: () => Effect.Effect<TxSigned, TransactionSignError, never>;
  /** Safely completes the transaction. */
  completeSafe: () => Promise<Either<TxSigned, TransactionSignError>>;
}

export const makeTxSignBuilder = (
  wallet: Wallet | undefined,
  tx: CML.Transaction,
): TxSignBuilder => {
  const redeemers = tx.witness_set().redeemers();
  const exUnits = { cpu: 0, mem: 0 };
  if (redeemers) {
    const arrLegacyRedeemer = redeemers?.as_arr_legacy_redeemer();
    if (arrLegacyRedeemer) {
      for (let i = 0; i < arrLegacyRedeemer.len(); i++) {
        const redeemer = arrLegacyRedeemer.get(i);
        exUnits.cpu += parseInt(redeemer.ex_units().steps().toString());
        exUnits.mem += parseInt(redeemer.ex_units().mem().toString());
      }
    }
    const mapRedeemerKeyToRedeemerVal =
      redeemers?.as_map_redeemer_key_to_redeemer_val();
    if (mapRedeemerKeyToRedeemerVal) {
      const keys = mapRedeemerKeyToRedeemerVal.keys();
      for (let i = 0; i < (keys.len() || 0); i++) {
        const key = keys.get(i);
        const value = mapRedeemerKeyToRedeemerVal.get(key);
        exUnits.cpu += parseInt(value!.ex_units().steps().toString());
        exUnits.mem += parseInt(value!.ex_units().mem().toString());
      }
    }
  }
  const config: TxSignBuilderConfig = {
    txComplete: tx,
    witnessSetBuilder: CML.TransactionWitnessSetBuilder.new(),
    programs: [],
    wallet: wallet,
    fee: parseInt(tx.body().fee().toString()),
    exUnits: exUnits,
  };

  const txSignBuilder: TxSignBuilder = {
    sign: {
      withWallet: () => {
        const program = Sign.withWallet(config);
        config.programs.push(program);
        return txSignBuilder;
      },
      withPrivateKey: (privateKey: PrivateKey) => {
        const program = Sign.withPrivateKey(config, privateKey);
        config.programs.push(program);
        return txSignBuilder;
      },
    },
    partialSign: {
      withWallet: () => makeReturn(Sign.partialWithWallet(config)).unsafeRun(),
      withWalletEffect: () => Sign.partialWithWallet(config),
      withWalletSafe: () =>
        makeReturn(Sign.partialWithWallet(config)).safeRun(),
      withPrivateKey: (privateKey: PrivateKey) =>
        makeReturn(Sign.partialWithPrivateKey(config, privateKey)).unsafeRun(),
      withPrivateKeyEffect: (privateKey: PrivateKey) =>
        Sign.partialWithPrivateKey(config, privateKey),
      withPrivateKeySafe: (privateKey: PrivateKey) =>
        makeReturn(Sign.partialWithPrivateKey(config, privateKey)).safeRun(),
    },
    assemble: (witnesses: TransactionWitnesses[]) => {
      const program = Sign.assemble(config, witnesses);
      config.programs.push(program);
      return txSignBuilder;
    },
    toCBOR: (options = { canonical: false }) =>
      options.canonical
        ? config.txComplete.to_canonical_cbor_hex()
        : config.txComplete.to_cbor_hex(),
    toTransaction: () => config.txComplete,
    toJSON: () =>
      S.decodeUnknownSync(S.parseJson(S.Object))(config.txComplete.to_json()),
    toHash: () => CML.hash_transaction(config.txComplete.body()).to_hex(),
    complete: () =>
      makeReturn(CompleteTxSigner.completeTxSigner(config)).unsafeRun(),
    completeProgram: () => CompleteTxSigner.completeTxSigner(config),
    completeSafe: () =>
      makeReturn(CompleteTxSigner.completeTxSigner(config)).safeRun(),
  };
  return txSignBuilder;
};
