const issue = {
  title: 'Open browser for the selected issue',
  pr: 12,
  state: 'open',
  url: 'https://github.com/cutenode/good-first-issue/issues/12',
  labels: [],
  assignee: null,
  assignees: [],
  locked: false
}

const mockGfi = jest.fn(() => Promise.resolve([issue]))
const mockOpen = jest.fn()
const mockLog = jest.fn(() => Promise.resolve('formatted output'))

jest.mock('libgfi', () => mockGfi)
jest.mock('open', () => mockOpen)
jest.mock('../lib/log', () => mockLog)

jest.mock('commander', () => {
  let actionHandler
  const cli = {
    version: jest.fn(() => cli),
    description: jest.fn(() => cli),
    arguments: jest.fn(() => cli),
    option: jest.fn(() => cli),
    action: jest.fn(handler => {
      actionHandler = handler
      return cli
    }),
    parse: jest.fn(async argv => {
      const args = argv.slice(2)
      const options = {
        open: args.includes('--open'),
        first: args.includes('--first'),
        auth: null
      }
      const project = args.find(arg => !arg.startsWith('-'))
      return actionHandler(project, options)
    })
  }

  return cli
})

describe('good-first-issue CLI', () => {
  const originalArgv = process.argv
  const originalExitCode = process.exitCode
  const originalConsoleLog = console.log
  const originalConsoleError = console.error

  beforeEach(() => {
    jest.resetModules()
    process.argv = ['node', 'good-first-issue', 'react', '--open']
    process.exitCode = undefined
    console.log = jest.fn()
    console.error = jest.fn()
    mockGfi.mockClear()
    mockOpen.mockClear()
    mockLog.mockClear()
  })

  afterAll(() => {
    process.argv = originalArgv
    process.exitCode = originalExitCode
    console.log = originalConsoleLog
    console.error = originalConsoleError
  })

  test('opens the selected issue URL and exits cleanly with --open', async () => {
    require('../bin/good-first-issue')
    await new Promise(resolve => setImmediate(resolve))

    expect(mockGfi).toHaveBeenCalledWith('react', expect.objectContaining({
      projects: expect.any(Object)
    }))
    expect(mockLog).toHaveBeenCalledWith(issue, 'React')
    expect(mockOpen).toHaveBeenCalledWith(issue.url)
    expect(process.exitCode).toBe(0)
  })
})
