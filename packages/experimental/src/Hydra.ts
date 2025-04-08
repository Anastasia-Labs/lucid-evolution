
import {
  type ProtocolParameters,
  type UTxO,
} from "@lucid-evolution/core-types";
import * as CML  from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { EventEmitter } from "node:events";
import { WebSocket } from "ws";
import { Status } from "./Provider/Hydra.js";

type TransactionRequest = {
  type: string;
  description: string;
  cborHex: string;
  txId?: string;
};

export class Node extends EventEmitter {
  private readonly _url: string;
  private _status: Status;
  private readonly connection: Connection;
  private readonly txCircularBuffer: CircularBuffer<string>;

  constructor(url: string) {
    super();
    this._url = url;
    this._status = "DISCONNECTED";
    this.connection = new Connection(
      this._url + "?history=no&snapshot-utxo=no"
    );
    this.connection.on("message", (data) => this.processStatus(data));
    this.connection.on("message", (data) => this.processConfirmedTx(data));
    this.connection.on("close", (_) => (this._status = "DISCONNECTED"));
    this.txCircularBuffer = new CircularBuffer(1000);
  }

  async connect() {
    if (this._status === "DISCONNECTED") {
      this._status = "CONNECTING";
      await this.connection.connect();
    }
  }

  private async processStatus(data: string) {
    const message = JSON.parse(data);
    function getStatus(data: any): Status | null {
      if (data.headStatus !== undefined) {
        return (data.headStatus as string).toUpperCase() as Status;
      }

      switch (data.tag) {
        case "Greetings":
          return (data.headStatus as string).toUpperCase() as Status;
        case "HeadIsInitializing":
          return "INITIALIZING";
        case "HeadIsOpen":
          return "OPEN";
        case "HeadIsClosed":
          return "CLOSED";
        case "ReadyToFanout":
          return "FANOUT_POSSIBLE";
        case "HeadIsFinalized":
          return "FINAL";
        default:
          return null;
      }
    }

    let status: Status | null = null;
    if (
      (status = getStatus(message)) &&
      status !== null &&
      status !== this._status
    ) {
      this._status = status;
      this.emit("status", status);
    }
  }

  private async processConfirmedTx(data: string) {
    const message = JSON.parse(data);

    if (message.tag === "SnapshotConfirmed") {
      if (message.snapshot.confirmedTransactions !== undefined) {
        message.snapshot.confirmedTransactions.forEach((tx: string) => {
          this.txCircularBuffer.add(tx);
        });
      } else if (message.snapshot.confirmed !== undefined) {
        message.snapshot.confirmed.forEach((tx: TransactionRequest) => {
          this.txCircularBuffer.add(tx.txId!);
        });
      } else {
        throw new Error("Invalid snapshot message message");
      }
    }
  }

  async init() {
    this.connection.send(JSON.stringify({ tag: "Init" }));

    return new Promise<void>((resolve, reject) => {
      const resolveCallback = (data: string) => {
        const rejectCb = (reason?: any) => {
          this.connection.removeListener("message", resolveCallback);
          reject(reason);
        };

        const message = this.handleWsResponse(data, "Init", rejectCb);
        if (message.tag === "HeadIsInitializing") {
          this.connection.removeListener("message", resolveCallback);
          resolve();
        }
      };

      this.connection.on("message", resolveCallback);
    });
  }

  async commit(utxos: Array<UTxO> = [], blueprintTx?: string) {
    let bodyRequest: string;

    if (blueprintTx !== undefined) {
      bodyRequest = JSON.stringify({
        blueprintTx: {
          cborHex: blueprintTx,
          description: "",
          type: "Tx ConwayEra",
        },
        utxo: utxos.reduce(
          (acc, u) => {
            acc[u.txHash + "#" + u.outputIndex] = {
              address: u.address,
              datum: u.datum ?? null,
              datumhash: u.datumHash ?? null,
              inlineDatum: null,
              inlineDatumRaw: null,
              referenceScript: null,
              value: Object.keys(u.assets).reduce(
                (acc, key) => {
                  if (key == "lovelace")
                    acc[key] = Number(u.assets[key].valueOf());
                  else {
                    const policyId = key.slice(0, 56);
                    const assetName = key.slice(56);
                    if (!acc[policyId]) acc[policyId] = {};
                    (acc[policyId] as Record<string, number>)[assetName] =
                      Number(u.assets[key].valueOf());
                  }
                  return acc;
                },
                {} as Record<string, number | Record<string, number>>
              ),
            };
            return acc;
          },
          {} as Record<string, any>
        ),
      });
    } else {
      bodyRequest = JSON.stringify(
        utxos.reduce(
          (acc, u) => {
            acc[u.txHash + "#" + u.outputIndex] = {
              address: u.address,
              datum: u.datum,
              datumHash: u.datumHash,
              inlineDatum: u.datum,
              value: Object.keys(u.assets).reduce(
                (acc, key) => {
                  if (key == "lovelace")
                    acc[key] = Number(u.assets[key].valueOf());
                  else {
                    const policyId = key.slice(0, 56);
                    const assetName = key.slice(56);
                    if (!acc[policyId]) acc[policyId] = {};
                    (acc[policyId] as Record<string, number>)[assetName] =
                      Number(u.assets[key].valueOf());
                  }
                  return acc;
                },
                {} as Record<string, number | Record<string, number>>
              ),
            };
            return acc;
          },
          {} as Record<string, any>
        )
      );
    }

    const body = await fetch(this._url.replace("ws", "http") + "/commit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyRequest,
    });

