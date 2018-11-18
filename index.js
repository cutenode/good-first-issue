const search = require('./lib/search')
const projects = require('./data/projects.json')

module.exports = async function (project, cb) {
  return search(projects[project].q)
}
