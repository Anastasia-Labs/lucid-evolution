import * as Datum from "./Datum.js";
import * as Script from "./Script.js";
/**
 * **hash** adds the datum hash to the output.
 *
 * **asHash** hashes the datum and adds the datum hash to the output and the datum to the witness set.
 *
 * **inline** adds the datum to the output.
 *
 * **scriptRef** will add any script to the output.
 *
 * You can either specify **hash**, **asHash** or **inline**, only one option is allowed.
 */
export type OutputData = {
  hash?: Datum.DatumHash;
  asHash?: Datum.Datum;
  inline?: Datum.Datum;
  scriptRef?: Script.Script;
};
