#!/usr/bin/env node

var cli = require('commander')
var chalk = require('chalk')
var opn = require('open')
const gfi = require('libgfi')

var packageJSON = require('../package.json')
const log = require('../lib/log')
const prompt = require('../lib/prompt')
const projects = require('../data/projects.json')

const options = { // options for libgfi
  projects: projects
}

cli
  .version(packageJSON.version, '-v, --version')
  .description(packageJSON.description)
  .arguments('[project]')
  .option('-o, --open', 'Open in browser')
  .option('-f, --first', 'Return first/top issue')
  .action(async (project, cmd) => {
    let input = project

    if (!project) {
      console.log('')
      input = await prompt()
    }

    try {
      const issues = await gfi(input, options)

      if (issues.length === 0) {
        console.log(chalk.yellow(`\nNo Good First Issues were found for the GitHub organization, repo, or project ${chalk.white(input)}.\n`))
        process.exitCode = 0
      }

      const key = cmd.first ? 0 : Math.floor(Math.random() * Math.floor(issues.length - 1))

      // Call the log functionality, output the result to the console.
      const output = await log(issues[key], (input in projects) ? projects[input].name : project)

      // Log the issue!
      console.log(output.toString())

      if (cmd.open) {
        opn(issues[key].url)
        process.exitCode = 0
      }
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    }
  })
  .parse(process.argv)
