const gfi = require('libgfi')

const projects = require('./data/projects.json')

module.exports = (project, options = {}) => gfi(project, {
  projects,
  ...options
})
