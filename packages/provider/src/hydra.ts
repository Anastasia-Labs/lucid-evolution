import type {
  Address,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  Network,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "@lucid-evolution/core-types";
import { credentialToAddress } from "@lucid-evolution/utils";
import { Node } from "./internal/hydra.js";
import { CML } from "./core.js";

export class Hydra implements Provider {
  private readonly _node: Node;
  private readonly _network: Network;

  constructor(url: string, network?: Network) {
    this._node = new Node(url);
    this._node.connect();
    this._network = network ?? "Preprod";
  }

  getProtocolParameters(): Promise<ProtocolParameters> {
    return this._node.protocolParameters();
  }

  async getUtxos(
    addressOrCredential: Address | Credential
  ): Promise<Array<UTxO>> {
    let address: Address;

    if (typeof addressOrCredential === "string") {
      address = addressOrCredential;
    } else {
      address = credentialToAddress(this._network, addressOrCredential);
    }

    return (await this._node.snapshotUTxO()).filter(
      (utxo) => utxo.address === address
    );
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit
  ): Promise<Array<UTxO>> {
    let address: Address;

    if (typeof addressOrCredential === "string") {
      address = addressOrCredential;
    } else {
      address = credentialToAddress(this._network, addressOrCredential);
    }

    return (await this._node.snapshotUTxO()).filter(
      (utxo) =>
        utxo.address === address && Object.keys(utxo.assets).includes(unit)
    );
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const utxo = (await this._node.snapshotUTxO()).filter((utxo) =>
      Object.keys(utxo.assets).includes(unit)
    );

    if (utxo === undefined) {
      throw new Error("UTxO with unit not found");
    } else if (utxo.length > 1) {
      throw new Error("Unit need to be a NFT");
    }

    return utxo[0];
  }

  async getUtxosByOutRef(outRefs: Array<OutRef>): Promise<Array<UTxO>> {
    return (await this._node.snapshotUTxO()).filter((utxo) =>
      outRefs.some(
        (outRef) =>
          utxo.txHash === outRef.txHash &&
          utxo.outputIndex === outRef.outputIndex
      )
    );
  }

  getDelegation(_rewardAddress: RewardAddress): Promise<Delegation> {
    throw new Error("Method not implemented.");
  }

  getDatum(_datumHash: DatumHash): Promise<Datum> {
    throw new Error("Method not implemented.");
  }

  awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean> {
    return this._node.awaitTx(txHash, checkInterval);
  }

  submitTx(tx: Transaction): Promise<TxHash> {
    return this._node.newTx({
      cborHex: tx,
      description: "",
      type: "Tx ConwayEra",
    });
  }

  evaluateTx(
    _tx: Transaction,
    _additionalUTxOs?: Array<UTxO>
  ): Promise<Array<EvalRedeemer>> {
    throw new Error("Method not implemented.");
  }

  status(): Status {
    return this._node.status;
  }

  initialize(): Promise<void> {
    return this._node.init();
  }

  async commit(utxos: Array<UTxO> = [], blueprintTx?: string) {
    return (await this._node.commit(utxos, blueprintTx)).cborHex as Transaction;
  }

  async submitL1Transaction(tx: Transaction): Promise<TxHash> {
    await this._node.cardanoTransaction({
      description: "",
      type: "Tx ConwayEra",
      cborHex: tx,
    });

    const transaction = CML.Transaction.from_cbor_hex(tx);
    return CML.hash_transaction(transaction.body()).to_hex();
  }

  async close() {
    return this._node.close();
  }

  async fanout() {
    return this._node.fanout();
  }
}

const STATUS = {
  IDLE: "IDLE",
  DISCONNECTED: "DISCONNECTED",
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  INITIALIZING: "INITIALIZING",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  FANOUT_POSSIBLE: "FANOUT_POSSIBLE",
  FINAL: "FINAL",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
