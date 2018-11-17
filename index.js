const search = require('./lib/search')
const projects = require('./lib/projects')

module.exports = async function (project, cb) {
  return await search(projects[project].q)
}
