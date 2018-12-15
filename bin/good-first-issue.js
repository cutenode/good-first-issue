#!/usr/bin/env node

var cli = require('commander')
var chalk = require('chalk')
var opn = require('opn')

var pJson = require('../package.json')

const log = require('../lib/log')
const projects = require('../data/projects.json')
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

    const issues = await goodFirstIssue(input)

    if (issues.length === 0) {
      console.log('')
      console.log(chalk.yellow(`No Good First Issues were found in ${input}`))
      console.log('')
      process.exit(0)
    }

    // Call the log functionality, output the result to the console.
    let output = await log(issues, (input in projects) ? projects[input].name : project)

    let key = cmd.first ? 0 : Math.floor(Math.random() * Math.floor(output.length - 1))

    // Log the issue!
    console.log(output[key].toString())

    if (cmd.open) {
      opn(issues[key].url)
      process.exit(0)
    }
  })
  .parse(process.argv)
