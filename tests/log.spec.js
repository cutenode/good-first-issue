const log = require('../lib/log')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi');

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
