import { Effect } from "effect";
import { User } from "../service/EmulatorUser.js";
import {
  getAddressDetails,
  mintingPolicyToId,
  toUnit,
  validatorToAddress,
} from "@evolution-sdk/utils";
import { Script } from "@evolution-sdk/core-types";
import { Constr, Data } from "@evolution-sdk/plutus";
import { HelloContract } from "../../specs/services.js";

export const composeWithDatumHashAndInlineDatum = (config: {
  script: Script;
}) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const scriptAddress = validatorToAddress("Custom", config.script);
    const txCompA = user
      .newTx()
      .pay.ToContract(
        scriptAddress,
        { kind: "asHash", value: Data.to("31313131") },
        { lovelace: 5000000n },
      );
    const txCompB = user
      .newTx()
      .pay.ToContract(
        scriptAddress,
        { kind: "inline", value: Data.to("31313131") },
        { lovelace: 5000000n },
      );
    const signBuilder = yield* txCompA.compose(txCompB).completeProgram();
    return signBuilder;
  });

export const sendAllFund = Effect.gen(function* () {
  const { user } = yield* User;
  const address = yield* Effect.promise(() => user.wallet().address());
  const { paymentCredential } = getAddressDetails(address);
  const { hash } = yield* Effect.fromNullable(paymentCredential);
  const datum = Data.to(new Constr(0, [hash!]));
  const { contractAddress, hello } = yield* HelloContract;
  const utxos = yield* User.getUtxos;
  let totalFund = 0n;
  for (const utxo of utxos) {
    totalFund += utxo.assets["lovelace"];
  }
  let remaining = 500_000n;

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: totalFund - remaining },
      hello,
    )
    .completeProgram({ includeLeftoverLovelaceAsFee: true });
  return signBuilder;
});

export const multiTxCompose = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});
  const txCompB = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(10n) }, {})
    .compose(
      user
        .newTx()
        .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(1n) }, {})
        .compose(
          user
            .newTx()
            .pay.ToAddressWithData(
              addr,
              { kind: "inline", value: Data.to(2n) },
              {},
            ),
        ),
    );
  const tx = user
    .newTx()
    .compose(txCompA)
    .compose(txCompB)
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(3n) }, {});
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
});

export const mintAndPayTxCompose = Effect.gen(function* () {
  const { user } = yield* User;
  const alwaysSucceedScript: Script = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };
  const alwaysSucceedAddress = validatorToAddress(
    "Custom",
    alwaysSucceedScript,
  );
  const mintedAssetUnit = toUnit(mintingPolicyToId(alwaysSucceedScript), "");
  const mintedAsset = { [mintedAssetUnit]: 1n };

  const baseTx = user
    .newTx()
    .attach.MintingPolicy(alwaysSucceedScript)
    .mintAssets(mintedAsset, Data.void())
    .pay.ToContract(
      alwaysSucceedAddress,
      { kind: "inline", value: Data.void() },
      mintedAsset,
    );
  return yield* user.newTx().compose(baseTx).completeProgram();
});
