/**
 * Test Helper Utilities
 *
 * Common utilities for CAP tests
 */

import cds from '@sap/cds'

interface UserAttributes {
  roles: string[]
}

export interface TestUser {
  username: string
  password: string
  attr: UserAttributes
}

/**
 * Get a test user with specific attributes
 * @param username - Username
 * @param roles - User roles
 * @returns User object for testing
 */
export function getTestUser(username: string = 'testuser', roles: string[] = []): TestUser {
  return {
    username,
    password: '',
    attr: {
      roles,
    },
  }
}

/**
 * Admin user preset
 */
export const ADMIN_USER: TestUser = getTestUser('admin', ['Admin'])

/**
 * Regular user preset
 */
export const REGULAR_USER: TestUser = getTestUser('user', ['User'])

export { cds }
