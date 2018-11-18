const inquirer = require('inquirer')

const projects = require('../lib/projects')

module.exports = async function () {
  const projectNames = Object.keys(projects).map(key => {
    return { value: key, name: projects[key].name || key }
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
