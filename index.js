const search = require('./lib/search')
const projects = require('./lib/projects')

module.exports = function (project, cb) {
  search(projects[project].q, (error, issues) => {
    if (error) {
      cb(error, null)
    } else {
      cb(null, issues)
    }
  })
}
