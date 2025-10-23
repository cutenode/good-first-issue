const gfi = require('libgfi')
const log = require('./lib/log')
const prompt = require('./lib/prompt')
const projects = require('./data/projects.json')

/**
 * Main module export for good-first-issue
 * @param {string} project - Project name or GitHub org/repo
 * @param {Object} options - Options object
 * @param {string} options.auth - GitHub API token for authentication
 * @param {boolean} options.first - Return first issue instead of random
 * @returns {Promise<Object>} - Object containing issues and helper functions
 */
async function goodFirstIssue (project, options = {}) {
  const gfiOptions = {
    projects: projects
  }

  if (options.auth) {
    gfiOptions.auth = options.auth
  }

  const issues = await gfi(project, gfiOptions)

  return {
    issues: issues,
    project: project,
    log: log,
    prompt: prompt,
    projects: projects
  }
}

// Export the main function
module.exports = goodFirstIssue

// Export additional utilities
module.exports.log = log
module.exports.prompt = prompt
module.exports.projects = projects
