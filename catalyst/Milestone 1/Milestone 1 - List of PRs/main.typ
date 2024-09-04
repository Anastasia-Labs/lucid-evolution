// Set the background image for the page
#let image-background = image("images/Background-Carbon-Anastasia-Labs-01.jpg", height: 100%)
#set page(
  background: image-background,
  paper :"a4",
  margin: (left : 20mm,right : 20mm,top : 40mm,bottom : 30mm)
)

// Set default text style
#set text(22pt, font: "Barlow")

#v(3cm) // Add vertical space

// Center-align the logo
#align(center)[#box(width: 75%, image("images/Logo-Anastasia-Labs-V-Color02.png"))]

#v(1cm)

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Proof of Achievement - Milestone 1]\
#set text(15pt);Detailed Standing PR report]

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
// #set par(justify: true)
#show link: underline
#show outline.entry.where(level: 1): it => {
  v(12pt, weak: true)
  strong(it)
}

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
#v(100pt)

// Configure the outline depth and indentation
#outline(depth:2, indent: 1em)

// Page break
#pagebreak()
#set terms(separator: [: ],hanging-indent: 40pt)
#v(20pt)
/ Project Name: Lucid Evolution: Redefining Off-Chain Transactions in Cardano
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal ]

#set text(15pt, font: "Barlow")
= Pull Requests (PRs) extracted from legacy Lucid library

== Add graphql provider
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [111], [Oct 29, 2022], [Add graphql provider], [zachykling],[#link("https://github.com/spacebudz/lucid/pull/111")[GitHub PR]], 
)

#v(25pt)
=== Commits

+ "add graphql as provider" - Initial commit introducing GraphQL as a data provider.

+ "fix datums data for utxos" - Fixes related to the data handling for unspent transaction outputs.

#v(25pt)

=== Purpose 

Introduces the ability to use a Cardano GraphQL instance as a data provider alongside the Cardano submit API, facilitating the submission of transactions. It aims to leverage community resources like dandelion and freeloaderz.io for enhanced accessibility and efficiency.

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/1.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/2.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/3.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/4.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/5.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/6.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/7.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/8.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/9.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/10.png"),
)])

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add graphql provider/11.png"),
)])

#pagebreak()
#v(25pt)
== Fix typebox portable type annotation
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [197], [Jun 7, 2023], [Fix typebox portable type annotation], [solidsnakedev],[#link("https://github.com/spacebudz/lucid/pull/197")[GitHub PR]], 
)


=== Commits

+ fix typebox portable type annonation

#v(25pt)

=== Purpose 

This PR introduces a critical fix for type annotation in TypeScript configurations. The main objective is to resolve an issue where the TypeScript compiler could not name the inferred type of 'CredentialSchema' without a reference to a specific module in node_modules. This problem impacts portability and can hinder the deployment of the project across different environments.

#pagebreak()
#v(25pt)
=== Technical Changes
#v(25pt)
```ts
export const CredentialSchema = Data.Enum([
  Data.Object({
    PublicKeyCredential: Data.Tuple([
      Data.Bytes({ minLength: 28, maxLength: 28 }),
    ]),
  }),
  Data.Object({
    ScriptCredential: Data.Tuple([
      Data.Bytes({ minLength: 28, maxLength: 28 }),
    ]),
  }),
]);
export type Credential = Data.Static<typeof CredentialSchema>;
export const Credential = CredentialSchema as unknown as Credential;
```

=== Issue addressed
#v(25pt)
The patch fixes an issue with non-portable type annotations that arise due to the inferred type references, which are essential for project deployments that require explicit type declarations as part of their TypeScript configuration.

#pagebreak()
#v(25pt)
== Wallet from seed should query both base and enterprise addresses on signing
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [217], [Aug 28, 2023], [Wallet from seed should query both
base and enterprise addresses on
signing], [infrmtcs],[#link("https://github.com/spacebudz/lucid/pull/217")[GitHub PR]], 
)


=== Commits

+  Wallet from seed should query both base and enterprise addresses on signing

#v(25pt)

=== Purpose 

PR #217 addresses a critical issue in the transaction signing process when using wallets derived from seeds. The problem stems from the library's method of querying UTXOs. Currently, the library only queries by base address, ignoring the payment credential. This results in the library refusing to sign transactions even when the user holds valid signing authority, leading to transaction failures.

