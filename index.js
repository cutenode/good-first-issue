const search = require('./lib/search')
const projects = require('./lib/projects')

module.exports = async function (project, cb) {
  return search(projects[project].q)
}
