// Regression test for #1100: "Random pick never returns the last issue"
//
// The bug: Math.floor(Math.random() * Math.floor(issues.length - 1))
// scales Math.random()'s [0, 1) range against `issues.length - 1`, so the
// maximum possible index produced is `issues.length - 2` — the final
// element of the array can never be selected.
//
// The fix: Math.floor(Math.random() * issues.length), which correctly
// produces every index in [0, issues.length - 1].

function buggyPick (length) {
  return Math.floor(Math.random() * Math.floor(length - 1))
}

function fixedPick (length) {
  return Math.floor(Math.random() * length)
}

test('buggy formula can never select the last index', () => {
  const length = 5
  const seen = new Set()
  for (let i = 0; i < 10000; i++) {
    seen.add(buggyPick(length))
  }
  expect(seen.has(length - 1)).toBe(false)
})

test('fixed formula can select the last index', () => {
  const length = 5
  const seen = new Set()
  for (let i = 0; i < 10000; i++) {
    seen.add(fixedPick(length))
  }
  expect(seen.has(length - 1)).toBe(true)
})

test('fixed formula never produces an out-of-bounds index', () => {
  const length = 5
  for (let i = 0; i < 10000; i++) {
    const key = fixedPick(length)
    expect(key).toBeGreaterThanOrEqual(0)
    expect(key).toBeLessThan(length)
  }
})
