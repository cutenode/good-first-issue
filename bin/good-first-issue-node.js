#!/usr/bin/env node

var cli = require('commander')

// Include GitHub search functionality and log message creator
var search = require("../lib/search")

// Include output-building functionality
var log = require("../lib/log")

// Include projects so we can get our GitHub search query and project name to pass to lib/search.js and lib/log.js
var projects = require("../lib/projects")

// Call Commander.js and process the CLI input
cli
  .parse(process.argv)

// Execute!
search(projects.node.q, (error, issues) => {
  if(error) throw error
  
  // Call the log functionality, output the result to the console.
  log(issues, projects.node.name, function(error, output) {
    if(error) throw error
    // Configure the randomizer for the pool of good-first-issues. This cannot exceed how many entries are actually available from the API.
    var random = Math.floor(Math.random() * Math.floor(output.length - 1));

    // Log the issue!
    console.log(output[random].toString())
  })
})
