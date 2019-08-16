const goodFirstIssue = require('../')

const log = async () => {
  const issues = await goodFirstIssue('github')
  console.log('There are ' + issues.length + ' open Good First Issues in the GitHub organization.')
  issues.forEach(function (issue) {
    console.log('    ' + issue.url.toString().slice(19, issue.url.toString().indexOf('/issue')) + '#' + issue.pr + ': ' + issue.title)
  })
}

log()
