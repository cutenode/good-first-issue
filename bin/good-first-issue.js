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
  .description(`${packageJSON.description}

Options:`)
  .arguments('[project]')
  .option('-o, --open', 'Open issue in browser after fetching')
  .option('-f, --first', 'Return only the top/first issue')
  .option('-a, --auth <token>', 'Use a GitHub token to avoid API rate limits')
  .on('--help', () => {
    console.log(`
Examples:
  $ good-first-issue             # Interactive project selection
  $ good-first-issue node        # Fetch issues for 'node' project
  $ good-first-issue node -f     # Get only the top issue
  $ good-first-issue node -o     # Open issue in browser
  $ good-first-issue node -a <token>  # Authenticate with a GitHub token

Tip: Generate a GitHub token at: https://github.com/settings/tokens
`);
  })
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
