# Lucid Evolution Create React App Template

A minimal `Create React App` template for Cardano dApps using Lucid Evolution.

## Prerequisites

1. Get Blockfrost API key from [blockfrost.io](https://blockfrost.io)
2. Create a `.env` file in the project root (`.env.example` file provided):

```bash
REACT_APP_BLOCKFROST_API_KEY=your_blockfrost_api_key_here
```

## Quick Start

1. Go to the example directory:

```bash
cd examples/with-react-cra
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── ConnectButton.tsx   # Wallet connection button
│   └── WalletConnect.tsx   # Wallet connection modal
├── config/             # Configuration files
│   └── theme.ts        # UI theme configuration
├── hooks/              # Custom React hooks
│   └── useWallet.ts    # Wallet and Lucid initialization hook
├── styles/            # Global styles
│   └── globals.css
├── App.tsx           # Main app component
└── index.tsx         # Entry point
```


## Dependencies

- [@lucid-evolution/lucid](https://github.com/Anastasia-Labs/lucid-evolution)
- [@cardano-foundation/cardano-connect-with-wallet](https://github.com/cardano-foundation/cardano-connect-with-wallet)

## Network Support

Currently configured for Preprod testnet. To use on other networks, modify the `NetworkType` in `useWallet.ts` and update the Blockfrost endpoint accordingly.

## Demo Screenshots

### Initial Connect Wallet Screen
![Connect Wallet](./public/readme/connect-wallet.png)

### Wallet Selection Modal
![Wallet Modal](./public/readme/wallet-modal.png)

### Connected Wallet View
![Connected Wallet](./public/readme/connected-wallet.png)

### Console - Success log
![Console - Success log](./public/readme/success-log.png)