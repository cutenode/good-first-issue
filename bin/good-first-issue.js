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

    const token = cmd.auth || process.env.GITHUB_TOKEN

    if(token)
    {
      options.auth =token
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
     if(
      err &&
      err.message &&
      err.message.toLowerCase().include('rate limit')
     )
     {
       console.error(chalk.red(`
❌ GitHub API rate limit exceeded.

Why this happened:
- You are using the GitHub API without authentication
- GitHub allows ~50 requests/hour for unauthenticated users

How to fix:
1. Create a GitHub Personal Access Token
   https://github.com/settings/tokens
2. Run the command with ONE of the following:

   export GITHUB_TOKEN=your_token
   OR
   good-first-issue --auth your_token

This increases the limit to 5000 requests/hour.
`))
    process.exitCode = 1
    return
     }

  console.error(chalk.red('❌ An unexpected error occurred:'))
  console.error(err.message || err)
  process.exitCode = 1
    }
  })
  .parse(process.argv)
