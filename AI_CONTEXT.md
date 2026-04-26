# AI CONTEXT - SAP BTP CAP Template

> **⚠️ LLM FIRST READ**: This is the primary reference document for AI assistants working on this project. Read this file FIRST before making any suggestions or changes.

## Table of Contents

- [Project Overview](#project-overview)
- [Critical Design Decisions](#critical-design-decisions)
- [TypeScript Configuration](#typescript-configuration)
- [Testing Architecture](#testing-architecture)
- [Common Patterns](#common-patterns)
- [Known Issues & Solutions](#known-issues--solutions)
- [Adding New Features](#adding-new-features)
- [DO NOT DO](#do-not-do)

---

## Project Overview

### Purpose

A production-ready SAP BTP CAP (Cloud Application Programming) template with **TypeScript-first** architecture and comprehensive testing support.

### Key Characteristics

- **TypeScript Only**: All service handlers and tests MUST be in TypeScript (.ts files)
- **Test-Driven**: Jest with ts-jest for unit and integration testing
- **CAP Service Architecture**: Uses SAP CDS for service definitions
- **SQLite for Development**: In-memory database for fast local development and testing

### Project Structure

```
sample/
├── srv/              # Service implementations (TypeScript only)
│   ├── cat-service.cds    # Service definition (CDS)
│   └── cat-service.ts     # Service implementation (TypeScript)
├── db/               # Database schema and seed data
│   ├── schema.cds
│   └── data/
├── test/             # All tests in TypeScript
│   ├── unit/             # Unit tests (*.test.ts)
│   ├── integration/      # Integration tests (*.test.ts)
│   └── utils/            # Test utilities (TypeScript)
├── tsconfig.json     # TypeScript configuration
└── jest.config.js    # Jest test configuration with ts-jest
```

---

## Critical Design Decisions

### 1. TypeScript-First Architecture

**Decision**: All code (services, tests, utilities) MUST be TypeScript.

**Rationale**:

- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Easier refactoring and maintenance
- Industry best practice for enterprise applications

**Implementation**:

- Service handlers: `srv/*.ts` (NOT .js)
- Tests: `test/**/*.test.ts` (NOT .test.js)
- Utilities: `test/utils/*.ts`
- Type definitions inline or in interfaces

### 2. Simplified Package Scripts

**Decision**: Removed complex bootstrap scripts in favor of simple, cross-platform commands.

**Rationale**:

- Previous Unix/Windows split scripts were overly complex
- Modern npm handles most dependency management automatically
- Simpler = fewer bugs and easier maintenance

**Current Scripts** (root package.json):

```json
{
  "install": "npm install --prefix sample",
  "dev": "cd sample && cds watch",
  "test": "cd sample && npm test",
  "clean": "rm -rf node_modules ..."
}
```

### 3. Jest with ts-jest

**Decision**: Use ts-jest for direct TypeScript test execution (no compilation step).

**Rationale**:

- Tests run directly from .ts files
- No separate build step needed
- Faster development cycle
- Better error messages with source maps

**Configuration**: See `sample/jest.config.js`

### 4. Test Structure

**Decision**: Separate unit and integration tests with shared utilities.

**Structure**:

```
test/
├── unit/              # Pure logic tests, no CAP service dependency
├── integration/       # Full service tests using cds.test()
└── utils/            # Shared test helpers (TypeScript)
```

**Why**:

- Clear separation of concerns
- Faster unit test execution
- Integration tests for E2E scenarios
- Reusable test utilities

---

## TypeScript Configuration

### tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2022", // Modern JavaScript features
    "module": "Node16", // Node.js module resolution
    "moduleResolution": "Node16", // Proper import handling
    "strict": true, // Full type checking
    "esModuleInterop": true, // CommonJS/ESM interop
    "types": ["node", "jest"] // Global types
  }
}
```

### Key Settings Explained

- **`module: "Node16"`**: Enables proper handling of both ESM and CommonJS
- **`esModuleInterop: true`**: Allows `import cds from '@sap/cds'` syntax
- **`strict: true`**: Maximum type safety (recommended)
- **`outDir: "./gen/srv"`**: Compiled output (not used in tests)

### Import Patterns

**✅ CORRECT**:

```typescript
import cds from '@sap/cds'
import { getTestUser } from '../utils/test-helper'
```

**❌ WRONG**:

```typescript
const cds = require('@sap/cds') // Don't use require in TypeScript
```

---

## Testing Architecture

### Test File Naming

- Unit tests: `test/unit/*.test.ts`
- Integration tests: `test/integration/*.test.ts`
- Test utilities: `test/utils/*.ts` (NO .test suffix)

### Integration Test Pattern

```typescript
import cds from '@sap/cds'

describe('Service Tests', () => {
  // Setup test client with in-memory database
  const { GET, POST } = cds.test(__dirname + '/../..', '--in-memory')

  it('should test endpoint', async () => {
    const response = await GET('/catalog/Books')
    expect(response.status).toBe(200)
  })
})
```

### Unit Test Pattern

```typescript
// No CAP dependencies, pure logic testing
describe('Logic Tests', () => {
  it('should validate data', () => {
    const result = myFunction(input)
    expect(result).toBe(expected)
  })
})
```

### Test Utilities Pattern

See `test/utils/test-helper.ts`:

```typescript
export interface TestUser {
  username: string
  password: string
  attr: { roles: string[] }
}

export function getTestUser(name: string, roles: string[]): TestUser {
  return { username: name, password: '', attr: { roles } }
}

export const ADMIN_USER = getTestUser('admin', ['Admin'])
```

**Benefits**:

- Type-safe test data generation
- Reusable across all tests
- Preset users for common scenarios

---

## Common Patterns

### Service Handler Pattern

**File**: `srv/cat-service.ts`

```typescript
import cds from '@sap/cds'

// Define interfaces for type safety
interface Book {
  ID: number
  title?: string
  stock?: number
}

export default cds.service.impl(async function (this: cds.Service) {
  const { Books } = this.entities

  // Before hook
  this.before('READ', Books, async req => {
    // Logic before READ
  })

  // After hook
  this.after('READ', Books, async (books: Book | Book[]) => {
    // Modify response
    return books
  })

  // Custom action
  this.on('customAction', async req => {
    const { param } = req.data
    // Business logic
    return { result: 'success' }
  })
})
```

### Type Definitions

**Where to Define Types**:

1. **Service-specific**: Inline in service file
2. **Shared types**: Create `srv/types.ts`
3. **Test types**: In test files or `test/utils/types.ts`

**Example - Inline Types**:

```typescript
interface SubmitOrderRequest {
  book: number
  quantity: number
}

interface SubmitOrderResponse {
  message: string
  book: string
  quantity: number
}
```

### CDS Global Types

CAP provides global query builders. These are declared in jest.config.js:

```javascript
globals: {
  cds: true,
  SELECT: true,
  INSERT: true,
  UPDATE: true,
  DELETE: true,
}
```

**Usage**:

```typescript
// No import needed, globally available
const book = await SELECT.one.from(Books).where({ ID: 1 })
await UPDATE(Books).set({ stock: 10 }).where({ ID: 1 })
```

---

## Known Issues & Solutions

### Issue 1: "Cannot find module" in Tests

**Symptom**: Tests fail with module resolution errors

**Solution**:

```bash
cd sample
npm install
```

**Why**: ts-jest needs dependencies installed for module resolution.

---

### Issue 2: CDS Globals Not Recognized

**Symptom**: TypeScript errors on `SELECT`, `UPDATE`, etc.

**Solution**: Ensure `jest.config.js` includes globals:

```javascript
globals: {
  SELECT: true,
  UPDATE: true,
  // ...
}
```

**Alternative**: Create `srv/globals.d.ts`:

```typescript
declare const SELECT: any
declare const UPDATE: any
declare const INSERT: any
declare const DELETE: any
```

---

### Issue 3: Test Timeout

**Symptom**: `Timeout - Async callback was not invoked within the 5000ms timeout`

**Solution**: Increase timeout in test file:

```typescript
jest.setTimeout(60000) // 60 seconds
```

**Why**: CAP service initialization can be slow, especially first run.

---

### Issue 4: Database Locked (SQLite)

**Symptom**: `SQLITE_BUSY: database is locked`

**Solution**: Use `.env.local` with shared database path:

```
cds_requires_db_credentials_url=.db/sample-dev.db
```

**Why**: Each test should use the same DB instance for draft operations.

---

## Adding New Features

### Add a New Service

1. **Create CDS Definition**: `srv/my-service.cds`

   ```cds
   service MyService {
     entity Items as projection on db.Items;
   }
   ```

2. **Create TypeScript Handler**: `srv/my-service.ts`

   ```typescript
   import cds from '@sap/cds'

   export default cds.service.impl(async function (this: cds.Service) {
     const { Items } = this.entities
     // Implement handlers
   })
   ```

3. **Create Tests**: `test/integration/my-service.test.ts`

   ```typescript
   import cds from '@sap/cds'

   describe('MyService Tests', () => {
     const { GET } = cds.test(__dirname + '/../..', '--in-memory')

     it('should work', async () => {
       const response = await GET('/my/Items')
       expect(response.status).toBe(200)
     })
   })
   ```

### Add a New Entity

1. **Update Schema**: `db/schema.cds`

   ```cds
   entity Items {
     key ID: Integer;
     name: String;
   }
   ```

2. **Add Seed Data**: `db/data/my.namespace-Items.csv`

   ```csv
   ID;name
   1;Item 1
   2;Item 2
   ```

3. **Update Service**: Expose in CDS and add handlers

### Add Test Utilities

1. **Create Utility**: `test/utils/my-helper.ts`

   ```typescript
   export function createTestData(params: any) {
     // Helper logic
     return data
   }
   ```

2. **Use in Tests**:

   ```typescript
   import { createTestData } from '../utils/my-helper'

   it('should test', () => {
     const data = createTestData({ ... })
     expect(data).toBeDefined()
   })
   ```

---

## DO NOT DO

### ❌ Never Create JavaScript Files

**DON'T**:

- Create `.js` files in `srv/`
- Create `.test.js` files
- Use `require()` in new code

**DO**:

- Always use `.ts` extension
- Use `import/export` syntax
- Type your functions and interfaces

### ❌ Don't Skip Type Definitions

**DON'T**:

```typescript
this.on('action', async req => {
  const data = req.data // Untyped
})
```

**DO**:

```typescript
interface ActionRequest {
  param: string
}

this.on('action', async req => {
  const { param } = req.data as ActionRequest
})
```

### ❌ Don't Modify Core Config Without Understanding

**Files to be careful with**:

- `tsconfig.json` - TypeScript compilation settings
- `jest.config.js` - Test framework configuration
- `package.json` - Dependencies and scripts

**Always**:

- Read this document first
- Understand why settings exist
- Test after any config changes

### ❌ Don't Mix Test Types

**DON'T**:

- Put unit tests in `test/integration/`
- Use `cds.test()` in unit tests
- Create circular dependencies

**DO**:

- Keep unit tests pure and fast
- Use integration tests for CAP service testing
- Maintain clear boundaries

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Watch mode for tests
cd sample && npm run test:watch

# Build TypeScript (if needed)
cd sample && npm run build

# Format code
npm run format

# Clean install
npm run clean && npm install
```

---

## Summary for LLMs

When working on this project:

1. ✅ **READ THIS FILE FIRST** before suggesting any changes
2. ✅ **Use TypeScript** for ALL new code (services, tests, utilities)
3. ✅ **Follow patterns** documented in this file
4. ✅ **Type your code** - interfaces and type annotations required
5. ✅ **Write tests** for all new features (unit + integration)
6. ✅ **Use test utilities** from `test/utils/` when available
7. ✅ **Keep it simple** - avoid over-engineering
8. ❌ **Never create .js files** - TypeScript only
9. ❌ **Don't modify configs** without understanding impact
10. 📝 **Update this file** when you discover new patterns or solutions

---

## Document History

| Date       | Change              | Reason                                            |
| ---------- | ------------------- | ------------------------------------------------- |
| 2026-04-26 | Initial creation    | Converted project to TypeScript, needed LLM guide |
| 2026-04-26 | Added test patterns | Documented testing architecture                   |
| 2026-04-26 | Added common issues | Documented solutions to recurring problems        |

---

**Last Updated**: 2026-04-26  
**Maintained By**: Project maintainers and AI assistants  
**Purpose**: First reference for all AI assistants working on this codebase
