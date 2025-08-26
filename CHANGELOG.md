# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Initial project setup with backend structure
- Basic database models (User, Product, Order, Price)
- CI/CD workflow with GitHub Actions
- Project documentation (README, CONTRIBUTING, CODE_OF_CONDUCT)

## [0.1.0] - 2025-08-26
### Added
- Initial project structure
- Backend setup with Express.js
- Database configuration with PostgreSQL
- Basic API structure
- Authentication system
- Product and Order management
- Price tracking service
- Web application setup (Next.js)
- Mobile application setup (React Native)
- WhatsApp integration setup
- Documentation and contribution guidelines

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## How to Update This Changelog

For new releases, please follow these steps:

1. Update the `[Unreleased]` section with the changes
2. Add a new `[x.y.z]` section with the release date
3. Update the `version` in `package.json`
4. Create a new git tag: `git tag -a vx.y.z -m "Release x.y.z"`
5. Push the tag: `git push origin vx.y.z`

## Types of Changes

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security-related changes
