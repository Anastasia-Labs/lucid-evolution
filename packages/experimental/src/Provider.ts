import * as ProtocolParameters from "./ProtocolParameters.js";
import * as Address from "./Address.js";
import * as UTXO from "./UTXO.js";
import * as OutRef from "./OutRef.js";
import * as Delegation from "./Delegation.js";
import * as Datum from "./Datum.js";
import * as Assets from "./Assets.js";
import * as Transaction from "./Transaction.js";
import * as EvalRedeemer from "./EvalRedeemer.js";

export interface Provider {
  getProtocolParameters(): Promise<ProtocolParameters.ProtocolParameters>;
  /** Query UTxOs by address or payment credential. */
  getUtxos(
    addressOrCredential: Address.Address | Credential
  ): Promise<UTXO.UTxO[]>;
  /** Query UTxOs by address or payment credential filtered by a specific unit. */
  getUtxosWithUnit(
    addressOrCredential: Address.Address | Credential,
    unit: Assets.Unit
  ): Promise<UTXO.UTxO[]>;
  /** Query a UTxO by a unit. It needs to be an NFT (or optionally the entire supply in one UTxO). */
  getUtxoByUnit(unit: Assets.Unit): Promise<UTXO.UTxO>;
  /** Query UTxOs by the output reference (tx hash and index). */
  getUtxosByOutRef(outRefs: Array<OutRef.OutRef>): Promise<UTXO.UTxO[]>;
  getDelegation(
    rewardAddress: Address.RewardAddress
  ): Promise<Delegation.Delegation>;
  getDatum(datumHash: Datum.DatumHash): Promise<Datum.Datum>;
  awaitTx(txHash: OutRef.TxHash, checkInterval?: number): Promise<boolean>;
  submitTx(tx: Transaction.Transaction): Promise<OutRef.TxHash>;
  evaluateTx(
    tx: Transaction.Transaction,
    additionalUTxOs?: UTXO.UTxO[]
  ): Promise<EvalRedeemer.EvalRedeemer[]>;
}
