// Set the background image for the page
#let image-background = image("images/Background-Carbon-Anastasia-Labs-01.jpg", height: 100%)
#set page(
  background: image-background,
  paper :"a4",
  margin: (left : 20mm,right : 20mm,top : 40mm,bottom : 30mm)
)

#show link: underline
// #set par(justify: true)

// Set default text style
#set text(22pt, font: "Barlow")

#v(3cm)

// Center-align the logo
#align(center)[#box(width: 75%, image("images/Logo-Anastasia-Labs-V-Color02.png"))]

#v(1cm)

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Proof of Achievement - Milestone 1]\
#set text(15pt);PR Implementations in Lucid - Evolution ]

#v(6cm)

// Set text style for project details
#set text(13pt, fill: white)

// Display project details
#table(
  columns: 2,
  stroke: none,
  [*Project Number*], [1100024],
  [*Project Manager*], [Jonathan Rodriguez],
 
)

// Reset text style to default
#set text(fill: luma(0%))

// Configure the initial page layout
#set page(
  background: none,
  header: [
    // Place logo in the header
    #place(right, dy: 12pt)[#box(image(height: 75%,"images/Logo-Anastasia-Labs-V-Color01.png"))]
    #line(length: 100%) // Add a line under the header
  ],
  header-ascent: 5%,
  footer: [
    #set text(11pt)
    #line(length: 100%) // Add a line above the footer
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 1]
  ],
  footer-descent: 20%
)

#v(25pt)

#show outline.entry.where(level: 1): it => {
  v(12pt, weak: true)
  strong(it)
}
// Configure the outline depth and indentation
#outline(depth: 3,indent: 15pt)

// Initialize page counter
#counter(page).update(0)

#set page(
  footer: [
    #set text(11pt)
    #line(length: 100%) // Add a line above the footer
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 1]
    #place(right, dy:-7pt)[#counter(page).display("1/1", both: true)]
  ]
)

#set terms(separator: [: ],hanging-indent: 40pt)
#v(20pt)
/ Project Name: Lucid Evolution: Redefining Off-Chain Transactions in Cardano
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal]

#set text(15pt, font: "Barlow")

= Evolution Implementations of the PRs from legacy Lucid
#v(20pt)
== Evaluation Methodology

While transitioning the legacy Lucid library to Lucid-Evolution, we didn’t just implement each and every standing pull request (PR) in the legacy repository; we scrutinized each one to see if it fit the Evolution setup. 

Lucid-Evolution library was created from scratch and has had an extensive development journey already. We would like to point out the *"Closed PRs Overview"* section of this report where we showcase the progress we have made outside the scope of standing PRs from the legacy library as well.

In open-source software, a PR is essentially a feature request from the community, not a must-have, and should be evaluated for its relevance and necessity at different stages of development.

Our approach was straightforward: assess each PR on its own merits, asking whether it serves the library’s current goals and technical needs. 

We can break down our approach into a few criteria:

- *Relevance:* Does this feature make sense for Lucid-Evolution right now?
- *Technical Fit:* Can we integrate it smoothly, and does it help us in the long run?
- *Community Feedback:* How much do users and developers need the feature?

This method helped us make sure we’re building a library that’s not just powerful but also what our community needs and wants.

#pagebreak()

#v(25pt)
== Summary of Decisions (Table)
#v(25pt)

#table(
  columns: (auto, auto, auto),
  align: left,
  table.header[*PR Nr.*][*Title*][*Status*],
  [234], [Stop Leaking Memory], [*Implemented*],
  [233], [Fix memory leaks from Tx], [*Implemented*],
  [231], [Feat: chaining of txs], [*Implemented*],
  [220], [Feat (Next.JS): Support server-side Next.JS usage], [*Implemented*],
  [219], [Add Koios Provider to Lucid], [*Implemented*],
  [218], [Prototype Hydra provider], [Not Implemented],
  [217], [Wallet from seed should query both base and enterprise addresses on signing],[Not Implemented],
  [197], [Fix typebox portable type annotation], [*Implemented*],
  [111], [Add graphql provider], [Not Implemented]
) 

#v(25pt)
= Detailed Implementation of Each PR
#v(25pt)
In the following section, you will find the implemented solutions to the standing PRs from the legacy repository that were evaluated as relevant for the design of Lucid-Evolution.

