export default {
  "index": {
    type: "page",
    display: "hidden",
  },

  "install": {
    title: "Install",
    type: "page",
    theme: {
      typesetting: "article",
      toc: false,
    },
  },

  "documentation": {
    title: "Documentation",
    type: "page",
    items: {

      "_1": {
        title: "Introduction",
        type: "separator",
      },

      "about": "About",

      "provider": {
        title: "Provider",
        items: {
          "blockfrost": "Blockfrost",
          "koios": "Koios",
          "maestro": "Maestro",
          "kupmios": "Kupmios",
          "yaci-devkit": "YACI DevKit",
          "utxo-rpc": "UTxORPC",
          "###": { type: "separator" },
          "common-queries": "Common Queries",
        },
      },

      "wallet": {
        title: "Wallet",
        items: {
          "wallet-creation": {
            title: "Wallet Creation",
            items: {
              "from-seed": "From Seed",
              "from-private-key": "From Private Key",
              "from-address": "From Address",
              "from-api": "From API",
            },
          },
          "wallet-management": "Wallet Management",
        },
      },

      "first-transaction": "First Transaction",

      "_2": {
        title: "Deep Dives",
        type: "separator",
      },

      "pay-methods": "Pay Methods",

      "mint-burn-assets": "Mint & Burn Assets",

      "staking": "Staking",

      "governance": "Governance",

      "smart-contract-interactions": {
        title: "Smart Contract Interactions",
        items: {
          "applying-parameters": "Applying Parameters",
          "multi-validators": "Multi Validators",
          "redeemer-indexing": "Redeemer Indexing",
          "reference-scripts": "Reference Scripts",
        },
      },

      "transaction-chaining": "Transaction Chaining",

      "emulator": "Emulator",

      "###": { type: "separator" },

      "under-the-hood": "Under the Hood",

      "examples": "Examples",
    },
  },
};
