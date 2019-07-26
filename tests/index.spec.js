const goodFirstIssue = require('..')
const nock = require('nock')

describe('goodFirstIssue', () => {
  let items
  beforeEach(() => {
    items = [{
      title: 'fooTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false
    }]

    // "Mock" network requests to the Search API
    nock('https://api.github.com')
      .get(/^\/search\/issues\?/).reply(200, { items })
  })

  it('returns the expected issues', async () => {
    const actual = await goodFirstIssue('node')
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl',
    }])
  })

  it('returns the expected issues from the GitHub organization', async() => {
    const actual = await goodFirstIssue('github')
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl'
    }])
  })

  it('returns the expected issues from the GitHub organization', async() => {
    const actual = await goodFirstIssue('github')
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl'
    }])
  })

  it('returns the expected issues from the Go repo', async() => {
    const actual = await goodFirstIssue('golang/go')
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl'
    }])
  })
})