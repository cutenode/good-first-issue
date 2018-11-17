const inquirer = require('inquirer')

const projects = require('../data/projects.json')

module.exports = async function () {
  let a = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Choose a project:',
      choices: Object.keys(projects)
    }
  ])
  return a.project
}
