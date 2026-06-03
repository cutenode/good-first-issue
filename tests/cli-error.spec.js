jest.mock('libgfi', () => jest.fn())

const gfi = require('libgfi')

const originalArgv = process.argv.slice()
const originalExitCode = process.exitCode

afterEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
  process.argv = originalArgv.slice()
  process.exitCode = originalExitCode
})

test('shows a friendly message when the GitHub API request fails', async () => {
  gfi.mockRejectedValue(Object.assign(new Error('API rate limit exceeded for 127.0.0.1.'), {
    status: 403
  }))

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  process.argv = ['node', 'bin/good-first-issue.js', 'thisisntarealprojectorgithuborg']

  delete require.cache[require.resolve('../bin/good-first-issue')]
  require('../bin/good-first-issue')

  await new Promise(resolve => setImmediate(resolve))

  expect(errorSpy).toHaveBeenCalledWith(
    expect.stringContaining('Unable to fetch issues for "thisisntarealprojectorgithuborg".')
  )
  expect(errorSpy).toHaveBeenCalledWith(
    expect.stringContaining('Please check the project name, your network connection, or your GitHub API rate limit.')
  )
  expect(process.exitCode).toBe(1)
})
