// Load .env.local before any test runs.
// This sets cds_requires_db_credentials_url=.db/sample-dev.db so integration tests
// use the shared file-based SQLite — required for draft operations (PATCH/draftActivate)
// which need the same DB instance that POST wrote to.
const path = require('node:path')
const fs = require('node:fs')
const envLocal = path.resolve(__dirname, '.env.local')
if (fs.existsSync(envLocal)) {
  require('dotenv').config({ path: envLocal, override: true })
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/unit/**/*.test.ts', '**/test/integration/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          allowJs: true,
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['srv/**/*.ts', 'srv/**/*.js', 'test/utils/**/*.ts', '!srv/external/**', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  globals: {
    cds: true,
    SELECT: true,
    INSERT: true,
    UPDATE: true,
    DELETE: true,
  },
}
