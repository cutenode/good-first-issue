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
    // Handle GitHub rate limit errors gracefully
    if (err.status === 403 && err.response?.data?.message?.includes("API rate limit exceeded")) {
      console.error(
        chalk.red("\n❌ GitHub API rate limit exceeded!\n") +
        chalk.yellow("GitHub allows only 10 unauthenticated search requests per minute.\n") +
        chalk.yellow("Tip: Authenticate with a personal access token for higher limits.\n\n") +
        chalk.cyan("  good-first-issue <project> --auth YOUR_GITHUB_TOKEN\n\n") +
        "Learn more: https://docs.github.com/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token\n"
      )
    } else {
      // Show a cleaner error message
      console.error(chalk.red(`\nError: ${err.message || err}\n`))
    }
      process.exitCode = 1
    }
  })
  .parse(process.argv)
