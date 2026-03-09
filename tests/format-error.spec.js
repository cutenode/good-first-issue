const formatError = require('../lib/format-error')

test('formats invalid project errors clearly', () => {
  const actual = formatError({
    status: 422,
    response: {
      data: {
        errors: [{ code: 'invalid' }]
      }
    }
  }, 'thisisntarealprojectorgithuborg')

  expect(actual).toBe(
    'Error: Unable to fetch issues for "thisisntarealprojectorgithuborg".\nPlease check the project name or repository path and try again.'
  )
})

test('formats rate limit errors clearly', () => {
  const actual = formatError({
    status: 403,
    response: {
      headers: {
        'x-ratelimit-remaining': '0'
      }
    }
  }, 'facebook/react')

  expect(actual).toBe(
    'Error: Unable to fetch issues for "facebook/react".\nGitHub API rate limit reached. Retry later or pass --auth <token> for higher limits.'
  )
})

test('formats network errors clearly', () => {
  const actual = formatError({
    code: 'ENOTFOUND',
    message: 'getaddrinfo ENOTFOUND api.github.com'
  }, 'nodejs/node')

  expect(actual).toBe(
    'Error: Unable to fetch issues for "nodejs/node".\nPlease check your network connection and try again.'
  )
})

test('falls back to the original error message for unknown failures', () => {
  const actual = formatError(new Error('Something odd happened'), 'vercel/next.js')

  expect(actual).toBe(
    'Error: Unable to fetch issues for "vercel/next.js".\nSomething odd happened'
  )
})
