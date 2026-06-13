const DEFAULT_LABEL = 'good first issue'

function formatLabelQuery (label = DEFAULT_LABEL) {
  return `label:${JSON.stringify(label)}`
}

function buildDirectSearchQuery (project, label = DEFAULT_LABEL) {
  const scope = project.includes('/') ? 'repo' : 'org'
  return `${scope}:${project} state:open ${formatLabelQuery(label)}`
}

function replaceLabelInProjectQuery (query, label = DEFAULT_LABEL) {
  const positiveLabelPattern = /(^|\s)label:("[^"]+"|[^\s]+)/i

  if (positiveLabelPattern.test(query)) {
    return query.replace(positiveLabelPattern, `$1${formatLabelQuery(label)}`)
  }

  return `${query} ${formatLabelQuery(label)}`
}

module.exports = {
  DEFAULT_LABEL,
  buildDirectSearchQuery,
  replaceLabelInProjectQuery
}
