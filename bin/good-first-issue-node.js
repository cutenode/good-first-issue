#!/usr/bin/env node

var cli = require('commander')

// Include GitHub search functionality and log message creator
var search = require("../lib/search")
var log = require("../lib/log")

// Call Commander and process the CLI input
cli
  .parse(process.argv)

// Set up the query. I pulled this directly from a GitHub search, you can do the same! Use the advanced serach tool if you want to build more specific custom queries: https://github.com/search/advanced
var q = 'org:nodejs is:issue is:open label:"good first issue"'

// Execute!
search(q, (error, issues) => {
  if(error) throw error
  // Project name, which will be listed in the output
  project = "Node.js"
  
  // Call the log functionality, output the result to the console.
  log(issues, project, function(error, output) {
    if(error) throw error
    // Configure the randomizer for the pool of good-first-issues. This cannot exceed how many entries are actually available from the API.
    var random = Math.floor(Math.random() * Math.floor(output.length - 1));

    // Log the issue!
    console.log(output[random].toString())
  })
})
