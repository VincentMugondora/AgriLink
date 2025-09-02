# Contributing to AgriLink

First off, thanks for taking the time to contribute! :tada: :+1:

The following is a set of guidelines for contributing to AgriLink, which is hosted on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/VincentMugondora/AgriLink/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/VincentMugondora/AgriLink/issues/new). Be sure to include:
  - A clear and descriptive title
  - A description of the expected behavior
  - Steps to reproduce the issue
  - Any relevant screenshots or logs

### Suggesting Enhancements

- Use GitHub Issues to submit enhancement suggestions
- Include as many details as possible, including:
  - What problem this enhancement solves
  - Any alternative solutions you've considered
  - Any additional context or screenshots

### Your First Code Contribution

1. **Fork** the repository on GitHub
2. **Clone** the project to your own machine
3. **Create a branch** for your feature or bugfix
4. **Commit** your changes to that branch
5. **Push** your work back up to your fork
6. Submit a **Pull Request** so we can review your changes

### Pull Request Process

1. Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
2. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
3. Update the CHANGELOG.md with details of changes to the interface.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Development Setup

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Git

### Installation

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd farmconnect_backend
   npm install
   
   # Web App
   cd ../farmconnect_webapp
   npm install
   
   # Mobile App
   cd ../farmconnect_mobileapp
   npm install
   ```
3. Set up environment variables (copy .env.example to .env and update values)
4. Start the development servers

## Coding Conventions

- Follow the existing code style (indentation, spacing, etc.)
- Write clear commit messages
- Comment your code where necessary
- Write tests for new features
- Ensure all tests pass before submitting a pull request

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
