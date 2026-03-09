function formatError (err, input) {
  const target = input ? `"${input}"` : 'the requested project'
  const prefix = `Error: Unable to fetch issues for ${target}.`

  if (isRateLimitError(err)) {
    return `${prefix}\nGitHub API rate limit reached. Retry later or pass --auth <token> for higher limits.`
  }

  if (isInvalidProjectError(err)) {
    return `${prefix}\nPlease check the project name or repository path and try again.`
  }

  if (isNetworkError(err)) {
    return `${prefix}\nPlease check your network connection and try again.`
  }

  return `${prefix}\n${getErrorDetail(err)}`
}

function getErrorDetail (err) {
  if (err && typeof err.message === 'string' && err.message.trim()) {
    return err.message.trim()
  }

  return 'An unexpected error occurred while querying the GitHub API.'
}

function isInvalidProjectError (err) {
  if (!err || err.status !== 422) {
    return false
  }

  const errors = err.response && err.response.data && err.response.data.errors
  return Array.isArray(errors) && errors.some(error => error && error.code === 'invalid')
}

function isRateLimitError (err) {
  if (!err) {
    return false
  }

  const headers = getResponseHeaders(err)
  const remaining = headers && headers['x-ratelimit-remaining']
  return err.status === 403 && remaining === '0'
}

function isNetworkError (err) {
  if (!err || err.status) {
    return false
  }

  return Boolean(err.code) || /network|timed? out|fetch failed|socket/i.test(getErrorDetail(err))
}

function getResponseHeaders (err) {
  if (err.response && err.response.headers) {
    return err.response.headers
  }

  return err.headers || null
}

module.exports = formatError