#pagebreak()
#v(25pt)
=== Technical Changes
#v(25pt)
```ts
const utxos = await this.utxosAt(address);
```
This line of code is crucial as it is responsible for fetching UTXO data which is necessary for signing transactions. The issue was identified during the signTx call, where the function failed to correctly query UTXOs based on the payment credential.

=== Issue addressed
#v(25pt)
The specific bug involves the incorrect assumption that the addressType is unset, which leads to querying by base address rather than by the more specific payment credential. This misalignment causes valid signers to be unrecognized by the system during transaction signing, as showcased in the reproduction case provided.

=== Reproduction Case and Error
#v(25pt)
Transaction Details (from cardano-cli on preview testnet):

Inputs, outputs, and other transaction details reflecting the specific addresses and amounts affected.

Error Thrown: ShelleyTxValidationError related to missing VKey witnesses, indicating a failure in the authentication of transactions due to the incorrect UTXO query logic.

#box(height: 80pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Wallet from seed should query both base and enterprise addresses on signing/1.png"),
)])

#pagebreak()
#v(25pt)
== Prototype Hydra Provider
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [218], [Aug 29, 2023], [Prototype Hydra provider], [Piefayth],[#link("https://github.com/spacebudz/lucid/pull/218")[GitHub PR]], 
)


=== Commits

+ *Initial Commit (1f423e4):* Initial draft of Hydra provider
+ *Subsequent Update (767777b):* Minor bugfix and cleanup in Hydra provider

#v(25pt)

=== Purpose 

This PR introduces a prototype for a Hydra provider, which is aimed at enhancing interactions with the Hydra node directly from the browser. The prototype addresses issues related to Cross-Origin Resource Sharing (CORS) and the management of UTXO sets within a browser environment.


#v(25pt)
=== Technical Changes
#v(25pt)
The provider is designed to retrieve the entire UTXO set from the Hydra node, which could be a significant change depending on the application's requirements and the size of the data involved.
It incorporates a solution for enabling CORS when calling from the browser, which is crucial for web-based applications interfacing with blockchain networks.

#pagebreak()

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/1.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/2.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/3.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/4.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/5.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/6.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Prototype Hydra Provider/7.png"),
)])

#pagebreak()
#v(25pt)
== Add Koios Provider to Lucid
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [219], [Sep 3, 2023], [Add Koios Provider to Lucid], [edridudi],[#link("https://github.com/spacebudz/lucid/pull/219")[GitHub PR]], 
)

=== Commits

+ Initial commits set up the basic structure and functionality
+ Follow-up commits incorporated feedback, added documentation, and handled minor bug fixes and linting issues

=== Purpose 
PR #219 introduces the Koios Provider to the Lucid library, enhancing the library's capabilities by integrating with the Koios API. This provider enables the Lucid library to fetch blockchain data through the Koios service, supporting various network environments such as Mainnet, Preview, and Preprod.

=== Technical Changes

The Koios Provider class implements the Provider interface, handling data retrieval from the Koios API.It includes methods for fetching protocol parameters, UTXOs by address or credential, and specific UTXOs by unit or output reference. The provider handles network-specific configurations and error management, aiming to streamline interactions with the Cardano blockchain through Koios.

#box(height: 95pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/1.png"),
  caption: "package.json"
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/2.png"),
  caption: "src/provider/koios.ts"
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/3.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/4.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/5.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/6.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/7.png"),
)])

#box(height: 150pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/8.png"),
  caption: "src/provider/mod.ts"
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/9.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Add Koios Provider to Lucid/10.png"),
)])

#pagebreak()
#v(25pt)
== Feat (Next.JS): Support serverside Next.JS usage
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [220], [Sep 6, 2023], [Feat (Next.JS): Support serverside
Next.JS usage], [thaddeusdiamond],[#link("https://github.com/spacebudz/lucid/pull/220")[GitHub PR]], 
)

=== Commits

+ Initial commits set up the basic structure and functionality
+ Follow-up commits incorporated feedback, added documentation, and handled minor bug fixes and linting issues

=== Purpose 
PR #220 aims to address compatibility issues with server-side usage of Next.JS, particularly concerning relative imports which have been disallowed since version 12.0.1 of Next.JS. The pull request introduces a method to detect the Next.JS environment and use a fallback URL if necessary

=== Related Issue

PR #174 which details a bug where properties of undefined are being read due to Next.JS's updated handling of imports

=== Technical Changes

Detects if the runtime environment is Next.JS and adjusts import paths accordingly to avoid issues with middleware that disallow relative URLs.

#pagebreak()
#box(height: 50pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Feat (Next.JS) - Support serverside Next.JS usage/1.png"),
  caption: "src/core/core.ts"
)])