Under the "Implemented" header you can find the the PRs that are included in Lucid-Evolution with the solution description provided together with information to display which PR they correspond to in the legacy repository.

#pagebreak()
#v(25pt)
== Implemented 
=== Fix typebox portable type annotation
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [197], [Jun 7, 2023], [Fix typebox portable type annotation], [solidsnakedev Link],[#link("https://github.com/spacebudz/lucid/pull/197")[GitHub PR]], 
) 

==== Description / Purpose
Building on the foundational work done in the previous Lucid library, the Lucid-Evolution update has significantly advanced our approach to handling type annotations, ensuring greater portability and compatibility across different environments.

==== Background
The original PR aimed to fix a critical issue in the TypeScript configuration that affected the naming of inferred types like 'CredentialSchema'. This problem was particularly challenging as it hindered the deployment flexibility of the project due to dependencies on specific modules in node_modules.

==== Evolutionary Improvements
In Lucid-Evolution, we have expanded upon the initial intentions of the PR by implementing a more robust and flexible system for defining and handling data types. This is achieved through the integration of TypeBox, which allows us to define types with precise constraints and conditions.

#align(bottom + center)[==== Further Details to our Implementation  <link-other> #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/b586fd2d70266898a0749079484d8fc7c1a036ee/packages/plutus/src/data.ts#L14")[GitHub Blob]]

#pagebreak()
#v(25pt)
==== Technical Implementation

```ts
import * as TypeBox from "@sinclair/typebox";
import { Data } from "@lucid-evolution/core-types";

export const Data = {
  Enum: function <T extends TypeBox.TSchema>(items: T[]) {
    const union = TypeBox.Type.Union(items);
    replaceProperties(union, {
      anyOf: items.map((item, index) =>
        item.anyOf[0].fields.length === 0
          ? {
              ...item.anyOf[0],
              index,
            }
          : {
              dataType: "constructor",
              title: item.anyOf[0].fields[0].title,
              index,
              fields:
                item.anyOf[0].fields[0].items ||
                item.anyOf[0].fields[0].anyOf[0].fields,
            },
      ),
    });
    return union;
  },
};
```

==== Impact
The updated implementation not only addresses the portability issues but also enhances the overall architecture by allowing more explicit and clear type declarations. This ensures that the system remains robust in diverse deployment scenarios, thus eliminating previous barriers that might affect the deployment process.

#pagebreak()

#v(25pt)
=== Add Koios Provider to Lucid
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [219], [Sep 3, 2023], [Add Koios Provider to Lucid], [edridudi],[#link("https://github.com/spacebudz/lucid/pull/219")[GitHub PR]], 
)

#v(25pt)
==== Background

Building upon the foundational work done in PR #219 of the legacy Lucid library, the Lucid-Evolution library further enhances and integrates the capabilities of the Koios API. The original PR introduced the Koios Provider, enabling data retrieval capabilities for the Lucid library, which we have now expanded and refined.


==== Evolutionary Improvements
In Lucid-Evolution, the Koios provider has been  integrated and updated to better match the needs of the Cardano blockchain environments, including Mainnet, Preview, and Preprod. This ensures that our library can support a wider range of applications with increased reliability and efficiency.
==== Impact
The integration and enhancement of the Koios provider in Lucid-Evolution not only preserve the functionalities introduced in the legacy Lucid library but also enhance them to offer more robust and versatile tools for developers. This implementation supports the library's aim to provide streamlined, effective interactions with the Cardano blockchain, improving both developer experience and application performance.

#pagebreak()
#v(25pt)
==== Technical Implementation
Here is a look at how the Koios provider has been adapted and implemented in the Lucid-Evolution library:

```ts
import { Koios } from "@lucid-evolution/provider/koios";

// Enhanced initialization for varied network support
const koiosProvider = new Koios("https://api.koios.rest/api/v1");

// Advanced method to fetch protocol parameters with error handling
async function fetchProtocolParameters() {
  try {
    return await koiosProvider.getProtocolParameters();
  } catch (error) {
    console.error("Error fetching protocol parameters: ", error);
  }
}

// Expanded UTXO retrieval capabilities
wallet.getUtxos = async (address) => {
  try {
    return await koiosProvider.getUtxos(address);
  } catch (error) {
    console.error("Error retrieving UTXOs: ", error);
  }
};
```
#align(bottom + center)[==== Further Details to our Implementation  <link-other> #link("https://github.com/Anastasia-Labs/lucid-evolution/pull/128/commits/1e73c4098eb0b38f597c9b772f1470333e9dc011")[GitHub PR [Evolution]]]

