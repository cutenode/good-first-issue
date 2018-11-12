#!/usr/bin/env node

var cli = require('commander')
var chalk = require('chalk')
var opn = require('opn')

var pJson = require('../package.json')

const log = require('../lib/log')
const projects = require('../lib/projects')
const search = require('../lib/search')

const prompt = require('./prompt')

cli
  .version(pJson.version, '-v, --version')
  .description('CLI tool to find good first issues.')
  .arguments('[project]')
  .option('-o --open', 'Open in browser')
  .option('--not-random', 'Not random, return the top issue')
  .action(async (project, cmd) => {
    let input = project
    if (!project) {
      input = await prompt()
    }

    // if project is not found
    if (!(input in projects)) {
      console.log(chalk.red(`"${input}" was not found in good-first-issue.`))
      console.log('--------------------------------')
      console.log('If you\'d like to add a new project to good-first-issue,')
      console.log('please see the module\'s Github repository: ' + chalk.cyan('https://github.com/bnb/good-first-issue#adding-new-projects'))
      process.exit(0)
    }
    search(projects[input].q, (error, issues) => {
      if(error) throw error
      
      // Call the log functionality, output the result to the console.
      log(issues, projects[input].name, function(error, output) {
        if(error) throw error
        // Configure the randomizer for the pool of good-first-issues. This cannot exceed how many entries are actually available from the API.
        var key = Math.floor(Math.random() * Math.floor(output.length - 1));

        if (cmd.notRandom) {
          key = 0
        }
        
        if (cmd.open) {
          opn(issues[key].url)
        }

        // Log the issue!
        console.log(output[key].toString())
      })
    })    
  })
  .parse(process.argv)
