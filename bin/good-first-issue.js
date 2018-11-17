#!/usr/bin/env node

var cli = require('commander')
var chalk = require('chalk')
var opn = require('opn')

var pJson = require('../package.json')

const log = require('../lib/log')
const projects = require('../lib/projects')
const goodFirstIssue = require('..')

const prompt = require('./prompt')

cli
  .version(pJson.version, '-v, --version')
  .description(pJson.description)
  .arguments('[project]')
  .option('-o, --open', 'Open in browser')
  .option('-f, --first', 'Return first/top issue')
  .action(async (project, cmd) => {
    let input = project

    if (!project) {
      console.log('')
      input = await prompt()
    }

    // if project is not found
    if (!(input in projects)) {
      console.log('')
      console.log(chalk.red(`"${input}" was not found in good-first-issue.`))
      console.log('--------------------------------')
      console.log("If you'd like to add a new project to good-first-issue,")
      console.log(
        "Please see the module's Github repository: " +
          chalk.cyan(
            'https://github.com/bnb/good-first-issue#adding-new-projects'
          )
      )
      console.log('')
      process.exit(0)
    }

    const issues = await goodFirstIssue(input)

    if (issues.length === 0) {
      console.log('')
      console.log(chalk.yellow(`No Good First Issues were found in ${input}`))
      console.log('')
      process.exit(0)
    }

    // Call the log functionality, output the result to the console.
    let output = await log(issues, projects[input].name)

    let key = cmd.first ? 0 : Math.floor(Math.random() * Math.floor(output.length - 1))

    // Log the issue!
    console.log(output[key].toString())

    if (cmd.open) {
      opn(issues[key].url)
      process.exit(0)
    }
  })
  .parse(process.argv)
