# Farm Connect - Multi-Platform Agriculture Marketplace

Farm Connect is a comprehensive agricultural marketplace platform connecting farmers with buyers through multiple channels including web, mobile, and WhatsApp.

## Project Structure

```
farmconnect/
├── docs/                    # Documentation
├── farmconnect_backend/     # Core backend services
│   ├── api/                 # Express.js API
│   ├── price-service/       # FastAPI price service
│   └── shared/              # Shared code and utilities
├── farmconnect_webapp/      # Web application (Next.js)
├── farmconnect_mobileapp/   # Mobile application (React Native)
└── farmconnect_whatsapp/    # WhatsApp integration
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Docker (optional, for containerization)

### Installation

1. **Backend Setup**
```bash
cd farmconnect_backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

2. **Web App Setup**
```bash
cd ../farmconnect_webapp
npm install
npm run dev
```

3. **Mobile App Setup**
```bash
cd ../farmconnect_mobileapp
npm install
npx react-native run-android  # or npx react-native run-ios
```

## Development Workflow

1. Create a new branch for your feature/fix
2. Make your changes
3. Run tests
4. Submit a pull request

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
