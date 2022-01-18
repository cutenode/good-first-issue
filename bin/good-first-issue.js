#!/usr/bin/env node

const cli = require('commander')
const chalk = require('chalk')
const opn = require('open')
const gfi = require('libgfi')

const packageJSON = require('../package.json')
const log = require('../lib/log')
const prompt = require('../lib/prompt')
const { replaceMatchedString, mapObject, getFormattedPastDate, isValidDate } = require('../lib/util')
const projects = require('../data/projects.json')

cli
  .version(packageJSON.version, '-v, --version')
  .description(packageJSON.description)
  .arguments('[project]')
  .option('-o, --open', 'Open in browser')
  .option('-f, --first', 'Return first/top issue')
  .option('-d, --date <from>', 'Return only issues updated from date specified(yyyy-MM-DD)')
  .option('-a, --auth <token>', 'Authenticate with the GitHub API (increased rate limits)')
  .action(async (project, cmd) => {
    /*
    * If passed invalid date, exit with error
    */
    if (cmd.date && !isValidDate(cmd.date)) {
      console.error('Date formatting must follow the ISO8601 standard (yyyy-MM-DD', cmd.date)
      process.exit(1)
    }

    const mappedProjects = mapObject(proj => {
      return {
        ...proj,
        q: replaceMatchedString({ matchToReplace: packageJSON.name, valueToUse: cmd.date ? cmd.date : getFormattedPastDate(new Date(), 'year') }, proj.q) // Replace string "good-first-issue" if exists in data.json with date passed or current date - 1 year (Filter issues too old)
      }
    }, projects)

    const options = { // options for libgfi
      projects: { ...mappedProjects }
    }

    if (cmd.auth) {
      options.auth = cmd.auth
    }

    let input = project

    if (!project) {
      console.log('')
      input = await prompt()
    }

    try {
      const issues = await gfi(input, options)

      if (issues.length === 0) {
        process.exitCode = 0
        return console.log(chalk.yellow(`\nNo Good First Issues were found for the GitHub organization, repo, or project ${chalk.white(input)}.\n`))
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
