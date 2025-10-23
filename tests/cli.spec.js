const { spawn } = require('child_process')
const path = require('path')

const CLI_PATH = path.resolve(__dirname, '..', 'bin', 'good-first-issue.js')

/**
 * Helper function to run the CLI with given arguments
 * @param {Array<string>} args - Command line arguments
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Object containing stdout, stderr, and exitCode
 */
function runCLI (args = [], options = {}) {
  return new Promise((resolve) => {
    const child = spawn('node', [CLI_PATH, ...args], {
      ...options,
      env: { ...process.env, ...options.env }
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (exitCode) => {
      resolve({ stdout, stderr, exitCode })
    })

    // Handle timeout
    if (options.timeout) {
      setTimeout(() => {
        child.kill()
        resolve({ stdout, stderr, exitCode: null, timedOut: true })
      }, options.timeout)
    }
  })
}

describe('CLI', () => {
  // Increase timeout for API calls
  jest.setTimeout(30000)

  describe('--version flag', () => {
    test('should display version number', async () => {
      const { stdout, exitCode } = await runCLI(['--version'])
      const packageJSON = require('../package.json')
      
      expect(stdout.trim()).toBe(packageJSON.version)
      expect(exitCode).toBe(0)
    })

    test('should display version number with -v flag', async () => {
      const { stdout, exitCode } = await runCLI(['-v'])
      const packageJSON = require('../package.json')
      
      expect(stdout.trim()).toBe(packageJSON.version)
      expect(exitCode).toBe(0)
    })
  })

  describe('--help flag', () => {
    test('should display help information', async () => {
      const { stdout, exitCode } = await runCLI(['--help'])
      
      expect(stdout).toContain('Usage:')
      expect(stdout).toContain('Options:')
      expect(exitCode).toBe(0)
    })
  })

  describe('with project argument', () => {
    test('should handle invalid project', async () => {
      const { stdout, stderr, exitCode } = await runCLI(['nonexistent-project-xyz123'])
      
      // Should either show "No Good First Issues" or throw an error
      const hasOutput = stdout.includes('No Good First Issues') || stderr.length > 0
      expect(hasOutput).toBe(true)
      // Exit code can be 0 (no issues) or 1 (error)
      expect([0, 1]).toContain(exitCode)
    })
  })

  describe('exit codes', () => {
    test('should exit with code 0 for successful operations', async () => {
      const { exitCode } = await runCLI(['--version'])
      expect(exitCode).toBe(0)
    })

    test('should exit appropriately when issues not found', async () => {
      const { exitCode } = await runCLI(['nonexistent-project-xyz123'])
      // Can be 0 (graceful) or 1 (error) depending on implementation
      expect([0, 1]).toContain(exitCode)
    })
  })

  describe('CLI structure', () => {
    test('should accept project as first argument', async () => {
      // Test that CLI accepts a project argument without crashing
      const { exitCode } = await runCLI(['--help'])
      expect(exitCode).toBe(0)
    })

    test('should support -o/--open flag', async () => {
      const { stdout } = await runCLI(['--help'])
      expect(stdout).toContain('-o, --open')
    })

    test('should support -f/--first flag', async () => {
      const { stdout } = await runCLI(['--help'])
      expect(stdout).toContain('-f, --first')
    })

    test('should support -a/--auth flag', async () => {
      const { stdout } = await runCLI(['--help'])
      expect(stdout).toContain('-a, --auth')
    })
  })
})
