#!/usr/bin/env node

const cli = require('commander')
const chalk = require('chalk')
const opn = require('open')
const gfi = require('libgfi')

const packageJSON = require('../package.json')
const log = require('../lib/log')
const prompt = require('../lib/prompt')
const projects = require('../data/projects.json')

cli
  .version(packageJSON.version, '-v, --version')
  .description(packageJSON.description)
  .arguments('[project]')
  .option('-o, --open', 'Open in browser')
  .option('-f, --first', 'Return first/top issue')
  .option('-a, --auth <token>', 'Authenticate with the GitHub API (increased rate limits)')
  .option('-i, --issues', 'Select from a list of all relevant issues in a project.')
  .action(async (project, cmd) => {
    const options = { // options for libgfi
      projects: projects
    }

    if (cmd.auth) {
      options.auth = cmd.auth
    }

    let input = project

    if (!project) {
      console.log('')
      input = await prompt.projectsPrompt()
    }

    try {
      const issues = await gfi(input, options)

      if (issues.length === 0) {
        process.exitCode = 0
        return console.log(chalk.yellow(`\nNo Good First Issues were found for the GitHub organization, repo, or project ${chalk.white(input)}.\n`))
      }

      let issue

      if (cmd.issues && issues.length > 1) {
        console.log('')
        issue = await prompt.issuesPrompt(issues)
      } else {
        const key = cmd.first ? 0 : Math.floor(Math.random() * Math.floor(issues.length - 1))
        issue = issues[key]
      }

      // Call the log functionality, output the result to the console.
      const output = await log(issue, (input in projects) ? projects[input].name : project)

      // Log the issue!
      console.log(output.toString())

      if (cmd.open) {
        opn(issue.url)
        process.exitCode = 0
      }
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    }
  })
  .parse(process.argv)