#pagebreak()

#v(25pt)
=== Feat (Next.JS): Support serverside Next.JS usage
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [220], [Sep 6, 2023], [Feat (Next.JS): Support serverside
Next.JS usage], [thaddeusdiamond],[#link("https://github.com/spacebudz/lucid/pull/220")[GitHub PR]], 
)

==== Background
Building on PR #220 from the legacy Lucid library, Lucid-Evolution has further refined the server-side usage of Next.js to address compatibility issues, particularly those introduced in Next.js version 12.0.1 concerning relative imports. This enhancement ensures that Lucid-Evolution can operate seamlessly in Next.js environments, adhering to the latest standards and practices.

==== Evolutionary Improvements
In Lucid-Evolution, the integration of Next.js has been meticulously enhanced to not only detect the Next.js environment but also to handle import paths dynamically, ensuring compatibility and efficiency in server-rendered applications. This addresses the key issues identified in related PR #174, which highlighted bugs due to Next.js's handling of imports.

#pagebreak()

#v(25pt)

==== Technical Implementation
You can see below is a  snippet showcasing the integration approach, focusing on handling Next.js environments within configuration files:

```js
const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@lucid-evolution/eslint-config/next.js"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: project,
    // Additional ESLint rules to handle Next.js specific scenarios
  },
};
```

#align(bottom + center)[==== Further Details to our Implementation  <link-other> #link("https://github.com/search?q=repo%3AAnastasia-Labs%2Flucid-evolution%20next.js&type=code")[GitHub Search [Evolution]]]

#pagebreak()

#v(25pt)
=== Feat: chaining of txs
#v(25pt)
#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [231], [Oct 30, 2023], [Feat: chaining of txs], [will-break-it],[#link("https://github.com/spacebudz/lucid/pull/231")[GitHub PR]], 
)

This feature that has been successfully implemented in the Evolution library is a good example serving as a demonstration of how the purpose of Lucid - Evolution is not only to maintain but also to extend and supersede the legacy Lucid library in terms of features requested by the community

In our Discord Channel exemplary usage of this feature has already been showcased and it can also be found in the latest `lucid-evolution` release `0.2.40`. The following image displayed is an example of how 10 transactions were fit in one block using Blockfrost via our txchaining method:


#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/TxChaining/TxChaining via Blockfrost.png"),
  caption: "tx chaining via Blockfrost (Testnet)"
)])
#pagebreak()

#v(25pt)
==== Background
Following the intent of PR #231 from the legacy Lucid library, the Lucid-Evolution framework has significantly enhanced the capabilities for transaction chaining. This feature allows for the efficient chaining of multiple transactions within a single block, addressing scalability and performance enhancements critical for modern blockchain applications.

==== Evolutionary Improvements
The enhancements in Lucid-Evolution include sophisticated management of wallet UTXOs and outputs derived from transactions. This ensures that transactions can be chained reliably without waiting for previous transactions to be recorded on the blockchain, which is pivotal for applications requiring rapid sequential transactions.


==== Technical Implementation
The implementation of transaction chaining involved several key developments:

- The `TxBuilder` class has been expanded to support chaining by maintaining a state of wallet inputs and outputs across chained transactions. This allows for seamless transition from one transaction to another.

- The `overrideUTxOs` method has been introduced to dynamically adjust the wallet's UTXOs, enabling the wallet to use unconfirmed outputs as inputs for subsequent transactions.

- The `chain`, `chainProgram`, and `chainSafe` methods in `TxBuilder` facilitate the construction and submission of chained transactions by handling the complexities of UTXO management and transaction construction within the framework.

#pagebreak()
#v(25pt)
==== Demonstration via Syntax 

A code snippet demonstrating how transaction chaining is implemented:

