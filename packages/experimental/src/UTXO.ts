import * as Address from "./Address_old.js";
import * as Assets from "./Assets.js";
import * as Datum from "./Datum.js";
import * as Script from "./Script.js";
import * as OutRef from "./OutRef.js";

export type UTxO = OutRef.OutRef & TxOutput;

export type TxOutput = {
  address: Address.Address;
  assets: Assets.Assets;
  datumHash?: Datum.DatumHash | null;
  datum?: Datum.Datum | null;
  scriptRef?: Script.Script | null;
};
