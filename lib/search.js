// This helper goes and fetches Good First Issues
// This module expects a passed to it, which is just a standard GitHub search query. These queries do not need to 

const octokit = require('@octokit/rest')({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  },
})

// GitHub search paramaters for the Node.js org
var sort = 'updated'
var order = 'desc'
var per_page = 1

function search (q, cb) {
  octokit.search.issues({q, sort, order, per_page}, (error, result) => {
    if(error) throw error
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