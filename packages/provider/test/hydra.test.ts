import { ChildProcess } from "child_process";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import {
  Kupmios,
  Lucid,
  LucidEvolution,
  makeWalletFromPrivateKey,
  Provider,
  Transaction,
  Wallet,
} from "../../lucid/src/index.js";
import { CML } from "../src/core.js";
import { isYaciRunning, startYaci, topup } from "./internal/yaci.js";
import {
  createHydraConfigurationFiles,
  generateRandomHydraConfiguration,
  getTestWallets,
  HydraConfiguration,
  publishHydraScripts,
  startHydraNode,
} from "./internal/hydra.js";
import { Hydra } from "../src/hydra.js";

let yaciProcess: ChildProcess | undefined;
const faucetSk = CML.PrivateKey.generate_ed25519().to_bech32();
let cardanoProvider: Provider;
let faucetWallet: Wallet;
let hydraScriptTxIds: string;

type TestContext = {
  config: HydraConfiguration;
  abortController: AbortController;
  hydraProvider: Hydra;
};

beforeAll(async () => {
  if (!(await isYaciRunning(0))) {
    yaciProcess = await startYaci();
    await isYaciRunning();
  }
  cardanoProvider = new Kupmios(
    "http://localhost:1442",
    "http://localhost:1337"
  );
  faucetWallet = makeWalletFromPrivateKey(cardanoProvider, "Custom", faucetSk);

  await topup(await faucetWallet.address(), 1000000);

  hydraScriptTxIds = await publishHydraScripts(faucetSk);
}, 0);

beforeEach<TestContext>(async (meta) => {
  const lucid = await Lucid(cardanoProvider, "Preprod");
  lucid.selectWallet.fromPrivateKey(faucetSk);

  meta.config = generateRandomHydraConfiguration();
  createHydraConfigurationFiles(meta.config);
  meta.abortController = await startHydraNode(hydraScriptTxIds, meta.config);
  meta.hydraProvider = new Hydra(`ws://localhost:${meta.config.alicePort}`);

  const wallets = getTestWallets(
    cardanoProvider,
    meta.hydraProvider,
    meta.config
  );

  const tx = lucid.newTx();
  for (const walletKey in wallets.cardano) {
    const wallet = wallets.cardano[walletKey as keyof typeof wallets.cardano];
    for (const adaAmount of [5, 10, 15, 20, 25, 50]) {
      tx.pay.ToAddress(await wallet.address(), {
        lovelace: BigInt(adaAmount * 1000000),
      });
    }
  }
  const txUnsigned = await tx.complete();
  const txSigned = await txUnsigned.sign.withWallet();
  const txCompleted = await txSigned.complete();
  const txHash = await txCompleted.submit();
  await lucid.awaitTx(txHash, 100);
}, 30000);

describe("Hydra", async () => {
  it<TestContext>("should be able to create a new Hydra node", async (context) => {
    const { alicePort: node1Port } = context.config;

    const provider = new Hydra(`ws://localhost:${node1Port}`);
    await provider.initialize();

    expect(provider.status()).toEqual("INITIALIZING");
  });

  /*it("should be able to open the Hydra node", async (context) => {
    const { node1Port, node2Port, controller } = await startHydraNode();
    const providerNode1 = new Hydra(`ws://localhost:${node1Port}`);
    await providerNode1.initialize();
    const providerNode2 = new Hydra(`ws://localhost:${node2Port}`);

    const privateKeyAlice = CML.PrivateKey.from_normal_bytes(
      Buffer.from(aliceFundsSK.cborHex.substring(4), "hex")
    );

    const cardanoProvider = new Kupmios(
      "http://localhost:1442",
      "http://localhost:1337"
    );
    const lucidCardano = await Lucid(cardanoProvider, "Preprod");
    lucidCardano.selectWallet.fromPrivateKey(privateKeyAlice.to_bech32());

    const lucidNode1 = await Lucid(providerNode1, "Preprod");
    lucidNode1.selectWallet.fromPrivateKey(privateKeyAlice.to_bech32());

    const firstUTxO = (await lucidCardano.wallet().getUtxos())[0];

    if (!firstUTxO) {
      throw new Error("No UTxO found");
    }

    const cardanoTxNode1 = await providerNode1.commit([firstUTxO]);

    const signedTxNode1 = await signCommitTransaction(
      cardanoTxNode1,
      lucidNode1
    );

    const txHashNode1 = await providerNode1.submitL1Transaction(signedTxNode1);
    await cardanoProvider.awaitTx(txHashNode1);

    const privateKeyBob = CML.PrivateKey.from_normal_bytes(
      Buffer.from(bobFundsSK.cborHex.substring(4), "hex")
    );

    const lucidNode2 = await Lucid(providerNode2, "Preprod");
    lucidNode2.selectWallet.fromPrivateKey(privateKeyBob.to_bech32());

    const cardanoTxNode2 = await providerNode2.commit();
    const txHashNode2 = await providerNode2.submitL1Transaction(cardanoTxNode2);
    await cardanoProvider.awaitTx(txHashNode2);

    await sleep(4000);

    expect(providerNode1.status()).toEqual("OPEN");
    controller.abort();
  });*/
});

afterEach<TestContext>(async (context) => {
  context.abortController.abort();
}, 30000);

afterAll(async () => {
  if (yaciProcess) {
    yaciProcess.kill();
  }
});

async function signCommitTransaction(
  unwitnessedTransaction: Transaction,
  lucid: LucidEvolution
) {
  const unsignedTx = CML.Transaction.from_cbor_hex(unwitnessedTransaction);

  const witnessSet = unsignedTx.witness_set();

  witnessSet.add_all_witnesses(await lucid.wallet().signTx(unsignedTx));

  const signedTx = CML.Transaction.new(
    unsignedTx.body(),
    witnessSet,
    true,
    unsignedTx.auxiliary_data()
  );

  return signedTx.to_cbor_hex() as Transaction;
}