```typescript
const lucid = await Lucid.init(config);
const [newWalletInputs, derivedOutputs, tx] = await lucid.newTx()
  .payToAddressWithData(address, {kind: "inline", value: datum}, {lovelace: 10000000n})
  .chain();

const signedTx = await tx.sign().complete();
const txHash = await signedTx.submit();
lucid.overrideUTxOs(newWalletInputs);
```

#align(bottom + center)[==== Lucid Evolution   <link-other> #link("https://github.com/Anastasia-Labs/lucid-evolution/releases/tag/%40lucid-evolution%2Flucid%400.2.40")[Release 0.2.40 ]]

#align(bottom + center)[==== Further Details to our Implementation  <link-other> #link("https://github.com/Anastasia-Labs/lucid-evolution/pull/141/commits")[GitHub PR [Evolution]]]

#pagebreak()
#v(25pt)
=== Fix memory leaks from Tx
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [233], [Nov 3, 2023], [Fix memory leaks from Tx], [joacohoyos],[#link("https://github.com/spacebudz/lucid/pull/233")[GitHub PR]], 
)

=== Stop Leaking Memory
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [234], [Nov 4, 2023], [Stop Leaking Memory], [yHSJ],[#link("https://github.com/spacebudz/lucid/pull/234")[GitHub PR]], 
)

==== Background
Building on the efforts made in PRs #233 and #234 in the legacy Lucid library, Lucid-Evolution has adopted significant memory management improvements, primarily facilitated through updates in the Cardano Multiplatform Library (CML) by DcSpark. 

These updates were essential to address persistent memory leaks within transaction processing and general library operations, particularly when interfaced with JavaScript in WASM builds.

#pagebreak()
#v(25pt)
==== Evolutionary Improvements
Lucid-Evolution leverages the enablement of weak references in CML's WASM builds to address the memory leak issues described in PRs #233 and #234:

- The introduction of weak references allows for automatic memory management by the garbage collector, reducing the need for explicit free() calls and improving overall system stability and performance.

- Changes in CML, including the optimization of memory handling and enabling weak references, have directly impacted Lucid-Evolution's memory management capabilities, ensuring that memory leaks are minimized even under heavy allocation loads.

==== Technical Implementation
The technical changes from the legacy PRs focused on overhauling memory handling within the Tx class and refining the usage of data structures interfacing with WASM.

#align(bottom + center)[==== Further Details to CML  <link-other> #link("https://github.com/dcSpark/cardano-multiplatform-lib/pull/182")[Weakrefs in WASM builds]]

#pagebreak()

#v(25pt)
= Closed PRs Overview
#v(25pt)
We have closed numerous PRs (*over 130 already*) in the Lucid Evolution repository, showcasing extensive development work. The exhaustive list of PRs can be found in the #link("https://github.com/Anastasia-Labs/lucid-evolution")[Github repository] and also can be accessed #link("https://github.com/Anastasia-Labs/lucid-evolution/pulls?q=is%3Apr+is%3Aclosed")[here] 

#v(25pt)
#box(height: 400pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Closed PRs Overview/1.png"),
)])

#pagebreak()


#v(25pt)
== Not Implemented
#v(25pt)
=== Add graphql provider

#table(
  columns: 5,
  table.header[*PR Nr. (Legacy)*][*Date*][*Title*][*Submitter*][*Link*],
  [111], [Oct 29, 2022], [Add graphql provider], [zachykling],[#link("https://github.com/spacebudz/lucid/pull/111")[GitHub PR]], 
)

#v(25pt)

=== Wallet from seed should query both base and enterprise addresses on signing
#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [217], [Aug 28, 2023], [Wallet from seed should query both
base and enterprise addresses on
signing], [infrmtcs],[#link("https://github.com/spacebudz/lucid/pull/217")[GitHub PR]], 
)
#v(25pt)

=== Prototype Hydra Provider
#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [218], [Aug 29, 2023], [Prototype Hydra provider], [Piefayth],[#link("https://github.com/spacebudz/lucid/pull/218")[GitHub PR]], 
)

- we assessed this PR and we noticed that this graphgl is outside of the scope of a tx builder . External cardano technology too specific for our scope.

- seed should query 

- Prototype Hydra Provider is still ongoing therefore its not materialized it wil be included at the stage of development for milestone 4.