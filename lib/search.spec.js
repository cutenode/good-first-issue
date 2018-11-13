let issues
let search

beforeEach(() => {
  jest.resetModules()
  jest.restoreAllMocks()
  jest.resetAllMocks()
  issues = jest.fn()
  jest.doMock('@octokit/rest', () => () => {
    return {
      search: {
        issues
      }
    }
  })
  search = require('./search')
})

test('should return filtered issues', () => {
  const items = [
    {
      title: 'fooTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false
    },
    {
      title: 'barTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false
    },
    {
      title: 'bazTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true
    }
  ]

  issues.mockResolvedValue({
    data: {
      items
    }
  })

  return search({}).then(result =>
    expect(result).toEqual([
      {
        title: 'fooTitle',
        pr: 123,
        labels: 'fooLabels',
        state: 'fooState',
        repo: 'fooRepoUrl',
        url: 'fooHtmlUrl',
        assignee: null,
        assignees: 'fooAssignees',
        locked: false
      }
    ])
  )
})

test('should throw', async () => {
  const error = new Error('myError')
  issues.mockRejectedValue(error)
  await expect(search()).rejects.toEqual(error)
})
