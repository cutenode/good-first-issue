const inquirer = require('inquirer')

const projects = require('../lib/projects')

module.exports = async function () {
  let a = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Select one of the following projects.',
      choices: Object.keys(projects)
    }
  ])
  return a.project
}