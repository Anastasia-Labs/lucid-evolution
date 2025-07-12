import { Json, Provider, UTxO, Unit } from "@evolution-sdk/core-types";
import { fromUnit, toUnit } from "@evolution-sdk/utils";
import { Constr, Data } from "@evolution-sdk/plutus";

export const datumOf = async <T = Data>(
  provider: Provider,
  utxo: UTxO,
  type?: T,
): Promise<T> => {
  if (!utxo.datum) {
    if (!utxo.datumHash) {
      throw new Error("This UTxO does not have a datum hash.");
    }
    utxo.datum = await provider.getDatum(utxo.datumHash);
  }
  return Data.from<T>(utxo.datum, type);
};

/** Query CIP-0068 metadata for a specifc asset. */
export const metadataOf = async <T = Json>(
  provider: Provider,
  unit: Unit,
): Promise<T> => {
  const { policyId, name, label } = fromUnit(unit);
  switch (label) {
    case 222:
    case 333:
    case 444: {
      const utxo = await provider.getUtxoByUnit(toUnit(policyId, name, 100));
      const metadata = (await datumOf(provider, utxo)) as Constr<Data>;
      return Data.toJson(metadata.fields[0]);
    }
    default:
      throw new Error("No variant matched.");
  }
};
