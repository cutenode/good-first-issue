// This helper goes and fetches Good First Issues
// This module expects a search query which is just a standard GitHub search query. These queries should not include sort or order, since those are defined in the function.
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

// default params for octokit
var perPage = 30
var page = 1 // page_number is 1-based index

function search (q) {
  return octokit.search
    .issues({ q, sort, order, perPage, page })
    .then(({ data }) => {
      if (data.total_count > data.items.length) {
        const pageCount = Math.ceil(data.total_count / perPage)
        // page_number is 1-based index
        const randomPage =
          Math.floor(Math.random() * Math.floor(pageCount - 1)) + 1

        return octokit.search
          .issues({ q, sort, order, perPage, randomPage })
          .then(({ data }) => {
            return transform(data)
          })
      } else {
        return transform(data)
      }
    })
}

/**
 * @typedef {Object} Issue
 * @property {string} title
 * @property {string} pr
 * @property {Object[]} labels
 * @property {string} repo
 * @property {string} url
 * @property {string} assignee - one assignee (it is due to backward compatibility)
 * @property {Object[]} assignees - multiple assignee
 * @property {boolean} locked
 *
 * Transform the data from Octokit Issue search to {@link Issue} format
 * @param {*} data - data from Octokit Issue search
 * @returns {Issue[]} - transformed data
 */
function transform (data) {
  const issues = data.items.reduce((acc, item) => {
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

  return issues
}

module.exports = search
