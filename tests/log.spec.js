const log = require('../lib/log')
const stripAnsi = require('strip-ansi')

describe('log function', () => {
  test('should return formatted log', async () => {
    const org = 'foojs'
    const repo = 'barjs'
    const issue = {
      title: 'Add BAZ support',
      pr: 123,
      labels: [[Object], [Object], [Object]],
      state: 'open',
      repo: `https://api.github.com/${org}/${repo}`,
      url: `https://github.com/${org}/${repo}/issues/123`,
      assignee: null,
      assignees: [],
      locked: false
    }

    const expectedOutput = `
╭──────────────────────────────────────────────────────────╮
│                                                          │
│   Good First Issue in foojs:                             │
│                                                          │
│     - Title: Add BAZ support                             │
│     - Repository: foojs/barjs                            │
│     - Issue: #123                                        │
│     - Status: open                                       │
│     - Assigned to: unassigned!                           │
│                                                          │
│   Start now: https://github.com/foojs/barjs/issues/123   │
│                                                          │
╰──────────────────────────────────────────────────────────╯
`

    const actualOutput = await log(issue, org)

    expect(expectedOutput).toBe(stripAnsi(actualOutput))
  })

  test('should not contain undefined in output', async () => {
    const org = 'testorg'
    const repo = 'testrepo'
    const issue = {
      title: 'Test Issue',
      pr: 456,
      labels: [],
      state: 'open',
      repo: `https://api.github.com/${org}/${repo}`,
      url: `https://github.com/${org}/${repo}/issues/456`,
      assignee: null,
      assignees: [],
      locked: false
    }

    const output = await log(issue, org)
    const strippedOutput = stripAnsi(output)

    // Check that output doesn't contain 'undefined' string
    expect(strippedOutput).not.toContain('undefined')
    expect(strippedOutput).not.toContain('null')
  })

  test('should properly format repository name from URL', async () => {
    const org = 'facebook'
    const repo = 'react'
    const issue = {
      title: 'Fix bug in component',
      pr: 789,
      labels: [],
      state: 'open',
      repo: `https://api.github.com/${org}/${repo}`,
      url: `https://github.com/${org}/${repo}/issues/789`,
      assignee: null,
      assignees: [],
      locked: false
    }

    const output = await log(issue, org)
    const strippedOutput = stripAnsi(output)

    // Repository name should be properly extracted and formatted
    expect(strippedOutput).toContain('facebook/react')
    expect(strippedOutput).toContain('Repository: facebook/react')
  })

  test('should handle project name correctly', async () => {
    const projectName = 'Node.js'
    const issue = {
      title: 'Documentation improvement',
      pr: 101,
      labels: [],
      state: 'open',
      repo: 'https://api.github.com/nodejs/node',
      url: 'https://github.com/nodejs/node/issues/101',
      assignee: null,
      assignees: [],
      locked: false
    }

    const output = await log(issue, projectName)
    const strippedOutput = stripAnsi(output)

    // Project name should appear in the header
    expect(strippedOutput).toContain(`Good First Issue in ${projectName}`)
    expect(strippedOutput).not.toContain('undefined')
  })

  test('should include all required fields', async () => {
    const issue = {
      title: 'Add new feature',
      pr: 202,
      labels: [],
      state: 'open',
      repo: 'https://api.github.com/vuejs/vue',
      url: 'https://github.com/vuejs/vue/issues/202',
      assignee: null,
      assignees: [],
      locked: false
    }

    const output = await log(issue, 'Vue.js')
    const strippedOutput = stripAnsi(output)

    // Check all required fields are present
    expect(strippedOutput).toContain('Title:')
    expect(strippedOutput).toContain('Repository:')
    expect(strippedOutput).toContain('Issue:')
    expect(strippedOutput).toContain('Status:')
    expect(strippedOutput).toContain('Assigned to:')
    expect(strippedOutput).toContain('Start now:')
    
    // Check values are present
    expect(strippedOutput).toContain('Add new feature')
    expect(strippedOutput).toContain('#202')
    expect(strippedOutput).toContain('open')
    expect(strippedOutput).toContain('unassigned!')
    expect(strippedOutput).toContain('https://github.com/vuejs/vue/issues/202')
  })

  test('should handle edge case with different URL format', async () => {
    const issue = {
      title: 'Edge case test',
      pr: 999,
      labels: [],
      state: 'open',
      repo: 'https://api.github.com/microsoft/typescript',
      url: 'https://github.com/microsoft/typescript/issues/999',
      assignee: null,
      assignees: [],
      locked: false
    }

    const output = await log(issue, 'TypeScript')
    
    // Should return a string
    expect(typeof output).toBe('string')
    expect(output.length).toBeGreaterThan(0)
    
    // Should not throw an error
    expect(output).toBeTruthy()
  })
})
