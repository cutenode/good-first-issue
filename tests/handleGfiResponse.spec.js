const handleGfiResponse = require('../lib/handleGfiResponse')

const fakeLog = jest.fn(async () => 'LOGGED')

const projects = { foo: { name: 'Foo' } }
const project = 'foo'
const input = 'foo'
const cmd = { first: false }

describe('handleGfiResponse', () => {
  it('throws on string error response', async () => {
    await expect(
      handleGfiResponse('API rate limit exceeded', input, projects, project, cmd, fakeLog)
    ).rejects.toThrow(/API Error: API rate limit exceeded/)
  })

  it('throws on unexpected response type', async () => {
    await expect(
      handleGfiResponse({ not: 'an array' }, input, projects, project, cmd, fakeLog)
    ).rejects.toThrow(/Unexpected response format/)
  })

  it('returns message if no issues', async () => {
    const result = await handleGfiResponse([], input, projects, project, cmd, fakeLog)
    expect(result.message).toMatch(/No Good First Issues were found/)
    expect(result.code).toBe(0)
  })

  it('returns output and url for valid issues', async () => {
    const issues = [{ url: 'http://example.com' }]
    const result = await handleGfiResponse(issues, input, projects, project, cmd, fakeLog)
    expect(result.output).toBe('LOGGED')
    expect(result.url).toBe('http://example.com')
  })
})