// This helper goes and fetches Good First Issues
// This module expects a search query which is just a standard GitHub search query. These queries should not include sort or order, since those are defined in the function.
const octokit = require('@octokit/rest')({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  }
})

const defaultOpts = {
  sort: 'updated',
  order: 'desc'
}

function search (q, opts) {
  let options = Object.assign({ q }, defaultOpts, opts)
  return octokit.search.issues(options).then(({ data }) => {
    return data.items.reduce((acc, item) => {
      if (item.assignee === null && item.locked !== true) {
        return acc.concat({
          title: item.title,
          pr: item.number,
          labels: item.labels,
          state: item.state,
          repo: item.repository_url,
          url: item.html_url,
          assignee: item.assignee,
          assignees: item.assignees,
          locked: item.locked
        })
      }
      return acc
    }, [])
  })
}

module.exports = search
