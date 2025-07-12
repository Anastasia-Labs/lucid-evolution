# Contributing to Evolution SDK

👋 Welcome to the Evolution SDK community!

This guide will help you get started with contributing to Evolution SDK. Our goal is to make the contribution process transparent and collaborative for everyone involved.

Evolution SDK is structured as a monorepo with multiple packages. Each package serves a specific purpose, so please make sure you're working in the appropriate package when making changes. While we encourage innovation, we also value stability for our users, so please:

- Maintain backward compatibility unless a breaking change is explicitly agreed upon for a major version release
- Consider performance implications when modifying core functionality
- Follow the existing coding patterns and practices

## Ways to Contribute

- Reporting bugs
- Suggesting enhancements
- Improving documentation
- Submitting code changes
- Discussing the current state of the code

## Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

### Pull Requests

Pull requests are the best way to propose changes. Write clear, concise commit messages. Following the conventional commits specification is a valuable best practice, we actively welcome your pull requests:

1. Fork the repo and create your branch. Naming your branches with a prefix indicating the type of change (e.g., `feature/`, `bugfix/`, `docs/`) followed by a brief description greatly helps the maintainers
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Write and update tests for your changes. Run `pnpm test` to ensure all tests pass
5. Make sure your code lints
6. Ensure your changes pass all CI checks before requesting a review
7. Issue your pull request

### Coding Style

- Adhere to the ESLint configuration provided in the repository
- Run `pnpm lint` to ensure your code follows our style guidelines
- Run `pnpm format` (with Prettier) or `pnpm format-check` to format your code

## Local Testing

Evolution SDK uses Vitest for testing. There are two main types of tests:

1. **Unit and emulator tests** - These can run without external dependencies
2. **On-chain integration tests** - These require API keys and network access

### Setting Up Test Environment

For full test coverage, including on-chain tests, you need to set up environment variables:

#### Step 1: Create `.env` files

Under `packages/lucid`, create an `.env` file with the following variables:

```
VITE_API_URL="https://cardano-preprod.blockfrost.io/api/v0/"
VITE_BLOCKFROST_KEY="your_blockfrost_preprod_key"
VITE_SEED="your_test_wallet_seed_phrase"
VITE_MAESTRO_KEY="your_maestro_key"
VITE_BLOCKFROST_KEY_MAINNET="your_blockfrost_mainnet_key"
VITE_KUPO_URL="your_kupo_endpoint_url"
VITE_OGMIOS_URL="your_ogmios_endpoint_url"
```

Under `packages/provider`, create an `.env` file with the following variables:

```
VITE_KUPO_URL="your_kupo_endpoint_url"
VITE_OGMIOS_URL="your_ogmios_endpoint_url"
```

#### Step 2: Obtain Required Keys

- **Blockfrost**: Register at [blockfrost.io](https://blockfrost.io) to get API keys for both Preprod and Mainnet
- **Maestro**: Get an API key from [gomaestro.org](https://www.gomaestro.org)
- **Kupo & Ogmios**: For these services, you'll need the full authenticated HTTP endpoint URLs, not just API keys. You can run these services locally or use a provider that offers them.
- **Test Wallet**: Create a test wallet with funds on the Preprod network for on-chain tests

### Running Tests

```bash
# Run all tests across packages
pnpm test

# Run tests for a specific package
pnpm --filter @evolution-sdk/lucid test

# Run a specific test file
pnpm --filter @evolution-sdk/lucid test -- path/to/test/file.test.ts

# Run tests in watch mode
pnpm --filter @evolution-sdk/lucid test -- --watch
```

### Testing Without API Keys

Many unit tests and emulator-based tests will run without external API keys. The test suite is designed to skip on-chain tests if the required environment variables are not present. This allows you to:

1. Develop and test core functionality without requiring external resources
2. Run the CI pipeline without exposing sensitive API keys
3. Focus on specific test suites during development

## Reporting Bugs

We use GitHub issues to track bugs. Report a bug by [opening a new issue](https://github.com/no-witness-labs/evolution-sdk/issues/new).

### Bug Report Guidelines

A good bug report should include:

- A quick summary and/or background
- Steps to reproduce
  - Be specific
  - Provide sample code if possible
- What you expected would happen
- What actually happens
- Notes (including why you think this might be happening, or what you've tried that didn't work)

## Suggesting Enhancements

We welcome suggestions for enhancements. Please create an issue to discuss your idea before making significant changes.

## Documentation

Improving documentation is a great way to contribute. This includes both inline code comments and our external documentation. Update the documentation in the `docs` folder for any user-facing changes. Using changesets to document your changes helps both you and the maintainers to have a better overview of the idea you are contributing.

Run `pnpm changeset` to create a new changeset (this is required for CI).

## License

By contributing to Evolution SDK, you agree that your contributions will be licensed under its MIT License.

## Questions?

Don't hesitate to ask. You can open an issue or reach out to the maintainers directly. No Witness Labs team and community actively discuss our opinions in our [Discord](https://discord.gg/eqZDvHvW6k).

Thank you for contributing to Evolution SDK!
