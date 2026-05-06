import { Lucid, Blockfrost, Void, Data, toUnit, mintingPolicyToId } from "./packages/lucid";
import { Network, Script } from './packages/core-types'

// Instructions on running this script:
// 1. pnpm i
// 2. pnpm build
// 3. BLOCKFROST_PROJECT_ID=<YOUR_BLOCKFROST_PROJECT_ID> SEED_PHRASE="<YOUR_SEED_PHRASE>" bun run index.ts

const blockfrostProjectId = process.env.BLOCKFROST_PROJECT_ID
const seedPhrase = process.env.SEED_PHRASE

if (!blockfrostProjectId || typeof blockfrostProjectId !== 'string') throw new Error('No blockfrost project ID provided.')
if (!seedPhrase || typeof seedPhrase !== 'string') throw new Error('No seed phrase provided.')

const blockfrostPrefix = blockfrostProjectId.slice(0, 7)

const blockfrostPrefixToNetwork = (prefix: string): Network => {
    if (prefix === 'preview') return 'Preview'
    if (prefix === 'preprod') return 'Preprod'
    if (prefix === 'mainnet') return 'Mainnet'
    throw new Error(`Got invalid blockfrost prefix ${prefix}. Expected one of 'preview', 'preprod' or 'mainnet'.`)
}

const network = blockfrostPrefixToNetwork(blockfrostPrefix)
const blockfrostUrl = `https://cardano-${network.toLocaleLowerCase()}.blockfrost.io/api/v0`

console.log('Minting 1 always succeeds policy token.')

const lucid = await Lucid(new Blockfrost(blockfrostUrl, blockfrostProjectId), network)
lucid.selectWallet.fromSeed(seedPhrase)

const alwaysSucceedsPolicy: Script = {
    type: "PlutusV2",
    script: "46010000224981",
}

const mintedAssetUnit = toUnit(mintingPolicyToId(alwaysSucceedsPolicy))
const balancedTx = await lucid
    .newTx()
    .attach.MintingPolicy(alwaysSucceedsPolicy)
    .mintAssets({ [mintedAssetUnit]: 1n }, Data.void())
    .complete()

console.log('Balanced tx')
console.log('CBOR: ', balancedTx.toCBOR())

const signedTx = await balancedTx.sign.withWallet().complete()

console.log('Signed tx')
console.log('CBOR: ', signedTx.toCBOR())

const txHash = await signedTx.submit()

console.log('Submitted tx')
console.log('Hash: ', txHash)