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
  signCommitTransaction,
  startHydraNode,
  TestWallets,
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
  wallets: TestWallets;
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

  meta.wallets = await getTestWallets(
    cardanoProvider,
    meta.hydraProvider,
    meta.config
  );

  const tx = lucid.newTx();
  for (const walletKey in meta.wallets.cardano) {
    const wallet =
      meta.wallets.cardano[
        walletKey as keyof typeof meta.wallets.cardano
      ].wallet();
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

  it<TestContext>("should be able to open the Hydra node", async (context) => {
    const { alicePort: node1Port, bobPort: node2Port } = context.config;
    const providerNode1 = new Hydra(`ws://localhost:${node1Port}`);
    await providerNode1.initialize();
    const providerNode2 = new Hydra(`ws://localhost:${node2Port}`);

    const cardanoProvider = new Kupmios(
      "http://localhost:1442",
      "http://localhost:1337"
    );

    const wallets = context.wallets;

    const firstUTxO = (await wallets.cardano.aliceFunds.wallet().getUtxos())[0];

    if (!firstUTxO) {
      throw new Error("No UTxO found");
    }

    const cardanoTxNode1 = await providerNode1.commit([firstUTxO]);

    const signedTxNode1 = await signCommitTransaction(
      cardanoTxNode1,
      wallets.cardano.aliceFunds
    );

    const txHashNode1 = await providerNode1.submitL1Transaction(signedTxNode1);
    await cardanoProvider.awaitTx(txHashNode1, 100);

    const cardanoTxNode2 = await providerNode2.commit();
    const txHashNode2 = await providerNode2.submitL1Transaction(cardanoTxNode2);
    await cardanoProvider.awaitTx(txHashNode2, 100);

    let tryCount = 0;

    while (tryCount < 10) {
      if (providerNode1.status() === "OPEN") {
        break;
      } else {
        tryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    expect(providerNode1.status()).toEqual("OPEN");
  });
});

afterEach<TestContext>(async (context) => {
  context.abortController.abort();
}, 30000);

afterAll(async () => {
  if (yaciProcess) {
    yaciProcess.kill();
  }
});
