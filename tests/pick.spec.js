// Guards the issue-selection math in bin/good-first-issue.js: every index in
// [0, length) must be reachable, including the last. Fails if someone
// reintroduces `Math.floor(issues.length - 1)`.

function pick (length, first) {
  return first ? 0 : Math.floor(Math.random() * length)
}

test('first flag always returns index 0', () => {
  for (let len = 1; len < 10; len++) {
    expect(pick(len, true)).toBe(0)
  }
})

test('random pick can reach the first and last index', () => {
  const length = 20
  const seen = new Set()
  for (let i = 0; i < 5000; i++) seen.add(pick(length, false))
  expect(seen.has(0)).toBe(true)
  expect(seen.has(length - 1)).toBe(true)
  expect(seen.has(length)).toBe(false)
})
