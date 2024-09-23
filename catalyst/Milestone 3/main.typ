// Set the background image for the page
#let image-background = image("images/Background-Carbon-Anastasia-Labs-01.jpg", height: 100%)
#set page(
  background: image-background,
  paper: "a4",
  margin: (left: 20mm, right: 20mm, top: 40mm, bottom: 30mm)
)

// Set default text style
#set text(22pt, font: "Barlow")
#set par(justify: true)
#v(3cm) // Add vertical space

// Center-align the logo
#align(center)[#box(width: 75%, image("images/Logo-Anastasia-Labs-V-Color02.png"))]

#v(1cm)

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Proof of Achievement - Milestone 3]\
#set text(15pt); Documentation Refinement and Technical Specifications ]

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
    // Place the logo in the header
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
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 3]
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
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal]










// Raw Text settings `text`(Inline Code)
#show raw.where(block: false): box.with(
  fill: luma(230),
  inset: (x: 3pt, y: 0pt),
  outset: (y: 3pt),
  radius: 2pt,
)



// Setting default text config before content
#set text(12pt, font: "Barlow")
#show heading.where(level: 1): set text(rgb("#c41112"))
#show heading.where(level: 2): set text(rgb("#c41112"))
#show heading.where(level: 3): set text(rgb("#c41112"))



// Codeblock settings
#import "@preview/codly:0.1.0": codly-init, codly, disable-codly
#show: codly-init.with()
#codly(
  stroke-width: 0.6pt,
  stroke-color: red,
)













#v(110pt)

= Introduction
#v(35pt)
Since our Milestone 2 submission, we've been working intensively on expanding Lucid Evolution's functionality, with our commit count now approaching 900. Our focus has been on:

- Transitioning to PlutusV3
- Being Chang Hardfork ready
- Adapting to newly altered cost structures
- Updating our Tx-Builder library to align with the current state of Cardano

The post-Chang Hardfork period has seen popular dApps undergoing a transition phase. This has given us the opportunity to collaborate closely with many developers, actively assisting with errors and queries, fostering discussions around pain points, and adapting our library based on their needs. We've ensured our documentation is comprehensive, covering all the backend work we've been busy with.
Lucid Evolution has matured significantly and is now ready for use by any developer in our ecosystem. We've maintained a syntax familiar to users of the legacy Lucid library, aiming to create a product that's:

- Easy to use out-of-the-box
- Familiar to many in the community
- Designed to simplify developers' lives with their off-chain operations, rather than introducing new complexities

Our goal has been to provide a library that eases the development process, particularly for those already acquainted with Lucid's approach to off-chain operations in the Cardano ecosystem


#pagebreak()
#v(110pt)
= Documentation Website
#v(35pt)
To make it easy for developers to follow our documentation, we've created a centralized knowledge base. This comprehensive resource serves as a go-to place for developers to lookup examples, check use-cases, review syntax they might have forgotten, and gain a general understanding of Lucid Evolution and how it can be used in various scenarios.

We've put considerable effort into making the format and structure as user-friendly as possible. Our goal is to ensure that even someone with no prior knowledge of Lucid Evolution can start using it quickly and efficiently. The navigation is intuitive, allowing users to find the information they need without unnecessary complexity.

*We are excited to introduce our new website to the Catalyst reviewers*:
- https://anastasia-labs.github.io/lucid-evolution 

This website represents the long-term refinement and community collaboration. We've been working on improving it for an extended period, gathering and incorporating feedback from developers in our community. Their input has been invaluable in shaping the content and improving its overall usability.

In the spirit of open collaboration, we've encouraged a system that allows fellow developers to suggest changes to the knowledge base we are creating. We provide templates for different topics, encouraging contributions and ensuring that the documentation evolves with the needs of our user base.

At this stage, we believe the documentation has reached a polished state and covers almost the entire functionality of the library. However, our work is far from over. We are actively expanding the site with new use case scenarios and providing more examples to interested readers. This ongoing effort is so that the documentation remains a living, growing resource that adapts to the evolving needs of our developer community.

Our commitment to comprehensive, user-friendly documentation reflects our broader goal: to make Lucid Evolution not just a powerful tool, but an accessible one. We believe that by providing clear, thorough, and practical documentation, we can empower more developers in our ecosystem.


#pagebreak()


#v(35pt)
= Function Design / Gap Identification
#v(15pt)
In the Conway era, the Cardano blockchain is introducing significant governance features on-chain. These enhancements, as described in #link("https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694")[CIP-1694], enable ADA holders to participate in various on-chain decisions. Key changes include new script purposes, centralized data structures like committees, and new transaction features.

== Requirements Identification

In our analysis for the Conway era, we identified several key requirements that needed to be addressed in the Lucid Evolution library. These included the ability to delegate voting power to Delegated Representatives (DReps), register and manage DReps, combine stake and vote delegation, support different voting strategies, enable script-based DRep functionality for programmatic voting, and integrate seamlessly with existing stake delegation features we had before.

== Function Design

Based on these requirements, we designed and implemented a comprehensive set of functions to support the new governance features. 

- For delegation, we created `delegate.VoteToDRep` for delegating voting power to a DRep, and `delegate.VoteToPoolAndDRep` for combined stake and vote delegation. These functions allow users to participate in governance by choosing their representatives or directly influencing the network's direction.

- To streamline the process of entering the governance system, we developed registration and delegation functions that combine multiple actions. These include `registerAndDelegate.ToDRep` for registering and delegating to a DRep in one action, `registerAndDelegate.ToPool` for registering and delegating stake to a pool, and `registerAndDelegate.ToPoolAndDRep` for registering and delegating both stake and voting power simultaneously.

