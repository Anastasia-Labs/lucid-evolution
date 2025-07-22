import {
  getAddressDetails,
  mintingPolicyToId,
  scriptFromNative,
  stringify,
  toUnit,
  unixTimeToSlot,
  validatorToAddress,
} from "@evolution-sdk/utils";
import { Effect, Context, Layer, pipe, Console } from "effect";
import {
  Data,
  Constr,
  fromText,
  Lucid,
  SpendingValidator,
  applyDoubleCborEncoding,
} from "../../src";
import {
  handleSignSubmit,
  handleSignSubmitWithoutValidation,
  handleSubmit,
  withLogRetry,
} from "../specs/utils";
import { Emulator, generateEmulatorAccount } from "@evolution-sdk/provider";
import { generateEmulatorAccountFrommPrivateKey } from "../../../provider/src";
import scripts from "../specs/contracts/plutus.json";

export const EMULATOR_ACCOUNT = generateEmulatorAccount({
  lovelace: 75000000000n,
});
export const EMULATOR_ACCOUNT_1 = generateEmulatorAccount({
  lovelace: 80000000000n,
});
export const EMULATOR_ACCOUNT_FROM_PRIVATE_KEY =
  await generateEmulatorAccountFrommPrivateKey({ lovelace: 90000000000n });
export const REWARD_AMOUNT = 100000000n;
export const EMULATOR_POOL_ID =
  "pool1nmfr5j5rnqndprtazre802glpc3h865sy50mxdny65kfgf3e5eh";

const alwaysSucceedScript: SpendingValidator = {
  type: "PlutusV2",
  script: "49480100002221200101",
};

export const emulatorFromPrivateKey = await Effect.gen(function* () {
  return new Emulator([EMULATOR_ACCOUNT_FROM_PRIVATE_KEY]);
}).pipe(Effect.runPromise);

export const emulator = await Effect.gen(function* () {
  return new Emulator([EMULATOR_ACCOUNT, EMULATOR_ACCOUNT_1]);
}).pipe(Effect.runPromise);

const makeEmulatorUser = Effect.gen(function* ($) {
  const user = yield* Effect.tryPromise(() => Lucid(emulator, "Custom"));
  user.selectWallet.fromSeed(EMULATOR_ACCOUNT.seedPhrase);
  const userFromPrivateKey = yield* Effect.tryPromise(() =>
    Lucid(emulatorFromPrivateKey, "Custom"),
  );
  userFromPrivateKey.selectWallet.fromPrivateKey(
    EMULATOR_ACCOUNT_FROM_PRIVATE_KEY.privateKey,
  );
  return {
    user,
    emulator,
    emulatorFromPrivateKey,
    userFromPrivateKey,
  };
});

export class EmulatorUser extends Context.Tag("EmulatorUser")<
  EmulatorUser,
  Effect.Effect.Success<typeof makeEmulatorUser>
>() {
  static readonly layer = Layer.effect(EmulatorUser, makeEmulatorUser);
}

export const mintInSlotRange = Effect.gen(function* () {
  const { user, emulator } = yield* EmulatorUser;
  const { paymentCredential } = getAddressDetails(EMULATOR_ACCOUNT.address);
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Custom", emulator.now() + 360000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });

  const policyId = mintingPolicyToId(mintingPolicy);
  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(emulator.now() + 330000)
    .attach.MintingPolicy(mintingPolicy)
    .completeProgram();

  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation));

export const registerStake = Effect.gen(function* () {
  const { user } = yield* EmulatorUser;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmitWithoutValidation),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  withLogRetry,
  Effect.map(() => emulator.awaitBlock()),
  Effect.orDie,
);

export const delegateTo = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .delegateTo(rewardAddress, EMULATOR_POOL_ID)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const deRegisterStake = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );

  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const registerDeregisterStake = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(
  Effect.flatMap(handleSignSubmit),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  withLogRetry,
);