    return (await this.handleHttpResponse(body)) as TransactionRequest;
  }

  async cardanoTransaction(transaction: TransactionRequest) {
    const body = await fetch(
      this._url.replace("ws", "http") + "/cardano-transaction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      }
    );

    return await this.handleHttpResponse(body);
  }

  async snapshotUTxO() {
    const body = await fetch(
      this._url.replace("ws", "http") + "/snapshot/utxo",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await this.handleHttpResponse(body);

    return Object.keys(response).map((key) => {
      const utxo: UTxO = {
        txHash: key.split("#")[0],
        outputIndex: Number(key.split("#")[1]),
        address: response[key].address,
        datum: response[key].datum,
        datumHash: response[key].datumHash,
        assets: Object.keys(response[key].value).reduce(
          (acc, assetKey) => {
            if (assetKey === "lovelace") {
              acc[assetKey] = BigInt(response[key].value[assetKey]);
            } else {
              const tokens = response[key].value[assetKey];
              Object.keys(tokens).forEach((tokenKey) => {
                acc[assetKey + tokenKey] = BigInt(tokens[tokenKey]);
              });
            }
            return acc;
          },
          {} as Record<string, bigint>
        ),
      };
      return utxo;
    });
  }

  async protocolParameters() {
    const body = await fetch(
      this._url.replace("ws", "http") + "/protocol-parameters",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await this.handleHttpResponse(body);

    const parameters: ProtocolParameters = {
      minFeeA: response.txFeePerByte,
      minFeeB: response.txFeeFixed,
      maxTxSize: response.maxTxSize,
      maxValSize: response.maxValueSize,
      keyDeposit: BigInt(response.stakeAddressDeposit),
      poolDeposit: BigInt(response.stakePoolDeposit),
      drepDeposit: BigInt(response.dRepDeposit),
      govActionDeposit: BigInt(response.govActionDeposit),
      priceMem: response.executionUnitPrices.priceMemory,
      priceStep: response.executionUnitPrices.priceSteps,
      maxTxExMem: BigInt(response.maxTxExecutionUnits.memory),
      maxTxExSteps: BigInt(response.maxTxExecutionUnits.steps),
      coinsPerUtxoByte: BigInt(response.utxoCostPerByte),
      collateralPercentage: response.collateralPercentage,
      maxCollateralInputs: response.maxCollateralInputs,
      minFeeRefScriptCostPerByte: response.minFeeRefScriptCostPerByte,
      costModels: {
        PlutusV1: Object.fromEntries(
          response.costModels.PlutusV1.map((v: number, i: number) => [
            i.toString(),
            v,
          ])
        ),
        PlutusV2: Object.fromEntries(
          response.costModels.PlutusV2.map((v: number, i: number) => [
            i.toString(),
            v,
          ])
        ),
        PlutusV3: Object.fromEntries(
          response.costModels.PlutusV3.map((v: number, i: number) => [
            i.toString(),
            v,
          ])
        ),
      },
    };

    return parameters;
  }

  async newTx(transaction: TransactionRequest) {
    this.connection.send(JSON.stringify({ tag: "NewTx", transaction }));

    const transactionHash = CML.hash_transaction(
      CML.Transaction.from_cbor_hex(transaction.cborHex).body()
    ).to_hex();

    return new Promise<string>((resolve, reject) => {
      const resolveCallback = (data: string) => {
        const rejectCb = (reason?: any) => {
          this.connection.removeListener("message", resolveCallback);
          reject(reason);
        };

        const message = this.handleWsResponse(
          data,
          "NewTx",
          rejectCb,
          transactionHash
        );
        if (
          message.tag === "TxValid" &&
          message.transaction.txId === transactionHash
        ) {
          this.connection.removeListener("message", resolveCallback);
          resolve(transactionHash);
        } else if (
          message.tag === "TxInvalid" &&
          message.transaction.txId === transactionHash
        ) {
          this.connection.removeListener("message", resolveCallback);
          reject(new Error("Transaction is invalid"));
        }
      };

      this.connection.on("message", resolveCallback);
    });
  }

  async awaitTx(txHash: string, checkInterval: number = 3000) {
    return new Promise<boolean>((resolve) => {
      const interval = setInterval(async () => {
        if (this.txCircularBuffer.getBuffer().includes(txHash)) {
          resolve(true);
          clearInterval(interval);
        }
      }, checkInterval);
    });
  }

  async close() {
    this.connection.send(JSON.stringify({ tag: "Close" }));

    return new Promise<void>((resolve, reject) => {
      const interval = setInterval(
        () => this.connection.send(JSON.stringify({ tag: "Close" })),
        60000
      );
      const resolveCallback = (data: string) => {
        const rejectCb = (reason?: any) => {
          this.connection.removeListener("message", resolveCallback);
          clearInterval(interval);
          reject(reason);
        };

        const message = this.handleWsResponse(data, "Close", rejectCb);
        if (message.tag === "HeadIsClosed") {
          this.connection.removeListener("message", resolveCallback);
          clearInterval(interval);
          resolve();
        }
      };

      this.connection.on("message", resolveCallback);
    });
  }

  async fanout() {
    this.connection.send(JSON.stringify({ tag: "Fanout" }));

    return new Promise<void>((resolve, reject) => {
      const resolveCallback = (data: string) => {
        const rejectCb = (reason?: any) => {
          this.connection.removeListener("message", resolveCallback);
          reject(reason);
        };

        const message = this.handleWsResponse(
          data,
          "Fanout",
          rejectCb,
          "Fanout"
        );
        if (message.tag === "HeadIsFinalized") {
          this.connection.removeListener("message", resolveCallback);
          resolve();
        }
      };

      this.connection.on("message", resolveCallback);
    });
  }

  get status() {
    return this._status;
  }

  get url() {
    return this._url;
  }

  private async handleHttpResponse(response: Response) {
    const responseText = await response.text();
    try {
      return JSON.parse(responseText);
    } catch (e) {
      if (e instanceof Error && e.name === "SyntaxError") {
        throw new Error(responseText);
      } else {
        throw e;
      }
    }
  }

  private handleWsResponse(
    message: any,
    command: string,
    reject: (reason?: any) => void,
    ...args: Array<string>
  ) {
    try {
      message = JSON.parse(message);

      if (message.tag === "CommandFailed" && message.clientInput) {
        if (
          command === "NewTx" &&
          message.clientInput.tag === "NewTx" &&
          message.clientInput.transaction.txId === args[0]
        ) {
          reject(new Error("Error posting transaction with hash " + args[0]));
        } else if (message.clientInput.tag === command) {
          reject(new Error("Command " + command + " failed"));
        }
      } else if (
        message.tag === "PostTxOnChainFailed" &&
        message.postChainTx.tag === command + "Tx"
      ) {
        reject(
          new Error(
            `Error posting transaction for command ${command}./n Error:/n ${JSON.stringify(message.postTxError, null, 2)}`
          )
        );
      }

      return message;
    } catch (e) {
      if (e instanceof Error && e.name === "SyntaxError") {
        reject(new Error(message));
      } else {
        reject(e);
      }
    }
  }
}

class Connection extends EventEmitter {
  private readonly url: string;
  private status: Status;
  private websocket: WebSocket | undefined;

  constructor(url: string) {
    super();
    this.url = url;
    this.status = "DISCONNECTED";
    this.setMaxListeners(10000);
  }

  async connect() {
    if (this.status !== "DISCONNECTED") {
      return;
    }

    this.websocket = new WebSocket(this.url.replace("http", "ws"));
    this.status = "CONNECTING";

    const timeout = setTimeout(() => {
      if (this.status === "CONNECTING") {
        this.status = "DISCONNECTED";
        this.onClose(new Error("Connection timeout"));
      }
    }, 5000);

    this.websocket.on("open", () => {
      this.status = "CONNECTED";
      clearInterval(timeout);
    });

    this.websocket.on("message", (data) => {
      this.emit("message", data.toString());
    });

    this.websocket.on("error", (error) => {
      if (this.listeners("error").length > 0) {
        this.emit("error", error);
      }
    });

    this.websocket.on("close", (code) => {
      this.status = "DISCONNECTED";
      if (code === 1006) {
        this.onClose(new Error("Connection closed unexpectedly"));
      }
    });
  }

  async onClose(error: Error) {
    if (this.status === "IDLE") {
      return;
    }

    if (this.status === "CONNECTED") {
      this.status = "CONNECTING";
      this.emit("close", error);
    }

    await setTimeout(() => {
      this.connect();
    }, 1000);
  }

  async disconnect() {
    if (this.status === "DISCONNECTED") {
      return;
    }

    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.close(1007);
    }
    this.status = "DISCONNECTED";
  }

  isOpen(): boolean {
    return this.status === "CONNECTED";
  }

  send(data: string): void {
    // Wait until the socket is connected
    if (this.websocket && this.websocket.readyState === WebSocket.CONNECTING) {
      this.websocket.on("open", () => {
        this.websocket?.send(data);
      });
    } else if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(data);
    }
  }
}

class CircularBuffer<T> {
  private buffer: Array<T>;
  private length: number;
  private pointer: number;

  constructor(length: number) {
    this.buffer = Array(length);
    this.length = length;
    this.pointer = 0;
  }

  add(element: T) {
    this.buffer[(this.pointer = (this.pointer + 1) % this.length)] = element;
  }
  getBuffer() {
    return this.buffer;
  }
}
