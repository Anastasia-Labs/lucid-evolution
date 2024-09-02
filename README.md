<p align="center">
  <img width="130px" src="docs/public/lucid-evolution-al-red.svg" align="center"/>
  <h1 align="center">Lucid Evolution</h1>
  <p align="center">Next-generation transaction builder for users and an off-chain framework for highly scalable dApps on Cardano</p>
</p>

<p align="center">
  <a href="https://github.com/Anastasia-Labs/lucid-evolution/actions/workflows/main.yml">
    <img src="https://github.com/Anastasia-Labs/lucid-evolution/actions/workflows/main.yml/badge.svg" alt="Build Status"/>
  </a>
  <img src="https://img.shields.io/npm/v/%40lucid-evolution%2Flucid" alt="NPM Version"/>
  <img src="https://img.shields.io/npm/dy/%40lucid-evolution%2Flucid" alt="NPM Downloads"/>
  <a href="https://discord.gg/s89P9gpEff">
    <img alt="Discord" src="https://img.shields.io/discord/947985069111377951?logo=discord">
  </a>
</p>

## Introduction

Lucid Evolution is a comprehensive suite of tools designed to facilitate the off-chain development of scalable dApps and the creation of complex transactions on the Cardano blockchain

## Packages

| Package                              | Description                         |
| ------------------------------------ | ----------------------------------- |
| `@lucid-evolution/lucid`             | Core package for Lucid Evolution    |
| `@lucid-evolution/bip39`             | BIP-39 mnemonic code implementation |
| `@lucid-evolution/core-types`        | Shared type definitions             |
| `@lucid-evolution/core-utils`        | Common utility functions            |
| `@lucid-evolution/crc8`              | CRC8 calculation utilities          |
| `@lucid-evolution/plutus`            | Plutus integration tools            |
| `@lucid-evolution/provider`          | Data provider interfaces            |
| `@lucid-evolution/sign_data`         | Data signing utilities              |
| `@lucid-evolution/utils`             | General-purpose utility functions   |
| `@lucid-evolution/wallet`            | Wallet integration package          |
| `@lucid-evolution/typescript-config` | Shared TypeScript configurations    |
| `@lucid-evolution/eslint-config`     | Shared ESLint configurations        |

## Tech Stack

- [**TypeScript**](https://www.typescriptlang.org/): For static type checking
- [**Effect**](https://effect.website/docs/why-effect): Manages side effects, facilitating the creation of effectful functions that track errors, handle synchronous and asynchronous operations, and provide error short-circuiting capabilities
- [**ESLint**](https://eslint.org/): For code linting
- [**Prettier**](https://prettier.io): For code formatting

## Getting Started

### Installation

```
git clone https://github.com/Anastasia-Labs/lucid-evolution.git
cd lucid-evolution
pnpm install
```

### Build

To build all packages:

```
pnpm build
```

### Development

To run the documentation site locally:

```
pnpm dev
```

- Visit http://localhost:3000/lucid-evolution to view the docs

### Testing

Run tests across all packages:

```
pnpm test
```

### Code Quality

To format files with prettier, run the following command:

```
pnpm format
```

To check formatting, run the following command:

```
pnpm format-check
```

To check linting, run the following command:

```
pnpm lint
```

## Documentation

For comprehensive documentation, please visit our [official documentation site](https://anastasia-labs.github.io/lucid-evolution/)

## Remote Caching

Lucid Evolution leverages the remote caching functionality provided by GitHub to optimize continuous integration (CI) pipelines.

By default, local caching is employed. Although there are no immediate plans for remote caching, the repository remains adaptable to future enhancements

## Contributing

We welcome contributions to Lucid Evolution! Please feel free to submit issues, create pull requests, or engage in discussions to help improve the project

## License

Lucid Evolution is open-source software licensed under the [MIT License](https://anastasia-labs.github.io/lucid-evolution/information/license)

## Community

Join our [Discord community](https://discord.gg/s89P9gpEff) for discussions, support, and updates

---

<p align="center">Developed with ❤️ by Anastasia Labs</p>
