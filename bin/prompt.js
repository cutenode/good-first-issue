const inquirer = require('inquirer')

const projects = require('../data/projects.json')

module.exports = async function () {
  let name
  const projectNames = Object.keys(projects).sort().map(key => {
    name = `${projects[key].name}${projects[key].description ? ' - ' + projects[key].description : ''}`
    return { value: key, name }
  })
  let a = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Choose a project:',
      choices: projectNames
    }
  ])
  return a.project
}
