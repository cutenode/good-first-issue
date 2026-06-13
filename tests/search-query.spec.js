const {
  DEFAULT_LABEL,
  buildDirectSearchQuery,
  replaceLabelInProjectQuery
} = require('../lib/search-query')

test('buildDirectSearchQuery uses the default label for org searches', () => {
  expect(buildDirectSearchQuery('nodejs')).toBe(
    `org:nodejs state:open label:${JSON.stringify(DEFAULT_LABEL)}`
  )
})

test('buildDirectSearchQuery uses the provided label for repo searches', () => {
  expect(buildDirectSearchQuery('cutenode/good-first-issue', 'help wanted')).toBe(
    'repo:cutenode/good-first-issue state:open label:"help wanted"'
  )
})

test('replaceLabelInProjectQuery swaps the primary label query', () => {
  const query = 'repo:babel/babel is:issue is:open label:"good first issue" -label:"Has PR" -label:"claimed"'

  expect(replaceLabelInProjectQuery(query, 'help wanted')).toBe(
    'repo:babel/babel is:issue is:open label:"help wanted" -label:"Has PR" -label:"claimed"'
  )
})

test('replaceLabelInProjectQuery appends the label when none exists', () => {
  const query = 'repo:example/project is:issue is:open sort:updated-desc'

  expect(replaceLabelInProjectQuery(query, 'first-timers-only')).toBe(
    'repo:example/project is:issue is:open sort:updated-desc label:"first-timers-only"'
  )
})
