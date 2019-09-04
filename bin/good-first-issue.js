#!/usr/bin/env node

const cli = require('commander')
const { yellow, white } = require('kleur')
const opn = require('open')
const gfi = require('libgfi')

const packageJSON = require('../package.json')
const log = require('../lib/log')
const prompt = require('../lib/prompt')
const projects = require('../data/projects.json')

const options = {
  // options for libgfi
  projects
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
        process.exitCode = 0
        return console.log(
          yellow(
            `\nNo Good First Issues were found for the GitHub organization, repo, or project ${white(
              input
            )}.\n`
          )
        )
      }

      const key = cmd.first
        ? 0
        : Math.floor(Math.random() * Math.floor(issues.length - 1))

      // Call the log functionality, output the result to the console.
      const output = await log(
        issues[key],
        input in projects ? projects[input].name : project
      )

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
