# Lucid Evolution

## What's inside?

Lucid evolution includes the following packages

### Packages
Lucid Evolution consists of the following packages:

- `docs`: Documentation resources for Lucid Evolution.
- `@lucid-evolution/lucid-evolution`: A foundational package set to evolve into multiple packages.
- `@lucid-evolution/eslint-config`: Contains ESLint configurations, including `eslint-config-next` and `eslint-config-prettier`.
- `@lucid-evolution/typescript-config`: Houses `tsconfig.json` files utilized across the `monorepo`.

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

To develop docs, run the following command:

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

### Remote Caching

Lucid Evolution leverages the remote caching functionality provided by GitHub to optimize continuous integration (CI) pipelines.

By default, local caching is employed. Although there are no immediate plans for remote caching, the repository remains adaptable to future enhancements.

### Contribution
Contributions to Lucid Evolution are welcome! Feel free to submit issues, feature requests, or pull requests to help improve the project.

### License
Lucid Evolution is licensed under the MIT License, permitting unrestricted use, distribution, and modification.