jest.mock('libgfi', () => jest.fn(() => Promise.resolve([])))

const gfi = require('libgfi')
const projects = require('../data/projects.json')
const goodFirstIssue = require('../index')

beforeEach(() => {
  gfi.mockClear()
})

test('should export a working libgfi wrapper with bundled projects', async () => {
  const customOptions = { auth: 'token-123', first: true }

  await goodFirstIssue('react', customOptions)

  expect(gfi).toHaveBeenCalledWith('react', {
    projects,
    ...customOptions
  })
})
