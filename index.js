const search = require('./lib/search')

const projects = require('./data/projects.json')

module.exports = async function (project) {
  if (project in projects) {
    return search(projects[project].q)
  } else {
    return search(`${project.includes('/') ? 'repo' : 'org'}:${project} state:open label:"good first issue"`)
  }
}