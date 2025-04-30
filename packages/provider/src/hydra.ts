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
import { Hydra as HydraNode } from "@lucid-evolution/experimental";

export class Hydra implements Provider {
  private readonly _node: HydraNode.Node;
  private readonly _network: Network;

  constructor(url: string, network?: Network) {
    this._node = new HydraNode.Node(url);
    this._node.connect();
    this._network = network ?? "Preprod";
  }

  getProtocolParameters(): Promise<ProtocolParameters> {
    return this._node.protocolParameters();
  }

  async getUtxos(
    addressOrCredential: Address | Credential,
  ): Promise<Array<UTxO>> {
    let address: Address;

    if (typeof addressOrCredential === "string") {
      address = addressOrCredential;
    } else {
      address = credentialToAddress(this._network, addressOrCredential);
    }

    return (await this._node.snapshotUTxO()).filter(
      (utxo) => utxo.address === address,
    );
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<Array<UTxO>> {
    let address: Address;

    if (typeof addressOrCredential === "string") {
      address = addressOrCredential;
    } else {
      address = credentialToAddress(this._network, addressOrCredential);
    }

    return (await this._node.snapshotUTxO()).filter(
      (utxo) =>
        utxo.address === address && Object.keys(utxo.assets).includes(unit),
    );
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const utxo = (await this._node.snapshotUTxO()).filter((utxo) =>
      Object.keys(utxo.assets).includes(unit),
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
          utxo.outputIndex === outRef.outputIndex,
      ),
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
    _additionalUTxOs?: Array<UTxO>,
  ): Promise<Array<EvalRedeemer>> {
    throw new Error("Method not implemented.");
  }
}
