# SAP BTP CAP Template

A production-ready **TypeScript-first** template for SAP BTP CAP applications with comprehensive testing support.

> **🤖 For AI Assistants**: Please read [AI_CONTEXT.md](AI_CONTEXT.md) FIRST before making any suggestions or changes to this project.

## 📚 Documentation

- **[AI_CONTEXT.md](AI_CONTEXT.md)** - 🤖 **AI/LLM Guide** - Read this FIRST for project context, patterns, and solutions
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in minutes
- **[SETUP.md](SETUP.md)** - Detailed setup and architecture guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## ✨ Features

- ✅ **TypeScript-First** - All code in TypeScript for type safety and better DX
- ✅ **Complete Testing Setup** - Unit and integration tests with Jest + ts-jest
- ✅ **Production-Ready Structure** - Based on enterprise CAP best practices
- ✅ **Type-Safe Service Handlers** - Full TypeScript support for CAP services
- ✅ **Code Quality Tools** - ESLint, Prettier pre-configured
- ✅ **Development Environment** - Local dev with SQLite, environment files
- ✅ **Test Utilities** - Reusable test helpers and patterns
- ✅ **Coverage Reports** - Built-in code coverage tracking

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run specific test suites:

```bash
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
```

Watch mode:

```bash
cd sample && npm run test:watch
```

## 📁 Project Structure

```
sap-btp-cap-template/
├── AI_CONTEXT.md           # 🤖 LLM guide - READ THIS FIRST
├── package.json            # Root package with simplified scripts
├── sample/                 # CAP application
│   ├── srv/               # Services (TypeScript only)
│   │   ├── *.cds          # Service definitions
│   │   ├── *.ts           # Service handlers (TypeScript)
│   │   └── globals.d.ts   # CDS global type declarations
│   ├── db/                # Database models and seed data
│   ├── test/              # All tests in TypeScript
│   │   ├── unit/          # Unit tests (*.test.ts)
│   │   ├── integration/   # Integration tests (*.test.ts)
│   │   └── utils/         # Test utilities (*.ts)
│   ├── tsconfig.json      # TypeScript configuration
│   └── jest.config.js     # Jest + ts-jest configuration
```

## 🛠 Available Scripts

### Root Level

| Script                     | Description                 |
| -------------------------- | --------------------------- |
| `npm install`              | Install all dependencies    |
| `npm run dev`              | Start development server    |
| `npm test`                 | Run all tests with coverage |
| `npm run test:unit`        | Run unit tests only         |
| `npm run test:integration` | Run integration tests only  |
| `npm run build`            | Build TypeScript            |
| `npm run clean`            | Clean all dependencies      |
| `npm run format`           | Format code with Prettier   |

### Sample Level

| Script                     | Description             |
| -------------------------- | ----------------------- |
| `npm start`                | Start CDS server        |
| `npm run build`            | Compile TypeScript      |
| `npm run watch`            | Start CDS watch mode    |
| `npm test`                 | Run all tests           |
| `npm run test:unit`        | Run unit tests          |
| `npm run test:integration` | Run integration tests   |
| `npm run test:watch`       | Run tests in watch mode |

## 🔧 Configuration

- **TypeScript** - Type safety and modern features (`tsconfig.json`)
- **ESLint** - Code linting (`.eslintrc`)
- **Prettier** - Code formatting (`.prettierrc`)
- **Jest + ts-jest** - Testing with TypeScript support (`jest.config.js`)
- **npm** - Strict engine and dependencies (`.npmrc`)

## 📝 Environment Variables

- `.env` - Static configuration (committed)
- `.env.local` - Local development overrides (gitignored)

## 🤝 Contributing

1. Read [AI_CONTEXT.md](AI_CONTEXT.md) for project patterns and guidelines
2. Write code in **TypeScript only** (no .js files)
3. Add tests for new features
4. Run tests: `npm test`
5. Format code: `npm run format`
6. Commit changes

## 📄 License

See [LICENSE](LICENSE) file

---

**TypeScript-first CAP template with AI-friendly documentation**