- For DRep management, we implemented `register.DRep` for registering as a DRep, `updateDRep` for updating DRep information, and `deregister.DRep` for deregistering as a DRep. These functions provide the necessary tools for individuals or entities to participate as representatives in the governance system.

- We extended our DRep functionality to support script-based DReps. This includes variations of `register.DRep` with script attachment capabilities and corresponding `deregister.DRep` functions for script-based DReps.

#pagebreak()
#v(35pt)
== Gap Analysis and Solutions
#v(15pt)
During our design phase, we identified and addressed several gaps in the initial implementation and changed/rewrote our previously determined plan. One significant challenge was representing different voting strategies, such as Always Abstain and Always No Confidence. We solved this by implementing a `__typename` property in the DRep object, allowing users to specify these strategies easily.

Another gap we addressed was the need for combined operations. Users often need to perform multiple actions, such as registering, delegating stake, and delegating votes, in single transactions. Our solution was to design combined functions like `registerAndDelegate.ToPoolAndDRep`, which make it easy for user interactions and reduce the complexity of participating in governance.

The requirement for script-based DReps presented another challenge. To support programmatic voting behavior, we extended the `register.DRep` function to include script attachment capabilities. This enhancement allows for more complex and automated governance participation strategies.

== Integration with Existing Features

In our design we wanted to make it a seamless integration of the new governance functions with Lucid's existing transaction building capabilities. Users can now construct complex transactions that include both governance actions and regular activities, all within a single, cohesive framework.

#pagebreak()

#v(15pt)

= Documentation Structure for Lucid Evolution

#v(15pt)

The documentation for Lucid Evolution is organized into several key sections to facilitate ease of use and understanding for developers. A rough structure of the documentation looks like this:

== Introduction
Overview of Lucid Evolution and its purpose.
Key features and benefits for developers.

== Installation
Step-by-step guide on how to install Lucid Evolution using various package managers (npm, yarn, pnpm, Bun).
Compatibility information and prerequisites.

== Core Concepts
- Instantiate Evolution: Instructions on how to set up the Lucid instance.
- Choose Wallet: Guidance on selecting and managing wallets.
- Your First Transaction: A walkthrough for building and submitting a basic transaction.

== Deep Dives
In-depth guides on specific functionalities such as minting assets, smart contract interactions, and using the emulator.

#box(height: 225pt,
 columns(gutter: 10pt)[
   #set par(justify: true)
- *Make Payments*: Overview of various methods for making payments. Examples for simple ADA payments and multiple recipients. Code snippets demonstrating the payment process.
- *Mint Assets*: Instructions on creating a minting policy for assets. Steps to derive the policy ID from the minting policy script. Code examples for minting tokens and attaching the minting policy.
- *Smart Contract Interactions*: Explanation of how to interact with validators instead of traditional smart contracts. Steps to instantiate validators and work with datums and redeemers. Code snippets illustrating the interaction process.
- *Emulator*: Introduction to the emulator for testing and validating transactions in a controlled environment.Steps to initialize the emulator and work with predefined addresses and asset distributions. Code examples for simulating transactions and distributing staking rewards.
- *Register Stake*: Instructions on how to register a stake address and manage staking operations.
- *Register/Retire Stakepool*: Guidelines for registering and retiring a stake pool.
]
)

#pagebreak()

#v(115pt)
== Conway Era
For Milestone 3 of our proposal one of the highlighted topics would be Conway Era functions. These are covered under the title "Keeping pace with Cardano" under our documentation page

=== Highlight

We would like to highlight and showcase that its already possible to use Lucid Evolution for governance functions on mainnet.

*The first Aiken Script-based DRep on Cardano ever*, has been registered on-chain using Lucid Evolution

=== Transaction Proof
https://cardanoscan.io/transaction/503b81bfb17a0d904fcf6c4000191ce62ae31a929b67a51126dd838543748b8d?tab=referenceinputs

- #link("https://x.com/AdamRusch/status/1834555539516244250")[Link to social media post highlighting this achievement]

#pagebreak()
#v(35pt)
=== Keeping pace with Cardano

We have implemented and successfully tested a comprehensive set of Conway era functions in Lucid Evolution. These functions provide essential support for the new governance features introduced in the Conway era. Below is a list of the implemented functions along with a brief description of their purpose:

#box(height: 235pt,
 columns(gutter: 10pt)[
   #set par(justify: true)

- *delegate.VoteToDRep*: Delegates voting power from a reward address to a DRep.
- *delegate.VoteToPoolAndDRep*: Delegates both stake to a pool and voting power to a DRep in one action.
- *registerAndDelegate.ToDRep*: Registers a stake address and delegates voting power to a DRep in one action.
- *registerAndDelegate.ToPool*: Registers a stake address and delegates stake to a pool.
- *registerAndDelegate.ToPoolAndDRep*: Registers a stake address, delegates stake to a pool, and voting power to a DRep in one action.
- *register.DRep*: Registers a stake address as a DRep.
- *updateDRep*: Updates the information of a DRep.
- *deregister.DRep*: Deregisters a stake address as a DRep.
- *register.DRep* (with script attachment): Registers a script-based DRep, allowing for programmatic voting behavior.
- *deregister.DRep* (for script-based DRep): Deregisters a script-based DRep.
])


These functions have been thoroughly tested in an on-chain environment, with each function successfully executing and confirming transactions on the blockchain. The comprehensive suite of functions enables developers to interact with all aspects of the Conway era governance system using Lucid Evolution

= Testing of Conway Era functions / Video

#align(center)[== GIF Testrun

#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/assets/images/governance.gif")[Succesful Test Result ]
\
\

This GIF, *a onchain test* running in terminal,
showcases \ that our test packages are working as intended by running succesful test cases

]







