#!/usr/bin/env node

var cli = require('commander')

const log = require('../lib/log')
const projects = require('../lib/projects')
const search = require('../lib/search')

cli
  .version('0.4.0', '-v, --version')
  .usage('[options]')
  .description('CLI tool to find good first issues.')
  .arguments('<project>')
  .action((project) => {
    search(projects[project].q, (error, issues) => {
      if(error) throw error
      
      // Call the log functionality, output the result to the console.
      log(issues, projects[project].name, function(error, output) {
        if(error) throw error
        // Configure the randomizer for the pool of good-first-issues. This cannot exceed how many entries are actually available from the API.
        var random = Math.floor(Math.random() * Math.floor(output.length - 1));
    
        // Log the issue!
        console.log(output[random].toString())
      })
    })    
  })
  .parse(process.argv)
