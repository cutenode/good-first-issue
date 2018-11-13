// This helper goes and fetches Good First Issues
// This module expects a search query which is just a standard GitHub search query. These queries should not include sort or order, since those are defined in the function.
const chalk = require('chalk')

const octokit = require('@octokit/rest')({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  }
})

// GitHub search parameters for the Node.js org
var sort = 'updated'
var order = 'desc'

function search (q, cb) {
  octokit.search.issues({ q, sort, order }, (error, result) => {
    if (error) throw error
    if (result.data.items.length === 0) {
      console.log(chalk.yellow('No issues were found'))
      process.exit(0)
    }
    var data = result.data.items.map(issue => {
      return data = {
        title: issue.title,
        pr: issue.number,
        labels: issue.labels,
        state: issue.state,
        repo: issue.repository_url,
        url: issue.html_url,
        assignee: issue.assignee,
        assignees: issue.assignees,
        locked: issue.locked
      }
    })

    var issues = data.filter(issue => issue.assignee === null && issue.locked !== true)

    cb(null, issues)
  })
}

module.exports = search
