[![CI](https://github.com/Anastasia-Labs/lucid-evolution/actions/workflows/main.yml/badge.svg)](https://github.com/Anastasia-Labs/lucid-evolution/actions/workflows/main.yml)

# Lucid Evolution

## What's inside?

Lucid evolution includes the following packages

### Packages

Lucid Evolution consists of the following packages:

- `docs`: Documentation resources for Lucid Evolution.
- `@lucid-evolution/lucid`: Main package for Lucid Evolution.
- `@lucid-evolution/bip39`: Package for BIP-39 mnemonic code.
- `@lucid-evolution/core-types`: Core types used across Lucid Evolution packages.
- `@lucid-evolution/core-utils`: Core utilities used across Lucid Evolution packages.
- `@lucid-evolution/crc8`: Package for CRC8 calculation.
- `@lucid-evolution/plutus`: Package for Plutus integration.
- `@lucid-evolution/provider`: Package for providing data.
- `@lucid-evolution/sign_data`: Package for signing data.
- `@lucid-evolution/utils`: Utility functions for Lucid Evolution.
- `@lucid-evolution/wallet`: Wallet package for Lucid Evolution.
- `@lucid-evolution/typescript-config`: Houses `tsconfig.json` files utilized across the `monorepo`.
- `@lucid-evolution/eslint-config`: Contains ESLint configurations, including `eslint-config-next` and `eslint-config-prettier`.

All packages in Lucid Evolution are built using [TypeScript](https://www.typescriptlang.org/) and [ Effect ](https://effect.website/docs/why-effect). This combination enables us to manage side effects effectively, scale faster, and enhance type safety and developer experience.

### Utilities

The monorepo is equipped with essential tools to facilitate development workflows:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Effect](https://effect.website/docs/why-effect) Manages side effects, facilitating the creation of effectful functions that track errors, handle synchronous and asynchronous operations, and provide error short-circuiting capabilities.
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build packages, run the following command:

```
cd lucid-evolution
pnpm build
```

### Develop

To develop docs, run the following command and visit the custom `basePath` http://localhost:3000/lucid-evolution:

```
cd lucid-evolution
pnpm dev
```

To test packages, run the following command:

```
pnpm test
```

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

### Remote Caching

Lucid Evolution leverages the remote caching functionality provided by GitHub to optimize continuous integration (CI) pipelines.

By default, local caching is employed. Although there are no immediate plans for remote caching, the repository remains adaptable to future enhancements.

### Contribution

Contributions to Lucid Evolution are welcome! Feel free to submit issues, feature requests, or pull requests to help improve the project.

### License

Lucid Evolution is licensed under the MIT License, permitting unrestricted use, distribution, and modification.
