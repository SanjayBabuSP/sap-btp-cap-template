# SAP BTP CAP Template

A template project for SAP BTP CAP applications with unit testing support.

## Project Structure

```
.
├── sample/                  # Main CAP application
│   ├── app/                # UI applications
│   ├── db/                 # Database models and data
│   ├── srv/                # Service definitions and handlers
│   └── test/               # Test suites
│       ├── unit/           # Unit tests
│       ├── integration/    # Integration tests
│       └── utils/          # Test utilities
├── package.json            # Root package with bootstrap scripts
└── .eslintrc              # ESLint configuration
```

## Prerequisites

- Node.js (v18, v20, or v22)
- npm (v10+)

## Getting Started

### Initial Setup (Unix/Linux/Mac)

```bash
npm run bootstrap:unix
```

### Initial Setup (Windows)

```powershell
npm run bootstrap:win
```

This will:

- Clean up any existing lock files and node_modules
- Install all dependencies
- Build the project

## Development

### Start Development Server

```bash
npm run dev
```

Or from the sample folder:

```bash
cd sample
npm start
```

### Run Tests

Run all tests with coverage:

```bash
npm test
```

Run only unit tests:

```bash
npm run test:unit
```

Run only integration tests:

```bash
npm run test:integration
```

### Watch Mode for Tests

```bash
cd sample
npm run test:watch
```

## Testing

This project uses Jest for testing. Test structure follows CAP best practices:

- **Unit Tests** (`test/unit/`): Test individual functions and modules in isolation
- **Integration Tests** (`test/integration/`): Test services and API endpoints
- **Test Utils** (`test/utils/`): Shared test utilities and helpers

### Example Test

```javascript
const cds = require('@sap/cds')

describe('My Service', () => {
  const { GET, POST } = cds.test(__dirname + '/../..')

  it('should retrieve data', async () => {
    const response = await GET('/catalog/Books')
    expect(response.status).toBe(200)
  })
})
```

## Scripts

### Root Level

- `npm run bootstrap:unix` - Initial setup on Unix systems
- `npm run bootstrap:win` - Initial setup on Windows
- `npm run dev` - Start development server
- `npm test` - Run all tests
- `npm run clean:unix` - Clean all node_modules and lock files (Unix)
- `npm run clean:win` - Clean all node_modules and lock files (Windows)
- `npm run pretty` - Format all code with Prettier

### Sample Project

- `npm start` - Start CDS server
- `npm test` - Run all tests with coverage
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:watch` - Run tests in watch mode

## Environment Variables

- `.env` - Static environment variables (committed to git)
- `.env.local` - Local development overrides (ignored by git)

## Code Quality

- **ESLint**: Linting for JavaScript code
- **Prettier**: Code formatting
- **Jest**: Testing framework with coverage reporting

## License

See LICENSE file