export const withdrawReward = (amount: bigint) =>
  Effect.gen(function* ($) {
    const { user } = yield* EmulatorUser;
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const signBuilder = yield* user
      .newTx()
      .withdraw(rewardAddress, amount)
      .completeProgram();
    return signBuilder;
  }).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const evaluateAContract = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);
  const signBuilder = yield* user
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: Data.void() },
      { lovelace: 5000000n },
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const evaluateAContractWithDatum = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);
  const signBuilder = yield* user
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "asHash", value: Data.to("31313131") },
      { lovelace: 5000000n },
    )
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: Data.to("313131") },
      { lovelace: 5000000n },
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const compose = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);
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
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const multiTxCompose = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
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
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const composeMintTx = Effect.gen(function* ($) {
  const { user, emulator } = yield* EmulatorUser;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

  const { paymentCredential } = getAddressDetails(EMULATOR_ACCOUNT.address);
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Custom", emulator.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });

  const policyId = mintingPolicyToId(mintingPolicy);
  const txCompB = user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(emulator.now() + 30000)
    .attach.MintingPolicy(mintingPolicy);
  const tx = user.newTx().compose(txCompA).compose(txCompB);
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const composeMintAndStake = Effect.gen(function* ($) {
  const { user, emulator } = yield* EmulatorUser;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

  const { paymentCredential } = getAddressDetails(EMULATOR_ACCOUNT.address);
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Custom", emulator.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });

  const policyId = mintingPolicyToId(mintingPolicy);
  const txCompB = user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(emulator.now() + 30000)
    .attach.MintingPolicy(mintingPolicy);
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const txCompC = user.newTx().registerStake(rewardAddress);
  const tx = user.newTx().compose(txCompA).compose(txCompB).compose(txCompC);
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const composeDeregister = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );

  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const multiSigner = Effect.gen(function* ($) {
  const { user, emulator } = yield* EmulatorUser;
  const { paymentCredential } = getAddressDetails(EMULATOR_ACCOUNT.address);
  const { paymentCredential: paymentCredential1 } = getAddressDetails(
    EMULATOR_ACCOUNT_1.address,
  );
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Custom", emulator.now() + 90000000000000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
      { type: "sig", keyHash: paymentCredential1?.hash! },
    ],
  });
  const policyId = mintingPolicyToId(mintingPolicy);
  const tx = yield* user
    .newTx()
    .mintAssets({
      [toUnit(policyId, fromText("Wow"))]: 123n,
    })
    .validTo(emulator.now() + 1200000)
    .attach.MintingPolicy(mintingPolicy)
    .completeProgram();
  const firstSign = yield* Effect.promise(() => tx.partialSign.withWallet());
  user.selectWallet.fromSeed(EMULATOR_ACCOUNT_1.seedPhrase);
  const secondSign = yield* Effect.promise(() => tx.partialSign.withWallet());
  const assembleTx = tx.assemble([firstSign, secondSign]);
  return assembleTx;
}).pipe(Effect.flatMap(handleSubmit), withLogRetry);

export const signByWalletFromPrivateKey = Effect.gen(function* ($) {
  const { userFromPrivateKey } = yield* EmulatorUser;
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedScript);
  const signBuilder = yield* userFromPrivateKey
    .newTx()
    .pay.ToContract(
      scriptAddress,
      { kind: "inline", value: Data.to("313131") },
      { lovelace: 5000000n },
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const depositFundsLockRefScript = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));

  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "hello_world.hello_world.spend",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const hello: SpendingValidator = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(helloCBOR),
  };
  const contractAddress = validatorToAddress("Custom", hello);
  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
      hello,
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const sendAllFund = Effect.gen(function* ($) {
  const { user } = yield* EmulatorUser;
  user.selectWallet.fromSeed(EMULATOR_ACCOUNT_1.seedPhrase);
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));

  const helloCBOR = yield* pipe(
    Effect.fromNullable(
      scripts.validators.find(
        (v) => v.title === "hello_world.hello_world.spend",
      ),
    ),
    Effect.andThen((script) => script.compiledCode),
  );
  const hello: SpendingValidator = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(helloCBOR),
  };
  const contractAddress = validatorToAddress("Custom", hello);
  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

  const utxos = yield* Effect.promise(() => user.wallet().getUtxos());
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
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);