#box(height: 450pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Feat (Next.JS) - Support serverside Next.JS usage/2.png"),
  caption: "src/core/core.ts"
)])

#box(height: 500pt,[
   #figure(
  image(fit: "contain", height: 100%,width: 100%,"images/Feat (Next.JS) - Support serverside Next.JS usage/3.png"),
  caption: "src/core/core.ts"
)])

#pagebreak()
#v(25pt)
== Feat: chaining of txs
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [231], [Oct 30, 2023], [Feat: chaining of txs], [will-break-it],[#link("https://github.com/spacebudz/lucid/pull/231")[GitHub PR]], 
)

=== Commits

+ feat: chaining of txs

=== Purpose 
PR #231 introduces a feature to enable chaining of transactions directly via the API. This new functionality allows transactions to be seamlessly linked, where outputs from one transaction can be used as inputs for subsequent transactions. 

This enhancement is particularly useful in complex transaction scenarios where multiple, dependent transactions need to be processed in sequence

=== Technical Changes

The addition of a chain method to the transaction API which facilitates the selection and use of transaction outputs as inputs for another transaction.
The inclusion of a test case to demonstrate and verify the chaining functionality

#pagebreak()
#v(25pt)

=== Example Usage
```
const tx1 = await lucid.newTx()
   .payToAddress('addr_test...', { lovelace: 2_000_000n })
   .complete();

const tx2 = await tx1
    .chain(utxos => utxos.find(({ address }) => address === 'addr_test...')!)
    .payToAddress('addr_test...', { lovelace: 2_000_000n })
    .payToAddress('addr_test...', { lovelace: 2_000_000n })
    .complete();
```

#pagebreak()
#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%, "images/Feat - chaining of txs/1.png"),
  caption: "src/lucid/tx.ts"
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%, "images/Feat - chaining of txs/2.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%, "images/Feat - chaining of txs/3.png"),
  caption: "src/lucid/tx_complete.ts"
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%, "images/Feat - chaining of txs/4.png"),
)])

#box(height: 600pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%, "images/Feat - chaining of txs/5.png"),
)])

#pagebreak()
#v(25pt)
== Fix memory leaks from Tx
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [233], [Nov 3, 2023], [Fix memory leaks from Tx], [joacohoyos],[#link("https://github.com/spacebudz/lucid/pull/233")[GitHub PR]], 
)

=== Commits

+ Tx Leak Fix: Addressed Tx class leaks
+ Type Updates: Refined memory type handling
+ CML Optimization: Removed classes, updated protocols

=== Purpose 
PR #233 focuses on addressing significant memory leaks within the Tx class, which were identified as a crucial issue affecting the system's performance and stability. This pull request builds on prior efforts by another contributor, yHSJ, who initiated related fixes.

=== Technical Changes

Comprehensive overhaul of memory handling for the Tx class, including the implementation of memory freeing routines

Refactoring of certain utility functions into a separate utilities folder to improve code organization and maintainability

Several new commits introduce enhancements and fixes across various methods within the Lucid library to ensure that memory is appropriately managed and freed

#pagebreak()
#v(25pt)
== Stop Leaking Memory
#v(25pt)

#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [234], [Nov 4, 2023], [Stop Leaking Memory], [yHSJ],[#link("https://github.com/spacebudz/lucid/pull/234")[GitHub PR]], 
)

=== Commits

+ Memory Freeing Methods: Implemented across Data.from and Lucid class methods.
+ Code Formatting and Context: Updated freeable types and improved code formatting.
+ Extended Memory Management: Applied to Lucid.new, Lucid.switchProvider, and wallet methods.
+ Joint Enhancements: Removed CML classes, added protocol parameters, and fixed failing tests.

=== Purpose 
PR #234 represents a comprehensive effort to address widespread memory leaks within the Lucid library and the Cardano Multiplatform Library (CML) when interfaced with JavaScript. This PR stems from extensive investigations and previous discussions about memory management issues exacerbated by WASM-JS interactions.

#pagebreak()

=== Technical Changes

The PR introduces enhanced memory management techniques, explicitly freeing memory for objects returned from WASM to JavaScript to prevent memory from not being garbage collected.
It incorporates significant code changes across multiple utility functions and classes, ensuring that all potential memory leaks are addressed.

=== Related Issues

Issue Links and Background: This PR is linked to several discussions and previous PRs (e.g., #222, #233) that highlight ongoing memory management challenges


