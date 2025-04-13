# Eloquent

A vocabulary learning app built with React Native and Expo that helps native English speakers learn more advanced vocabulary through a flashcard-style spaced repetition system.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your Firebase and Google API credentials

### Development

```bash
# Start development server
npm run start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web

# Run with development client
npm run dev
```

### Environment Configuration

The app supports multiple environments:

- Create a `.env.development` file for development environment
- Create a `.env.production` file for production environment

Set the `APP_ENV` variable to switch between environments:

```bash
# For development
APP_ENV=development expo start

# For production
APP_ENV=production expo start
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run typecheck
```

## Building

```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios

# Build for web
npm run build:web
```

## Project Structure

- `components/`: UI components
- `hooks/`: Custom React hooks
- `services/`: API and service modules
- `types/`: TypeScript type definitions
- `utils/`: Utility functions

## Features

- User authentication via Firebase
- Word learning with progress tracking
- Word pronunciation via Google Text-to-Speech API
- Adaptive learning based on user skill level
- Word search and browsing