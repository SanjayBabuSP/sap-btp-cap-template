# Quick Start Guide

## Initial Setup

### Unix/Linux/Mac

```bash
cd /home/sanjaybabu/sap-btp-cap-template
npm run bootstrap:unix
```

### Windows

```powershell
cd /home/sanjaybabu/sap-btp-cap-template
npm run bootstrap:win
```

## Daily Development Commands

### Start Development Server

```bash
npm run dev
# or
cd sample && npm start
```

### Run Tests

```bash
# All tests with coverage
npm test

# Only unit tests
npm run test:unit

# Only integration tests
npm run test:integration

# Watch mode (from sample folder)
cd sample && npm run test:watch
```

## Project Structure

```
sap-btp-cap-template/
├── .eslintrc                 # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .gitignore               # Git ignore rules
├── .npmrc                   # npm configuration
├── package.json             # Root package with bootstrap scripts
├── SETUP.md                 # Detailed setup documentation
└── sample/                  # CAP application
    ├── .env                 # Static environment variables
    ├── .env.local          # Local dev overrides (gitignored)
    ├── .npmrc              # npm configuration
    ├── jest.config.js      # Jest test configuration
    ├── package.json        # Sample app dependencies
    ├── app/                # UI applications
    ├── db/                 # Database schema and data
    ├── srv/                # Service definitions and handlers
    │   ├── cat-service.cds
    │   └── cat-service.js
    └── test/               # Test suites
        ├── integration/    # Integration tests
        │   ├── cap-smoke.test.js
        │   └── catalog-service.test.js
        ├── unit/           # Unit tests
        │   ├── test-helper.test.js
        │   └── service-handler.test.js
        └── utils/          # Test utilities
            └── test-helper.js
```

## Testing Architecture

### Test Types

1. **Unit Tests** (`test/unit/`)
   - Test individual functions and modules
   - No database or service dependencies
   - Fast execution

2. **Integration Tests** (`test/integration/`)
   - Test full service endpoints
   - Use in-memory database
   - Test business logic end-to-end

### Test Utilities (`test/utils/test-helper.js`)

```javascript
const { getTestUser, ADMIN_USER, REGULAR_USER } = require('./utils/test-helper')

// Create custom test users
const user = getTestUser('username', ['Role1', 'Role2'])

// Use preset users
const admin = ADMIN_USER
const regularUser = REGULAR_USER
```

### Example Integration Test

```javascript
const cds = require('@sap/cds')

describe('My Service', () => {
  const { GET, POST } = cds.test(__dirname + '/../..', '--in-memory')

  it('should retrieve data', async () => {
    const response = await GET('/catalog/Books')
    expect(response.status).toBe(200)
  })
})
```

## Key Scripts

### Root Level

- `npm run bootstrap:unix` - Full setup (Unix)
- `npm run bootstrap:win` - Full setup (Windows)
- `npm run dev` - Start development
- `npm test` - Run all tests
- `npm run clean:unix` - Clean everything (Unix)
- `npm run pretty` - Format code

### Sample Level

- `npm start` - Start CDS server
- `npm test` - All tests with coverage
- `npm run test:unit` - Unit tests only
- `npm run test:integration` - Integration tests only
- `npm run test:watch` - Watch mode

## Environment Files

- `.env` - Static variables (committed to git)
- `.env.local` - Local overrides (gitignored, for development)

The `.env.local` file sets:

- SQLite database location
- Authentication mode (dummy for local dev)

## Code Quality Tools

- **ESLint**: Linting (configured in `.eslintrc`)
- **Prettier**: Code formatting (configured in `.prettierrc`)
- **Jest**: Testing framework with coverage

Run formatting:

```bash
npm run pretty
```

## Coverage Reports

After running tests, coverage reports are in:

- `sample/coverage/` - Full coverage reports
- Console output shows coverage summary

## Tips

1. Always run tests before committing
2. Use `npm run test:watch` during development
3. Keep test files next to what they test when possible
4. Integration tests should cover happy paths and error cases
5. Unit tests should be fast and isolated

## Troubleshooting

### Tests failing with "Cannot find module"

```bash
npm run bootstrap:unix  # or bootstrap:win
```

### Database issues

Delete the SQLite database:

```bash
rm -rf sample/.db/
```

### Clean restart

```bash
npm run clean:unix  # or clean:win
npm run bootstrap:unix  # or bootstrap:win
```
