import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Slot = number;

export type Label = number;
/** Hex */
export type TransactionWitnesses = string;
/** Bech32 */
export type PrivateKey = string;
/** Bech32 */
export type PublicKey = string;
/** Hex */
export type ScriptRef = string;

/** JSON object */
// deno-lint-ignore no-explicit-any
export type Json = any;

/** Time in milliseconds */
export type UnixTime = number;

/**
 * Represents a cardano-cli JSON script syntax
 *
 * Native type follows the standard described in the
 * {@link https://github.com/IntersectMBO/cardano-node/blob/1.26.1-with-cardano-cli/doc/reference/simple-scripts.md#json-script-syntax JSON script syntax documentation}.
 */
export type Native =
  | { type: "sig"; keyHash: string }
  | { type: "before"; slot: number }
  | { type: "after"; slot: number }
  | { type: "all"; scripts: ReadonlyArray<Native> }
  | { type: "any"; scripts: ReadonlyArray<Native> }
  | { type: "atLeast"; required: number; scripts: ReadonlyArray<Native> };

export type SlotConfig = {
  zeroTime: UnixTime;
  zeroSlot: Slot;
  slotLength: number; // number of milliseconds.
};

export type Exact<T> = T extends infer U ? U : never;

export type Metadata = {
  222: {
    name: string;
    image: string;
    mediaType?: string;
    description?: string;
    files?: {
      name?: string;
      mediaType: string;
      src: string;
    }[];
    [key: string]: Json;
  };
  333: {
    name: string;
    description: string;
    ticker?: string;
    url?: string;
    logo?: string;
    decimals?: number;
    [key: string]: Json;
  };
  444: Metadata["222"] & { decimals?: number };
};

export type DatumJson = {
  int?: number;
  bytes?: string;
  list?: Array<DatumJson>;
  map?: Array<{ k: unknown; v: unknown }>;
  fields?: Array<DatumJson>;
  [constructor: string]: unknown; // number; constructor needs to be simulated like this as optional argument
};

export type Anchor = {
  url: string;
  dataHash: string;
};

export type AlwaysAbstain = {
  __typename: "AlwaysAbstain";
};

export type AlwaysNoConfidence = {
  __typename: "AlwaysNoConfidence";
};

export type DRep = Credential | AlwaysAbstain | AlwaysNoConfidence;

export const isDRepCredential = (deleg: DRep): deleg is Credential =>
  !("__typename" in deleg);

export const isDRepAlwaysAbstain = (deleg: DRep): deleg is AlwaysAbstain =>
  !isDRepCredential(deleg) && deleg.__typename === "AlwaysAbstain";

export const isDRepAlwaysNoConfidence = (
  deleg: DRep,
): deleg is AlwaysNoConfidence =>
  !isDRepCredential(deleg) && deleg.__typename === "AlwaysNoConfidence";
