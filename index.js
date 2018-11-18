const search = require('./lib/search')
const projects = require('./data/projects.json')

module.exports = async function (project, opts) {
  return search(projects[project].q, opts)
}
