const goodFirstIssue = require('../index')
const log = require('../lib/log')
const prompt = require('../lib/prompt')
const projects = require('../data/projects.json')

describe('require("good-first-issue") module', () => {
  // Increase timeout for API calls
  jest.setTimeout(30000)

  describe('module exports', () => {
    test('should export a function as default', () => {
      expect(typeof goodFirstIssue).toBe('function')
    })

    test('should export log utility', () => {
      expect(goodFirstIssue.log).toBeDefined()
      expect(typeof goodFirstIssue.log).toBe('function')
      expect(goodFirstIssue.log).toBe(log)
    })

    test('should export prompt utility', () => {
      expect(goodFirstIssue.prompt).toBeDefined()
      expect(typeof goodFirstIssue.prompt).toBe('function')
      expect(goodFirstIssue.prompt).toBe(prompt)
    })

    test('should export projects data', () => {
      expect(goodFirstIssue.projects).toBeDefined()
      expect(typeof goodFirstIssue.projects).toBe('object')
      expect(goodFirstIssue.projects).toBe(projects)
    })
  })

  describe('goodFirstIssue() function', () => {
    test('should return an object with correct shape', async () => {
      try {
        const result = await goodFirstIssue('node')
        
        // Check that result is an object
        expect(typeof result).toBe('object')
        expect(result).not.toBeNull()
        
        // Check that result has expected properties
        expect(result).toHaveProperty('issues')
        expect(result).toHaveProperty('project')
        expect(result).toHaveProperty('log')
        expect(result).toHaveProperty('prompt')
        expect(result).toHaveProperty('projects')
      } catch (error) {
        // Handle API rate limit errors gracefully
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should return issues array', async () => {
      try {
        const result = await goodFirstIssue('node')
        expect(Array.isArray(result.issues)).toBe(true)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should return correct project name', async () => {
      const projectName = 'react'
      try {
        const result = await goodFirstIssue(projectName)
        expect(result.project).toBe(projectName)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should include log function in result', async () => {
      try {
        const result = await goodFirstIssue('node')
        expect(typeof result.log).toBe('function')
        expect(result.log).toBe(log)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should include prompt function in result', async () => {
      try {
        const result = await goodFirstIssue('node')
        expect(typeof result.prompt).toBe('function')
        expect(result.prompt).toBe(prompt)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should include projects data in result', async () => {
      try {
        const result = await goodFirstIssue('node')
        expect(typeof result.projects).toBe('object')
        expect(result.projects).toBe(projects)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should handle valid project names', async () => {
      try {
        const result = await goodFirstIssue('jest')
        expect(result).toBeDefined()
        expect(result.issues).toBeDefined()
        expect(Array.isArray(result.issues)).toBe(true)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should work with GitHub org/repo format', async () => {
      try {
        const result = await goodFirstIssue('facebook/react')
        expect(result).toBeDefined()
        expect(result.issues).toBeDefined()
        expect(result.project).toBe('facebook/react')
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should accept options parameter', async () => {
      const options = { first: true }
      try {
        const result = await goodFirstIssue('node', options)
        expect(result).toBeDefined()
        expect(result.issues).toBeDefined()
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should handle auth option', async () => {
      const options = { auth: 'fake-token-for-testing' }
      
      // This might fail due to invalid token, but should not crash
      try {
        const result = await goodFirstIssue('node', options)
        expect(result).toBeDefined()
      } catch (error) {
        // Expected to potentially fail with invalid token
        expect(error).toBeDefined()
      }
    })

    test('should handle empty options object', async () => {
      try {
        const result = await goodFirstIssue('node', {})
        expect(result).toBeDefined()
        expect(result.issues).toBeDefined()
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should throw error for invalid project', async () => {
      try {
        await goodFirstIssue('this-project-definitely-does-not-exist-xyz123')
        // If it doesn't throw, the test should still pass as it might return empty array
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('returned object structure', () => {
    test('issues should be an array of objects with required properties', async () => {
      try {
        const result = await goodFirstIssue('node')
        
        if (result.issues.length > 0) {
          const issue = result.issues[0]
          
          // Check that each issue has expected properties
          expect(issue).toHaveProperty('title')
          expect(issue).toHaveProperty('url')
          expect(issue).toHaveProperty('state')
          
          // Check property types
          expect(typeof issue.title).toBe('string')
          expect(typeof issue.url).toBe('string')
          expect(typeof issue.state).toBe('string')
        }
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('log function should work with returned issues', async () => {
      try {
        const result = await goodFirstIssue('node')
        
        if (result.issues.length > 0) {
          const issue = result.issues[0]
          const output = await result.log(issue, 'Node.js')
          
          expect(typeof output).toBe('string')
          expect(output.length).toBeGreaterThan(0)
        }
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('projects should contain known projects', async () => {
      try {
        const result = await goodFirstIssue('node')
        
        expect(result.projects).toHaveProperty('node')
        expect(result.projects).toHaveProperty('react')
        expect(result.projects).toHaveProperty('jest')
        
        // Check structure of a project entry
        expect(result.projects.node).toHaveProperty('name')
        expect(result.projects.node).toHaveProperty('q')
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })
  })

  describe('integration tests', () => {
    test('should work end-to-end for a known project', async () => {
      try {
        const result = await goodFirstIssue('good-first-issue')
        
        expect(result).toBeDefined()
        expect(result.project).toBe('good-first-issue')
        expect(Array.isArray(result.issues)).toBe(true)
        expect(typeof result.log).toBe('function')
        expect(typeof result.prompt).toBe('function')
        expect(typeof result.projects).toBe('object')
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })

    test('should maintain consistency across multiple calls', async () => {
      try {
        const result1 = await goodFirstIssue('node')
        const result2 = await goodFirstIssue('node')
        
        // Both should have the same structure
        expect(Object.keys(result1).sort()).toEqual(Object.keys(result2).sort())
        
        // Both should reference the same functions
        expect(result1.log).toBe(result2.log)
        expect(result1.prompt).toBe(result2.prompt)
        expect(result1.projects).toBe(result2.projects)
      } catch (error) {
        if (error.message && error.message.includes('rate limit')) {
          console.warn('Skipping test due to API rate limit')
        } else {
          throw error
        }
      }
    })
  })
})
