const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const axios = require('axios')

const dataSrc = path.resolve(__dirname, '..', 'data', 'projects.json')

const defaultProjects = JSON.parse(fs.readFileSync(dataSrc))

async function getTopicProjects (topic) {
  const result = await axios.get(
    `https://api.github.com/search/repositories?q=topic:${topic}+good-first-issues:>0&sort=stars&order=desc`
  )
  const projects = {}
  result.data.items.forEach(item => {
    projects[item.id.toString()] = {
      name: item.name,
      q: `repo:${item.full_name} is:issue is:open label:"good first issue"`,
      description: item.description
    }
  })
  return projects
}

module.exports = async function (project, topic) {
  // if no topic is passed, use the default projects file
  const projects = topic ? await getTopicProjects(topic) : defaultProjects
  const projectNames = Object.keys(projects)
    .sort()
    .map(key => {
      const name = `${projects[key].name}${
        projects[key].description ? ' - ' + projects[key].description : ''
      }`
      return { value: key, name }
    })

  // if the projects list is empty, return
  if (projectNames.length === 0) {
    return null
  }
  const result = {
    projects
  }
  // if a project was passed, no need to choose
  if (project) {
    result.id = project
  } else {
    const a = await inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'Choose a project:',
        choices: projectNames
      }
    ])
    result.id = a.project
  }
  return result
}
