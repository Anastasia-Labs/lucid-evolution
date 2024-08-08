# Contributing to Lucid Evolution

Amazing to hear that you're interested in contributing to Lucid Evolution!

This document outlines how you can contribute to make Lucid Evolution better than it was before. Lucid Evolution is a monorepo, make sure you're working in the correct package when making changes. Maintain backwards compatibility unless explicitly discussed and agreed upon for a major version change and when possible be mindful of performance implications, especially for core functionality

## Ways to Contribute

- Reporting bugs
- Suggesting enhancements
- Improving documentation
- Submitting code changes
- Discussing the current state of the code

## Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests

### Pull Requests

Pull requests are the best way to propose changes. Write clear, concise commit messages. Following the conventional commits specification is a valuable best practice, we actively welcome your pull requests:

1. Fork the repo and create your branch. Naming your branches with a prefix indicating the type of change (e.g., feature/, bugfix/, docs/) followed by a brief description greatly helps the maintainers
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Write and update tests for your changes. Run `pnpm test` to ensure all tests pass
5. Make sure your code lints
6. Ensure your changes pass all CI checks before requesting a review
7. Issue your suggestion

### Coding Style

- Follow the existing coding style in the project
- Adhere to the ESLint configuration provided in the repository
- Run `pnpm run lint` / `pnpm list` to ensure your code follows our style guidelines
- Run `pnpm format` (with Prettier) / `pnpm format-check` to format your code

## Reporting Bugs

We use GitHub issues to track bugs. Report a bug by [opening a new issue](https://github.com/Anastasia-Labs/lucid-evolution/issues/new)

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

We welcome suggestions for enhancements. Please create an issue to discuss your idea before making significant changes

## Documentation

Improving documentation is a great way to contribute. This includes both inline code comments and our external documentation. Update the documentation in the `docs` folder for any user-facing changes. Using changesets to document your changes help both you and the mainters to have a better overview for the idea you are contributing with

(Run `pnpm changeset` to create a new changeset this is required for CI)

## License

By contributing to Lucid Evolution, you agree that your contributions will be licensed under its MIT License

## Questions?

Don't hesitate to ask. You can open an issue or reach out to the maintainers directly. Anastasia Labs team and community actively discuss our opinions in our [discord](https://discord.gg/gRt4ppqh)

Thank you for contributing to Lucid Evolution!
