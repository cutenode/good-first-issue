const fs = require('fs')
const path = require('path')
const search = require('./lib/search')

const dataSrc = path.resolve(__dirname, 'data', 'projects.json')

const projects = JSON.parse(fs.readFileSync(dataSrc))

module.exports = async function (project, opts) {
  return search(projects[project].q, opts)
}
