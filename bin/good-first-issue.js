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
  .option('-n, --number <count>', 'List top N issues (e.g., -n 5)')
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

      const key = cmd.first ? 0 : Math.floor(Math.random() * issues.length)

      // Call the log functionality, output the result to the console.
      const output = await log(issues[key], (input in projects) ? projects[input].name : project)

      // Log the issue!
      if (cmd.number) {
        const count = Math.min(parseInt(cmd.number), issues.length)
        console.log(chalk.blue(`\nTop ${count} Good First Issues:\n`))
        for (let i = 0; i < count; i++) {
          const output = await log(issues[i], (input in projects) ? projects[input].name : project)
          console.log(chalk.yellow(`[${i+1}]`) + output.toString())
          console.log('---')
        }
      } else {
        // 原有的随机/第一个逻辑（记得修复上面的 off-by-one bug）
        const key = cmd.first ? 0 : Math.floor(Math.random() * issues.length)
        const output = await log(issues[key], (input in projects) ? projects[input].name : project)
        console.log(output.toString())
      }

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
