// This helper goes and fetches Good First Issues
// This module expects a search query which is just a standard GitHub search query. These queries should not include sort or order, since those are defined in the function.
const octokit = require('@octokit/rest')({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  }
})

/// GitHub search parameters for the Node.js org
const SORT = 'updated'
const ORDER = 'desc'
// default params for octokit
const PER_PAGE = 30
const PAGE = 1 // page_number is 1-based index

// API does not allow more than 1000 results -> tested via "feeling-lucky"
// MAX_RESULTS_ALLOWED = 1000
// MAX_PAGE_ALLOWED = Math.ceil(MAX_RESULTS_POSSIBLE / PER_PAGE)
const MAX_PAGE_ALLOWED = 34

function search (q) {
  return octokit.search
    .issues(getSearchParams({ q }))
    .then(({ data }) => {
      if (data.total_count > data.items.length) {
        const pageCount = Math.ceil(data.total_count / PER_PAGE)
        const lastPageAllowed = pageCount > MAX_PAGE_ALLOWED ? MAX_PAGE_ALLOWED : pageCount
        // page_number is 1-based index
        var randomPage =
          Math.floor(Math.random() * Math.floor(lastPageAllowed)) + 1

        return octokit.search
          .issues(getSearchParams({ q: q, page: randomPage }))
          .then(({ data }) => {
            return transform(data)
          })
      } else {
        return transform(data)
      }
    })
}

function getSearchParams (searchParams) {
  return {
    q: searchParams['q'],
    sort: searchParams['sort'] || SORT,
    order: searchParams['order'] || ORDER,
    per_page: searchParams['per_page'] || PER_PAGE,
    page: searchParams['page'] || PAGE
  }
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
  const issues = data.items
    .filter(item => item.assignee === null && item.locked !== true)
    .reduce((acc, item) => {
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
    }, [])

  return issues
}

module.exports = search
