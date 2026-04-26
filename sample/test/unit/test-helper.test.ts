import { getTestUser, ADMIN_USER, REGULAR_USER } from '../utils/test-helper'

describe('Test Helper Unit Tests', () => {
  describe('getTestUser', () => {
    it('should create a test user with default values', () => {
      const user = getTestUser()

      expect(user).toBeDefined()
      expect(user.username).toBe('testuser')
      expect(user.password).toBe('')
      expect(user.attr.roles).toEqual([])
    })

    it('should create a test user with custom values', () => {
      const user = getTestUser('customuser', ['Admin', 'User'])

      expect(user.username).toBe('customuser')
      expect(user.attr.roles).toEqual(['Admin', 'User'])
    })
  })

  describe('Preset Users', () => {
    it('should have ADMIN_USER preset', () => {
      expect(ADMIN_USER.username).toBe('admin')
      expect(ADMIN_USER.attr.roles).toContain('Admin')
    })

    it('should have REGULAR_USER preset', () => {
      expect(REGULAR_USER.username).toBe('user')
      expect(REGULAR_USER.attr.roles).toContain('User')
    })
  })
})
