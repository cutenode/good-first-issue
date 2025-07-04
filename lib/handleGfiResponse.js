async function handleGfiResponse (issues, input, projects, project, cmd, log) {
  if (!Array.isArray(issues)) {
    throw new Error(
      typeof issues === 'string' && issues.trim() !== ''
        ? `API Error: ${issues}`
        : 'Unexpected response format from gfi()'
    )
  }

  if (issues.length === 0) {
    return { message: `No Good First Issues were found for the GitHub organization, repo, or project ${input}.`, code: 0 }
  }

  const key = cmd.first ? 0 : Math.floor(Math.random() * Math.floor(issues.length - 1))
  const output = await log(issues[key], (input in projects) ? projects[input].name : project)
  return { output: output.toString(), url: issues[key].url }
}

module.exports = handleGfiResponse
